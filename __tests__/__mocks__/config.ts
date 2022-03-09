import { Config } from "../../src/types";

export const OriginConstants = [
	{
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
	{
		origin: "http://localhost:5000",
		methods: ["DELETE", "PUT"],
	},
];

export const RouteConstants = [
	{
		endpoint: "/",
		methods: ["GET", "DELETE"],
		origins: ["http://localhost:8080"],
	},
	{
		endpoint: "/",
		methods: ["GET"],
		origins: ["http://localhost:8000"],
	},
];

export const corsOption: Config = {
	env: {
		test: {
			origins: OriginConstants,
			routes: RouteConstants,
		},
	},
	global: {
		blockHttpClient: true,
	},
};
