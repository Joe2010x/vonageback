const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

require("dotenv").config()

app.use(cors())
app.use(express.json())

const OpenTok = require("opentok")
const { write } = require('fs')

//let current_session_id = ""
let current_session_id =
  "2_MX40NzQxMDU3MX5-MTY0MTQ5OTY5NDIyNn5HR1R2cW52TGtrV1RybEt5ZU8zWWtFNG5-fg"
const opentok = new OpenTok(process.env.VONAGE_KEY, process.env.VONAGE_SECRET)

const vp_group_List = require('./nameList.json')

app.get("/get_list/", (req, res) => {
  res.send(vp_group_List)
})

//console.log(nameList)

/* create a session id Transmit streams directly 
// create session ID
// streams directly between
// Media Router
// with a location hinter
// with an automatic archiving
*/

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

// achieve current session id
app.get("/currentsId/", (req, res) => {
  if (current_session_id === '' ) {
    res.send("no available session ID")
  }
  else {res.send(current_session_id)}
})

/* Generate token
// Generate a Token from just a sessionId (fetched from a database)

// Generate a Token from a session object (returned from createSession)

// Set some options in a Token
*/

// Generate token from an email the name list
app.get("/getToken/:email", (req,res) => {
  //check email validation
  const email = req.params.email
  //console.log(email)

  const person = vp_group_List.persons.find(item=>item.email === email) 

  //console.log(person)

  //check session id 
  if ((person) && (current_session_id !== "" )) {
    token = opentok.generateToken(current_session_id)
    res.send(token)
  } 
  else {
    res.status(404)
  }
  
})



app.get("/", (req, res) => {
  res.send("<h1>Hello! This is VONAGE-backend</H1>");
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
