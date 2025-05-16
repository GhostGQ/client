'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {LatLngExpression} from 'leaflet';

const position: LatLngExpression = [41.34173809051719, 69.2433195579442]; // Ташкент

export default function SimpleMap() {
  return (
    <MapContainer
      center={position}
      zoom={17}
      scrollWheelZoom={false}
      style={{height: '400px', width: '100%', border: '4px solid #fff'}}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* <Marker position={position}>
        <Popup>Мы здесь 🌍</Popup>
      </Marker> */}
    </MapContainer>
  );
}
