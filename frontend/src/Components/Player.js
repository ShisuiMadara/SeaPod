import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Player() {
    let { videoData } = useParams();
    videoData = JSON.parse(videoData);
    const videoid = videoData._id;
    useEffect(() => {
        const element = document.getElementById("videoPlayer");
        element.currentTime = videoData.position;
        const timeLineUpdater = setInterval(() => {
            axios
                .post(
                    "http://seapod.centralindia.cloudapp.azure.com:5000/api/updatepos",
                    {
                        podcastId: videoid,
                        position: element.currentTime,
                    },
                    { headers: { Authorization: `bearer ${localStorage.getItem("token")}` } },
                )
                .then((res) => {
                    if (res.data.success) {
                        console.log(`Updated Time on server to ${element.currentTime}`);
                    } else {
                        console.log(`Update Failed.`);
                    }
                });
        }, 15000);
        window.onunload = () => {
            clearInterval(timeLineUpdater);
        };
        return () => {
            clearInterval(timeLineUpdater);
        };
    }, []);
    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <video
                id="videoPlayer"
                className="rounded-lg"
                controls
                style={{
                    backgroundColor: "black",
                    objectFit: "scale-down",
                    width: "100%",
                    height: "100%",
                }}
                autoPlay={true}
            >
                <source src={"http://seapod.centralindia.cloudapp.azure.com:5000/stream/" + videoid}></source>
            </video>
        </Box>
    );
}
export default Player;
