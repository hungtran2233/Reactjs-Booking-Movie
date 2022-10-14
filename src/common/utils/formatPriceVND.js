// Format price
export const formatPriceVND = (price) => {
	let newPrice = new Intl.NumberFormat("it-IT", {
		style: "currency",
		currency: "VND",
	}).format(price);
	return newPrice;
};
