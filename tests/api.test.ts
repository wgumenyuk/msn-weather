import fs from "fs";
import path from "path";
import nock from "nock";
import weather from "../src";
import request from "../src/core/request";

const msnMock = nock("https://weather.service.msn.com/find.aspx");

const mockDataPath = path.join(__dirname, "./expected/mock.xml");
const mockData = fs.readFileSync(mockDataPath, "utf-8");

const url =
    "https://weather.service.msn.com/find.aspx?src=msn&" +
    "weadegreetype=C&" +
    "culture=en&" +
    `weasearchstr=${encodeURIComponent("München, DE")}`;

describe("msn-weather", () => {
    describe("msn-weather#search", () => {
        it("should be a function", (done: jest.DoneCallback) => {
            expect(typeof weather.search).toBe("function");
            done();
        });

        it("should not accept invalid options", async () => {            
            await expect(weather.search(null))
                .rejects
                .toThrow("Invalid options were specified");

            await expect(weather.search({ location: "" }))
                .rejects
                .toThrow("No location was given");

            await expect(weather.search({ location: "München, DE", language: "ABC" }))
                .rejects
                .toThrow("Invalid language code 'ABC', make sure it adheres to the ISO 639.1:2002 standard");

            // @ts-ignore
            await expect(weather.search({ location: "München, DE", degreeType: "K" }))
                .rejects
                .toThrow("Invalid degree type 'K'");
        });

        it("should fail when receiving a non-200 status code", async () => {
            msnMock
                .get("")
                .query({
                    src: "msn",
                    weadegreetype: "C",
                    culture: "en",
                    weasearchstr: "München, DE"
                })
                .reply(404);

            await expect(request(url))
                .rejects
                .toThrow("Request failed with status 404");
        });

        it("should fail when timing out after 5 seconds", async () => {
            msnMock
                .get("")
                .query({
                    src: "msn",
                    weadegreetype: "C",
                    culture: "en",
                    weasearchstr: "München, DE"
                })
                .delayConnection(5100)
                .reply(500);

            await expect(request(url))
                .rejects
                .toThrow("Request timed out after 5s");

            nock.abortPendingRequests();
        });

        it("should fail when a connection error occurs", async () => {
            msnMock
                .get("")
                .query({
                    src: "msn",
                    weadegreetype: "C",
                    culture: "en",
                    weasearchstr: "München, DE"
                })
                .replyWithError("ECONNRESET");

            await expect(request(url))
                .rejects
                .toThrow("ECONNRESET");
        });

        it("should fail if the response body can't be parsed", async () => {    
            msnMock
                .get("")
                .query({
                    src: "msn",
                    weadegreetype: "C",
                    culture: "en",
                    weasearchstr: "München, DE"
                })
                .reply(200);
            
            const options = {
                location: "München, DE"
            };

            await expect(weather.search(options))
                .rejects
                .toThrow("Bad response: Failed to parse response body");
        });

        it("should fail if the response body is incomplete", async () => {    
            msnMock
                .get("")
                .query({
                    src: "msn",
                    weadegreetype: "C",
                    culture: "en",
                    weasearchstr: "München, DE"
                })
                .reply(200,
                    `<weatherdata
                        xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                        <weather>
                            <current/>
                        </weather>
                    </weatherdata>`
                );
            
            const options = {
                location: "München, DE"
            };

            await expect(weather.search(options))
                .rejects
                .toThrow("Bad response: Failed to receive weather data");
        });

        it("should return correct weather data for a location", async () => {        
            msnMock
                .get("")
                .query({
                    src: "msn",
                    weadegreetype: "C",
                    culture: "en",
                    weasearchstr: "München, DE"
                })
                .reply(200, mockData);
            
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
    });
});
