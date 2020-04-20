document.getElementById("format").addEventListener("blur", (e) => {
  browser.runtime.sendMessage({
    type: "update_query",
    payload: e.target.value,
  });
});
