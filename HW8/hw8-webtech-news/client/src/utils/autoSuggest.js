const bingAutosuggest = (query, callback) => {
  var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/Suggestions";

  var request = new XMLHttpRequest();

  request.open("GET", endpoint + "?q=" + query);
  request.setRequestHeader(
    "Ocp-Apim-Subscription-Key",
    "68b8a16bc26c4d2ba2e8e1f7c08730e0"
  );
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(JSON.parse(request.responseText));
      }
    }
  };
  request.send();
};

export default bingAutosuggest;
