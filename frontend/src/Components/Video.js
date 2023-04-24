import { Box, Grid, Stack, Typography } from "@mui/material";
import Player from "./Player";
import VideoDesc from "./VideoDesc";
import { Outlet, useParams } from "react-router-dom";


function Video(){
    const {videoData} = useParams();
    const data = JSON.parse(videoData);
    return(
        <Grid container mx={'auto'} width={'95%'}>
            <Grid item xs={12} md={8} lg={9}>
                <Stack direction={'column'} spacing={2} mb={0}>
                    <Box height={'36vw'} width={'64vw'} sx={{width:{xs:'90vw', md:'64vw'}, height:{xs:'50vw', md:'36vw'}}} mt={2} mx={'auto'}>
                        <Player/>
                    </Box>
                    <Box mx={'auto'} mt={0}>
                        <VideoDesc likes={data.likes} title={data.name} by={data.creatorId} date={data.uploadDate} desc={data.description}/>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs ={12} md={4} lg={3}>                
                <Outlet/>
            </Grid>
        </Grid>
    );
}
export default Video;