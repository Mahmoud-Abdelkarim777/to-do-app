let title = document.getElementById('title');
let day = document.getElementById('day');
let time = document.getElementById('time');
let create = document.getElementById('create');

let mood = 'Create';
let btn;
// Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Create task
create.onclick = function() {
    let newTask = {
        title: title.value,
        day: day.value,
        time: time.value,
    };
    if(title.value !='' && day.value !='' ){
            if (mood === 'Create') {
                tasks.push(newTask);
            } else {
                tasks[btn] = newTask;
                mood = 'Create';
                create.innerHTML = 'Create';
            }
            clearData();
    }
    else{
        alert("You must enter task and day 😊")
    }
    // Save data in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showData();
};

// Clear data
function clearData() {
    title.value = '';
    day.value = '';
    time.value = '';
}

// Show data
function showData() {
    let table = '';
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]) {  // Check if tasks[i] is not null or undefined
            const checkboxId = `checkbox-${i}`;
            table += `
                <tr>
                    <td class="td">${i + 1}</td>
                    <td class="d-flex align-items-center gap-2">
                        <input type="checkbox" id="${checkboxId}" ${getCheckboxChecked(i) ? 'checked' : ''}>
                        <div class="">
                            <h6 class="m-0" id="text">${tasks[i].title}</h6>
                            <div class="d-flex gap-1">
                                <p class="m-0">${tasks[i].day}</p>
                                <p class="m-0">${tasks[i].time}</p>
                            </div>
                        </div>
                    </td>
                    <td class="td">
                        <i onclick="updateData(${i})" class="fa-solid fa-pen-to-square update"></i>
                        <i onclick="deleteData(${i})" class="fa-solid fa-trash delete"></i>
                    </td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (tasks.length > 0) {
        btnDeleteAll.innerHTML = `<button class="w-100" onclick="deleteAll()">Delete All (${tasks.length})</button>`;
    } else {
        btnDeleteAll.innerHTML = '';
    }
    let footer = document.getElementById('foot');
    if (tasks.length > 0) {
        footer.innerHTML = `<div class="footer text-center w-100 p-4">
        <p>&copy 2024 <a href="https://www.linkedin.com/in/mahmoud-abdelkarim-%F0%9F%87%B5%F0%9F%87%B8-487452229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target = "blank">Mahmoud</a> All rights reserved <br>
        <a href="https://www.linkedin.com/in/mahmoud-abdelkarim-%F0%9F%87%B5%F0%9F%87%B8-487452229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target = "blank"><i class="fa-brands fa-linkedin m-2"></i></a>
        <a href="https://wa.me/01018253715" target = "blank"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="mailto:mabdelkarimkhalaf777@gmail.com" target = "blank"><i class="fa-solid fa-m m-2"></i></a>
        
        </p>
        </div>
        `;
    } else {
        footer.innerHTML = '';
    }
    // Add event listeners for checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveCheckboxState(checkbox.id, checkbox.checked);
        });
    });
}

// Save checkbox state to local storage
function saveCheckboxState(id, isChecked) {
    let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    checkboxStates[id] = isChecked;
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

// Get checkbox checked state from local storage
function getCheckboxChecked(index) {
    let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    const id = `checkbox-${index}`;
    return checkboxStates[id] === true;
}

// Delete one item
function deleteData(i) {
    alert("Are you sure delete this?")
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showData();
}

// Delete all items
function deleteAll() {
    localStorage.clear();
    tasks.splice(0);
    showData();
}

// Update data
function updateData(i) {
    if (tasks[i]) {  // Ensure tasks[i] exists
        title.value = tasks[i].title;
        day.value = tasks[i].day;
        time.value = tasks[i].time;
        create.innerHTML = 'Update';
        mood = 'Update';
        btn = i;
        scroll({ 
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Load checkbox states on page load
window.addEventListener('load', () => {
    showData();
});
