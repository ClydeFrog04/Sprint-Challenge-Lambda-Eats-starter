import React from "react";
import "./Header.css";


export default function Header(props) {

    return (
        <div className="header">
            <h1>Lambda Eats</h1>
            <div className="btnContainer">
                <button className="homeBtn">Home</button>
                <button className="helpBtn">Help</button>
            </div>
        </div>
    );

}