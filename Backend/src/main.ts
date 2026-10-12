import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './infrastructure/config/env';
import { connectDatabase } from './infrastructure/config/database';
import { errorMiddleware } from './presentation/middlewares/error.middleware';
import authRoutes from './presentation/routes/auth.routes';
import patientRoutes from './presentation/routes/patient.routes';
import doctorRoutes from './presentation/routes/doctor.routes';
import appointmentRoutes from './presentation/routes/appointment.routes';
import vitalsRoutes from './presentation/routes/vitals.routes';
import prescriptionRoutes from './presentation/routes/prescription.routes';
import medicalRecordRoutes from './presentation/routes/medical-record.routes';
import labReportRoutes from './presentation/routes/lab-report.routes';
import billingRoutes from './presentation/routes/billing.routes';
import dashboardRoutes from './presentation/routes/dashboard.routes';
import pharmacyRoutes from './presentation/routes/pharmacy.routes';

const app = express();
const PORT = env.PORT;

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/lab-reports', labReportRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/pharmacy', pharmacyRoutes);

app.use(errorMiddleware);

const startServer = async (): Promise<void> => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void startServer();
