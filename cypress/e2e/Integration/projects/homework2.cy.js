/// <reference types="cypress"/>

describe('Login Function', () => {

  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/project-2')
});

    /*
    Navigate to https://techglobal-training.com/frontend/project-2
    Validate that the username input box is displayed
    Validate that the username input box is not required
    Validate that the label of the username input box is “Please enter your username”
    Validate that the password input box is displayed
    Validate that the password input box is not required
    Validate that the label of the password input box is “Please enter your password”
    Validate the “LOGIN” button is displayed
    Validate the “LOGIN” button is clickable
    Validate that the button text is “LOGIN”
    Validate the “Forgot Password?” link is displayed
    Validate that the “Forgot Password?” link is clickable
    Validate that the link text is “Forgot Password?”
    */

    
    it('Test Case 01 - Validate the login form', () => {

      cy.get('div > input').each(($ele) => {
        cy.wrap($ele)
        .should('be.visible')
        .and('not.have.attr', 'required')
      });

      const expectedText = [
        'Please enter your username',
        'Please enter your password' 
      ];

      cy.get('div > label').each(($ele, index) => {
        cy.wrap($ele)
        .should('have.text', expectedText[index])

      });


      cy.get('#login_btn')
      .should('be.visible')
      .and('not.be.disabled')
      .and('have.text', 'LOGIN');

      cy.get('#login_btn')
      .next()
      .should('be.visible')
      .and('not.be.disabled')
      .and('have.text', 'Forgot Password?');

      });

    it('Test Case 02 - Validate the valid login', () => {

      /*
       Navigate to https://techglobal-training.com/frontend/project-2
      Enter the username as “TechGlobal”
      Enter the password as “Test1234”
      Click on the “LOGIN” button
      Validate the success message is displayed as “You are logged in”
      Validate the logout button displayed with the text “LOGOUT”
       */

      const credentials = ['TechGlobal', 'Test1234'];

      cy.get('div > input').each(($ele, index) => {
        cy.wrap($ele).type(credentials[index]);
      });

      cy.get('#login_btn').click();

      cy.get('#success_lgn').should('have.text', 'You are logged in');

      cy.get('#logout').should('have.text', 'LOGOUT');
        
    });

    it('Test Case 03 - Validate the logout', () => {

        /*
          Navigate to https://techglobal-training.com/frontend/project-2
        Enter the username as “TechGlobal”
        Enter the password as “Test1234”
        Click on the “LOGIN” button
        Click on the “LOGOUT” button
        Validate that the login form is displayed
        */
        const credentials = ['TechGlobal', 'Test1234'];

        cy.get('div > input').each(($ele, index) => {
          cy.wrap($ele).type(credentials[index]);
        });

        cy.get('#login_btn').click();

        cy.get('#logout').click();

        cy.get('.m-auto form').should('be.visible');
    });

    it('Test Case 04 - Validate the Forgot Password? Link and Reset Password modal', () => {

      /*Navigate to https://techglobal-training.com/frontend/project-2
      Click on the “Forgot Password?” link
      Validate that the modal heading “Reset Password” is displayed
      Validate that the close button is displayed
      Validate that the email input box is displayed
      Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
      Validate the “SUBMIT” button is displayed
      Validate the “SUBMIT” button is clickable
      Validate that the button text is “SUBMIT”
      */


      const buttonWithMessage = ['#email', '#submit', '#modal_title', '.delete'];
      const expcText = ["Enter your email address and we'll send you a link to reset your password. ", 'SUBMIT', 'Reset Password'];

      cy.get('#login_btn + a').click();

      cy.get(buttonWithMessage[2]).should('have.text', expcText[2]);

      cy.wrap(buttonWithMessage).each((ele) => {
        cy.get(ele)
        .should('be.visible')
      })

      
      cy.get(buttonWithMessage[0]).parent().should('have.text', expcText[0])

      cy.get(buttonWithMessage[1]).should('be.enabled').parent().and('have.text', expcText[1])

    });

    it('Test Case 05 - Validate the Reset Password modal close button', () => {

      /*
        Navigate to https://techglobal-training.com/frontend/project-2
      Click on the “Forgot Password?” link
      Validate that the “Reset Password” modal is displayed
      Click on the close button
      Validate that the “Reset Password” modal is closed
      */
      cy.get('#login_btn + a').click();
      cy.get('.modal').should('be.visible');
      cy.get('.delete').click();
      cy.get('.modal').should('not.exist');

    })

    it('Test Case 06 - Validate the Reset Password form submission', () => {

      /*
      Navigate to https://techglobal-training.com/frontend/project-2
      Click on the “Forgot Password?” link
      Enter an email
      Click on the “SUBMIT” button
      Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
       */

      cy.get('#login_btn + a').click();
      cy.get('#email').type('test@gmail.com');
      cy.get('#submit').click();
      cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.');

    });

    it('Test Case 07 - Validate the invalid login with the empty credentials', () => {

      /*
      Navigate to https://techglobal-training.com/frontend/project-2
      Leave username empty
      Leave password empty
      Click on the “LOGIN” button
      Validate the failure message is displayed as “Invalid Username entered!” above the form
      */
      cy.get('#login_btn').click();
      cy.get('#error_message').should('be.visible').and('have.text', 'Invalid Username entered!')
    });

    it('Test Case 08 - Validate the invalid login with the wrong username', () => {

      /*
      Navigate to https://techglobal-training.com/frontend/project-2
      Enter the username as “John”
      Enter the password as “Test1234”
      Click on the “LOGIN” button
      Validate the failure message is displayed as “Invalid Username entered!” above the form
      */
      cy.get('#username').type('John');
      cy.get('#password').type('Test1234');
      cy.get('#login_btn').click();
      cy.get('#error_message').should('be.visible').and('have.text', 'Invalid Username entered!')
    });


    it('Test Case 09 - Validate the invalid login with the wrong password', () => {

      /*
      Navigate to https://techglobal-training.com/frontend/project-2
      Enter the username as “TechGlobal”
      Enter the password as “1234”
      Click on the “LOGIN” button
      Validate the failure message is displayed as “Invalid Password entered!” above the form
      */
      cy.get('#username').type('TechGlobal');
      cy.get('#password').type('1234');
      cy.get('#login_btn').click();
      cy.get('#error_message').should('be.visible').and('have.text', 'Invalid Password entered!')
    });


    it('Test Case 10 - Validate the invalid login with the wrong username and password', () => {

      /*
      Navigate to https://techglobal-training.com/frontend/project-2
      Enter the username as “John”
      Enter the password as “1234”
      Click on the “LOGIN” button
      Validate the failure message is displayed as “Invalid Username entered!” above the form
      */
      cy.get(credentials[0]).type('John');
      cy.get(credentials[1]).type('1234');
      cy.get('#login_btn').click();
      cy.get('#error_message').should('be.visible').and('have.text', 'Invalid Username entered!')
    });


    

  });


