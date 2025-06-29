import { Weather } from "./weather"

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b bg-zinc-600 text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				<Weather />
			</div>
		</main>
	)
}
