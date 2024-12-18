// TODO: Silakan sesuaikan BASE URL dari endpoint Anda
const BASE_URL = '';

const ENDPOINT = {
  predict: `${BASE_URL}/predict`,
  getHistory: `${BASE_URL}/history`,
};

class PredictAPI {
  static async predict(data) {
    const response = await fetch(ENDPOINT.predict, {
      method: 'POST',
      body: data,
      redirect: 'follow',
    });

    const json = await response.json();
    return json;
  }

  static async getHistory() {
    const response = await fetch(ENDPOINT.history, {
      method: 'GET',
    });
  
    const json = await response.json();
    return json;
  }
  
}
