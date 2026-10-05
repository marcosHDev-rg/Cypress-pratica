import { validateGuest } from "/validation.js";

const form = document.querySelector("#guest-form");
const message = document.querySelector("#form-message");
const fieldNames = ["fullName", "email", "phone", "checkIn", "checkOut", "guests"];

function showErrors(errors) {
	for (const name of fieldNames) {
		const input = form.elements.namedItem(name);
		const error = document.querySelector(`#${name}-error`);
		const text = errors[name] ?? "";

		error.textContent = text;
		if (text) {
			input.setAttribute("aria-invalid", "true");
		} else {
			input.removeAttribute("aria-invalid");
		}
	}
}

form.addEventListener("input", (event) => {
	const input = event.target;
	if (!fieldNames.includes(input.name)) return;

	const errors = validateGuest(Object.fromEntries(new FormData(form)));
	showErrors(errors);
	message.hidden = true;
});

// POST /guests
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const guest = Object.fromEntries(new FormData(form));
	const errors = validateGuest(guest);
	showErrors(errors);

	const firstInvalid = fieldNames.find((name) => errors[name]);
	if (firstInvalid) {
		message.hidden = true;
		form.elements.namedItem(firstInvalid).focus();
		return;
	}

	message.textContent = "Hóspede registrado com sucesso!";
	message.hidden = false;
});
