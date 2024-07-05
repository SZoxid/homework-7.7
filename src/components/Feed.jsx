import Post from "./Post";

const Feed = ({ items }) => {
  return (
    <>
      {items.map((post) => (
        <Post key={items.id} items={post} />
      ))}
    </>
  );
};

export default Feed;
