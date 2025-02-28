import "cypress-file-upload";
import "cypress-real-events/support";
import ActionOnPage from "../support/pageObject/actionOnPage";
import Utils from "../support/pageObject/utils";
import ProductsPage from "./pageObject/productsPage";
import SignupPage from "../support/pageObject/signupPage";

const actionOnPage = new ActionOnPage();
const utils = new Utils();
const productsPage = new ProductsPage();
const signupPage = new SignupPage();

Cypress.Commands.add("addToCard", (productIndex) => {
  utils.isPageUrlCorrect("/products");
  productsPage.hoverAndAddToCart(productIndex);
  utils.isStringContains("p[class='text-center']", "Your product has been added to cart.");
  actionOnPage.clickButton('button[class="btn btn-success close-modal btn-block"]');
});

Cypress.Commands.add("fillSignUpForm", () => {
  cy.fixture("newUser").then((data) => {
    utils.isPageUrlCorrect("/signup");
    actionOnPage.chooseRadio(`div[id='uniform-id_gender${data.genderId}']`);
    signupPage.isInputDataCorrect("input[id='name']", data.userName);
    signupPage.isInputDataCorrect("input[id='email']", data.userEmail);
    actionOnPage.typeInputValue("input[id='password']", data.userPassword);
    actionOnPage.selectFormDropdown("select[id='days']", data.day);
    actionOnPage.selectFormDropdown("select[id='months']", data.month);
    actionOnPage.selectFormDropdown("select[id='years']", data.year);
    actionOnPage.markCheckbox("input[id='newsletter']");
    actionOnPage.markCheckbox("input[id='optin']");
    actionOnPage.typeInputValue("input[id='first_name']", data.firstName);
    actionOnPage.typeInputValue("input[id='last_name']", data.lastName);
    actionOnPage.typeInputValue("input[id='address1']", data.addressOne);
    actionOnPage.typeInputValue("input[id='address2']", data.addressTwo);
    actionOnPage.selectFormDropdown("select[id='country']", data.country);
    actionOnPage.typeInputValue("input[id='state']", data.state);
    actionOnPage.typeInputValue("input[id='city']", data.city);
    actionOnPage.typeInputValue("input[id='zipcode']", data.zipCode);
    actionOnPage.typeInputValue("input[id='mobile_number']", data.mobileNumber);
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
