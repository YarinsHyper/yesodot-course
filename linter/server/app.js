//node app + localhost:3000
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.SERVER_PORT;

const server = http.createServer(function (req, res) {
    let isNumbersPrime = true;
    let numbersCheck = [];
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
});

server.listen(port, function (err) {
    if (err) { console.log("something went wrong: " + err); }
    else { console.log("server is running at port: " + port); }
})

function isNumberPrime(num) {
    for (let numCheck = 2; numCheck < num; numCheck++) {
        if (num % numCheck === 0) return false
    }
    return num > 1;
}

function getAmountOfPrimes() {
    const primeNums = [];
    let numnber = 2;

    while (primeNums.length < startingNumber) {
        if (isNumberPrime(numnber)) { primeNums.push(number) }
        number++;
    }
    return primeNums;
}