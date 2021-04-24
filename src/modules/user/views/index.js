import React from 'react';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import RouteSwitch from 'src/components/RouteSwitch';

export default function index({ routes }) {
  return (
    <div>
      <CustomBreadcrumbs />
      <RouteSwitch routes={routes} />
    </div>
  );
}
