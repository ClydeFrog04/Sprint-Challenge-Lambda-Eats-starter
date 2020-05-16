import React from "react";
import "./TopContent.css";
import {Link} from "react-router-dom";


export default function TopContent() {

    return (
        <div className="topContent">
            <h2>Your favorite food delivered, while sprinting :]</h2>
            <Link to={"/pizza"}>
                <button className="pizzaBtn">Pizza?</button>
            </Link>
        </div>
    );
}