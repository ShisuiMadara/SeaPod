import { useState } from "react";
import {Box} from "@mui/material"
import { useParams } from "react-router-dom";

function Player(){
    const {videoid} = useParams();
    return(
        <Box sx={{height: "100%", width:"100%"}}>
            <video controls muted autoPlay style={{backgroundColor: "black", objectFit: "scale-down", width:"100%", height:"100%"}}>
                <source src={'http://localhost:5000/stream/'+videoid} ></source>
            </video>
        </Box>
    )
}
export default Player;