'use strict';

exports = module.exports = (app) => {
    let apiBusiness = require('./../business/apiBusiness')();
    /**
     * get请求测试
     */
    app.get('/api/get/test', (req, res) => {
        console.log("GET 请求");
        res.send('Hello GET');
        res.end();
    });
    /**
     * post请求测试
     */
    app.post('/api/post/test', (req, res) => {
        console.log("POST 请求");
        res.send('Hello POST');
        res.end();
    });
    /**
     * {
     *  useCaseId:'',
     *  devType:'',
     *  deviceId:''
     * }
     */
    app.post('/api/case/save', (req, res) => {
        let params = "";
        req.addListener("data", function (postchunk) {
            params += postchunk;
        });
        req.addListener("end", function () {
            if (params && isJsonString(params)) {
                let data = JSON.parse(params);
                if (!data || !data.useCaseId || typeof data.useCaseId !== 'string'
                    || !data.devType || typeof data.devType !== 'string'
                    || !data.deviceId || typeof data.deviceId !== 'string') {
                    res.writeHead(400, { "Content-Type": "application/json;charset=UTF8" });
                    return;
                }
                return apiBusiness.caseSave(data.useCaseId, data.devType, data.deviceId).then(() => {
                    res.writeHead(200, { "Content-Type": "application/json;charset=UTF8" });
                    res.end();
                }).catch(e => {
                    console.log(e);
                    res.writeHead(500, { "Content-Type": "application/json;charset=UTF8" });
                    res.write(JSON.stringify({ code: e }));
                    res.end();
                });
            } else {
                res.writeHead(400, { "Content-Type": "application/json;charset=UTF8" });
                res.write(JSON.stringify({ code: "请求信息或参数错误" }));
                res.end();
            }
        });
    });
}

let isJsonString = function (value) {
    return typeof value === 'string' && value.length >= 2 &&
        ((value[0] === '{' && value[value.length - 1] === '}') || (value[0] === '[' && value[value.length - 1] === ']'));
};