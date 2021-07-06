function openModal(modal) {
  modal.classList.remove('modal-closed');
}

function closeModal(modal) {
  modal.classList.add('modal-closed');
}

function addOpenModalListener(element, modal, prevent = true, animate = false) {
  element.addEventListener('click', event => {
    if (prevent) {
      event.preventDefault();
    }

    if (animate) {
      modal.classList.add('animate-modal');
    }

    openModal(modal);
  });
}

function addCloseModalListener(element, modal, prevent = true) {
  element.addEventListener('click', event => {
    if (prevent) {
      event.preventDefault();
    }

    closeModal(modal);
  });
}

function addBuyProductListener(element, modal) {
  element.addEventListener('click', event => {
    if (event.target.classList.contains('product-buy-button')) {
      openModal(modal);
    }
  });
}

/* add listenters to cart modal buttons */

const cartModal = document.querySelector('.modal-cart');
const makeOrderLink = cartModal.querySelector('.make-order-link');

cartModal.addEventListener('click', ({ target }) => {
  if (
    target.classList.contains('modal-close-button')
    || target.classList.contains('continue-shopping-button')
  ) {
    closeModal(cartModal);
  }
});

addCloseModalListener(makeOrderLink, cartModal, false);
