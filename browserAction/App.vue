<template>
  <div
    style="
      background-color: brown;
      background-image: url('../assets/clipboard_texture_by_the_auteur_stock.jpg/');
      border-radius: 16px;
      padding: 10px;
      box-shadow: 1px 1px 5px 0px #393935
    "
  >
    <div
      style="
        padding: 10px;
        background-color: #f0f0dc;
        border-radius: 1px;
        box-shadow: 1px 1px 5px 0px #393935
      "
    >
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: row;">
          <button v-on:click="setPage('template')">Templates</button>
          <button v-on:click="setPage('variable')">Variables</button>
        </div>

        <page-template
          v-if="page === 'template'"
          :current-template="currentTemplate"
          :templates="templates"
          @add-template="addTemplate"
          @change-template="currentTemplate = $event.target.value"
          @delete-template="deleteTemplate"
        ></page-template>

        <page-variable
          v-if="page === 'variable'"
          :variables="variables"
          @delete-variable="deleteVariable"
          @add-variable="addVariable"
        ></page-variable>

        <button v-on:click="clipIt">Clip it!</button>
        <button @click="clearLocalStorage">Clear localStorage</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { v4 as uuid } from "uuid";
import PageTemplate from "../components/PageTemplate.vue";
import PageVariable from "../components/PageVariable.vue";

function update(message) {
  console.log(message);
}
browser.runtime.onMessage.addListener(update);

export default {
  components: {
    PageTemplate,
    PageVariable,
  },
  data: function() {
    const initialTemplateId = "0";
    return {
      page: "template", // 'template' | 'variable'
      currentTemplate: initialTemplateId,
      templates: {
        [initialTemplateId]: {
          id: initialTemplateId,
          name: `Untitled ${initialTemplateId}`,
          format: "",
        },
      },
      variables: [
        {
          id: uuid(),
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
      const newId = uuid();
      let i = 0;
      let newName = `Untitled ${i}`;
      let isNewNameTaken = !!Object.values(this.templates).find(
        (template) => template.name === newName
      );
      while (isNewNameTaken) {
        newName = `Untitled ${++i}`;
        isNewNameTaken = !!Object.values(this.templates).find(
          (template) => template.name === newName
        );
      }
      Vue.set(this.templates, newId, {
        id: newId,
        name: newName,
        format: "",
      });
      this.currentTemplate = newId;
    },
    addVariable: function() {
      this.variables.push({ id: uuid(), name: "", query: "" });
    },
    clearLocalStorage: function() {
      window.localStorage.clear();
    },
    clipIt: function() {
      const variablesString = JSON.stringify(this.variables);
      browser.tabs.executeScript({
        code: `(function() {
      let variables = ${variablesString};
      let queryResults = variables.map((variable) => {
        let result;
        let errorMessage;

        try {
          result = eval(variable.query)
        } catch(e) {
          errorMessage = e.message;
        }

        return { 
          result,
          name: variable.name,
          errorMessage, 
        };
      });

      browser.runtime.sendMessage(queryResults)
    })()`,
      });
    },
    deleteTemplate: function(templateId) {
      Vue.delete(this.templates, templateId);
      this.currentTemplate = "0";
    },
    deleteVariable: function(i) {
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
