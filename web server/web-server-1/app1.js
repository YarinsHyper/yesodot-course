//node app + localhost:3000
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.SERVER_PORT;
if (port === undefined) {
    port = package.port;
}

const server = http.createServer(function (req, res) {
    let isNumbersPrime = true;
    let newArray = [];
    let data = "";
    if (req.url === "/api/numbers/prime/validate" && req.method === "POST") {
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            for (let i = 1; i < data.length; i++) {
                let string = "";
                string += data[i];
                newArray.push(Number(data[i]));
                i++;
            }
            newArray.forEach((number) => {
                if (!isNumberPrime(number)) {
                    isNumbersPrime = false;
                }
            })
            res.write(String(isNumbersPrime))
            res.end();
        })
    }
    if (req.url === "/api/numbers/prime?amount=13" && req.method === "GET") {
        const paramsString = req.url.split('?')[1];
        const eachParamArray = paramsString.split('&');
        let params = {};
        eachParamArray.forEach((param) => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];
            Object.assign(params, { [key]: value });
        });
        const amount = params.amount;
        console.log("prime Numbers from [1-".concat(amount, "]: ", String(getAmountOfPrimes(amount))));
        res.write(String(getAmountOfPrimes((amount))));
        res.end();
    }
});

server.listen(port, function (err) {
    if (err) { console.log("something went wrong: ".concat(err)); }
    else { console.log("server is running at port: ".concat(port)); }
})

function isNumberPrime(num) {
    for (let numCheck = 2; numCheck < num; numCheck++) {
        if (num % numCheck === 0) return false
    }
    return num > 1;
}

function getAmountOfPrimes(parameter) {
    const primeNums = [];
    let startingNumber = 1;

    while (primeNums.length < parameter) {
        if (isNumberPrime(startingNumber)) { primeNums.push(startingNumber) }
        startingNumber++;
    }
    return primeNums;
}