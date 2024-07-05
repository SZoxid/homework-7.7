import Feed from "./Feed";

const Home = ({ items }) => {
  return (
    <main className="Home">
      {items.length ? (
        <Feed items={items} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
