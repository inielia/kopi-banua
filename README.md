# Kopi Banua - Landing Page UMKM

Tugas 1 Pemrograman Web 1 - S1 Sistem Informasi FTI UNISKA MAB

**Nama**  : Eliatul Jannah 
**NPM**   : 2510020060
**Tautan**: https://namaanda.github.io/kopi-banua/

## Deskripsi
Landing page untuk Kopi Banua, kedai kopi rumahan di Banjarmasin yang
berdiri sejak 2021. Halaman menampilkan profil usaha, menu favorit dan
menu lengkap dengan filter kategori, jam buka, galeri foto dan video,
testimoni pelanggan dengan form ulasan, kontak beserta peta lokasi,
promo, dan form pemesanan dengan simulasi pembayaran.

## Teknologi
- HTML5 semantik (header, nav, main, section, article, aside, footer, dialog)
- CSS3 (Flexbox, Grid, variabel CSS, media query, mobile-first)
- JavaScript (vanilla, tanpa framework)
- Google Fonts: Inter dan Poppins

## Fitur
1. Navigasi lengket (sticky) dan menu hamburger pada layar ponsel
2. Hero dua kolom dengan tombol ajakan (Pesan Sekarang dan Lihat Menu)
3. Kartu menu favorit dengan efek hover
4. Menu lengkap (17 item) dalam pop-up dengan filter kategori:
   Coffee, Non-Coffee, Makanan, dan Camilan
5. Form pemesanan dengan keranjang: tambah atau kurangi jumlah,
   subtotal, ongkos kirim, dan total otomatis
6. Pilihan pengambilan: pick-up atau delivery (ongkos kirim Rp 10.000)
7. Simulasi pembayaran: QRIS, GoPay, OVO, dan transfer bank
8. Galeri foto dan video dengan CSS Grid
9. Form ulasan dengan rating bintang, ulasan disimpan di localStorage
10. Kontak dan peta lokasi berdampingan (Google Maps)
11. Tabel jam buka yang dapat digeser di layar sempit
12. Tombol WhatsApp mengambang pada layar ponsel
13. Tampilan responsif pada tiga ukuran: ponsel (di bawah 768px),
    tablet (768px ke atas), dan desktop (1024px ke atas)

## Catatan Penting
- **Pembayaran hanya simulasi.** Tidak ada uang yang diproses, dan nomor
  rekening serta e-wallet pada kode hanyalah contoh. Integrasi payment
  gateway asli (misalnya Midtrans atau Xendit) membutuhkan backend dan
  menjadi rencana pengembangan lanjutan.
- **Ulasan disimpan di localStorage browser.** Ulasan hanya terlihat di
  perangkat dan browser yang dipakai menulisnya, tidak dibagikan ke
  pengunjung lain. Agar tampil untuk semua pengunjung, diperlukan
  database seperti Firebase.

## Struktur Berkas
- index.html
- README.md
- css/style.css
- js/script.js
- img/ (logo, foto menu, galeri, video)
- dokumentasi/ (tangkapan layar 360px, 768px, dan 1440px)

## Cara Menjalankan
1. Unduh atau salin seluruh folder proyek.
2. Buka folder di VS Code, lalu jalankan dengan ekstensi Live Server,
   atau buka `index.html` langsung di browser.

## Rencana Lanjutan
- Menyimpan ulasan di database agar tampil untuk semua pengunjung
- Integrasi payment gateway asli dengan backend
- Foto yang berbeda untuk setiap item menu