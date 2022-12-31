import Address from "../models/address.js";
import * as addressService from "../services/address-service.js"

function State() {

    this.Address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();

export function init() {

    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputCep.addEventListener('change', handleInputCepChange);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);

}

function handleInputNumberChange(event){
    if(event.target.value == ""){
        setFormError("number", "Campo requerido");
    }
    else{
        setFormError("number", "");
    }
}

async function handleInputCepChange(event){
    const cep = event.target.value;

    try {
        const address = await addressService.findByCep(cep);

        state.inputStreet.value = address.street;
        state.inputCity.value = address.city;

        state.address = address;
        
        setFormError("cep", "");

        state.inputNumber.focus();
    }
    catch (e) {
        setFormError("cep", "Informe um CEP válido");
        document.forms.newAddress.street.value = '';
        document.forms.newAddress.city.value = '';
    }
}

function handleBtnClearClick(event){
    event.preventDefault();
    clearForm();
}

function clearForm(){
    document.forms.newAddress.cep.value = '';
    document.forms.newAddress.street.value = '';
    document.forms.newAddress.number.value = '';
    document.forms.newAddress.city.value = '';

    setFormError("cep", "");
    setFormError("number", "");

    state.inputCep.focus();
}

async function handleBtnSaveClick(event){
    event.preventDefault();
    console.log(event.target);
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}