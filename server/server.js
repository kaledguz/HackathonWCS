import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import { registerUser } from "./controllers/registerController.js"
import { registerInfo } from "./controllers/userController.js"
import { loginUser } from "./controllers/loginController.js"

const app = express()
const server = http.createServer(app)

app.use(
  cors({
    origin: "http://localhost:5173",
  })
)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", (socket) => {
  console.log("New client connected")

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

app.use(express.json())

app.post("/api/register", registerUser)
app.post("/api/register-info", registerInfo)
app.post("/api/login", loginUser)

server.listen(4000, () => console.log("Server running on port 4000"))
