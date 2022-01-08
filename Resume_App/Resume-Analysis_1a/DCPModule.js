var express = require("express");
var dcp = express.Router();


dcp.get("/connect", async function() {
    var init = require('dcp-client');
    await init('https://scheduler.distributed.computer');
    var compute = require('dcp/compute');
});

function testWork(datum) {
    //returns the square of the given number
    progress();
    return datum * datum;
}

dcp.get("/conpute", async function () {
    var job = compte.for([1, 2, 3, 4, 5], testWork);
    const results = await job.exec();
    console.log(results);
});

module.exports = dcp