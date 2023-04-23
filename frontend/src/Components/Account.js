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
import { Divider, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode"

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
    const [newgenre, setnewGenre] = useState([]);
    const [isPasswordValid, checkPass] = useState(false);
    const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    function changePass(){
        
        console.log(jwt(localStorage.getItem("token")))
        axios.post('http://localhost:5000/changepass', {userId: jwt(localStorage.getItem("token"))._id, password:curpass, newPassword: newpass, newGenre: newgenre}, {headers:{Authorization: `bearer ${localStorage.getItem("token")}`}}).then((resp)=>{
            if (resp.data.success){
                alert('Password Changed! Please Re-Login');
                navigate('/logout');
                window.location.href = '/'
            }

            
        }).catch((e)=>{
            alert(e);
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
                            <Stack className="p-3">
                                    <TextField
                                        label="Old Password"
                                        type="password"
                                        color={isPasswordValid === false ? "error" : "primary"}
                                        value={curpass}
                                        onChange={(e) => {
                                            setCurpass(e.target.value);
                                            if (passwordRegex.test(e.target.value)) checkPass(true);
                                            else checkPass(false);
                                        }}
                                        sx={{ mx: 2, backgroundColor: "white" }}
                                    />
                            </Stack>
                            <Stack className="p-3">
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        color={isPasswordValid === false ? "error" : "primary"}
                                        value={newpass}
                                        onChange={(e) => {
                                            setNewpass(e.target.value);
                                            if (passwordRegex.test(e.target.value)) checkPass(true);
                                            else checkPass(false);
                                        }}
                                        sx={{ mx: 2, backgroundColor: "white" }}
                                    />
                            </Stack>

                            <Stack className="p-3">
                                <FormControl>
                                    <InputLabel className="ml-4">Genre</InputLabel>
                                    <Select
                                        value={newgenre}
                                        label="Genre"
                                        onChange={(event) => setnewGenre(event.target.value)}
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
                                
                            <Grid mt={5} container>                                
                                <Grid item xs={12}>
                                    <Button onClick={changePass} disabled={curpass==""} variant="contained"><Typography textTransform={'capitalize'}>Update Profile</Typography></Button>
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