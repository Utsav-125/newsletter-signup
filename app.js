const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
        ]
    };

    const jsondata=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/44f01b3307"

    const options={
        method:"POST",
        auth:"utsav5:02b8596aa334cc11fcc73acb1b56a03d-us14"
    };

   const request= https.request(url,options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
         response.on("data", function(data){
             console.log(JSON.parse(data));
         })
    })
    request.write(jsondata);
    request.end();

});
app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server is running on port 3000")
})

