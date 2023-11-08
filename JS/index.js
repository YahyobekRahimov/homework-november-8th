/**
 * TODO We need to create an app that takes information from the user and saves it on a table
 * TODO User will be able to save name, age, email.
 * TODO Each piece of information entered has to be associated with an Number on a table
 * TODO The information has to be saved to local storage
 * TODO need to have CRUD (create, read, update, delete)
 * TODO
 */
document.addEventListener('DOMContentLoaded', function() {
  reloadTable();
  // ! Buttons
  const EDIT_BUTTONS = document.querySelectorAll(".edit-button");
  const CANCEL_BUTTON = document.querySelector(".cancel");
  const SAVE_CHANGES_BUTTON = document.getElementById("save-changes");
  const SUBMIT_BUTTON = document.getElementById("submit");
  // ! Listeners
  addListenerToDeleteButtons();
  const editingSection = document.querySelector(".editing-section");
  SUBMIT_BUTTON.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const data = getFromLocalStorage();
    saveToTable(data.length + 1, name, age, email, saveToLocalStorage);
    addListenerToDeleteButtons();
  });
  
  function reloadTable() {
    const tbody = document.querySelector("tbody");
    const data = getFromLocalStorage();
    if (!data.length) return;
    data.forEach((element, index) => {
      const name = element.name;
      const age = element.age;
      const email = element.email;
      const number = index + 1; 
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
      for (let i = 1; i <= 5; i++) {
        let tableCell = document.createElement("td");
        tableCell.classList.add(`row${number}-column${i}`);
        if (i === 1) tableCell.innerHTML = number;
        else if (i === 2) tableCell.innerHTML = name;
        else if (i === 3) tableCell.innerHTML = age;
        else if (i === 4) tableCell.innerHTML = email;
        else
        tableCell.innerHTML = `
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>`;
        tr.appendChild(tableCell);
      }
    })
  }
  function addListenerToDeleteButtons() {
    const DELETE_BUTTONS = document.querySelectorAll('.delete-button');
    for (let i = 0; i < DELETE_BUTTONS.length; i++) {
      const element = DELETE_BUTTONS[i];
      console.log(`listener added to ${element}`);
      element.addEventListener('click', function() {
        deleteInfo(i);
        console.log('clicked');
      })
    }
  }
  
  function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("data")) || [];
  }
  
  function saveToTable(number, name, age, email, saveToLocalStorage) {
    const data = getFromLocalStorage();
    const tbody = document.querySelector("tbody");
    const tr = document.createElement("tr");
    tbody.appendChild(tr);
    for (let i = 1; i <= 5; i++) {
      let tableCell = document.createElement("td");
      tableCell.classList.add(`row${number}-column${i}`);
      if (i === 1) tableCell.innerHTML = number;
      else if (i === 2) tableCell.innerHTML = name;
      else if (i === 3) tableCell.innerHTML = age;
      else if (i === 4) tableCell.innerHTML = email;
      else
        tableCell.innerHTML = `
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>`;
      tr.appendChild(tableCell);
    }
    saveToLocalStorage(name, age, email, data);
  }
  
  function saveToLocalStorage(name, age, email, data) {
    const newInfo = {};
    newInfo.name = name;
    newInfo.age = age;
    newInfo.email = email;
    data.push(newInfo);
    localStorage.setItem("data", JSON.stringify(data));
  }
  
  function deleteInfo(index) {
    const data = getFromLocalStorage();
    delete data[index];
    data.sort((a, b) => a - b);
    data.pop();
    console.log('deleted the data');
    localStorage.setItem('data', JSON.stringify(data));
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    reloadTable();
  } 
})
