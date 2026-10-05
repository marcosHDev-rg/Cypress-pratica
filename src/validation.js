export function validateGuest(guest) {
	const errors = {};
	const fullName = String(guest.fullName ?? "").trim();
	const email = String(guest.email ?? "").trim();
	const phone = String(guest.phone ?? "").trim();
	const checkIn = String(guest.checkIn ?? "");
	const checkOut = String(guest.checkOut ?? "");
	const guests = Number(guest.guests);

	if (!fullName) {
		errors.fullName = "Informe o nome completo.";
	} else if (fullName.length < 3) {
		errors.fullName = "O nome deve ter pelo menos 3 caracteres.";
	}

	if (!email) {
		errors.email = "Informe o e-mail.";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.email = "Informe um e-mail válido.";
	}

	if (!phone) {
		errors.phone = "Informe o telefone.";
	}

	if (!checkIn) {
		errors.checkIn = "Informe a data de check-in.";
	}

	if (!checkOut) {
		errors.checkOut = "Informe a data de check-out.";
	} else if (checkIn && checkOut <= checkIn) {
		errors.checkOut = "O check-out deve ser posterior ao check-in.";
	}

	if (!Number.isInteger(guests) || guests <= 0) {
		errors.guests = "Informe um número de hóspedes maior que zero.";
	}

	return errors;
}
