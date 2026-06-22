const lazyFeatures = [];
function updateLazyFeatures(features) {
	for (const feature of features) if (feature && !lazyFeatures.includes(feature)) lazyFeatures.push(feature);
}
export { lazyFeatures, updateLazyFeatures };
