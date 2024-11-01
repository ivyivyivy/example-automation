import configuration from '../fixtures/configuration.json'
import user from '../fixtures/user.json'

beforeEach(() => {

    // 2. Navigate to url 'https://automationexercise.com'
    cy.visit(configuration.base_url)
  
    // 3. Verify that home page is visible successfully
    cy.get('.left-sidebar > :nth-child(1)').should("be.visible").and("contain", "Category")
    cy.get('.features_items > .title').should("be.visible").and("contain", "Features Items")

    // 4. Click on 'Signup / Login'
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should("be.visible").and("contain", "Signup / Login").click()

    // 5. Verify 'Login to your account' is visible
    cy.get('.login-form > h2').should("be.visible").and("contain", "Login to your account")

    // 5. Verify 'New User Signup!' is visible
    cy.get('.signup-form > h2').should("be.visible").and("contain", "New User Signup!")
  
})

describe('User registration process', () => {

  it('creates a new user, verifies and logs out', () => {

    // 6. Enter name and email address
    cy.get('[data-qa="signup-name"]').type(user.name)
    cy.get('[data-qa="signup-email"]').type(user.email)

    // 7. Click 'Signup' button
    cy.get('[data-qa="signup-button"]').click();
  
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    cy.get('.login-form > .title > b').should("be.visible").and("contain", "Enter Account Information")

    // 9. Fill details: Title, Name, Email, Password, Date of birth
    if(user.title === "Mr."){
      cy.get('#id_gender1').check()
    }
    else if(user.title === "Mrs."){
      cy.get('#id_gender2').check()
    }

    cy.get('[data-qa="password"]').type(user.password)
    cy.get('[data-qa="days"]').select(user.date_of_birth.day)
    cy.get('[data-qa="months"]').select(user.date_of_birth.month)
    cy.get('[data-qa="years"]').select(user.date_of_birth.year)

    // 10. Select checkbox 'Sign up for our newsletter!'
    cy.get('#newsletter').check()

    //11. Select checkbox 'Receive special offers from our partners!'
    cy.get('#optin').check()

    /* 
    12. Fill details: First name, Last name, Company, Address, Address2, 
        Country, State, City, Zipcode, Mobile Number 
    */
    cy.get('[data-qa="first_name"]').type(user.first_name)
    cy.get('[data-qa="last_name"]').type(user.last_name)
    cy.get('[data-qa="company"]').type(user.company)
    cy.get('[data-qa="address"]').type(user.address)
    cy.get('[data-qa="address2"]').type(user.address_2)
    cy.get('[data-qa="country"]').select(user.country)
    cy.get('[data-qa="state"]').type(user.state)
    cy.get('[data-qa="city"]').type(user.city)
    cy.get('[data-qa="zipcode"]').type(user.zip)
    cy.get('[data-qa="mobile_number"]').type(user.mobile)

    // 13. Click 'Create Account button'
    cy.get('[data-qa="create-account"]').click()

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    cy.get('[data-qa="account-created"]').should("be.visible").and("contain", "Account Created!")

    // 15. Click 'Continue' button
    cy.get('[data-qa="continue-button"]').click()

    // 16. Verify that 'Logged in as username' is visible
    cy.get(':nth-child(10) > a > b').contains(user.name)

    /*

    Leaving this out and replacing it with logout functionality so all tests can run through

    // 17. Click 'Delete Account' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').should("be.visible").and("contain", "Delete Account").click()

    //18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.get('[data-qa="account-deleted"]').should("be.visible").and("contain", "Account Deleted!")
    cy.get('[data-qa="continue-button"]').click()

    */

    // 17. Click 'Logout' button
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should("be.visible").and("contain", "Logout").click();

    // 18. Verify user is logout successfully
    cy.get('.signup-form > h2').should("be.visible").and("contain", "New User Signup!")

  })

})

describe('User login process', () => { 
  
  it('logs in a user with non existing email and password', () => {

    // 6. Enter incorrect email address and password
    cy.get('[data-qa="login-email"]').type(configuration.non_existing_mail)
    cy.get('[data-qa="login-password"]').type(configuration.wrong_password)

    // 7. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 8. Verify error 'Your email or password is incorrect!' is visible
    cy.get('.login-form p').should("be.visible").and("contain", "Your email or password is incorrect!")

  })

  it('logs in a user with correct email and password then delete it', () => {

    // 6. Enter correct email address and password
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)

    // 7. Click 'login' button
    cy.get('[data-qa="login-button"]').click()

    // 8. Verify that 'Logged in as username' is visible
    cy.get(':nth-child(10) > a > b').contains(user.name)

    // 9. Click 'Delete Account' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').should("be.visible").and("contain", "Delete Account").click()

    //10. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.get('[data-qa="account-deleted"]').should("be.visible").and("contain", "Account Deleted!")
    cy.get('[data-qa="continue-button"]').click()
  })

})