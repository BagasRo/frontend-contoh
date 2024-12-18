document.addEventListener('DOMContentLoaded', () => {
  const predictForm = document.getElementById('predictForm');
  const skinFileInput = document.getElementById('skinFile');
  const previewImg = document.getElementById('previewImg');
  const waitingToPredicting = document.getElementById('waitingToPredicting');
  const predictionError = document.getElementById('predictionError');
  const resultContainer = document.getElementById('result');
  const historyList = document.getElementById('historyList');
  const noHistoryMessage = document.getElementById('noHistoryMessage');

  /**
   * Fungsi untuk memuat riwayat prediksi dari backend
   */
  const loadHistory = async () => {
    try {
      const response = await PredictAPI.getHistory();

      if (response.status === 'success' && response.data.length > 0) {
        noHistoryMessage.style.display = 'none';
        historyList.innerHTML = '';

        response.data.forEach((item) => {
          const listItem = document.createElement('li');
          listItem.classList.add('history-item');

          listItem.innerHTML = `
            <div class="history-image">
              <img src="${item.image}" alt="${item.nama_tanaman}" />
            </div>
            <div class="history-details">
              <p><strong>Tanaman:</strong> ${item.nama_tanaman}</p>
              <p><strong>Penyakit:</strong> ${item.nama_penyakit}</p>
              <p><strong>Solusi:</strong> ${item.desc_solusi}</p>
              <p><strong>Tanggal:</strong> ${item.tgl_history}</p>
            </div>
          `;

          historyList.appendChild(listItem);
        });
      } else {
        noHistoryMessage.style.display = 'block';
        historyList.innerHTML = '';
      }
    } catch (error) {
      console.error('Gagal memuat riwayat:', error);
      noHistoryMessage.textContent = 'Terjadi kesalahan saat memuat riwayat.';
      noHistoryMessage.style.display = 'block';
    }
  };

  /**
   * Panggil fungsi untuk memuat riwayat saat halaman dimuat
   */
  loadHistory();


// Fungsi untuk menampilkan pratinjau gambar
skinFileInput.addEventListener('change', () => {
  const file = skinFileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.innerHTML = '';
  }
});

// Fungsi untuk menangani pengiriman form prediksi
const submitPrediction = async () => {
  const formData = new FormData();
  const file = skinFileInput.files[0]; // Ambil file yang dipilih melalui input
  
  if (file) {
    formData.append('file', file); // Menambahkan file ke FormData
    
    try {
      const response = await PredictAPI.sendImageForPrediction(formData); // Kirim ke backend
      if (response.status === 'success') {
        // Tampilkan hasil prediksi setelah berhasil
        resultContainer.innerHTML = `
          <h3>Hasil Prediksi:</h3>
          <p><strong>Tanaman:</strong> ${response.data.nama_tanaman}</p>
          <p><strong>Penyakit:</strong> ${response.data.nama_penyakit}</p>
          <p><strong>Penanganan:</strong> ${response.data.penanganan}</p>
        `;
      } else {
        // Tampilkan error jika gagal
        predictionError.textContent = response.message;
      }
    } catch (error) {
      console.error('Error saat mengirim gambar:', error);
      predictionError.textContent = 'Terjadi kesalahan saat mengirim gambar';
    }
  } else {
    predictionError.textContent = 'Mohon pilih gambar terlebih dahulu!';
  }
};

// Fungsi untuk menangani pengiriman form prediksi pada submit
predictForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Mencegah pengiriman form default
  
  // Cek apakah file telah dipilih
  if (!skinFileInput.files.length) {
    predictionError.textContent = 'Mohon pilih file gambar terlebih dahulu!';
    return; // Tidak lanjut jika tidak ada file yang dipilih
  }
  
  submitPrediction(); // Jika file ada, kirim untuk diprediksi
});

});
