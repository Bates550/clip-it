<script>
export default {
  props: ["currentTemplate", "templates"],
};
</script>

<template>
  <section style="display: flex; flex-direction: column">
    <label
      >Selected Template
      <select
        v-on:change="$emit('change-template', $event)"
        v-bind:value="currentTemplate"
      >
        <option
          v-for="template in templates"
          :key="template.id"
          :value="template.id"
          >{{ template.name }}</option
        >
      </select></label
    >
    <label
      >Template Name<input v-model="templates[currentTemplate].name"
    /></label>
    <label
      >Format<textarea v-model="templates[currentTemplate].format"></textarea>
    </label>
    <button v-on:click="$emit('add-template')">Add template</button>
    <button
      @click="$emit('delete-template', currentTemplate)"
    >
      Delete current template
    </button>
  </section>
</template>
