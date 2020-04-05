import { useRef, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { DRIVERS } from "../../graphql/queries";
import L from "leaflet";
import "leaflet-rotatedmarker";

const markerIcon = L.icon({
  iconUrl: require('../../assets/img/map-icon.png'),
  iconSize: [40, 20],
});

export function useMap() {
  const mapElement = useRef(null);
  const map = useRef(null);
  const markList = useRef([]);
  const [zoom, setZoom] = useState(14);
  const [pickupEta, setPickupEta] = useState(null);

  const [getDrivers, { loading, data }] = useLazyQuery(DRIVERS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (!data || !data.drivers) {
        return;
      }
      setPickupEta(data.drivers.pickup_eta);
      if (!map.current) {
        map.current = L.map(mapElement.current, {
          center: [51.502154677401634, -0.08508052507999317],
          zoom: zoom,
          minZoom: 8,
          layers: [
            L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }),
          ]
        });
        map.current.on('zoomend', (e) => {
          setZoom(map.current.getZoom())
        })
      }

      if (markList.current && markList.current.length > 0) {
        markList.current.forEach(markItem => {
          map.current.removeLayer(markItem);
        })
      }
      data.drivers.drivers.forEach((marker) => {
        const { latitude, longitude, bearing } = marker.location;
        markList.current.push(L.marker([latitude, longitude], { icon: markerIcon, rotationAngle: bearing })
          .addTo(map.current).bindPopup(
            // eslint-disable-next-line
            `<span><b>Driver ID:</b> ${marker.driver_id}</span>` + '<br/>'
            // eslint-disable-next-line
            + `<span><b>Latitude:</b> ${latitude}</span>` + '<br/>'
            // eslint-disable-next-line
            + `<span><b>Longitude:</b> ${longitude}</span>`));
      });
    }
  });

  return { mapElement, zoom, getDrivers, loading, pickupEta, data };
}