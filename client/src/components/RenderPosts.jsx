import { useEffect, useState } from "react";
import image from "../assets/img.jpg";
import Posts from "./Posts";

export default function RenderPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/createPost"); // Assuming the correct endpoint
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Display an error message to the user (optional)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, key) => {
          return <Posts {...post} key={key} />;
        })
      ) : (
        <p>No post yet</p>
      )}
    </>
  );
}
