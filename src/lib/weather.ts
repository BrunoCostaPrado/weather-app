// @ts-nocheck
import type { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response"
import { fetchWeatherApi } from "openmeteo"
import { env } from "@/env"

const params = {
	latitude: -23.5475,
	longitude: -46.6361,
	daily: [
		"temperature_2m_max",
		"temperature_2m_min",
		"sunset",
		"sunrise",
		"daylight_duration",
		"rain_sum",
	],
	hourly: [
		"temperature_2m",
		"rain",
		"visibility",
		"relative_humidity_2m",
		"apparent_temperature",
	],
	current: ["temperature_2m", "apparent_temperature", "rain"],
	timezone: "America/Sao_Paulo",
}
const url = env.NEXT_PUBLIC_WEATHER_URL
const responses = await fetchWeatherApi(url, params)

const response = responses[0] as WeatherApiResponse
const utcOffsetSeconds = response.utcOffsetSeconds()

const current = response.current()
// const hourly = response.hourly();
const daily = response.daily()

// Note: The order of weather variables in the URL query and the indices below need to match!
export const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature2m: current.variables(0)?.value(),
		apparentTemperature: current.variables(1)?.value(),
		rain: current.variables(2)?.value(),
	},
	// hourly: {
	// 	time: [
	// 		...Array(
	// 			(Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval(),
	// 		),
	// 	].map(
	// 		(_, i) =>
	// 			new Date(
	// 				(Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
	// 					1000,
	// 			),
	// 	),
	// 	temperature2m: hourly.variables(0)?.valuesArray(),
	// 	rain: hourly.variables(1)?.valuesArray(),
	// 	visibility: hourly.variables(2)?.valuesArray(),
	// 	relativeHumidity2m: hourly.variables(3)?.valuesArray(),
	// 	apparentTemperature: hourly.variables(4)?.valuesArray(),
	// },
	daily: {
		time: [
			...Array(
				(Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
			),
		].map(
			(_, i) =>
				new Date(
					(Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
						1000
				)
		),
		temperature2mMax: daily.variables(0)?.valuesArray(),
		temperature2mMin: daily.variables(1)?.valuesArray(),

		rainSum: daily.variables(5)?.valuesArray(),
	},
}

export const data = await weatherData
export const rain = Math.round(data.daily.rainSum[6] * 100)
export const currentTemperature = Math.round(data.current.temperature2m)
export const apparentTemperature = Math.round(data.current.apparentTemperature)
export const dailyMaxTemperature = Math.round(data.daily.temperature2mMax[0])
export const dailyMinTemperature = Math.round(data.daily.temperature2mMin[0])
