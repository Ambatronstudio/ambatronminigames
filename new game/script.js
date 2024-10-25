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

    document.getElementById('saldo').textContent = saldo;
    taruhanInput.value = ''; // Reset input
});

// Shortcut untuk taruhan 5000
document.getElementById('shortcutBtn').addEventListener('click', function() {
    document.getElementById('taruhan').value = 5000; // Set input taruhan ke 5000
});

// Tambahkan button pinjam uang
document.getElementById('pinjamBtn').addEventListener('click', function() {
    const pinjamInput = document.getElementById('pinjam');
    const pinjam = parseInt(pinjamInput.value);
    const pinjamSound = document.getElementById('pinjamSound');

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
    document.getElementById('saldo').textContent = saldo;
    document.getElementById('utang').textContent = utang;

    // Putar suara pinjam
    pinjamSound.play();

    pinjamInput.value = ''; // Reset input
});

// Tambahkan button bayar utang
document.getElementById('bayarHutangBtn').addEventListener('click', function() {
    if (utang <= 0) {
        alert("Anda tidak memiliki hutang.");
        return;
    }

    const bayar = prompt("Masukkan jumlah yang ingin dibayar:");

    if (bayar === null) return; // Jika pengguna membatalkan

    const bayarAmount = parseInt(bayar);

    if (isNaN(bayarAmount) || bayarAmount <= 0) {
        alert("Masukkan jumlah yang valid untuk dibayar.");
        return;
    }

    if (bayarAmount > saldo) {
        alert("Saldo tidak cukup untuk membayar utang.");
        return;
    }

    if (bayarAmount > utang) {
        alert("Jumlah yang dibayar melebihi total utang.");
        return;
    }

    saldo -= bayarAmount;
    utang -= bayarAmount;
    document.getElementById('saldo').textContent = saldo;
    document.getElementById('utang').textContent = utang;

    alert("Anda telah membayar: " + bayarAmount);
});