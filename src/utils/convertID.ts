function convertID(code: string): string {
    switch(code) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "17":
        case "35": {
            return "thunderstorm";
        }
        
        case "5": {
            return "rain_snow_mix";
        }

        case "6": {
            return "sleet_snow_mix";
        }

        case "7": {
            return "rain_snow_sleet_mix";
        }

        case "8":
        case "9": {
            return "icy";
        }

        case "10": {
            return "rain_sleet_mix";
        }

        case "11": {
            return "light_rain";
        }

        case "12": {
            return "rain";
        }

        case "13": {
            return "light_snow";
        }

        case "14":
        case "16":
        case "42":
        case "43": {
            return "snow";
        }

        case "15": {
            return "blizzard";
        }

        case "18":
        case "40": {
            return "rain_showers";
        }

        case "19": {
            return "dust";
        }

        case "20": {
            return "foggy";
        }

        case "21": {
            return "haze";
        }

        case "22": {
            return "smoke";
        }

        case "23":
        case "24": {
            return "windy";
        }

        case "25": {
            return "frigid";
        }

        case "26": {
            return "cloudy";
        }

        case "27":
        case "29":
        case "33": {
            return "mostly_cloudy_night";
        }

        case "28":
        case "30":
        case "34": {
            return "mostly_cloudy";
        }

        case "31": {
            return "clear_night";
        }

        case "32": {
            return "clear";
        }

        case "36": {
            return "hot";
        }

        case "37":
        case "38": {
            return "scattered_thunderstorms";
        }

        case "39": {
            return "scattered_rain_showers";
        }

        case "41": {
            return "scattered_snow_showers";
        }

        case "45": {
            return "scattered_rain_showers_night";
        }

        case "46": {
            return "scattered_snow_showers_night";
        }

        case "47": {
            return "scattered_thunderstorms_night";
        }

        default: {
            return "N/A";
        }
    }
}

export default convertID;