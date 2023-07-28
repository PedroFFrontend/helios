/** @format */

import { useAppSelector } from "@/redux/hooks"
import React from "react"

export default function HourlyForecast() {
  const { forecast } = useAppSelector(state => state.weather)

  return (
    <div>
      <h2>Forecast Hourly</h2>
      <div>
        {forecast
          ? forecast.forecastday.map(day => (
              <div key={day.date_epoch}>
                <h4>{day.date}</h4>
                {day.hour.map(v => (
                  <div key={v.time}>
                    {v.time} - {v.temp_c}ºC
                  </div>
                ))}
              </div>
            ))
          : ""}
      </div>
    </div>
  )
}
