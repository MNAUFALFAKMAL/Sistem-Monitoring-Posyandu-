export const ROLES = {
  ADMIN: 'admin',
  KADER: 'kader',
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const GENDER_OPTIONS = [
  { value: 'L', label: 'Laki-laki' },
  { value: 'P', label: 'Perempuan' },
]

export const STATUS_KEHAMILAN_OPTIONS = [
  { value: 'trimester_1', label: 'Trimester 1' },
  { value: 'trimester_2', label: 'Trimester 2' },
  { value: 'trimester_3', label: 'Trimester 3' },
]

export const STATUS_GIZI_OPTIONS = [
  { value: 'baik', label: 'Baik' },
  { value: 'kurang', label: 'Kurang' },
  { value: 'buruk', label: 'Buruk' },
]

export const STATUS_IMUNISASI_OPTIONS = [
  { value: 'lengkap', label: 'Lengkap' },
  { value: 'tidak_lengkap', label: 'Tidak Lengkap' },
  { value: 'belum', label: 'Belum' },
]

export const STATUS_VITAMIN_OPTIONS = [
  { value: 'sudah', label: 'Sudah' },
  { value: 'belum', label: 'Belum' },
]