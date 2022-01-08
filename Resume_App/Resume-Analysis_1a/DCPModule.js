var express = require("express");
var dcp = express.Router();


 async function doWork(){
    const { init } = require('dcp-client');

    await init('https://scheduler.distributed.computer');
     const compute = require('dcp/compute');

     const job = compute.for([10000003, 23423425, 2342342, 345345235, 234235235, 2054234698678], task);
     job.computeGroups = [{ joinKey: 'hackathon', joinSecret: 'dcp2021' }];
     console.log("");
     const results = await job.exec();
     console.log(Array.from(results));
}

function task(datum) {
    //returns the square of the given number
    progress();
    let count = 0;
    for (let i = datum; i > 1; i/=2) {
        count++;
    }
    return count;
}


module.exports = {doWork};