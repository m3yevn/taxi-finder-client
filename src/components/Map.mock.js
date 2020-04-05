import { DRIVERS } from "../graphql/queries";

export const DRIVERS_MOCK_DATA = {
    "drivers": {
      "pickup_eta": 2,
      "drivers": [
        { "driver_id": "0-twmtu3rnsga", "location": { "latitude": 51.5024262728802, "longitude": -0.09443681323217822, "bearing": 349, "__typename": "Location" }, "__typename": "Driver" },
        { "driver_id": "1-aacibfhfahm", "location": { "latitude": 51.498336422030754, "longitude": -0.08555265958329143, "bearing": 314, "__typename": "Location" }, "__typename": "Driver" }],
      "__typename": "Drivers"
    }
};

export const DRIVERS_MOCK_QUERY = [
  {
    request: {
      query: DRIVERS
    },
    result: { data : DRIVERS_MOCK_DATA }
  }
];