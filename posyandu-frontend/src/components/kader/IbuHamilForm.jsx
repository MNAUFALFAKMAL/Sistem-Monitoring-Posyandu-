import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { ibuHamilService } from '../../services/ibuHamilService'
import Loading from '../common/Loading'
import { GENDER_OPTIONS, STATUS_KEHAMILAN_OPTIONS } from '../../utils/constants'
import toast from 'react-hot-toast'

const IbuHamilForm = () => {
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
      tempat_lahir: '',
      tanggal_lahir: '',
      alamat: '',
      no_hp: '',
      nama_suami: '',
      nik_suami: '',
      pekerjaan_suami: '',
      hpht: '',
      tanggal_periksa_pertama: '',
      status_kehamilan: '',
      resiko_kehamilan: '',
      berat_badan: '',
      tinggi_badan: '',
      lila: '',
      tekanan_darah: '',
      hemoglobin: '',
      golongan_darah: '',
      catatan: '',
    }
  })

  useEffect(() => {
    const fetchIbuHamil = async () => {
      if (!isEditing) return

      try {
        const response = await ibuHamilService.getById(id)
        const ibuHamil = response.data.data

        // Set form values
        Object.keys(ibuHamil).forEach(key => {
          if (key in watch()) {
            setValue(key, ibuHamil[key])
          }
        })
      } catch (error) {
        console.error('Error fetching ibu hamil data:', error)
        toast.error('Gagal memuat data ibu hamil')
        navigate('/kader/ibu-hamil')
      } finally {
        setLoading(false)
      }
    }

    fetchIbuHamil()
  }, [id, isEditing, navigate, setValue, watch])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        await ibuHamilService.update(id, data)
        toast.success('Data ibu hamil berhasil diperbarui')
      } else {
        await ibuHamilService.create(data)
        toast.success('Data ibu hamil berhasil ditambahkan')
      }
      navigate('/kader/ibu-hamil')
    } catch (error) {
      console.error('Error saving ibu hamil data:', error)
      toast.error(error.response?.data?.message || 'Gagal menyimpan data ibu hamil')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loading message="Memuat data ibu hamil..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={() => navigate('/kader/ibu-hamil')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Data Ibu Hamil' : 'Tambah Data Ibu Hamil'}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nama" className="form-label">
                Nama Ibu Hamil
              </label>
              <input
                id="nama"
                type="text"
                className={`form-input ${errors.nama ? 'border-red-500' : ''}`}
                placeholder="Nama lengkap ibu hamil"
                {...register('nama', {
                  required: 'Nama ibu hamil wajib diisi',
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
              <label htmlFor="no_hp" className="form-label">
                Nomor Telepon/HP
              </label>
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
              {errors.no_hp && (
                <p className="form-error">{errors.no_hp.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nama_suami" className="form-label">
                Nama Suami
              </label>
              <input
                id="nama_suami"
                type="text"
                className={`form-input ${errors.nama_suami ? 'border-red-500' : ''}`}
                placeholder="Nama lengkap suami"
                {...register('nama_suami', {
                  required: 'Nama suami wajib diisi',
                })}
              />
              {errors.nama_suami && (
                <p className="form-error">{errors.nama_suami.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nik_suami" className="form-label">
                NIK Suami
              </label>
              <input
                id="nik_suami"
                type="text"
                className={`form-input ${errors.nik_suami ? 'border-red-500' : ''}`}
                placeholder="NIK suami"
                {...register('nik_suami', {
                  required: 'NIK suami wajib diisi',
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: 'NIK harus 16 digit angka',
                  },
                })}
              />
              {errors.nik_suami && (
                <p className="form-error">{errors.nik_suami.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="pekerjaan_suami" className="form-label">
                Pekerjaan Suami
              </label>
              <input
                id="pekerjaan_suami"
                type="text"
                className={`form-input ${errors.pekerjaan_suami ? 'border-red-500' : ''}`}
                placeholder="Pekerjaan suami"
                {...register('pekerjaan_suami', {
                  required: 'Pekerjaan suami wajib diisi',
                })}
              />
              {errors.pekerjaan_suami && (
                <p className="form-error">{errors.pekerjaan_suami.message}</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Data Kehamilan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hpht" className="form-label">
                  Hari Pertama Haid Terakhir (HPHT)
                </label>
                <input
                  id="hpht"
                  type="date"
                  className={`form-input ${errors.hpht ? 'border-red-500' : ''}`}
                  {...register('hpht', {
                    required: 'HPHT wajib diisi',
                  })}
                />
                {errors.hpht && (
                  <p className="form-error">{errors.hpht.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tanggal_periksa_pertama" className="form-label">
                  Tanggal Periksa Pertama
                </label>
                <input
                  id="tanggal_periksa_pertama"
                  type="date"
                  className={`form-input ${errors.tanggal_periksa_pertama ? 'border-red-500' : ''}`}
                  {...register('tanggal_periksa_pertama', {
                    required: 'Tanggal periksa pertama wajib diisi',
                  })}
                />
                {errors.tanggal_periksa_pertama && (
                  <p className="form-error">{errors.tanggal_periksa_pertama.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="status_kehamilan" className="form-label">
                  Status Kehamilan
                </label>
                <select
                  id="status_kehamilan"
                  className={`form-input ${errors.status_kehamilan ? 'border-red-500' : ''}`}
                  {...register('status_kehamilan', {
                    required: 'Status kehamilan wajib dipilih',
                  })}
                >
                  <option value="">Pilih status kehamilan</option>
                  {STATUS_KEHAMILAN_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status_kehamilan && (
                  <p className="form-error">{errors.status_kehamilan.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="resiko_kehamilan" className="form-label">
                  Resiko Kehamilan
                </label>
                <select
                  id="resiko_kehamilan"
                  className={`form-input ${errors.resiko_kehamilan ? 'border-red-500' : ''}`}
                  {...register('resiko_kehamilan', {
                    required: 'Resiko kehamilan wajib dipilih',
                  })}
                >
                  <option value="">Pilih resiko kehamilan</option>
                  <option value="rendah">Rendah</option>
                  <option value="sedang">Sedang</option>
                  <option value="tinggi">Tinggi</option>
                </select>
                {errors.resiko_kehamilan && (
                  <p className="form-error">{errors.resiko_kehamilan.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="berat_badan" className="form-label">
                  Berat Badan (kg)
                </label>
                <input
                  id="berat_badan"
                  type="number"
                  step="0.1"
                  className={`form-input ${errors.berat_badan ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 55.5"
                  {...register('berat_badan', {
                    required: 'Berat badan wajib diisi',
                    min: {
                      value: 30,
                      message: 'Berat badan minimal 30 kg',
                    },
                    max: {
                      value: 150,
                      message: 'Berat badan maksimal 150 kg',
                    },
                  })}
                />
                {errors.berat_badan && (
                  <p className="form-error">{errors.berat_badan.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tinggi_badan" className="form-label">
                  Tinggi Badan (cm)
                </label>
                <input
                  id="tinggi_badan"
                  type="number"
                  step="0.1"
                  className={`form-input ${errors.tinggi_badan ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 158"
                  {...register('tinggi_badan', {
                    required: 'Tinggi badan wajib diisi',
                    min: {
                      value: 100,
                      message: 'Tinggi badan minimal 100 cm',
                    },
                    max: {
                      value: 220,
                      message: 'Tinggi badan maksimal 220 cm',
                    },
                  })}
                />
                {errors.tinggi_badan && (
                  <p className="form-error">{errors.tinggi_badan.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lila" className="form-label">
                  Lingkar Lengan Atas (LILA) (cm)
                </label>
                <input
                  id="lila"
                  type="number"
                  step="0.1"
                  className={`form-input ${errors.lila ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 25.5"
                  {...register('lila', {
                    required: 'LILA wajib diisi',
                    min: {
                      value: 10,
                      message: 'LILA minimal 10 cm',
                    },
                    max: {
                      value: 50,
                      message: 'LILA maksimal 50 cm',
                    },
                  })}
                />
                {errors.lila && (
                  <p className="form-error">{errors.lila.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tekanan_darah" className="form-label">
                  Tekanan Darah
                </label>
                <input
                  id="tekanan_darah"
                  type="text"
                  className={`form-input ${errors.tekanan_darah ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 120/80"
                  {...register('tekanan_darah', {
                    required: 'Tekanan darah wajib diisi',
                    pattern: {
                      value: /^[0-9]{2,3}\/[0-9]{2,3}$/,
                      message: 'Format tekanan darah tidak valid (contoh: 120/80)',
                    },
                  })}
                />
                {errors.tekanan_darah && (
                  <p className="form-error">{errors.tekanan_darah.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="hemoglobin" className="form-label">
                  Hemoglobin (g/dL)
                </label>
                <input
                  id="hemoglobin"
                  type="number"
                  step="0.1"
                  className={`form-input ${errors.hemoglobin ? 'border-red-500' : ''}`}
                  placeholder="Contoh: 11.5"
                  {...register('hemoglobin', {
                    required: 'Hemoglobin wajib diisi',
                    min: {
                      value: 5,
                      message: 'Hemoglobin minimal 5 g/dL',
                    },
                    max: {
                      value: 20,
                      message: 'Hemoglobin maksimal 20 g/dL',
                    },
                  })}
                />
                {errors.hemoglobin && (
                  <p className="form-error">{errors.hemoglobin.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="golongan_darah" className="form-label">
                  Golongan Darah
                </label>
                <select
                  id="golongan_darah"
                  className={`form-input ${errors.golongan_darah ? 'border-red-500' : ''}`}
                  {...register('golongan_darah', {
                    required: 'Golongan darah wajib dipilih',
                  })}
                >
                  <option value="">Pilih golongan darah</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
                {errors.golongan_darah && (
                  <p className="form-error">{errors.golongan_darah.message}</p>
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
                  placeholder="Catatan tambahan mengenai kesehatan ibu hamil"
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
              onClick={() => navigate('/kader/ibu-hamil')}
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

export default IbuHamilForm