const express = require ("express")
const cors = require ("cors")
const app = express()
require("./config/Nodemaller") 

app.use(cors())
const auth = require ("./Router/auth")
const connectToDb = require ("./config/ConnectToDb")

app.use(express.json())

const dotenv = require ("dotenv")
dotenv.config()
const PORT = 4000
connectToDb()
app.listen(PORT,() =>{
    console.log('server running on port 4000');
    
})
//  ✅ 


app.use("/api/auth", auth)



// baseUrl:http://localhost:4000/