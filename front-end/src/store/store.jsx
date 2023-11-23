import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from '../reducers/UserReducer';
import { loginReducer } from '../reducers/loginReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userLogin: loginReducer,
  userProfile: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

const enhancers = composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, enhancers);

export const persistor = persistStore(store);
export default store;
