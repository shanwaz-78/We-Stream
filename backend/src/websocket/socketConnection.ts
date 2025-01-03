import { Server, Socket } from 'socket.io';

interface Users {
  [socketId: string]: string;
}

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

const createSocketConnection = (server: any): void => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const users: Users = {};
  let likes: number = 0



  io.on('connection', (socket: Socket) => {
    socket.on('new-user-joined', (userName: string) => {
      users[socket.id] = userName || 'guest';
      io.emit('active-users', Object.values(users).length);
    });

    socket.on('send', (message: string) => {
      const messageObject: Message = {
        username: users[socket.id] || 'Guest',
        message,
        timestamp: new Date().toISOString(),
      };

      console.log(messageObject);
      io.emit('receive', messageObject);
    });

    socket.on('setLikes', (num: number) => {
      likes = num
      io.emit('getLikes', likes)
    })

    socket.on('setStream', (data) => {
      console.log("streamdata", data)
      socket.broadcast.emit('getStream', data)
    })

    socket.on('disconnect', () => {
      const disconnectedUser = users[socket.id];

      if (disconnectedUser) {
        socket.broadcast.emit('disconnected-user', disconnectedUser);
        delete users[socket.id];
        io.emit('active-users', Object.values(users).length);
      }
    });
  });
};

export { createSocketConnection };
