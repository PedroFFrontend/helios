/** @format */

import { useAppSelector } from "@/redux/hooks"
import styles from "./AirQualityDisplay.module.css"
import { WEEKDAYS } from "@/utils/utils"

// AQI table
// 1  Good
// 2  Moderate
// 3  Unhealthy for sensitive group
// 4  Unhealthy
// 5  Very Unhealthy
// 6  Hazardous

const usEpaIndexNames = ["Good", "Moderate", "Unhealthy for sensitive group", "Unhealthy", "Very Unhealthy", "Hazardous"]
const usEpaIndexColors = ["lime", "yellow", "orange", "red", "purple", "maroon"]

const ukDefraIndexNames = ["Low", "Low", "Low", "Moderate", "Moderate", "Moderate", "High", "High", "High", "Very High"]

export default function AirQualityDisplay() {
  const { current, forecast } = useAppSelector(state => state.weather)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Air Quality</h2>
      <div className={styles.content}>
        <div className={styles.stat}>
          <div></div>

          {forecast &&
            forecast.forecastday.map((v, i) => (
              <div key={i}>{i === 0 ? "Today" : i === 1 ? "Tomorrow" : WEEKDAYS[new Date(v.date_epoch * 1000).getDay()]}</div>
            ))}
        </div>
        <div className={styles.stat} title="Carbon Monoxide">
          <div>CO (μg/m3)</div>
          {/* <div>{current ? `${current.air_quality.co ? current.air_quality.co.toLocaleString() : "-"}` : ""}</div> */}
          {forecast && forecast.forecastday.map((d, i) => <div key={i}> {d.day.air_quality.co ? d.day.air_quality.co.toLocaleString() : "-"}</div>)}
        </div>
        <div className={styles.stat} title="Nitrogen Dioxide">
          <div>NO2 (μg/m3)</div>
          {/* <div>{current ? `${current.air_quality.no2 ? current.air_quality.no2.toLocaleString() : "-"}` : ""}</div> */}
          {forecast && forecast.forecastday.map((d, i) => <div key={i}> {d.day.air_quality.no2 ? d.day.air_quality.no2.toLocaleString() : "-"}</div>)}
        </div>
        <div className={styles.stat} title="Ozone">
          <div>O3 (μg/m3)</div>
          {/* <div>{current ? `${current.air_quality.o3 ? current.air_quality.o3.toLocaleString() : "-"}` : ""}</div> */}
          {forecast && forecast.forecastday.map((d, i) => <div key={i}> {d.day.air_quality.o3 ? d.day.air_quality.o3.toLocaleString() : "-"}</div>)}
        </div>
        <div className={styles.stat} title="Sulfur Dioxide">
          <div>SO2 (μg/m3)</div>
          {/* <div>{current ? `${current.air_quality.so2 ? current.air_quality.so2.toLocaleString() : "-"}` : ""}</div> */}
          {forecast && forecast.forecastday.map((d, i) => <div key={i}> {d.day.air_quality.so2 ? d.day.air_quality.so2.toLocaleString() : "-"}</div>)}
        </div>
        <div className={styles.stat} title="Particulate matter smaller than 2.5μm">
          <div>PM2.5 (μg/m3)</div>
          {/* <div>{current && current.air_quality.pm2_5 ? `${current.air_quality.pm2_5.toLocaleString()}` : ""}</div> */}
          {forecast &&
            forecast.forecastday.map((d, i) => <div key={i}> {d.day.air_quality.pm2_5 ? d.day.air_quality.pm2_5.toLocaleString() : "-"}</div>)}
        </div>
        <div className={styles.stat} title="Particulate matter smaller than 10μm">
          <div>PM10 (μg/m3)</div>
          {/* <div>{current && current.air_quality.pm10 ? `${current.air_quality.pm10.toLocaleString()}` : ""}</div> */}
          {forecast &&
            forecast.forecastday.map((d, i) => <div key={i}> {d.day.air_quality.pm10 ? d.day.air_quality.pm10.toLocaleString() : "-"}</div>)}
        </div>
        <div className={styles.stat} title="UK DEFRA Index">
          <div>DEFRA Index</div>
          {/* <div>{current && current.air_quality["gb-defra-index"] ? `${ukDefraIndexNames[current.air_quality["gb-defra-index"] - 1]}` : "-"}</div> */}

          {forecast
            ? forecast.forecastday.map((d, i) => (
                <div key={i}>
                  {d.day.air_quality["gb-defra-index"] !== undefined ? ukDefraIndexNames[d.day.air_quality["gb-defra-index"] - 1] : "-"}
                </div>
              ))
            : ""}
        </div>
        <div className={styles.stat} title="US EPA Index">
          <div>EPA Index</div>
          {/* <div> {current && current.air_quality["us-epa-index"] ? `${usEpaIndexNames[current.air_quality["us-epa-index"] - 1]}` : "-"}</div> */}

          {forecast
            ? forecast.forecastday.map((d, i) => (
                <div key={i}> {d.day.air_quality["us-epa-index"] !== undefined ? usEpaIndexNames[d.day.air_quality["us-epa-index"] - 1] : "-"}</div>
              ))
            : ""}
        </div>{" "}
      </div>
    </div>
  )
}
