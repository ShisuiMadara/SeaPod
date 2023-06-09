import {
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import axios from "axios";
import jwt from "jwt-decode";
import { useEffect, useState } from "react";
import logo from "../../assets/podcast.jpeg";

function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [genre, setGenre] = useState([]);
    const [isLogin, setLogin] = useState(true);
    const [isEmailValid, checkEmail] = useState(false);
    const [isPasswordValid, checkPass] = useState(false);

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function login() {
        axios
            .post("http://seapod.centralindia.cloudapp.azure.com:5000/api/login", { email: email, password: pass })
            .then((resp) => {
                if (resp.data.success) {
                    localStorage.setItem("token", resp.data.token);
                    localStorage.setItem("user", jwt(resp.data.token).userId);
                    setUser("");
                    setPass("");
                    window.location.href = "/";
                } else {
                    alert(resp.data.message);
                }
            })
            .catch((e) => {
                alert(e.message);
            });
    }

    function signup() {
        axios
            .post("http://seapod.centralindia.cloudapp.azure.com:5000/api/signup", {
                userId: user,
                password: pass,
                name: name,
                email: email,
                genre: genre,
            })
            .then((resp) => {
                if (resp.data.success) {
                    login();
                } else {
                    alert(resp.data.message);
                }
            })
            .catch((e) => {
                alert(e.response.data);
            });
    }

    return (
        <div className="flex w-full lg:flex-row flex-col" style={{ height: "100vh" }}>
            <div className="lg:w-1/3 w-full p-5 pb-1">
                <div className="text-5xl font-serif text-sky-800 w-full justify-center flex flex-row">
                    SEAPOD
                 </div>

                 <div className="text-3xl font-serif text-sky-400 w-full justify-center flex flex-row">
                        Dive into the world of podcasts.
                </div>

                <div className="flex flex-col h-full justify-center w-full">

                    <div className="justify-center flex flex-row w-full p-4 pt-5">
                        <div
                            className="rounded-full overflow-hidden"
                            style={{ height: "550px", width: "500px" }}
                        >
                            <img src={logo} width={"100%"} height={"auto"} alt={"podcast"} />
                        </div>
                    </div>

                    <div className="text-3xl font-serif text-sky-400 w-full justify-center flex flex-row">
                        Relax with some ASMRs. <br/>
                        Go down the road with Historians. or <br/>
                        Solve a mystery with Sherlock.
                    </div>
                </div>
            </div>
            <Stack
                className="lg:w-2/3 w-full"
                height={"100%"}
                sx={{ mt: "auto" }}
                justifyContent={"center"}
                direction={"column"}
            >
                <Grid container className="flex flex-row justify-center">
                    <Grid item xs={10} sm={8} md={6} lg={4}>
                        <Card sx={{ backgroundColor: "whitesmoke" }} className="font-serif">
                            <CardContent>
                                <div align="center" className="pt-2 pb-14 text-2xl">
                                    {isLogin ? "Login" : "Signup"}
                                </div>
                                {!isLogin ? (
                                    <Stack className="p-3">
                                        <TextField
                                            label="Name"
                                            type="name"
                                            color={name === "" ? "error" : "primary"}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            sx={{ mx: 2, backgroundColor: "white" }}
                                        />
                                    </Stack>
                                ) : (
                                    <></>
                                )}
                                {!isLogin ? (
                                    <Stack className="p-3">
                                        <TextField
                                            label="Username"
                                            color={user === "" ? "error" : "primary"}
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            sx={{ mx: 2, backgroundColor: "white" }}
                                        />
                                    </Stack>
                                ) : (
                                    <></>
                                )}
                                <Stack className="p-3">
                                    <TextField
                                        label="Email"
                                        type="email"
                                        color={isEmailValid === false ? "error" : "primary"}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (emailRegex.test(e.target.value)) checkEmail(true);
                                            else checkEmail(false);
                                        }}
                                        sx={{ mx: 2, backgroundColor: "white" }}
                                    />
                                </Stack>
                                <Stack className="p-3">
                                    <TextField
                                        label="Password"
                                        type="password"
                                        color={isPasswordValid === false ? "error" : "primary"}
                                        value={pass}
                                        onChange={(e) => {
                                            setPass(e.target.value);
                                            if (passwordRegex.test(e.target.value)) checkPass(true);
                                            else checkPass(false);
                                        }}
                                        sx={{ mx: 2, backgroundColor: "white" }}
                                    />
                                </Stack>
                                {!isLogin ? (
                                    <Stack className="p-3">
                                        <FormControl>
                                            <InputLabel className="ml-4">Genre</InputLabel>
                                            <Select
                                                value={genre}
                                                label="Genre"
                                                onChange={(event) => setGenre(event.target.value)}
                                                sx={{ mx: 2, backgroundColor: "white" }}
                                                multiple={true}
                                            >
                                                <MenuItem value={"Educational"}>
                                                    Educational
                                                </MenuItem>
                                                <MenuItem value={"Devotional"}>Devotional</MenuItem>
                                                <MenuItem value={"Adventure"}>Adventure</MenuItem>
                                                <MenuItem value={"Interview"}>Interview</MenuItem>
                                                <MenuItem value={"Story"}>Story</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                ) : (
                                    <></>
                                )}
                                <Stack className="p-3">
                                    <div className="w-full p-2 flex justify-evenly">
                                        <div className="text-gray-600">
                                            {isLogin
                                                ? "Don't have an account?"
                                                : "Already have an account?"}
                                        </div>
                                        <div
                                            className="cursor-pointer text-sky-500 hover:text-sky-800"
                                            onClick={() => setLogin(!isLogin)}
                                        >
                                            {isLogin ? "Signup" : "Login"}
                                        </div>
                                    </div>
                                </Stack>
                                <Stack className="p-3">
                                    {isLogin ? (
                                        <button
                                            className="p-2 w-full rounded bg-sky-500 text-white text-lg hover:bg-sky-800"
                                            onClick={login}
                                            disabled={email === "" || pass === ""}
                                        >
                                            Login
                                        </button>
                                    ) : (
                                        <button
                                            className="p-2 w-full rounded bg-sky-500 text-white text-lg hover:bg-sky-800"
                                            onClick={signup}
                                            disabled={
                                                user === "" ||
                                                pass === "" ||
                                                email === "" ||
                                                name === "" ||
                                                genre === []
                                            }
                                        >
                                            Signup
                                        </button>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
}
export default Login;
