// Load API.
(() => {
  console.log("Injecting yerbasApi.");

  window.addEventListener(
    "message",
    function (event) {
      if (event.source !== window) {
        return;
      }
      if (event.data.type && event.data.type === "YerbasApi") {
        const request = event.data;
        const origin = event.origin;

        browser.runtime
          .sendMessage(browser.runtime.id, {
            request: event.data,
            origin: event.origin
          })
          .then((response) => {
            window.postMessage(
              {
                type: "YerbasApiResponse",
                id: request.id,
                response: response,
              },
              event.origin
            );
          });
      }
    },
    false
  );

  const s = document.createElement("script");
  s.type = "text/javascript";
  s.src = browser.runtime.getURL("assets/js/yerbasApi.js");
  (document.head || document.documentElement).appendChild(s);

  console.log("Injected yerbasApi.");
})();
