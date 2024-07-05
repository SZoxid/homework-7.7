import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);

  const api_url = "https://json-server-7-7.onrender.com";
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error was not ok: ${errorText}`);
        }

        const newItems = await response.json();
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching items", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  useEffect(() => {
    const filteredResults = items.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [items, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...items, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = (id) => {
    const postsList = items.filter((items) => items.id !== id);
    setItems(postsList);
    navigate("/");
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home items={searchResults} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/items/:id"
          element={<PostPage items={items} handleDelete={handleDelete} />}
        />
        <Route path="/about" component={<About />} />
        <Route path="*" component={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
