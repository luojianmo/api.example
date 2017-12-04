'use strict';

exports = module.exports = () => {

    let db = require('./../driver/db')('postgres://username:password@127.0.0.1:5432/dbone');
    function ApiBusiness() {

    }
    /**
     * 
     * @param {string} useCaseId 
     * @param {string} devType 
     * @param {string} deviceId 
     */
    ApiBusiness.caseSave = function (useCaseId, devType, deviceId) {
        let sql = 'INSERT INTO table_one (use_case_id,dev_type,device_id) VALUES ($1,$2,$3) ON CONFLICT (device_id) DO UPDATE  SET frequency = table_one.frequency + 1;';
        return db.query(sql,[useCaseId, devType, deviceId]);
    }
    return ApiBusiness;
}

