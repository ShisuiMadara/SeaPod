import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomeCard(props){
    return(
        <Card variant="elevation" sx={{width: '95%', height: 360, mx:'auto', my:1}}>
            <CardActionArea LinkComponent={Link} to={"/video/"+props.data._id}>
                <CardMedia sx={{maxHeight:200, overflowY:"clip", overflowX:'clip', backgroundColor: 'black'}}>
                    <img src={props.data.thumbnail} Height={200} width={'auto'}/>
                </CardMedia>
                <CardContent>
                    <Tooltip title={props.data.title}>
                        <Typography align="left" variant="h6" gutterBottom sx={{display: '-webkit-box', overflow: "hidden",textOverflow: "ellipsis", WebkitLineClamp: "2", WebkitBoxOrient: "vertical"}}>{props.data.title}</Typography>
                    </Tooltip>
                    <Tooltip title="Name"><Typography fontSize={'0.8rem'} align="left" noWrap>By: {props.data.by}</Typography></Tooltip>
                    {/* <Stack direction={'row'} justifyContent={'space-between'}>
                        <Chip variant="filled" color="primary" label={props.data.views + ' views'}/>
                        <Chip variant="filled" color="primary" label={props.data.likes + ' likes'}/>
                        <Chip variant="filled" color="primary" label={props.data.time}></Chip>
                    </Stack> */}
                    <Typography fontSize={'0.8rem'} align="left">Length: {props.data.time}</Typography>
                    <Typography fontSize={'0.8rem'} align="left">Views: {props.data.views}</Typography>
                    <Typography fontSize={'0.8rem'} align="left">Likes: {props.data.likes}</Typography>
                    <Typography fontSize={'0.8rem'} align="left">Uploaded On: {props.data.date}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default HomeCard;