/*global cy*/

describe("Testing our form", () => {
    before(function () {
        cy.visit("http://localhost:3000/pizza");
    });

    it("Tests the name input", () =>{
        cy.get("#name")
            .type("Randy")
    });
    it("Tests selecting a pizza size", () => {
        cy.get("#pizzaSize").select("medium");
    });
    it("Tests selecting multiple toppings", () =>{
        cy.get('#mushrooms').check();
        cy.get('#pepperoni').check();
    });
    it("Checks that the form can be submitted", () =>{
        cy.get('.submitPizza').click();
    });
});