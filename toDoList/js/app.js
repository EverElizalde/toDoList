//Selectores
const clear = document.querySelector('.clear')
const date = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')
//Classes para checked y uncheck
const CHECKED = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINETHROUGHT = "lineThrough";
//Fecha
const today = new Date();
date.innerHTML = today.toLocaleDateString("es-US", { weekday: "long", month: "long", day: "numeric" })
//Variables
let TODO, id;

//Obtenemos los valores del localstorage
let DATA = localStorage.getItem("TODO");

//Revisamos si existe información en el localStorage y definimos el arreglo de objetos
if (DATA) {
  TODO = JSON.parse(DATA);
  id = TODO.length;
  loadTODO(TODO);
} else {
  TODO = [];
  id = 0;
}
function loadTODO(arr) {
  arr.forEach(function (item) {
    addTask(item.name, item.id, item.finished, item.trash);
  })
}

//Agregar tarea
function addTask(toDo, id, finished, trash) {

  if (trash) return;
  const FINISHED = finished ? CHECKED : UNCHECK;
  const LINE = finished ? LINETHROUGHT : "";
  const task =
    `<li class="item">
      <i class="far ${FINISHED}" job="complete" id=${id}></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="delete" job="delete" id=${id}>Borrar</i>
    </li>`;
  list.insertAdjacentHTML('beforeend', task);
}

//Borrar todas las tareas
clear.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
})


document.addEventListener("keyup", (even) => {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addTask(toDo, id, false, false);
    }
    TODO.push({
      name: toDo,
      id: id,
      finished: false,
      trash: false
    })
    localStorage.setItem("TODO", JSON.stringify(TODO));
    id++;
    input.value = "";
  }
})

//Marcar como terminada
const completeTask = (element) => {
  element.classList.toggle(CHECKED)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector(".text").classList.toggle(LINETHROUGHT);
  TODO[element.id].finished = TODO[element.id].finished ? false : true;
}

const removeTask = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  TODO[element.id].trash = true;
}

list.addEventListener("click", (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeTask(element);
  } else if (elementJob == "delete") {
    removeTask(element);
  }
  localStorage.setItem("TODO", JSON.stringify(TODO));

})