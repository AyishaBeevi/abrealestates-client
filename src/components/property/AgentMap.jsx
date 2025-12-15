// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useState } from "react";

// function LocationMarker({ onPick }) {
//   const [pos, setPos] = useState(null);

//   useMapEvents({
//     click(e) {
//       const coords = {
//         lat: e.latlng.lat,
//         lng: e.latlng.lng,
//       };

//       setPos(coords);
//       onPick(coords); // ✅ object, not array
//     },
//   });

//   return pos ? <Marker position={[pos.lat, pos.lng]} /> : null;
// }

// export default function AgentMapPicker({ onPick }) {
//   return (
//     <div className="h-[350px] rounded-xl overflow-hidden border">
//       <MapContainer
//         center={[20.5937, 78.9629]}
//         zoom={5}
//         className="h-full w-full"
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker onPick={onPick} />
//       </MapContainer>
//     </div>
//   );
// }
