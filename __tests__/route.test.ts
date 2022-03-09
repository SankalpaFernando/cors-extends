import { Request } from "express-serve-static-core";
import { cloneDeep } from "lodash";
import { corsExtends } from "../src/index";
import { Config } from "../src/types";
import { corsOption as customOptions, RouteConstants, OriginConstants } from "./__mocks__/config";
import { mockCallback as callback } from "./__mocks__/function";

const { endpoint, methods: routeMethods, origins } = RouteConstants[0];
const { origin, methods } = OriginConstants[0];

describe("Route Param Test", () => {
	let corsOption: Required<Config>;
	beforeEach(() => {
		corsOption = cloneDeep(customOptions);
	});
	describe("should allow the request to pass through when", () => {
		it("the request is from an allowed origin and method is  allowed ", () => {
			expect(corsExtends(corsOption)({ headers: { origin }, method: "GET", route: "/all" } as unknown as Request, callback)).toEqual({
				origin: true,
			});
		});
		it("the blockHttpClient is unspecified for the specific route and blockHttpClient is deactivated globally and request origin is empty", () => {
			delete corsOption.env!.test!.routes![0].blockHttpClient;
			corsOption.global.blockHttpClient = false;
			expect(corsExtends(corsOption)({ headers: { origin: "" }, method: "GET", route: "/all" } as unknown as Request, callback)).toEqual({
				origin: true,
			});
		});
	});
	describe("shouldn't allow the request to pass through when", () => {
		it("the request is from an allowed origin and method is not allowed ", () => {
			expect(corsExtends(corsOption)({ headers: { origin }, method: "DELETE", route: "/all" } as unknown as Request, callback)).toEqual({
				origin: false,
			});
		});

		it("the blockHttpClient is activated for the specific route and request origin is empty and method is allowed", () => {
			corsOption.env!.test!.routes![0].blockHttpClient = true;
			expect(corsExtends(corsOption)({ headers: { origin: "" }, method: "GET", route: "/all" } as unknown as Request, callback)).toEqual({
				origin: false,
			});
		});
		it("the blockHttpClient is activated for the specific route and request origin is empty and method is not allowed", () => {
			corsOption.env!.test!.routes![0].blockHttpClient = true;
			expect(corsExtends(corsOption)({ headers: { origin: "" }, method: "DELETE", route: "/all" } as unknown as Request, callback)).toEqual({
				origin: false,
			});
		});
		it("the blockHttpClient is unspecified for the specific route and blockHttpClient is activated globally and request origin is empty", () => {
			delete corsOption.env!.test!.routes![0].blockHttpClient;
			corsOption.global.blockHttpClient = true;
			expect(corsExtends(corsOption)({ headers: { origin: "" }, method: "GET", route: "/all" } as unknown as Request, callback)).toEqual({
				origin: false,
			});
		});
	});
});
