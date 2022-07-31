import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../src/generated/graphql";

type Props = {};

export default function Navbar({}: Props) {
  const [{ fetching: logoutfetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  return (
    <Flex bg="tomato" p={4}>
      {fetching ? (
        <Box>Loading...</Box>
      ) : data?.me ? (
        <Flex ml={"auto"} color="white">
          <Box mr={5}>{data.me.username}</Box>
          <Button
            variant="link"
            color="white"
            isLoading={logoutfetching}
            onClick={() => {
              logout();
              window.location.reload();
            }}
          >
            logout
          </Button>
        </Flex>
      ) : (
        <Box bg="tomato" color="white" ml={"auto"}>
          <Link href="/login">login</Link>
          <Link href="/register">register</Link>
        </Box>
      )}
    </Flex>
  );
}
