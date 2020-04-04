import { gql } from "apollo-boost";

export const DRIVERS = gql`
query($count: Int)
{
  drivers(count: $count) {
    pickup_eta,drivers {
      driver_id,location{latitude,longitude,bearing}
    }
  }
}
`;