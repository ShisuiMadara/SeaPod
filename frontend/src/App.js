import logo from './logo.svg';
import './App.css';
//import NavBar from './Components/navbar';
import NavBar from './Components/NavTop';
import Home from './Components/Home';
import Player from './Components/Player';
import VideoDesc from './Components/VideoDesc';
import Comments from './Components/Comments';
import Replies from './Components/Replies';
import Video from './Components/Video';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Logout from './Components/Logout';
import LoginErrCard from './Components/LoginErrCard';
import Account from './Components/Account';
import Upload from './Components/Upload.js';
import Notifications from './Components/Notifications';
function App() {
    return (
        <div className="App">
            <NavBar/>
            {/* <VideoDesc views={100} likes={100} title={'Halo'} desc={'Hello'} by={'Me'} date={'27/10/2023'}/> */}
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/video/:videoid' element={<Video/>}>
                    <Route index element={<Comments/>}/>
                    <Route path=':commentid' element={<Replies/>}/>
                </Route>
                <Route path='/login' element={<Login/>}>
                    <Route path='redir' element={<LoginErrCard/>} />
                </Route>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/account' element={<Account/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route path='/notifications' element={<Notifications/>}/>
            </Routes>
        </div>
  );
}

export default App;
