const express = require('express');
const mongodb = require('./database/database');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const {auth} = require('express-openid-connect')
const app = express();

//******************Midlewards ******************************/

//********************* ********************************** */
//** Cors configuration to allow authorization with Auth0 */
//****************************************************** */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//********************* ********************************** */
//** Cors configuration to allow authorization with Auth0 */
//****************************************************** */
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-key', 'Authorization']
  }));

//********************* ********************************** */
//** Auth0 configuration********************************* */
//****************************************************** */  
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));
  // req.isAuthenticated is provided from the auth router
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });


//********************* ********************************** */
//** connect with localhost 3000********************************* */
//****************************************************** */  
const port = process.env.PORT || 3000;
mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    }else {
        app.listen(port, () => {console.log(`Database is listening and node is Running on port ${port}`)})
    }
})

