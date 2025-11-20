import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../components/admin/Dashboard'
import UserManagement from '../components/admin/UserManagement'
import UserForm from '../components/admin/UseForm'

const AdminPage = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/tambah" element={<UserForm />} />
        <Route path="users/edit/:id" element={<UserForm />} />
        <Route path="settings" element={<div>Pengaturan</div>} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminPage