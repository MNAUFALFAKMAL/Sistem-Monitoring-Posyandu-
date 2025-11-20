import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Home from '../components/public/Home'
import JadwalView from '../components/public/JadwalView'
import PengaduanView from '../components/public/PengaduanView'

const PublicPage = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="jadwal" element={<JadwalView />} />
        <Route path="pengaduan" element={<PengaduanView />} />
      </Routes>
    </PublicLayout>
  )
}

export default PublicPage