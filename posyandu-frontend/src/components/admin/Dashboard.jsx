import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  UserCheck,
  Shield,
  Plus
} from 'lucide-react'
import { userService } from '../../services/userService'
import Loading from '../../components/common/Loading'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalKaders: 0,
  })
  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getAll()
        const users = response.data.data || []

        // Calculate stats
        const totalUsers = users.length
        const totalAdmins = users.filter(user => user.role === 'admin').length
        const totalKaders = users.filter(user => user.role === 'kader').length

        setStats({
          totalUsers,
          totalAdmins,
          totalKaders,
        })

        // Get recent users (sorted by created_at descending)
        const sortedUsers = users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setRecentUsers(sortedUsers.slice(0, 5))

        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        toast.error('Gagal memuat data dashboard')
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrator</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Admin</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalAdmins}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Kader</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalKaders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Pengguna Terbaru</h2>
          <Link
            to="/admin/users"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Lihat Semua
          </Link>
        </div>
        <div className="space-y-3">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium leading-none text-gray-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role === 'admin' ? 'Admin' : 'Kader'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/users/tambah"
            className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Tambah Pengguna Baru
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center justify-center px-4 py-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Users size={20} className="mr-2" />
            Kelola Pengguna
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard