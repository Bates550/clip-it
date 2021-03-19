<template>
  <div
    style="
      background-color: brown;
      background-image: url('../assets/clipboard_texture_by_the_auteur_stock.jpg/');
      border-radius: 16px;
      padding: 10px;
      box-shadow: 1px 1px 5px 0px #393935;
    "
  >
    <div
      style="
        padding: 10px;
        background-color: #f0f0dc;
        border-radius: 1px;
        box-shadow: 1px 1px 5px 0px #393935;
      "
    >
      <div style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row">
          <button v-on:click="setPage('template')">Templates</button>
          <button v-on:click="setPage('variable')">Variables</button>
          <button v-on:click="setPage('error')">Errors</button>
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

        <page-error v-if="page === 'error'" :errors="errors"></page-error>

        <button style="margin-top: 20px;" v-on:click="clipIt">Clip it!</button>
        <export />
        <import :sync-from-local-storage="syncFromLocalStorage" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { v4 as uuid } from "uuid";
import PageTemplate from "../components/PageTemplate.vue";
import PageVariable from "../components/PageVariable.vue";
import PageError from "../components/PageError.vue";
import Export from "../components/Export.vue";
import Import from "../components/Import.vue";

export default {
  components: {
    Export,
    Import,
    PageTemplate,
    PageVariable,
    PageError,
  },
  data: function() {
    const initialTemplateId = "0";
    return {
      page: "template", // 'template' | 'variable' | 'error'
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
      errors: [],
    };
  },
  methods: {
    setPage: function(pageName) {
      this.page = pageName;
    },
    setErrors: function(errors) {
      this.errors = errors;
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
    clipIt: function() {
      const currentFormat = this.templates[this.currentTemplate].format;
      const variableNamesInUse = Array.from(
        currentFormat.matchAll(/%\w*/g)
      ).map((matches) => matches[0].slice(1));
      const variablesInUse = this.variables.filter((variable) => {
        return variableNamesInUse.includes(variable.name);
      });

      browser.tabs
        .executeScript({
          code: `(function() {
      let variables = ${JSON.stringify(variablesInUse)};
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
      return queryResults;
    })()`,
        })
        .then(([queryResults]) => {
          const errors = queryResults
            .filter((result) => result.errorMessage)
            .map((result) => ({
              name: result.name,
              message: result.errorMessage,
            }));
          this.setErrors(errors);

          if (errors.length > 0) {
            this.setPage("error");
          }
        });
    },
    deleteTemplate: function(templateId) {
      Vue.delete(this.templates, templateId);
      this.currentTemplate = "0";
    },
    deleteVariable: function(i) {
      this.variables.splice(i, 1);
    },
    syncFromLocalStorage: function() {
      Object.keys(this.$data).forEach((key) => {
        const localStorageValue = localStorage.getItem(key);
        if (localStorageValue) {
          this[key] = JSON.parse(localStorageValue);
        }
      });
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
    errors: {
      handler: function() {
        localStorage.setItem("errors", JSON.stringify(this.errors));
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
    this.syncFromLocalStorage();
  },
};
</script>
