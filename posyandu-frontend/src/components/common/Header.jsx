import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Sistem Monitoring Posyandu
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`hover:text-primary-200 ${isActive('/') ? 'text-primary-200' : ''}`}
            >
              Beranda
            </Link>
            <Link
              to="/jadwal"
              className={`hover:text-primary-200 ${isActive('/jadwal') ? 'text-primary-200' : ''}`}
            >
              Jadwal
            </Link>
            <Link
              to="/pengaduan"
              className={`hover:text-primary-200 ${isActive('/pengaduan') ? 'text-primary-200' : ''}`}
            >
              Pengaduan
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-primary-200"
                >
                  <LogOut size={16} />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`hover:text-primary-200 ${isActive('/login') ? 'text-primary-200' : ''}`}
              >
                Masuk
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`hover:text-primary-200 ${isActive('/') ? 'text-primary-200' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/jadwal"
                className={`hover:text-primary-200 ${isActive('/jadwal') ? 'text-primary-200' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Jadwal
              </Link>
              <Link
                to="/pengaduan"
                className={`hover:text-primary-200 ${isActive('/pengaduan') ? 'text-primary-200' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pengaduan
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 pt-2 border-t border-primary-500">
                    <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-1 hover:text-primary-200"
                  >
                    <LogOut size={16} />
                    <span>Keluar</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`hover:text-primary-200 ${isActive('/login') ? 'text-primary-200' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header