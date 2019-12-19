import React, { useState } from "react";
import Header from "./Header";
import Top from "./Top";
import DisplayRss from "./../contexts/display-rss";

function App() {
  const [selectedRsses, setSelectedRsses] = useState([
    "lifehacker",
    "huffingtonpost",
    "dailyportalz",
    "rocketnews",
    "digiday",
    "dqnplus"
  ]);

  return (
    <DisplayRss.Provider value={{ selectedRsses, setSelectedRsses }}>
      <Header />
      <Top />
    </DisplayRss.Provider>
  );
}

export default App;
