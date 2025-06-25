import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	apparentTemperature,
	currentTemperature,
	dailyMaxTemperature,
	dailyMinTemperature,
	rain,
} from "@/lib/weather"
import { Data } from "@/server/db/insert"

export async function Weather() {
	setInterval(() => {
		Data()
	}, 300000)
	//clearInterval(intervalId);

	return (
		<div>
			<Table>
				<TableCaption className="text-black">Weather</TableCaption>
				<TableHeader>
					<TableRow className="text-[15px] text-zinc-300">
						<TableHead>Current Temp</TableHead>
						<TableHead>Apparent Temperature</TableHead>
						<TableHead>Rain Chance</TableHead>
						<TableHead>Max Temp</TableHead>
						<TableHead>Min Temp</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>{currentTemperature}</TableCell>
						<TableCell>{apparentTemperature}</TableCell>
						<TableCell>{rain} %</TableCell>
						<TableCell>{dailyMaxTemperature}</TableCell>
						<TableCell>{dailyMinTemperature}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
