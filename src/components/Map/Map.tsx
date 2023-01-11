import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// import "./style.css";

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function Map(props: any){
    return (
        <ComposableMap>
            <Geographies geography={geoUrl}>
                {(g: any) => {
                    console.log(g)
                    g.geographies.map((geo: any) => <Geography key={geo.rsmKey} geography={geo} />)

                }
                }
            </Geographies>
        </ComposableMap>
    );
}

