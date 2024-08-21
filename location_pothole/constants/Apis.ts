const Domain = 'https://7ef9-118-68-57-37.ngrok-free.app'
const Base = `${Domain}/api/pothole`
export const Api = {
    getMarkers: `${Base}`,
    analysis: `${Base}/analyst`,
    approveMarker: `${Base}/approve`,
}