const express = require("express");
const app = express();

// app.use(express.json());

const cors = require("cors");
app.use(cors());

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const guardian_api_key = "8126d847-7110-45e4-a2fe-52649e661988";
const nytimes_api_key = "PzTs2D8kgMtEJuVIvbJbEfoymayJoGlZ";

// ------------------------------
// ---------- NY Times ----------
// ------------------------------

// SECTION/HOME
app.get("/nytimes/:category", (req, res) => {
  var cat = req.params.category;
  cat = cat.toLowerCase();

  var nytimes_link =
    "https://api.nytimes.com/svc/topstories/v2/" +
    cat +
    ".json?api-key=" +
    nytimes_api_key;
  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", nytimes_link, true);

  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        res.send(JSON.parse(xmlreq.responseText));
      }
    }
  };

  xmlreq.send();
});

// DETAILED VIEW
app.get("/nytimes/article_view/:article_id", (req, res) => {
  var art_id = req.params.article_id;

  var nytimes_link =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' +
    art_id +
    '")&api-key=' +
    nytimes_api_key;

  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", nytimes_link, true);

  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        res.send(JSON.parse(xmlreq.responseText));
      }
    }
  };

  xmlreq.send();
});

// SEARCH
app.get("/nytimes/search/:query", (req, res) => {
  var query = req.params.query;

  var nytimes_link =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    query +
    "&api-key=" +
    nytimes_api_key;
  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", nytimes_link, true);

  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        res.send(JSON.parse(xmlreq.responseText));
      }
    }
  };

  xmlreq.send();
});

// ------------------------------
// ---------- Guardian ----------
// ------------------------------

// SECTION/HOME
app.get("/guardian/:category", (req, res) => {
  var cat = req.params.category;
  cat = cat.toLowerCase();
  if (cat == "sports") {
    cat = "sport";
  }

  var guardian_link = "";

  if (cat == "home") {
    guardian_link +=
      "https://content.guardianapis.com/search?api-key=" +
      guardian_api_key +
      "&section=(sport|business|technology|politics)&show-blocks=all";
  } else {
    guardian_link +=
      "https://content.guardianapis.com/" +
      cat +
      "?api-key=" +
      guardian_api_key +
      "&show-blocks=all";
  }

  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", guardian_link, true);

  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        res.send(JSON.parse(xmlreq.responseText));
      }
    }
  };

  xmlreq.send();
});

// DETAILED VIEW
app.get("/guardian/article_view/:article_id", (req, res) => {
  var art_id = req.params.article_id;

  var guardian_link =
    "https://content.guardianapis.com/" +
    art_id +
    "?api-key=" +
    guardian_api_key +
    "&show-blocks=all";

  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", guardian_link, true);

  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        res.send(JSON.parse(xmlreq.responseText));
      }
    }
  };

  xmlreq.send();
});

// SEARCH
app.get("/guardian/search/:query", (req, res) => {
  var query = req.params.query;

  var guardian_link =
    "https://content.guardianapis.com/search?q=" +
    query +
    "&api-key=" +
    guardian_api_key +
    "&show-blocks=all";
  var xmlreq = new XMLHttpRequest();
  xmlreq.open("GET", guardian_link, true);

  xmlreq.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        res.send(JSON.parse(xmlreq.responseText));
      }
    }
  };

  xmlreq.send();
});

// ------------------------------
// ---------- PortInfo ----------
// ------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
