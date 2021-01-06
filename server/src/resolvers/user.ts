import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";

@InputType()
class UsernamePasswordInput{
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User;
}

@Resolver()
export class UserResolver {
    @Query(() => User, {nullable: true})
    async me(
        @Ctx() {em, req}: MyContext
    ) {
        //If logged in
        if(!req.session.userId){
            return null;
        }
        const user = await em.findOne(User, {id: req.session.userId});
        return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput, // Add , "() => UsernamePasswordInput" in @Arg("optons", ...) if type error
        @Ctx() {em, req}: MyContext
     ): Promise<UserResponse> {
        if(options.username.length <= 2) {
            return {
                errors: [{
                    field: 'username',
                    message: "Username length must be greater than 2 characters",
                }]
            }
        }
        if(options.password.length <= 7) {
            return {
                errors: [{
                    field: 'password',
                    message: "Password length must be more than 8 characters",
                }]
            }
        }
        const hashedPass = await argon2.hash(options.password);
        const user = em.create(User, { 
            username: options.username,
            password: hashedPass
        });
        try {
            await em.persistAndFlush(user);
        } catch(err) {
            if(err.code === '23505') { //|| err.detail.includes("already exists")){
                //Duplicate username error
                return {
                    errors: [{
                        field: 'username',
                        message: "Username already exists!",
                    }]
                }
            }
            // console.log("message", err)
        }
        
        // Set cookie, login the user
        req.session.userId = user.id;
        return {user, };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput, // Add , "() => UsernamePasswordInput" in @Arg("optons", ...) if type error
        @Ctx() {em, req}: MyContext
     ): Promise<UserResponse> {
        const user = await em.findOne(User, {username: options.username})
        if(!user){
            return{
                errors: [{
                    field: 'username',
                    message: "Username:"+options.username+" doesn't exist",
                }]
            }
        }
        const valid = await argon2.verify(user.password, options.password);
        if(!valid) {
            return{
                errors: [{
                    field: 'password',
                    message: "Invalid login credentials"
                }]
            }
        }
        
        
        req.session.userId = user.id;
        // req.session.id = user.id;

        return {user, };
    }
}