import weather from "../src";

describe("msn-weather", () => {
    describe("msn-weather#search", () => {
        it("should return correct weather data for a location", async () => {    
            const data = await weather.search({
                location: "München, DE"
            });

            expect(data).toHaveProperty("current");
            expect(data).toHaveProperty("forecasts");

            expect(data.current).toHaveProperty("date");
            expect(data.current).toHaveProperty("day");
            expect(data.current).toHaveProperty("temperature");
            expect(data.current).toHaveProperty("sky");
            expect(data.current.sky).toHaveProperty("code");
            expect(data.current.sky).toHaveProperty("text");
            expect(data.current).toHaveProperty("observation");
            expect(data.current.observation).toHaveProperty("time");
            expect(data.current.observation).toHaveProperty("point");
            expect(data.current).toHaveProperty("feelsLike");
            expect(data.current).toHaveProperty("humidity");
            expect(data.current).toHaveProperty("wind");
            expect(data.current.wind).toHaveProperty("display");
            expect(data.current.wind).toHaveProperty("speed");

            expect(Array.isArray(data.forecasts)).toBeTruthy();
            
            expect(data.forecasts[0]).toHaveProperty("date");
            expect(data.forecasts[0]).toHaveProperty("day");
            expect(data.forecasts[0]).toHaveProperty("temperature");
            expect(data.forecasts[0].temperature).toHaveProperty("low");
            expect(data.forecasts[0].temperature).toHaveProperty("high");
            expect(data.forecasts[0]).toHaveProperty("sky");
            expect(data.forecasts[0].sky).toHaveProperty("code");
            expect(data.forecasts[0].sky).toHaveProperty("text");
            expect(data.forecasts[0]).toHaveProperty("precip");
        });

        it("should not accept invalid options", async () => {            
            await expect(weather.search(null))
                .rejects
                .toThrow("Invalid options were specified");
        });

        it("should not accept bad locations", async () => {
            const options = {
                location: ""
            };
            
            await expect(weather.search(options))
                .rejects
                .toThrow("No location was given");
        });
    });
});