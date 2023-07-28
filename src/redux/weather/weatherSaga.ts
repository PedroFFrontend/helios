/** @format */

import { put, select, take, takeLatest } from "redux-saga/effects"
import { weatherActions } from "./weatherSlice"
import { PayloadAction } from "@reduxjs/toolkit"

const apiToken = "b5a037f328fb4807866134410230807"

function getEndpoint(q: string) {
  return `http://api.weatherapi.com/v1/forecast.json?key=${apiToken}&days=5&alerts=yes&aqi=yes&q=${q}`
}

export default function* weatherSaga(): Generator<any, any, any> {
  yield takeLatest(weatherActions.requestCurrentWeather, requestCurrentWeather)
}

function* requestCurrentWeather(action: PayloadAction<string>): Generator<any, any, any> {
  const endpoint = getEndpoint(action.payload)

  try {
    const response = (yield fetch(endpoint)) as Response
    if (!response.ok) throw new Error("Response not ok.")

    const result = (yield response.json()) as EndpointResult
    console.log(result)

    yield put(weatherActions.setLocation(result.location))
    yield put(weatherActions.setCurrentWeather(result.current))
    yield put(weatherActions.setForecast(result.forecast))
    yield put(weatherActions.setAlerts(result.alerts))
  } catch (error) {
    console.error("Error requestCurrentWeather:", error)
  }
}

type AirQualityWeatherResult = {
  co: number | undefined
  no2: number | undefined
  o3: number | undefined
  so2: number | undefined
  pm2_5: number | undefined
  pm10: number | undefined
  "us-epa-index": number | undefined
  "gb-defra-index": number | undefined
}

type AstroWeatherResult = {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
  is_moon_up: number
  is_sun_up: number
}

type ForecastDayWeatherResult = {
  air_quality: AirQualityWeatherResult
  avghumidity: number
  avgtemp_c: number
  avgtemp_f: number
  avgvis_km: number
  avgvis_miles: number
  condition: { text: string; icon: string; code: number }
  daily_chance_of_rain: number
  daily_chance_of_snow: number
  daily_will_it_rain: number
  daily_will_it_snow: number
  maxtemp_c: number
  maxtemp_f: number
  maxwind_kph: number
  maxwind_mph: number
  mintemp_c: number
  mintemp_f: number
  totalprecip_in: number
  totalprecip_mm: number
  totalsnow_cm: number
  uv: number
}

type ForecastHourWeatherResult = {
  air_quality: AirQualityWeatherResult
  chance_of_rain: number
  chance_of_snow: number
  cloud: number
  condition: { text: string; icon: string; code: number }
  dewpoint_c: number
  dewpoint_f: number
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  heatindex_c: number
  heatindex_f: number
  humidity: number
  is_day: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  time: string
  time_epoch: number
  uv: number
  vis_km: number
  vis_miles: number
  will_it_rain: number
  will_it_snow: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
  windchill_c: number
  windchill_f: number
}

export type CurrentWeatherResult = {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: {
    text: string
    icon: string
    code: number
  }
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
  air_quality: AirQualityWeatherResult
}

export type LocationWeatherResult = {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export type ForecastWeatherResult = {
  forecastday: {
    date: string
    date_epoch: number
    astro: AstroWeatherResult
    day: ForecastDayWeatherResult
    hour: ForecastHourWeatherResult[]
  }[]
}

export type AlertsWeatherResult = {}[]

type EndpointResult = {
  location: LocationWeatherResult
  current: CurrentWeatherResult
  forecast: ForecastWeatherResult
  alerts: AlertsWeatherResult
}

export function getUVInfo(uvIndex: number) {
  if (uvIndex <= 2) {
    // low
    return { risk: "Low", color: "#0f0" }
  } else if (uvIndex <= 5) {
    // moderate
    return { risk: "Moderate", color: "#ff0" }
  } else if (uvIndex <= 7) {
    // high
    return { risk: "High", color: "#f50" }
  } else if (uvIndex <= 10) {
    // very high
    return { risk: "Very High", color: "#f00" }
  } else if (uvIndex >= 11) {
    // extreme
    return { risk: "Extreme", color: "#c5f" }
  } else {
    throw new Error("UV index out of range: got " + String(uvIndex))
  }
}

const conditions = [
  [
    {
      code: 1000,
      day: "Sunny",
      night: "Clear",
      icon: 113,
    },
    {
      code: 1003,
      day: "Partly cloudy",
      night: "Partly cloudy",
      icon: 116,
    },
    {
      code: 1006,
      day: "Cloudy",
      night: "Cloudy",
      icon: 119,
    },
    {
      code: 1009,
      day: "Overcast",
      night: "Overcast",
      icon: 122,
    },
    {
      code: 1030,
      day: "Mist",
      night: "Mist",
      icon: 143,
    },
    {
      code: 1063,
      day: "Patchy rain possible",
      night: "Patchy rain possible",
      icon: 176,
    },
    {
      code: 1066,
      day: "Patchy snow possible",
      night: "Patchy snow possible",
      icon: 179,
    },
    {
      code: 1069,
      day: "Patchy sleet possible",
      night: "Patchy sleet possible",
      icon: 182,
    },
    {
      code: 1072,
      day: "Patchy freezing drizzle possible",
      night: "Patchy freezing drizzle possible",
      icon: 185,
    },
    {
      code: 1087,
      day: "Thundery outbreaks possible",
      night: "Thundery outbreaks possible",
      icon: 200,
    },
    {
      code: 1114,
      day: "Blowing snow",
      night: "Blowing snow",
      icon: 227,
    },
    {
      code: 1117,
      day: "Blizzard",
      night: "Blizzard",
      icon: 230,
    },
    {
      code: 1135,
      day: "Fog",
      night: "Fog",
      icon: 248,
    },
    {
      code: 1147,
      day: "Freezing fog",
      night: "Freezing fog",
      icon: 260,
    },
    {
      code: 1150,
      day: "Patchy light drizzle",
      night: "Patchy light drizzle",
      icon: 263,
    },
    {
      code: 1153,
      day: "Light drizzle",
      night: "Light drizzle",
      icon: 266,
    },
    {
      code: 1168,
      day: "Freezing drizzle",
      night: "Freezing drizzle",
      icon: 281,
    },
    {
      code: 1171,
      day: "Heavy freezing drizzle",
      night: "Heavy freezing drizzle",
      icon: 284,
    },
    {
      code: 1180,
      day: "Patchy light rain",
      night: "Patchy light rain",
      icon: 293,
    },
    {
      code: 1183,
      day: "Light rain",
      night: "Light rain",
      icon: 296,
    },
    {
      code: 1186,
      day: "Moderate rain at times",
      night: "Moderate rain at times",
      icon: 299,
    },
    {
      code: 1189,
      day: "Moderate rain",
      night: "Moderate rain",
      icon: 302,
    },
    {
      code: 1192,
      day: "Heavy rain at times",
      night: "Heavy rain at times",
      icon: 305,
    },
    {
      code: 1195,
      day: "Heavy rain",
      night: "Heavy rain",
      icon: 308,
    },
    {
      code: 1198,
      day: "Light freezing rain",
      night: "Light freezing rain",
      icon: 311,
    },
    {
      code: 1201,
      day: "Moderate or heavy freezing rain",
      night: "Moderate or heavy freezing rain",
      icon: 314,
    },
    {
      code: 1204,
      day: "Light sleet",
      night: "Light sleet",
      icon: 317,
    },
    {
      code: 1207,
      day: "Moderate or heavy sleet",
      night: "Moderate or heavy sleet",
      icon: 320,
    },
    {
      code: 1210,
      day: "Patchy light snow",
      night: "Patchy light snow",
      icon: 323,
    },
    {
      code: 1213,
      day: "Light snow",
      night: "Light snow",
      icon: 326,
    },
    {
      code: 1216,
      day: "Patchy moderate snow",
      night: "Patchy moderate snow",
      icon: 329,
    },
    {
      code: 1219,
      day: "Moderate snow",
      night: "Moderate snow",
      icon: 332,
    },
    {
      code: 1222,
      day: "Patchy heavy snow",
      night: "Patchy heavy snow",
      icon: 335,
    },
    {
      code: 1225,
      day: "Heavy snow",
      night: "Heavy snow",
      icon: 338,
    },
    {
      code: 1237,
      day: "Ice pellets",
      night: "Ice pellets",
      icon: 350,
    },
    {
      code: 1240,
      day: "Light rain shower",
      night: "Light rain shower",
      icon: 353,
    },
    {
      code: 1243,
      day: "Moderate or heavy rain shower",
      night: "Moderate or heavy rain shower",
      icon: 356,
    },
    {
      code: 1246,
      day: "Torrential rain shower",
      night: "Torrential rain shower",
      icon: 359,
    },
    {
      code: 1249,
      day: "Light sleet showers",
      night: "Light sleet showers",
      icon: 362,
    },
    {
      code: 1252,
      day: "Moderate or heavy sleet showers",
      night: "Moderate or heavy sleet showers",
      icon: 365,
    },
    {
      code: 1255,
      day: "Light snow showers",
      night: "Light snow showers",
      icon: 368,
    },
    {
      code: 1258,
      day: "Moderate or heavy snow showers",
      night: "Moderate or heavy snow showers",
      icon: 371,
    },
    {
      code: 1261,
      day: "Light showers of ice pellets",
      night: "Light showers of ice pellets",
      icon: 374,
    },
    {
      code: 1264,
      day: "Moderate or heavy showers of ice pellets",
      night: "Moderate or heavy showers of ice pellets",
      icon: 377,
    },
    {
      code: 1273,
      day: "Patchy light rain with thunder",
      night: "Patchy light rain with thunder",
      icon: 386,
    },
    {
      code: 1276,
      day: "Moderate or heavy rain with thunder",
      night: "Moderate or heavy rain with thunder",
      icon: 389,
    },
    {
      code: 1279,
      day: "Patchy light snow with thunder",
      night: "Patchy light snow with thunder",
      icon: 392,
    },
    {
      code: 1282,
      day: "Moderate or heavy snow with thunder",
      night: "Moderate or heavy snow with thunder",
      icon: 395,
    },
  ],
]
