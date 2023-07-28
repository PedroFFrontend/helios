/** @format */

import { useAppSelector } from "@/redux/hooks"
import { WEEKDAYS } from "@/utils/utils"
import React from "react"
import styles from "./DailyForecast.module.css"

export default function DailyForecast() {
  const { forecast } = useAppSelector(state => state.weather)

  let dates = []
  let minTemps = []
  let maxTemps = []

  const elements = []
  if (forecast)
    for (let i = 0; i < forecast?.forecastday.length; i++) {
      const forecastDay = forecast?.forecastday[i]

      const date = new Date(forecastDay.date_epoch * 1000).getDay()
      const weekDay = i === 0 ? "Today" : i === 1 ? "Tomorrow" : WEEKDAYS[date]
      const minT = forecastDay.day.mintemp_c.toFixed(0)
      const maxT = forecastDay.day.maxtemp_c.toFixed(0)
      const condition = forecastDay.day.condition.text
      dates.push(date)
      minTemps.push(minT)
      maxTemps.push(maxT)

      const element = (
        <div className={styles.entry} key={date}>
          <div className={styles.weekday}>{weekDay}</div>
          <div>
            <div className={styles.temperature}>
              <div>{maxT}º</div>
              <div>{minT}º</div>
            </div>
            <div className={styles.condition}>{condition}</div>
          </div>
        </div>
      )
      elements.push(element)
    }

  return <div className={styles.container}>{elements}</div>
}
