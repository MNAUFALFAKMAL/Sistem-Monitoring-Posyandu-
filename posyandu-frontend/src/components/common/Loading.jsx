import React from 'react'

const Loading = ({ message = 'Memuat data...' }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p className="mt-2 text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export default Loading