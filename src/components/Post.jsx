import { Link } from "react-router-dom";

const Post = ({ items }) => {
  return (
    <article className="post">
      <Link to={`/post/${items.id}`}>
        <h2>{items.title}</h2>
        <p className="postDate">{items.datetime}</p>
      </Link>
      <p className="postBody">
        {items.body.length <= 25 ? items.body : `${items.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
