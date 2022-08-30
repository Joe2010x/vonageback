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

let vp_group_List = {persons:[]}

app.post('/upload_group/',(req,res) => {
  const name_list = req.body
  console.log(name_list.persons[0])

  vp_group_List.persons=name_list.persons.concat()
  console.log(vp_group_List)
  res.status(200).json({done:"name list is uploaded."})
})

app.get("/get_list/", (req, res) => {
  res.send(vp_group_List)
})

app.get('/vonageKey', (req,res) => {
  res.send(process.env.VONAGE_KEY)
})

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

// Generate token from an email the name list
app.get("/getToken/:email", (req,res) => {
  //check email validation
  const email = req.params.email

  const person = vp_group_List.persons.find(item=>item.email === email) 

  //check session id 
  if ((person) && (current_session_id !== "" )) {
    token = opentok.generateToken(current_session_id)
    res.send([person.name,token])
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
