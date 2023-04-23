import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid} from "@mui/material";
import HomeCard from "./HomeCard";

const baseurl = "http://localhost:5000/getvideos"

function Home(){
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get(baseurl).then((resp)=>{
            if (resp.status == 200){
                let dat = resp.data.data;
                dat.reverse();
                setData(dat);
            }
        })
    }, []);

    return(
        <Box sx={{overflowY: 'scroll', my: 5, mx: {xs:2, md: 10}}}>
            <Grid container>
                {
                    data.map((dat)=>{
                        return(
                            <Grid item xs={12} md={4} lg={3} sm={6}>
                                <HomeCard data={dat}/>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default Home