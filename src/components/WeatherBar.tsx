import * as React from "react";
import update from 'immutability-helper';
import { parseString } from "xml2js";

import { WeatherDay } from "./WeatherDay";

const initialState = {
  dayState: [
    {
      dayName: "",
      temperature: 0.0,
      condition: "",
    }
  ],
  currentState: { temperature: 0.0, condition: "" }
};
type WeatherBarState = Readonly<typeof initialState>;
type WeatherBarProps = {
  url: string,
};

export class WeatherBar extends React.Component<WeatherBarProps, WeatherBarState> {

  intervalId: number | null = null;

  constructor(props: WeatherBarProps) {
    super(props);
    this.state = {
      dayState: [
        {
          dayName: "-",
          temperature: 0.0,
          condition: ""
        },
        {
          dayName: "-",
          temperature: 0.0,
          condition: ""
        },
        {
          dayName: "-",
          temperature: 0.0,
          condition: ""
        },
        {
          dayName: "-",
          temperature: 0.0,
          condition: ""
        },
      ], currentState: { temperature: 0.0, condition: "" }
    };
  }

  render() {
    const containerStyle: React.CSSProperties = {
      maxWidth: "3000px"
    };

    return <div className="container" style={containerStyle}>
      <div className="row align-items-end" >
        <div className="col-xs-3 align-self-start" key={-1}>
          <WeatherDay
            day="Today"
            temperature={this.state.currentState.temperature}
            condition={this.state.currentState.condition}
            emphasize={true} />
        </div>
        {this.makeRow()}
      </div>
    </div>;
  }

  makeRow() {
    let index: number = 0;
    return this.state.dayState.map((day) => {
      return <div className="col-xs-3 align-self-start" key={index++}>
        <WeatherDay
          day={day.dayName}
          temperature={day.temperature}
          condition={day.condition}
          emphasize={false}
        />
      </div>
    });
  }

  componentDidMount() {
    this.fetchAndUpdateState();
    setInterval(() => { this.fetchAndUpdateState(); }, 1000 * 60 * 30);
  }

  fetchAndUpdateState() {
    let url: URL = new URL(this.props.url);
    // console.log("Fetching...");
    fetch(url.toString(), {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        "accept": "text/html,application/xhtml+xml",
        'Content-Type': 'application/xhtml+xml,application/xml',
      },
      cache: 'no-cache',
      mode: "cors"
    }).then((response) => {

      return response.text().then((data) => {

        parseString(data, (err, result) => {
          console.dir(result);
          if (result.feed != null && result.feed.entry != null) {
            let numDays: number = 0;
            for (let i: number = 0; i < result.feed.entry.length && numDays < this.state.dayState.length; i++) {
              let parts: string[] = result.feed.entry[i].title[0].split(":");
              if (['Current Conditions', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(parts[0]) >= 0) {
                // console.log("Adding " + parts[0]);
                let weekday = parts[0];
                let temp: number = 0;
                let condStr: string = "";
                if (weekday === 'Current Conditions') {
                  let tempStr = parts[1].split(",");
                  temp = parseFloat(tempStr[tempStr.length - 1]);
                  condStr = tempStr[0].trim();
                  let newCurrentState = update(this.state.currentState, { $set: { dayName: weekday, temperature: temp, condition: condStr } });
                  this.setState({ currentState: newCurrentState })
                } else {
                  if (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(weekday) !== (new Date()).getDay()) {
                    let cond = parts[1].split(".");
                    condStr = cond[0].trim();
                    let tempStr = cond[1].split(" ");
                    temp = parseFloat(tempStr[tempStr.length - 1]);
                    if (tempStr.indexOf("minus") >= 0) {
                      temp *= -1.0;
                    }
                    if (tempStr.indexOf("zero") >= 0) {
                      temp = 0.0;
                    }
                    let newDayState = update(this.state.dayState, { [numDays]: { $set: { dayName: weekday, temperature: temp, condition: condStr } } });
                    this.setState({ dayState: newDayState });

                    numDays++;
                  }
                }

              }
            }
          }

        });
      });
    });
  }

}
