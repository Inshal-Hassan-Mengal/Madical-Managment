import { Request, Response, NextFunction } from 'express';
import { PatientApplicationService } from '../../application/patient/PatientApplicationService';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { UserModel } from '../../infrastructure/database/schemas/User.schema';
import { AppError } from '../../domain/errors/AppError';

export class PatientController {
  constructor(private readonly patientService: PatientApplicationService) {}

  public createPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { firstName, lastName, email, phone, dateOfBirth } = req.body;

      const patientId = await this.patientService.createPatient({
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
      });

      await UserModel.findOneAndUpdate(
        { email: email.trim().toLowerCase(), role: 'patient' },
        { linkedId: patientId }
      );

      res.status(201).json({
        success: true,
        message: 'Patient created successfully',
        patientId,
      });
    } catch (error) {
      next(error);
    }
  };

  public getMyPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user?.userId;
      const user = userId ? await UserModel.findById(userId) : null;

      if (!user || user.role !== 'patient') {
        throw new AppError(403, 'Forbidden');
      }
      if (!user.linkedId) {
        throw new AppError(404, 'No patient profile is linked to your account.');
      }

      const patient = await this.patientService.getPatient(user.linkedId);
      res.status(200).json({
        success: true,
        data: {
          patientId: patient.patientId.getValue(),
          firstName: patient.firstName,
          lastName: patient.lastName,
          fullName: patient.fullName,
          email: patient.email.getValue(),
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as AuthenticatedRequest).user;
      let patientId = String(req.params.patientId);

      if (user?.role === 'patient') {
        let patientLinkedId = user.linkedId;
        if (!patientLinkedId && user.userId) {
          const u = await UserModel.findById(user.userId);
          patientLinkedId = u?.linkedId;
        }
        if (!patientLinkedId || (patientId && patientId !== patientLinkedId)) {
          throw new AppError(403, 'Forbidden: Patients can only access their own data');
        }
        if (patientLinkedId) {
          patientId = patientLinkedId;
          req.params.patientId = patientLinkedId;
        }
      }

      const patient = await this.patientService.getPatient(patientId);

      res.status(200).json({
        success: true,
        data: {
          patientId: patient.patientId.getValue(),
          firstName: patient.firstName,
          lastName: patient.lastName,
          fullName: patient.fullName,
          email: patient.email.getValue(),
          phone: patient.phone,
          dateOfBirth: patient.dateOfBirth,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllPatients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patients = await this.patientService.getAllPatients();

      const data = patients.map((patient) => ({
        patientId: patient.patientId.getValue(),
        firstName: patient.firstName,
        lastName: patient.lastName,
        fullName: patient.fullName,
        email: patient.email.getValue(),
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
      }));

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
