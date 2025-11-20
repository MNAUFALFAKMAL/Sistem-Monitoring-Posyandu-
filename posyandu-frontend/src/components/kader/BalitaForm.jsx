import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { balitaService } from '../../services/balitaService'
import Loading from '../common/Loading'
import { GENDER_OPTIONS, STATUS_GIZI_OPTIONS, STATUS_IMUNISASI_OPTIONS, STATUS_VITAMIN_OPTIONS } from '../../utils/constants'
import toast from 'react-hot-toast'

const BalitaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const [loading, setLoading] = useState(isEditing)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      nama: '',
      nik: '',
      jenis_kelamin: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      nama_ortu: '',
      nik_ortu: '',
      alamat: '',
      berat_lahir: '',
      tinggi_lahir: '',
      berat_sekarang: '',
      tinggi_sekarang: '',
      status_gizi: '',
      status_imunisasi: '',
      status_vitamin_a: '',
      catatan: '',
    }
  })

  useEffect(() => {
    const fetchBalita = async () => {
      if (!isEditing) return

      try {
        const response = await balitaService.getById(id)
        const balita = response.data.data

        // Set form values
        Object.keys(balita).forEach(key => {
          if (key in watch()) {
            setValue(key, balita[key])
          }
        })
      } catch (error) {
        console.error('Error fetching balita data:', error)
        toast.error('Gagal memuat data balita')
        navigate('/kader/balita')
      } finally {
        setLoading(false)
      }
    }

    fetchBalita()
  }, [id, isEditing, navigate, setValue, watch])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        await balitaService.update(id, data)
        toast.success('Data balita berhasil diperbarui')
      } else {
        await balitaService.create(data)
        toast.success('Data balita berhasil ditambahkan')
      }
      navigate('/kader/balita')
    } catch (error) {
      console.error('Error saving balita data:', error)
      toast.error(error.response?.data?.message || 'Gagal menyimpan data balita')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loading message="Memuat data balita..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/kader/balita')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Data Balita' : 'Tambah Data Balita'}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nama" className="form-label">
                Nama Balita
              </label>
              <input
                id="nama"
                type="text"
                className={`form-input ${errors.nama ? 'border-red-500' : ''}`}
                placeholder="Nama lengkap balita"
                {...register('nama', {
                  required: 'Nama balita wajib diisi',
                })}
              />
              {errors.nama && (
                <p className="form-error">{errors.nama.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nik" className="form-label">
                NIK
              </label>
              <input
                id="nik"
                type="text"
                className={`form-input ${errors.nik ? 'border-red-500' : ''}`}
                placeholder="Nomor Induk Kependudukan"
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

            <div>
              <label htmlFor="jenis_kelamin" className="form-label">
                Jenis Kelamin
              </label>
              <select
                id="jenis_kelamin"
                className={`form-input ${errors.jenis_kelamin ? 'border-red-500' : ''}`}
                {...register('jenis_kelamin', {
                  required: 'Jenis kelamin wajib dipilih',
                })}
              >
                <option value="">Pilih jenis kelamin</option>
                {GENDER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.jenis_kelamin && (
                <p className="form-error">{errors.jenis_kelamin.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="tempat_lahir" className="form-label">
                Tempat Lahir
              </label>
              <input
                id="tempat_lahir"
                type="text"
                className={`form-input ${errors.tempat_lahir ? 'border-red-500' : ''}`}
                placeholder="Tempat lahir"
                {...register('tempat_lahir', {
                  required: 'Tempat lahir wajib diisi',
                })}
              />
              {errors.tempat_lahir && (
                <p className="form-error">{errors.tempat_lahir.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="tanggal_lahir" className="form-label">
                Tanggal Lahir
              </label>
              <input
                id="tanggal_lahir"
                type="date"
                className={`form-input ${errors.tanggal_lahir ? 'border-red-500' : ''}`}
                {...register('tanggal_lahir', {
                  required: 'Tanggal lahir wajib diisi',
                })}
              />
              {errors.tanggal_lahir && (
                <p className="form-error">{errors.tanggal_lahir.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nama_ortu" className="form-label">
                Nama Orang Tua/Wali
              </label>
              <input
                id="nama_ortu"
                type="text"
                className={`form-input ${errors.nama_ortu ? 'border-red-500' : ''}`}
                placeholder="Nama lengkap orang tua/wali"
                {...register('nama_ortu', {
                  required: 'Nama orang tua/wali wajib diisi',
                })}
              />
              {errors.nama_ortu && (
                <p className="form-error">{errors.nama_ortu.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nik_ortu" className="form-label">
                NIK Orang Tua/Wali
              </label>
              <input
                id="nik_ortu"
                type="text"
                className={`form-input ${errors.nik_ortu ? 'border-red-500' : ''}`}
                placeholder="NIK orang tua/wali"
                {...register('nik_ortu', {
                  required: 'NIK orang tua/wali wajib diisi',
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: 'NIK harus 16 digit angka',
                  },
                })}
              />
              {errors.nik_ortu && (
                <p className="form-error">{errors.nik_ortu.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="alamat" className="form-label">
                Alamat
              </label>
              <textarea
                id="alamat"
                rows={3}
                className={`form-input ${errors.alamat ? 'border-red-500' : ''}`}
                placeholder="Alamat lengkap"
                {...register('alamat', {
                  required: 'Alamat wajib diisi',
                })}
              ></textarea>
              {errors.alamat && (
                <p className="form-error">{errors.alamat.message}</p>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Data Kesehatan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="berat_lahir" className="form-label">
                  Berat Lahir (kg)
                </label>
                <input
                  id="berat_lahir"
                  type="number"
                  step="0.01"
                  className={`form-input ${errors.berat_lahir ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 3.2"
                  {...register('berat_lahir', {
                    required: 'Berat lahir wajib diisi',
                    min: {
                      value: 0.5,
                      message: 'Berat lahir minimal 0.5 kg',
                    },
                    max: {
                      value: 10,
                      message: 'Berat lahir maksimal 10 kg',
                    },
                  })}
                />
                {errors.berat_lahir && (
                  <p className="form-error">{errors.berat_lahir.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tinggi_lahir" className="form-label">
                  Tinggi Lahir (cm)
                </label>
                <input
                  id="tinggi_lahir"
                  type="number"
                  step="0.1"
                  className={`form-input ${errors.tinggi_lahir ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 48"
                  {...register('tinggi_lahir', {
                    required: 'Tinggi lahir wajib diisi',
                    min: {
                      value: 20,
                      message: 'Tinggi lahir minimal 20 cm',
                    },
                    max: {
                      value: 100,
                      message: 'Tinggi lahir maksimal 100 cm',
                    },
                  })}
                />
                {errors.tinggi_lahir && (
                  <p className="form-error">{errors.tinggi_lahir.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="berat_sekarang" className="form-label">
                  Berat Sekarang (kg)
                </label>
                <input
                  id="berat_sekarang"
                  type="number"
                  step="0.01"
                  className={`form-input ${errors.berat_sekarang ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 8.5"
                  {...register('berat_sekarang', {
                    required: 'Berat sekarang wajib diisi',
                    min: {
                      value: 0.5,
                      message: 'Berat sekarang minimal 0.5 kg',
                    },
                    max: {
                      value: 50,
                      message: 'Berat sekarang maksimal 50 kg',
                    },
                  })}
                />
                {errors.berat_sekarang && (
                  <p className="form-error">{errors.berat_sekarang.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tinggi_sekarang" className="form-label">
                  Tinggi Sekarang (cm)
                </label>
                <input
                  id="tinggi_sekarang"
                  type="number"
                  step="0.1"
                  className={`form-input ${errors.tinggi_sekarang ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 72"
                  {...register('tinggi_sekarang', {
                    required: 'Tinggi sekarang wajib diisi',
                    min: {
                      value: 20,
                      message: 'Tinggi sekarang minimal 20 cm',
                    },
                    max: {
                      value: 150,
                      message: 'Tinggi sekarang maksimal 150 cm',
                    },
                  })}
                />
                {errors.tinggi_sekarang && (
                  <p className="form-error">{errors.tinggi_sekarang.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status_gizi" className="form-label">
                  Status Gizi
                </label>
                <select
                  id="status_gizi"
                  className={`form-input ${errors.status_gizi ? 'border-red-500' : ''}`}
                  {...register('status_gizi', {
                    required: 'Status gizi wajib dipilih',
                  })}
                >
                  <option value="">Pilih status gizi</option>
                  {STATUS_GIZI_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status_gizi && (
                  <p className="form-error">{errors.status_gizi.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status_imunisasi" className="form-label">
                  Status Imunisasi
                </label>
                <select
                  id="status_imunisasi"
                  className={`form-input ${errors.status_imunisasi ? 'border-red-500' : ''}`}
                  {...register('status_imunisasi', {
                    required: 'Status imunisasi wajib dipilih',
                  })}
                >
                  <option value="">Pilih status imunisasi</option>
                  {STATUS_IMUNISASI_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status_imunisasi && (
                  <p className="form-error">{errors.status_imunisasi.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status_vitamin_a" className="form-label">
                  Status Vitamin A
                </label>
                <select
                  id="status_vitamin_a"
                  className={`form-input ${errors.status_vitamin_a ? 'border-red-500' : ''}`}
                  {...register('status_vitamin_a', {
                    required: 'Status vitamin A wajib dipilih',
                  })}
                >
                  <option value="">Pilih status vitamin A</option>
                  {STATUS_VITAMIN_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status_vitamin_a && (
                  <p className="form-error">{errors.status_vitamin_a.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="catatan" className="form-label">
                  Catatan Kesehatan
                </label>
                <textarea
                  id="catatan"
                  rows={3}
                  className={`form-input ${errors.catatan ? 'border-red-500' : ''}`}
                  placeholder="Catatan tambahan mengenai kesehatan balita"
                  {...register('catatan')}
                ></textarea>
                {errors.catatan && (
                  <p className="form-error">{errors.catatan.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/kader/balita')}
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

export default BalitaForm