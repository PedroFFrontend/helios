/** @format */

"use client"

import { weatherActions } from "@/redux/weather/weatherSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import styles from "./page.module.css"
import { getUVInfo } from "@/redux/weather/weatherSaga"
import Hero from "@/components/Hero/Hero"
import AirQualityDisplay from "@/components/AirQualityDisplay/AirQualityDisplay"
import Sticky from "@/components/Sticky/Sticky"
import Astronomy from "@/components/Astronomy/Astronomy"
import Atmosphere from "@/components/Atmosphere/Atmosphere"
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast"
import DailyForecast from "@/components/DailyForecast/DailyForecast"
import { useEffect } from "react"

export default function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(weatherActions.requestCurrentWeather("Tokyo"))
  }, [])

  return (
    <main className={styles.main}>
      <Hero />
      <Sticky />
      <div className={styles.below}>
        <DailyForecast />
        <Atmosphere />
        <Astronomy />
        <AirQualityDisplay />
      </div>
    </main>
  )
}
