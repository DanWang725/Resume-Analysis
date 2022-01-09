var express = require("express");
var dcp = express.Router();


function doWork(array) {
    const { init } = require('dcp-client');
    initialize();

    const compute = require('dcp/compute');

    const job = compute.for(array, task);
    job.computeGroups = [{ joinKey: 'hackathon', joinSecret: 'dcp2021' }];
    job.requires('htj-dragoncats/resume.js');
    //assigns jobs and awaits the results
    executeWork();

    console.log(Array.from(results));
}

async function initialize() {
    await init('https://scheduler.distributed.computer');
}
async function executeWork() {
    const results = await job.exec();
}
     

function task(datum) {
    //returns the square of the given number
    progress();
    return datum.length;
}


module.exports = {doWork};