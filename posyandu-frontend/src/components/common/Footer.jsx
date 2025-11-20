import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Sistem Monitoring Posyandu Desa</h3>
            <p className="text-gray-400 text-sm">© 2023 - Hak Cipta Dilindungi</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Tentang
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Bantuan
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer