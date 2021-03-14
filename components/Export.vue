<template>
  <a v-bind:href="`data:application/octet-stream;charset=utf-16le;base64,${encodeLocalStorage()}`" download="export.json">Export!</a>
</template>
<script>

export default {
  methods: {
    encodeLocalStorage: function () {
      const exportObject = Object.entries(window.localStorage).reduce(
        (acc, [key, value]) => {
          acc[key] = JSON.parse(value);
          return acc;
        },
        {}
      );
      return btoa(JSON.stringify(exportObject, null, 2));
    },
  },
};
</script>
