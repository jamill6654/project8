//VARIABLES
let employees=[];
const urlAPI = `https://randomuser.me/api/?results=12&nat=au,us,ca&exc=login`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const text = document.querySelector(".text-container");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const search = document.querySelector(".search-field");
let current = 0;

//FETCH FROM API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

//DISPLAY EMPLOYEES FUNCTION
function displayEmployees(employeeData) {
    employees = employeeData;
    
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
    
        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                
            </div>
        </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

//DISPLAY MODAL FUNCTION
function displayModal(index) {
    let{name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

//EVENT HANDLERS
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer){
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        current = index;

        displayModal(index);
    } 
});

next.addEventListener('click', () => {
    if(current === 11){
        current = 0;
        displayModal(current);
    }
    else
    current++;
    displayModal(current);
});

previous.addEventListener('click', ()=>{
    if(current === 0){
        current = 11;
        displayModal(current);
    }
    else
    current--;
    displayModal(current);
} );

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

search.addEventListener('keyup', ()=>{
    const cards = document.querySelectorAll(".card");
    console.log(cards);
    cards.forEach((card) => {
        let texto = card.querySelector("h2").innerHTML.toLowerCase();
        if(texto.includes(search.value.toLowerCase())){
                card.style.display = '';
            }
            else {
                card.style.display = "none";
            }
        });
    });