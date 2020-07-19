<script>
export default {
  props: ["variables"],
};
</script>

<template>
  <section style="display: flex; flex-direction: column;">
    <div
      v-for="(variable, i) in variables"
      :key="variable.name"
      style="display: flex; flex-direction: column;"
    >
      <label>Variable Name<input v-model="variable.name"/></label>
      <label
        >Variable Query<textarea v-model="variable.query"></textarea>
      </label>
      <button @click="$emit('remove-variable', i)">Remove</button>
    </div>
    <button @click="$emit('add-variable')">Add variable</button>
  </section>
</template>
