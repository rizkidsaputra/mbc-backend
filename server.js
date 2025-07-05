const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// Aktifkan kode ini jika anda menjalankannya di lokal tanpa deploy ke vps
//app.use(cors({
//  origin: process.env.FRONTEND_ORIGIN || "*", 
//}));
//app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "rizkidsaputra9@gmail.com", //Ganti Ke email mu
    subject: `Pesan dari ${name}`,
    text: `
From   : ${name} <${email}>
Pesan  : ${message}

Dikirim dari: ${req.headers.origin || "Unknown"}
Waktu kirim : ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
    `.trim(),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Gagal mengirim email." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

