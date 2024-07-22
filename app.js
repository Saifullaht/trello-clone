const cardbtn = document.querySelector("#cardbtn");
const main = document.querySelector("#main");
let elementuthanahai = null;

// Function to add a task when form is submitted
const addTask = (event) => {
  event.preventDefault();
  const currentForm = event.target;
  const value = currentForm.elements[0].value;
  const parent = currentForm.parentElement;
  const ticket = createTicket(value);
  if (!value) return;

  parent.insertBefore(ticket, parent.querySelector("form")); // Insert before the form

  const h3value = parent.querySelector("h3").innerText;
  if (!Array.isArray(savedtasks[h3value])) {
    savedtasks[h3value] = [];
  }
  savedtasks[h3value].push(value);
  updateLocalStorage(); // Update local storage after adding task

  currentForm.reset();
};

// Function to create a new column (card)
const createcard = (cardtitle) => {
  const mydiv = document.createElement("div");
  const myh3 = document.createElement("h3");
  const myform1 = document.createElement("form");
  const myinput = document.createElement("input");

  const h3text = document.createTextNode(cardtitle);

  mydiv.setAttribute("class", "column");

  myinput.setAttribute("type", "text");
  myinput.setAttribute("placeholder", "Add task");

  myh3.appendChild(h3text);
  myform1.appendChild(myinput);
  mydiv.appendChild(myh3);
  mydiv.appendChild(myform1);

  myform1.addEventListener("submit", addTask); // Form submit par task add karein

  mydiv.addEventListener("dragstart", (event) => {
    elementuthanahai = event.target;
  });

  mydiv.addEventListener("dragover", (event) => event.preventDefault()); // Drag over event ko handle karein

  mydiv.addEventListener("drop", (event) => {
    event.preventDefault();
    const targetElement = event.target;

    if (elementuthanahai) {
      if (targetElement.classList.contains("column")) {
        targetElement.insertBefore(elementuthanahai, targetElement.querySelector("form"));
      } else if (targetElement.classList.contains("ticket")) {
        targetElement.parentElement.insertBefore(elementuthanahai, targetElement.parentElement.querySelector("form"));
      }

      updateLocalStorage(); // Local storage update karein
    }
  });

  return mydiv;
};

// Card add karne ke button par click hone par
cardbtn.addEventListener("click", () => {
  const cardtitle = prompt("Enter card title");

  if (cardtitle) {
    const yourdiv = createcard(cardtitle);
    main.insertBefore(yourdiv, cardbtn);
  }
});

// Function to create a new task ticket
const createTicket = (value) => {
  const ticket = document.createElement("p");
  const elementText = document.createTextNode(value);
  ticket.setAttribute("draggable", "true");
  ticket.setAttribute("class", "ticket");
  ticket.appendChild(elementText);

  ticket.addEventListener("dragstart", (event) => {
    elementuthanahai = event.target;
  });

  return ticket;
};

// Function to update local storage with current tasks
const updateLocalStorage = () => {
  const updatedTasks = {};

  document.querySelectorAll(".column").forEach((column) => {
    const columnHeader = column.querySelector("h3").innerText;
    const tasks = [];

    column.querySelectorAll(".ticket").forEach((ticket) => {
      tasks.push(ticket.innerText);
    });

    updatedTasks[columnHeader] = tasks;
  });

  savedtasks = updatedTasks;
  localStorage.setItem("savedtasks", JSON.stringify(savedtasks));
};

// Initial load from local storage
let savedtasks = JSON.parse(localStorage.getItem("savedtasks")) || {};

for (const title in savedtasks) {
  const card = createcard(title);

  savedtasks[title].forEach((task) => {
    const p = createTicket(task);
    card.insertBefore(p, card.lastElementChild);
  });

  main.insertBefore(card, cardbtn);
}

















 