const contactCompanyButton = document.querySelector('.company-contact-modal-button');
const contactCompanyModal = document.querySelector('.modal-contact-company');
const contactCompanyForm = contactCompanyModal.querySelector('.contact-company-form');
const nameField = contactCompanyForm.querySelector('[name="name"]');
const emailField = contactCompanyForm.querySelector('[name="email"]');
const textField = contactCompanyForm.querySelector('[name="email-text"]');
const closeContactCompanyButton = contactCompanyModal.querySelector('.modal-close-button');
const companyMapLink = document.querySelector('.company-contacts-map');
const companyMapModal = document.querySelector('.modal-map');
const closeCompanyMapButton = companyMapModal.querySelector('.modal-close-button');
const popularProductsList = document.querySelector('.popular-products-list');

/* add open/close listeners to modals */
addOpenModalListener(contactCompanyButton, contactCompanyModal, true, true);
addCloseModalListener(closeContactCompanyButton, contactCompanyModal);
addOpenModalListener(companyMapLink, companyMapModal);
addCloseModalListener(closeCompanyMapButton, companyMapModal);

/* add open cart modal listener to popular products list */
addBuyProductListener(popularProductsList, cartModal);

/* process company contact form submit, save name and email data to local storage */
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

contactCompanyForm.addEventListener('submit', event => {
  if (nameField.value) {
    localStorage.setItem('name', nameField.value);
  }

  if(emailField.value && emailRegExp.test(emailField.value)) {
    localStorage.setItem('email', emailField.value);
  }

  closeModal(contactCompanyModal);
});

/* restore user's name and email from local storage, focus on appropriate field */

contactCompanyButton.addEventListener('click', () => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  if (!name && !email) {
    nameField.focus();
  } else {
    if (name) {
      nameField.value = name;
      emailField.focus();
    }
  
    if (email) {
      emailField.value = email;
      textField.focus();
    }
  }

  textField.value = '';
});

