import React, { useContext, useEffect, useState } from "react";
import DisplayRss from "./../contexts/display-rss";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import axios from "axios";
import lodash from "lodash";
import Araticles from "./Articles";

const Top = () => {
  const rssHanlder = useContext(DisplayRss);
  const [rssDataObj, setRssDataObj] = useState(
    rssHanlder.selectedRsses.reduce((obj, rss) => {
      obj[rss] = [];
      return obj;
    }, {})
  );

  useEffect(() => {
    let rdo = rssHanlder.selectedRsses.reduce((obj, rss) => {
      obj[rss] = [];
      return obj;
    }, {});

    const url = location.protocol + "//" + location.host + "/api/readRss";
    rssHanlder.selectedRsses.map(rss => {
      const params = {
        site: rss
      };
      axios
        .get(url, { params: params })
        .then(response => {
          rdo[rss] = response.data.articles;
          setRssDataObj(lodash.cloneDeep(rdo));
        })
        .catch(error => {
          console.error(error.response);
        });
    });
  }, []);

  return (
    <>
      <Grid container className="body">
        {rssHanlder.selectedRsses.map((rss, idx) => {
          return (
            <Grid item xs={10} sm={6} md={4} lg={4} xl={3} key={idx}>
              <Box p={1} m={1} className="siteBox">
                <Araticles site={rss} rssDatas={rssDataObj[rss]}></Araticles>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <style>
        {`
          .body {
            display: flex;
            justify-content: center;
          }
          .siteBox {
            display: flex;
            justify-content: center;

            padding: 5px;
            margin: 5px;

            height: 600px;
            background-color: #e6e6fa;
          }
      `}
      </style>
    </>
  );
};

export default Top;
