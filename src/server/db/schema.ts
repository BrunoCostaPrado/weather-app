import { sql } from "drizzle-orm"
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core"

export const createTable = sqliteTableCreator(name => `t3_${name}`)

export const weather = createTable(
	"weather",
	d => ({
		id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
		temperature: d.integer({ mode: "number" }).notNull(),
		rainChance: d.integer({ mode: "number" }).notNull(),
		apparentTemperature: d.integer({ mode: "number" }).notNull(),
		maxTemperature: d.integer({ mode: "number" }).notNull(),
		minTemperature: d.integer({ mode: "number" }).notNull(),
		createdAt: d
			.integer({ mode: "timestamp" })
			.default(sql`(unixepoch())`)
			.notNull(),
	}),
	t => [index("id").on(t.id)]
)
