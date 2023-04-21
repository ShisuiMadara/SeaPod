import { Button, Card, CardContent, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UploadIcon from '@mui/icons-material/Upload';

function Upload(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [ffile, setFfile] = useState(null)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login/redir');
        }
    }, []);

    function submit(){
        if(!localStorage.getItem('token')){
            navigate('/login/redir');
        }
        const formData = new FormData();
        formData.append('user', localStorage.getItem('user'));
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('file', ffile);
        formData.append('token', localStorage.getItem('token'));

        axios.post('http://localhost:5000/upload', formData, {
            headers:{"Content-Type": "multipart/form-data"}
        }).then((resp)=>{
            if (resp.status == 200){
                alert('Video has been uploaded! Close this aler to see the video');
                navigate('/video/'+resp.data.videoid);
            }
        }).catch((e)=>{
            alert(e.response.data);
        })
    }

    return(
        <Stack height={'85vh'} sx={{mb: 0, mt:'auto', overflow: 'scroll'}} justifyContent={'center'} direction={'column'}>
            <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={10} sm={5} md={4} lg={3}>
                    <Outlet/>
                    <Card sx={{backgroundColor: "whitesmoke"}}>
                        <CardContent>
                            <Typography align="center" variant="h6">
                                Upload Video
                            </Typography>
                            <Stack mt={5}>
                                <TextField label="Title" color={title==""?"error":"primary"} value={title} onChange={(e)=>setTitle(e.target.value)} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Stack mt={4}>
                                <TextField label="Description" color={desc==""?"error":"primary"} value={desc} onChange={(e)=>setDesc(e.target.value)} sx={{mx:2, backgroundColor:'white'}}/>
                            </Stack>
                            <Button variant="contained" component="label" sx={{mt: 4}}>
                                <Typography textTransform={'capitalize'}>Select File</Typography>
                                <input onChange={(e)=>{setFfile(e.target.files[0])}} type="file" hidden/>
                            </Button>
                            <Grid mt={5} container>
                                <Grid item xs={12}>
                                    <Button onClick={submit} disabled={title==""||desc==""||ffile==null} variant="contained"><Typography textTransform={'capitalize'}>Upload</Typography><UploadIcon/></Button>
                                </Grid>                                
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </Stack>
    );
}
export default Upload;