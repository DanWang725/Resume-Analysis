var express = require("express");
var dcp = express.Router();


async function doWork() {
    const { init } = require('dcp-client');
    await init('https://scheduler.distributed.computer');

    const compute = require('dcp/compute');
    const job = compute.for(createWork(), task);
    job.computeGroups = [{ joinKey: 'hackathon', joinSecret: 'dcp2021' }];
    console.log("we made it this far");
    //job.requires('htj-dragoncats/resume.js');

    const results = await job.exec();
    console.log("awaiting results...")
    console.log(Array.from(results));
}

function createWork() {
    var arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push(i);
    }

    for (let i = 0; i < 100; i++) {
        arr[i] = Math.floor(Math.random() * 1000000000) + 1000000001;
        console.log("Random: " + arr[i]);
    }

    return arr;
}
     

function task(datum) {
    //returns the square of the given number
    progress();
    let times = 0;
    while (datum > 1) {
        if (datum % 2 == 0) {
            datum /= 2;
        } else {
            datum = datum * 3 + 1;
        }
        times++;
    }
    if (datum == 1) {
        return times;
    }
}


module.exports = {doWork};