<template>
  <div style="display: flex; flex-direction: column;">
    <div style="display: flex; flex-direction: row;">
      View:
      <button v-on:click="setPage('template')">Templates</button>
      <button v-on:click="setPage('variable')">Variables</button>
    </div>

    <page-template
      v-if="page === 'template'"
      :current-template="currentTemplate"
      :templates="templates"
      @add-template="addTemplate"
      @change-template="currentTemplate = $event.target.value"
    ></page-template>

    <page-variable
      v-if="page === 'variable'"
      :variables="variables"
      @remove-variable="removeVariable"
      @add-variable="addVariable"
    ></page-variable>

    <button v-on:click="clipIt">Clip it!</button>
  </div>
</template>

<script>
import Vue from "vue";
import PageTemplate from "../components/PageTemplate.vue";
import PageVariable from "../components/PageVariable.vue";

export default {
  components: {
    PageTemplate,
    PageVariable,
  },
  data: function() {
    return {
      page: "template", // 'template' | 'variable'
      currentTemplate: 0,
      templates: {
        0: {
          id: 0,
          name: "",
          format: "",
        },
      },
      variables: [
        {
          name: "",
          query: "",
        },
      ],
    };
  },
  methods: {
    setPage: function(pageName) {
      this.page = pageName;
    },
    addTemplate: function() {
      const newId = Object.keys(this.templates).length;
      Vue.set(this.templates, newId, {
        id: newId,
        name: "",
        format: "",
      });
    },
    addVariable: function() {
      this.variables.push({ name: "", query: "" });
    },
    clipIt: function() {
      const variablesString = JSON.stringify(this.variables);
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
    deleteTemplate: function(templateId) {
      Vue.delete(this.templates, templateId);
      this.currentTemplate = 0;
    },
    removeVariable: function(i) {
      this.variables.splice(i, 1);
    },
  },
  watch: {
    currentTemplate: function() {
      localStorage.setItem(
        "currentTemplate",
        JSON.stringify(this.currentTemplate)
      );
    },
    format: function() {
      localStorage.setItem("format", JSON.stringify(this.format));
    },
    templates: {
      handler: function() {
        localStorage.setItem("templates", JSON.stringify(this.templates));
      },
      deep: true,
    },
    variables: {
      handler: function() {
        localStorage.setItem("variables", JSON.stringify(this.variables));
      },
      deep: true,
    },
    page: function() {
      localStorage.setItem("page", JSON.stringify(this.page));
    },
  },
  mounted() {
    // Initialize localStorage
    if (!localStorage.getItem("isLocalStorageInitialized")) {
      Object.keys(this.$data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(this.$data[key]));
      });

      localStorage.setItem("isLocalStorageInitialized", true);
    }

    // Initialize Vue state
    Object.keys(this.$data).forEach((key) => {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue) {
        this[key] = JSON.parse(localStorageValue);
      }
    });
  },
};
</script>
