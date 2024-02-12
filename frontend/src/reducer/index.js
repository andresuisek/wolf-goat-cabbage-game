import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../baseApi';
import Game from './Game'


const createRootReducer = combineReducers({
    game: Game,
    [baseApi.reducerPath]: baseApi.reducer,
  });
  
export default createRootReducer;