

//document.addEventListener('DOMContentLoaded', () => {
  const predictForm = document.getElementById('predictForm');
  const previewImg = document.getElementById('previewImg');
  const waitingToPredicting = document.getElementById('waitingToPredicting');
  const predictionError = document.getElementById('predictionError');
  const resultContainer = document.getElementById('result');
  const latestResultContainer = document.getElementById('latestResult');
  const historyList = document.getElementById('historyList');
  const noHistoryMessage = document.getElementById('noHistoryMessage');



  // Fungsi untuk menangani prediksi
  predictForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    predictionError.textContent = '';
    resultContainer.innerHTML = '';
    showElement(waitingToPredicting);

    const formData = new FormData(predictForm);

    try {
      const response = await PredictAPI.predict(formData);

      if (response.status === 'success') {
        const { nama_tanaman, nama_penyakit, penanganan } = response.data;
        resultContainer.innerHTML = `
          <h3>Hasil Prediksi:</h3>
          <p><strong>Tanaman:</strong> ${nama_tanaman}</p>
          <p><strong>Penyakit:</strong> ${nama_penyakit}</p>
          <p><strong>Penanganan:</strong> ${penanganan}</p>
        `;
      } else {
        predictionError.textContent = response.message || 'Terjadi kesalahan pada prediksi.';
      }
    } catch (error) {
      predictionError.textContent = 'Gagal memproses prediksi. Coba lagi.';
    } finally {
      hideElement(waitingToPredicting);
    }
  });

  // Fungsi untuk mengambil prediksi terbaru
  const loadLatestPrediction = async () => {
    try {
      const response = await PredictAPI.getLatestPrediction();

      if (response.status === 'success') {
        const { nama_tanaman, nama_penyakit, penanganan } = response.data;
        latestResultContainer.innerHTML = `
          <h3>Prediksi Terbaru:</h3>
          <p><strong>Tanaman:</strong> ${nama_tanaman}</p>
          <p><strong>Penyakit:</strong> ${nama_penyakit}</p>
          <p><strong>Penanganan:</strong> ${penanganan}</p>
        `;
      }
    } catch (error) {
      console.error('Gagal memuat prediksi terbaru:', error);
    }
  };

  // Fungsi untuk memuat riwayat prediksi
  const loadHistory = async () => {
    try {
      const response = await PredictAPI.getHistory();

      if (response.status === 'success' && response.data.length > 0) {
        noHistoryMessage.style.display = 'none';
        historyList.innerHTML = '';

        response.data.forEach((history) => {
          const { nama_tanaman, nama_penyakit, desc_solusi, image, tgl_history } = history;
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <div class="history-item">
              <img src="${image}" alt="History Image" />
              <div>
                <p><strong>Tanaman:</strong> ${nama_tanaman}</p>
                <p><strong>Penyakit:</strong> ${nama_penyakit}</p>
                <p><strong>Solusi:</strong> ${desc_solusi}</p>
                <p><strong>Tanggal:</strong> ${new Date(tgl_history).toLocaleDateString()}</p>
              </div>
            </div>
          `;
          historyList.appendChild(listItem);
        });
      } else {
        noHistoryMessage.style.display = 'block';
      }
    } catch (error) {
      console.error('Gagal memuat riwayat prediksi:', error);
    }
  };

  // Memuat data awal
  loadLatestPrediction();
  loadHistory();



    const skinFileInput = document.getElementById('skinFile');



      // Fungsi untuk menampilkan pratinjau gambar
  skinFileInput.addEventListener('change', () => {
    const file = skinFileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
      };
      reader.readAsDataURL(file);
    }
  });
//});


document.addEventListener('DOMContentLoaded', () => {
  const predictForm = document.getElementById('predictForm');
  const skinFileInput = document.getElementById('skinFile');
  const previewImg = document.getElementById('previewImg');
  const waitingToPredicting = document.getElementById('waitingToPredicting');
  const predictionError = document.getElementById('predictionError');
  const result = document.getElementById('result');
  const historyList = document.getElementById('historyList');
  const noHistoryMessage = document.getElementById('noHistoryMessage');

  // Fungsi untuk menampilkan pratinjau gambar
  skinFileInput.addEventListener('change', () => {
    const file = skinFileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Fungsi untuk menangani prediksi
  predictForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    predictionError.textContent = '';
    result.innerHTML = '';
    showElement(waitingToPredicting);

    const formData = new FormData(predictForm);

    try {
      const response = await PredictAPI.predict(formData);

      if (response.status === 'success') {
        const { nama_tanaman, nama_penyakit, penanganan } = response.data;
        result.innerHTML = `
          <h3>Hasil Prediksi:</h3>
          <p><strong>Tanaman:</strong> ${nama_tanaman}</p>
          <p><strong>Penyakit:</strong> ${nama_penyakit}</p>
          <p><strong>Penanganan:</strong> ${penanganan}</p>
        `;
      } else {
        predictionError.textContent = response.message || 'Terjadi kesalahan pada prediksi.';
      }
    } catch (error) {
      predictionError.textContent = 'Gagal memproses prediksi. Coba lagi.';
    } finally {
      hideElement(waitingToPredicting);
    }
  });

  // Fungsi untuk memuat riwayat prediksi
  const loadHistory = async () => {
    try {
      const response = await PredictAPI.getHistory();

      if (response.status === 'success' && response.data.length > 0) {
        noHistoryMessage.style.display = 'none';
        historyList.innerHTML = '';

        response.data.forEach((history) => {
          const { nama_tanaman, nama_penyakit, desc_solusi, image, tgl_history } = history;
          const listItem = document.createElement('li');
          listItem.className = 'history-item';
          listItem.innerHTML = `
            <img src="${image}" alt="History Image" />
            <div>
              <p><strong>Tanaman:</strong> ${nama_tanaman}</p>
              <p><strong>Penyakit:</strong> ${nama_penyakit}</p>
              <p><strong>Solusi:</strong> ${desc_solusi}</p>
              <p><strong>Tanggal:</strong> ${new Date(tgl_history).toLocaleDateString()}</p>
            </div>
          `;
          historyList.appendChild(listItem);
        });
      } else {
        noHistoryMessage.style.display = 'block';
      }
    } catch (error) {
      console.error('Gagal memuat riwayat prediksi:', error);
      noHistoryMessage.textContent = 'Gagal memuat riwayat.';
      noHistoryMessage.style.display = 'block';
    }
  };

  // Memuat riwayat saat halaman selesai dimuat
  loadHistory();
});
