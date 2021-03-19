<template>
  <label>
    Import:
    <input @change="onUpload" type="file" accept=".json" />
  </label>
</template>
<script>
export default {
  props: ["syncFromLocalStorage"],
  methods: {
    onUpload: function(event) {
      const file = event.target.files[0];
      file.text().then((fileContent) => {
        Object.entries(JSON.parse(fileContent)).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
        this.syncFromLocalStorage();
      });
    },
  },
};
</script>
