let input = document.querySelector("#task");
let send = document.querySelector("#send");
let div_todo = document.querySelector("#todo");
let div_doing = document.querySelector("#doing");
let div_done = document.querySelector("#done");


const create_icons_select = (divParent, p) => {

    //^ create Select of each task + functions due to its choosen link
    // todo : create by js div > btn & ul > li > a
    //& div
    let divS = document.createElement("div");
    divParent.appendChild(divS);
    divS.classList.add("btn-group");
    divS.classList.add("d-flex","mx-5");
    //& btn
    let btnS = document.createElement("button");
    btnS.classList.add("btn", "btn-secondary", "dropdown-toggle", "btn-sm");
    btnS.setAttribute("type", "button");
    btnS.setAttribute("data-bs-toggle", "dropdown");
    btnS.setAttribute("aria-expanded", "false");

    let btnS_txt = document.createTextNode("Replace");
    btnS.appendChild(btnS_txt);
    divS.appendChild(btnS);

    //& ul
    let ulS = document.createElement("ul");
    ulS.classList.add("dropdown-menu");
    divS.appendChild(ulS);

    //& li1 => to do
    let li1 = document.createElement("li");
    ulS.appendChild(li1);
    let a1 = document.createElement("a");
    a1.classList.add("dropdown-item");
    a1.style.display = "none";
    let a1_txt = document.createTextNode("To Do");
    a1.appendChild(a1_txt);
    li1.appendChild(a1);

    //& li2 => doing
    let li2 = document.createElement("li");
    ulS.appendChild(li2);
    let a2 = document.createElement("a");
    a2.classList.add("dropdown-item");
    let a2_txt = document.createTextNode("Doing");
    a2.appendChild(a2_txt);
    li1.appendChild(a2);

    //& li1 => done
    let li3 = document.createElement("li");
    ulS.appendChild(li3);
    let a3 = document.createElement("a");
    a3.classList.add("dropdown-item");
    let a3_txt = document.createTextNode("Done");
    a3.appendChild(a3_txt);
    li1.appendChild(a3);

    // todo :  click on link to choose column => set task on that column
    a1.addEventListener("click", () => { //^ click to do ==> from doing 
        if (div_doing.id == "doing") {
            div_doing.removeChild(p);
            a1.style.display = "none";
            a2.style.display = "block";
            div_todo.appendChild(divS);
            div_todo.appendChild(p);
        }
    });
    a1.addEventListener("click", () => { //^ click to do ==> from done
        if (div_done.id == "done") {
            div_done.removeChild(p);
            a1.style.display = "none";
            a3.style.display = "block";
            div_todo.appendChild(divS);
            div_todo.appendChild(p);
        }
    });
    a2.addEventListener("click", () => { //^ click doing ==> from to do
        if (div_todo.id == "todo") {
            div_todo.removeChild(p);
            a1.style.display = "block";
            a2.style.display = "none";
            div_doing.appendChild(divS);
            div_doing.appendChild(p);
        }
    });
    a2.addEventListener("click", () => { //^ click doing ==> from done
        if (div_done.id == "done") {
            div_done.removeChild(p);
            a2.style.display = "none";
            a1.style.display = "block";
            a3.style.display = "block";
            div_doing.appendChild(divS);
            div_doing.appendChild(p);
        }
    });
    a3.addEventListener("click", () => { //^ click done ==> from doing 
        if (div_doing.id == "doing") {
            div_doing.removeChild(p);
            a1.style.display = "block";
            a2.style.display = "block";
            a3.style.display = "none";
            div_done.appendChild(divS);
            div_done.appendChild(p);
        }
    });
    a3.addEventListener("click", () => { //^ click done ==> from to do
        if (div_todo.id == "todo") {
            div_todo.removeChild(p);
            a1.style.display = "block";
            a2.style.display = "block";
            a3.style.display = "none";
            div_done.appendChild(divS);
            div_done.appendChild(p);
        }
    });

    //^ create 2 icons + their functions
    //? delete icon
    let ico_rm = document.createElement("i");
    ico_rm.classList.add("fa-solid", "fa-sm", "fa-circle-minus");
    ico_rm.style.color = "red";
    ico_rm.style.paddingInline = "5px";
    p.appendChild(ico_rm);

    ico_rm.addEventListener("click", () => {
        if (div_todo.id == "todo") {
            div_todo.removeChild(p);
            div_todo.removeChild(divS);
        }
    });
    ico_rm.addEventListener("click", () => {
        if (div_doing.id == "doing") {
            div_doing.removeChild(p);
            div_doing.removeChild(divS);
        }
    });
    ico_rm.addEventListener("click", () => {
        if (div_done.id == "done") {
            div_done.removeChild(p);
            div_done.removeChild(divS);
        }
    });

    //? modify icon
    let ico_modify = document.createElement("i");
    ico_modify.classList.add("fa-solid", "fa-sm", "fa-wrench");
    ico_modify.style.color = "blue";
    ico_modify.style.paddingInlineEnd = "15px";
    p.appendChild(ico_modify);

    ico_modify.addEventListener("click", () => {
        let makeSure = confirm(`sure you wanna modify this task "${p.textContent} "`);
        if (makeSure == true) {
            let askModif = prompt(`task "${p.textContent}" Change it to --> `);
            if (p.textContent != askModif) {
                // when i modify p.textContent icons disappear, so i put icons after p.textContent
                p.textContent = askModif;
                p.appendChild(ico_rm);
                p.appendChild(ico_modify);
                alert("task will be modified");
            } else {
                alert("you did not really modify anything");
            }
        }
    });
}

//* create task <p> with its icons + select
const createTask = (div_wanted) => {
    //? create <p> contains input.value
    let para = document.createElement("p");
    para.style.fontWeight = "bold";
    para.style.fontSize = "18px";
    let node = document.createTextNode(input.value);
    create_icons_select(div_wanted, para);
    para.appendChild(node);
    div_wanted.appendChild(para);
}

//* addEventListener to the btn & the key Enter
send.addEventListener("click", () => {
    //! missing : condition if task alredy existed
    if (input.value == "") {
        alert("you did not write anything");
    } else {
        createTask(div_todo);
        input.value = "";
    }
});

input.addEventListener("keyup", (event) => { //? en click sur Enter
    if (event.key == "Enter") {
        //! missing : condition if task alredy existed
        if (input.value == "") {
            alert("you did not write anything");
        } else {
            createTask(div_todo);
            input.value = "";
        }
    }
});