import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fetchAllUsers, fetchUserById, addUser, modifyUser, removeUser } from './controllers/userController.js';

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173'}));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'}
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


app.get('/users', fetchAllUsers);
app.get('/users/:id', fetchUserById);
app.post('/users', addUser);
app.put('/users/:id', modifyUser);
app.delete('/users/:id', removeUser);

server.listen(4000, () => console.log('Server running on port 4000'));
