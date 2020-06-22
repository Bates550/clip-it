// Put all the javascript code here, that you want to execute in background.

function update(message) {
  const templates = JSON.parse(localStorage.getItem("templates"));
  const currentTemplate = JSON.parse(localStorage.getItem("currentTemplate"));
  const format = templates[currentTemplate].format;

  const result = message.reduce((acc, query) => {
    return acc.replace(`%${query.name}`, query.result);
  }, format);

  console.log(result);

  navigator.clipboard.writeText(result);
}

browser.runtime.onMessage.addListener(update);
