"use server"
import {
	apparentTemperature,
	currentTemperature,
	dailyMaxTemperature,
	dailyMinTemperature,
	rain,
} from "@/lib/weather"
import { db } from "./index"
import { weather } from "./schema"

export async function Data() {
	await db.insert(weather).values({
		temperature: currentTemperature,
		apparentTemperature,
		rainChance: rain,
		maxTemperature: dailyMaxTemperature,
		minTemperature: dailyMinTemperature,
	})
	console.log("Data inserted")
}
