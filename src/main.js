const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const ResponseWrapper = require('./lib/ResponseWrapper');

const getEnv = require('./lib/getEnv');
const router = require('./routes');

const validateToken = require('./lib/validateToken');

getEnv(path.resolve(__dirname, '../env'));

const app = express();
let port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(async (req, res, next) => {
    let url = req.url;
    console.log(`Request URL: ${url}`);
    if (url === '/user/login' || url === '/user/register') {
        next();
    } else {
        let token = req.headers['authorization'];
        if (token) {
            console.log(`Token: ${token}`);
            let result = await validateToken(token);
            console.log(result);
            if (result.flag) {
                console.log('Token is valid');
                next();
            } else {
                res.status(401).send(ResponseWrapper.error(result.message));
            }
        } else {
            res.status(401).send(ResponseWrapper.error("token is required"));
        }
    }
})

app.use(router);

app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
})








