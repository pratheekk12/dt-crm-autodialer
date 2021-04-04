import React from 'react';
import { connect } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import RouteSwitch from 'src/components/RouteSwitch';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';
import getAdminModule from './redux/module';

function View({ routes, userData, permissions }) {
  const isAdmin =
    userData?.role === 'admin' || permissions.admin.canAccessAdminPrivileges;
  return (
    <DynamicModuleLoader modules={[getAdminModule()]}>
      <CustomBreadcrumbs />
      <RouteSwitch
        routes={!isAdmin ? routes : []}
        redirectPath={!isAdmin ? '/admin/dashboard' : '/'}
      />
    </DynamicModuleLoader>
  );
}

const mapStateToProps = state => ({
  userData: state.userData,
  permissions: state.permissions
});

export default connect(mapStateToProps)(View);
