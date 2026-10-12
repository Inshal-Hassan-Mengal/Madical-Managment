import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff, HeartPulse, ScanFace, ShieldCheck } from 'lucide-react';
import api from '../../shared/services/api';
import { COOKIE_SESSION, useAuthStore } from '../../store/authStore';
import { Card } from '../molecules/Card';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useFadeUp } from '../../shared/hooks/useFadeUp';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/auth/login', { email: data.email, password: data.password }) as {
        user: {
          id: string;
          name?: string;
          username?: string;
          email: string;
          role: string;
          patientId?: string;
          doctorId?: string;
        };
        token?: string;
        message?: string;
      };
      if (!response.user) {
        throw new Error('Login succeeded but the server did not return a user account.');
      }
      login(response.user, response.token || COOKIE_SESSION);
      toast.success(response.message || 'Login successful!');
      navigate('/dashboard');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Invalid email or password';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFaceLogin = () => {
    console.log('Initiating FaceIO authentication...');
    toast('Face login feature coming next!', { icon: '📷' });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useFadeUp(containerRef);

  return (
    <main ref={containerRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 py-10 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-28 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-2xl shadow-blue-950/10 backdrop-blur-sm lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-10 text-white lg:flex xl:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-24 h-80 w-80 rounded-full border border-white/10" />

          <Link to="/" className="relative inline-flex w-fit items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <HeartPulse className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight">MedManage</span>
          </Link>

          <div className="relative my-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">Medical Management</p>
            <h1 className="dashboard-title max-w-md text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Welcome back to care that feels connected.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-blue-50/90">
              Sign in to securely access your care team, patient records and clinic workspace.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-xs leading-5 text-blue-50">Your healthcare workspace, protected and ready when you are.</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-5 sm:p-9 lg:p-10 xl:p-14">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-flex items-center gap-2.5 rounded-lg text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                <HeartPulse className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-base font-bold tracking-tight">MedManage</span>
            </Link>

            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Welcome back</p>
              <h2 className="dashboard-title text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Sign in to your account</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Enter your details to continue to your clinical workspace.</p>
            </div>

            <Card className="rounded-3xl border-slate-200/80 p-5 shadow-xl shadow-slate-900/[0.05] sm:p-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  label="Email address"
                  type="email"
                  placeholder="you@hospital.com"
                  autoComplete="email"
                  required
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="relative">
                  <FormField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    error={errors.password?.message}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-3 top-[34px] inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {showPassword
                      ? <EyeOff className="h-4 w-4" aria-hidden="true" />
                      : <Eye className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-1 min-h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold shadow-lg shadow-blue-600/20 transition duration-200 hover:bg-blue-700"
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-slate-200 text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50"
                onClick={handleFaceLogin}
              >
                <ScanFace className="h-4 w-4 text-blue-600" aria-hidden="true" />
                Login with Face
              </Button>

              <p className="mt-6 text-center text-sm text-slate-600">
                New to MedManage?{' '}
                <Link to="/register" className="font-semibold text-blue-700 transition-colors hover:text-blue-800 hover:underline">
                  Sign up
                </Link>
              </p>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};
