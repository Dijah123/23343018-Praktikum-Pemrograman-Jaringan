const request = require('postman-request')
const urlCuaca =
'http://api.weatherstack.com/current?access_key=dec7c5d36523aadee263f000020a9bb8&query=-0.89368,%20100.35848'
request({ url: urlCuaca, json: true }, (error, response) => {
    if (error) {
        console.log('Tidak bisa terhubung ke Weatherstack!');
    } else if (response.body.error) {
        console.log('Lokasi cuaca tidak ditemukan!');
    } else {
        const data = response.body.current;
        console.log(`Saat ini suhu di Padang mencapai ${data.temperature} derajat celcius.`);
        console.log(`Kemungkinan terjadinya hujan adalah ${data.precip}%`);
    }
});