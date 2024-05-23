import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "./AuthContext";

export default function PostPage() {
  const [pInfo, setPostInfo] = useState(null);
  const params = useParams();
  const { username } = useAuth();

  useEffect(() => {
    fetch("http://localhost:4000/createPost/" + params.id).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
        console.log(username)
      });
    });
  }, []);

  if (pInfo === null) return "";

  return (
    <div>
      <div className="heading1">
        <span>
          <h1>{pInfo.title}</h1>
        </span>
        <span className="info">
          <span>- </span>
          <a href="" className="author">
          
            {pInfo.author.username}
          </a>

          <time>{format(new Date(pInfo.createdAt), "MMM d, yyyy HH:mm")}</time>
        </span>
      </div>
      {username === pInfo.author.username && <div className="edit-post"><Link to={'/editPost/' + pInfo._id}>Edit post</Link></div>}

      <div className="image-post">
        <img src={"http://localhost:4000/" + pInfo.image} alt="post image" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: pInfo.content }} />
    </div>
  );
}
