import https from "https";

/**
    Sends a request using the native `https` library.
    @param url The target URL.
    @returns HTTPS response body.
*/
function request(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            let data = "";

            if(res.statusCode !== 200) {
                reject(new Error(`Request failed with status ${res.statusCode}`));
            }
    
            res.on("data", (chunk: string) => {
                data += chunk;
            });
    
            res.on("end", () => {
                resolve(data);
            });
        });

        req.setTimeout(5000);

        req.on("timeout", () => {
            reject(new Error("Request timed out after 5s"));
        });

        req.on("error", (error) => {
            reject(error);
        });
    });
}

export default request;