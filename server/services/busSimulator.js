const busFleet = [
  { id: '543A', pos: { lat: 28.6304, lng: 77.2177 }, route: 'Anand Vihar ➔ CP', status: 'On Time' },
  { id: '420B', pos: { lat: 28.6448, lng: 77.2167 }, route: 'Kashmere Gate ➔ CP', status: 'Delayed (5m)' },
  { id: '101C', pos: { lat: 28.6139, lng: 77.2090 }, route: 'India Gate ➔ Rohini', status: 'On Time' },
  { id: '725D', pos: { lat: 28.5244, lng: 77.1855 }, route: 'Mehrauli ➔ Saket', status: 'Heavy Traffic' },
  { id: '900E', pos: { lat: 28.5847, lng: 77.2300 }, route: 'Nizamuddin ➔ Lajpat', status: 'On Time' }
];

export const startBusSimulation = (io) => {
  console.log('🚌 Fleet Simulation Active...');

  setInterval(() => {
    const updatedFleet = busFleet.map(bus => ({
      ...bus,
      pos: {
        lat: bus.pos.lat + (Math.random() - 0.5) * 0.0015,
        lng: bus.pos.lng + (Math.random() - 0.5) * 0.0015
      }
    }));

    io.emit('busLocation', updatedFleet);
  }, 3000);
};