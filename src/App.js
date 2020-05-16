import React from "react";
import Home from "./Components/Home";
import {Route} from "react-router-dom";
import PizzaForm from "./Components/PizzaForm";

const App = () => {
    return (
        <div className="lambdaEats">
            <Route exact path="/">
                <Home/>
            </Route>
            <Route path="/pizza">
                <PizzaForm/>
            </Route>
        </div>
    );
};
export default App;
