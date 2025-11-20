import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MessageSquare, Users, Baby, Heart, Stethoscope } from 'lucide-react'

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Selamat Datang di Sistem Monitoring Posyandu Desa
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Sistem informasi untuk memantau kesehatan ibu dan anak di Posyandu Desa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jadwal"
              className="btn bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              <Calendar className="mr-2" size={20} />
              Lihat Jadwal Posyandu
            </Link>
            <Link
              to="/pengaduan"
              className="btn bg-primary-700 text-white hover:bg-primary-800 font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              <MessageSquare className="mr-2" size={20} />
              Buat Pengaduan
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Baby className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Pemantauan Balita</h3>
            </div>
            <p className="text-gray-600">
              Pemantauan pertumbuhan dan perkembangan balita, imunisasi, dan pemberian vitamin.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Users className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Kesehatan Ibu Hamil</h3>
            </div>
            <p className="text-gray-600">
              Pemeriksaan kesehatan rutin untuk ibu hamil dan pemantauan perkembangan janin.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Calendar className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Jadwal Posyandu</h3>
            </div>
            <p className="text-gray-600">
              Informasi lengkap mengenai jadwal kegiatan Posyandu di desa.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <MessageSquare className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Pengaduan</h3>
            </div>
            <p className="text-gray-600">
              Layanan pengaduan untuk masyarakat yang membutuhkan bantuan atau informasi.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Heart className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Konsultasi Kesehatan</h3>
            </div>
            <p className="text-gray-600">
              Konsultasi kesehatan dengan kader Posyandu untuk ibu dan anak.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Stethoscope className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Pemeriksaan Kesehatan</h3>
            </div>
            <p className="text-gray-600">
              Pemeriksaan kesehatan rutin untuk mendeteksi masalah kesehatan sejak dini.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Tentang Posyandu</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-4">
            Posyandu (Pos Pelayanan Terpadu) adalah salah satu bentuk upaya kesehatan bersumber daya masyarakat (UKBM) yang dikelola dan diselenggarakan dari, oleh, untuk, dan bersama masyarakat, dalam penyelenggaraan pembangunan kesehatan guna memberdayakan masyarakat dan memberikan kemudahan kepada masyarakat untuk memperoleh pelayanan kesehatan dasar.
          </p>
          <p className="text-gray-600">
            Sistem Monitoring Posyandu Desa ini dibuat untuk memudahkan pengelolaan data kesehatan ibu dan anak, serta meningkatkan layanan kepada masyarakat. Melalui sistem ini, kader Posyandu dapat mencatat data kesehatan balita dan ibu hamil, mengelola jadwal kegiatan, dan merespons pengaduan dari masyarakat.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home