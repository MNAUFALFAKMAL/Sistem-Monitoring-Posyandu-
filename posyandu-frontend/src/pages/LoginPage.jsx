import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { ROLES } from '../utils/constants'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated, user, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // useEffect untuk redirect setelah login berhasil
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname;
      if (user.role === ROLES.ADMIN) {
        navigate(from || '/admin', { replace: true });
      } else if (user.role === ROLES.KADER) {
        navigate('/kader', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location.state]);

  const onSubmit = async (data) => {
    try {
      const result = await login(data);

      // Pemeriksaan keamanan yang sangat ketat
      if (!result || typeof result !== 'object') {
        toast.error('Terjadi kesalahan yang tidak terduga. Silakan coba lagi.');
        return;
      }

      if (!result.success) {
        toast.error(result.error || 'Login gagal. Silakan periksa kembali email dan password Anda.');
        return;
      }

      if (!result.user || typeof result.user !== 'object') {
        toast.error('Terjadi kesalahan dalam memproses data pengguna. Silakan hubungi administrator.');
        return;
      }

      if (!result.user.role) {
        toast.error('Peran pengguna tidak valid. Silakan hubungi administrator.');
        return;
      }

      // Jika semua pemeriksaan lulus, lanjutkan
      toast.success('Login berhasil!');

    } catch (error) {
      toast.error('Terjadi kesalahan jaringan. Silakan coba lagi.');
    }
  };

  // Tampilkan loading saat aplikasi sedang mengecek status autentikasi
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Memeriksa status login...</p>
        </div>
      </div>
    );
  }

  // Jika sudah login, tampilkan loading singkat saat redirect
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Mengarahkan Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Masuk ke Sistem Monitoring Posyandu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Silakan masuk dengan akun Anda
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email"
                {...register('email', {
                  required: 'Email wajib diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format email tidak valid',
                  },
                })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`form-input pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password wajib diisi',
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Masuk
            </button>
          </div>
        </form>

        {/* Tombol Kembali */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary w-full flex justify-center items-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm