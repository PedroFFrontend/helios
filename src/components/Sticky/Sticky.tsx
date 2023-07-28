/** @format */

import React from "react"
import styles from "./Sticky.module.css"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { weatherActions } from "@/redux/weather/weatherSlice"
import { MONTHS, WEEKDAYS } from "@/utils/utils"

export default function Sticky() {
  const { location, current } = useAppSelector(s => s.weather)
  const dispatch = useAppDispatch()

  const localDate = location ? new Date(location.localtime) : undefined

  const localTime = localDate
    ? `${String(localDate.getHours()).padStart(2, "0")}:${String(localDate?.getMinutes()).padStart(2, "0")} ${
        WEEKDAYS[localDate.getDay()]
      } · ${localDate?.getDate()} ${MONTHS[localDate.getMonth()]} ${localDate.getFullYear()}`
    : ""

  return (
    <div className={styles.container}>
      <div className={styles.footer_left}>
        <h1 className={styles.location_name} title={location && location.country}>
          {location ? `${location.name}` : ""}
        </h1>
        <button className={styles.fetch_button} onClick={() => dispatch(weatherActions.requestCurrentWeather("Dubai"))}>
          Dubai
        </button>
        <button className={styles.fetch_button} onClick={() => dispatch(weatherActions.requestCurrentWeather("Lisbon"))}>
          Lisbon
        </button>
        <button className={styles.fetch_button} onClick={() => dispatch(weatherActions.requestCurrentWeather("Auckland"))}>
          Auckland
        </button>
        <button className={styles.fetch_button} onClick={() => dispatch(weatherActions.requestCurrentWeather("New York"))}>
          New York
        </button>
        <button className={styles.fetch_button} onClick={() => dispatch(weatherActions.requestCurrentWeather("Beijing"))}>
          Beijing
        </button>
        {/* <div>Last updated: {current ? current.last_updated : ""}</div> */}
      </div>
      <div className={styles.localtime}>{localTime}</div>
    </div>
  )
}
