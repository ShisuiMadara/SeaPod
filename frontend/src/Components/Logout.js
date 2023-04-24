import { useEffect } from "react";

function Logout() {
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    }, []);
    return <>Should be redirected!</>;
}
export default Logout;
