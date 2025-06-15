var incompleteTasks = 0;
var completeTasks = 0;
function addTask() {
  let control = document.querySelector("#add");
  let task = control.value;
  if (task != "") {
    incompleteTasks++;
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex align-items-center justify-content-between";
    li.innerHTML =
      `
    <div class="d-flex align-items-center">
      <input class="form-check-input me-2" onchange="updateli(this)" type="checkbox" />
      <span>` +
      task +
      `</span>
    </div>
    <div>
      <button id="delete` +
      taskCount +
      `" class="btn btn-link btn-delete p-0" onclick="deleteli(this)">Delete</button><button id="edit` +
      taskCount +
      `" class="btn btn-link btn-edit p-0" onclick="editli(this)">Edit</button>
    </div>
  `;
    document.getElementById("taskList").appendChild(li);
    document.querySelector(
      "#taskCount"
    ).textContent = `Completed: ${completeTasks} | Incomplete: ${incompleteTasks}`;
  }
  control.value = "";
}
function deleteli(button) {
  let li = button.parentNode.parentNode;
  if (li.querySelector('input[type="checkbox"]').checked) {
    completeTasks--;
  } else {
    incompleteTasks--;
  }
  document.querySelector(
    "#taskCount"
  ).textContent = `Completed: ${completeTasks} | Incomplete: ${incompleteTasks}`;
  li.remove();
}
function editli(button) {
  let li = button.parentNode.parentNode;
  let textDiv = li.querySelector("div.d-flex.align-items-center");
  let span = textDiv.querySelector("span");
  let input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "form-control";

  let buttonDiv = button.parentNode;

  let saveButton = document.createElement("button");
  saveButton.textContent = "Replace";
  saveButton.className = "btn btn-replace btn-edit p-0";
  saveButton.onclick = function () {
    span.textContent = input.value;
    textDiv.replaceChild(span, input);
    buttonDiv.replaceChild(button, saveButton);
  };

  textDiv.replaceChild(input, span);
  buttonDiv.replaceChild(saveButton, button);
}
function updateli(checkbox) {
  const li = checkbox.closest("li");
  if (checkbox.checked) {
    li.classList.add("completed");
    incompleteTasks--;
    completeTasks++;
  } else {
    li.classList.remove("completed");
    incompleteTasks++;
    completeTasks--;
  }
  document.querySelector(
    "#taskCount"
  ).textContent = `Completed: ${completeTasks} | Incomplete: ${incompleteTasks}`;
}