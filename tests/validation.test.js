import test from "node:test";
import assert from "node:assert/strict";
import { validateGuest } from "../src/validation.js";

const validGuest = {
	fullName: "Ana Souza",
	email: "ana@example.com",
	phone: "11999999999",
	checkIn: "2026-11-10",
	checkOut: "2026-11-12",
	guests: "2",
};

test("accepts a valid guest registration", () => {
	assert.deepEqual(validateGuest(validGuest), {});
});

test("requires a full name with at least three characters", () => {
	assert.equal(validateGuest({ ...validGuest, fullName: "  " }).fullName, "Informe o nome completo.");
	assert.equal(validateGuest({ ...validGuest, fullName: "Al" }).fullName, "O nome deve ter pelo menos 3 caracteres.");
});

test("requires a valid email and a phone number", () => {
	assert.ok(validateGuest({ ...validGuest, email: "" }).email);
	assert.ok(validateGuest({ ...validGuest, email: "not-an-email" }).email);
	assert.ok(validateGuest({ ...validGuest, phone: "" }).phone);
});

test("requires both dates and checkout after check-in", () => {
	assert.ok(validateGuest({ ...validGuest, checkIn: "" }).checkIn);
	assert.ok(validateGuest({ ...validGuest, checkOut: "" }).checkOut);
	assert.ok(validateGuest({ ...validGuest, checkOut: validGuest.checkIn }).checkOut);
	assert.ok(validateGuest({ ...validGuest, checkOut: "2026-11-09" }).checkOut);
});

test("requires a positive whole number of guests", () => {
	assert.ok(validateGuest({ ...validGuest, guests: "0" }).guests);
	assert.ok(validateGuest({ ...validGuest, guests: "-1" }).guests);
	assert.ok(validateGuest({ ...validGuest, guests: "1.5" }).guests);
});
