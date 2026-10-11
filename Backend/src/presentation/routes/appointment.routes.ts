import { Router } from 'express';
import { AppointmentRepository } from '../../infrastructure/database/repositories/AppointmentRepository';
import { AppointmentApplicationService } from '../../application/appointment/AppointmentApplicationService';
import { AppointmentController } from '../controllers/Appointment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole, requirePatientSelfOrRole } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { bookAppointmentSchema } from '../schemas';

const appointmentRouter = Router();

// Protect appointment routes with auth middleware
appointmentRouter.use(authMiddleware as any);

// Dependency Injection
const appointmentRepository = new AppointmentRepository();
const appointmentService = new AppointmentApplicationService(appointmentRepository);
const appointmentController = new AppointmentController(appointmentService);

// Route definitions
// Staff can view all appointments
appointmentRouter.get('/', requireRole('admin', 'doctor', 'nurse'), appointmentController.getAllAppointments);

// Patients (for self) and staff can book appointments
appointmentRouter.post('/', requireRole('admin', 'doctor', 'nurse', 'patient'), validate(bookAppointmentSchema), appointmentController.bookAppointment);

// Single appointment lookup
appointmentRouter.get('/:appointmentId', requireRole('admin', 'doctor', 'nurse', 'patient'), appointmentController.getAppointment);

// Cancellation allowed for patient (own), doctor (own), and admin
// No body validation needed — appointmentId comes from URL param
appointmentRouter.put('/:appointmentId/cancel', requireRole('admin', 'doctor', 'patient'), appointmentController.cancelAppointment);

// Appointments by patient: Patients can only view their own; staff have access
appointmentRouter.get(
  '/patient/:patientId',
  requireRole('admin', 'doctor', 'nurse', 'patient'),
  requirePatientSelfOrRole('patientId', 'doctor', 'nurse'),
  appointmentController.getAppointmentsByPatient
);

// Appointments by doctor: Doctor, Nurse, Admin
appointmentRouter.get('/doctor/:doctorId', requireRole('admin', 'doctor', 'nurse'), appointmentController.getAppointmentsByDoctor);

export default appointmentRouter;
