/// <reference types="cypress"/>

describe('Login Function', () => {
    beforeEach(() => {
        cy.visit('frontend/project-2');
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

    const credentials = ['#username', '#password']
    const data = ['TechGlobal', 'Test1234']
    
    it('Test Case 01 - Validate the login form', () => {

      
      const buttons = ['[for="username"]','[for="password"]', '#login_btn','[href="/frontend/project-2"]' ]
      const expectedText = ['Please enter your username', 'Please enter your password', 'LOGIN', 'Forgot Password?', ]

      cy.wrap(credentials).each(($ele) => {
        cy.get($ele)
        .should('be.visible')
        .and('not.have.attr', 'required')
      });

      cy.wrap(buttons).each(($ele, index) => {
        cy.get($ele)
        .should('have.text', expectedText[index])

      });

      cy.get('#login_btn, [href="/frontend/project-2"]').each(($ele) => {
      cy.get($ele)
      .should('be.visible')
      .and('not.be.disabled');
      })

    })

    it('Test Case 02 - Validate the valid login', () => {
      /*
       Navigate to https://techglobal-training.com/frontend/project-2
      Enter the username as “TechGlobal”
      Enter the password as “Test1234”
      Click on the “LOGIN” button
      Validate the success message is displayed as “You are logged in”
      Validate the logout button displayed with the text “LOGOUT”
       */

      cy.wrap(credentials).each((ele, index) => {
        cy.get(ele).clear().type(data[index])
      })

      cy.get('#login_btn').click();
      cy.get('#success_lgn').should('be.visible').and('have.text', 'You are logged in');
      cy.get('#logout').should('be.visible').and('have.text', 'LOGOUT');
        
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
        cy.wrap(credentials).each((ele, index) => {
          cy.get(ele).clear().type(data[index])
        })

        cy.get('#login_btn, #logout').each((ele) => {
          cy.wrap(ele).click()
        });
        
        cy.get('.pb-4').should('be.visible');
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
      const expcText = ["Enter your email address and we'll send you a link to reset your password. ", 'SUBMIT'];

      cy.get('#login_btn + a').click();

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
      cy.get(credentials[0]).type('John');
      cy.get(credentials[1]).type(data[1]);
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
      cy.get(credentials[0]).type(data[0]);
      cy.get(credentials[1]).type('1234');
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

  })