function isHidden(element) {
	return element.style.display === "none" || element.offsetParent === null && window.getComputedStyle(element).position !== "fixed";
}
export { isHidden };
