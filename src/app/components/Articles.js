import React from "react";
import rssCongig from "./../env/rss-config";

const ArticleCard = ({ title, link, pubDate }) => {
  return (
    <>
      <div className="card">
        <a href={link} target="_blank">
          <button className="articleButton">{title}</button>
        </a>
      </div>
      <style>{`
        .card{
          width: 100%;
          height: 98px;

          margin-top: 5px;
          background-color: #e9dfe5;
        }
        a {
          display: inline-box;

          text-decoration: none;
        }
        .articleButton {
          width: 100%;
          height: 100%;

          font-size: 18px;
          overflow: hidden;

          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          }
        `}</style>
    </>
  );
};

const Articles = ({ site, rssDatas }) => {
  return (
    <>
      <div className="rssBox">
        <div className="siteInfo">
          <a href={rssCongig[site].topUrl} target="_blank">
            {rssCongig[site].displayName}
          </a>
        </div>
        <div className="articleBox">
          {rssDatas.map((rssData, idx) => {
            return (
              <ArticleCard
                key={idx}
                title={rssData.title}
                link={rssData.link}
                pubDate={rssData.pubDate}
              ></ArticleCard>
            );
          })}
        </div>
      </div>
      <style>
        {`
        .rssBox{
          position: relative;
          width: 100%;
          height: 100%

          padding: 5px;
          margin: 5px;
        }
        .siteInfo{
          display: flex;
          align-items: center;

          margin: 5px;
          padding: 5px;

          height: 40px;

          font-size: 25px;
        }
        .articleBox{
          height: 530px;
          overflow: auto;
        }
      `}
      </style>
    </>
  );
};

export default Articles;
