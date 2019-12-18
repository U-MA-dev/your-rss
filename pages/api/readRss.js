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
      res.end(JSON.stringify(analysisXml(response)));
    })
    .catch(error => {
      res.statusCode = 500;
      console.error(error.resposne);
    });
};

const analysisXml = response => {
  const jsonObj = fastXmlParser.parse(response.data);

  let dataObj = { articles: [] };
  for (let item of jsonObj.rss.channel.item) {
    let data = {
      title: item.title,
      pubDate: item.pubDate,
      link: item.link
    };
    dataObj.articles.push(data);
  }

  return dataObj;
};
