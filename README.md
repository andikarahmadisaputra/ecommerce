# 🛍️ Ecommerce

## 📄 Deskripsi
Aplikasi ini dibuat untuk memenuhi tugas Final Project Phase 1. Merupakan sistem e-commerce sederhana berbasis web dengan fitur manajemen produk, kategori, dan pengguna.

## 👥 Anggota Tim
- Andi Moh Apriansyah
- Andika Rahmadi Saputra

## 🛠️ Dibuat Dengan
- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [EJS Template Engine](https://ejs.co/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [connect-flash](https://www.npmjs.com/package/connect-flash)

## 🚀 Cara Menjalankan Aplikasi

  1. **Clone repository**
     ```bash
     git clone https://github.com/andikarahmadisaputra/ecommerce.git
     cd ecommerce

  2. **Install dependencies**
     ```bash
     npm install

  3. **Atur environment file**
     - Salin `.env.example` menjadi `.env`
     - Isi konfigurasi seperti `DB_USER`, `DB_PASS`, `DB_NAME`, dll.

  4. Setup database
     ```bash
     npx sequelize-cli db:create
     npx sequelize-cli db:migrate
     npx sequelize-cli db:seed:all
  
  5. Jalankan server
     ```bash
     npm run dev
  
  6. Buka di browser
     ```bash
     http://localhost:3000

## 📦 Fitur Utama
   - Autentikasi dengan bcrypt dan session
   - Role-based access: Admin, Seller, Buyer
   - CRUD Produk dan Kategori
   - Relasi Many-to-Many: Produk ↔ Kategori
   - Manajemen User & Role
   - Tampilan sederhana dengan EJS

## 📁 Struktur Folder
   ```arduino
   .
   ├── config/
   ├── controllers/
   ├── data/
   ├── helpers/
   ├── middlewares/
   ├── migrations/
   ├── models/
   ├── routes/
   ├── seeders/
   ├── views/
   ├── .env
   ├── .gitignore
   ├── app.js
   ├── package-lock.json
   ├── package.json
   ├── readme.md
   └── schema.drawio.png

