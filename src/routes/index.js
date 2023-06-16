const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const controllerPath = path.resolve(__dirname, '../controller')

function getRouterFromDir(dir) {
    const controllerPath = path.resolve(__dirname, dir)
    const controllerFiles = fs.readdirSync(controllerPath)
    controllerFiles.forEach(file => {
        let rootRoute = file.replace('.js', '');
        let newPath = path.join(controllerPath, file);
        console.log(newPath);
        if (fs.statSync(newPath).isDirectory()) {
            getRouterFromDir(newPath);
        } else {
            let controller = require(path.resolve(controllerPath, file))
            for (let key in controller) {
                let [method, route] = key.split(' ');
                if (method === 'get') {
                    router.get(`/${rootRoute}${route}`, controller[key]);
                    console.log(`get:/${rootRoute}${route}`);
                } else if (method === 'post') {
                    router.post(`/${rootRoute}${route}`, controller[key]);
                    console.log(`post:/${rootRoute}${route}`);
                } else if (method === 'put') {
                    router.put(`/${rootRoute}${route}`, controller[key]);
                    console.log(`put:/${rootRoute}${route}`);
                } else if (method === 'delete') {
                    router.delete(`/${rootRoute}${route}`, controller[key]);
                    console.log(`delete:/${rootRoute}${route}`);
                }
            }
        }
    })
}


getRouterFromDir(controllerPath);

module.exports = router;