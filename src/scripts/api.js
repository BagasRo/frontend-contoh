// TODO: Silakan sesuaikan BASE URL dari endpoint Anda
const BASE_URL = 'https://plantlens-916296790734.asia-southeast2.run.app';

const ENDPOINT = {
  predict: `${BASE_URL}/predict`,
  history: `${BASE_URL}/history`, // Ubah ini
};
class PredictAPI {
// Fungsi untuk mengirimkan gambar ke server dan mendapatkan hasil prediksi
static async sendImageForPrediction(formData) {
  try {
    const response = await fetch(ENDPOINT.predict, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi server');
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('Error saat mengirim gambar:', error);
    throw new Error('Gagal memproses gambar. Coba lagi.');
  }
}



  static async getHistory() {
    const response = await fetch(ENDPOINT.history, {
      method: 'GET',
    });

    const json = await response.json();
    return json;
  }
}

