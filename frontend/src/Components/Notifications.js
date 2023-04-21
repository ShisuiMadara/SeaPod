import axios from "axios";
import { Alert, Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "./NotificationCard";

function Notifications(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login/redir');
        }
    }, []);
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.post('http://localhost:5000/getnotif', {token: localStorage.getItem('token')}).then((res)=>{
            if (res.status==200){
                console.log(res.data);
                setData(res.data);
            }
        }).catch(e=>{
            console.log(e.response.data);
        });
    }, [])
    function clear(){
        axios.post('http://localhost:5000/clearnotif', {token: localStorage.getItem('token')}).then((res)=>{
            if (res.status==200){
                console.log(res.data);
                setData([]);
            }
        }).catch(e=>{
            console.log(e.response.data);
        });
    }
    return(
        <Stack height={'85vh'} sx={{mb: 0, mt:'auto', overflow: 'scroll'}} justifyContent={'center'} direction={'column'}>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={10} sm={5} md={4} lg={3}>
                    <Card sx={{backgroundColor: "whitesmoke"}}>
                        <CardContent>
                            <Typography align="center" variant="h6">
                                Notifications
                            </Typography>
                            <Stack direction={'row'} justifyContent={'left'} mt={2}>
                                <Button onClick={clear} color="success" variant="contained" sx={{p:0.5}}>
                                    <Typography textTransform={'none'}>Clear All</Typography>
                                </Button>
                            </Stack>
                            <Stack direction={'column-reverse'} spacing={2} mt={3}>
                                {
                                    data.map((dat)=>{
                                        return(
                                            <NotificationCard data={dat}/>
                                        )
                                    })
                                }
                            </Stack>
                        </CardContent>
                    </Card>
                    
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </Stack>
    );
}
export default Notifications;