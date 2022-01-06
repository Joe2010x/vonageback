const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

require("dotenv").config()

app.use(cors())
app.use(express.json())

const OpenTok = require("opentok")
const { write } = require('fs')

let current_session_id = ""
const opentok = new OpenTok(process.env.VONAGE_KEY, process.env.VONAGE_SECRET)

const vp_group_List = require('./nameList.json')

//console.log(nameList)


// create a new session id
app.get("/createNysId/", (req, res) => {
  opentok.createSession(function (err, session) {
    if (err)
      return res.status(400).json({
        message: err,
      });
    current_session_id = session.sessionId
  });
  res.send(current_session_id)
})

app.get("/currentsId/", (req, res) => {
  if (current_session_id === '' ) {
    res.send("no available session ID")
  }
  else {res.send(current_session_id)}
})


/* create a session id Transmit streams directly 
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
