var express = require("express");
var path = require("path");

var routes = require("./routes");

var app = express();


app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);

app.listen(app.get("port"), function(){
      console.log("Server started on port " + app.get("port"));
});

app.post("/upload", function(req, res){
  console.log("BEGIN /upload");
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if(err){
        next(err);
        return;
    }
    let theFile = files.filepond.path;
    console.log("theFile:" + theFile);
    res.end(theFile);
  });
})