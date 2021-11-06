// selecionar elementos
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// variaveis
let LIST, id;

// obter item do storege
let data = localStorage.getItem("TODO");

// checagem de dados
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); //
} else {
  
    LIST = [];
    id = 0;
}
//carregando tarefas  
function loadList(array) {
    array.foreach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// limpar storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// mostrar data
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pt-BR", options);

// adicionar tarefa
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `;

    const position = "beforeend"

    list.insertAdjacentHTML(position, item);
}

// adicionar tarefas pressionando enter
document.addEventListener("keyup", function (even) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });


            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});
// tarefa completa
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// removendo tarefa
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// direcionando itens dinamicamente
list.addEventListener("click", function (event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});