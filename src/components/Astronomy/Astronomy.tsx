/** @format */

import React, { CSSProperties } from "react"
import styles from "./Astronomy.module.css"
import { useAppSelector } from "@/redux/hooks"
import { getUVInfo } from "@/redux/weather/weatherSaga"

export default function Astronomy() {
  const { location, current, forecast, alerts } = useAppSelector(s => s.weather)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Astronomy</h2>
      <div className={styles.content}>
        <div className={styles.sun}>
          <div className={styles.arc_container}>
            <div className={styles.arc}></div>
          </div>
          <div className={styles.times}>
            <div>{forecast ? forecast.forecastday[0].astro.sunrise : ""}</div>
            <div>{forecast ? forecast.forecastday[0].astro.sunset : ""}</div>
          </div>
          <div className={styles.details}>
            <h3>The Sun</h3>
            <div className={styles.uv_container} style={current ? ({ "--uv_color": getUVInfo(current.uv).color } as CSSProperties) : {}}>
              <div className={styles.uv_index}>
                {warningIcon} {current ? `UV ${current.uv}` : ""}
              </div>
              <div className={styles.uv_name}>{current ? `${getUVInfo(current.uv).risk}` : ""}</div>
            </div>
          </div>
        </div>
        {/* <div>Sun is up: {forecast ? forecast.forecastday[0].astro.is_sun_up : ""}</div> */}

        <div className={styles.moon}>
          <div className={styles.arc_container}>
            <div className={styles.arc}></div>
          </div>
          <div className={styles.times}>
            <div>{forecast ? forecast.forecastday[0].astro.moonrise : ""}</div>
            <div>{forecast ? forecast.forecastday[0].astro.moonset : ""}</div>
          </div>
          <div className={styles.details}>
            <h3>The Moon</h3>
            <div className={styles.moon_phase}>{forecast ? forecast.forecastday[0].astro.moon_phase : ""}</div>
            <div className={styles.moon_illumination}> {forecast ? `${forecast.forecastday[0].astro.moon_illumination}% Illumination` : ""}</div>
          </div>
        </div>
      </div>
      {/* <div>Moon is up: {forecast ? forecast.forecastday[0].astro.is_moon_up : ""}</div>
      <div>Moon phase: {forecast ? forecast.forecastday[0].astro.moon_phase : ""}</div>
      <div>Moon illumination: {forecast ? `${forecast.forecastday[0].astro.moon_illumination}%` : ""}</div> */}
    </div>
  )
}

const warningIcon = (
  <svg height="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="17" r="1" fill="var(--uv_color)" />
    <path d="M12 10L12 14" stroke="var(--uv_color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
      stroke="var(--uv_color)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
