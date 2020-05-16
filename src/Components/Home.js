import React from "react";
import "./Home.css";
import Header from "./Header";
import TopContent from "./TopContent";


export default function Home(props) {



    return(
        <div className="home">
            <Header/>
            <TopContent/>
        </div>
    );
}