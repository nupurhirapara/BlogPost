import { useContext } from "react";
import ModeContext from "../context/ModeContext";
import "./Footer.css";

export default function Footer ()  {
    const currentYear=new Date().getFullYear();
     const ctx=useContext(ModeContext)
      console.log(ctx,"context value");
return(
    <>
    
        <footer className={`footer ${ctx.mode=="dark"? "nav-dark":"nav-light"}`}>   
            <p>&copy; {currentYear}. All Rights Are reserved<b>  BlogPost</b></p>
        </footer>
       
    
    </>
)
}