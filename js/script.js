// ===== Data menu lengkap =====
const dataMenu = [
  { id: "kopi-susu", nama: "Kopi Susu Gula Aren", kategori: "coffee", harga: 18000, deskripsi: "Perpaduan kopi robusta, susu, dan gula aren." },
  { id: "americano", nama: "Americano Panas", kategori: "coffee", harga: 15000, deskripsi: "Kopi hitam pekat yang disajikan panas." },
  { id: "kopi-tubruk-banua", nama: "Kopi Tubruk Banua", kategori: "coffee", harga: 12000, deskripsi: "Kopi tubruk khas dengan aroma sangrai segar." },
  { id: "cappuccino", nama: "Cappuccino", kategori: "coffee", harga: 20000, deskripsi: "Espresso dengan susu berbusa yang lembut." },
  { id: "latte", nama: "Caffe Latte", kategori: "coffee", harga: 20000, deskripsi: "Espresso dengan susu steam yang creamy." },
  { id: "es-kopi-hitam", nama: "Es Kopi Hitam", kategori: "coffee", harga: 14000, deskripsi: "Robusta dingin yang segar dan tegas." },
  { id: "teh-tarik", nama: "Teh Tarik", kategori: "non-coffee", harga: 18000, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: "cokelat-panas", nama: "Cokelat Panas", kategori: "non-coffee", harga: 18000, deskripsi: "Cokelat pekat hangat untuk sore hari." },
  { id: "teh-lemon", nama: "Teh Lemon Es", kategori: "non-coffee", harga: 12000, deskripsi: "Teh dingin dengan perasan lemon segar." },
  { id: "matcha-latte", nama: "Matcha Latte", kategori: "non-coffee", harga: 22000, deskripsi: "Matcha dengan susu, manis dan lembut." },
  { id: "roti-bakar-srikaya", nama: "Roti Bakar Srikaya", kategori: "makanan", harga: 15000, deskripsi: "Roti bakar dengan selai srikaya manis." },
  { id: "nasi-kuning", nama: "Nasi Kuning Banjar", kategori: "makanan", harga: 20000, deskripsi: "Nasi kuning dengan lauk khas Banjar." },
  { id: "mie-goreng", nama: "Mie Goreng Spesial", kategori: "makanan", harga: 18000, deskripsi: "Mie goreng dengan telur dan sayuran." },
  { id: "pisang-goreng", nama: "Pisang Goreng", kategori: "camilan", harga: 12000, deskripsi: "Pisang goreng renyah, disajikan hangat." },
  { id: "kentang-goreng", nama: "Kentang Goreng", kategori: "camilan", harga: 15000, deskripsi: "Kentang goreng dengan saus sambal." },
  { id: "singkong-goreng", nama: "Singkong Goreng", kategori: "camilan", harga: 10000, deskripsi: "Singkong goreng gurih, teman ngopi." },
  { id: "amparan-tatak", nama: "Amparan Tatak", kategori: "camilan", harga: 10000, deskripsi: "Kue tradisional Banjar dari pisang dan santan." }
];

const namaKategori = {
  "coffee": "Coffee",
  "non-coffee": "Non-Coffee",
  "makanan": "Makanan",
  "camilan": "Camilan"
};

const metodePembayaran = {
  qris: {
    label: "QRIS",
    qr: true,
    petunjuk: [
      "Buka aplikasi mobile banking atau e-wallet yang mendukung QRIS.",
      "Pindai kode QR di atas.",
      "Pastikan nominal sesuai total, lalu konfirmasi pembayaran."
    ]
  },
  gopay: {
    label: "GoPay",
    qr: false,
    petunjuk: [
      "Buka aplikasi Gojek, pilih Bayar.",
      "Masukkan nomor tujuan 0811-5000-000 a.n. Kopi Banua (contoh).",
      "Isi nominal sesuai total, lalu konfirmasi."
    ]
  },
  ovo: {
    label: "OVO",
    qr: false,
    petunjuk: [
      "Buka aplikasi OVO, pilih Transfer.",
      "Masukkan nomor tujuan 0811-5000-000 a.n. Kopi Banua (contoh).",
      "Isi nominal sesuai total, lalu konfirmasi."
    ]
  },
  bank: {
    label: "Transfer Bank",
    qr: false,
    petunjuk: [
      "Transfer ke BCA 1234567890 a.n. Kopi Banua (contoh).",
      "Isi nominal sesuai total.",
      "Simpan bukti transfer."
    ]
  }
};

const ONGKIR = 10000;
const MAKS_JUMLAH = 20;
const keranjang = {};
let dataBayar = {};

function rupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function cariMenu(id) {
  return dataMenu.find(function (item) {
    return item.id === id;
  });
}

// ===== Menu hamburger (layar ponsel) =====
const tombol = document.querySelector(".tombol-menu");
const menu = document.querySelector("nav ul");

tombol.addEventListener("click", function () {
  const terbuka = menu.classList.toggle("tampil");
  tombol.setAttribute("aria-expanded", terbuka);
});

menu.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    menu.classList.remove("tampil");
    tombol.setAttribute("aria-expanded", "false");
  }
});

// ===== Elemen halaman =====
const form = document.querySelector("#pesan form");
const pilihanMenu = document.querySelector("#pilihan-menu");
const jumlahInput = document.querySelector("#jumlah");
const daftarPesanan = document.querySelector("#daftar-pesanan");
const blokAlamat = document.querySelector("#blok-alamat");
const alamat = document.querySelector("#alamat");

const dialogMenu = document.querySelector("#dialog-menu");
const daftarMenu = document.querySelector("#daftar-menu");
const statusMenu = document.querySelector("#status-menu");
const filterMenu = document.querySelector(".filter-menu");

const dialogBayar = document.querySelector("#dialog-bayar");
const isiBayar = document.querySelector("#isi-bayar");
const suksesBayar = document.querySelector("#sukses-bayar");
const petunjukBayar = document.querySelector("#petunjuk-bayar");

// ===== Pilihan menu pada form =====
dataMenu.forEach(function (item) {
  const opsi = document.createElement("option");
  opsi.value = item.id;
  opsi.textContent = item.nama + " - " + rupiah(item.harga);
  pilihanMenu.appendChild(opsi);
});

// ===== Keranjang pesanan =====
function pakaiDelivery() {
  return form.querySelector('input[name="pengambilan"]:checked').value === "delivery";
}

function hitungTotal() {
  let subtotal = 0;
  Object.keys(keranjang).forEach(function (id) {
    subtotal += cariMenu(id).harga * keranjang[id];
  });
  const ongkir = pakaiDelivery() && subtotal > 0 ? ONGKIR : 0;
  return { subtotal: subtotal, ongkir: ongkir, total: subtotal + ongkir };
}

function renderPesanan() {
  daftarPesanan.innerHTML = "";
  const daftarId = Object.keys(keranjang);

  if (daftarId.length === 0) {
    const kosong = document.createElement("li");
    kosong.className = "pesanan-kosong";
    kosong.textContent = "Belum ada pesanan. Pilih menu di atas atau buka Menu Lengkap.";
    daftarPesanan.appendChild(kosong);
  }

  daftarId.forEach(function (id) {
    const item = cariMenu(id);
    const baris = document.createElement("li");
    baris.className = "baris-pesanan";
    baris.innerHTML =
      '<span class="nama-pesanan">' + item.nama + "</span>" +
      '<span class="kontrol-jumlah">' +
      '<button type="button" data-aksi="kurang" data-id="' + id + '" aria-label="Kurangi ' + item.nama + '">&minus;</button>' +
      "<span>" + keranjang[id] + "</span>" +
      '<button type="button" data-aksi="tambah" data-id="' + id + '" aria-label="Tambah ' + item.nama + '">+</button>' +
      "</span>" +
      "<span>" + rupiah(item.harga * keranjang[id]) + "</span>";
    daftarPesanan.appendChild(baris);
  });

  const hitung = hitungTotal();
  document.querySelector("#subtotal").textContent = rupiah(hitung.subtotal);
  document.querySelector("#ongkir").textContent = rupiah(hitung.ongkir);
  document.querySelector("#total").textContent = rupiah(hitung.total);
}

function tambahKeKeranjang(id, jumlah) {
  keranjang[id] = Math.min((keranjang[id] || 0) + jumlah, MAKS_JUMLAH);
  renderPesanan();
}

function aturPengambilan() {
  const kirim = pakaiDelivery();
  blokAlamat.hidden = !kirim;
  alamat.required = kirim;
  renderPesanan();
}

document.querySelector("#tambah-pesanan").addEventListener("click", function () {
  const jumlah = parseInt(jumlahInput.value, 10);
  if (pilihanMenu.value === "") {
    alert("Pilih menu terlebih dahulu.");
    return;
  }
  if (isNaN(jumlah) || jumlah < 1) {
    alert("Jumlah minimal 1.");
    return;
  }
  tambahKeKeranjang(pilihanMenu.value, jumlah);
});

daftarPesanan.addEventListener("click", function (e) {
  const aksi = e.target.closest("button[data-aksi]");
  if (!aksi) {
    return;
  }
  const id = aksi.dataset.id;
  if (aksi.dataset.aksi === "tambah") {
    tambahKeKeranjang(id, 1);
  } else {
    keranjang[id] -= 1;
    if (keranjang[id] <= 0) {
      delete keranjang[id];
    }
    renderPesanan();
  }
});

form.addEventListener("change", function (e) {
  if (e.target.name === "pengambilan") {
    aturPengambilan();
  }
});

// ===== Menu lengkap (dialog dan filter) =====
function renderMenu(kategori) {
  daftarMenu.innerHTML = "";
  dataMenu.forEach(function (item) {
    if (kategori !== "semua" && item.kategori !== kategori) {
      return;
    }
    const kartu = document.createElement("article");
    kartu.className = "item-menu";
    kartu.innerHTML =
      '<span class="label-kategori">' + namaKategori[item.kategori] + "</span>" +
      "<h3>" + item.nama + "</h3>" +
      "<p>" + item.deskripsi + "</p>" +
      '<p class="harga">' + rupiah(item.harga) + "</p>" +
      '<button type="button" class="tombol-sekunder" data-id="' + item.id + '">Tambah ke Pesanan</button>';
    daftarMenu.appendChild(kartu);
  });
}

document.querySelector("#buka-menu-lengkap").addEventListener("click", function () {
  statusMenu.textContent = "";
  renderMenu("semua");
  dialogMenu.showModal();
});

filterMenu.addEventListener("click", function (e) {
  const pilihan = e.target.closest("[data-kategori]");
  if (!pilihan) {
    return;
  }
  filterMenu.querySelectorAll("[data-kategori]").forEach(function (tombolFilter) {
    const aktif = tombolFilter === pilihan;
    tombolFilter.classList.toggle("aktif", aktif);
    tombolFilter.setAttribute("aria-pressed", aktif);
  });
  statusMenu.textContent = "";
  renderMenu(pilihan.dataset.kategori);
});

daftarMenu.addEventListener("click", function (e) {
  const tambah = e.target.closest("button[data-id]");
  if (!tambah) {
    return;
  }
  tambahKeKeranjang(tambah.dataset.id, 1);
  statusMenu.textContent = cariMenu(tambah.dataset.id).nama + " ditambahkan ke pesanan.";
});

// Tutup dialog lewat tombol, tautan, atau klik di luar kotak
document.addEventListener("click", function (e) {
  const penutup = e.target.closest("[data-tutup]");
  if (penutup) {
    penutup.closest("dialog").close();
  }
  if (e.target.tagName === "DIALOG") {
    e.target.close();
  }
});

// ===== Pembayaran (simulasi) =====
function bukaPembayaran(nama) {
  const kode = form.querySelector('input[name="pembayaran"]:checked').value;
  const metode = metodePembayaran[kode];
  const hitung = hitungTotal();

  dataBayar = { nama: nama, metode: metode.label, total: hitung.total, kirim: pakaiDelivery() };

  document.querySelector("#bayar-nama").textContent = nama;
  document.querySelector("#bayar-metode").textContent = metode.label;
  document.querySelector("#bayar-total").textContent = rupiah(hitung.total);

  petunjukBayar.innerHTML = "";
  if (metode.qr) {
    const kotakQr = document.createElement("div");
    kotakQr.className = "kotak-qris";
    kotakQr.textContent = "QRIS contoh";
    petunjukBayar.appendChild(kotakQr);
  }
  const daftar = document.createElement("ol");
  metode.petunjuk.forEach(function (langkah) {
    const li = document.createElement("li");
    li.textContent = langkah;
    daftar.appendChild(li);
  });
  petunjukBayar.appendChild(daftar);

  isiBayar.hidden = false;
  suksesBayar.hidden = true;
  dialogBayar.showModal();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.querySelector("#nama").value.trim();
  const wa = document.querySelector("#wa").value.trim();

  if (nama.length < 3) {
    alert("Nama minimal 3 karakter.");
    return;
  }
  if (wa.length < 10) {
    alert("Nomor WhatsApp minimal 10 digit.");
    return;
  }
  if (Object.keys(keranjang).length === 0) {
    alert("Tambahkan minimal satu menu ke pesanan.");
    return;
  }

  bukaPembayaran(nama);
});

document.querySelector("#konfirmasi-bayar").addEventListener("click", function () {
  const tujuan = dataBayar.kirim ? "segera kami antar." : "siap diambil di kedai.";
  suksesBayar.textContent =
    "Terima Kasih, " + dataBayar.nama + "! Pembayaran " + dataBayar.metode +
    " Sebesar " + rupiah(dataBayar.total) + " Kami Terima. Pesanan Anda " + tujuan;

  isiBayar.hidden = true;
  suksesBayar.hidden = false;

  Object.keys(keranjang).forEach(function (id) {
    delete keranjang[id];
  });
  form.reset();
  aturPengambilan();
});

// ===== Tampilan awal =====
aturPengambilan();

// ===== Ulasan pelanggan =====
const KUNCI_ULASAN = "kopibanua-ulasan";
const dialogUlasan = document.querySelector("#dialog-ulasan");
const formUlasan = document.querySelector("#form-ulasan");
const daftarTestimoni = document.querySelector("#daftar-testimoni");
const ringkasanRating = document.querySelector("#ringkasan-rating");
const statusUlasan = document.querySelector("#status-ulasan");
const pesanUlasan = document.querySelector("#pesan-ulasan");

function bacaUlasan() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI_ULASAN)) || [];
  } catch (error) {
    return [];
  }
}

function simpanUlasan(daftar) {
  try {
    localStorage.setItem(KUNCI_ULASAN, JSON.stringify(daftar));
  } catch (error) {
    // Penyimpanan tidak tersedia, ulasan tetap tampil selama halaman terbuka
  }
}

function teksBintang(jumlah) {
  return "★".repeat(jumlah) + "☆".repeat(5 - jumlah);
}

function buatKartuUlasan(ulasan) {
  const kartu = document.createElement("blockquote");
  kartu.className = "kartu-menu testimoni";

  const bintang = document.createElement("span");
  bintang.className = "bintang";
  bintang.setAttribute("role", "img");
  bintang.setAttribute("aria-label", "Rating " + ulasan.rating + " dari 5");
  bintang.textContent = teksBintang(ulasan.rating);

  const isi = document.createElement("p");
  isi.textContent = ulasan.isi;

  const nama = document.createElement("cite");
  nama.textContent = ulasan.nama;

  kartu.appendChild(bintang);
  kartu.appendChild(isi);
  kartu.appendChild(nama);
  return kartu;
}

function perbaruiRingkasan(daftar) {
  if (daftar.length === 0) {
    ringkasanRating.hidden = true;
    return;
  }
  const jumlah = daftar.reduce(function (total, ulasan) {
    return total + ulasan.rating;
  }, 0);
  const rata = (jumlah / daftar.length).toFixed(1).replace(".", ",");
  ringkasanRating.textContent =
    "Rating dari pengunjung: " + rata + " dari 5 (" + daftar.length + " ulasan baru)";
  ringkasanRating.hidden = false;
}

function tampilkanUlasanTersimpan() {
  const daftar = bacaUlasan();
  daftar.forEach(function (ulasan) {
    daftarTestimoni.prepend(buatKartuUlasan(ulasan));
  });
  perbaruiRingkasan(daftar);
}

document.querySelector("#buka-ulasan").addEventListener("click", function () {
  pesanUlasan.textContent = "";
  statusUlasan.textContent = "";
  dialogUlasan.showModal();
});

formUlasan.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.querySelector("#ulasan-nama").value.trim();
  const isi = document.querySelector("#ulasan-isi").value.trim();
  const terpilih = formUlasan.querySelector('input[name="rating"]:checked');

  if (nama.length < 3) {
    pesanUlasan.textContent = "Nama minimal 3 karakter.";
    return;
  }
  if (!terpilih) {
    pesanUlasan.textContent = "Pilih rating bintang terlebih dahulu.";
    return;
  }
  if (isi.length < 10) {
    pesanUlasan.textContent = "Ulasan minimal 10 karakter.";
    return;
  }

  const ulasan = { nama: nama, rating: parseInt(terpilih.value, 10), isi: isi };
  const daftar = bacaUlasan();
  daftar.push(ulasan);
  simpanUlasan(daftar);

  daftarTestimoni.prepend(buatKartuUlasan(ulasan));
  perbaruiRingkasan(daftar);

  formUlasan.reset();
  pesanUlasan.textContent = "";
  dialogUlasan.close();
  statusUlasan.textContent = "Terima Kasih, " + nama + "! Ulasan Anda Sudah Ditambahkan.";
});

tampilkanUlasanTersimpan();