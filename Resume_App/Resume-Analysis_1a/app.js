var express = require("express");

var path = require("path");
const formidable = require('formidable');
const fs = require('fs');
const pdf = require('pdf-parse');
let Module = require('./resume');

const arr = [];
const filePath = path.join(__dirname, '/finalData.txt');
console.log(filePath);


var routes = require("./routes");

//requires the use of DCPModule
var dcp = require("./DCPModule");

 var app = express();

app.set("port", process.env.PORT || 3000);

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

//client connects to the website
app.listen(app.get("port"), function(){
      console.log("Server started on port " + app.get("port"));
}); 

//user selects a file to upload to the server
app.post("/upload", function(req, res){
  console.log("BEGIN /upload");
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if(err){
        next(err);
        return;
      }

    let theFile = files.filepond.filepath;
    console.log("theFile:" + theFile);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(theFile);
  });

})

app.use(express.urlencoded({ extended: true }));

function handleDownload(req) {
    let fileData = fs.readFileSync(req.filepond);
    let fullResume = "";
    pdf(fileData).then(function (data) {

         fullResume = data.text;
    });
    return fullResume;
}
// CHANGE THIS 
//handling user submission and recieving of files
app.post("/save", function(req, res){
  console.log("BEGIN /save");
    console.log(`req: ${JSON.stringify(req.body)}`);
    // console.log('req.length: %d', req.length);
    // console.log('req.length: %d', req.body);

    /* 
     * Okay, so it throws a mistake that handleDownload(req.body) is not the right type so not sure what to do,
    because not sure how to change the function so it's the right type (string, or instance of buffer, etc.), 
    filePath is created at the top and it is basically the .txt file where we write what we want, then next parameter is what we write 
    */
    fs.writeFile(filePath, handleDownload(req.body), function (err) {
        if (err) {
            return console.log(err);
        } else {
                console.log("File written successfully\n");
        }
    });

    /* NOT SURE ABOUT THIS FOR LOOP, I THINK IT NEVER EXECUTES
     for (let i = 0; i < req.length; i++) { //req.length = NaN???
     // arr.push(handleDownload(req[i].body)); 
        console.log('req.lengthHELLLLO: %d', req.length);
        // write it to a file
        fs.writeFile(finalData.txt, handleDownload(req[i].body), function (err) {
            if (err) return console.log(err);
        });
    } */
    //arr contains all the string data!!!!

  //let fileData = fs.readFileSync(req.body.filepond);

  //parsing the pdf and extracting text
  //pdf(fileData).then(function(data) {

    /* number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text*/
    //console.log(data.info);
    //let fullResume = data.text;
    
    /*try {
        fs.writeFileSync('./tempText.txt', fullResume);
        //file written successfully
        } catch (err) {
        console.error(err)
    }*/
    //var result = dcp.doWork('./tempText.txt');*/
    let output = Module.ccall('locateWorkExperience', 'number', ['string'], [filePath]); //'tempText.txt'
    console.log(output);
      
})


