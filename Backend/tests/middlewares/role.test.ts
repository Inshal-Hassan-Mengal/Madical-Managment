import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Response, NextFunction } from 'express';
import { requirePatientSelfOrRole, requireRole } from '../../src/presentation/middlewares/role.middleware';
import { AuthenticatedRequest } from '../../src/presentation/middlewares/auth.middleware';

describe('Role & Patient Access Control Middleware', () => {
  let mockRes: Partial<Response>;
  let mockNext: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('requirePatientSelfOrRole', () => {
    it('should allow admin, doctor, or nurse to access any patient data', async () => {
      const middleware = requirePatientSelfOrRole('patientId', 'doctor', 'nurse');

      const staffRoles = ['admin', 'doctor', 'nurse'];
      for (const role of staffRoles) {
        mockNext.mockClear();
        const req: Partial<AuthenticatedRequest> = {
          user: { userId: 'staff-1', role },
          params: { patientId: 'patient-999' },
        };

        await middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
      }
    });

    it('should allow patient to access their own records and force patientId from token', async () => {
      const middleware = requirePatientSelfOrRole('patientId');
      const req: Partial<AuthenticatedRequest> = {
        user: { userId: 'user-1', role: 'patient', linkedId: 'patient-123' },
        params: { patientId: 'patient-123' },
      };

      await middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(req.params!.patientId).toBe('patient-123');
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 403 when a patient tries to access another patient data', async () => {
      const middleware = requirePatientSelfOrRole('patientId');
      const req: Partial<AuthenticatedRequest> = {
        user: { userId: 'user-1', role: 'patient', linkedId: 'patient-123' },
        params: { patientId: 'other-patient-456' },
      };

      await middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Forbidden: Patients can only access their own data',
      });
    });

    it('should force patientId from token when URL params is empty or missing for a patient', async () => {
      const middleware = requirePatientSelfOrRole('patientId');
      const req: Partial<AuthenticatedRequest> = {
        user: { userId: 'user-1', role: 'patient', linkedId: 'patient-123' },
        params: {},
      };

      await middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(req.params!.patientId).toBe('patient-123');
    });

    it('should return 401 when request is not authenticated', async () => {
      const middleware = requirePatientSelfOrRole('patientId');
      const req: Partial<AuthenticatedRequest> = {
        params: { patientId: 'patient-123' },
      };

      await middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Unauthorized',
      });
    });
  });

  describe('requireRole', () => {
    it('should allow user with matching role', () => {
      const middleware = requireRole('admin', 'doctor');
      const req: Partial<AuthenticatedRequest> = {
        user: { userId: 'u1', role: 'doctor' },
      };

      middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should return 403 when user role is not authorized', () => {
      const middleware = requireRole('admin');
      const req: Partial<AuthenticatedRequest> = {
        user: { userId: 'u1', role: 'patient' },
      };

      middleware(req as AuthenticatedRequest, mockRes as Response, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });
});
