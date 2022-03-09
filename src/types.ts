export type Config = {
	env: {
		[environment: string]: EnvConfig;
	};
	global: {
		blockHttpClient?: boolean;
	};
};

type OriginConfig = {
	origin?: string;
	methods?: string[];
};

type RouteConfig = {
	endpoint: string;
	methods?: string[];
	origins: string[];
	blockHttpClient?: boolean;
};

type EnvConfig = {
	origins?: OriginConfig[];
	routes?: RouteConfig[];
};

export type CorsRequest = {
	headers: { origin: string };
	method: string;
};

export type CallbackFunction = (err: Error | null, payload?: { origin: boolean }) => typeof payload;
