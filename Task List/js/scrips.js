//>>>>>>>>>>>>  Seleção dos elementos  <<<<<<<<<<
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const toolbar = document.querySelector("#toolbar");


let oldInputValue; //guardar o valor do antigo título para edição

//>>>>>>>>  Fuções  <<<<<<<<<<

const saveTodo = (text) => {
  //adição do input

  const todo = document.createElement("div"); //cria uma div nova para armazenar a tarefa
  todo.classList.add("todo"); //adiciona a div todo

  const todoTitle = document.createElement("h3"); //cria um h3
  todoTitle.innerText = text; //adiciona o input do usuário no h3
  todo.appendChild(todoTitle); //adicionando h3 no todo por DOM

  const doneBtn = document.createElement("button"); //criando o botão done
  doneBtn.classList.add("finish-todo"); //adiciona a class ao botão
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; //adição do ícone dentro da classe finish todo
  todo.appendChild(doneBtn); //adiciona o botão à div todo

  const editBtn = document.createElement("button"); //criando o botão edit
  editBtn.classList.add("edit-todo"); //adiciona a class ao botão
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'; //adição do ícone dentro da classe finish todo
  todo.appendChild(editBtn); //adiciona o botão à div todo

  const removeBtn = document.createElement("button"); //criando o botão remove
  removeBtn.classList.add("remove-todo"); //adiciona a class ao botão
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; //adição do ícone dentro da classe finish todo
  todo.appendChild(removeBtn); //adiciona o botão à div todo

  todoList.appendChild(todo); //liga a div todo à div maior todoList

  todoInput.value = ""; //limpa o valor do imput
  todoInput.focus(); //faz o cursor voltar para a caixa de input
};

const toggleForms = () => {
  //alterna entre modo normal e modo de edição
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide")
  todoList.classList.toggle("hide")
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo") //seleciona todos os todos

  todos.forEach((todo) => {  // verifica se o título do todo é o mesmo que o usuário iniciou a edição
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      //titulo atual igual ao salvo na memoria
      todoTitle.innerText = text;
    }
  });
};

//>>>>>>>  Eventos  <<<<<<<<<<
todoForm.addEventListener("submit", (e) => {
  //salva o valor do input e manda pra função saveTodo
  // parametros: submit = ação com o botão

  e.preventDefault();

  const inputValue = todoInput.value; //guarda o input do usuario

  if (inputValue) {
    //save todo na div
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  //seleciona o click e marca em qual caixa foi clicado

  const targetEl = e.target; //marca o elemento que foi clicado
  const parentEl = targetEl.closest("div"); //seleciona o pai mais proximo (tarefa a ser feita)
  let todoTitle; //escopo de bloco; necessário para saber qual tarefa será editada

  if (parentEl && parentEl.querySelector("h3")) {
    //pre requisitos para ter um título
    todoTitle = parentEl.querySelector("h3").innerText; //selecionando o conteúdo do título
  }

  if (targetEl.classList.contains("finish-todo")) {
    //verifica se o usuário clicou em finalizar
    parentEl.classList.toggle("done"); //toggle(alterna) adiciona done com um clique e desfaz com outro
  }

  if (targetEl.classList.contains("remove-todo")) {
    //verifica se o usuário clicou em remover
    parentEl.remove(); //remove o pai mais proximo da tarefa
  }

  if (targetEl.classList.contains("edit-todo")) {
    //verifica se o usuário clicou em editar
    toggleForms()
    
    editInput.value = todoTitle; //mapeia o valor do titulo a ser editado
    oldInputValue = todoTitle; //salva na memoria fora do evento atual
  }
});

cancelEditBtn.addEventListener("click", (e) => { //cancela a edição
  e.preventDefault(); //não envia o formulário e evita repetição
  toggleForms(); //inverte a ação da edição
});

editForm.addEventListener("submit", (e) => { //edita o texto
  e.preventDefault();

  const editInputValue = editInput.value; //guarda o valor digitado pelo usuário
  
  if (editInputValue) {
    //atualizar
    updateTodo(editInputValue);
  }
  
  toggleForms(); //voltando ao normal
});

