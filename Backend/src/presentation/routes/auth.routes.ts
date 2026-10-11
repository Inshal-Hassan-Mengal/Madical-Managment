import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';
import {
  loginRateLimiter,
  passwordResetRateLimiter,
  registerRateLimiter,
} from '../middlewares/rateLimit.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
} from '../schemas';

const authRouter = Router();
const authController = new AuthController();

// Registration endpoint
authRouter.post('/register', registerRateLimiter, validate(registerSchema), authController.register);

// Strict rate limit: 5 attempts per 15 minutes per IP
authRouter.post('/login', loginRateLimiter, validate(loginSchema), authController.login);
authRouter.post('/logout', authController.logout);

// Strict rate limit: 5 attempts per 15 minutes per IP for OTP and password recovery
authRouter.post('/forgot-password', passwordResetRateLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
authRouter.post('/verify-reset-otp', passwordResetRateLimiter, validate(verifyResetOtpSchema), authController.verifyResetOtp);
authRouter.post('/reset-password', passwordResetRateLimiter, validate(resetPasswordSchema), authController.resetPassword);

export default authRouter;
