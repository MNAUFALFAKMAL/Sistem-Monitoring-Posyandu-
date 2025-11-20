import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { jadwalService } from '../../services/jadwalService'
import Loading from '../common/Loading'
import { formatDate, formatTime } from '../../utils/helper'

const JadwalView = () => {
  const [jadwalList, setJadwalList] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const response = await jadwalService.getUpcoming()
        setJadwalList(response.data.data)
      } catch (error) {
        console.error('Error fetching jadwal:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJadwal()
  }, [])

  const filteredJadwal = jadwalList.filter(item => {
    if (filter === 'all') return true
    if (filter === 'balita') return item.jenis === 'balita'
    if (filter === 'ibu_hamil') return item.jenis === 'ibu_hamil'
    return true
  })

  if (loading) {
    return <Loading message="Memuat jadwal posyandu..." />
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Jadwal Posyandu</h1>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('balita')}
              className={`px-4 py-2 rounded-md ${
                filter === 'balita'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Balita
            </button>
            <button
              onClick={() => setFilter('ibu_hamil')}
              className={`px-4 py-2 rounded-md ${
                filter === 'ibu_hamil'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ibu Hamil
            </button>
          </div>
        </div>

        {filteredJadwal.length > 0 ? (
          <div className="space-y-4">
            {filteredJadwal.map((jadwal) => (
              <div key={jadwal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{jadwal.judul}</h3>
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
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      jadwal.jenis === 'balita' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {jadwal.jenis === 'balita' ? 'Balita' : 'Ibu Hamil'}
                    </span>
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
            <p className="text-gray-500">Belum ada jadwal Posyandu yang tersedia untuk saat ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default JadwalView
