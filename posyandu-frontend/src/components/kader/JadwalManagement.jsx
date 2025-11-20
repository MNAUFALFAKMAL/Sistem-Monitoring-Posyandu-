import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, User, X } from 'lucide-react'
import { jadwalService } from '../../services/jadwalService'
import Loading from '../common/Loading'
import { formatDate, formatTime } from '../../utils/helper'
import toast from 'react-hot-toast'

const JadwalManagement = () => {
  const [jadwalList, setJadwalList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedJadwal, setSelectedJadwal] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      judul: '',
      deskripsi: '',
      tanggal: '',
      waktu_mulai: '',
      waktu_selesai: '',
      lokasi: '',
      petugas: '',
      jenis: '',
    }
  })

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const response = await jadwalService.getAll()
        setJadwalList(response.data.data || [])
      } catch (error) {
        console.error('Error fetching jadwal data:', error)
        toast.error('Gagal memuat data jadwal')
      } finally {
        setLoading(false)
      }
    }

    fetchJadwal()
  }, [])

  const handleAdd = () => {
    setIsEditing(false)
    setSelectedJadwal(null)
    reset({
      judul: '',
      deskripsi: '',
      tanggal: '',
      waktu_mulai: '',
      waktu_selesai: '',
      lokasi: '',
      petugas: '',
      jenis: '',
    })
    setShowForm(true)
  }

  const handleEdit = (jadwal) => {
    setIsEditing(true)
    setSelectedJadwal(jadwal)
    Object.keys(jadwal).forEach(key => {
      if (key in register) {
        setValue(key, jadwal[key])
      }
    })
    setShowForm(true)
  }

  const handleDelete = (jadwal) => {
    setSelectedJadwal(jadwal)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!selectedJadwal) return
    
    try {
      await jadwalService.delete(selectedJadwal.id)
      setJadwalList(jadwalList.filter(jadwal => jadwal.id !== selectedJadwal.id))
      setShowDeleteModal(false)
      setSelectedJadwal(null)
      toast.success('Jadwal berhasil dihapus')
    } catch (error) {
      console.error('Error deleting jadwal:', error)
      toast.error('Gagal menghapus jadwal')
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedJadwal(null)
  }

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await jadwalService.update(selectedJadwal.id, data)
        setJadwalList(jadwalList.map(jadwal => 
          jadwal.id === selectedJadwal.id ? { ...jadwal, ...data } : jadwal
        ))
        toast.success('Jadwal berhasil diperbarui')
      } else {
        const response = await jadwalService.create(data)
        setJadwalList([...jadwalList, response.data.data])
        toast.success('Jadwal berhasil ditambahkan')
      }
      setShowForm(false)
      reset()
    } catch (error) {
      console.error('Error saving jadwal:', error)
      toast.error(error.response?.data?.message || 'Gagal menyimpan jadwal')
    }
  }

  const getJenisBadge = (jenis) => {
    switch (jenis) {
      case 'balita':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Balita</span>
      case 'ibu_hamil':
        return <span className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-800">Ibu Hamil</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">-</span>
    }
  }

  if (loading) {
    return <Loading message="Memuat data jadwal..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Jadwal Posyandu</h1>
        <button
          onClick={handleAdd}
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Tambah Jadwal
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEditing ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="judul" className="form-label">
                      Judul Kegiatan
                    </label>
                    <input
                      id="judul"
                      type="text"
                      className={`form-input ${errors.judul ? 'border-red-500' : ''}`}
                      placeholder="Judul kegiatan"
                      {...register('judul', {
                        required: 'Judul kegiatan wajib diisi',
                      })}
                    />
                    {errors.judul && (
                      <p className="form-error">{errors.judul.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="jenis" className="form-label">
                      Jenis Kegiatan
                    </label>
                    <select
                      id="jenis"
                      className={`form-input ${errors.jenis ? 'border-red-500' : ''}`}
                      {...register('jenis', {
                        required: 'Jenis kegiatan wajib dipilih',
                      })}
                    >
                      <option value="">Pilih jenis kegiatan</option>
                      <option value="balita">Balita</option>
                      <option value="ibu_hamil">Ibu Hamil</option>
                    </select>
                    {errors.jenis && (
                      <p className="form-error">{errors.jenis.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="tanggal" className="form-label">
                      Tanggal
                    </label>
                    <input
                      id="tanggal"
                      type="date"
                      className={`form-input ${errors.tanggal ? 'border-red-500' : ''}`}
                      {...register('tanggal', {
                        required: 'Tanggal wajib diisi',
                      })}
                    />
                    {errors.tanggal && (
                      <p className="form-error">{errors.tanggal.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="waktu_mulai" className="form-label">
                        Waktu Mulai
                      </label>
                      <input
                        id="waktu_mulai"
                        type="time"
                        className={`form-input ${errors.waktu_mulai ? 'border-red-500' : ''}`}
                        {...register('waktu_mulai', {
                          required: 'Waktu mulai wajib diisi',
                        })}
                      />
                      {errors.waktu_mulai && (
                        <p className="form-error">{errors.waktu_mulai.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="waktu_selesai" className="form-label">
                        Waktu Selesai
                      </label>
                      <input
                        id="waktu_selesai"
                        type="time"
                        className={`form-input ${errors.waktu_selesai ? 'border-red-500' : ''}`}
                        {...register('waktu_selesai', {
                          required: 'Waktu selesai wajib diisi',
                        })}
                      />
                      {errors.waktu_selesai && (
                        <p className="form-error">{errors.waktu_selesai.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lokasi" className="form-label">
                      Lokasi
                    </label>
                    <input
                      id="lokasi"
                      type="text"
                      className={`form-input ${errors.lokasi ? 'border-red-500' : ''}`}
                      placeholder="Lokasi kegiatan"
                      {...register('lokasi', {
                        required: 'Lokasi wajib diisi',
                      })}
                    />
                    {errors.lokasi && (
                      <p className="form-error">{errors.lokasi.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="petugas" className="form-label">
                      Petugas
                    </label>
                    <input
                      id="petugas"
                      type="text"
                      className={`form-input ${errors.petugas ? 'border-red-500' : ''}`}
                      placeholder="Nama petugas"
                      {...register('petugas', {
                        required: 'Petugas wajib diisi',
                      })}
                    />
                    {errors.petugas && (
                      <p className="form-error">{errors.petugas.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="deskripsi" className="form-label">
                      Deskripsi
                    </label>
                    <textarea
                      id="deskripsi"
                      rows={3}
                      className={`form-input ${errors.deskripsi ? 'border-red-500' : ''}`}
                      placeholder="Deskripsi kegiatan"
                      {...register('deskripsi')}
                    ></textarea>
                    {errors.deskripsi && (
                      <p className="form-error">{errors.deskripsi.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn btn-secondary"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      {isEditing ? 'Perbarui' : 'Simpan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Hapus Jadwal
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus jadwal "{selectedJadwal?.judul}"? Tindakan ini tidak dapat dibatalkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cancelDelete}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jadwal List */}
      <div className="bg-white shadow rounded-lg p-6">
        {jadwalList.length > 0 ? (
          <div className="space-y-4">
            {jadwalList.map((jadwal) => (
              <div key={jadwal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{jadwal.judul}</h3>
                      {getJenisBadge(jadwal.jenis)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{formatDate(jadwal.tanggal)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{jadwal.waktu_mulai} - {jadwal.waktu_selesai}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{jadwal.lokasi}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Petugas: {jadwal.petugas}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(jadwal)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Edit size={18} className="text-indigo-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(jadwal)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
                {jadwal.deskripsi && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">{jadwal.deskripsi}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada jadwal</h3>
            <p className="text-gray-500 mb-4">Belum ada jadwal Posyandu yang tersedia</p>
            <button
              onClick={handleAdd}
              className="btn btn-primary inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Tambah Jadwal
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JadwalManagement