import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Chip, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShareIcon from '@mui/icons-material/Share';
import { HorizontalRule } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function VideoDesc(props){
    const [views, setViews] = useState(props.views);
    const [likes, setLikes] = useState("");
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate();
    const {videoid} = useParams();
    function likeHandler(){
        if (!localStorage.getItem('token')){
            navigate('/login/redir');
            return;
        }
        if (!liked){
            
            axios.post('http://localhost:5000/like', {token: localStorage.getItem('token'), videoid: videoid, action: "like"}).then((res)=>{
                if(res.status==200){
                    setLikes(likes + 1);
                    setLiked(true);
                }
            }).catch((e)=>{alert(e.response.data)});
        }
        else{            
            axios.post('http://localhost:5000/like', {token: localStorage.getItem('token'), videoid: videoid, action: "unlike"}).then((res)=>{
                if(res.status==200){
                    setLikes(likes - 1);
                    setLiked(false);
                }
            }).catch((e)=>{alert(e.response.data)});
        }
    }
    useEffect(()=>{
        if (!localStorage.getItem('token')){
            // navigate('/login/redir');
            return;
        }
        axios.post('http://localhost:5000/like', {token: localStorage.getItem('token'), videoid: videoid, action: "get"}).then((resp)=>{
            if (resp.status == 200){
                setLiked(resp.data.liked);
                console.log(resp.data.liked);
            }
        }).catch((e)=>{
            console.log(e.response.data);
        })
    }, []);
    useEffect(()=>{
        console.log(likes);
        setLikes(props.likes);
    },[props])
    return(
        <Paper sx={{width:'90%', mx:'auto', my:2, backgroundColor:'whitesmoke'}}>
            <Box sx={{p:4}}>
                <Typography variant="h5" align="left" mb={2}>
                    {props.title}
                </Typography>
                <Grid container rowSpacing={1}>
                    <Grid item xs={12} md={7}>
                        <Typography align="left" fontSize={'0.8rem'}>By: {props.by}</Typography>
                    </Grid>
                    <Grid item xs md>
                        <Stack spacing={1} direction={"row"} alignItems={"flex-start"}>
                            <Button color="primary" variant={liked?'contained':'outlined'} sx={{p: 0.7}} onClick={likeHandler}>
                                <ThumbUpIcon sx={{fontSize: '0.8rem'}}/>
                                <Typography sx={{fontSize: '0.8rem'}} align='left'>&nbsp;{likes} </Typography>
                            </Button>
                            <Button color='primary' variant='outlined' sx={{p: 0.7}} LinkComponent={Link} to="/video/640f5d8749e3cd3da4cda5d3">
                                <ShareIcon sx={{fontSize: '0.8rem'}}/>
                                <Typography sx={{fontSize: '0.8rem'}} align='left' textTransform={'capitalize'}>&nbsp;Share </Typography>
                            </Button>
                            <Button color='primary' variant='outlined' sx={{p: 0.7}} LinkComponent={Link} to="/video/640f5d8749e3cd3da4cda5d3">
                                <VisibilityIcon sx={{fontSize: '0.8rem'}}/>
                                <Typography sx={{fontSize: '0.8rem'}} align='left' textTransform={'capitalize'}>&nbsp;{props.views} </Typography>
                            </Button>                        
                        </Stack>
                    </Grid>
                </Grid>
                <Typography align='left' fontSize={'0.8rem'} my={2}>
                    Uploaded on: {props.date}
                </Typography>
                <Typography align='left' fontSize={'1.1rem'}>
                    Description
                </Typography>
                <Divider/>
                <Typography align='left'>{props.desc}</Typography>
            </Box>
        </Paper>
    );
    
}
export default VideoDesc