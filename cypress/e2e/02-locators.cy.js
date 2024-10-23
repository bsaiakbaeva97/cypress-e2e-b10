/// <reference types="cypress"/>

describe("CSS Locators", () => {
  it("Understanding CSS Syntax - Locating using tags", () => {
    cy.visit("https://www.techglobal-training.com");
  });

  it("Understanding CSS Syntax - Locating class and id", () => {
    cy.get('label.is-inline')
  });
});