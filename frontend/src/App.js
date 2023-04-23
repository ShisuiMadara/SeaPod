import "./App.css";
import NavBar from "./Components/NavTop";
import Home from "./Components/Home";
import Comments from "./Components/Comments";
import Replies from "./Components/Replies";
import Video from "./Components/Video";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import LoginErrCard from "./Components/LoginErrCard";
import Account from "./Components/Account";
import Upload from "./Components/Upload.js";
import Card from "./Components/Card"


function App() {
    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:videoid" element={<Video />}>
                    <Route index element={<Comments />} />
                    <Route path=":commentid" element={<Replies />} />
                </Route>
                <Route path="/login" element={<Login />}>
                    <Route path="redir" element={<LoginErrCard />} />
                </Route>
                <Route path="/logout" element={<Logout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/card" element={<Card />}></Route>
            </Routes>
        </div>
    );
}

export default App;
