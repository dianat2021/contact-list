// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = form.querySelector("[name='firstname']");
const lastnameInput = form.querySelector("[name='lastname']");
const phoneInput = form.querySelector("[name='phone-number']");
const addressInput = form.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");
const contactList = document.querySelector(".contacts__list");
const searchInput = document.querySelector(".search__input");
const searchOption = document.querySelector(".search__filter");
const cancelEditButton = document.querySelector(".form__cancel-edit-button");
// DECLARING VARIABLES
const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editContactId = null;
// RENDERING CONTACTS WHEN THE PAGE FIRST LOADED
document.addEventListener("DOMContentLoaded", () => renderContacts(contacts));

// FUNCTION FOR ADDING CONTACTS TO THE LIST
const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    id: editContactId || Date.now(),
    contactFirstname: firstnameInput.value.trim(),
    contactLastname: lastnameInput.value.trim(),
    contactPhoneNumber: phoneInput.value.trim(),
    contactAddress: addressInput.value.trim(),
  };

  if (editContactId) {
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === editContactId
    );
    if (contactIndex !== -1) {
      contacts[contactIndex] = contact;
    }
    editContactId = null;
    submitButton.textContent = "Add Contact";
  } else {
    contacts.push(contact);
  }
  storeContacts(contacts);
  renderContacts(contacts);
  form.reset();
};

// FUNCTION FOR STORING CONTACTS IN LOCAL STORAGE
const storeContacts = (contactsArray) => {
  localStorage.setItem("contacts", JSON.stringify(contactsArray));
};

// FUNCTION FOR DELETING CONTACTS FROM THE LIST
const deleteContacts = (id) => {
  const remainingContacts = contacts.filter((contact) => contact.id !== id);
  storeContacts(remainingContacts);
  renderContacts(remainingContacts);
  contacts.length = 0; // Clear the existing contacts array
  contacts.push(...remainingContacts); // Add the remaining contacts
};

// FUNCTION FOR EDITING CONTACTS
const editContacts = (e, id) => {
  const contactToEdit = contacts.find((contact) => contact.id === id);
  const contactRow = e.target.closest(".contacts-item");
  if (contactToEdit) {
    firstnameInput.value = contactToEdit.contactFirstname;
    lastnameInput.value = contactToEdit.contactLastname;
    phoneInput.value = contactToEdit.contactPhoneNumber;
    addressInput.value = contactToEdit.contactAddress;
    editContactId = id;
    contactRow.setAttribute("data-highlighted", "true");
    submitButton.textContent = "Update Contact";
    contactRow.classList.add("contacts-item--highlighted");
    cancelEditButton.style.display = "block";
    // contactRow.style.backgroundColor = "#FFFED3";
  } else {
    submitButton.textContent = "Add Contact";
    contactRow.style.backgroundColor = "#d4f6ff";
  }
};
const cancelEdit = (e) => {
  e.preventDefault();
  form.reset();
  cancelEditButton.style.display = "none";
  editContactId = null;
  submitButton.textContent = "Add Contact";
  const highlightedRow = document.querySelector(
    ".contacts-item[data-highlighted='true']"
  );

  highlightedRow.classList.remove("contacts-item--highlighted");
  highlightedRow.removeAttribute("data-highlighted");
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
    editButton.addEventListener("click", (e) => editContacts(e, contact.id));
  });
};

// ADD EVENT LISTENER TO THE FORM TO ADD CONTACTS
form.addEventListener("submit", addContacts);

// ADD EVENT LISTENER TO THE CANCEL EDIT BUTTON
cancelEditButton.addEventListener("click", (e) => cancelEdit(e));

// ADD EVENTLISTENER TO THE SEARCH INPUT AND MAKE IT FUNCTIONAL
searchInput.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const searchOptionValue = searchOption.value;
  const filteredArray = contacts.filter((contact) => {
    if (searchOptionValue === "firstname") {
      return contact.contactFirstname.toLowerCase().startsWith(searchQuery);
    } else if (searchOptionValue === "lastname") {
      return contact.contactLastname.toLowerCase().startsWith(searchQuery);
    } else if (searchOptionValue === "phone") {
      return contact.contactPhoneNumber.toLowerCase().startsWith(searchQuery);
    } else {
      return;
    }
  });
  renderContacts(filteredArray);
});
