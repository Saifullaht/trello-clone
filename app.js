// const columns = document.querySelectorAll('.column');
const cardbtn = document.querySelector('#cardbtn');
const main = document.querySelector("#main");


let elementuthanahai = null;


const addTask = (event) => {
    event.preventDefault();
    const currentForm = event.target;
    const value = currentForm.elements[0].value;
    const parent = currentForm.parentElement;
    const ticket = createTicket(value);
    if (!value) return; 

    parent.insertBefore(ticket, parent.firstElementChild); // Insert before the form
    
    parent.insertBefore(ticket, currentForm);
    const h3value = parent.children[0].innerText;
    if(!Array.isArray(savedtasks[h3value])){
        savedtasks[h3value] = [];
    }
    savedtasks[h3value].push(value);
    localStorage.setItem('savedtasks', JSON.stringify(savedtasks))
    
    currentForm.reset();
    
    
}


const createcard = (cardtitle) => {
    
    
    const mydiv = document.createElement("div")
    const myh3 = document.createElement("h3")
    const myform1 = document.createElement("form")
    const myinput = document.createElement("input")
    
    const h3text = document.createTextNode(cardtitle)

    mydiv.setAttribute("class" , "column" );
    
    myinput.setAttribute("type" , "text");
    myinput.setAttribute("placeholder" , "Add task");
    
    myh3.appendChild(h3text)
    myform1.appendChild(myinput)
    mydiv.appendChild(myh3)
    mydiv.appendChild(myform1)
    
    myform1.addEventListener("submit", addTask);
    mydiv.addEventListener("dragstart", (event) => {
        elementuthanahai = event.target;
    });

    mydiv.addEventListener("dragleave" , (event ) => event.preventDefault())
    mydiv.addEventListener("dragover" , (event ) => event.preventDefault())
    
    mydiv.addEventListener("drop", (event) => {
    const woelement = event.target
    if ( woelement.className.includes("column")) {
        woelement.appendChild(elementuthanahai);
      
    }
    if ( woelement.className.includes("ticket")) {
        woelement.parentElement.appendChild(elementuthanahai);
        const form = event.target.parentElement.querySelector("form");
        form.insertBefore(elementuthanahai, form.firstElementChild);
    }
});


return mydiv;

    
    
}


// myform1.reset()

cardbtn.addEventListener("click",() => {
    
    const cardtitle = prompt ("Enter card title")
    
    const yourdiv = createcard(cardtitle);
    if (!cardtitle) return; 
    main.insertBefore(yourdiv , cardbtn);
})


const createTicket = (value) => {
    const ticket = document.createElement("p");
    const elementText = document.createTextNode(value);
    ticket.setAttribute("draggable", "true");
    ticket.setAttribute("class","ticket");
    ticket.appendChild(elementText);
    
    ticket.addEventListener("mousedown", (event) => {
        dropho = event.target;
        // console.log("1");
    });
    


    return ticket;
};

let savedtasks = JSON.parse(localStorage.getItem('savedtasks'));


 

if (!savedtasks){
    savedtasks = {};
}

for (const title in savedtasks) {
    const card = createcard(title);

    const arrayOfTasks = savedtasks[title];
    
    for (let i = 0; i < arrayOfTasks.length; i++) {
        const p = createTicket(arrayOfTasks[i]);
    card.insertBefore(p, card.lastElementChild);
    
}
    main.insertBefore(card, cardbtn);
}
