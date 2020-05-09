formatEl = document.getElementById("format");
clipItEl = document.getElementById("clipIt");
addButtonEl = document.getElementById("addButton");

formatEl.addEventListener("blur", (e) => {
  StateHandler.setFormat(e.target.value);
});

clipItEl.addEventListener("click", (e) => {
  browser.tabs.executeScript({
    code: `browser.runtime.sendMessage(${localStorage.getItem(
      "variableQuery0"
    )})`,
  });
});

addButtonEl.addEventListener("click", () => {
  StateHandler.addVariable();
});

const createVariableHTML = (id, variable) => {
  const variablesContainerEl = document.getElementById("variablesContainer");

  const section = document.createElement("section");
  section.setAttribute("style", "display: flex; flex-direction: column");
  section.setAttribute("id", id);

  const variableNameId = `variableName_${id}`;
  const variableQueryId = `variableQuery_${id}`;
  section.innerHTML = `<label>Variable Name<input id="${variableNameId}"/></label><label>Variable Query<textarea id="${variableQueryId}"></textarea></label>`;

  variablesContainerEl.appendChild(section);

  const variableNameInput = document.getElementById(variableNameId);
  variableNameInput.value = variable.name;
  variableNameInput.addEventListener("blur", (e) => {
    StateHandler.setName(id, e.target.value);
  });

  const variableQueryInput = document.getElementById(variableQueryId);
  variableQueryInput.value = variable.query;
  variableQueryInput.addEventListener("blur", (e) => {
    StateHandler.setQuery(id, e.target.value);
  });
};

/*** HYDRATE ***/
const variableName0Value = localStorage.getItem("variableName0");
if (variableName0Value) {
  variableName0El.value = variableName0Value;
}

const variableQuery0Value = localStorage.getItem("variableQuery0");
if (variableQuery0Value) {
  variableQuery0El.value = variableQuery0Value;
}

const StateHandler = {
  state: {
    format: "",
    variables: [
      {
        name: "",
        query: "",
      },
    ],
  },
  hydrate: () => {
    const state = JSON.parse(localStorage.getItem("state"));
    if (state) {
      StateHandler.state = state;

      if (StateHandler.state.format !== "") {
        formatEl.value = StateHandler.state.format;
      }

      StateHandler.state.variables.forEach((variable, i) => {
        createVariableHTML(i, variable);
      });
    }
  },
  setFormat: (value) => {
    StateHandler.state.format = value;
    localStorage.setItem("state", JSON.stringify(StateHandler.state));
  },
  setQuery: (id, value) => {
    StateHandler.state.variables[id].query = value;
    localStorage.setItem("state", JSON.stringify(StateHandler.state));
  },
  setName: (id, value) => {
    StateHandler.state.variables[id].name = value;
    localStorage.setItem("state", JSON.stringify(StateHandler.state));
  },
  addVariable: () => {
    StateHandler.state.variables = StateHandler.state.variables.concat({
      name: "",
      query: "",
    });
    createVariableHTML(
      StateHandler.state.variables.length,
      StateHandler.state.variables[StateHandler.state.variables.length - 1]
    );
    localStorage.setItem("state", JSON.stringify(StateHandler.state));
  },
};

StateHandler.hydrate();
