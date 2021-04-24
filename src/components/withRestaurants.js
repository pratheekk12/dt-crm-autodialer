import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CRUD_RESTAURANTS } from 'src/modules/admin/utils/endpoints';
import CommonAlert from './CommonAlert';
import Spinner from './Spinner';

const withRestaurants = WrappedComponent => props => {
  const [showError, setShowError] = useState(false);
  const [restaurants, setRestaurants] = useState(false);
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
        const res = await axios.get(CRUD_RESTAURANTS);
        setRestaurants(res.data);
    } catch (err) {
      setShowError(true);
      console.log(err);
    }
  }

  return showError ? (
    <CommonAlert />
  ) : restaurants ? (
    <WrappedComponent {...props} restaurants={restaurants} />
  ) : (
    <Spinner />
  );
};

export default WrapperComponent => (withRestaurants(WrapperComponent));
