import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Login(){
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/');
        }
    });

    function login(){
        axios.post('http://localhost:5000/login', {user: user, password: pass}).then((resp)=>{
            if (resp.status == 200){
                console.log(resp.data);
                localStorage.setItem('token', resp.data);
                localStorage.setItem('user', user);
                navigate('/');
            }
            else{
                console.log(resp.data);
            }
        }).catch((e)=>{
            alert(e.response.data);
        })
    }

    function signup(){
        axios.post('http://localhost:5000/signup', {user: user, password: pass}).then((resp)=>{
            if (resp.status == 200){
                console.log(resp.data);
                alert('Registered Successfully: Please Login Now');
            }
            else{
                console.log(resp.data);
            }
        }).catch((e)=>{
            alert(e.response.data);
        })
    }

    return(
        <Stack height={'85vh'} sx={{mb: 0, mt:'auto', overflow: 'scroll'}} justifyContent={'center'} direction={'column'}>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={10} sm={5} md={4} lg={3}>
                    <Outlet/>
                    <Card sx={{backgroundColor: "whitesmoke"}}>
                        <CardContent>
                            <Typography align="center" variant="h6">
                                Login / Signup
                            </Typography>
                            <Stack mt={5}>
                                <TextField label="Username" color={user==""?"error":"primary"} value={user} onChange={(e)=>setUser(e.target.value)} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Stack mt={4}>
                                <TextField label="Password" type="password" color={pass==""?"error":"primary"} value={pass} onChange={(e)=>setPass(e.target.value)} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Grid mt={5} container>
                                <Grid item xs={6}>
                                    <Button onClick={login} disabled={user==""||pass==""} variant="contained"><Typography textTransform={'capitalize'}>Login</Typography></Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={signup} disabled={user==""||pass==""} variant="contained"><Typography textTransform={'capitalize'}>Signup</Typography></Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </Stack>
    );
}
export default Login;