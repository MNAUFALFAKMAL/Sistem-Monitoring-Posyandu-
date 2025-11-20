import React, { useState, useEffect } from 'react'
import { MessageSquare, Eye, Reply, X, Mail, Phone, Calendar, User } from 'lucide-react'
import { pengaduanService } from '../../services/pengaduanService'
import Loading from '../common/Loading'
import { formatDate, formatDateTime } from '../../utils/helper'
import toast from 'react-hot-toast'

const PengaduanManagement = () => {
  const [pengaduanList, setPengaduanList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPengaduan, setSelectedPengaduan] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const response = await pengaduanService.getAll()
        setPengaduanList(response.data.data || [])
      } catch (error) {
        console.error('Error fetching pengaduan data:', error)
        toast.error('Gagal memuat data pengaduan')
      } finally {
        setLoading(false)
      }
    }

    fetchPengaduan()
  }, [])

  const handleViewDetail = (pengaduan) => {
    setSelectedPengaduan(pengaduan)
    setShowDetailModal(true)
  }

  const handleResponse = (pengaduan) => {
    setSelectedPengaduan(pengaduan)
    setResponseText(pengaduan.tanggapan || '')
    setShowResponseModal(true)
  }

  const submitResponse = async () => {
    if (!selectedPengaduan || !responseText.trim()) {
      toast.error('Tanggapan tidak boleh kosong')
      return
    }

    setIsSubmitting(true)
    try {
      await pengaduanService.respond(selectedPengaduan.id, responseText)
      setPengaduanList(pengaduanList.map(p => 
        p.id === selectedPengaduan.id 
          ? { ...p, tanggapan: responseText, status: 'selesai' }
          : p
      ))
      setShowResponseModal(false)
      setSelectedPengaduan(null)
      setResponseText('')
      toast.success('Tanggapan berhasil dikirim')
    } catch (error) {
      console.error('Error responding to pengaduan:', error)
      toast.error('Gagal mengirim tanggapan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'baru':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Baru</span>
      case 'diproses':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Diproses</span>
      case 'selesai':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Selesai</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">-</span>
    }
  }

  if (loading) {
    return <Loading message="Memuat data pengaduan..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pengaduan Masyarakat</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {pengaduanList.length > 0 ? (
          <div className="space-y-4">
            {pengaduanList.map((pengaduan) => (
              <div key={pengaduan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pengaduan.subjek}</h3>
                    <p className="text-sm text-gray-600">Oleh: {pengaduan.nama}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    {getStatusBadge(pengaduan.status)}
                    <span className="text-sm text-gray-500">
                      {formatDate(pengaduan.created_at)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3 line-clamp-2">{pengaduan.pesan}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewDetail(pengaduan)}
                    className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Eye size={16} className="mr-1" />
                    Lihat Detail
                  </button>
                  {pengaduan.status !== 'selesai' && (
                    <button
                      onClick={() => handleResponse(pengaduan)}
                      className="flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <Reply size={16} className="mr-1" />
                      Tanggapi
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengaduan</h3>
            <p className="text-gray-500">Belum ada pengaduan dari masyarakat.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPengaduan && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Detail Pengaduan</h3>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Subjek</h4>
                    <p className="text-gray-700">{selectedPengaduan.subjek}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kategori</h4>
                    <p className="text-gray-700 capitalize">{selectedPengaduan.kategori?.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Identitas Pelapor</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        <span>{selectedPengaduan.nama}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2" />
                        <span>{selectedPengaduan.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2" />
                        <span>{selectedPengaduan.no_hp}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDateTime(selectedPengaduan.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Isi Pengaduan</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedPengaduan.pesan}</p>
                  </div>
                  {selectedPengaduan.tanggapan && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Tanggapan</h4>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedPengaduan.tanggapan}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetailModal(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedPengaduan && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Tanggapi Pengaduan</h3>
                  <button
                    onClick={() => setShowResponseModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Subjek:</span> {selectedPengaduan.subjek}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Pelapor:</span> {selectedPengaduan.nama}
                  </p>
                </div>
                <div>
                  <label htmlFor="response" className="form-label">
                    Tulis Tanggapan
                  </label>
                  <textarea
                    id="response"
                    rows={5}
                    className="form-input"
                    placeholder="Ketik tanggapan Anda di sini..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={submitResponse}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Tanggapan'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowResponseModal(false)}
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

export default PengaduanManagement