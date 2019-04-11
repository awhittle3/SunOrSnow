import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.css";;

import { WeatherBar } from "./components/WeatherBar"

ReactDOM.render(
  <div>
    <WeatherBar url={"https://www.weather.gc.ca/rss/city/ab-71_e.xml"}/>
  </div>,
  document.getElementById("root")
);
