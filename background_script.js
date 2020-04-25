// Put all the javascript code here, that you want to execute in background.
// const state = {
//   query: "",
//   variables: {},
// };

function update(message) {
  navigator.clipboard.writeText(message);
  //   localStorage.setItem("queryResult0", message);
  //   switch (message.type) {
  //     case "update_format":
  //       console.log(localStorage.getItem("format"));
  //       break;
  //     default:
  //       console.error(
  //         "Unrecognized message.type: ",
  //         message.type,
  //         "from message: ",
  //         message
  //       );
  //       break;
  //   }
}

browser.runtime.onMessage.addListener(update);
