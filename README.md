<!-- ====================================================== -->
<!-- ================  SISTEM MONITORING POSYANDU ========== -->
<!-- ====================================================== -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:00C9FF,100:92FE9D&text=Sistem%20Monitoring%20Posyandu&fontSize=40&fontColor=ffffff&animation=twinkling&fontAlignY=40">
</p>

<div align="center">

# 🚀 Fullstack Application (Laravel API + React Vite)

Sistem digital untuk memantau data Posyandu, termasuk balita, ibu hamil, jadwal, laporan, dan manajemen kader & admin.

</div>

---

<br>

# 📌 **Tech Stack**

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-10-red?style=for-the-badge&logo=laravel">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Vite-Fast-purple?style=for-the-badge&logo=vite">
  <img src="https://img.shields.io/badge/TailwindCSS-UI%20Framework-06B6D4?style=for-the-badge&logo=tailwindcss">
  <img src="https://img.shields.io/badge/MySQL-Database-orange?style=for-the-badge&logo=mysql">
</p>

---

<br>

# 📚 **Daftar Isi**
- [📖 Deskripsi](#-deskripsi)  
- [📂 Struktur Project Utama](#-struktur-project-utama)  
- [🛠️ Instalasi Backend Laravel](#-instalasi-backend-laravel)  
- [🎨 Instalasi Frontend React](#-instalasi-frontend-+-react)  
- [🧩 Fitur-Fitur utama](#-fitur-fitur-utama)  
- [📡 Daftar API Endpoint](#-daftar-api-endpoint)  
- [📁 Struktur Folder Lengkap](#-struktur-folder-lengkap)  
- [⚡ Cara Menjalankan Fullstack](#-cara-menjalankan-fullstack)  
- [📄 License](#-license)

---

<br>

# 📖 **Deskripsi**

Sistem Monitoring Posyandu merupakan aplikasi **Fullstack Modern** yang digunakan untuk:

- Pendataan **balita**  
- Monitoring **ibu hamil**  
- Pengelolaan **jadwal kegiatan**  
- Sistem **pengaduan masyarakat**  
- Role **Admin & Kader**  
- Dashboard interaktif  
- API lengkap berbasis **Laravel + Sanctum**

Semua proses dirancang dengan UI modern + API clean.

---

<br>

# 📂 **Struktur Project Utama**

```
Sistem-Monitoring-Posyandu-/
 ├── posyandu-backend/     → Laravel API
 ├── posyandu-frontend/    → React + Vite
 └── README.md             → Dokumentasi utama
```

---

<br>

# 🛠️ **Instalasi Backend Laravel**

Masuk ke backend:

```sh
cd posyandu-backend
```

Install dependency:

```sh
composer install
```

Copy konfigurasi:

```sh
cp .env.example .env
php artisan key:generate
```

Buat database lokal: **posyandu**

Set `.env`:

```
DB_DATABASE=posyandu
DB_USERNAME=root
DB_PASSWORD=
```

Migrasi + Seeder:

```sh
php artisan migrate --seed
```

Jalankan backend:

```sh
php artisan serve
```

➡ Backend berjalan di: **http://127.0.0.1:8000**

---

<br>

# 🎨 **Instalasi Frontend React + Vite**

Masuk folder frontend:

```sh
cd posyandu-frontend
```

Install dependency:

```sh
npm install
```

Jalankan frontend:

```sh
npm run dev
```

➡ Frontend berjalan di: **http://localhost:5173**

---

<br>

# 🧩 **Fitur-Fitur Utama**

### 🔐 Autentikasi
- Login dengan token Laravel Sanctum  
- Role admin & kader  
- Protected routing (React)

### 🧒 Data Balita
- CRUD lengkap  

### 🤰 Data Ibu Hamil
- Monitoring data & catatan kesehatan

### 📅 Jadwal Posyandu
- Admin & kader dapat mengatur jadwal

### 📢 Pengaduan Masyarakat
- User publik bisa mengirim laporan  
- Admin mereview

### 🎨 Frontend Modern
- UI cantik berbasis TailwindCSS  
- Komponen clean dan reusable  

---

<br>

# 📡 **Daftar API Endpoint**

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/login` | Login |
| POST | `/api/logout` | Logout |
| GET | `/api/balita` | List data balita |
| POST | `/api/balita` | Tambah balita |
| PUT | `/api/balita/{id}` | Edit balita |
| DELETE | `/api/balita/{id}` | Hapus balita |
| GET | `/api/ibu-hamil` | Data ibu hamil |
| GET | `/api/jadwal` | Jadwal posyandu |
| POST | `/api/pengaduan` | Kirim pengaduan |

---

<br>

# 📁 **Struktur Folder Lengkap**

### 📌 Backend (Laravel)
```
posyandu-backend/
 ├── app/
 │    ├── Http/
 │    ├── Models/
 │    └── Middleware/
 ├── database/
 │    ├── migrations/
 │    └── seeders/
 ├── routes/
 │    ├── api.php
 │    └── web.php
 └── resources/
```

### 📌 Frontend (React)
```
posyandu-frontend/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── context/
 │    ├── layouts/
 │    ├── services/
 │    └── utils/
 ├── index.html
 ├── package.json
 └── vite.config.js
```

---

<br>

# 🔌 **Contoh Konfigurasi Axios (Frontend)**

`src/services/api.js`:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

<br>

# ⚡ **Cara Menjalankan Fullstack**

### 1️⃣ Jalankan Backend
```sh
cd posyandu-backend
php artisan serve
```

### 2️⃣ Jalankan Frontend
```sh
cd posyandu-frontend
npm run dev
```

Aplikasi siap digunakan 🎉

---

<br>

# 📄 License

Proyek ini bebas digunakan untuk pembelajaran & pengembangan aplikasi.

---

<div align="center">
  
### ✨ Terima kasih sudah menggunakan Sistem Monitoring Posyandu ✨  
</div>
