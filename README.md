# 🚀 MBC Backend

Backend untuk landing page **MBC Laboratory** yang menangani pengiriman email dari form kontak. Dibangun dengan **Node.js + Express** dan mendukung deployment ke server dengan konfigurasi CORS dan SSL.

---

## 🗂️ Struktur Proyek

```
mbc_backend/
├── node_modules/
├── .env               
├── package.json       
├── package-lock.json
└── server.js          
```

---

## ⚙️ Teknologi yang Digunakan

- [Express.js](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)

---

## 📦 Instalasi Lokal

1. **Clone repositori:**

```bash
git clone https://github.com/username/mbc_backend.git
cd mbc_backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Buat file `.env` di root folder:**

```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_ORIGIN=http://localhost:5173
```

> ⚠️ Gunakan [Gmail App Password](https://support.google.com/mail/answer/185833?hl=en) jika autentikasi 2 langkah aktif.

4. **Jalankan server lokal:**

```bash
node server.js
```

Server akan berjalan di `http://localhost:5000`

---