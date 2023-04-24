import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function VideoDesc(props) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const { videoData } = useParams();
    const videoid = JSON.parse(videoData)._id;
    function likeHandler() {
        if (!localStorage.getItem("token")) {
            navigate("/login/redir");
            return;
        }
        axios
            .post(
                "http://seapod.centralindia.cloudapp.azure.com:5000/api/like",
                { podcastId: videoid },
                { headers: { Authorization: `bearer ${localStorage.getItem("token")}` } },
            )
            .then((res) => {
                if (res.data.success) {
                    setLiked(res.data.liked);
                    setLikes(res.data.likes);
                }
            });
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            return;
        }
        axios
            .post(
                "http://seapod.centralindia.cloudapp.azure.com:5000/api/isLiked",
                { podcastId: videoid },
                {
                    headers: {
                        Authorization: `bearer ${localStorage.getItem("token")}`,
                    },
                },
            )
            .then((resp) => {
                if (resp.data.success) {
                    setLiked(resp.data.liked);
                    setLikes(resp.data.likes);
                }
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }, []);
    return (
        <Paper
            className="rounded-lg"
            sx={{ width: "90%", mx: "auto", my: 2, backgroundColor: "whitesmoke" }}
        >
            <Box sx={{ p: 4 }}>
                <Typography variant="h5" align="left" mb={2}>
                    {props.title}
                </Typography>
                <Grid container rowSpacing={1}>
                    <Grid item xs={12} md={7}>
                        <Typography align="left" fontSize={"0.8rem"}>
                            By: {props.by}
                        </Typography>
                    </Grid>
                    <Grid item xs md>
                        <Stack spacing={1} direction={"row"} alignItems={"flex-start"}>
                            <Button
                                color="primary"
                                variant={liked ? "contained" : "outlined"}
                                sx={{ p: 0.7 }}
                                onClick={likeHandler}
                            >
                                <ThumbUpIcon sx={{ fontSize: "0.8rem" }} />
                                <Typography sx={{ fontSize: "0.8rem" }} align="left">
                                    &nbsp;{likes}{" "}
                                </Typography>
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Typography align="left" fontSize={"0.8rem"} my={2}>
                    Uploaded on: {props.date}
                </Typography>
                <Typography align="left" fontSize={"1.1rem"}>
                    Description
                </Typography>
                <Divider />
                <Typography align="left">{props.desc}</Typography>
            </Box>
        </Paper>
    );
}
export default VideoDesc;
