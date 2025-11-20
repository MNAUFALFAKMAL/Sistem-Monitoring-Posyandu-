import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { balitaService } from '../../services/balitaService'
import Loading from '../common/Loading'
import { formatDate, calculateAge } from '../../utils/helper'
import toast from 'react-hot-toast'

const BalitaList = () => {
  const [balitaList, setBalitaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBalita, setSelectedBalita] = useState(null)
  

  useEffect(() => {
    const fetchBalita = async () => {
      try {
        setLoading(true)
        const params = {
          page: currentPage,
          search: searchQuery,
        }
        
        const response = await balitaService.getAll(params)
        setBalitaList(response.data.data || [])
        setTotalPages(response.data.last_page || 1)
      } catch (error) {
        console.error('Error fetching balita data:', error)
        toast.error('Gagal memuat data balita')
      } finally {
        setLoading(false)
      }
    }

    fetchBalita()
  }, [currentPage, searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleDelete = async () => {
    if (!selectedBalita) return
    
    try {
      await balitaService.delete(selectedBalita.id)
      setBalitaList(balitaList.filter(balita => balita.id !== selectedBalita.id))
      setShowDeleteModal(false)
      setSelectedBalita(null)
      toast.success('Data balita berhasil dihapus')
    } catch (error) {
      console.error('Error deleting balita:', error)
      toast.error('Gagal menghapus data balita')
    }
  }

  const confirmDelete = (balita) => {
    setSelectedBalita(balita)
    setShowDeleteModal(true)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedBalita(null)
  }

  const getStatusGiziBadge = (status) => {
    switch (status) {
      case 'baik':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Baik</span>
      case 'kurang':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Kurang</span>
      case 'buruk':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Buruk</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">-</span>
    }
  }

  const getImunisasiBadge = (status) => {
    switch (status) {
      case 'lengkap':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Lengkap</span>
      case 'tidak_lengkap':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Tidak Lengkap</span>
      case 'belum':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Belum</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">-</span>
    }
  }

  if (loading) {
    return <Loading message="Memuat data balita..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Data Balita</h1>
        <Link
          to="/kader/balita/tambah"
          className="btn btn-primary flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Tambah Data Balita
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              className="form-input pl-3"
              placeholder="Cari nama balita atau nama orang tua..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
        </div>

        {/* Table */}
        {balitaList.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Balita
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jenis Kelamin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Lahir
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Umur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Orang Tua
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status Gizi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Imunisasi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {balitaList.map((balita) => (
                    <tr key={balita.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{balita.nama}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {balita.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(balita.tanggal_lahir)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {calculateAge(balita.tanggal_lahir)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{balita.nama_ortu}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusGiziBadge(balita.status_gizi)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getImunisasiBadge(balita.status_imunisasi)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/kader/balita/edit/${balita.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => confirmDelete(balita)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Menampilkan {balitaList.length} dari {balitaList.length} data
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sebelumnya
                  </button>
                  <span className="px-3 py-1 text-sm font-medium text-gray-700">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data balita</h3>
            <p className="text-gray-500 mb-4">Belum ada data balita yang tersedia</p>
            <Link
              to="/kader/balita/tambah"
              className="btn btn-primary inline-flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Tambah Data Balita
            </Link>
          </div>
        )}
      </div>

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
                      Hapus Data Balita
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus data balita "{selectedBalita?.nama}"? Tindakan ini tidak dapat dibatalkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
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
    </div>
  )
}

export default BalitaList