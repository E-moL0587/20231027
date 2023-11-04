import React from "react";
// import Makebutton from "./parts/button";
import "./1_Home.jsx";
import "./0_Login.css"

function Login({onHome}){
    return (
    <div class="login_field">
        <input type="text"
            placeholder="ユーザーID"
        />
        <button onClick={onHome}>ログイン</button>
    </div>
    );
}



export default Login;
