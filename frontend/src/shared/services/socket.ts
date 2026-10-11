import { io, Socket } from 'socket.io-client';

const resolveSocketUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/api\/?$/, '');
  }
  return 'http://localhost:5000';
};

export const socket: Socket = io(resolveSocketUrl(), {
  autoConnect: true,
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

export default socket;
