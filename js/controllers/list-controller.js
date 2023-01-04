function State() {
    this.listSection = null;
}

const state = new State();

export function init(){
    state.listSection = document.querySelector("#list-section");
}

export function addCard(address) {
    const card = creatCard(address);
    state.listSection.appendChild(card);
}

function creatCard(address) {

    const div = document.createElement("div");
    div.classList.add("card-cep");

    const h3 = document.createElement("h3");
    h3.innerHTML = address.city;
    
    const line = document.createElement("p");
    line.innerHTML = `${address.street}, ${address.number}`;
    line.classList.add("card-content");

    const c = document.createElement("p");
    c.innerHTML = address.cep;
    c.classList.add("card-cep-content");

    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(c);

    return div;
}