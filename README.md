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
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [connect-flash](https://www.npmjs.com/package/connect-flash)
- [express-session](https://www.npmjs.com/package/express-session)

## 🚀 Cara Menjalankan Aplikasi

  1. **Clone repository**
     ```bash
     git clone https://github.com/andikarahmadisaputra/ecommerce.git
     cd ecommerce

  2. **Install dependencies**
     ```bash
     npm install

  3. Setup database
     ```bash
     npx sequelize-cli db:create
     npx sequelize-cli db:migrate
     npx sequelize-cli db:seed:all
  
  4. Jalankan server
     ```bash
     npm run dev
  
  5. Buka di browser
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
   ├── migrations/
   ├── models/
   ├── routes/
   ├── seeders/
   ├── views/
   ├── .gitignore
   ├── app.js
   ├── package-lock.json
   ├── package.json
   ├── readme.md
   └── schema.drawio.png

