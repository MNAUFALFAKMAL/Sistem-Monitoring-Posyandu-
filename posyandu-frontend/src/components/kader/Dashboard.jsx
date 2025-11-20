import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Baby, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Plus,
} from 'lucide-react'
import { balitaService } from '../../services/balitaService'
import { ibuHamilService } from '../../services/ibuHamilService'
import { jadwalService } from '../../services/jadwalService'
import { pengaduanService } from '../../services/pengaduanService'
import Loading from '../common/Loading'
import { formatDate } from '../../utils/helper'

const Dashboard = () => {
  const [stats, setStats] = useState({
    balitaCount: 0,
    ibuHamilCount: 0,
    jadwalCount: 0,
    pengaduanCount: 0,
  })
  const [recentJadwal, setRecentJadwal] = useState([])
  const [recentPengaduan, setRecentPengaduan] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const balitaResponse = await balitaService.getAll()
        const ibuHamilResponse = await ibuHamilService.getAll()
        const jadwalResponse = await jadwalService.getAll()
        const pengaduanResponse = await pengaduanService.getAll()

        setStats({
          balitaCount: balitaResponse.data.total || balitaResponse.data.data?.length || 0,
          ibuHamilCount: ibuHamilResponse.data.total || ibuHamilResponse.data.data?.length || 0,
          jadwalCount: jadwalResponse.data.total || jadwalResponse.data.data?.length || 0,
          pengaduanCount: pengaduanResponse.data.total || pengaduanResponse.data.data?.length || 0,
        })

        // Fetch recent jadwal
        const upcomingJadwalResponse = await jadwalService.getUpcoming()
        setRecentJadwal(upcomingJadwalResponse.data.data || [])

        // Fetch recent pengaduan
        setRecentPengaduan(pengaduanResponse.data.data?.slice(0, 5) || [])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading message="Memuat data dashboard..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Kader Posyandu</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Baby size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Balita</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.balitaCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/kader/balita"
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              Lihat detail
              <TrendingUp size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-pink-100 text-pink-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Ibu Hamil</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.ibuHamilCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/kader/ibu-hamil"
              className="text-sm text-pink-600 hover:text-pink-800 flex items-center"
            >
              Lihat detail
              <TrendingUp size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Jadwal</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.jadwalCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/kader/jadwal"
              className="text-sm text-green-600 hover:text-green-800 flex items-center"
            >
              Kelola jadwal
              <TrendingUp size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pengaduan</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pengaduanCount}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/kader/pengaduan"
              className="text-sm text-yellow-600 hover:text-yellow-800 flex items-center"
            >
              Tanggapi pengaduan
              <TrendingUp size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/kader/balita/tambah"
            className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Tambah Data Balita
          </Link>
          <Link
            to="/kader/ibu-hamil/tambah"
            className="flex items-center justify-center px-4 py-3 bg-pink-50 text-pink-700 rounded-md hover:bg-pink-100 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Tambah Data Ibu Hamil
          </Link>
          <Link
            to="/kader/jadwal"
            className="flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors"
          >
            <Calendar size={20} className="mr-2" />
            Kelola Jadwal
          </Link>
          <Link
            to="/kader/pengaduan"
            className="flex items-center justify-center px-4 py-3 bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100 transition-colors"
          >
            <MessageSquare size={20} className="mr-2" />
            Tanggapi Pengaduan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Jadwal */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Jadwal Mendatang</h2>
            <Link
              to="/kader/jadwal"
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Lihat semua
            </Link>
          </div>
          {recentJadwal.length > 0 ? (
            <div className="space-y-3">
              {recentJadwal.map((jadwal) => (
                <div key={jadwal.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{jadwal.judul}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      jadwal.jenis === 'balita' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-pink-100 text-pink-800'
                    }`}>
                      {jadwal.jenis === 'balita' ? 'Balita' : 'Ibu Hamil'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(jadwal.tanggal)}, {jadwal.waktu_mulai} - {jadwal.waktu_selesai}
                  </p>
                  <p className="text-sm text-gray-500">{jadwal.lokasi}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Belum ada jadwal mendatang</p>
            </div>
          )}
        </div>

        {/* Recent Pengaduan */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pengaduan Terbaru</h2>
            <Link
              to="/kader/pengaduan"
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Lihat semua
            </Link>
          </div>
          {recentPengaduan.length > 0 ? (
            <div className="space-y-3">
              {recentPengaduan.map((pengaduan) => (
                <div key={pengaduan.id} className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{pengaduan.subjek}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      pengaduan.status === 'diproses' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : pengaduan.status === 'selesai'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pengaduan.status === 'diproses' ? 'Diproses' : 
                       pengaduan.status === 'selesai' ? 'Selesai' : 'Baru'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Oleh: {pengaduan.nama}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(pengaduan.created_at)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Belum ada pengaduan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard