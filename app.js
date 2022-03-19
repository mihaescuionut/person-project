let showBtn = document.querySelector('.for-add-people');
let submit = document.querySelector('.submit');
let footer = document.querySelector('.ftr');
let people = document.querySelector('.people-confirmed');


function createCard(arr){

    let peopleConfirmed = document.querySelector('.people-confirmed');

    let section = document.createElement('section');
    section.className = "card";
    let image = document.createElement('img');


    image.src=arr.picture.medium;
    
   

    let name = document.createElement('p');
    name.textContent = `${arr.name.title} ${arr.name.first} ${arr.name.last}`;
    let mail = document.createElement('p');
    mail.textContent = arr.email;
    mail.className = "mail";
    let join = document.createElement('p');
    join.textContent = `Joined at ${arr.registered.date}`;

    let buttons = document.createElement('section');
    let editBtn = document.createElement('button');
    editBtn.classList = "edit";
    editBtn.textContent = "Edit";
    editBtn.value = "Edit";
    let removeBtn = document.createElement('button');
    removeBtn.classList = "remove";
    removeBtn.textContent = "Remove";
    removeBtn.value = "Remove";
    buttons.appendChild(editBtn);
    buttons.appendChild(removeBtn);

    section.appendChild(image);
    section.appendChild(name);
    section.appendChild(mail);
    section.appendChild(join);
    section.appendChild(buttons);

    peopleConfirmed.appendChild(section);


}


function populateCards(arr){

    let peopleConfirmed = document.querySelector('.people-confirmed');

    peopleConfirmed.innerHTML='';
    arr.forEach(e =>{

        createCard(e);


    })



}

function addPeople(){

    let peopleConfirmed = document.querySelector('.people-confirmed');
    let inputField = document.querySelector('.inputField');
    let addMail = document.querySelector('.addmail');

    let section = document.createElement('section');
    section.className = "card";

    let img = document.createElement('img');
    img.href = "";
    let name = document.createElement('p');
    name.textContent = inputField.value;
    let mail = document.createElement('p');
    mail.textContent = addMail.value;
    mail.className = "mail";

    let buttons = document.createElement('section');
    let editBtn = document.createElement('button');
    editBtn.classList = "edit";
    editBtn.textContent = "Edit";
    editBtn.value = "Edit";
    let removeBtn = document.createElement('button');
    removeBtn.classList = "remove";
    removeBtn.textContent = "Remove";
    removeBtn.value = "Remove";
    buttons.appendChild(editBtn);
    buttons.appendChild(removeBtn);
    
    section.appendChild(img);
    section.appendChild(name);
    section.appendChild(mail);
    section.appendChild(buttons);

    let first = peopleConfirmed.firstChild;

    peopleConfirmed.insertBefore(section, first);

   

    
}


showBtn.addEventListener('click', ()=>{

    let invitePeople = document.querySelector('.invite-people');
    
        invitePeople.classList.toggle('hide');
    
    
        if(invitePeople.classList.contains("hide")){
            
            invitePeople.style.display = "none";
            showBtn.textContent = "ADD-PEOPLE";
        }else{
            invitePeople.style.display = "flex";
            showBtn.textContent = "HIDE";
        }

})

submit.addEventListener('click', ()=>{

    addPeople();

})

function pagination(arr, perPagina, pagina){

    let  vec=[];

    for(let i=(pagina-1)*perPagina;i<perPagina*pagina;i++){

        
        vec.push(arr[i]);
    }

    return vec;
}

function populateCardsPagination(arr, nrPagina){

    if(window.innerWidth < 720){
        let min = pagination(arr, 4, nrPagina);

        populateCards(min);
        createButtons(Math.ceil(arr.length/4));
        
    }else if(window.innerWidth < 1024){

        let med = pagination(arr, 6, nrPagina);
      
        populateCards(med);
        createButtons(Math.ceil(arr.length/6));
        
    }else{

        let max = pagination(arr, 12, nrPagina);
       
        populateCards(max);
        createButtons(Math.ceil(arr.length/12));

    }

}

populateCardsPagination(data, 1);

window.addEventListener('resize',()=>{

    populateCardsPagination(data, 1);

})

function createButtons(number){

    let ftr = document.querySelector('.ftr');

    ftr.innerHTML="";

    for(let i = 1; i<=number; i++){
        let btn = document.createElement('button');
        btn.textContent = `${i}`;
        btn.value = `${i}`;
        ftr.appendChild(btn);
    }

}

footer.addEventListener('click', (e)=>{

    let el = e.target;
    let nr = el.textContent;

    populateCardsPagination(data, nr);

})

function Remove(key){

    let el = key.parentNode.parentNode;  
    
    el.parentNode.removeChild(el);
}


people.addEventListener('click', (e)=>{

    let el = e.target;

    if(el.classList.contains("remove")){
    
            Remove(el);
    
    } else if(el.classList.contains("edit")){

        let parent = el.parentNode.parentNode;
        
        let child = parent.firstChild;
        let second = parent.children[1];
        let third = parent.children[2];

        
            let inp = document.createElement('input');
            inp.classList = "in-name";
            let inp2 = document.createElement('input');
            inp2.classList = "in-mail";

            inp.value=child.textContent;

            parent.insertBefore(inp, child);
            parent.insertBefore(inp2, child);

            // parent.removeChild(child);
            parent.removeChild(second);
            parent.removeChild(third);
            
            el.textContent = "Save";
            el.classList.remove("edit");
            el.classList.add("save")
    

    }else if(el.classList.contains("save")){

        let parent = el.parentNode.parentNode;
        let third = parent.children[3];
        
        let inp=document.querySelector(".in-name");
        let inp2 = document.querySelector('.in-mail');

        let val = inp.value;
        let val2 = inp2.value;

        let h4 = document.createElement('h4');
        parent.insertBefore(h4, third);
        h4.textContent = val;

        let h5 = document.createElement('h5');
        parent.insertBefore(h5, third);
        h5.textContent = val2;
        
        parent.removeChild(inp);
        parent.removeChild(inp2);

        el.textContent = "Edit";
        el.classList.remove("save");
        el.classList.add("edit")
       
    }
})
