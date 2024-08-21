export const haversine = (coords1: AppLocation, coords2: AppLocation) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Bán kính Trái Đất tính bằng km
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c * 1000; // Khoảng cách tính bằng mét
  return d;
};