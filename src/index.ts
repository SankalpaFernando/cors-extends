import { isUndefined, isEmpty, isNull } from "lodash";
import { Request, Response } from "express";
import { CallbackFunction, Config, CorsRequest } from "./types";
export const corsExtends = (config: Config) => {
	const env = process.env.ENVIRONMENT;
	const envConfig = env ? config.env[env] : {};
	return (req: Request, callback: CallbackFunction) => {
		const origin = req?.headers?.origin ?? "";
		const { method, route } = req;
		// Origin Configs
		const originIndex = envConfig?.origins?.findIndex((entry) => entry.origin === origin) ?? -1;
		const hasOrigin = originIndex > -1;
		// Whether the Non Browser HTTPClient Requests to be blocked
		const shouldBlockHTTPClientGlobal = config.global.blockHttpClient && true;
		const isAllowedMethodOrigin = hasOrigin ? envConfig?.origins![originIndex]?.methods?.includes(method) : !shouldBlockHTTPClientGlobal;
		const isEmptyOrigin = isUndefined(origin) || isEmpty(origin) || isNull(origin);
		const blockHTTPClientGlobal = shouldBlockHTTPClientGlobal && isEmptyOrigin;

		// Routes Configs
		const routeIndex = envConfig?.routes?.findIndex((entry) => entry.endpoint === route && entry.origins?.includes(origin)) ?? -1;
		const hasRoute = routeIndex > -1;
		// to Check whether the current method is allowed for the current route
		const isAllowedMethodRoute = hasRoute ? envConfig?.routes![routeIndex]?.methods?.includes(method) : isAllowedMethodOrigin;
		// to Check whether the current origin is allowed for the specific route
		const shouldBlockHTTPClientRoute = hasRoute
			? (envConfig?.routes![routeIndex]?.blockHttpClient ?? shouldBlockHTTPClientGlobal) && true
			: shouldBlockHTTPClientGlobal;
		// Checks whether the current request is from a non browser HTTP Client
		const blockHTTPClientRoute = shouldBlockHTTPClientRoute && (isUndefined(origin) || isEmpty(origin) || isNull(origin) || !hasOrigin);
		if (isEmpty(envConfig)) {
			return callback(null, { origin: true });
		}
		if (!isEmptyOrigin && !hasOrigin) {
			return callback(new Error("Blocked By the CORS policy"));
		}
		if ((hasRoute || !blockHTTPClientRoute) && isAllowedMethodRoute) {
			return callback(null, { origin: true });
		}
		if (!isAllowedMethodOrigin || blockHTTPClientGlobal) {
			return callback(new Error("Blocked By the CORS policy"));
		}
		return callback(new Error("Blocked By the CORS policy"));
	};
};
