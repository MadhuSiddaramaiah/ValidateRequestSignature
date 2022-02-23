const twilio = require('twilio');
const app = require('express')();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()) // using jsonParser to parse out application/json content-type

// for application/json we use validateRequestWithBody()
// for x-www-form-urlencoded we use validateRequest()

const authToken = 'AuthToken';

app.post('/voice', (req, res) => {
 const signature = req.headers['x-twilio-signature'];
 console.log(`Twilio Signature is ${signature}`)

 const twilioSignature = req.headers['x-twilio-signature'];
 const params = req.body;
 console.log(`Body is: ${JSON.stringify(params)}`)
 const url = `https://b3ee-49-205-138-119.ngrok.io${req.originalUrl}`
 console.log(`Full URL is ${url}`);

 const requestIsValid = twilio.validateRequest(authToken, twilioSignature, url, params);

 if (!requestIsValid) {
 console.log("Error!")
 return res.send("<Response><Message>Error!</Message></Response>");
    }
 console.log("Signatures match - Authorized")
 res.send("<Response><Message>Okay!</Message></Response>");
});


app.listen(port, () => {
 console.info(`Server now running on Port ${port}`)
})
