import {format} from 'date-fns'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
export default function Posts({ _id,title, summary, image, createdAt, author }) {
   
    useEffect(() => {
        console.log(_id)
    }, [])

    const navigate = useNavigate();
    function goToPost(){
        navigate('/post/' + _id)
}
    return (
 <div className="posts">
    <div className="image">
        <img src={'http://localhost:4000/'+image} alt="post image" onClick={goToPost} />
    </div>
    <div className="texts">
        <h2 style={{cursor:'pointer'}} onClick={goToPost}>{title}</h2>
        <p className="info">
            <span>-</span><a href="" className="author">{author.username}</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className="summary">{summary}</p>
    </div>
</div> 
  );
}