const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request= require("request");
const https=require("https");
const e = require("express");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const listId="3b535abd15";
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  const url="https://us21.api.mailchimp.com/3.0/lists/"+listId;
  console.log(firstName,lastName,email);

  const options={
    method:"POST",
    auth:"thync:f69feb42f988c0c553da05d62e5c5553-us21"
  }
  var data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
};
var jsonData=JSON.stringify(data);

    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});
app.post("/failure",(req,res)=>{
  res.redirect("/");
})

app.listen(process.env.PORT||3000, () => {
  console.log("Server is running on port 3000");
});
