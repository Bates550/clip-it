<script>
export default {
  props: ["errors"],
};
</script>

<template>
  <section style="display: flex; flex-direction: column">
    <div v-for="error in errors" :key="error.name" style="color: red">
      {{ error.name }}
      <pre>
        {{ error.message }}
      </pre>
    </div>
  </section>
</template>
