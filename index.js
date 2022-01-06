const http = require('http')
const express = require('express')
const app = express()

require("dotenv").config()


const OpenTok = require("opentok")
const { write } = require('fs')
const opentok = new OpenTok(process.env.VONAGE_KEY, process.env.VONAGE_SECRET)

const nameList = require('./nameList.json')

console.log(nameList)
//console.log(process.env.VONAGE_KEY);
//console.log(process.env.VONAGE_SECRET);

/* create a session id Transmit streams directly 
opentok.createSession(function (err, session) {
  if (err) return console.log(err);

  // save the sessionId
  //db.save("session", session.sessionId, done);
  console.log(session.sessionId)
});
// create session ID
// streams directly between
// Media Router
// with a location hinter
// with an automatic archiving
*/



app.get("/", (req, res) => {
  res.send("<h1>Hello! This is VONAGE-backend</H1>");
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
