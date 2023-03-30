const inputElement = document.querySelector(".new_list_input");
const addButton = document.querySelector(".new_list_button");
const newBox = document.querySelector(".new_box")

const validateInput = function(){
    return inputElement.value.trim().length > 0;
}

const validAddBut = function(){
    const inputIsValid = validateInput();

    if (!inputIsValid){
        return inputElement.classList.add("error");
    }

    const addBox = document.createElement("div");
    addBox.classList.add("add_box");

    const addItemBox = document.createElement("p");
    addItemBox.innerText = inputElement.value;

    addItemBox.addEventListener("click", function(){
        handleClick(addItemBox);
    });

    const addDeleteItem = document.createElement("i");
    addDeleteItem.classList.add("fa-solid");
    addDeleteItem.classList.add("fa-trash-can");

    addDeleteItem.addEventListener("click", function(){
        handleDeleteclick(addBox, addItemBox);
    });

    addBox.appendChild(addItemBox);
    addBox.appendChild(addDeleteItem);

    newBox.appendChild(addBox);

    inputElement.value = "";

    updateLocalStorage();

};

const handleClick = (addItemBox) => {
    const tasks = newBox.childNodes;
    
    for (const task of tasks){
        if (task.firstChild.isSameNode(addItemBox)){
            task.firstChild.classList.toggle("completed")
        }
    }

    updateLocalStorage();
};

const handleDeleteclick = (addBox, addItemBox) => {
    const tasks = newBox.childNodes;

    for (const task of tasks){
        if (task.firstChild.isSameNode(addItemBox)){
            addBox.remove();
        }
    }

    updateLocalStorage();
}

const validAddInput = function(){
    const inputIsValid = validateInput();

    if (inputIsValid){
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = newBox.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshLocalStorage = () => {
    const tasksFromLocal = JSON.parse(localStorage.getItem("tasks"));
    
    if (!tasksFromLocal) return;

    for (const task of tasksFromLocal){
        const addBox = document.createElement("div");
        addBox.classList.add("add_box");
    
        const addItemBox = document.createElement("p");
        addItemBox.innerText = task.description;
        
        if (task.isCompleted){
            addItemBox.classList.add("completed");
        }
    
        addItemBox.addEventListener("click", function(){
            handleClick(addItemBox);
        });
    
        const addDeleteItem = document.createElement("i");
        addDeleteItem.classList.add("fa-solid");
        addDeleteItem.classList.add("fa-trash-can");
    
        addDeleteItem.addEventListener("click", function(){
            handleDeleteclick(addBox, addItemBox);
        })
    
        addBox.appendChild(addItemBox);
        addBox.appendChild(addDeleteItem);
    
        newBox.appendChild(addBox);
    }
};

refreshLocalStorage();

addButton.addEventListener("click",function(){
    validAddBut();
});

inputElement.addEventListener("change", function(){
    validAddInput();
});
