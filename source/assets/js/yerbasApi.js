const sendYerbasApiRequest = (endpoint, data) => {
  // Get request id.
  const requestId = window.crypto.getRandomValues(new Uint32Array([0]))[0];

  // Send.
  window.postMessage(
    {
      id: requestId,
      type: "YerbasApi",
      action: endpoint,
      data: data,
      request: { action: endpoint, data: data },
    },
    "*"
  );

  // Listen to response.
  return new Promise((resolve, reject) => {
    const responseHandler = (response) => {
      if (
        response.data.type === "YerbasApiResponse" &&
        response.data.id === requestId
      ) {
        window.removeEventListener("message", responseHandler);
        resolve(response.data.response);
      }
    };
    window.addEventListener("message", responseHandler);
  });
};

window.yerbas = {
  getActiveAccountAddress: () => {
    return sendYerbasApiRequest("getActiveAccountAddress", {});
  },
  requestSignTransaction: (vins, vouts) => {
    return sendYerbasApiRequest("requestSignTransaction", {
      vins: vins,
      vouts: vouts,
    });
  },
  requestSign: (content) => {
    return sendYerbasApiRequest("requestSign", { content: content });
  },
};
