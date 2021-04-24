import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Branches = ({ value }) => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const userData = useSelector(state => state.userData);
  const getRestaurants = () => {
    axios
      .get('/crm-route/restaurants')
      .then(res => {
        res.data.map(data => {
          userData.restaurants.map(restaurant => {
            if (restaurant === data._id) {
              setRestaurantsList(prev => [...prev, data]);
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRestaurants();
  }, []);
  return (
    <>
      {restaurantsList.length > 0 && (
        <Autocomplete
          id="branches"
          options={restaurantsList}
          onChange={(event, newValue) => {
            value(newValue);
          }}
          style={{ width: '100%', backgroundColor: 'white' }}
          getOptionLabel={option => option.restaurantName}
          renderInput={params => (
            <TextField {...params} label="Branch Name" variant="outlined" />
          )}
        />
      )}
    </>
  );
};

export default Branches;
