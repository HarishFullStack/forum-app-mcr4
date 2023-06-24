import { useNavigate, useParams } from "react-router"
import {forumData} from "../../data/forumData";
import { useReducer, useState } from "react";
import dayjs from "dayjs";

export function Post(){
  const navigate = useNavigate();

    const {postId} = useParams();
    const[post, setPost] = useState(forumData.posts.find((x) => x.postId === postId));

    const reducer = (state, actions) => {
        switch(actions.type){
          case "LIKE":
            return {...state, forumData: {...state.forumData, posts: state.forumData.posts.map((x) => ({...x, upvotes: x.postId === actions.value ? x.upvotes + 1 : x.upvotes}))}}
    
          case "DISLIKE":
            return {...state, forumData: {...state.forumData, posts: state.forumData.posts.map((x) => ({...x, downvotes: x.postId === actions.value ? ++x.downvotes - 1 : x.downvotes}))}}
    
          case "BOOKMARK":
            return {...state, forumData: {...state.forumData, posts: state.forumData.posts.map((x) => ({...x, isBookmarked: x.postId === actions.value ? !x.isBookmarked : x.isBookmarked}))}}
          
          default:
            return state;
        }
      }
    
      const [state, dispatch] = useReducer(reducer, {
        forumData: forumData
      });

    return(
      <div className="main-content">
        <div className="row">
                <div className="d-flex align-items-center fit-content back-button" onClick={() => navigate("/")}><i className="fa fa-arrow-left" aria-hidden="true"></i></div>
                <div className="fit-content"><h4 className="text-start">Post</h4></div>
            </div>
            <div key={post.postId} className={`d-flex post-container`}>

              <div className="d-flex vote-options align-items-center p-2">
                <div className="cursor-pointer" onClick={() => dispatch({type: "LIKE", value: post.postId})}><img alt="like" src={require("../../images/icons8-like-32.png")}></img></div>
                <div className="cursor-pointer">{post.upvotes - post.downvotes}</div>
                <div className="cursor-pointer" onClick={() => dispatch({type: "DISLIKE", value: post.postId})}><img alt="dislike" src={require("../../images/icons8-dislike-32.png")}></img></div> </div>
                  <div><div className="d-flex">
                      <img className="avatar cursor-pointer" alt={post.username} src={post.picUrl}></img><div className="d-flex align-items-center">Posted by <b className="username cursor-pointer">@{post.username}</b> | {dayjs(post.createdAt).format("MMM")} {dayjs(post.createdAt).format("D")}</div>
                  </div>
                  <div className="w-100">
                      <h5>{post.post}</h5>
                        {post.tags.map((tag) => {
                          return(
                            <span key={tag} className="badge rounded-pill text-bg-success me-1 mb-1">{tag}</span>
                          )})}
                      <p>{post.postDescription}</p>
                      <div className="">
                          <div className="d-flex" style={{width: "90%"}}>
                              <div className="col-md-4  d-flex justify-content-start"><img className="actions cursor-pointer" alt="comment" src={require('../../images/icons8-comment-32.png')}></img></div>
                              <div className="col-md-4  d-flex justify-content-center"><img className="actions cursor-pointer" alt="share"  src={require('../../images/icons8-share-32.png')}></img></div>
                              <div className="col-md-4 d-flex justify-content-end"><img className="actions cursor-pointer" alt="bookmark"  src={post.isBookmarked ? require('../../images/bookmark-green.png') : require('../../images/bookmark-black.png')} onClick={() => dispatch({type: "BOOKMARK", value: post.postId})}></img></div>

                          </div>
                      </div>
                  </div></div>
          </div>
          <div>
          {post.comments.map((comment) => {
            return(
              <div>
          <div className='v-right'></div>

              <div key={comment.commentId} className={`mb-5 post-container`}>

              <div className="vote-options align-items-center p-2">
                  <div><div className="d-flex">
                      <img className="avatar cursor-pointer" alt={comment.username} src={post.picUrl}></img><div className="d-flex align-items-center"> <b className="username cursor-pointer">@{comment.username}</b> | {dayjs(comment.createdAt).format("MMM")} {dayjs(comment.createdAt).format("D")}</div>
                  </div>
                  <div className="w-100">
                      <p>{comment.comment}</p>
                      <div className="">
                          <div className="d-flex" style={{width: "90%"}}>
                              <div className="col-md-4  d-flex justify-content-start"><img className="actions cursor-pointer" alt="comment" src={require('../../images/icons8-comment-32.png')}></img></div>
                              <div className="col-md-4  d-flex justify-content-center"><img className="actions cursor-pointer" alt="share"  src={require('../../images/icons8-share-32.png')}></img></div>
                              <div className="col-md-4 d-flex justify-content-end"><img className="actions cursor-pointer" alt="bookmark"  src={post.isBookmarked ? require('../../images/bookmark-green.png') : require('../../images/bookmark-black.png')} onClick={() => dispatch({type: "BOOKMARK", value: post.postId})}></img></div>

                          </div>
                      </div>
                  </div></div>
          </div></div></div>
            )
          })}
          </div>
          </div>
          
    )
}