let saldo = 100000;
let utang = 0; // Total utang
const MAX_PINJAMAN = 100000; // Batas maksimum pinjaman

// Urutan hasil pertandingan
const hasilPertandingan = [true, true, false, true, true, false, true, false, false, true, false, false, false];
let index = 0; // Index untuk melacak hasil pertandingan

document.getElementById('taruhBtn').addEventListener('click', function() {
    const taruhanInput = document.getElementById('taruhan');
    const taruhan = parseInt(taruhanInput.value);
    const hasilText = document.getElementById('hasil');

    if (isNaN(taruhan) || taruhan <= 0) {
        hasilText.textContent = "Masukkan jumlah taruhan yang valid.";
        return;
    }

    if (taruhan > saldo) {
        hasilText.textContent = "Saldo tidak cukup!";
        return;
    }

    // Ambil hasil pertandingan sesuai urutan
    const hasil = hasilPertandingan[index];
    index++; // Pindah ke hasil berikutnya

    if (index >= hasilPertandingan.length) {
        index = 0; // Reset index jika sudah mencapai akhir
    }

    if (hasil) {
        saldo += taruhan; // Menang
        hasilText.textContent = "Anda menang! Saldo baru: " + saldo;
    } else {
        saldo -= taruhan; // Kalah
        hasilText.textContent = "Anda kalah! Saldo baru: " + saldo;
    }

    document.getElementById('saldo').textContent = "Saldo: " + saldo;
    taruhanInput.value = ''; // Reset input
});

// Shortcut untuk taruhan 5000
document.getElementById('shortcutBtn').addEventListener('click', function() {
    document.getElementById('taruhan').value = 5000; // Set input taruhan ke 5000
});

// Tambahkan button pinjam uang
const pinjamBtn = document.createElement('button');
pinjamBtn.textContent = 'Pinjam Uang';
pinjamBtn.addEventListener('click', function() {
    const pinjamInput = document.getElementById('pinjam');
    const pinjam = parseInt(pinjamInput.value);

    if (isNaN(pinjam) || pinjam <= 0) {
        alert("Masukkan jumlah pinjaman yang valid.");
        return;
    }

    if (pinjam > MAX_PINJAMAN) {
        alert("Anda melebihi batas maksimal pinjaman: " + MAX_PINJAMAN);
        return;
    }

    utang += pinjam;
    saldo += pinjam;
    document.getElementById('saldo').textContent = "Saldo: " + saldo + ", Utang: " + utang;
    pinjamInput.value = ''; // Reset input
});

// Tambahkan input pinjam uang
const pinjamInput = document.createElement('input');
pinjamInput.type = 'number';
pinjamInput.id = 'pinjam';
pinjamInput.placeholder = 'Jumlah pinjaman';

// Tambahkan elemen-elemen baru ke halaman
document.body.appendChild(pinjamBtn);
document.body.appendChild(pinjamInput);

// Tambahkan button bayar utang
const bayarHutangBtn = document.createElement('button');
bayarHutangBtn.textContent = 'Bayar Hutang';
bayarHutangBtn.addEventListener('click', function() {
    if (utang <= 0) {
        alert("Anda tidak memiliki hutang.");
        return;
    }

    if (saldo < utang) {
        alert("Saldo tidak cukup untuk membayar hutang.");
        return;
    }

    const bayar = Math.min(saldo, utang);
    saldo -= bayar;
    utang -= bayar;
    document.getElementById('saldo').textContent = "Saldo: " + saldo + ", Utang: " + utang;
});

// Tambahkan button bayar hutang ke halaman
document.body.appendChild(bayarHutangBtn);