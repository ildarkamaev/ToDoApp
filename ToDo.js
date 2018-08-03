// selekteerin vajalikud elemendid
const form = document.querySelector('.TaskForm');

const addBtn = document.querySelector('#addBtn');

const list = document.querySelector('ul');

const clearTasks = document.querySelector('#ClearBtn');

const filter = document.querySelector('#Filter');

const taskInput = document.querySelector('#TaskInput');

// kutsun fn'i mis käivitab kõik eventlistenerid
loadEventListeners();

// fn mis käivitab kõik eventlistener'id
function loadEventListeners(){
    //event mis käivitub, kui leht on laaditud
    document.addEventListener('DOMContentLoaded', getTasks);
    // lisan elemendi listi
    form.addEventListener('submit', addTask);
    addBtn.addEventListener('click', addTask);
    // eemaldan elemendi listist
    list.addEventListener('click', removeTask);
    //eemaldan kõik elemendid listist
    clearTasks.addEventListener('click', clearTask);
    //filtreerib elemente
    filter.addEventListener('keyup', filterTasks);
}

//kuva elemente mälust
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'taskItem';
        //li elementi lisame teksti elemendi, mille väärtuseks on taskinput lahtrisse sisestatud elemendi väärtus
        li.appendChild(document.createTextNode(task));
        //lisan risti, mis eemaldab elemendi
        const cross = document.createElement('a');
        cross.className = 'DeleteTask'; // annan ristile klassinime
        cross.innerHTML = '<i id= "cross" class="fas fa-times"></i>'; // annan ristile ikooni
        //panen li elemendi risti sümboli vanemaks
        li.appendChild(cross);
        // panen li elemendi ul lapseks
        list.appendChild(li);
    })
}

// fn lisab elemendi listi
function addTask(e){
    if(taskInput.value === ''){ //kontrollib, kas task lahtrisse üldse midagi sisestati
        alert('add a task');
    }
    // loon li elemendi klassinimega taskItem
    const li = document.createElement('li');
    li.className = 'taskItem';
    //li elementi lisame teksti elemendi, mille väärtuseks on taskinput lahtrisse sisestatud elemendi väärtus
    li.appendChild(document.createTextNode(taskInput.value));
    //lisan risti, mis eemaldab elemendi
    const cross = document.createElement('a');
    cross.className = 'DeleteTask'; // annan ristile klassinime
    cross.innerHTML = '<i id= "cross" class="fas fa-times"></i>'; // annan ristile ikooni
    //panen li elemendi risti sümboli vanemaks
    li.appendChild(cross);
    // panen li elemendi ul lapseks
    list.appendChild(li);

    //lisan elemendi väärtuse browseri mällu
    taskToLocalStorage(taskInput.value);

    // tühjendan sisendi lahtri, kui sisend on edastatud
    taskInput.value = '';

    e.preventDefault();
}

// paigutan task'i   local storage'isse
function taskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){ //kui mälus pole elemente võtmesõnaga tasks
        tasks = []; // siis tasks jääb tühjaks massiiviks
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks')); //võta element mälust võtmesõnaga tasks
    }

    tasks.push(task); // lisa element task massiivi tasks

    localStorage.setItem('tasks', JSON.stringify(tasks)); //paiguta elemendid võtmesõnaga tasks ning hoiusta neid ülesandeid sõnedena.
}


// fn eemaldab elemendi
function removeTask(e){
    // kui klikitud elemendi vanem-elemendi klassi nimetuste hulgas on nimi deletetask
    if(e.target.parentElement.classList.contains('DeleteTask')){
        // siis klikitud elemendi vanavanem eemaldada
        e.target.parentElement.parentElement.remove();
        // eemalda element ka püsimälust

    }
    removeTaskLocalStorage(e.target.parentElement.parentElement);
}

//eemalda püsimälust
function removeTaskLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){ //kui mälus pole elemente võtmesõnaga tasks
        tasks = []; // siis tasks jääb tühjaks massiiviks
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks')); //võta element mälust võtmesõnaga tasks
    };

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// eemalda kõik ülesanded
function clearTask(){
    if(confirm('oled kindel?')){
        while(list.firstChild){ //kunis on elemente listis
        list.removeChild(list.firstChild); // eemalda listi esimene element
        }
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
};

//filtreeri ülesandeid
function filterTasks(e){
    const text = e.target.value.toLowerCase(); // annab lahtrisse sisestatud väärtuse. Paneb väärtuse väiketähtedesse
    document.querySelectorAll('li').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'flex';
            }else{
                task.style.display = 'none';
            }
        }
    );


}
