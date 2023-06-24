import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

import './App.css';
import {forumData} from "./data/forumData";
import { useReducer } from "react";

function App() {

  const reducer = (state, actions) => {
    switch(actions.type){
      case "LIKE":
        return {...state, forumData: state.forumData.posts.map((x) => x.upvotes = x.id === actions.value ? ++x.upvotes : x.upvotes)}

      case "DISLIKE":
        return {...state, forumData: state.forumData.posts.map((x) => x.downvotes = x.id === actions.value ? ++x.downvotes : x.downvotes)}

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    forumData: forumData
  });



  return (
    <div className="App row justify-content-center">
      <div className='w-15'>
        <ul className="nav flex-column sticky-top">
            <li className="nav-item">
                <div className="navlink">
                    <NavLink className="nav-link active-menu" to="/"><i className="fa fa-home"></i> Home</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <div className="navlink">
                    <NavLink className="nav-link" to="/"><i className="fa fa-search" aria-hidden="true"></i> Explore</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <div className="navlink">
                    <NavLink className="nav-link" to="/"><i className="fa fa-bookmark" aria-hidden="true"></i> Bookmarks</NavLink>
                </div>
            </li>
            <li className="nav-item">
                <div className="navlink">
                <NavLink className="nav-link" to="/"><i class="fa fa-user" aria-hidden="true"></i> Profile</NavLink>
                </div>
            </li>
        </ul>
      </div>
      <div className='v-left'></div>
      <div className='w-30 p-0'>
        <div className="main-content">
          <h4 className="p-2">Latest Posts</h4>
          {state.forumData.posts.map((post) => {
            return(
              <div key={post.postId} className={`d-flex mb-5 post-container`}>
                <div className="d-flex vote-options align-items-center p-2">
                  <div className="cursor-pointer" onClick={() => dispatch({type: "LIKE", value: post.postId})}><img alt="like" src={require("./images/icons8-like-32.png")}></img></div>
                  <div className="cursor-pointer">{post.upvotes - post.downvotes}</div>
                  <div className="cursor-pointer" onClick={() => dispatch({type: "DILIKE", value: post.postId})}><img alt="dislike" src={require("./images/icons8-dislike-32.png")}></img></div> </div>
                    <div><div className="d-flex">
                        <img className="avatar cursor-pointer" alt={post.username} src={post.picUrl}></img><div className="d-flex align-items-center">Posted by <b className="username cursor-pointer">@{post.username}</b> | {dayjs(post.createdAt).format("MMM")} {dayjs(post.createdAt).format("D")}</div>
                    </div>
                    <div className="w-100">
                        
                        <h5>{post.post}</h5>
                        <p>{post.postDescription}</p>
                        <div className="">
                            <div className="d-flex">
                                {/* {data.post.likes && <div className="col-md-4"><img className="actions cursor-pointer" src={data.post.likes.likedBy.find((by) => by._id === data.user._id) !== undefined ? require('../../images/heart-red.png') : require('../../images/heart-empty.png')} onClick={() => data.post.likes.likedBy.find((by) => by._id === data.user._id) !== undefined ? data.handleDisLikeClick(data.post._id) : data.handleLikeClick(data.post._id)}></img> {data.post.likes.likeCount}</div>}
                                {data.post.likes && <div className="col-md-4"><img className="actions cursor-pointer" src={data.bookmarks.find((bookmark) => bookmark._id === data.post._id) !== undefined ? require('../../images/bookmark-green.png') : require('../../images/bookmark-black.png') } onClick={() => data.bookmarks.find((bookmark) => bookmark._id === data.post._id) !== undefined ? data.handleRemoveBookmarkClick(data.post._id) : data.handleBookmarkClick(data.post._id)}></img></div>} */}
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
      </div>
      <div className='v-right'></div>
      <div className='w-15'>
      <div className="sidebar w-100 sticky-top">
            <h4>Sort By</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
