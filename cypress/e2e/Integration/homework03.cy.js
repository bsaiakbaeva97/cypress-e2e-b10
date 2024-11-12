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


    it('Test Case 03 - Validate the booking for 1 passenger and one way', () => {
        bookingPage.getOneWayBtn().check();
       
        bookingPage.getDropDownCabinClass().select('Business');

        bookingPage.getDropDownFrom().select('Illinois');

        bookingPage.getDropDownTo().select('Florida');

        bookingPage.getDropDownNumOfPassengers().select('1');

        bookingPage.getDropDownPassenger1().select('Senior (65+)');

        bookingPage.getDatePicker1().clear().type(bookingPage.getNextWeekDate());

        bookingPage.getBookButton().click();

        bookingPage.getInfoDepartReturn().should('have.text', 'DEPART');

        bookingPage.getInfoFromTo().should('have.text', 'IL to FL');

        const text = ['Number of Passengers: 1', 'Passenger 1: Senior (65+)', 'Cabin class: Business'];

        bookingPage.getFlightDetails().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text[index])
        });
        
    });


    it('Test Case 04 - Validate the booking for 1 passenger and round trip', () => {

        bookingPage.getRoundTripBtn().check();

        bookingPage.getDropDownCabinClass().select('First');

        bookingPage.getDropDownFrom().select('California');

        bookingPage.getDropDownTo().select('Illinois');

        bookingPage.getDropDownNumOfPassengers().select('1');

        bookingPage.getDropDownPassenger1().select('Adult (16-64)');

        bookingPage.getDatePicker1().clear().type(bookingPage.getNextWeekDate());

        bookingPage.getDatePicker2().clear().type(bookingPage.getNextMonthDate());

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


    it('Test Case 05 - Validate the booking for 2 passengers and one way', () => {
       
        bookingPage.getOneWayBtn().check();
       
        bookingPage.getDropDownCabinClass().select('Premium Economy');

        bookingPage.getDropDownFrom().select('New York');

        bookingPage.getDropDownTo().select('Texas');

        bookingPage.getDropDownNumOfPassengers().select('2');

        bookingPage.getDropDownPassenger1().select('Adult (16-64)');

        bookingPage.getDropDownPassenger2().select('Child (2-11)');

        bookingPage.getDatePicker1().clear().type(bookingPage.getNextDay());

        bookingPage.getBookButton().click();

        bookingPage.getInfoDepartReturn().should('have.text', 'DEPART');

        bookingPage.getInfoFromTo().should('have.text', 'NY to TX');

        const text = ['Number of Passengers: 2', 'Passenger 1: Adult (16-64)','Passenger 2: Child (2-11)', 'Cabin class: Premium Economy'];

        bookingPage.getFlightDetails().each(($ele, index) => {
            cy.wrap($ele).should('have.text', text[index])
        });

        


    })
})





