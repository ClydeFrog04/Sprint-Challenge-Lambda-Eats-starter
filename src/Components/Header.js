import React from "react";
import "./Header.css";
import {Link} from "react-router-dom";


export default function Header() {

    return (
        <div className="header">
            <h1>Lambda Eats</h1>
            <div className="btnContainer">
                <Link to={"/"}>
                    <button className="homeBtn">Home</button>
                </Link>
                <button className="helpBtn">Help</button>
            </div>
        </div>
    );

}