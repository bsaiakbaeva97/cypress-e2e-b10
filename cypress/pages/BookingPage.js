import BasePage from './BasePage'

class BookingPage extends BasePage {

    getRadioBtn() {
        return cy.get('.radio');
    }

    getOneWay() {
        return this.getRadioBtn().eq(0);
    }

    getRoundTrip() {
        return this.getRadioBtn().eq(1);
    }

    getOneWayBtn() {
        return cy.get('.ml-0 > .mr-1');
    }

    getRoundTripBtn() {
        return cy.get(':nth-child(2) > .mr-1');
    }

    getLabel() {
        return cy.get('.label')
    }

    getDropDowns() {
        return cy.get('.field select')
    }

    getDatePicker1() {
        return cy.get('[placeholder="MM/DD/YY"]').first();
    }

    getDatePicker2() {
        return cy.get('[placeholder="MM/DD/YY"]').eq(1);
    }

    getDropDownNumOfPassengers() {
        return this.getDropDowns().eq(3);
    }

    getDropDownPassenger1() {
        return this.getDropDowns().eq(4);
    }

    getDropDownPassenger2() {
        return this.getDropDowns().eq(5);
    }

    getDropDownCabinClass() {
        return this.getDropDowns().first()
    }

    getDropDownFrom() {
        return this.getDropDowns().eq(1)
    }

    getDropDownTo() {
        return this.getDropDowns().eq(2)
    }

    getBookButton() {
        return cy.get(".Button_c_button__TmkRS");
    }    

    getNextWeekDate() {
        const today = new Date();  
        today.setDate(today.getDate() + 7); 

        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${month}/${day}/${year}`; 
    }

    getNextDay() {
        const today = new Date();  
        today.setDate(today.getDate() + 1); 

        const day = String(today.getDate()).padStart(2, '0'); 
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${month}/${day}/${year}`; 
    }

    getNextMonthDate() {
        const today = new Date(); 
        const currentMonth = today.getMonth();
        
        today.setMonth(currentMonth + 1); 
        
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
    
        return `${month}/${day}/${year}`;
     
    }

    getInfoDepartReturn() {
        return cy.get('.is-underlined');
    }

    getInfoFromTo() {
        return cy.get('.is-italic');
    }
    
    getFlightDetails() {
        return cy.get('.mt-4 > p');
    }

    getDynamicDay() {
        cy.get('is-italic + p');
    };


}


export default BookingPage
