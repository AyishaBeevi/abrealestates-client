// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { memo, useRef } from "react";

// /* ---------- Internal marker handler ---------- */
// function LocationMarker({ onPick }) {
//   const markerRef = useRef(null);

//   useMapEvents({
//     click(e) {
//       const coords = [e.latlng.lng, e.latlng.lat]; // ✅ [lng, lat]
//       onPick(coords);
//     },
//   });

//   return null;
// }

// /* ---------- MAIN COMPONENT ---------- */
// function AgentMapPickerComponent({ onPick }) {
//   return (
//     <div className="h-[350px] w-full rounded-xl overflow-hidden border">
//       <MapContainer
//         center={[12.9716, 77.5946]} // default Bangalore
//         zoom={13}
//         scrollWheelZoom={true}
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


// const MemoMapPicker = memo(AgentMapPickerComponent);

// export default MemoMapPicker;
