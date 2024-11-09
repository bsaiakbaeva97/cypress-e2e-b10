/// <reference types="cypress"/>
import TablePage from "../../pages/TablePage";

describe("Static Tables", () => {
    beforeEach(() => {
        cy.clickCard("Tables")

        cy.fixture('example').then(function(data) {
            this.header1 = data.header1
            this.header2 = data.header2
            this.header3 = data.header3
            this.header4 = data.header4
          })
});
    /**
     * TEST CASE 1
     * Verify the headers of the table
     * Go to https://techglobal-training.com/frontend/
     * Click on the "Tables" card
     * Validate the headers of the table are "Rank", "Company", "Employees", and "Country"
     */

    const tablePage = new TablePage();
    it("Verify the headers of the table", {tags : '@smoke'},() => {

        tablePage.getHeaders().each(function ($el, index) {
            cy.wrap($el).should("have.text", this.headers[index]);

    });
  })
})