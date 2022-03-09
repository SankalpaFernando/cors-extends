export const mockCallback = (err: Error | null, payload?: { origin: boolean }) => {
	if (err !== null) {
		return { origin: false };
	}
	return payload;
};
