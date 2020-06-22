new Vue({
  el: "#app",
  data: {
    format: "",
    variables: [
      {
        name: "",
        query: "",
      },
    ],
  },
  methods: {
    addVariable: function () {
      this.variables.push({ name: "", query: "" });
    },
    clipIt: function () {
      const variablesString = JSON.stringify(this.variables);
      console.log(variablesString);
      browser.tabs.executeScript({
        code: `(function() {
      let variables = ${variablesString};
      let queryResults = variables.map((variable) => {
        return { 
          result: eval(variable.query),
          name: variable.name
        };
      });

      browser.runtime.sendMessage(queryResults);
    })()`,
      });
    },
  },
  watch: {
    format: function () {
      localStorage.setItem("format", JSON.stringify(this.format));
    },
    variables: {
      handler: function () {
        console.log("variables was changed", this.variables);
        localStorage.setItem("variables", JSON.stringify(this.variables));
      },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.getItem("format")) {
      this.format = JSON.parse(localStorage.getItem("format"));
    }

    if (localStorage.getItem("variables")) {
      this.variables = JSON.parse(localStorage.getItem("variables"));
    }
  },
});
