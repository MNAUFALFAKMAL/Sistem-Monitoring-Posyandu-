import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (dateString, formatString = 'dd MMMM yyyy') => {
  if (!dateString) return '-'
  try {
    return format(parseISO(dateString), formatString, { locale: id })
  } catch (error) {
    return dateString
  }
}

export const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  try {
    return format(parseISO(dateString), 'dd MMMM yyyy HH:mm', { locale: id })
  } catch (error) {
    return dateString
  }
}

export const formatTime = (timeString) => {
  if (!timeString) return '-'
  try {
    // If it's already in HH:mm format, return as is
    if (typeof timeString === 'string' && /^\d{2}:\d{2}$/.test(timeString)) {
      return timeString
    }
    // If it's a full datetime string, extract time part
    if (typeof timeString === 'string' && timeString.includes('T')) {
      const timePart = timeString.split('T')[1].split('.')[0]
      return timePart.substring(0, 5) // Get HH:mm
    }
    // Fallback for other formats
    const date = new Date(timeString)
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  } catch (error) {
    return timeString
  }
}

export const calculateAge = (birthDate) => {
  if (!birthDate) return '-'
  
  const today = new Date()
  const birth = new Date(birthDate)
  
  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()
  
  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }
  
  if (months < 0) {
    years--
    months += 12
  }
  
  if (years > 0) {
    return `${years} tahun ${months > 0 ? months + ' bulan' : ''}`
  } else if (months > 0) {
    return `${months} bulan ${days > 0 ? days + ' hari' : ''}`
  } else {
    return `${days} hari`
  }
}

export const calculatePregnancyAge = (firstDayOfLastPeriod) => {
  if (!firstDayOfLastPeriod) return '-'
  
  const today = new Date()
  const lastPeriod = new Date(firstDayOfLastPeriod)
  
  const diffTime = Math.abs(today - lastPeriod)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diffDays / 7)
  const days = diffDays % 7
  
  return `${weeks} minggu ${days} hari`
}

export const getStatusPregnancyTrimester = (firstDayOfLastPeriod) => {
  if (!firstDayOfLastPeriod) return '-'
  
  const today = new Date()
  const lastPeriod = new Date(firstDayOfLastPeriod)
  
  const diffTime = Math.abs(today - lastPeriod)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diffDays / 7)
  
  if (weeks <= 13) return 'Trimester 1'
  if (weeks <= 27) return 'Trimester 2'
  return 'Trimester 3'
}

export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}