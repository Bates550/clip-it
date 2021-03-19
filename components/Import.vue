<template>
  <label>
    Import:
    <input @change="onUpload" type="file" accept=".json" />
  </label>
</template>
<script>
export default {
  methods: {
    onUpload: function(event) {
      const file = event.target.files[0];
      file.text().then((fileContent) => {
        Object.entries(JSON.parse(fileContent)).forEach(([key, value]) => {
          Storage.setItem(key, JSON.stringify(value), { isImporting: true });
        });
      });
    },
  },
};
</script>
