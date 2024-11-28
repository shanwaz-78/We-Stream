import { Server, Socket } from 'socket.io';

interface Users {
  [socketId: string]: string;
}

const createSocketConnection = (server: any): void => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const users: Users = {};

  io.on('connection', (socket: Socket) => {
    socket.on('new-user-joined', (userName: string) => {
      users[socket.id] = userName || 'guest';
      io.emit('active-users', Object.values(users).length);
    });

    socket.on('send', (message: string) => {
      socket.broadcast.emit('receive', {
        username: users[socket.id],
        message,
      });
    });

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
