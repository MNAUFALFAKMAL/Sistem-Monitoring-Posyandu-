import React from 'react'
import { Routes, Route } from 'react-router-dom'
import KaderLayout from '../layouts/KaderLayout'
import Dashboard from '../components/kader/Dashboard'
import BalitaList from '../components/kader/BalitaList'
import BalitaForm from '../components/kader/BalitaForm'
import IbuHamilList from '../components/kader/IbuHamilList'
import IbuHamilForm from '../components/kader/IbuHamilForm'
import JadwalManagement from '../components/kader/JadwalManagement'
import PengaduanManagement from '../components/kader/PengaduanManagement'

const KaderPage = () => {
  return (
    <KaderLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="balita" element={<BalitaList />} />
        <Route path="balita/tambah" element={<BalitaForm />} />
        <Route path="balita/edit/:id" element={<BalitaForm />} />

        <Route path="ibu-hamil" element={<IbuHamilList />} />
        <Route path="ibu-hamil/tambah" element={<IbuHamilForm />} />
        <Route path="ibu-hamil/edit/:id" element={<IbuHamilForm />} />
        
        <Route path="jadwal" element={<JadwalManagement />} />
        <Route path="pengaduan" element={<PengaduanManagement />} />
      </Routes>
    </KaderLayout>
  )
}

export default KaderPage