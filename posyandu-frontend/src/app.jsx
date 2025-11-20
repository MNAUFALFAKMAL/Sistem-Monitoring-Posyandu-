import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicPage from './pages/PublicPage'
import LoginPage from './pages/LoginPage'
import KaderPage from './pages/KaderPage'
import AdminLayout from './layouts/AdminLayout'
import KaderLayout from './layouts/KaderLayout'
import AdminDashboard from './components/admin/Dashboard'
import UserManagement from './components/admin/UserManagement'
import UserForm from './components/admin/UseForm'
import KaderDashboard from './components/kader/Dashboard'
import BalitaList from './components/kader/BalitaList'
import BalitaForm from './components/kader/BalitaForm'
import IbuHamilList from './components/kader/IbuHamilList'
import IbuHamilForm from './components/kader/IbuHamilForm'
import JadwalManagement from './components/kader/JadwalManagement'
import PengaduanManagement from './components/kader/PengaduanManagement'
import { useAuth } from './hooks/useAuth'
import { ROLES } from './utils/constants'

function App() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    // You can return a loading spinner here
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<PublicPage />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to={user?.role === ROLES.ADMIN ? '/admin' : '/kader'} replace />
            ) : (
              <LoginPage />
            )
          } 
        />
        <Route
          path="/kader"
          element={
            <ProtectedRoute role="kader">
              <KaderLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<KaderDashboard />} />
          <Route path="balita" element={<BalitaList />} />
          <Route path="balita/tambah" element={<BalitaForm />} />
          <Route path="balita/edit/:id" element={<BalitaForm />} />
          <Route path="ibu-hamil" element={<IbuHamilList />} />
          <Route path="ibu-hamil/tambah" element={<IbuHamilForm />} />
          <Route path="ibu-hamil/edit/:id" element={<IbuHamilForm />} />
          <Route path="jadwal" element={<JadwalManagement />} />
          <Route path="pengaduan" element={<PengaduanManagement />} />
        </Route>
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/tambah" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
          <Route path="settings" element={<div>Pengaturan</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App