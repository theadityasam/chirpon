import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  //data is loading
  if (fetching) {
  } else if (!data?.me) {
    //user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={2}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    // user logged in
    body = (
      <Flex>
        <Box mr="2">{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="Teal" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
