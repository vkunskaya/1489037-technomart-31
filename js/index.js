/* common functions */
let openedModal = null;

function openModal(modal) {
  if (openedModal) {
    closeModal(openedModal);
  }
  modal?.classList?.remove('modal-closed');
  openedModal = modal;
}

function closeModal(modal) {
  modal?.classList?.add('modal-closed');
  openedModal = null;
}

function addOpenModalListener(element, modal, prevent = true, animate = false) {
  element?.addEventListener('click', event => {
    if (prevent) {
      event.preventDefault();
    }

    if (animate) {
      modal?.classList?.add('modal-show');
      setTimeout(() => contactCompanyModal?.classList.remove('modal-show'), 600);
    }

    openModal(modal);
  });
}

function addCloseModalListener(element, modal, prevent = true) {
  element?.addEventListener('click', event => {
    if (prevent) {
      event.preventDefault();
    }

    closeModal(modal);
  });
}

function addBuyProductListener(element, modal) {
  element?.addEventListener('click', event => {
    if (event.target.classList.contains('product-buy-button')) {
      openModal(modal);
    }
  });
}

function unsetRequired(field) {
  if (field) {
    field.required = false;
  }
}

/* add listenters to cart modal buttons */

const cartModal = document.querySelector('.modal-cart');
const makeOrderLink = cartModal?.querySelector('.make-order-link');

cartModal?.addEventListener('click', ({ target }) => {
  if (
    target.classList.contains('modal-close-button')
    || target.classList.contains('continue-shopping-button')
  ) {
    closeModal(cartModal);
  }
});

addCloseModalListener(makeOrderLink, cartModal, false);

/* get index.html elements */
const contactCompanyButton = document.querySelector('.company-contact-modal-link');
const contactCompanyModal = document.querySelector('.modal-contact-company');
const contactCompanyForm = contactCompanyModal?.querySelector('.contact-company-form');
const nameField = contactCompanyForm?.querySelector('[name="name"]');
const emailField = contactCompanyForm?.querySelector('[name="email"]');
const textField = contactCompanyForm?.querySelector('[name="email-text"]');
const closeContactCompanyButton = contactCompanyModal?.querySelector('.modal-close-button');
const companyMapLink = document.querySelector('.company-contacts-map');
const companyMapModal = document.querySelector('.modal-map');
const closeCompanyMapButton = companyMapModal?.querySelector('.modal-close-button');
const popularProductsList = document.querySelector('.popular-products-list');

unsetRequired(nameField);
unsetRequired(emailField);
unsetRequired(textField);

/* add open/close listeners to modals */
addOpenModalListener(contactCompanyButton, contactCompanyModal, true, true);
addCloseModalListener(closeContactCompanyButton, contactCompanyModal);
addOpenModalListener(companyMapLink, companyMapModal);
addCloseModalListener(closeCompanyMapButton, companyMapModal);

/* add open cart modal listener to popular products list */
addBuyProductListener(popularProductsList, cartModal);

/* process company contact form submit, save name and email data to local storage */
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

contactCompanyForm?.addEventListener('submit', event => {
  if (!nameField?.value || !emailField?.value || !textField?.value) {
    event.preventDefault();
    console.log('submit');
    contactCompanyModal?.classList.add('modal-error');
    setTimeout(() => contactCompanyModal?.classList.remove('modal-error'), 600);
  } else {
    localStorage.setItem('name', nameField.value);

    if(emailRegExp.test(emailField?.value)) {
      localStorage.setItem('email', emailField?.value);
    }

    closeModal(contactCompanyModal);
  }
});

/* restore user's name and email from local storage, focus on appropriate field */

contactCompanyButton?.addEventListener('click', () => {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  if (!name && !email) {
    nameField?.focus();
  } else {
    if (name && nameField) {
      nameField.value = name;
      emailField?.focus();
    }
  
    if (email && emailField) {
      emailField.value = email;
      textField?.focus();
    }
  }

  if (textField) {
    textField.value = '';
  }
});

/* get catalog.html elements */
const catalogProductsList = document.querySelector('.catalog-products-list');

/* add open cart modal listener to catalog products list */
addBuyProductListener(catalogProductsList, cartModal);
