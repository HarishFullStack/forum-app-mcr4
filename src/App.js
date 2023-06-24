import { NavLink, Routes, Route } from "react-router-dom";

import './App.css';
import { Home } from "./pages/Home/Home";
import { Post } from "./pages/Post/Post";


function App() {




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
                <NavLink className="nav-link" to="/"><i className="fa fa-user" aria-hidden="true"></i> Profile</NavLink>
                </div>
            </li>
        </ul>
      </div>
      {/* <div className='v-left'></div> */}
      <div className='w-30 p-0'>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/post/:postId' element={<Post/>}></Route>
        </Routes>
      </div>
      {/* <div className='v-right'></div> */}
      <div className='w-15'>
      <div className="sidebar w-100 sticky-top">
            <h4 className="p-2">Sort By</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
