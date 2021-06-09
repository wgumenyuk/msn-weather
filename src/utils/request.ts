import http from "http";

function request(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
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

        req.on("timeout", () => {
            reject(new Error("Request timed out after 5s"));
        });

        req.on("error", (error) => {
            reject(error);
        });

        req.setTimeout(5000);
    });
}

export default request;