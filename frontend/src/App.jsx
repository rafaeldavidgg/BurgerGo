import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';

import "./index.css";
import { getHamburgueserias } from "./services/api";

// Configurar iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function App() {
  const [hamburgueserias, setHamburgueserias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getHamburgueserias();
      setHamburgueserias(data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={6}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {hamburgueserias.map((hb) => (
            <Marker
              key={hb._id}
              position={[hb.coordenadas.lat, hb.coordenadas.lng]}
            >
              <Popup>
                <strong>{hb.nombre}</strong>
                <br />
                {hb.descripcion}
                <br />
                <small>{hb.direccion}</small>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default App;
