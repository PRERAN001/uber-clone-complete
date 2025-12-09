export default function haversineDistance(coord1, coord2) {
  const R = 6371;

  // Handle both lat/lng and latitude/longitude property names
  const lat1 = (coord1.latitude || coord1.lat) * Math.PI / 180;
  const lon1 = (coord1.longitude || coord1.lng) * Math.PI / 180;
  const lat2 = (coord2.latitude || coord2.lat) * Math.PI / 180;
  const lon2 = (coord2.longitude || coord2.lng) * Math.PI / 180;

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a = Math.sin(dlat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dlon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
