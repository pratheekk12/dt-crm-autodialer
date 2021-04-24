import React from 'react';
import RouteSwitch from './RouteSwitch';
// Used only to create multilevel nested routes
export default function EmptyRouteContainer({ routes }) {
  return <RouteSwitch routes={routes} />;
}
