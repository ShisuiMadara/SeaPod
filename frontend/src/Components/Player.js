import { Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Player() {
    const { videoData } = useParams();
    const videoid = JSON.parse(videoData)._id;
    useEffect(() => {
        const element = document.getElementById("videoPlayer");
        element.currentTime = videoData.position;
        element.play();
        const timeLineUpdater = setInterval(() => {
            axios.post(
                "http://localhost:5000/api/updatepos",
                {
                    podcastId: videoid,
                    position: element.currentTime,
                },
                { headers: { Authorization: `bearer ${localStorage.getItem("token")}` } },
            );
        }, 15000);
        window.onunload = () => {
            clearInterval(timeLineUpdater);
        }
        return () => {
            clearInterval(timeLineUpdater);
        }
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
            >
                <source src={"http://localhost:5000/stream/" + videoid}></source>
            </video>
        </Box>
    );
}
export default Player;
