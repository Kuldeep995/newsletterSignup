const express = require("express");
const app= express();
const request = require("request");
const bodyParser = require("body-parser");
const https=require("https");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.get("/", function(req, res){

   res.sendFile(__dirname +"/index.html");

})

app.post("/", function(req, res){

  console.log(req.body.fname);
 const fn=req.body.fname;
 const ln=req.body.lname;
 const emai=req.body.email;

 var data= {
  members: [
    {
      email_address: emai,
      status: "subscribed",
      merge_fields:{
        FNAME: fn,
        LNAME: ln
      }

    }
  ]
}

const jsonData = JSON.stringify(data);



const url="https://us7.api.mailchimp.com/3.0/lists/8eb7f7eb73";

const option= {

method: "POST",

auth: "" //(My API KEY)

}
const request=https.request(url, option, function(response){

if(response.statusCode===200)
{
  res.sendFile(__dirname + "/success.html");

}
else
{
  res.sendFile(__dirname + "/failure.html");
}
response.on("data", function(data){

  console.log(JSON.parse(data));
})



})

request.write(jsonData);
request.end();

})

app.post("/failure", function(req, res){

  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("listening");

})


//4ab9fe746bc2a9d8b45b8d86e1a8
//8eb7f7eb73
