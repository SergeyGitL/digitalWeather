import React, { useState } from "react";
import L from 'leaflet';
import { TileLayer, Marker, Popup, MapContainer, useMapEvents } from "react-leaflet";
import '../styles/Map.css'
import axios from 'axios'


// указываем путь к файлам marker
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";



const MapComponent = () => {
  const [weather, setWeather] = useState('')
  const [location, setLocation] = useState({ lat: 51.5085, lng: -0.1257 })

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=0343db581bbcb31d163aa3568cfba8e9`


  async function searchedLocation() {
    await axios.get(url)
      .then((response) => {
        setWeather(response.data)
      })
      .catch(console.error())
  }

  const HandleClickMap = () => {
    useMapEvents({
      click(e) {
        setLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        })
        if (location) {
          searchedLocation()
        }
      }
    })
    return null
  }


  return (
    <MapContainer center={location} zoom={8} scrollWheelZoom={true} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HandleClickMap />
      {weather.main
        ? <div>
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              <div>
                <div>temperature: {weather.main.temp} ℉</div>
                <div>feels like: {weather.main.feels_like} ℉</div>
                <div>pressure: {weather.main.pressure} </div>
              </div>
            </Popup>
          </Marker>
        </div>
        : null}
    </MapContainer>
  );
}


export default MapComponent;