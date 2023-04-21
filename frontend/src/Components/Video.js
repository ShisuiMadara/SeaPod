import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Player from "./Player";
import VideoDesc from "./VideoDesc";
import Comments from "./Comments";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";

function Video(){
    const [data, setData] = useState({}); 
    const {videoid} = useParams();
    useEffect(()=>{
        axios.post('http://localhost:5000/getvideo', {videoid: videoid}).then((resp)=>{
            if (resp.status == 200){
                console.log(resp.data);
                setData(resp.data.data);
            }
            
        }).catch((e)=>{
            console.log(e);
        })
        // const obj = {
        //     views: 420,
        //     likes: 420,
        //     liked: false,
        //     title: 'Hello Yay',
        //     by: 'Tejaswi',
        //     date: '13/03/2023',
        //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a cursus turpis, at sodales est. Nulla facilisi. Phasellus cursus lorem ex, at efficitur risus varius vel. Aenean ullamcorper lorem libero, eget viverra massa porta non. Nam at bibendum felis, non iaculis elit. Praesent at ornare risus. Ut met'
        // }
        // setData(obj);
    }, [])
    return(
        <Grid container mx={'auto'} width={'95%'}>
            <Grid item xs={12} md={8} lg={9}>
                <Stack direction={'column'} spacing={2} mb={0}>
                    <Box height={'36vw'} width={'64vw'} sx={{width:{xs:'90vw', md:'64vw'}, height:{xs:'50vw', md:'36vw'}}} mt={2} mx={'auto'}>
                        <Player/>
                    </Box>
                    <Box mx={'auto'} mt={0}>
                        <VideoDesc views={data.views} likes={data.likes} title={data.title} by={data.by} date={data.date} desc={data.description}/>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs ={12} md={4} lg={3}>
                {/* <Comments/> */}
                <Outlet/>
            </Grid>
        </Grid>
    );
}
export default Video;