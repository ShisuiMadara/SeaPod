import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }, [])
    return (<>Should be redirected!</>)
}
export default Logout;