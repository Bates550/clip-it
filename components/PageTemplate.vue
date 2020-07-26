<script>
export default {
  props: ["currentTemplate", "templates"],
};
</script>

<template>
  <section style="display: flex; flex-direction: column">
    <pre></pre>
    <label
      >Selected Template
      <select @change="$emit('change-template', $event)">
        <option
          v-for="template in templates"
          :key="template.id"
          :value="template.id"
          :selected="template.id === currentTemplate"
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
      :disabled="currentTemplate === '0'"
    >
      Delete current template
    </button>
  </section>
</template>
