import {forumData} from "../../data/forumData";
import { useReducer } from "react";
import dayjs from "dayjs";

export function Home(){
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
          <div><h4 className="p-2">Latest Posts</h4></div>
          {state.forumData.posts.map((post) => {
            return(
              <div key={post.postId} className={`d-flex mb-5 post-container`}>
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
                    {/* {data.post.username === data.user.username && (location.pathname === "/home" || location.pathname.includes("/post")) && <div className="nav-item dropdown dropstart float-end">
                        <i className="fa fa-ellipsis-h float-end cursor-pointer nav-link" data-bs-toggle="dropdown" aria-expanded="false" aria-hidden="true"></i>
                        {<ul className="dropdown-menu">
                            
                            <li><a className="dropdown-item" href="#" onClick={() => handleEditPost(data.post)}>Edit</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => data.handleDeletePost(data.post._id)}>Delete</a></li>
                        </ul>}
                    </div>} */}
            </div>
            )
          })}
        </div>
  )
}