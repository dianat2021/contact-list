// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']");
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");
const contactList = document.querySelector(".contacts__list");

// DECLARING VARIABLES
const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// RENDERING CONTACTS WHEN THE PAGE FIRST LOADED
document.addEventListener("DOMContentLoaded", () => renderContacts(contacts));

// FUNCTION FOR ADDING CONTACTS TO THE LIST
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
  storeContacts(contacts);
  renderContacts(contacts);
  console.log(contacts);
};
// FUNCTION FOR STORING CONTACTS IN LOCAL STORAGE
const storeContacts = (contactsArray) => {
  localStorage.setItem("contacts", JSON.stringify(contactsArray));
};

// FUNCTION FOR DELETING CONTACTS FROM THE LIST
const deleteContacts = (id) => {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  const remainingContacts = contacts.filter((contact) => contact.id !== id);
  storeContacts(remainingContacts);
  renderContacts(remainingContacts);
};

// FUNCTION FOR RENDERING THE CONTACTS ON THE DOM
const renderContacts = (contactsArray) => {
  contactList.textContent = "";
  contactsArray.forEach((contact, index) => {
    // CREATE ELEMENTS
    const contactItem = document.createElement("li");
    const contactListNumber = document.createElement("span");
    const contactFullname = document.createElement("span");
    const contactPhoneNumber = document.createElement("span");
    const contactAddress = document.createElement("span");
    const contactTools = document.createElement("span");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // APPEND ELEMENTS
    contactList.append(contactItem);
    contactItem.append(
      contactListNumber,
      contactFullname,
      contactPhoneNumber,
      contactAddress,
      contactTools
    );
    contactTools.append(deleteButton, editButton);

    // INSERT CONTENT INTO ELEMENTS
    contactListNumber.textContent = `${index + 1}.`;
    contactFullname.textContent = `${contact.contactFirstname} ${contact.contactLastname}`;
    contactPhoneNumber.textContent = contact.contactPhoneNumber;
    contactAddress.textContent = contact.contactAddress;
    deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i> ";
    editButton.innerHTML = "<i class='fa-solid fa-pencil'></i>";

    // ADDING CLASS TO ELEMENTS
    contactItem.classList.add("contacts-item");
    contactListNumber.classList.add("contacts-item__list-number");
    contactFullname.classList.add("contacts-item__fullname");
    contactPhoneNumber.classList.add("contacts-item__phone");
    contactAddress.classList.add("contacts-item__address");
    contactTools.classList.add("contacts-item__controls");

    // ADD EVENT LISTENERS TO DELETE AND EDIT BUTTON
    deleteButton.addEventListener("click", () => deleteContacts(contact.id));
  });
};

// ADD EVENT LISTENER TO THE FORM TO ADD CONTACTS
form.addEventListener("submit", addContacts);

console.log(contacts);
