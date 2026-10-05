describe('POST /guests', () => {
	const guest = {
		name: 'John Smith',
		email: 'john@example.com',
		phone: '555-123456',
		checkIn: '2026-10-10',
		checkOut: '2026-10-15',
		guests: 2,
	};

	const postGuest = (body) =>
		cy.request({
			method: 'POST',
			url: '/guests',
			body,
			failOnStatusCode: false,
		});

	it('creates a guest registration with valid data', () => {
		postGuest(guest).then(({ status }) => {
			expect(status).to.be.oneOf([200, 201]);
		});
	});

	it('rejects missing registration data', () => {
		postGuest({ name: 'John Smith' }).then(({ status }) => {
			expect(status).to.be.oneOf([400, 422]);
		});
	});

	it('rejects an invalid email', () => {
		postGuest({ ...guest, email: 'invalid-email' }).then(({ status }) => {
			expect(status).to.be.oneOf([400, 422]);
		});
	});

	it('rejects a checkout date before check-in', () => {
		postGuest({ ...guest, checkOut: '2026-10-09' }).then(({ status }) => {
			expect(status).to.be.oneOf([400, 422]);
		});
	});

	it('rejects a guest count less than one', () => {
		postGuest({ ...guest, guests: 0 }).then(({ status }) => {
			expect(status).to.be.oneOf([400, 422]);
		});
	});
});
