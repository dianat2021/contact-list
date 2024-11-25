// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']");
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");

// DECLARING VARIABLES
const contacts = [];

const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    id: Date.now(),
    contactFirstname: firstnameInput.value,
    contactLastname: lastnameInput.value,
    contactPhoneNumber: phoneInput.value,
    contactAddress: addressInput.value,
  };
  contacts.push(contact);
  console.log(contacts);
};

// ADD EVENT LISTENER TO THE FORM TO ADD CONTACTS
form.addEventListener("submit", addContacts);
