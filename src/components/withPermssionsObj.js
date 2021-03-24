import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  permissions: state.permissions
});

const withPermssionsObj = WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.propTypes = {};

  return hocComponent;
};

export default WrapperComponent =>
  connect(mapStateToProps)(withPermssionsObj(WrapperComponent));
