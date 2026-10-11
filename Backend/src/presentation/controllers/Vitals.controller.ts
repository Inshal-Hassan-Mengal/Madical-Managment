import { Request, Response, NextFunction } from 'express';
import { VitalsApplicationService } from '../../application/vitals/VitalsApplicationService';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { UserModel } from '../../infrastructure/database/schemas/User.schema';
import { notificationService } from '../../infrastructure/notifications/socket';
import { AppError } from '../../domain/errors/AppError';

export class VitalsController {
  constructor(private readonly vitalsService: VitalsApplicationService) {}

  public recordVitals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user?.userId;
      const user = userId ? await UserModel.findById(userId) : null;
      if (!user || !['admin', 'doctor', 'nurse'].includes(user.role)) {
        throw new AppError(403, 'Only Doctor, Nurse, or Admin can record vitals');
      }

      const {
        patientId,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        sugarLevel,
        temperature,
        heartRate,
        pulseRate,
        rbcCount,
        wbcCount,
      } = req.body;

      const analysisResult = await this.vitalsService.recordVitals({
        patientId,
        bloodPressureSystolic: Number(bloodPressureSystolic),
        bloodPressureDiastolic: Number(bloodPressureDiastolic),
        sugarLevel: Number(sugarLevel),
        temperature: Number(temperature),
        heartRate: Number(heartRate),
        pulseRate: Number(pulseRate),
        rbcCount: Number(rbcCount),
        wbcCount: Number(wbcCount),
      });

      // Emit real-time critical vitals event to doctor and admin rooms if status is critical
      if (analysisResult.status === 'critical') {
        notificationService.emitCriticalVitals({
          patientId,
          status: analysisResult.status,
          flaggedParams: analysisResult.flaggedParams,
          message: analysisResult.message,
          summary: analysisResult.message,
          analysis: analysisResult,
          recordedAt: new Date(),
        });
      }

      res.status(201).json({
        success: true,
        message: 'Vitals recorded and analyzed successfully',
        analysis: analysisResult,
      });
    } catch (error) {
      next(error);
    }
  };

  public getVitalsByPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let patientId = String(req.params.patientId);
      const userId = (req as AuthenticatedRequest).user?.userId;
      const user = userId ? await UserModel.findById(userId) : null;
      if (!user) {
        throw new AppError(401, 'Unauthorized');
      }

      if (user.role === 'patient') {
        if (!user.linkedId || (patientId && user.linkedId !== patientId)) {
          throw new AppError(403, 'Forbidden: Patients can only access their own data');
        }
        patientId = user.linkedId;
        req.params.patientId = user.linkedId;
      }
      if (!['patient', 'doctor', 'nurse', 'admin'].includes(user.role)) {
        throw new AppError(403, 'Forbidden');
      }

      const vitalsList = await this.vitalsService.getVitalsByPatient(patientId);

      const data = vitalsList.map((v) => ({
        vitalsId: v.vitalsId,
        patientId: v.patientId,
        bloodPressureSystolic: v.bloodPressureSystolic,
        bloodPressureDiastolic: v.bloodPressureDiastolic,
        sugarLevel: v.sugarLevel,
        temperature: v.temperature,
        heartRate: v.heartRate,
        pulseRate: v.pulseRate,
        rbcCount: v.rbcCount,
        wbcCount: v.wbcCount,
        recordedAt: v.recordedAt,
        analysis: v.analysisResult,
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
