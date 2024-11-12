/// <reference types="cypress"/>

import BookingPage from "../../pages/BookingPage";

const bookingPage = new BookingPage();

describe("Book Your Trip From Tests", () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/project-3')
    })


    it("Test Case 01-02 - Validate the default Book your trip form", () => {
        const message = ['Trip type', 'Cabin Class', 'From', 'To', 'Depart', 'Return', 'Number of passengers', 'Passenger 1']

        bookingPage.getOneWay()
        .should('be.visible')
        .children()
        .should('have.attr', 'checked');

        bookingPage.getRoundTrip()
        .should('be.visible')
        .children()
        .should('not.be.checked');

        bookingPage.getDropDowns().each(($ele) => {
            cy.wrap($ele)
            .should('be.visible');
        })

        bookingPage.getDatePicker1()
        .should('be.visible').and('be.enabled');

        bookingPage.getDatePicker2()
        .should('be.visible').and('be.disabled');

        bookingPage.getDropDownNumOfPassengers()
        .should('have.value', '1');

        bookingPage.getDropDownPassenger1()
        .should("have.value", "Adult (16-64)");

        bookingPage
        .getDatePicker1()
        .should("be.visible")
        .and("be.enabled");

        bookingPage
        .getDatePicker2()
        .should("be.visible")
        .and("be.disabled");

        bookingPage
        .getBookButton()
        .should("be.visible")
        .and("be.enabled");

        bookingPage.getRoundTripBtn().click().should('be.checked');
        bookingPage.getOneWayBtn().should('not.be.checked');

    })

/*
Navigate to https://techglobal-training.com/frontend/project-3
Select the “One way” radio button
Select “Business” for the “Cabin Class” dropdown
Select “Illinois” for the “From” dropdown
Select “Florida” for the “To” dropdown
Select the next week for the ”Depart”
Select “1” for the “Number of passengers” dropdown
Select “Senior (65+)” for the Passenger 1 dropdown
Click on the “BOOK” button
Validate the booking information displayed below
DEPART
IL to FL
{dynamic date}
Number of passengers: 1
Passenger 1: Senior (65+)
Cabin Class: Business
*/

    it('Test Case 03 - Validate the booking for 1 passenger and one way', () => {
        bookingPage.getOneWayBtn().check();
       
        bookingPage.getDropDownCabinClass().select('Business');

        bookingPage.getDropDownFrom().select('Illinois');

        bookingPage.getDropDownTo().select('Florida');

        bookingPage.getDropDownNumOfPassengers().select('1');

        bookingPage.getDropDownPassenger1().select('Senior (65+)');

        bookingPage.getDatePicker1().click();

        bookingPage.getDatePickerDay().contains(bookingPage.getNextWeekDate()).click();

        bookingPage.getBookButton().click();

        bookingPage.getInfoDepartReturn().should('have.text', 'DEPART');

        bookingPage.getInfoFromTo().should('have.text', 'IL to FL');

        const text = ['Number of Passengers: 1', 'Passenger 1: Senior (65+)', 'Cabin class: Business'];

        bookingPage.getFlightDetails().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text[index])
        });
        
    });

    /*
        Navigate to https://techglobal-training.com/frontend/project-3
    Select the “Round trip” radio button
    Select “First” for the “Cabin Class” dropdown
    Select “California” for the “From” dropdown
    Select “Illinois” for the “To” dropdown
    Select the next week for the ”Depart”
    Select the next month for the “Return”
    Select “1” for the “Number of passengers” dropdown
    Select “Adult (16-64)” for the Passenger 1 dropdown
    Click on the “BOOK” button
    Validate the booking information displayed below
    DEPART
    CA to IL
    {dynamic date}
    Number of passengers: 1
    Passenger 1: Adult (16-64)
    Cabin Class: First


    RETURN
    IL to CA
    {dynamic date}
    */

    it.only('Test Case 04 - Validate the booking for 1 passenger and round trip', () => {

        bookingPage.getRoundTripBtn().check();

        bookingPage.getDropDownCabinClass().select('First');

        bookingPage.getDropDownFrom().select('California');

        bookingPage.getDropDownTo().select('Illinois');

        bookingPage.getDropDownNumOfPassengers().select('1');

        bookingPage.getDropDownPassenger1().select('Adult (16-64)');

        bookingPage.getDatePicker1().click();

        bookingPage.getDatePickerDay().contains(bookingPage.getNextWeekDate()).click();

        bookingPage.getDatePicker2().click();

        bookingPage.getDateNavBtn().click();

        bookingPage.getDatePickerDay().contains(bookingPage.getNextMonthDate()).click();

        bookingPage.getBookButton().click();       

        const text1 = ['DEPART', 'RETURN'];

        bookingPage.getInfoDepartReturn().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text1[index]);
        });

        const text2 = ['CA to IL', 'IL to CA'];

        bookingPage.getInfoFromTo().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text2[index]);      
        })

        const text3 = ['Number of Passengers: 1', 'Passenger 1: Adult (16-64)', 'Cabin class: First'];

        bookingPage.getFlightDetails().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text3[index])
        });
    });

/*
Navigate to https://techglobal-training.com/frontend/project-3
Select the “One way” radio button
Select “Premium Economy” for the “Cabin Class” dropdown
Select “New York” for the “From” dropdown
Select “Texas” for the “To” dropdown
Select the next day for the ”Depart”
Select “2” for the “Number of passengers” dropdown
Select “Adult (16-64)” for the Passenger 1 dropdown
Select “Child (2-11)” for the Passenger 2 dropdown
Click on the “BOOK” button
Validate the booking information displayed below
DEPART
NY to TX
{dynamic date}
Number of passengers: 2
Passenger 1: Adult (16-64)
Passenger 2: Child (2-11)
Cabin Class: Premium Economy
*/

    it('Test Case 05 - Validate the booking for 2 passengers and one way', () => {
       
        bookingPage.getOneWayBtn().check();
       
        bookingPage.getDropDownCabinClass().select('Premium Economy');

        bookingPage.getDropDownFrom().select('New York');

        bookingPage.getDropDownTo().select('Texas');

        bookingPage.getDropDownNumOfPassengers().select('2');

        bookingPage.getDropDownPassenger1().select('Adult (16-64)');

        bookingPage.getDropDownPassenger2().select('Child (2-11)');

        bookingPage.getDatePicker1().click();

        bookingPage.getDatePickerDay().contains(bookingPage.getNextDay()).click();

        bookingPage.getBookButton().click();

        bookingPage.getInfoDepartReturn().should('have.text', 'DEPART');

        bookingPage.getInfoFromTo().should('have.text', 'NY to TX');

        const text = ['Number of Passengers: 2', 'Passenger 1: Adult (16-64)','Passenger 2: Child (2-11)', 'Cabin class: Premium Economy'];

        bookingPage.getFlightDetails().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text[index])
        });

    })
})





