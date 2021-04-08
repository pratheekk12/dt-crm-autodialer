import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CRUD_LOGIN } from 'src/modules/auth/utils/endpoints';
import MainLoader from './components/MainLoader';
import RouteSwitch from './components/RouteSwitch';
import TopBar from './components/TopBar';
import {
  setAccessLevels,
  setLoggedIn,
  setUserDetails,
  setAccountType
} from './redux/action';
import { ADMIN, USER, MANAGER, AREAMANAGER } from './redux/constants';
import routes from './routes';

function Main({
  isLoggedIn,
  classes,
  setUserDetailsMain,
  setLoggedInMain,
  setAccountTypeMain,
  setAccessTypeMain
}) {
  const [loading, setLoading] = useState(true);
  const [filteredRoutes, setfilteredRoutes] = useState(
    routes.filter(route => route.requiresAuth === false)
  );

  const [localLoggedInState, setLocalLoggedIn] = useState(false);

  useEffect(() => {
    (async function checkLoggedInState() {
      try {
        // localStorage.clear();
        const res = await Axios.post(CRUD_LOGIN, {});
        const obj = res.data.userObj;
        console.log({ obj });
        setUserDetailsMain(obj);
        // const roleDefined = obj => {
        //   if (obj.role === 'admin') return ADMIN;
        // if (obj.role === 'areaManager') return AREAMANAGER;
        //   if (obj.role === 'manager') return MANAGER;
        //   if (obj.role === 'user') return USER;
        // };
        // setAccountTypeMain(
        //   roleDefined(obj)
        // );
        // setAccountTypeMain(
        //   obj.role === 'admin' ? ADMIN : obj.role === 'manager' ? MANAGER : USER
        // );
        // obj.permissions = { dashboard: { canViewAgentDashboard: true } };

        // TODO: Uncomment for build
        setAccessTypeMain(obj.permissions);
        setLoggedInMain(true);
      } catch (error) {
        setLoggedInMain(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setfilteredRoutes(
      routes.filter(route => route.requiresAuth === isLoggedIn)
    );
    setLocalLoggedIn(isLoggedIn);
  }, [isLoggedIn]);
  return loading ? (
    <MainLoader />
  ) : (
    <>
      {localLoggedInState ? (
        <>
          <TopBar />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <RouteSwitch routes={filteredRoutes} isRoot />
              </div>
            </div>
          </div>
        </>
      ) : (
        <RouteSwitch routes={filteredRoutes} isRoot />
      )}
    </>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.logInState
});
const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: accType => dispatch(setAccountType(accType)),
  setLoggedInMain: val => dispatch(setLoggedIn(val)),
  setAccessTypeMain: role => dispatch(setAccessLevels(role))
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
