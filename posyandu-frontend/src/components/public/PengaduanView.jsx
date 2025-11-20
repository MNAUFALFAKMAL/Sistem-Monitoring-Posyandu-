import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { pengaduanService } from '../../services/pengaduanService'

const PengaduanView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await pengaduanService.create(data)
      setIsSubmitted(true)
      toast.success('Pengaduan Anda telah terkirim dan akan segera kami proses')
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengirim pengaduan')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pengaduan Terkirim!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih atas pengaduan Anda. Kami akan segera merespons melalui email yang Anda berikan.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn btn-primary"
          >
            Buat Pengaduan Baru
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Formulir Pengaduan</h1>
        <p className="text-gray-600">
          Silakan isi formulir di bawah ini untuk mengajukan pengaduan atau pertanyaan terkait layanan Posyandu.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nama" className="form-label">
              Nama Lengkap
            </label>
            <div>
              <input
                id="nama"
                type="text"
                className={`form-input ${errors.nama ? 'border-red-500' : ''}`}
                placeholder="Nama lengkap"
                {...register('nama', {
                  required: 'Nama wajib diisi',
                })}
              />
            </div>
            {errors.nama && (
              <p className="form-error">{errors.nama.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nik" className="form-label">
              Nomor Induk Kependudukan (NIK)
            </label>
            <input
              id="nik"
              type="text"
              className={`form-input ${errors.nik ? 'border-red-500' : ''}`}
              placeholder="NIK"
              {...register('nik', {
                required: 'NIK wajib diisi',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: 'NIK harus 16 digit angka',
                },
              })}
            />
            {errors.nik && (
              <p className="form-error">{errors.nik.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div>
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
            </div>
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="no_hp" className="form-label">
              Nomor Telepon/HP
            </label>
            <div>
              <input
                id="no_hp"
                type="tel"
                className={`form-input ${errors.no_hp ? 'border-red-500' : ''}`}
                placeholder="Nomor telepon aktif"
                {...register('no_hp', {
                  required: 'Nomor telepon wajib diisi',
                  pattern: {
                    value: /^[0-9]{10,13}$/,
                    message: 'Format nomor telepon tidak valid',
                  },
                })}
              />
            </div>
            {errors.no_hp && (
              <p className="form-error">{errors.no_hp.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="kategori" className="form-label">
            Kategori Pengaduan
          </label>
          <select
            id="kategori"
            className={`form-input ${errors.kategori ? 'border-red-500' : ''}`}
            {...register('kategori', {
              required: 'Kategori wajib dipilih',
            })}
          >
            <option value="">Pilih kategori</option>
            <option value="pelayanan">Pelayanan</option>
            <option value="informasi">Informasi</option>
            <option value="kritik_saran">Kritik dan Saran</option>
            <option value="pengaduan_lain">Pengaduan Lainnya</option>
          </select>
          {errors.kategori && (
            <p className="form-error">{errors.kategori.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subjek" className="form-label">
            Subjek
          </label>
          <input
            id="subjek"
            type="text"
            className={`form-input ${errors.subjek ? 'border-red-500' : ''}`}
            placeholder="Subjek pengaduan"
            {...register('subjek', {
              required: 'Subjek wajib diisi',
            })}
          />
          {errors.subjek && (
            <p className="form-error">{errors.subjek.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pesan" className="form-label">
            Isi Pengaduan
          </label>
          <div>
            <textarea
              id="pesan"
              rows={5}
              className={`form-input ${errors.pesan ? 'border-red-500' : ''}`}
              placeholder="Jelaskan pengaduan atau pertanyaan Anda secara detail"
              {...register('pesan', {
                required: 'Isi pengaduan wajib diisi',
                minLength: {
                  value: 20,
                  message: 'Isi pengaduan minimal 20 karakter',
                },
              })}
            ></textarea>
          </div>
          {errors.pesan && (
            <p className="form-error">{errors.pesan.message}</p>
          )}
        </div>

        <div className="flex justify-end">
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
                Mengirim...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim Pengaduan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PengaduanView