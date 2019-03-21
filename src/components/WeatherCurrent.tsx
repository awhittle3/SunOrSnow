import * as React from "react";

const initialState = {};
type WeatherCurrentState = Readonly<typeof initialState>;

export type WeatherCurrentProps = {
    temperature: number;
};

export class WeatherCurrent extends React.Component<WeatherCurrentProps, WeatherCurrentState> {
    render() {
        return <h1>
        {/* Hello from {props.compiler} and {props.framework}! */}
        <div className="card text-uagreen bg-uayellow mb-3" style={{maxHeight: 100, fontSize: 24}}>
            <div className="card-header" style={{padding: 5}}><b>Today</b></div>
            <div className="card-body" style={{paddingTop:10}}>
                {/* <div className="row"> */}
                    <div><h1 className="card-title" style={{fontSize: 28}}>{this.props.temperature}&deg;C</h1></div>
                    {/* <p className="card-text">{props.temperature}&deg;C</p> */}
                {/* </div> */}
            </div>
        </div>
    </h1>;
    }
}