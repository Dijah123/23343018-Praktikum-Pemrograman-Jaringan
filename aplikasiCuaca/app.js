//const request = require('postman-request');
//const geocodeURL ='http://api.mapbox.com/geocoding/v5/mapbox.places/Universitas Negeri Padang.json?access_token=pk.eyJ1IjoiZGlqYWgwNTgiLCJhIjoiY21oNjg4YmE4MGFmbjJqbjEzcHZqM2lvaiJ9.MrRqCH1V8yIjpLX47c3Jxg&limit=1'
//request({ url: url }, (error, response) => {
//console.log(response)
//const data = JSON.parse(response.body)
//console.log(data)
//console.log(data.current)
// console.log(data.current.temperature)
//})

//request({ url: geocodeURL, json: true }, (error, response) => {
//    const latitude = response.body.features[0].center[1];
///    const longitude = response.body.features[0].center[0];
//    console.log(latitude, longitude);
//});
const request = require('postman-request');

// ===== Koordinat tetap Padang =====
const latitudePadang = -0.89368;
const longitudePadang = 100.35848;

// ===== Mapbox untuk data lokasi cuaca =====
const mapboxKey = 'pk.eyJ1IjoiZGlqYWgwNTgiLCJhIjoiY21oNjg4YmE4MGFmbjJqbjEzcHZqM2lvaiJ9.MrRqCH1V8yIjpLX47c3Jxg';
const lokasiWeather = 'padang';
const mapboxURLWeather = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(lokasiWeather)}.json?access_token=${mapboxKey}&limit=1`;

// ===== Tampilkan koordinat =====
console.log(`Koordinat lokasi anda adalah ${latitudePadang}, ${longitudePadang}`);

request({ url: mapboxURLWeather, json: true }, (err, resp) => {
    if (err) return console.log('Tidak bisa terhubung ke Mapbox API!');
    if (!resp.body.features || resp.body.features.length === 0) return console.log('Lokasi weather tidak ditemukan!');

    const featureWeather = resp.body.features[0];

    // ===== Tampilkan data lokasi =====
    console.log(`Data yang anda cari adalah: ${lokasiWeather}`);
    console.log(`Data yang ditemukan adalah: ${featureWeather.place_name}`);
    console.log(`Tipe lokasi adalah: ${featureWeather.place_type[0]}`);

    // ===== Cekcuaca (Weatherstack) =====
    const weatherKey = 'dec7c5d36523aadee263f000020a9bb8';
    const weatherURL = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitudePadang},${longitudePadang}`;

    request({ url: weatherURL, json: true }, (err2, resp2) => {
        if (err2) return console.log('Tidak bisa terhubung ke Weatherstack!');
        if (resp2.body.error) return console.log('Lokasi cuaca tidak ditemukan!');

        const weather = resp2.body.current;

        // ===== Tampilkan cuaca =====
        console.log(`Saat ini suhu di Padang mencapai ${weather.temperature} derajat celcius.`);
        console.log(`Kemungkinan terjadinya hujan adalah ${weather.precip}%`);
    });
});
