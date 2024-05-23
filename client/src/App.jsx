import RenderPosts from "./components/RenderPosts";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import { AuthProvider } from "./components/AuthContext";
import CreateBlog from "./components/CreateBlog";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RenderPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-blog" element={<CreateBlog/>}/>
          <Route path = "/post/:id" element = {<PostPage/>}/>
          <Route path="/editPost/:id" element = {<EditPost/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
