'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {LatLngExpression, Icon} from 'leaflet';

const position: LatLngExpression = [39.680103, 66.908382];

const customIcon = new Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function SimpleMap() {
  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{height: '400px', width: '100%', border: '4px solid #fff'}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker position={position} icon={customIcon}>
        <Popup>Мы здесь 🌍</Popup>
      </Marker>
    </MapContainer>
  );
}
