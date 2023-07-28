/** @format */

import React from "react"
import Background from "./Background/Background"
import styles from "./Hero.module.css"
import { useAppSelector } from "@/redux/hooks"
import { weatherActions } from "@/redux/weather/weatherSlice"
import { useDispatch } from "react-redux"

export default function Hero() {
  const { current, forecast } = useAppSelector(s => s.weather)

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.center}>
        <h2 className={styles.temperature}>{current ? `${current.temp_c.toFixed(0)}ºC` : ""}</h2>
        <div className={styles.feels_like}>{current ? `Feels like ${current.feelslike_c.toFixed(0)}ºC` : ""}</div>
        <div className={styles.condition}>
          {current?.condition.text}{" "}
          {forecast ? `${forecast.forecastday[0].day.maxtemp_c.toFixed(0)}º / ${forecast.forecastday[0].day.mintemp_c.toFixed(0)}º` : ""}
        </div>
      </div>
    </div>
  )
}
