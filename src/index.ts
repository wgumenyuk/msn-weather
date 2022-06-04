import x2js from "fast-xml-parser";
import { isDegreeType, isLanguageCode } from "./core/validators";
import request from "./core/request";
import textIDs from "./core/textIDs";

// #region Types and interfaces
type Degree = "C" | "F";

interface Options {
    location: string;
    language?: string;
    degreeType?: Degree;
}

interface Forecast {
    date: string;
    day: string;
    temperature: {
        low: string;
        high: string;
    };
    sky: {
        code: string;
        text: string;
    };
    precip: string;
}

interface Current {
    date: string;
    day: string;
    temperature: string;
    sky: {
        code: string;
        text: string;
    };
    observation: {
        time: string;
        point: string;
    };
    feelsLike: string;
    humidity: string;
    wind: {
        display: string;
        speed: string;
    };
}

interface Weather {
    current: Current;
    forecasts: Forecast[];
}
// #endregion

/**
    Retreives weather data for a given location.
    @param options              Options.
    @param options.location     The location you're looking for.
    @param options.language     The language in which text will be returned.
    @param options.degreeType   Degree type for temperature values.
    @returns Weather data.
*/
async function search(options: Options): Promise<Weather> {
    if(!options || typeof options !== "object") {
        throw new Error("Invalid options were specified");
    }
    
    if(!options.location) {
        throw new Error("No location was given");
    }

    const language = options.language || "en";
    const degreeType = options.degreeType || "C";

    if(!isLanguageCode(language)) {
        throw new Error(`
            Invalid language code '${language}', make sure it adheres to the ISO 639.1:2002 standard
        `);
    }

    if(!isDegreeType(degreeType)) {
        throw new Error(`Invalid degree type '${degreeType}'`);
    }

    const url =
        "https://weather.service.msn.com/find.aspx?src=msn&" +
        `weadegreetype=${degreeType}&` +
        `culture=${language}&` +
        `weasearchstr=${encodeURIComponent(options.location)}`;

    const response = await request(url);

    const json = x2js.parse(response, {
        attributeNamePrefix: "",
        ignoreAttributes: false,
        ignoreNameSpace: true,
        trimValues: true
    });

    if(!json || !json.weatherdata || !json.weatherdata.weather) {
        throw new Error("Bad response: Failed to parse response body");
    }

    const data = json.weatherdata.weather[0];

    if(!data) {
        throw new Error("Bad response: Failed to receive weather data");
    }

    const current = data.current;
    const forecasts = [];

    for(let i = 1; i < data.forecast.length; i++) { 
        const forecast = data.forecast[i];

        forecasts.push({
            date: forecast.date,
            day: forecast.day,
            temperature: {
                low: forecast.low[0] + `°${degreeType}`,
                high: forecast.high[0] + `°${degreeType}`,
            },
            sky: {
                code: textIDs[forecast.skycodeday[0]],
                text: forecast.skytextday[0]
            },
            precip: forecast.precip[0] + "%"
        });
    }

    const weather: Weather = {
        current: {
            date: current.date,
            day: current.day,
            temperature: current.temperature + `°${degreeType}`,
            sky: {
                code: textIDs[current.skycode],
                text: current.skytext
            },
            observation: {
                time: current.observationtime,
                point: current.observationpoint
            },
            feelsLike: current.feelslike + `°${degreeType}`,
            humidity: current.humidity + "%",
            wind: {
                display: current.winddisplay,
                speed: current.windspeed
            }
        },
        forecasts
    };

    return weather;
}

export default {
    search
};