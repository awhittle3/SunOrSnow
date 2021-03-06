import * as React from "react";

const initialState = {};
type WeatherState = Readonly<typeof initialState>;

export type WeatherDayProps = {
  day: string;
  temperature: number;
  condition: string;
  emphasize: boolean;
};

export class WeatherDay extends React.Component<WeatherDayProps, WeatherState> {
  render() {
    let cardName: string = "card text-uayellow bg-uagreen mb-3";
    if (this.props.emphasize) {
      cardName = "card text-uagreen bg-uayellow mb-3";
    }
    return <h1>
      <div className={cardName} style={{ maxHeight: 114, fontSize: 32}}>
        <div className="card-header" style={{ padding: 5, textAlign: "center" }}><b>{this.props.day}</b></div>
        <div className="card-body" style={{ paddingTop: 10 }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-4" style={{ textAlign: "center" }}>
                <i className="material-icons" style={{ fontSize: 48 }}>{this.getWeatherIcon(this.props.condition)}</i>
              </div>
              <div className="col-sm-8">
                <h1 className="card-title" style={{ fontSize: 36 }}><b>{Math.round(this.props.temperature)}&deg;C</b></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </h1>;
  }

  getWeatherIcon(condition: string): string {
    let str:string = condition.toLowerCase();
    switch (str) {
      case "sunny":
      case "mainly sunny":
      case "clear":
      case "mainly clear":
      case "mostly clear":
      case "clearing":
        return "wb_sunny";
      case "cloudy":
      case "mist":
      case "cloudy periods":
      case "mainly cloudy":
      case "mostly cloudy":
        return "wb_cloudy";
      case "a mix of sun and cloud":
      case "clearing":
      case "a few clouds":
      case "partly cloudy":
        return "cloud_circle";
      case "chance of flurries":
      case "a few flurries":
      case "flurries":
      case "periods of light snow":
      case "light snow":
      case "chance of light snow":
      case "snow":
      case "chance of snow":
      case "periods of snow":
      case "snow at times heavy":
        return "ac_unit";
      case "periods of rain or freezing rain":
      case "periods of rain or snow":
      case "periods of snow or rain":
      case "rain or snow":
      case "snow or rain":
      case "chance of flurries or rain showers":
      case "rain or freezing rain":
      case "flurries or rain showers":
      case "periods of freezing drizzle":
      case "freezing rain":
      case "periods of rain":
      case "showers":
      case "chance of showers":
      case "light rainshower":
      case "snow or rain":
      case "rain":
      case "light rain":
        return "invert_colors";
      default:
        if(str.includes("snow") || str.includes("flurries")) {
          return "ac_unit";
        } else if (str.includes("rain") || str.includes("shower")){
          return "invert_colors";
        } else if(str.includes("cloud") || str.includes("mist") || str.includes("fog")) {
          return "cloud_circle";
        } else if (str.includes("sun") || str.includes("clear")){
          return "wb_sunny";
        }

        return "blur_on";
    }
  }
}    
