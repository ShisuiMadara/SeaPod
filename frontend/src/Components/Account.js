import { Divider, TextField, Typography, Grid, Stack, Card, CardContent, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function Account(){
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem('token')){
            navigate('/login/redir');
            return;
        }
    },[]);
    const [curpass, setCurpass] = useState("");
    const [newpass, setNewpass] = useState("");

    function changePass(){
        if (!localStorage.getItem('token')){
            navigate('/login/redir');
            return;
        }
        axios.post('http://localhost:5000/changepass', {token: localStorage.getItem('token'), currpass:curpass, newpass: newpass}).then((resp)=>{
            if (resp.status == 200){
                alert('Password Changed! Please Re-Login');
                navigate('/logout');
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
                                Profile
                            </Typography>
                            <Stack mt={5}>
                                <TextField label="Username" color="success" disabled value={localStorage.getItem('user')} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Divider/>
                            <Typography align="center" variant="h6" sx={{mt: 2}}>
                                Change Password
                            </Typography>                                                            
                            <Stack mt={4}>
                                <TextField label="Current Password" type="password" color={curpass==""?"error":"primary"} value={curpass} onChange={(e)=>setCurpass(e.target.value)} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Stack mt={4}>
                                <TextField label="Current Password" type="password" color={newpass ==""?"error":"primary"} value={newpass} onChange={(e)=>setNewpass(e.target.value)} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Grid mt={5} container>                                
                                <Grid item xs={12}>
                                    <Button onClick={changePass} disabled={curpass==""||newpass==""} variant="contained"><Typography textTransform={'capitalize'}>Change Password</Typography></Button>
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
export default Account;