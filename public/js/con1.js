let input = document.querySelector("#task");
let btn_send = document.querySelector("#send");
let div_boite = document.querySelector(".boite"); // i guess i didn't use it :)
let div_pTask = document.querySelector(".p_task");

//* create <p> contains input.value + its 3 icons
let tasks = []; //tab des p
let valid_tasks = [];
let nonValid_tasks = [];

const add_icons= (div_pTask,para) => {
    //^ create 3 icons + their functions
    //? check icon
    let ico_check = document.createElement("i");
    ico_check.classList.add("fa-solid", "fa-sm", "fa-circle-check");
    ico_check.style.color = "green";
    div_pTask.appendChild(ico_check);
    ico_check.addEventListener("click", () => {
        if (para.classList.contains("checked")) {
            let idxP_V = valid_tasks.indexOf(para); //get index of that para from tab tasks
            para.classList.remove("checked");
            if (nonValid_tasks.includes(para) != true) {
                nonValid_tasks.push(para);  // add it to tab nonValid_tasks 
            }
            valid_tasks.splice(idxP_V, 1); //remove it from tab of valid_tasks
        } else {
            let idxP_NV = nonValid_tasks.indexOf(para);
            para.classList.add("checked");
            valid_tasks.push(para); //add it to tab of valid_tasks
            nonValid_tasks.splice(idxP_NV, 1); //remove it from tab of nonValid_tasks
        }
    });

    //? delete icon
    let ico_rm = document.createElement("i");
    ico_rm.classList.add("fa-solid", "fa-sm", "fa-circle-minus");
    ico_rm.style.color = "red";
    ico_rm.style.paddingInline = "5px";
    div_pTask.appendChild(ico_rm);

    ico_rm.addEventListener("click", () => {
        // remove p task from table tasks
        let idxP_rmT = tasks.indexOf(para);
        tasks.splice(idxP_rmT, 1);
        // remove p task from table nonValid_tasks
        let idxP_rmNV = nonValid_tasks.indexOf(para);
        nonValid_tasks.splice(idxP_rmNV, 1);
        // remove p task from table valid_tasks
        let idxP_rmV = valid_tasks.indexOf(para);
        valid_tasks.splice(idxP_rmV, 1);
        // remove from notre boite 
        div_pTask.removeChild(para);
        div_pTask.removeChild(ico_check);
        div_pTask.removeChild(ico_modify);
        div_pTask.removeChild(ico_rm);
        alert("task will be deleted");
    });

    //? modify icon
    let ico_modify = document.createElement("i");
    ico_modify.classList.add("fa-solid", "fa-sm", "fa-wrench");
    ico_modify.style.color = "blue";
    div_pTask.appendChild(ico_modify);

    ico_modify.addEventListener("click", () => {
        let makeSure = confirm(`sure you wanna modify this task "${para.textContent} "`);
        if (makeSure == true) {
            let askModif = prompt(`task "${para.textContent}" Change it to --> `);
            para.textContent = askModif;
            alert("task will be modified");
        }
    });
}

const add_Ptask = () => {
    //^ create <p> contains input.value
    let para = document.createElement("p");
    para.style.fontWeight = "bold";
    let node = document.createTextNode(input.value);
    para.appendChild(node);
    add_icons(div_pTask,para);
    div_pTask.appendChild(para);
    //^ push contenu de <p> => our task
    tasks.push(para);
    nonValid_tasks.push(para);   // at first it will be in nonValid_tasks too
}

console.log(tasks);
console.log(valid_tasks);
console.log(nonValid_tasks);

//* addEventListener to the btn & the key Enter
//^ btn
btn_send.addEventListener("click", () => { //? en click sur btn Send
    //! missing : condition if task alredy existed
    if (input.value == "") {
        alert("you did not write anything");
    } else {
        add_Ptask();
        input.value = "";
    }



});
//^ key => Enter
input.addEventListener("keyup", (event) => { //? en click sur Enter
    if (event.key == "Enter") {
        if (input.value == "") {
            alert("you did not write anything");
        } else {
            add_Ptask();
            input.value = "";
        }
    }
});

//* Select tasks -------------------------------
let all_tasks = document.querySelector("#all_tasks");
let all_Vtasks = document.querySelector("#all_Vtasks");
let all_NVtasks = document.querySelector("#all_NV");

//^ all tasks
all_tasks.addEventListener("click", () => {
    for (let index = 0; index < tasks.length; index++) {
        let task = tasks[index];
        task.style.display = "block";
    }
});

//! icons must disappear with their task they don't :/
//^ valid tasks
all_Vtasks.addEventListener("click", () => {
    for (let index = 0; index < nonValid_tasks.length; index++) {
        let non_VT = nonValid_tasks[index];
        non_VT.style.display = "none";

        for (let idx = 0; idx < valid_tasks.length; idx++) {
            let vT = valid_tasks[idx];
            vT.style.display = "block";
        }
    }
});

//^ Non Valid tasks
all_NVtasks.addEventListener("click", () => {
    for (let index = 0; index < valid_tasks.length; index++) {
        let vT = valid_tasks[index];
        vT.style.display = "none";
        for (let idx = 0; idx < nonValid_tasks.length; idx++) {
            let non_VT = nonValid_tasks[index];
            non_VT.style.display = "block";
        }
    }
});
