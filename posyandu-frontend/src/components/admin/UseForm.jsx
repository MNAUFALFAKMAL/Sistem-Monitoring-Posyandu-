import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'
import { ROLES } from '../../utils/constants'
import { userService } from '../../services/userService'
import Loading from '../common/Loading'
import toast from 'react-hot-toast'

const UserForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const [loading, setLoading] = useState(isEditing)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    }
  })

  useEffect(() => {
    const fetchUser = async () => {
      if (!isEditing) return

      try {
        const response = await userService.getById(id)
        const user = response.data.data

        // Set form values
        Object.keys(user).forEach(key => {
          if (key in watch()) {
            setValue(key, user[key])
          }
        })
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error('Gagal memuat data pengguna')
        navigate('/admin/users')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, isEditing, navigate, setValue, watch])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        // If editing and password is empty, don't send it
        if (!data.password) {
          delete data.password;
        }
        await userService.update(id, data)
        toast.success('Data pengguna berhasil diperbarui')
      } else {
        await userService.create(data)
        toast.success('Pengguna berhasil ditambahkan')
      }
      navigate('/admin/users')
    } catch (error) {
      console.error('Error saving user data:', error)
      toast.error(error.response?.data?.message || 'Gagal menyimpan data pengguna')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loading message="Memuat data pengguna..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/admin/users')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="form-label">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Nama lengkap pengguna"
                {...register('name', {
                  required: 'Nama wajib diisi',
                })}
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email aktif"
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
                {isEditing ? 'Password (Kosongkan jika tidak diubah)' : 'Password'}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Masukkan password"
                  {...register('password', {
                    required: isEditing ? false : 'Password wajib diisi',
                    minLength: {
                      value: 6,
                      message: 'Password minimal 6 karakter',
                    },
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

            <div>
              <label htmlFor="role" className="form-label">
                Peran
              </label>
              <select
                id="role"
                className={`form-input ${errors.role ? 'border-red-500' : ''}`}
                {...register('role', {
                  required: 'Peran wajib dipilih',
                })}
              >
                <option value="">Pilih peran</option>
                <option value={ROLES.ADMIN}>Administrator</option>
                <option value={ROLES.KADER}>Kader Posyandu</option>
              </select>
              {errors.role && (
                <p className="form-error">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
              className="btn btn-secondary"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm