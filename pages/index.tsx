import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Navbar from "../components/Navbar";
import { usePostsQuery } from "../src/generated/graphql";
import { createUrqlCleint } from "../src/utils/createUrqlClient";

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((item) => <div key={item.id}>{item.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlCleint, { ssr: true })(Home);
