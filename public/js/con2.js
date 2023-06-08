let input = document.querySelector("#task");
let send = document.querySelector("#send");
let div_todo = document.querySelector("#todo");



//^ create 3 icons + their functions
const create_icons = (divParent, p) => {
    //? delete icon
    let ico_rm = document.createElement("i");
    ico_rm.classList.add("fa-solid", "fa-sm", "fa-circle-minus");
    ico_rm.style.color = "red";
    ico_rm.style.paddingInline = "5px";
    p.appendChild(ico_rm);

    ico_rm.addEventListener("click", () => {
        divParent.removeChild(p);
    })

    //? modify icon
    let ico_modify = document.createElement("i");
    ico_modify.classList.add("fa-solid", "fa-sm", "fa-wrench");
    ico_modify.style.color = "blue";
    ico_modify.style.paddingInlineEnd = "15px";
    p.appendChild(ico_modify);

    //! when i modify icons disappear ?
    ico_modify.addEventListener("click", () => { 
        let makeSure = confirm(`sure you wanna modify this task "${p.textContent} "`);
        if (makeSure == true) {
            let askModif = prompt(`task "${p.textContent}" Change it to --> `);
            p.textContent = askModif;
            alert("task will be modified");
        }
    });

    //& select 

}

//* create task <p> with its icons + select
const createTask_todo = () => {
    //? create <p> contains input.value
    let para = document.createElement("p");
    para.style.fontWeight = "bold";
    let node = document.createTextNode(input.value);
    create_icons(div_todo, para);
    para.appendChild(node);
    div_todo.appendChild(para);
}

send.addEventListener("click", () => {
    createTask_todo();
});