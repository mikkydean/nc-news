import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCommentsById } from "../api";
import CommentCard from "./CommentCard";
import Expandable from "./Expandable";
import CommentForm from "./CommentForm";
import { UserContext } from "../contexts/User"
import ErrorComponent from "./ErrorComponent";



function Comments() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(UserContext)
  const [isApiError, setIsApiError] = useState(null)


  useEffect(() => {
    setIsApiError(false)
    getCommentsById(article_id).then((response) => {
      setComments(response.data.comments);
      setIsLoading(false);
    }).catch((err) => {
      setIsApiError(err)
  })
    ;
  }, []);

  if (isApiError) {
    return <ErrorComponent status={isApiError.response.data.message} message={isApiError.response.request.status}/>
}
else if(isLoading) {
    return <h2>Loading...</h2>
}

  if (comments.length === 0) {
    return <>
    {!isLoggedIn ? <p className="bold">Please log in to post a comment</p> : <CommentForm setComments={setComments} comments={comments}/>}
    <p>No comments exist for this article.</p>
    </>
  }

  return (
    <>
      {!isLoggedIn ? <p className="bold border-top">Please log in to post a comment</p> : <CommentForm setComments={setComments} comments={comments}/>}
      <Expandable>
        <ul className="card-layout">
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </Expandable>
    </>
  );
}

export default Comments;
