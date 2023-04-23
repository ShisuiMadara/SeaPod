import "./App.css";
import NavBar from "./Components/NavTop";
import Home from "./Components/Home";
import Comments from "./Components/Comments";
import Replies from "./Components/Replies";
import Video from "./Components/Video";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Logout from "./Components/Logout";
import LoginErrCard from "./Components/LoginErrCard";
import Account from "./Components/Account";
import Upload from "./pages/upload/Upload.js";
import jwt from "jwt-decode";
import NoPage from "./pages/nopage/nopage";

function App() {
    return (
        <div className="App bg-sky-50">
            <NavBar />
            <Routes>
                {localStorage.getItem("token") && jwt(localStorage.getItem("token")) ? (
                    <><Route path="/" element={<Home />} />
                    <Route path="/video/:videoData" element={<Video />}>
                    <Route index element={<Comments />} />
                        <Route path=":commentid" element={<Replies />} />
                    </Route></>
                ) : (
                    <Route path="/" element={<Login />}>
                        <Route path="redir" element={<LoginErrCard />} />
                    </Route>
                )}

                <Route path="/logout" element={<Logout />} />
                <Route path="/account" element={<Account />} />
                {localStorage.getItem("token") && jwt(localStorage.getItem("token")).admin ? (
                    <Route path="/upload" element={<Upload />} />
                ) : (
                    <></>
                )}
                <Route path="*" element={<NoPage />} />
            </Routes>
        </div>
    );
}

export default App;
