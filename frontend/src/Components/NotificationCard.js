import { Alert, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotificationCard(props){
    const navigate = useNavigate();

    function press(){
        if (props.data.type == "reply"){
            navigate('/video/' + props.data.videoid + '/' + props.data.commentid);
        }
        else{
            navigate('/video/' + props.data.videoid);
        }
    }

    if (props.data.type == 'comment'){
        return(
            <Alert variant="outlined" severity="success">
                {props.data.by} commented on your Video. <Button onClick={press} variant="text" color="success"><Typography textTransform={'capitalize'} fontWeight={600}>Check It.</Typography></Button>
            </Alert>
        )
    }
    else{
        return(
            <Alert variant="outlined" severity="info">
                {props.data.by} replied to your comment. <Button onClick={press} variant="text" color="success"><Typography textTransform={'capitalize'} fontWeight={600}>Check It.</Typography></Button>
            </Alert>
        );
    }
}
export default NotificationCard