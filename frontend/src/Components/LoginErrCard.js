import { Alert, Typography } from "@mui/material";

function LoginErrCard(){
    return(
        <Alert severity="error" sx={{my:2}}>To perform that action, please Login or Signup!</Alert>
    );
}
export default LoginErrCard