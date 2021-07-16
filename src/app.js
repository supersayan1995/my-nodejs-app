const express = require('express');
const path = require('path');
const request = require('postman-request'); 

const apiKey = 'SVATWg4uEONtJv5jvYqvbyCrZv2loTtj';
const app = express();
const publicDirectory = path.join(__dirname, '../public');
console.log(publicDirectory);

app.set('view engine','hbs');

app.use(express.static(publicDirectory));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('',(request,response)=>
{
    response.render('index',
    {
        title:'weather application',
        name:'andrew mead'
    });
});

app.get('/sendJson',(request,response) =>
{
    const data = 
    [
        {
            name:"Abhishek",
            age:26,
            dataType: "json"
        },
        {
            name:"Aishwarya",
            age:23,
            dataType: "json"
        },
        {
            name:"Goku",
            age:50,
            dataType: "json"
        }
    ];

    response.send(data);
});

app.get('/weather',(req,res)=>
{
    if(!req.query.addressKey)
    {
        return res.send(
        {
            error:"You must provide an address key",
            errorCode:404
        });
    }
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${req.query.addressKey}?apikey=${apiKey}&details=true`;
    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            console.log("Could not connect to api");
            console.log(error.Error);
        }
        else
        {
            res.send(response.body[0]);
        }
    });
});

app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send(
        {
            error:"You must provide a search query"
        });
    }
    console.log(req.query);
    res.send(
    {
        products:[]
    });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000,()=>
{
    console.log("Server running on port 3000!");
});