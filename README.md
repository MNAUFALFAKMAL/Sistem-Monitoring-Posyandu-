📘 Sistem Monitoring Posyandu – Full Documentation

Aplikasi Sistem Monitoring Posyandu terdiri dari 2 bagian:

Backend → Laravel 10 (REST API)

Frontend → React + Vite + TailwindCSS

Dokumentasi ini memuat seluruh panduan instalasi, fitur, struktur folder, dan API.

🌐 1. Project Overview

Sistem ini dibuat untuk:

Monitoring data Balita

Monitoring data Ibu Hamil

Manajemen Jadwal Posyandu

Sistem Pengaduan Masyarakat

Multi role: Admin, Kader, Publik

Backend API menggunakan Laravel Sanctum

Frontend menggunakan React dengan Vite

🛠 2. Instalasi Project (Root)

Clone repository ini:

git clone https://github.com/MNAUFALFAKMAL/Sistem-Monitoring-Posyandu-.git
cd Sistem-Monitoring-Posyandu-


Project terdiri dari:

posyandu-backend/   → Laravel REST API
posyandu-frontend/  → React + Vite

🚀 3. Backend – Laravel API
📌 Lokasi: posyandu-backend/
🔧 Instalasi Backend
1. Masuk ke folder backend
cd posyandu-backend

2. Install dependency PHP
composer install

3. Copy file environment
cp .env.example .env

4. Generate key
php artisan key:generate

5. Buat database di MySQL

Nama rekomendasi:

posyandu

6. Edit konfigurasi database di .env
DB_DATABASE=posyandu
DB_USERNAME=root
DB_PASSWORD=

7. Jalankan migration + seeder
php artisan migrate --seed

8. Jalankan server
php artisan serve


Akses API:
http://127.0.0.1:8000

⚙ Fitur Backend

Login & autentikasi (Laravel Sanctum)

CRUD Data Balita

CRUD Ibu Hamil

CRUD Jadwal

Sistem Pengaduan

Middleware role (Admin / Kader)

Email Notification (opsional)

🧪 Contoh API Endpoint
Method	Endpoint	Keterangan
POST	/api/login	Login user
POST	/api/logout	Logout
GET	/api/balita	List balita
POST	/api/balita	Tambah balita
GET	/api/jadwal	List jadwal
POST	/api/pengaduan	Kirim pengaduan
📂 Struktur Folder Backend
posyandu-backend/
 ├── app/
 ├── bootstrap/
 ├── config/
 ├── database/
 │    ├── migrations/
 │    └── seeders/
 ├── public/
 ├── resources/
 ├── routes/
 │    ├── api.php
 │    └── web.php
 └── vendor/

🎨 4. Frontend – React + Vite
📌 Lokasi: posyandu-frontend/
🔧 Instalasi Frontend
1. Masuk ke folder
cd posyandu-frontend

2. Install dependency
npm install

3. Jalankan aplikasi
npm run dev


Akses frontend:
http://localhost:5173

⚙ Fitur Frontend

Login (berbasis token Sanctum)

Protected route (admin/kader)

Dashboard admin

Dashboard kader

CRUD balita & ibu hamil

Kelola jadwal

Pengaduan masyarakat

Axios service modular

TailwindCSS modern UI

📂 Struktur Folder Frontend
posyandu-frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── context/
 │    ├── layouts/
 │    ├── services/
 │    └── utils/
 ├── public/
 ├── index.html
 ├── package.json
 └── vite.config.js

🔌 5. Konfigurasi Axios (Frontend → Backend)

File service axios biasanya seperti:

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default api;


Token dari login disimpan di:

localStorage


dan dikirim via axios interceptor.

🔑 6. Role System
Role	Hak akses
Admin	Full akses seluruh menu
Kader	Mengelola data posyandu
Publik	Kirim pengaduan & lihat jadwal
📦 7. Struktur Project (Root)
Sistem-Monitoring-Posyandu-/
 ├── posyandu-backend/    → Laravel API
 ├── posyandu-frontend/   → React + Vite
 ├── README.md            → dokumentasi ini
 └── .gitignore

📄 8. License

Project ini bebas digunakan untuk pembelajaran dan tugas.
