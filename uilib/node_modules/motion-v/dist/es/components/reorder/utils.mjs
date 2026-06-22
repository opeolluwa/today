import { isMotionValue, mixNumber, motionValue } from "framer-motion/dom";
function compareMin(a, b) {
	return a.layout.min - b.layout.min;
}
function getValue(item) {
	return item.value;
}
function checkReorder(order, value, offset, velocity) {
	const index = order.findIndex((item$1) => item$1.value === value);
	if (index === -1) return order;
	const direction = velocity !== 0 ? velocity : offset;
	if (!direction) return order;
	const nextOffset = direction > 0 ? 1 : -1;
	const nextItem = order[index + nextOffset];
	if (!nextItem) return order;
	const item = order[index];
	const nextLayout = nextItem.layout;
	const nextItemCenter = mixNumber(nextLayout.min, nextLayout.max, .5);
	if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) return moveItem(order, index, index + nextOffset);
	return order;
}
function moveItem([ ...arr], fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
	if (startIndex >= 0 && startIndex < arr.length) {
		const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
		const [item] = arr.splice(fromIndex, 1);
		arr.splice(endIndex, 0, item);
	}
	return arr;
}
function useDefaultMotionValue(value, defaultValue = 0) {
	return isMotionValue(value) ? value : motionValue(defaultValue);
}
export { checkReorder, compareMin, getValue, useDefaultMotionValue };
