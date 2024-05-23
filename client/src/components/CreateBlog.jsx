import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useNavigate} from 'react-router-dom';
import Editor from "./Editor";


export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState('')

  const navigate = useNavigate();

  async function createPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    try {
      const response = await fetch('http://localhost:4000/createPost', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (response.ok) {
        console.log("Post created successfully");
        navigate("/"); // Redirect after successful post creation
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }


  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} name="file"/>
      <Editor value={content} onChange={setContent}/>
      <button type="submit">Create Post</button>
    </form>
  );
}
