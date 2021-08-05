var express = require("express");
var bodyParser = require('body-parser');
var app = express();
const axios = require('axios')
require('dotenv').config();
const url = "https://api.tookanapp.com/v2/create_task"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome,Server is working Fine.........  " });

});
const port = process.env.PORT || 3000
require('./database/db_connection')
require("./routes/customer_route")(app);
require("./routes/merchant_route")(app);
require("./routes/booking_route")(app);


// const url = "https://reqres.in/api/users"

app.post('/post-test', (req, res) => {
    var data = JSON.stringify(req.body);
    var response;
    // console.log('data:', data);
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(resp => {
            // console.log(`statusCode: ${res.status}`)
            // console.log(res.data);
            response = resp.data
            console.log(response)
            res.send(response)
        })
        .catch(error => {
            console.error(error);
        })
})

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
});

