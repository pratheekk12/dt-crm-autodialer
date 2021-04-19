import React from 'react';
import PropTypes from 'prop-types';
import RouteSwitch from 'src/components/RouteSwitch';
import { connect } from 'react-redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import getDashboardModule from '../redux/module';

function View({ routes }) {
  return (
    <DynamicModuleLoader modules={[getDashboardModule()]}>
      <RouteSwitch routes={routes} />
    </DynamicModuleLoader>
  );
}

View.propTypes = {
  routes: PropTypes.array
};

const mapStateToProps = state => ({
  // Added admin just for testing
  accountType: state.accountType || 'ADMIN'
});

export default connect(mapStateToProps)(View);
