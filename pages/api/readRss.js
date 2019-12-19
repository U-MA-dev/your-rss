import axios from "axios";
import fastXmlParser from "fast-xml-parser";
import rssConfig from "../../src/app/env/rss-config";

export default (req, res) => {
  const url = rssConfig[req.query.site].rssUrl;
  axios
    .get(url)
    .then(response => {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(
        JSON.stringify(
          analysisXml({
            rssVersion: rssConfig[req.query.site].rssVersion,
            response: response
          })
        )
      );
    })
    .catch(error => {
      res.statusCode = 500;
      console.error(error.resposne);
    });
};

const analysisXml = ({ rssVersion, response }) => {
  const jsonObj = fastXmlParser.parse(response.data);
  let dataObj = { articles: [] };
  let items = null;
  if (rssVersion == "1.0") {
    // v1.0
    items = jsonObj["rdf:RDF"].item;
  } else if (rssVersion == "2.0") {
    // v2.0
    items = jsonObj.rss.channel.item;
  }
  for (let item of items) {
    let data = {
      title: item.title,
      pubDate: item.pubDate,
      link: item.link
    };
    dataObj.articles.push(data);
  }

  return dataObj;
};
