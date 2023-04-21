import { Card, CardContent, Grid, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [isLogin, setLogin] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    });

    function login() {
        axios
            .post("http://localhost:5000/login", { user: user, password: pass })
            .then((resp) => {
                if (resp.status === 200) {
                    localStorage.setItem("token", resp.data);
                    localStorage.setItem("user", user);
                    setUser("");
                    setPass("");
                    navigate("/");
                }
            })
            .catch((e) => {
                alert(e.response.data);
            });
    }

    function signup() {
        axios
            .post("http://localhost:5000/signup", { user: user, password: pass })
            .then((resp) => {
                if (resp.status === 200) {
                    login();
                }
            })
            .catch((e) => {
                alert(e.response.data);
            });
    }

    return (
        <Stack
            height={"85vh"}
            sx={{ mb: 0, mt: "auto", overflow: "scroll" }}
            justifyContent={"center"}
            direction={"column"}
        >
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={10} sm={5} md={4} lg={3}>
                    <Outlet />
                    <Card sx={{ backgroundColor: "whitesmoke" }} className="font-serif">
                        <CardContent>
                            <div align="center" className="pt-2 pb-14 text-2xl">
                                {isLogin ? "Login" : "Signup"}
                            </div>
                            <Stack className="p-3">
                                <TextField
                                    label="Username"
                                    color={user === "" ? "error" : "primary"}
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    sx={{ mx: 2, backgroundColor: "white" }}
                                />
                            </Stack>
                            <Stack className="p-3">
                                <TextField
                                    label="Password"
                                    type="password"
                                    color={pass === "" ? "error" : "primary"}
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    sx={{ mx: 2, backgroundColor: "white" }}
                                />
                            </Stack>
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
                                        disabled={user === "" || pass === ""}
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <button
                                        className="p-2 w-full rounded bg-sky-500 text-white text-lg hover:bg-sky-800"
                                        onClick={signup}
                                        disabled={user === "" || pass === ""}
                                    >
                                        Signup
                                    </button>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </Stack>
    );
}
export default Login;
