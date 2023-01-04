import * as modalController from './modal-controller.js';

export function init(){
    const contactLink = document.querySelector("#contact-Link");
    
    contactLink.addEventListener('click', handleContactLinkClick);
}

function handleContactLinkClick(event){
    event.preventDefault();
    modalController.showModal();
}