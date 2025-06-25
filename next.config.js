/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js"

const isProd = process.env.NODE_ENV === "production"

const internalHost = process.env.TAURI_DEV_HOST || "localhost"

/** @type {import("next").NextConfig} */
const config = {
	output: "export",
	images: {
		unoptimized: true,
	},
	assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
}

export default config
