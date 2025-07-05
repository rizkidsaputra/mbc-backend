# 🚀 MBC Backend

Backend untuk landing page **MBC Laboratory** yang menangani pengiriman email dari form kontak. Dibangun dengan **Node.js + Express**, didukung HTTPS, konfigurasi CORS, dan simulasi IDS (Snort).

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
- [CORS (via Nginx)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Snort IDS](https://www.snort.org/)

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

3. **Buat file `.env`:**
```env
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_ORIGIN=http://localhost:5173
```
> Gantilah FRONTEND_ORIGIN sesuai dengan alamat frontend saat dideploy

4. **Jalankan server lokal:**
```bash
node server.js
```

---

Jika Anda hanya ingin menjalankannya secara lokal, Anda tidak perlu mengikuti langkah deployment di bawah ini.

## ☁️ Deployment di Azure VPS (HTTPS + Nginx + IDS)

### 🔐 1. Konfigurasi HTTPS dengan Nginx + Let's Encrypt

Install:
```bash
sudo apt install nginx certbot python3-certbot-nginx -y
```

Sebelum Konfigurasi Nginx, buatlah domain / subdomain untuk backendmu
Konfigurasi Nginx di (/etc/nginx/sites-available/yourConfiguration):
```nginx
server {
    server_name yourdomain.com;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
        if ($request_method = OPTIONS ) {
            add_header 'Access-Control-Allow-Origin' 'https://your-frontend.vercel.app';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Content-Type';
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain';
            return 204;
        }

        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        add_header 'Access-Control-Allow-Origin' 'https://your-frontend.vercel.app' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type' always;
    }
}

```
Jalankan Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/yourConfiguration /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Aktifkan HTTPS:
```bash
sudo certbot --nginx -d yourdomain.com
```

---

### 🛡️ 2. Simulasi IDS menggunakan Snort

**Instalasi:**
```bash
sudo apt install snort -y
```

**Cek interface:**
```bash
ip a
```

**Contoh Rule Lokal:**
Edit file:
```bash
sudo nano /etc/snort/rules/local.rules
```

Tambahkan:
```snort
alert tcp any any -> any 443 (msg:"HTTPS traffic detected to port 443"; sid:1000002; rev:1;)
```

**Jalankan Snort:**
```bash
sudo snort -i eth0 -c /etc/snort/snort.conf -A console
```

**Uji serangan:**
```bash
curl https://yourdomain.com
```

---

## ☁️ Deployment ke Server (Azure VPS)


1. Upload ke VPS
2. Jalankan dengan pm2:
```bash
pm2 start server.js
```

3. Pastikan port `443` dan `80` terbuka di Azure:
   - Masuk ke **Networking > Inbound Rules**
   - Tambahkan TCP 80 dan TCP 443 jika belum ada

---

## 🔗 Frontend
👉 [Frontend Repository (MBC Web)](https://github.com/rizkidsaputra/mbc-web)
