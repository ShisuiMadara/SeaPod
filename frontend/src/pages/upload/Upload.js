import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";

function Upload() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [genre, setGenre] = useState("");
    const [creatorId, setCreatorId] = useState("");
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login/redir");
        }
    }, []);

    function submit() {
        if (!localStorage.getItem("token")) {
            navigate("/login/redir");
        }
        const formData = new FormData();
        formData.append("name", title);
        formData.append("description", desc);
        formData.append("genre", genre);
        formData.append("video", file.name.endsWith('.mp4') ? 'yes' : 'no')
        formData.append("creatorId", creatorId);
        formData.append("file", file);

        axios
            .post("http://localhost:5000/api/upload", formData, {
                headers: { "Authorization": `bearer ${localStorage.getItem('token')}` },
            })
            .then((resp) => {
                if (resp.data.success) {
                    alert("Video has been uploaded! Close this alert to see the video");
                    navigate("/video/" + resp.data.id);
                } else {
                    alert(resp.data.message);
                }
            })
            .catch((e) => {
                alert(e.response.data);
            });
    }

    return (
        <Stack
            height={"85vh"}
            sx={{ mb: 0, mt: "auto", overflow: "scroll" }}
            justifyContent={"center"}
            direction={"column"}
        >
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={12} sm={8} md={5} lg={3}>
                    <div className="p-8 bg-sky-50 rounded shadow-lg w-full">
                        <div className="w-full sm:mt-8 lg:mt-16 mb-8 font-semibold text-xl font-serif">Upload Podcast</div>
                        <div className="mt-8 mb-8 w-full">
                            <TextField
                                className="p-2 w-full rounded"
                                label="Title"
                                color={title === "" ? "error" : "primary"}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ backgroundColor: "white" }}
                            />
                        </div>
                        <div className="mt-8 mb-8 w-full">
                            <TextField
                                className="p-2 w-full rounded"
                                label="CreatorID"
                                color={creatorId === "" ? "error" : "primary"}
                                value={creatorId}
                                onChange={(e) => setCreatorId(e.target.value)}
                                sx={{ backgroundColor: "white" }}
                            />
                        </div>
                        <div className="mt-4 mb-8 w-full">
                            <TextareaAutosize
                                minRows={5}
                                maxRows={5}
                                placeholder="Type Description Here…"
                                className="p-2 w-full rounded"
                                label="Description"
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                                color={desc === "" ? "error" : "primary"}
                                style={{ border: "1px solid #c4c4c4" }}
                            />
                        </div>
                        <div className="mt-8 mb-8 w-full">
                            <FormControl className="w-full">
                                <InputLabel>Genre</InputLabel>
                                <Select
                                    value={genre}
                                    label="Genre"
                                    onChange={(event) => setGenre(event.target.value)}
                                    sx={{ backgroundColor: "white", width: "100%" }}
                                >
                                    <MenuItem value={"Educational"}>Educational</MenuItem>
                                    <MenuItem value={"Devotional"}>Devotional</MenuItem>
                                    <MenuItem value={"Adventure"}>Adventure</MenuItem>
                                    <MenuItem value={"Interview"}>Interview</MenuItem>
                                    <MenuItem value={"Story"}>Story</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div
                            className="mt-4 mb-8 p-2 w-full bg-sky-600 rounded text-white cursor-pointer select-none flex flex-row justify-between"
                            onClick={(event) => {
                                if (event.target.id !== "closeButton") {
                                    document.getElementById("uploadFileButton").click();
                                }
                            }}
                        >
                            <label>{file ? `Selected - ${file.name}` : "Select file"}</label>
                            <input
                                id="uploadFileButton"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                                type="file"
                                hidden
                            />
                            <button id="closeButton" onClick={() => setFile(null)}>
                                X
                            </button>
                        </div>
                        <Grid className="mt-8 sm:mb-8 lg:mt-16" container>
                            <Grid item xs={12}>
                                <Button
                                    onClick={submit}
                                    disabled={title === "" || desc === "" || file == null}
                                    style={{ width: "100%", padding: 10 }}
                                    variant="contained"
                                >
                                    <Typography textTransform={"capitalize"}>Upload</Typography>
                                    <UploadIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </Stack>
    );
}
export default Upload;
