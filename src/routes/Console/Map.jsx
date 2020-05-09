import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import s from "./styles.module.scss";

const LABELS = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";

const getPositions = data =>
  data.intervals.map(({ long, lat }) => ({ lat, lng: long }));

const getCenter = positions => {
  const { lat, lng } = positions.reduce(
    (prev, curr) => ({
      lat: prev.lat + curr.lat,
      lng: prev.lng + curr.lng
    }),
    { lat: 0, lng: 0 }
  );

  return {
    lat: lat / positions.length,
    lng: lng / positions.length
  };
};

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyABKlKT4Uz_yqLDkV89BDfYyYq-OoIFE8Y",
    loadingElement: <div className={s.containerMap} />,
    containerElement: <div className={s.containerMap} />,
    mapElement: <div className={s.containerMap} />
  }),
  withScriptjs,
  withGoogleMap
)(({ data }) => {
  const positions = data ? getPositions(data) : [];

  const markers = positions.map((position, i) => (
    <Marker
      key={`${position.lat}-${position.lng}`}
      position={position}
      label={LABELS[i]}
    />
  ));

  const center = data ? getCenter(positions) : { lat: -34.397, lng: 150.644 };

  return (
    <GoogleMap defaultZoom={8} center={center} defaultCenter={center}>
      {markers}
    </GoogleMap>
  );
});

export default Map;
