import * as React from "react";
import * as ReactDOM from "react-dom";
import "./style.css";;

import {WeatherBar} from "./components/WeatherBar"

ReactDOM.render(
    <div>
        <WeatherBar />
    </div>,
    document.getElementById("root")
);