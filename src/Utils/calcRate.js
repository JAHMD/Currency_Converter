export function calcRate(currentAmount, toValue, fromValue) {
	return ((currentAmount * toValue) / fromValue).toFixed(2);
}
