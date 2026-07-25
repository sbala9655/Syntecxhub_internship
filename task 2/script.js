//  To-Do List

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const search = document.getElementById("search");

const showTaskBtn = document.getElementById("showTaskBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const themeBtn = document.getElementById("themeBtn");

const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const completedCounter = document.getElementById("completedCounter");

// Load tasks

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load theme

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";
}


// Save

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

// Add Task

function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();
    taskInput.value = "";
}

// Add using button click

addBtn.addEventListener("click", addTask);

// Add using Enter key

taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        addTask();
    }

});

// Display Tasks

function displayTasks(){

    taskList.innerHTML="";

    let completed=0;

    const searchValue=search.value.toLowerCase();
    tasks.forEach((task,index)=>{

        if(!task.text.toLowerCase().includes(searchValue))
            return;

        if(task.completed)
            completed++;

        const li=document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML=`

        <div class="task-content">

            <h3>${task.text}</h3>

        </div>

        <div class="actions">

            <button class="completeBtn"
            onclick="toggleComplete(${index})">

            ✔

            </button>

            <button class="editBtn"
            onclick="editTask(${index})">

            ✏

            </button>

            <button class="deleteBtn"
            onclick="deleteTask(${index})">

            🗑

            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    taskCounter.innerHTML="Total : "+tasks.length;

    completedCounter.innerHTML="Completed : "+completed;

}


// Complete

function toggleComplete(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

    displayTasks();

}

// Edit

function editTask(index){

    let updated=prompt("Edit Task",tasks[index].text);

    if(updated!==null && updated.trim()!==""){

        tasks[index].text=updated.trim();

        saveTasks();

        displayTasks();

    }

}

// Delete

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        displayTasks();

    }

}

// Search

search.addEventListener("keyup",displayTasks);

// Show All Tasks

taskList.style.display="none";

showTaskBtn.addEventListener("click",()=>{
    if(taskList.style.display==="none"){
        search.value="";
        displayTasks();
        taskList.style.display="block";
        showTaskBtn.textContent="Hide Task";
    }else{
        taskList.style.display="none";
        showTaskBtn.textContent="Show Task";
    }
});

// Clear All Tasks

clearAllBtn.addEventListener("click",()=>{
    if(confirm("Delete all tasks?")){
        tasks=[];
        saveTasks();
        displayTasks();
    }
});


// Dark Mode

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="🌙 Dark Mode";

    }

});
