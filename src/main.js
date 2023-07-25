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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(bodyParser.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }))

app.use(async (req, res, next) => {
    let url = req.url;
    let method = req.method;
    if(method === 'OPTIONS') {
        next();
        return;
    }
    console.log(`Request URL: ${method} ${url}`);
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
app.use(express.static('public'));


app.use(router);

app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
})








