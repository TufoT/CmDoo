let input = document.querySelector('.txt-input');
let content = document.querySelector('.content');
let clear = document.getElementsByClassName('.clear');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

input.addEventListener('keydown', handleCommand);

function handleCommand(event) {
    if(event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';
        content.innerHTML += `$ ${command}<br>`;
        executeCommand(command);
    }
}

function executeCommand(command) {
    switch (command) {
        case "help":
            content.innerHTML += '<p class="dummy-txt">Available commands: <span class="cmd-txt">help</span>, <span class="cmd-txt">addToDo</span>, <span class="cmd-txt">removeToDo</span>, <span class="cmd-txt">listToDo</span>, <span class="cmd-txt">clear</span>, <span class="cmd-txt">updates</span>, <span class="cmd-txt">aboutMe .</span></p><br>';
            break;
        case "addToDo":
            content.innerHTML += "Enter task: <br>";
            input.removeEventListener('keydown', handleCommand);
            input.addEventListener('keydown', handleAddTask);
            break;
        case "removeToDo":
            content.innerHTML += "Enter a task number to remove: <br>";
            input.removeEventListener('keydown', handleCommand);
            input.addEventListener('keydown', handleRemoveTask);
            break;
        case "listToDo":
            if (todos.length === 0) {
                content.innerHTML += "No tasks<br>";
            }else {
                for(let i=0; i < todos.length; i++) {
                    content.innerHTML += `<span class="listed-task">${i + 1}. ${todos[i]}</span><br>`;
                }
            }
            break;
        case "clear":
            setTimeout(function() {
                content.innerHTML = '<a id="clear"></a>';
                before = document.getElementById("clear");
              }, 1);
            break;
        case "aboutMe":
            let aboutMe = document.createElement('div');
            aboutMe.classList.add('about-me');
            aboutMe.innerHTML =
            `
            <span class="about-txt">Hello visitor,<br> My name is Tufo. I am a web developer who is fairly new at this,<br>
            but i do my best to create fun web sites like this one . I also <br>
            make youtube videos about my journey, so i can get feedback about <br>
            my project because like i said I am fairly new at this, I make my<br> 
            websites with HTML CSS and JavaScript. Hope you enjoyed this website.<br>
            You can check my youtube channel here: <a href="https://www.youtube.com/channel/UCcvan4b4UrAXDT3mPv5hbuw" target="_blank">https://www.youtube.com/channel/UCcvan4b4UrAXDT3mPv5hbuw</a>.<br>
            You can also check my GitHub page here: <a href="https://github.com/TufoT" target="_blank">https://github.com/TufoT</a><br>
              </div>
            `

            content.appendChild(aboutMe);
            input.value = '';
            break;
          case "updates":
            let updates = document.createElement('div');
            updates.classList.add('about-me');
            updates.innerHTML =
            `
            <span class="about-txt"> 
            Updates:<br>
            Commands: Updates it displays the added updates to my todo-list .<br>
            Other Updates: added localStorage to the todos so they do not get deleted when refreshed<br>
            or when you leave the pade .
            </span>
            `

            content.appendChild(updates);
            input.value = '';
          break;
        default:
            content.innerHTML += `Unknown command: ${command}, for a list of commands type help.<br>`;
    }
}

function handleAddTask(event) {
    if (event.key === "Enter") {
      const task = input.value.trim();
      if (task !== "") {
        todos.push(task);
        content.innerHTML += `<span class="added-task">Task added: ${task}</span><br>`;
        input.value = '';  

        localStorage.setItem('todos', JSON.stringify(todos));
      }
      input.removeEventListener("keydown", handleAddTask);
      input.addEventListener("keydown", handleCommand);
    }
  }

  function handleRemoveTask(event) {
    if (event.key === "Enter") {
      const index = parseInt(input.value) - 1;
      if (isNaN(index) || index < 0 || index >= todos.length) {
        content.innerHTML += "Invalid task number<br>";
        input.value = '';
      } else {
        const task = todos[index];
        todos.splice(index, 1);
        content.innerHTML += `<span class="removed-task">Task removed: ${task}</span><br>`;
        input.value = '';

        localStorage.setItem('todos', JSON.stringify(todos));
      }
      input.removeEventListener("keydown", handleRemoveTask);
      input.addEventListener("keydown", handleCommand);
    }
  }