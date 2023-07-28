/** @format */

import { configureStore } from "@reduxjs/toolkit"
import weatherSlice from "./weather/weatherSlice"
import createSagaMiddleware from "redux-saga"
import weatherSaga from "./weather/weatherSaga"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: { weather: weatherSlice },
  middleware: [sagaMiddleware],

  devTools: process.env.NODE_ENV !== "production",
})

sagaMiddleware.run(weatherSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
