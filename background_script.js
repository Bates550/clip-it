// Put all the javascript code here, that you want to execute in background.

function update(message) {
  const { format } = JSON.parse(localStorage.getItem("state"));

  const result = message.reduce((acc, query) => {
    return acc.replace(`%${query.name}`, query.result);
  }, format);

  navigator.clipboard.writeText(result);
}

browser.runtime.onMessage.addListener(update);
