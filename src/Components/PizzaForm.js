import React, {useEffect, useState} from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";

//style components
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 300px;
    margin: 0 auto;
}
`;
//set up form schema
/*
const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Email address is invalid").required("Must be a valid email address"),
    password: yup.string().required("Password is a required field"),
    tos: yup.boolean().oneOf([true], "You must agree to our terms of service")
});
 */
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
        validate(event);//todo: write validate
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
        <div className="pizzaFormContainer">
            <StyledForm onSubmit={submitForm} className="pizzaForm">
                <label htmlFor="name">Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}//todo: create state schema
                        onChange={handleChange}//todo: write this function
                    />
                </label>
                <label htmlFor="pizzaSize">What size would you like?
                    <select
                        value={formData.size}//todo:write this in state
                        name="pizzaSize"
                        id="pizzaSize"
                        onChange={handleChange}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </label>
                <div className="toppings">{/*todo: break this out and stlye*/}
                    <label htmlFor="toppings">Mushrooms
                        <input
                            type="checkbox"
                            id="mushrooms"
                            name="mushrooms"
                            checked={formData.mushrooms}//todo write this
                            onChange={handleChange}//todo: look above
                        />
                    </label>
                    <label htmlFor="toppings">Pepperoni
                        <input
                            type="checkbox"
                            id="pepperoni"
                            name="pepperoni"
                            checked={formData.pepperoni}//todo write this
                            onChange={handleChange}//todo: look above
                        />
                    </label>
                    <label htmlFor="toppings">Cheese
                        <input
                            type="checkbox"
                            id="cheese"
                            name="cheese"
                            checked={formData.cheese}//todo write this
                            onChange={handleChange}//todo: look above
                        />
                    </label>
                    <label htmlFor="toppings">Olives
                        <input
                            type="checkbox"
                            id="olives"
                            name="olives"
                            checked={formData.olives}//todo write this
                            onChange={handleChange}//todo: look above
                        />
                    </label>
                </div>
                <label htmlFor="specialInstructions">Special Instructions
                    <textarea
                        type="text"
                        name="specialInstructions"
                        id="specialInstructions"
                        value={formData.specialInstructions}//todo: create state schema
                        onChange={handleChange}//todo: write this function
                    />
                </label>
                <button disabled={buttonDisabled}>Add to Order</button>
            </StyledForm>
        </div>
    );
}

/*
<label htmlFor="positions">
        What would you like to help with?
        <select
          value={formState.position}
          name="position"
          id="positions"
          onChange={inputChange}
        >
          <option value="Newsletter">Newsletter</option>
          <option value="Yard Work">Yard Work</option>
          <option value="Administrative Work">Administrative Work</option>
          <option value="Tabling">Tabling</option>
        </select>
        {errorState.position.length > 0 ? (
          <p className="error">{errorState.position}</p>
        ) : null}
      </label>
 */