"use strict";

const createTodo = (todoText, doneCheck, todoId, oldTodo, role) => {
  const body = document.querySelector(".items");
  const counter = body.childNodes.length - 3;

  // input todo
  const todoContainer = buildElement("div", "todo-item");
  todoContainer.id = todoId ? todoId : `item-${counter}`;
  const textarea = buildElement("input", "task");
  textarea.value = todoText ? todoText : "";
  textarea.readOnly = todoText? true : false;
  textarea.addEventListener("focusout", () => {
    if(textarea.value === " " || textarea.value === null || textarea.value === ""){
      textarea.value = "new task";
    }
    textarea.readOnly = true;
    contentChanged(textarea.value, todoContainer.id);
  });
  todoContainer.appendChild(textarea);
  body.appendChild(todoContainer);

  //edit button
  const editButton = buildElement("button", "edit-icon");
  const editImg = buildElement("img");
  editImg.src = 
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-edit-web-flaticons-lineal-color-flat-icons-5.png";
  editImg.alt = "edit";
  editButton.appendChild(editImg);
  editButton.addEventListener("click", (event) => {
    const {target} = event;
    const input = target.parentNode.parentNode.querySelector(".task");
    input.readOnly = false;
    input.focus();
    input.select();
  })

  // done button
  const doneButton = buildElement("button", "tick-icon");
  const doneImg = buildElement("img");
  doneImg.src =
  "https://img.icons8.com/doodle/48/null/checked-checkbox.png";
  doneImg.alt = "done";
  doneButton.appendChild(doneImg);
  doneButton.addEventListener("click", (event) => {
    const {target} = event;
    const parent = target.parentNode.parentNode;
    const parentID = parent.id;
    if(parent.classList.contains("done-item")){
      parent.classList.toggle("done-item");
      let allTodos = JSON.parse(localStorage.getItem("items"));
      allTodos.find(element => {
        if(element.id === parentID) {
          element.done = false;
        }
      });
      allTodos = JSON.stringify(allTodos);
      localStorage.setItem("items", allTodos);
      parent.querySelector(".edit-icon").disabled = false;
    }
    else {
      parent.classList.toggle("done-item");
      let allTodos = JSON.parse(localStorage.getItem("items"));
      allTodos.find(element => {
        if(element.id === parentID) {
          element.done = true;
        }
      });
      allTodos = JSON.stringify(allTodos);
      localStorage.setItem("items", allTodos);
      parent.querySelector(".edit-icon").disabled = true;
    }
  });
  const doneAndEditContainer = buildElement("div", "done-edit-container");
  doneAndEditContainer.appendChild(doneButton);
  doneAndEditContainer.appendChild(editButton);
  todoContainer.appendChild(doneAndEditContainer);
  if(doneCheck) doneButton.click();
  
  //delete button
  const deleteButton = buildElement("button", "delete-icon");
  const deleteImg = buildElement("img");
  deleteImg.src = "https://img.icons8.com/arcade/35/null/close-window.png";
  deleteImg.alt = "delete"
  todoContainer.appendChild(deleteButton);
  deleteButton.appendChild(deleteImg);
  deleteButton.addEventListener("click", (event) => {
    const {target} = event;
    const targetID = target.parentNode.id;
    let items = JSON.parse(localStorage.getItem("items"));
    let filtered = items.filter(function(el) { return el.id != targetID; });
    filtered = JSON.stringify(filtered);
    localStorage.setItem("items", filtered);
    target.parentNode.remove();
  });

  //adding focus after adding element
  textarea.focus();

  //adding client-side database
  if (oldTodo) {
    return;
  }
  else {
    const newTodo = {
      value: textarea.value,
      done: false,
      id: `item-${counter}`,
      role: "guest"
    }
    if(localStorage.getItem("items")){
      const localStorageItems = JSON.parse(localStorage.getItem("items"));
      localStorageItems.push(newTodo);
      localStorage.setItem("items", JSON.stringify(localStorageItems));
    }
    else {
      const jsonNewTodo = JSON.stringify(newTodo);
      localStorage.setItem("items", `[${jsonNewTodo}]`);
    }
  }
}

const contentChanged = (text, id) => {
  let localStorageItems = JSON.parse(localStorage.getItem("items"));
  localStorageItems.find(element => {
    if(element.id === id) {
      element.value = text;
    }
  });
  localStorageItems = JSON.stringify(localStorageItems);
  localStorage.setItem("items", localStorageItems);
}

const buildElement = (element, cssClass) => {
  const newElement = document.createElement(element);
  if(cssClass)
      newElement.classList.add(cssClass);
  return newElement;
}

const createNewTodo = document.querySelectorAll(".create");
createNewTodo.forEach(element => {
  element.addEventListener("click", () => {
    createTodo();
  });
});

//add todo on startup
const checkLocal = JSON.parse(localStorage.getItem("items"));
if(checkLocal !== null)
  if(checkLocal !== "[]"){
    checkLocal.forEach(element => {
      createTodo(element.value, element.done, element.id, true);
  });
}


//showing all todos
const allTodoSelect = () => {
  const todosInPage = document.querySelectorAll(".items .todo-item");
  todosInPage.forEach(element => {
    element.style.display = "flex";
  })
  changeSelectedStyle(".all");
}

const allTodos = document.querySelector(".all");
allTodos.addEventListener("click", allTodoSelect);

//showing active todos
const activeTodoSelect = () => {
  const todosInStorage = JSON.parse(localStorage.getItem("items"));
  const todosInPage = document.querySelectorAll(".items .todo-item");
  const filteredITems = todosInStorage.filter(function(el) { return el.done !== true; });
  todosInPage.forEach(element => {
    element.style.display = "none";
  })
  for(let i = 0; i < todosInPage.length; i++) {
    for(let j = 0; j < filteredITems.length; j++) {
      if(todosInPage[i].id === filteredITems[j].id) {
        todosInPage[i].style.display = "flex";
      }
    }
  }
  //for select style change
  changeSelectedStyle(".active");
}

const activeTodos = document.querySelector(".active");
activeTodos.addEventListener("click", activeTodoSelect);

//showing done todos
const doneTodoSelect = () => {
  const todosInStorage = JSON.parse(localStorage.getItem("items"));
  const todosInPage = document.querySelectorAll(".items .todo-item");
  const filteredITems = todosInStorage.filter(function(el) { return el.done !== false; });
  todosInPage.forEach(element => {
    element.style.display = "none";
  })
  for(let i = 0; i < todosInPage.length; i++) {
    for(let j = 0; j < filteredITems.length; j++) {
      if(todosInPage[i].id === filteredITems[j].id) {
        todosInPage[i].style.display = "flex";
      }
    }
  }
  //for select style change
  changeSelectedStyle(".completed");
}

const doneTodos = document.querySelector(".completed");
doneTodos.addEventListener("click", doneTodoSelect);

//for style change
const changeSelectedStyle = (selected) => {
  const allLists = document.querySelectorAll("ul li");
  allLists.forEach(element => {
    element.classList.remove("selected-task");
  })
  const selectedList = document.querySelector(selected);
  if(!selectedList.classList.contains("selected-task")){
    selectedList.classList.toggle("selected-task");
  }
}

// upload and download buttons :
const unAuthModal = document.querySelector(".modal-unatuh");
function openModalUnauth() {
    unAuthModal.style.display = "block";
}

const downloadButton = document.querySelector(".download");
downloadButton.addEventListener("click", fetchDL);

async function fetchDL() {
    const response = await fetch("http://localhost:3000/database/download");
    if(response.status === 401) {
      openModalUnauth();
      return;
    }
    localStorage.removeItem("items");
    const jsonResponse = await response.json();
    jsonResponse.forEach(element => {
        createTodo(element.value, element.isdone, element.id, false);
    });
}

const uploadButton = document.querySelector(".upload");
uploadButton.addEventListener("click", fetchUL);

async function fetchUL(){
  try{
    const items = localStorage.getItem("items");
    const result = await fetch("http://localhost:3000/database/upload" , {
        method: "POST",
        body: items,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    });
  } catch {
    openModalUnauth();
  }
}

//signup page:
const signupBtn = document.querySelector(".signup");
signupBtn.addEventListener("click", () => { signupModal.style.display = "block"; });
const signupModal = document.querySelector(".modal-signup");

const signupForm = document.querySelector(".signup-form");
signupForm.addEventListener("submit", signup);

async function signup(event){
  event.preventDefault();
  const formData = new FormData(signupForm);
  const formDataObj = Object.fromEntries(formData.entries());
  formDataObj.todos = [];
  const response = await fetch("http://localhost:3000/users/signup", {
    method: "POST",
    body: JSON.stringify(formDataObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });
  const res = await response.json();
  console.log(res);
}



//login page:
const loginModal = document.querySelector(".modal-login");
const loginForm = document.querySelector(".login-form");
const loginPage = document.querySelector(".login");
const welcome = document.querySelector(".logged-in");

loginPage.addEventListener("click", () => {
  loginModal.style.display = "block";
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const formDataObj = Object.fromEntries(formData.entries());
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    body: JSON.stringify(formDataObj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });
  const token = await response.json();
  if(token.hasOwnProperty("accessToken")){
    localStorage.setItem("token", JSON.stringify(token.accessToken));
    welcome.innerText = `welcome ${token.fullname}`;
    welcome.style.display = "block";
  } else {
    console.log("credentials does not match.");
  }
})