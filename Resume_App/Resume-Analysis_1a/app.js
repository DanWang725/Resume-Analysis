var express = require("express");
var path = require("path");
const formidable = require('formidable');
const fs = require('fs');
const pdf = require('pdf-parse');


var routes = require("./routes");

//requires the use of DCPModule
var dcp = require("./DCPModule");

var app = express();


app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
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

//handling user submission and recieving of files
app.post("/save", function(req, res){
  console.log("BEGIN /save");
  console.log(`req: ${JSON.stringify(req.body)}`);

  let fileData = fs.readFileSync(req.body.filepond);

  //parsing the pdf and extracting text
  pdf(fileData).then(function(data) {

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
    console.log(data.info);
    let fullResume = data.text;
    
    try {
        fs.writeFileSync('./tempText.txt', fullResume);
        //file written successfully
        } catch (err) {
        console.error(err)
    }
    var result = await Module.ccall(
            'locateWorkExperience',	// name of C function
            'number',	// return type
            ['string'],	// argument types
            ['tempText.txt']	// arguments
        );

});
})

//dcp.doWork();


