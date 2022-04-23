const form = document.querySelector('form');

const addToDo = document.getElementById('addToDo');

const theList = document.querySelector('ul');

let num = 0;

//get the stuff i saved to local storage back on the page
let allDos = JSON.parse(localStorage.getItem("allDos")) || [];
//above contains an array [{that contains objects}] or an empty array if nothing has been stored.

for(let prop in allDos){
    let newToDo = document.createElement('li');
     //i struggled with getting the true/false property for hasBeenDone to update and referenced the springboard solution to help me figure out how to update and set this. 
    newToDo.hasBeenDone = allDos[prop].hasBeenDone ? true : false;
    newToDo.innerText = allDos[prop].do;
    hasBeenDone = allDos[prop].hasBeenDone
    
    //put the unqiue id attribute back on the to do li
    identifier = allDos[prop].identifier
    newToDo.setAttribute("id", `${identifier}`)
    
   
   let deleteBtn = document.createElement('button');
   deleteBtn.innerText = "Delete To Do";
  
   if(newToDo.hasBeenDone){
    newToDo.classList.add('done');
    //if true it's done
   } else {
    newToDo.classList.add('undone');
    //if false it's undone
   }
   newToDo.appendChild(deleteBtn)
   theList.prepend(newToDo); 
}

//add to do do and buttons to the ul
form.addEventListener('submit', function(evt){
    
    //empty input = no
    evt.preventDefault();
    if(!addToDo.value){
          return alert("Please type something in the Add a to Do Field - Thanks!")
      }
      num += Math.random() // tried incrementing this by 1 and it got real weird, and would eventually end up back at a1 if you deleted something...if you're unlucky you might get a duplicate random in the li id attribute which creates weird and undesired behavior, not sure if there's a better way to handle...
      
      let newId = `a${num}`

    //push object to array, then save to localStorage
    allDos.push({identifier: newId, do: addToDo.value, hasBeenDone: false })
    localStorage.setItem("allDos", JSON.stringify(allDos))

   //add to the list 
        let newToDo = document.createElement('li');
        newToDo.setAttribute("id", `${newId}`) //attach id to li
       
        newToDo.innerText = addToDo.value;

       let deleteBtn = document.createElement('button');
       deleteBtn.innerText = "Delete To Do";
      
       newToDo.classList.add('undone');
       newToDo.appendChild(deleteBtn)
       theList.prepend(newToDo); 
       form.reset();
});


theList.addEventListener('click', function(evt){

    // mark as done or undone 
    //again, i struggled with getting the true/false property for hasBeenDone to update and referenced the springboard solution to help me figure out how to update these.    

    let marked = evt.target; //gives the full li
    let checkId = evt.target.getAttribute("id")
    
    if(!marked.hasBeenDone){
        evt.target.classList.remove('undone');
        evt.target.classList.add('done');
        marked.hasBeenDone = true;
        //if hasBeenDone was set to false set to true
    } else {
        evt.target.classList.remove('done');
        evt.target.classList.add('undone');
        marked.hasBeenDone = false;
        //if hasBeenDone was set to true set to false
            }

   for (let prop in allDos) {

    if (allDos[prop].identifier === checkId ) {  
        allDos[prop].hasBeenDone = !allDos[prop].hasBeenDone; //now the value of hasBeenDone is set to the opposite of what is was before.
        localStorage.setItem("allDos", JSON.stringify(allDos));
      }
                
       } 

    //delete to dos 

   if(evt.target.tagName === 'BUTTON'){
    let thisOne = evt.target.parentElement.getAttribute("id")
    evt.target.parentElement.remove();
    
    allDos = JSON.parse(localStorage.getItem("allDos"))
    
    //referenced stack overlfow post to help find the below solution
    //https://stackoverflow.com/questions/60254872/how-remove-item-by-id-from-localstorage

    let findRemove = allDos.filter(id => id.identifier !== thisOne)
    //filter the array allDos for all ids that are not id the given and make a new array without thisOne
    
    localStorage.setItem("allDos", JSON.stringify(findRemove));
    console.log(findRemove) // update the local storage array
 }

     });

  


   
