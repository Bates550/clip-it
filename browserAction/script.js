formatEl = document.getElementById("format");
variableName0El = document.getElementById("variableName0");
variableQuery0El = document.getElementById("variableQuery0");
clipItEl = document.getElementById("clipIt");
addButtonEl = document.getElementById("addButton");

formatEl.addEventListener("blur", (e) => {
  localStorage.setItem("format", e.target.value);
});

variableName0El.addEventListener("blur", (e) => {
  localStorage.setItem("variableName0", e.target.value);
});

variableQuery0El.addEventListener("blur", (e) => {
  localStorage.setItem("variableQuery0", e.target.value);
});

clipItEl.addEventListener("click", (e) => {
  browser.tabs.executeScript({
    // code: localStorage.getItem("variableQuery0"),
    code: `browser.runtime.sendMessage(${localStorage.getItem(
      "variableQuery0"
    )})`,
  });
});

addButtonEl.addEventListener("click", () => {
  const labelEl = document.createElement("label");
  const labelText = document.createTextNode("Variable Name");
  const input = document.createElement("input");
  input.setAttribute("id", "myId");

  labelEl.appendChild(labelText);
  labelEl.appendChild(input);

  const variablesContainerEl = document.getElementById("variablesContainer");
  variablesContainerEl.appendChild(labelEl);

  const labelEl2 = document.createElement("label");
  const labelText2 = document.createTextNode("Variable Query");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", "myId2");

  labelEl2.appendChild(labelText2);
  labelEl2.appendChild(textarea);

  variablesContainerEl.appendChild(labelEl2);
});

/*** HYDRATE ***/
const formatValue = localStorage.getItem("format");
if (formatValue) {
  formatEl.value = formatValue;
}

const variableName0Value = localStorage.getItem("variableName0");
if (variableName0Value) {
  variableName0El.value = variableName0Value;
}

const variableQuery0Value = localStorage.getItem("variableQuery0");
if (variableQuery0Value) {
  variableQuery0El.value = variableQuery0Value;
}
