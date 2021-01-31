const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.set('view engine', 'pug');

if (port === undefined) {
  port = package.port;
}

app.get("/api/numbers/prime?amount=13", (req, res) => {
  let amount = req.params.id === 'amount';
  console.log("prime Numbers from [1-".concat(amount, "]: ", String(getAmountOfPrimes(amount))));
  res.write(String(getAmountOfPrimes((amount))));
  res.end();
})

app.post("/api/numbers/prime/validate", (req, res) => {
  let primeBool = true;
  for (let bodyIndex = 0; bodyIndex < req.body.length; bodyIndex++) {
    if (!isNumberPrime(req.body[bodyIndex])) { primeBool = false }
  }
  console.log(String(primeBool));
  res.write(String(primeBool));
  res.end();
  console.log(req.body);
})

// app.get('/api/numbers/prime/display', function (req, res) {
//   res.render('index', { title: 'Prime-Numbers', message: 'Prime-Numbers:',number:2 });
//   console.log(String("\n".concat(getAmountOfPrimes(10))));
// })

app.get("/api/numbers/prime/display", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<div id='container'>");
  getAmountOfPrimes(10).forEach((number) => {
    res.write("<div id='number'>".concat(number, "</div>"));
  })
  res.write("</div>");
  res.end();
  console.log(String("\n".concat(getAmountOfPrimes(10))));
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

function isNumberPrime(num) {
  for (let numCheck = 2; numCheck < num; numCheck++) {
    if (num % numCheck === 0) return false
  }
  return num > 1;
}

function getAmountOfPrimes(amount) {
  const primeNums = [];
  let startingNumber = 1;

  while (primeNums.length < amount) {
    if (isNumberPrime(startingNumber)) { primeNums.push(startingNumber) }
    startingNumber++;
  }
  return primeNums;
}