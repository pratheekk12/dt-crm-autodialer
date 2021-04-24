import { setRoles } from './reducers';
export default function getAdminModule() {
  return {
    // Unique id of the module
    id: '',
    // Maps the Store key to the reducer
    reducerMap: {
      roles: setRoles
    }
    // This module uses redux-saga middleware
    // This property will be be used by the SagaExtension
    // to run sagas for the moduleD
  };
}
