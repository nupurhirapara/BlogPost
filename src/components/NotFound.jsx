import Navbar from "./Navbar";
import error from "../assets/Error-404.gif"

export default function NotFound(){
    return(
        <>
        <div style={{textAlign:"center",padding:"40px"}}>
        <br></br>
        <img src={error} style={{height:"200px", width:"200px"}}></img>
            <h1>404 - Page Not Found</h1>
            <br></br>
            <p>The page you are looking for does not exists.</p>
            
        </div>
        </>
    )
}