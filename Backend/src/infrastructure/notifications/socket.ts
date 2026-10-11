import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { env } from '../config/env';

let io: SocketIOServer | null = null;

export interface CriticalVitalsNotification {
  patientId: string;
  status: string;
  flaggedParams?: string[];
  message?: string;
  summary: string;
  analysis?: any;
  recordedAt?: Date | string;
}

/**
 * Initializes Socket.io with the HTTP server and shared CORS settings.
 */
export const initSocket = (
  httpServer: HttpServer,
  allowedOrigins: string[] = []
): SocketIOServer => {
  const originsSet = new Set(allowedOrigins.filter(Boolean));

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: (origin, callback) => {
        const isLocalDevelopment =
          env.isDevelopment &&
          typeof origin === 'string' &&
          /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

        if (!origin || originsSet.has(origin) || isLocalDevelopment) {
          callback(null, true);
          return;
        }

        callback(new Error('Origin is not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    // Join user-specific private room
    socket.on('join', (userId: string) => {
      if (userId) {
        socket.join(userId);
      }
    });

    // Join role-based room (e.g. "doctor", "admin")
    socket.on('join-role', (role: string) => {
      if (role) {
        const normalizedRole = role.toLowerCase().trim();
        socket.join(normalizedRole);
      }
    });

    // Generic room join handler
    socket.on('join-room', (room: string) => {
      if (room) {
        socket.join(room);
      }
    });
  });

  return io;
};

/**
 * Returns the active Socket.io instance.
 */
export const getIO = (): SocketIOServer | null => {
  return io;
};

/**
 * Notification service for real-time alerting.
 */
export const notificationService = {
  /**
   * Emits "critical-vitals" event to doctor and admin rooms.
   */
  emitCriticalVitals: (payload: CriticalVitalsNotification): void => {
    if (!io) {
      console.warn('⚠️ [Socket.io] Cannot emit critical-vitals: Socket.io has not been initialized.');
      return;
    }

    const eventPayload = {
      ...payload,
      summary: payload.summary || payload.message || 'Critical vitals detected',
      recordedAt: payload.recordedAt || new Date().toISOString(),
    };

    // Emit to doctor and admin rooms
    io.to('doctor')
      .to('doctors')
      .to('admin')
      .to('admins')
      .emit('critical-vitals', eventPayload);
  },

  /**
   * Sends an alert notification to a specific user.
   */
  sendAlertToUser: (userId: string, message: string): void => {
    if (!io) {
      console.warn('⚠️ [Socket.io] Cannot send alert: Socket.io has not been initialized.');
      return;
    }
    io.to(userId).emit('notification', message);
  },
};
