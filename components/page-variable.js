Vue.component("page-variable", {
  props: ["variables"],
  data: function () {
    return {};
  },
  template: `
<section style="display: flex; flex-direction: column;">
  <div
    v-for="(variable, i) in variables"
    style="display: flex; flex-direction: column;"
  >
    <label>Variable Name<input v-model="variable.name" /></label>
    <label
      >Variable Query<textarea v-model="variable.query"></textarea>
    </label>
    <button @click="$emit('remove-variable', i)">Remove</button>
  </div>
  <button @click="$emit('add-variable')">Add variable</button>
</section>
  `,
});
