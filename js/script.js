{
    let tasks = [];
    let tasksHide = false;


    const addNewTask = (newTask) => {

        tasks = [
            ...tasks.slice(0),
            { content: newTask },
        ];

        render();
    };

    const toggleTaskDone = (index) => {

        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1)
        ];

        render();
    };

    const doneButton = () => {
        const doneJobButton = document.querySelectorAll(".js-doneButton");
        doneJobButton.forEach((doneJobButton, index) => { 
            doneJobButton.addEventListener("click", () => { 

                toggleTaskDone(index); 
            });                      
        });

    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ],
            render();
    };

    const removeButton = () => {
        const removeJobButton = document.querySelectorAll(".js-removeButton");
        removeJobButton.forEach((removeJobButton, index) => {
            removeJobButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const toggleHideDoneTask = () => {
        tasksHide = !tasksHide;

        render();
    };

    const renderButtons = () => {
        let buttonHTML = "";
        if (tasks.some(({ done }) => done)) {
            buttonHTML = `
            <button class="js-toggleHideDoneTask form__fieldset--button">
            ${tasksHide ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button ${tasks.every(({ done }) => done) ? " disabled" : ""} class="js-markAllDone form__fieldset--button">Ukończ wszystkie</button>
            `;

        };
        const buttonsEvents = document.querySelector(".js-buttonEvents").innerHTML = buttonHTML;

        bindButtonRender();
    };

    const markAllDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks,
            done: true

        }));
        render();

    };

    const bindButtonRender = () => {
        const hideDoneTasks = document.querySelector(".js-toggleHideDoneTask");

        if (hideDoneTasks) {
            hideDoneTasks.addEventListener("click", toggleHideDoneTask);
        };

        const buttonAllDone = document.querySelector(".js-markAllDone");

        if (buttonAllDone) {
            buttonAllDone.addEventListener("click", markAllDone);
        };




    };

    const tasksRender = () => {
        let taskHTML = "";
        for (const el of tasks) {
            taskHTML += `
        <li class="form__list--bottom${el.done ? " form__list--decoration" : ""}${el.done && tasksHide ? " form__list--decorationHidden" : ""}">
        <button class="js-doneButton form___buttonDone">✔</button> 
        ${el.content} 
        <button class="js-removeButton form__buttonRemove">🗑</button>
        </li> 
        `;
        };
        const taskRender = document.querySelector(".js-task").innerHTML = taskHTML;
        doneButton();
        removeButton();

    };

    const render = () => {
        tasksRender();

        renderButtons();
        bindButtonRender();


    };


    onFormButton = (e) => {
        e.preventDefault();
        let newTaskElement = document.querySelector(".js-newTask");
        let newTask = newTaskElement.value.trim();

        if (newTask === "") {
            return;
        };
        addNewTask(newTask);
        newTaskElement.value = "";

    };


    const init = () => {
        render();
        const formButton = document.querySelector(".form__button");
        formButton.addEventListener("click", onFormButton);

    };
    init();
};