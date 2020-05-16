import React, {useEffect, useState} from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import Header from "./Header";

//style components
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
}
`;
const StyledLabel = styled.label`
    display: flex;
    justify-content: space-between;
    margin: 1% 0;
`;
const StyledCheckboxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1% 0;
`;
const StyledFormContainer = styled.div`
    margin: 2%;
`;

//set up form schema
const formSchema = yup.object().shape({
    name: yup.string().min(2).required("Name is a required field"),
    pizzaSize: yup.string().oneOf(["small", "medium", "large"], "Please select a size"),
    mushrooms: yup.boolean().oneOf([true, false]),
    pepperoni: yup.boolean().oneOf([true, false]),
    cheese: yup.boolean().oneOf([true, false]),
    olives: yup.boolean().oneOf([true, false]),
    specialInstructions: yup.string(),
});

export default function PizzaForm(props) {
    const [formData, setFormData] = useState({
        name: "",
        pizzaSize: "",
        mushrooms: false,
        pepperoni: false,
        cheese: false,
        olives: false,
        specialInstructions: ""
    });
    const [errorState, setErrorState] = useState({
        name: "",
        pizzaSize: "",
        mushrooms: "",
        pepperoni: "",
        cheese: "",
        olives: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    //decide if button should be abled or not
    useEffect(() => {
        formSchema.isValid(formData).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formData]);

    const validate = (event) => {
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        yup.reach(formSchema, event.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [event.target.name]: ""
                });
            })
            .catch(error => {
                setErrorState({
                    ...errorState,
                    [event.target.name]: error.errors[0]
                });
            });
    }
    const handleChange = (event) => {
        event.persist();
        validate(event);
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setFormData({...formData, [event.target.name]: value})//set the value at a key with the value acquired above
    }
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formData)
            .then(response => console.log(response))
            .catch(console.log);
    }

    return (
        <StyledFormContainer className="pizzaFormContainer">
            <Header/>
            <StyledForm onSubmit={submitForm} className="pizzaForm">
                <StyledLabel htmlFor="name">Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </StyledLabel>
                <StyledLabel htmlFor="pizzaSize">What size would you like?
                    <select
                        value={formData.size}
                        name="pizzaSize"
                        id="pizzaSize"
                        onChange={handleChange}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </StyledLabel>
                <StyledCheckboxContainer className="toppings">
                    <label htmlFor="toppings">Mushrooms
                        <input
                            type="checkbox"
                            id="mushrooms"
                            name="mushrooms"
                            checked={formData.mushrooms}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="toppings">Pepperoni
                        <input
                            type="checkbox"
                            id="pepperoni"
                            name="pepperoni"
                            checked={formData.pepperoni}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="toppings">Cheese
                        <input
                            type="checkbox"
                            id="cheese"
                            name="cheese"
                            checked={formData.cheese}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="toppings">Olives
                        <input
                            type="checkbox"
                            id="olives"
                            name="olives"
                            checked={formData.olives}
                            onChange={handleChange}
                        />
                    </label>
                </StyledCheckboxContainer>
                <StyledLabel htmlFor="specialInstructions">Special Instructions
                    <textarea
                        type="text"
                        name="specialInstructions"
                        id="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleChange}
                    />
                </StyledLabel>
                <button className={"submitPizza"} disabled={buttonDisabled}>Add to Order</button>
            </StyledForm>
        </StyledFormContainer>
    );
}