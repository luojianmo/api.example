"use strict";

global.Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');
const restDir = path.join(__dirname, 'lib', 'rest');
const PROT = 80;

let usingCluster = true;
if (usingCluster && cluster.isMaster) {
    console.log('[master] ' + "start master...");
    for (let i = 0; i < numCPUs; i++) {
        let worker_process = cluster.fork();
        // console.log('app',app);
        console.log('[master] ' + "start worker...");
    }
} else if (!usingCluster || cluster.isWorker) {
    console.log('[master] worker ', cluster.worker.id);
    const express = require('express');
    const app = express();
    const server = app.listen(8081, function () {
        let host = server.address().address
        let port = server.address().port
        console.log("应用实例，访问地址为 http://%s:%s", host, port);
    });
    return fs.readdirAsync(restDir).each(event => {
        require(path.join(restDir, event))(app);
        return Promise.resolve();
    }).catch(err => {
        console.log('初始化发生异常。', err);
    });
}