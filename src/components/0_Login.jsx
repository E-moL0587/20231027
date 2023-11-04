import React, { useState } from "react";
import Makebutton from "./parts/button";
import "./1_Home.jsx";
import "./0_Login.css"

function Login({onBack}){
    return (
    <div class="login_field">
        <input type="text"
            placeholder="ユーザーID"
        />
        <button>ログイン</button>
    </div>
    );
}



export default Login;
