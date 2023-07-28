/** @format */

import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LocationWeatherResult, CurrentWeatherResult, ForecastWeatherResult, AlertsWeatherResult } from "./weatherSaga"

type LocationType = LocationWeatherResult | undefined
type CurrentType = CurrentWeatherResult | undefined
type ForecastType = ForecastWeatherResult | undefined
type AlertsType = AlertsWeatherResult | undefined

type WeatherState = {
  location: LocationType
  current: CurrentType
  forecast: ForecastType
  alerts: AlertsType
}

const initialState: WeatherState = {
  current: undefined,
  location: undefined,
  forecast: undefined,
  alerts: undefined,
}

export const weatherSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    setLocation(state, action: PayloadAction<LocationType>) {
      state.location = action.payload
    },
    setCurrentWeather(state, action: PayloadAction<CurrentType>) {
      state.current = action.payload
    },
    setForecast(state, action: PayloadAction<ForecastType>) {
      state.forecast = action.payload
    },
    setAlerts(state, action: PayloadAction<AlertsType>) {
      state.alerts = action.payload
    },
  },
})

export const weatherActions = {
  ...weatherSlice.actions,
  requestCurrentWeather: createAction<string>("weather/requestCurrentWeather"),
}

export default weatherSlice.reducer
