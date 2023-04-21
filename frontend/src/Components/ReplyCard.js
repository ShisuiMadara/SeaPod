import { Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import React from "react";

function ReplyCard(props){
    return(
        <Card>
            <CardContent sx={{pt: 0.5, pb: 0.5}}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={'0.7rem'} color={'gray'}>
                        {props.data.user}
                    </Typography>
                    <Typography fontSize={'0.7rem'} color={'gray'}>
                        {props.data.date}
                    </Typography> 
                </Stack>
                <Typography align="justify" fontSize={'0.85rem'}>
                    {props.data.content}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default ReplyCard;