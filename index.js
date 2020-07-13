let titleInput = document.getElementById("messageTitle");
let editTitleInput = document.getElementById("editMessageTitle");

let messageInput = document.getElementById("messageBody");
let editMessageInput = document.getElementById("editMessageBody");

let addButton = document.getElementById("addButton");
let scrapsField = document.getElementById("scrapsField");

let btnSaveEdit = document.getElementById("saveEdit");

let scraps = JSON.parse(sessionStorage.getItem("scraps_saved")) || [
  {title: 'Praticar exercícios!', message: 'Ir na academia'},
];


function renderScraps(){
  scrapsField.innerHTML = "";
  
  for (const scrap of scraps) {
    let position = scraps.indexOf(scrap);
    scrapsField.innerHTML += createScrapCard(scrap.title, scrap.message, position);
  }
}

function addNewScrap() {
  let title = titleInput.value;
  let message = messageInput.value;
  
  if (!messageTitle.value || !messageBody.value) {
    return alert("Todos os campos devem ser preenchidos!");
  }
  
  titleInput.value = "";
  messageInput.value = "";
  
  scraps.push({ title, message });
  
  renderScraps();
  saveInStorage()
}

function createScrapCard(title, message, position) {
  return `
  <div class="message-cards card text-white bg-dark m-2">
    <div class="card-header font-weight-bold">${title}</div>
    <div class="card-body">
      <p class="card-text">
        ${message}
      </p>
    </div>
    <div class="w100 d-flex justify-content-end pr-2 pb-2">
      <button class="btn btn-danger mr-1" onclick="deleteCard(${position})">
        Deletar
      </button>
      <button class="btn btn-info" onclick="openEditModal(${position})">
        Editar
      </button>
    </div>
  </div>
  `;
}

function openEditModal(position){
  //chama id principal do modal
  $("#editModal").modal("toggle")
  
  //
  editTitleInput.value = scraps[position].title;
  editMessageInput.value = scraps[position].message;
  
  btnSaveEdit.setAttribute("onclick", `saveChanges(${position})`);
  btnSaveEdit.setAttribute("data-dismiss", "modal");
}

function deleteCard(position){
  scraps.splice(position, 1);
  renderScraps();
  saveInStorage()
}

function saveChanges(position){
  scraps[position].title = editTitleInput.value;
  scraps[position].message = editMessageInput.value;
  
  renderScraps();
  saveInStorage()
}

function saveInStorage(){
  sessionStorage.setItem('scraps_saved', JSON.stringify(scraps));
  //localStorage.setItem('newActivies_saved', JSON.stringify(newActivies));
}

//Roda a função
renderScraps()
//atribui a funcao ao evento
addButton.onclick = addNewScrap;
