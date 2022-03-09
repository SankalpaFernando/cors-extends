import { Request } from "express-serve-static-core";
import { cloneDeep } from "lodash";
import { corsExtends } from "../src/index";
import { Config } from "../src/types";
import { corsOption as customOptions, OriginConstants } from "./__mocks__/config";
import { mockCallback as callback } from "./__mocks__/function";

const { origin, methods } = OriginConstants[0];

describe("Origin Param Test", () => {
	let corsOption: Required<Config>;

	describe("When a Non Empty Origin Configuration is Provided", () => {
		beforeEach(() => {
			corsOption = cloneDeep(customOptions);
		});
		describe("should allow the request to pass through when", () => {
			it("correct origin and method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient deactivated globally and the origin is empty", () => {
				corsOption.global.blockHttpClient = false;
				expect(corsExtends(corsOption)({ headers: { origin: "" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated globally and the origin is not empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated globally and the origin is empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
		});
		describe("shouldn't allow the request to pass through when", () => {
			it("correct origin and unallowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: "DELETE" } as unknown as Request, callback)).toEqual({
					origin: false,
				});
			});
			it("the blockHttpClient activated and the origin is empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: false,
				});
			});
			it("wrong origin and allowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "http://localhost:27017" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: false,
				});
			});
			it("wrong origin and unallowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "http://localhost:27017" }, method: "PATCH" } as unknown as Request, callback)).toEqual({
					origin: false,
				});
			});
		});
	});

	describe("When an Empty Origin Configuration is Provided For the Specific Environment", () => {
		beforeEach(() => {
			corsOption = cloneDeep({ env: { test: {} }, global: {} });
		});
		describe("should allow the request to pass through when", () => {
			it("correct origin and method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient deactivated globally and the origin is empty", () => {
				corsOption.global.blockHttpClient = false;
				expect(corsExtends(corsOption)({ headers: { origin: "" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated globally and the origin is not empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated globally and the origin is empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("correct origin and unallowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: "DELETE" } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated and the origin is empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("wrong origin and allowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "http://localhost:27017" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("wrong origin and unallowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "http://localhost:27017" }, method: "PATCH" } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
		});
	});

	describe("When There is no Configuration File For the Specific Environment", () => {
		beforeEach(() => {
			corsOption = cloneDeep({ env: {}, global: {} });
		});
		describe("should allow the request to pass through when", () => {
			it("correct origin and method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient deactivated globally and the origin is empty", () => {
				corsOption.global.blockHttpClient = false;
				expect(corsExtends(corsOption)({ headers: { origin: "" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated globally and the origin is not empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated globally and the origin is empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("correct origin and unallowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin }, method: "DELETE" } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("the blockHttpClient activated and the origin is empty", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("wrong origin and allowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "http://localhost:27017" }, method: methods[0] } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
			it("wrong origin and unallowed method are passed", () => {
				expect(corsExtends(corsOption)({ headers: { origin: "http://localhost:27017" }, method: "PATCH" } as unknown as Request, callback)).toEqual({
					origin: true,
				});
			});
		});
	});
});
