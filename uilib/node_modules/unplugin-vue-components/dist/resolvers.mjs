import { c as kebabCase, f as pascalCase, i as getPkgVersion, o as isExclude, s as isSSR, t as camelCase } from "./utils-BfjsfvcK.mjs";
import { createRequire } from "node:module";
import { promises, readFileSync } from "node:fs";
import process from "node:process";
import { join, normalize } from "node:path";
import { createDebug } from "obug";
import { resolveModule } from "local-pkg";
import { resolvePathSync } from "mlly";
//#region \0rolldown/runtime.js
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);
//#endregion
//#region src/core/resolvers/antdv.ts
const matchComponents$3 = [
	{
		pattern: /^Affix/,
		styleDir: "affix"
	},
	{
		pattern: /^Avatar/,
		styleDir: "avatar"
	},
	{
		pattern: /^AutoComplete/,
		styleDir: "auto-complete"
	},
	{
		pattern: /^Alert/,
		styleDir: "alert"
	},
	{
		pattern: /^Anchor/,
		styleDir: "anchor"
	},
	{
		pattern: /^App/,
		styleDir: "app"
	},
	{
		pattern: /^Badge/,
		styleDir: "badge"
	},
	{
		pattern: /^Breadcrumb/,
		styleDir: "breadcrumb"
	},
	{
		pattern: /^Button/,
		styleDir: "button"
	},
	{
		pattern: /^Checkbox/,
		styleDir: "checkbox"
	},
	{
		pattern: /^Calendar/,
		styleDir: "calendar"
	},
	{
		pattern: /^Card/,
		styleDir: "card"
	},
	{
		pattern: /^Carousel/,
		styleDir: "carousel"
	},
	{
		pattern: /^Collapse/,
		styleDir: "collapse"
	},
	{
		pattern: /^Comment/,
		styleDir: "comment"
	},
	{
		pattern: /^Descriptions/,
		styleDir: "descriptions"
	},
	{
		pattern: /^RangePicker|^WeekPicker|^MonthPicker/,
		styleDir: "date-picker"
	},
	{
		pattern: /^Divider/,
		styleDir: "divider"
	},
	{
		pattern: /^Drawer/,
		styleDir: "drawer"
	},
	{
		pattern: /^Dropdown/,
		styleDir: "dropdown"
	},
	{
		pattern: /^Empty/,
		styleDir: "empty"
	},
	{
		pattern: /^Flex/,
		styleDir: "flex"
	},
	{
		pattern: /^FloatButton/,
		styleDir: "float-button"
	},
	{
		pattern: /^Form/,
		styleDir: "form"
	},
	{
		pattern: /^Grid/,
		styleDir: "grid"
	},
	{
		pattern: /^InputNumber/,
		styleDir: "input-number"
	},
	{
		pattern: /^Input|^Textarea/,
		styleDir: "input"
	},
	{
		pattern: /^Statistic/,
		styleDir: "statistic"
	},
	{
		pattern: /^CheckableTag/,
		styleDir: "tag"
	},
	{
		pattern: /^TimeRangePicker/,
		styleDir: "time-picker"
	},
	{
		pattern: /^Layout/,
		styleDir: "layout"
	},
	{
		pattern: /^Menu|^SubMenu/,
		styleDir: "menu"
	},
	{
		pattern: /^Table/,
		styleDir: "table"
	},
	{
		pattern: /^TimePicker|^TimeRangePicker/,
		styleDir: "time-picker"
	},
	{
		pattern: /^Radio/,
		styleDir: "radio"
	},
	{
		pattern: /^Image/,
		styleDir: "image"
	},
	{
		pattern: /^List/,
		styleDir: "list"
	},
	{
		pattern: /^Tab/,
		styleDir: "tabs"
	},
	{
		pattern: /^Mentions/,
		styleDir: "mentions"
	},
	{
		pattern: /^Step/,
		styleDir: "steps"
	},
	{
		pattern: /^Skeleton/,
		styleDir: "skeleton"
	},
	{
		pattern: /^Select/,
		styleDir: "select"
	},
	{
		pattern: /^TreeSelect/,
		styleDir: "tree-select"
	},
	{
		pattern: /^Tree|^DirectoryTree/,
		styleDir: "tree"
	},
	{
		pattern: /^Typography/,
		styleDir: "typography"
	},
	{
		pattern: /^Timeline/,
		styleDir: "timeline"
	},
	{
		pattern: /^Upload/,
		styleDir: "upload"
	},
	{
		pattern: /^Qrcode/,
		styleDir: "qrcode"
	},
	{
		pattern: /^Space/,
		styleDir: "space"
	}
];
function getStyleDir(compName) {
	let styleDir;
	const total = matchComponents$3.length;
	for (let i = 0; i < total; i++) {
		const matcher = matchComponents$3[i];
		if (compName.match(matcher.pattern)) {
			styleDir = matcher.styleDir;
			break;
		}
	}
	if (!styleDir) styleDir = kebabCase(compName);
	return styleDir;
}
function getSideEffects$7(compName, options) {
	const { importStyle = true, importLess = false } = options;
	if (!importStyle) return;
	const lib = options.cjs ? "lib" : "es";
	const packageName = options?.packageName || "ant-design-vue";
	if (importStyle === "less" || importStyle === "css-in-js" || importLess) return `${packageName}/${lib}/${getStyleDir(compName)}/style`;
	else return `${packageName}/${lib}/${getStyleDir(compName)}/style/css`;
}
const primitiveNames = [
	"Affix",
	"Anchor",
	"AnchorLink",
	"AutoComplete",
	"AutoCompleteOptGroup",
	"AutoCompleteOption",
	"Alert",
	"Avatar",
	"AvatarGroup",
	"BackTop",
	"Badge",
	"BadgeRibbon",
	"Breadcrumb",
	"BreadcrumbItem",
	"BreadcrumbSeparator",
	"Button",
	"ButtonGroup",
	"Calendar",
	"Card",
	"CardGrid",
	"CardMeta",
	"Collapse",
	"CollapsePanel",
	"Carousel",
	"Cascader",
	"Checkbox",
	"CheckboxGroup",
	"Col",
	"Comment",
	"ConfigProvider",
	"DatePicker",
	"MonthPicker",
	"WeekPicker",
	"RangePicker",
	"QuarterPicker",
	"Descriptions",
	"DescriptionsItem",
	"Divider",
	"Dropdown",
	"DropdownButton",
	"Drawer",
	"Empty",
	"Form",
	"FormItem",
	"FormItemRest",
	"Grid",
	"Input",
	"InputGroup",
	"InputPassword",
	"InputSearch",
	"Textarea",
	"Image",
	"ImagePreviewGroup",
	"InputNumber",
	"Layout",
	"LayoutHeader",
	"LayoutSider",
	"LayoutFooter",
	"LayoutContent",
	"List",
	"ListItem",
	"ListItemMeta",
	"Menu",
	"MenuDivider",
	"MenuItem",
	"MenuItemGroup",
	"SubMenu",
	"Mentions",
	"MentionsOption",
	"Modal",
	"Statistic",
	"StatisticCountdown",
	"PageHeader",
	"Pagination",
	"Popconfirm",
	"Popover",
	"Progress",
	"Radio",
	"RadioButton",
	"RadioGroup",
	"Rate",
	"Result",
	"Row",
	"Select",
	"SelectOptGroup",
	"SelectOption",
	"Skeleton",
	"SkeletonButton",
	"SkeletonAvatar",
	"SkeletonInput",
	"SkeletonImage",
	"Slider",
	"Space",
	"Spin",
	"Steps",
	"Step",
	"Switch",
	"Table",
	"TableColumn",
	"TableColumnGroup",
	"TableSummary",
	"TableSummaryRow",
	"TableSummaryCell",
	"Transfer",
	"Tree",
	"TreeNode",
	"DirectoryTree",
	"TreeSelect",
	"TreeSelectNode",
	"Tabs",
	"TabPane",
	"Tag",
	"CheckableTag",
	"TimePicker",
	"TimeRangePicker",
	"Timeline",
	"TimelineItem",
	"Tooltip",
	"Typography",
	"TypographyLink",
	"TypographyParagraph",
	"TypographyText",
	"TypographyTitle",
	"Upload",
	"UploadDragger",
	"LocaleProvider",
	"FloatButton",
	"FloatButtonGroup",
	"Qrcode",
	"Watermark",
	"Segmented",
	"Tour",
	"SpaceCompact",
	"StyleProvider",
	"Flex",
	"App"
];
let antdvNames;
function genAntdNames(primitiveNames) {
	antdvNames = new Set(primitiveNames);
}
genAntdNames(primitiveNames);
function isAntdv(compName) {
	return antdvNames.has(compName);
}
function getImportName(compName) {
	if (compName === "Qrcode") return "QRCode";
	else if (compName === "SpaceCompact") return "Compact";
	return compName;
}
function getDateLibraryComponent(compName) {
	if (/^Calendar$/.test(compName)) return "calendar";
	if (/^DatePicker$/.test(compName) || /^(?:Month|Week|Range|Quarter)Picker$/.test(compName)) return "date-picker";
	if (/^Time(?:Range)?Picker$/.test(compName)) return "time-picker";
}
/**
* Resolver for Ant Design Vue
*
* Requires ant-design-vue@v2.2.0-beta.6 or later
*
* See https://github.com/antfu/unplugin-vue-components/issues/26#issuecomment-789767941 for more details
*
* @author @yangss3
* @link https://antdv.com/
*/
function AntDesignVueResolver(options = {}) {
	const originPrefix = options.prefix ?? "A";
	return {
		type: "component",
		resolve: (name) => {
			if (options.resolveIcons && /(?:Outlined|Filled|TwoTone)$/.test(name)) return {
				name,
				from: "@ant-design/icons-vue"
			};
			const [compName, prefix] = [name.slice(originPrefix.length), name.slice(0, originPrefix.length)];
			if (prefix === originPrefix && isAntdv(compName) && !options?.exclude?.includes(compName)) {
				const { cjs = false, packageName = "ant-design-vue" } = options;
				const path = `${packageName}/${cjs ? "lib" : "es"}`;
				const dateComponent = getDateLibraryComponent(compName);
				if (dateComponent) {
					const dateLibPath = `${path}/${dateComponent}/${options.resolveDateLibrary ?? "dayjs"}`;
					const sideEffects = getSideEffects$7(compName, options);
					if (compName === "Calendar" || compName === "DatePicker") return {
						from: dateLibPath,
						sideEffects
					};
					return {
						name: getImportName(compName),
						from: dateLibPath,
						sideEffects
					};
				}
				return {
					name: getImportName(compName),
					from: path,
					sideEffects: getSideEffects$7(compName, options)
				};
			}
		}
	};
}
//#endregion
//#region src/core/resolvers/arco.ts
const debug = createDebug("unplugin-vue-components:resolvers:arco");
const matchComponents$2 = [
	{
		pattern: /^AnchorLink$/,
		componentDir: "anchor"
	},
	{
		pattern: /^AvatarGroup$/,
		componentDir: "avatar"
	},
	{
		pattern: /^BreadcrumbItem$/,
		componentDir: "breadcrumb"
	},
	{
		pattern: /^ButtonGroup$/,
		componentDir: "button"
	},
	{
		pattern: /^(CardMeta|CardGrid)$/,
		componentDir: "card"
	},
	{
		pattern: /^CarouselItem$/,
		componentDir: "carousel"
	},
	{
		pattern: /^CascaderPanel$/,
		componentDir: "cascader"
	},
	{
		pattern: /^CheckboxGroup$/,
		componentDir: "checkbox"
	},
	{
		pattern: /^CollapseItem$/,
		componentDir: "collapse"
	},
	{
		pattern: /^(WeekPicker|MonthPicker|YearPicker|QuarterPicker|RangePicker)$/,
		componentDir: "date-picker"
	},
	{
		pattern: /^DescriptionsItem$/,
		componentDir: "descriptions"
	},
	{
		pattern: /^(Doption|Dgroup|Dsubmenu|DropdownButton)$/,
		componentDir: "dropdown"
	},
	{
		pattern: /^FormItem$/,
		componentDir: "form"
	},
	{
		pattern: /^(Col|Row|GridItem)$/,
		componentDir: "grid"
	},
	{
		pattern: /^(ImagePreview|ImagePreviewGroup)$/,
		componentDir: "image"
	},
	{
		pattern: /^(InputGroup|InputSearch|InputPassword)$/,
		componentDir: "input"
	},
	{
		pattern: /^(LayoutHeader|LayoutContent|LayoutFooter|LayoutSider)$/,
		componentDir: "layout"
	},
	{
		pattern: /^(ListItem|ListItemMeta)$/,
		componentDir: "list"
	},
	{
		pattern: /^(MenuItem|MenuItemGroup|SubMenu)$/,
		componentDir: "menu"
	},
	{
		pattern: /^RadioGroup$/,
		componentDir: "radio"
	},
	{
		pattern: /^(Option|Optgroup)$/,
		componentDir: "select"
	},
	{
		pattern: /^(SkeletonLine|SkeletonShape)$/,
		componentDir: "skeleton"
	},
	{
		pattern: /^Countdown$/,
		componentDir: "statistic"
	},
	{
		pattern: /^Step$/,
		componentDir: "steps"
	},
	{
		pattern: /^(Thead|Td|Th|Tr|Tbody|TableColumn)$/,
		componentDir: "table"
	},
	{
		pattern: /^TagGroup$/,
		componentDir: "tag"
	},
	{
		pattern: /^TabPane$/,
		componentDir: "tabs"
	},
	{
		pattern: /^TimelineItem$/,
		componentDir: "timeline"
	},
	{
		pattern: /^(TypographyParagraph|TypographyTitle|TypographyText)$/,
		componentDir: "typography"
	}
];
function getComponentStyleDir(importName, importStyle) {
	if (["ConfigProvider", "Icon"].includes(importName)) return void 0;
	let componentDir = kebabCase(importName);
	for (const item of matchComponents$2) if (item.pattern.test(importName)) {
		componentDir = item.componentDir;
		break;
	}
	if (importStyle === "less") return `@arco-design/web-vue/es/${componentDir}/style/index.js`;
	if (importStyle === "css" || importStyle) return `@arco-design/web-vue/es/${componentDir}/style/css.js`;
}
function canResolveIcons(options) {
	if (options === void 0) return false;
	if (typeof options === "boolean") return options;
	else return options.enable;
}
function getResolveIconPrefix(options) {
	if (canResolveIcons(options)) if (typeof options === "boolean" && options) return "";
	else if (options.enable) return options.iconPrefix ?? "";
	else return "";
	return "";
}
/**
* Resolver for Arco Design Vue
*
* Requires arco-design/web-vue@2.11.0 or later
*
* @author @flsion
* @link https://arco.design/ for arco-design
*
*/
function ArcoResolver(options = {}) {
	return {
		type: "component",
		resolve: (name) => {
			if (canResolveIcons(options.resolveIcons)) {
				const iconPrefix = pascalCase(getResolveIconPrefix(options.resolveIcons));
				if (new RegExp(`^${iconPrefix}Icon`).test(name)) {
					debug("found icon component name %s", name);
					const rawComponentName = name.slice(iconPrefix.length);
					debug("found icon component raw name %s", rawComponentName);
					return {
						name: rawComponentName,
						as: name,
						from: "@arco-design/web-vue/es/icon"
					};
				}
			}
			if (/^A[A-Z]/.test(name) && !isExclude(name, options.exclude)) {
				const importStyle = options.importStyle ?? "css";
				const importName = name.slice(1);
				const config = {
					name: importName,
					from: "@arco-design/web-vue"
				};
				if (options.sideEffect !== false) config.sideEffects = getComponentStyleDir(importName, importStyle);
				return config;
			}
		}
	};
}
//#endregion
//#region src/core/resolvers/bootstrap-vue.ts
const COMPONENT_ALIASES = {
	BBtn: "BButton",
	BBtnClose: "BButtonClose",
	BBtnGroup: "BButtonGroup",
	BBtnToolbar: "BButtonToolbar",
	BCheck: "BFormCheckbox",
	BCheckbox: "BFormCheckbox",
	BCheckboxGroup: "BFormCheckboxGroup",
	BCheckGroup: "BFormCheckboxGroup",
	BDatalist: "BFormDatalist",
	BDatepicker: "BFormDatepicker",
	BDd: "BDropdown",
	BDdDivider: "BDropdownDivider",
	BDdForm: "BDropdownForm",
	BDdGroup: "BDropdownGroup",
	BDdHeader: "BDropdownHeader",
	BDdItem: "BDropdownItem",
	BDdItemBtn: "BDropdownItemButton",
	BDdItemButton: "BDropdownItemButton",
	BDdText: "BDropdownText",
	BDropdownItemBtn: "BDropdownItemButton",
	BFile: "BFormFile",
	BInput: "BFormInput",
	BNavDd: "BNavItemDropdown",
	BNavDropdown: "BNavItemDropdown",
	BNavItemDd: "BNavItemDropdown",
	BNavToggle: "BNavbarToggle",
	BRadio: "BFormRadio",
	BRadioGroup: "BFormRadioGroup",
	BRating: "BFormRating",
	BSelect: "BFormSelect",
	BSelectOption: "BFormSelectOption",
	BSelectOptionGroup: "BFormSelectOptionGroup",
	BSpinbutton: "BFormSpinbutton",
	BTag: "BFormTag",
	BTags: "BFormTags",
	BTextarea: "BFormTextarea",
	BTimepicker: "BFormTimepicker"
};
/**
* Resolver for BootstrapVue
*
* @link https://github.com/bootstrap-vue/bootstrap-vue
*/
function BootstrapVueResolver(_options = {}) {
	const options = {
		directives: true,
		..._options
	};
	const resolvers = [{
		type: "component",
		resolve: (name) => {
			if (/^B[A-Z]/.test(name)) return {
				name: COMPONENT_ALIASES[name] || name,
				from: "bootstrap-vue"
			};
		}
	}];
	if (options.directives) resolvers.push({
		type: "directive",
		resolve: (name) => {
			if (/^B[A-Z]/.test(name)) return {
				name: `V${name}`,
				from: "bootstrap-vue"
			};
		}
	});
	return resolvers;
}
/**
* Resolver for BootstrapVueNext
*
* @link https://github.com/bootstrap-vue/bootstrap-vue-next
*
* @deprecated use `import { BootstrapVueNextResolver } from 'bootstrap-vue-next'` instead
*/
function BootstrapVueNextResolver(_options = {}) {
	const options = {
		directives: true,
		..._options
	};
	const resolvers = [{
		type: "component",
		resolve: (name) => {
			if (/^B[A-Z]/.test(name)) return {
				name,
				from: "bootstrap-vue-next"
			};
		}
	}];
	if (options.directives) resolvers.push({
		type: "directive",
		resolve: (name) => {
			if (/^B[A-Z]/.test(name)) return {
				name: `v${name}`,
				from: "bootstrap-vue-next"
			};
		}
	});
	return resolvers;
}
/**
* Resolver for legacy BootstrapVue3 apps
*
* @deprecated use BootstrapVueNextResolver with https://github.com/bootstrap-vue/bootstrap-vue-next
* @link https://www.npmjs.com/package/bootstrap-vue-3
*/
function BootstrapVue3Resolver(_options = {}) {
	const options = {
		directives: true,
		..._options
	};
	const resolvers = [{
		type: "component",
		resolve: (name) => {
			if (/^B[A-Z]/.test(name)) return {
				name,
				from: "bootstrap-vue-3"
			};
		}
	}];
	if (options.directives) resolvers.push({
		type: "directive",
		resolve: (name) => {
			if (/^B[A-Z]/.test(name)) return {
				name: `V${name}`,
				from: "bootstrap-vue-3"
			};
		}
	});
	return resolvers;
}
//#endregion
//#region src/core/resolvers/devui.ts
const LIB_NAME = "vue-devui";
const HARMLESS = ["ripple"];
function resolveDirectory(name, filename) {
	return `${LIB_NAME}/${name}/${filename}`;
}
function getSideEffects$6(name, filename) {
	if (HARMLESS.includes(name)) return;
	if (["row", "col"].includes(name)) return resolveDirectory("grid", filename);
	if ([
		"aside",
		"content",
		"footer",
		"header",
		"layout"
	].includes(name)) return resolveDirectory("layout", filename);
	if ([
		"overlay",
		"fixed-overlay",
		"flexible-overlay"
	].includes(name)) return resolveDirectory("overlay", filename);
	if ([
		"panel",
		"panel-header",
		"panel-body"
	].includes(name)) return resolveDirectory("panel", filename);
	if ([
		"menu",
		"menu-item",
		"sub-menu"
	].includes(name)) return resolveDirectory("menu", filename);
	if (["tabs", "tab"].includes(name)) return resolveDirectory("tabs", filename);
	if (["form", "form-item"].includes(name)) return resolveDirectory("form", filename);
	if (["collapse", "collapse-item"].includes(name)) return resolveDirectory("collapse", filename);
	if (["steps", "step"].includes(name)) return resolveDirectory("steps", filename);
	if ([
		"radio",
		"radio-group",
		"radio-button"
	].includes(name)) return resolveDirectory("radio", filename);
	if (["column"].includes(name)) return resolveDirectory("table", filename);
	if (["timeline-item"].includes(name)) return resolveDirectory("timeline", filename);
	if (["splitter-pane"].includes(name)) return resolveDirectory("splitter", filename);
	return resolveDirectory(name, filename);
}
function componentsResolver(name, { ssr }) {
	if (!/^D[A-Z]/.test(name)) return;
	const resolveId = kebabCase(name = name.slice(1));
	return {
		name,
		sideEffects: getSideEffects$6(resolveId, "style.css"),
		from: getSideEffects$6(resolveId, `index.${ssr ? "umd" : "es"}.js`)
	};
}
function directivesResolver(name, { ssr }) {
	const resolveId = kebabCase(name);
	return {
		name: `${name}Directive`,
		sideEffects: getSideEffects$6(resolveId, "style.css"),
		from: resolveDirectory(resolveId, `index.${ssr ? "umd" : "es"}.js`)
	};
}
function DevUiResolver(options = {}) {
	const config = {
		directives: true,
		importStyle: true,
		ssr: false,
		...options
	};
	const resolvers = [{
		type: "component",
		resolve: (name) => componentsResolver(name, config)
	}];
	if (config.directives) resolvers.push({
		type: "directive",
		resolve: (name) => directivesResolver(name, config)
	});
	return resolvers;
}
//#endregion
//#region src/core/resolvers/element-plus.ts
var import_umd = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.compareVersions = {}));
	})(exports, (function(exports$1) {
		"use strict";
		const semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
		const validateAndParse = (version) => {
			if (typeof version !== "string") throw new TypeError("Invalid argument expected string");
			const match = version.match(semver);
			if (!match) throw new Error(`Invalid argument not valid semver ('${version}' received)`);
			match.shift();
			return match;
		};
		const isWildcard = (s) => s === "*" || s === "x" || s === "X";
		const tryParse = (v) => {
			const n = parseInt(v, 10);
			return isNaN(n) ? v : n;
		};
		const forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
		const compareStrings = (a, b) => {
			if (isWildcard(a) || isWildcard(b)) return 0;
			const [ap, bp] = forceType(tryParse(a), tryParse(b));
			if (ap > bp) return 1;
			if (ap < bp) return -1;
			return 0;
		};
		const compareSegments = (a, b) => {
			for (let i = 0; i < Math.max(a.length, b.length); i++) {
				const r = compareStrings(a[i] || "0", b[i] || "0");
				if (r !== 0) return r;
			}
			return 0;
		};
		/**
		* Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
		* This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
		* @param v1 - First version to compare
		* @param v2 - Second version to compare
		* @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
		*/
		const compareVersions = (v1, v2) => {
			const n1 = validateAndParse(v1);
			const n2 = validateAndParse(v2);
			const p1 = n1.pop();
			const p2 = n2.pop();
			const r = compareSegments(n1, n2);
			if (r !== 0) return r;
			if (p1 && p2) return compareSegments(p1.split("."), p2.split("."));
			else if (p1 || p2) return p1 ? -1 : 1;
			return 0;
		};
		/**
		* Compare [semver](https://semver.org/) version strings using the specified operator.
		*
		* @param v1 First version to compare
		* @param v2 Second version to compare
		* @param operator Allowed arithmetic operator to use
		* @returns `true` if the comparison between the firstVersion and the secondVersion satisfies the operator, `false` otherwise.
		*
		* @example
		* ```
		* compare('10.1.8', '10.0.4', '>'); // return true
		* compare('10.0.1', '10.0.1', '='); // return true
		* compare('10.1.1', '10.2.2', '<'); // return true
		* compare('10.1.1', '10.2.2', '<='); // return true
		* compare('10.1.1', '10.2.2', '>='); // return false
		* ```
		*/
		const compare = (v1, v2, operator) => {
			assertValidOperator(operator);
			const res = compareVersions(v1, v2);
			return operatorResMap[operator].includes(res);
		};
		const operatorResMap = {
			">": [1],
			">=": [0, 1],
			"=": [0],
			"<=": [-1, 0],
			"<": [-1],
			"!=": [-1, 1]
		};
		const allowedOperators = Object.keys(operatorResMap);
		const assertValidOperator = (op) => {
			if (typeof op !== "string") throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
			if (allowedOperators.indexOf(op) === -1) throw new Error(`Invalid operator, expected one of ${allowedOperators.join("|")}`);
		};
		/**
		* Match [npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver) version range.
		*
		* @param version Version number to match
		* @param range Range pattern for version
		* @returns `true` if the version number is within the range, `false` otherwise.
		*
		* @example
		* ```
		* satisfies('1.1.0', '^1.0.0'); // return true
		* satisfies('1.1.0', '~1.0.0'); // return false
		* ```
		*/
		const satisfies = (version, range) => {
			range = range.replace(/([><=]+)\s+/g, "$1");
			if (range.includes("||")) return range.split("||").some((r) => satisfies(version, r));
			else if (range.includes(" - ")) {
				const [a, b] = range.split(" - ", 2);
				return satisfies(version, `>=${a} <=${b}`);
			} else if (range.includes(" ")) return range.trim().replace(/\s{2,}/g, " ").split(" ").every((r) => satisfies(version, r));
			const m = range.match(/^([<>=~^]+)/);
			const op = m ? m[1] : "=";
			if (op !== "^" && op !== "~") return compare(version, range, op);
			const [v1, v2, v3, , vp] = validateAndParse(version);
			const [r1, r2, r3, , rp] = validateAndParse(range);
			const v = [
				v1,
				v2,
				v3
			];
			const r = [
				r1,
				r2 !== null && r2 !== void 0 ? r2 : "x",
				r3 !== null && r3 !== void 0 ? r3 : "x"
			];
			if (rp) {
				if (!vp) return false;
				if (compareSegments(v, r) !== 0) return false;
				if (compareSegments(vp.split("."), rp.split(".")) === -1) return false;
			}
			const nonZero = r.findIndex((v) => v !== "0") + 1;
			const i = op === "~" ? 2 : nonZero > 1 ? nonZero : 1;
			if (compareSegments(v.slice(0, i), r.slice(0, i)) !== 0) return false;
			if (compareSegments(v.slice(i), r.slice(i)) === -1) return false;
			return true;
		};
		/**
		* Validate [semver](https://semver.org/) version strings.
		*
		* @param version Version number to validate
		* @returns `true` if the version number is a valid semver version number, `false` otherwise.
		*
		* @example
		* ```
		* validate('1.0.0-rc.1'); // return true
		* validate('1.0-rc.1'); // return false
		* validate('foo'); // return false
		* ```
		*/
		const validate = (version) => typeof version === "string" && /^[v\d]/.test(version) && semver.test(version);
		/**
		* Validate [semver](https://semver.org/) version strings strictly. Will not accept wildcards and version ranges.
		*
		* @param version Version number to validate
		* @returns `true` if the version number is a valid semver version number `false` otherwise
		*
		* @example
		* ```
		* validate('1.0.0-rc.1'); // return true
		* validate('1.0-rc.1'); // return false
		* validate('foo'); // return false
		* ```
		*/
		const validateStrict = (version) => typeof version === "string" && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(version);
		exports$1.compare = compare;
		exports$1.compareVersions = compareVersions;
		exports$1.satisfies = satisfies;
		exports$1.validate = validate;
		exports$1.validateStrict = validateStrict;
	}));
})))();
/**
* @deprecated
* @param partialName
* @param options
*/
function getSideEffectsLegacy(partialName, options) {
	const { importStyle } = options;
	if (!importStyle) return;
	if (importStyle === "sass") return ["element-plus/packages/theme-chalk/src/base.scss", `element-plus/packages/theme-chalk/src/${partialName}.scss`];
	else if (importStyle === true || importStyle === "css") return ["element-plus/lib/theme-chalk/base.css", `element-plus/lib/theme-chalk/el-${partialName}.css`];
}
function getSideEffects$5(dirName, options) {
	const { importStyle, ssr, nightly } = options;
	const themeFolder = nightly ? "@element-plus/nightly/theme-chalk" : "element-plus/theme-chalk";
	const esComponentsFolder = nightly ? "@element-plus/nightly/es/components" : "element-plus/es/components";
	if (importStyle === "sass") return ssr ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`] : [`${esComponentsFolder}/base/style/index`, `${esComponentsFolder}/${dirName}/style/index`];
	else if (importStyle === true || importStyle === "css") return ssr ? [`${themeFolder}/base.css`, `${themeFolder}/el-${dirName}.css`] : [`${esComponentsFolder}/base/style/css`, `${esComponentsFolder}/${dirName}/style/css`];
}
function resolveComponent$1(name, options) {
	if (options.exclude && name.match(options.exclude)) return;
	if (!/^El[A-Z]/.test(name)) return;
	if (/^ElIcon.+/.test(name)) return {
		name: name.replace(/^ElIcon/, ""),
		from: "@element-plus/icons-vue"
	};
	const partialName = kebabCase(name.slice(2));
	const { version, ssr, nightly } = options;
	if ((0, import_umd.compare)(version, "1.1.0-beta.1", ">=") || nightly) return {
		name,
		from: `${nightly ? "@element-plus/nightly" : "element-plus"}/${ssr ? "lib" : "es"}`,
		sideEffects: getSideEffects$5(partialName, options)
	};
	else if ((0, import_umd.compare)(version, "1.0.2-beta.28", ">=")) return {
		from: `element-plus/es/el-${partialName}`,
		sideEffects: getSideEffectsLegacy(partialName, options)
	};
	else return {
		from: `element-plus/lib/el-${partialName}`,
		sideEffects: getSideEffectsLegacy(partialName, options)
	};
}
function resolveDirective(name, options) {
	if (!options.directives) return;
	const directive = {
		Loading: {
			importName: "ElLoadingDirective",
			styleName: "loading"
		},
		Popover: {
			importName: "ElPopoverDirective",
			styleName: "popover"
		},
		InfiniteScroll: {
			importName: "ElInfiniteScroll",
			styleName: "infinite-scroll"
		}
	}[name];
	if (!directive) return;
	const { version, ssr, nightly } = options;
	if ((0, import_umd.compare)(version, "1.1.0-beta.1", ">=") || nightly) return {
		name: directive.importName,
		from: `${nightly ? "@element-plus/nightly" : "element-plus"}/${ssr ? "lib" : "es"}`,
		sideEffects: getSideEffects$5(directive.styleName, options)
	};
}
const noStylesComponents = ["ElAutoResizer"];
/**
* Resolver for Element Plus
*
* See https://github.com/antfu/vite-plugin-components/pull/28 for more details
* See https://github.com/antfu/vite-plugin-components/issues/117 for more details
*
* @author @develar @nabaonan @sxzz
* @link https://element-plus.org/ for element-plus
*
*/
function ElementPlusResolver(options = {}) {
	let optionsResolved;
	async function resolveOptions() {
		if (optionsResolved) return optionsResolved;
		optionsResolved = {
			ssr: false,
			version: await getPkgVersion("element-plus", "2.2.2"),
			importStyle: "css",
			directives: true,
			exclude: void 0,
			noStylesComponents: options.noStylesComponents || [],
			nightly: false,
			...options
		};
		return optionsResolved;
	}
	return [{
		type: "component",
		resolve: async (name) => {
			const options = await resolveOptions();
			if ([...options.noStylesComponents, ...noStylesComponents].includes(name)) return resolveComponent$1(name, {
				...options,
				importStyle: false
			});
			else return resolveComponent$1(name, options);
		}
	}, {
		type: "directive",
		resolve: async (name) => {
			return resolveDirective(name, await resolveOptions());
		}
	}];
}
//#endregion
//#region src/core/resolvers/headless-ui.ts
const components$3 = [
	"Combobox",
	"ComboboxButton",
	"ComboboxInput",
	"ComboboxLabel",
	"ComboboxOption",
	"ComboboxOptions",
	"Dialog",
	"DialogDescription",
	"DialogOverlay",
	"DialogPanel",
	"DialogTitle",
	"Disclosure",
	"DisclosureButton",
	"DisclosurePanel",
	"FocusTrap",
	"Listbox",
	"ListboxButton",
	"ListboxLabel",
	"ListboxOption",
	"ListboxOptions",
	"Menu",
	"MenuButton",
	"MenuItem",
	"MenuItems",
	"Popover",
	"PopoverButton",
	"PopoverGroup",
	"PopoverOverlay",
	"PopoverPanel",
	"Portal",
	"PortalGroup",
	"RadioGroup",
	"RadioGroupDescription",
	"RadioGroupLabel",
	"RadioGroupOption",
	"Switch",
	"SwitchDescription",
	"SwitchGroup",
	"SwitchLabel",
	"Tab",
	"TabGroup",
	"TabList",
	"TabPanel",
	"TabPanels",
	"TransitionChild",
	"TransitionRoot"
];
/**
* Resolver for headlessui
*
* @link https://github.com/tailwindlabs/headlessui
*/
function HeadlessUiResolver(options = {}) {
	const { prefix = "" } = options;
	return {
		type: "component",
		resolve: (name) => {
			if (name.startsWith(prefix)) {
				const componentName = name.substring(prefix.length);
				if (components$3.includes(componentName)) return {
					name: componentName,
					from: "@headlessui/vue"
				};
			}
		}
	};
}
//#endregion
//#region src/core/resolvers/idux.ts
const specialComponents = {
	CdkClickOutside: "click-outside",
	CdkDraggable: "drag-drop",
	CdkResizable: "resize",
	CdkResizableHandle: "resize",
	CdkResizeObserver: "resize",
	CdkVirtualScroll: "scroll",
	IxAutoComplete: "auto-complete",
	IxBackTop: "back-top",
	IxCol: "grid",
	IxDatePicker: "date-picker",
	IxDateRangePicker: "date-picker",
	IxInputNumber: "input-number",
	IxLoadingBar: "loading-bar",
	IxLoadingBarProvider: "loading-bar",
	IxRow: "grid",
	IxTab: "tabs",
	IxTimePicker: "time-picker",
	IxTimeRangePicker: "time-picker",
	IxTreeSelect: "tree-select"
};
/**
* Resolver for `@idux/cdk`, `@idux/components` and ``@idux/pro``
*
* @link https://idux.site
*/
function IduxResolver(options = {}) {
	return {
		type: "component",
		resolve: async (name) => {
			const { importStyle, importStyleTheme, exclude = [], scope = "@idux" } = options;
			if (exclude.includes(name)) return;
			const packageName = getPackageName(name);
			if (!packageName) return;
			const resolvedVersion = await getPkgVersion(`${scope}/${packageName}`, "2.0.0");
			let dirname = specialComponents[name];
			if (!dirname) {
				const nameIndex = packageName === "pro" ? 2 : 1;
				dirname = kebabCase(name).split("-")[nameIndex];
			}
			const path = `${scope}/${packageName}/${dirname}`;
			return {
				name,
				from: path,
				sideEffects: packageName === "cdk" ? void 0 : getSideEffects$4(resolvedVersion, path, importStyle, importStyleTheme)
			};
		}
	};
}
function getPackageName(name) {
	let packageName;
	if (/^Cdk[A-Z]/.test(name)) packageName = "cdk";
	else if (/^IxPro[A-Z]/.test(name)) packageName = "pro";
	else if (/^Ix[A-Z]/.test(name)) packageName = "components";
	return packageName;
}
function getSideEffects$4(version, path, importStyle, importStyleTheme) {
	if (!importStyle) return;
	if ((0, import_umd.compare)(version, "2.0.0-beta.0", "<")) return getLegacySideEffects(path, importStyle, importStyleTheme);
	const styleRoot = `${path}/style`;
	const themeRoot = `${path}/theme`;
	const styleImport = `${styleRoot}/${importStyle === "css" ? "index.css" : "index"}`;
	if (!resolveModule(styleImport)) return;
	const themeImport = `${themeRoot}/${importStyleTheme}.css`;
	if (!importStyleTheme || !resolveModule(themeImport)) return styleImport;
	return [styleImport, `${themeRoot}/${importStyleTheme}`];
}
function getLegacySideEffects(path, importStyle, importStyleTheme = "default") {
	const styleImport = `${path}/style/themes/${importStyle === "css" ? `${importStyleTheme}_css` : importStyleTheme}`;
	if (!resolveModule(styleImport)) return;
	return styleImport;
}
//#endregion
//#region src/core/resolvers/inkline.ts
/**
* Resolver for Inkline
*
* @author @alexgrozav
* @link https://github.com/inkline/inkline
*/
function InklineResolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (/^I[A-Z]/.test(name)) return {
				name,
				from: "@inkline/inkline"
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/ionic.ts
/**
* source: https://github.com/nuxt-modules/ionic/blob/main/src/imports.ts
* @author @danielroe
*/
const IonicBuiltInComponents = [
	"IonAccordion",
	"IonAccordionGroup",
	"IonActionSheet",
	"IonAlert",
	"IonApp",
	"IonAvatar",
	"IonBackButton",
	"IonBackdrop",
	"IonBadge",
	"IonBreadcrumb",
	"IonBreadcrumbs",
	"IonButton",
	"IonButtons",
	"IonCard",
	"IonCardContent",
	"IonCardHeader",
	"IonCardSubtitle",
	"IonCardTitle",
	"IonCheckbox",
	"IonChip",
	"IonCol",
	"IonContent",
	"IonDatetime",
	"IonDatetimeButton",
	"IonFab",
	"IonFabButton",
	"IonFabList",
	"IonFooter",
	"IonGrid",
	"IonHeader",
	"IonIcon",
	"IonImg",
	"IonInfiniteScroll",
	"IonInfiniteScrollContent",
	"IonInput",
	"IonInputOtp",
	"IonInputPasswordToggle",
	"IonItem",
	"IonItemDivider",
	"IonItemGroup",
	"IonItemOption",
	"IonItemOptions",
	"IonItemSliding",
	"IonLabel",
	"IonList",
	"IonListHeader",
	"IonLoading",
	"IonMenu",
	"IonMenuButton",
	"IonMenuToggle",
	"IonModal",
	"IonNav",
	"IonNavLink",
	"IonNote",
	"IonPage",
	"IonPicker",
	"IonPickerColumn",
	"IonPickerColumnOption",
	"IonPickerLegacy",
	"IonPopover",
	"IonProgressBar",
	"IonRadio",
	"IonRadioGroup",
	"IonRange",
	"IonRefresher",
	"IonRefresherContent",
	"IonReorder",
	"IonReorderGroup",
	"IonRippleEffect",
	"IonRouterOutlet",
	"IonRow",
	"IonSearchbar",
	"IonSegment",
	"IonSegmentButton",
	"IonSegmentContent",
	"IonSegmentView",
	"IonSelect",
	"IonSelectModal",
	"IonSelectOption",
	"IonSkeletonText",
	"IonSpinner",
	"IonSplitPane",
	"IonTab",
	"IonTabBar",
	"IonTabButton",
	"IonTabs",
	"IonText",
	"IonTextarea",
	"IonThumbnail",
	"IonTitle",
	"IonToast",
	"IonToggle",
	"IonToolbar"
];
/**
* Resolver for ionic framework
*
* @author @mathsgod @reslear
* @link https://ionicframework.com/
*/
function IonicResolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (IonicBuiltInComponents.includes(name)) return {
				name,
				from: "@ionic/vue"
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/layui-vue.ts
const matchComponents$1 = [
	{
		pattern: /^LayAvatarList$/,
		styleDir: "avatar"
	},
	{
		pattern: /^LayBreadcrumbItem$/,
		styleDir: "breadcrumb"
	},
	{
		pattern: /^(LayCarouselItem)$/,
		styleDir: "carousel"
	},
	{
		pattern: /^(LayCheckboxGroup)$/,
		styleDir: "checkbox"
	},
	{
		pattern: /^LayCol$/,
		styleDir: "row"
	},
	{
		pattern: /^(LayCollapseItem)$/,
		styleDir: "collapse"
	},
	{
		pattern: /^LayConfigProvider$/,
		styleDir: void 0
	},
	{
		pattern: /^LayCountUp$/,
		styleDir: void 0
	},
	{
		pattern: /^(LayDropdownMenu|LayDropdownMenuItem|LayDropdownSubMenu)$/,
		styleDir: "dropdown"
	},
	{
		pattern: /^(LayFormItem)$/,
		styleDir: "form"
	},
	{
		pattern: /^(LayMenuItem|LaySubMenu)$/,
		styleDir: "menu"
	},
	{
		pattern: /^(LayRadioGroup)$/,
		styleDir: "radio"
	},
	{
		pattern: /^LaySelectOption$/,
		styleDir: "select"
	},
	{
		pattern: /^LaySkeletonItem$/,
		styleDir: "skeleton"
	},
	{
		pattern: /^LaySplitPanelItem$/,
		styleDir: "splitPanel"
	},
	{
		pattern: /^LayStepItem$/,
		styleDir: "step"
	},
	{
		pattern: /^(LayTabItem)$/,
		styleDir: "tab"
	},
	{
		pattern: /^LayTimelineItem$/,
		styleDir: "timeline"
	}
];
const layuiRE = /^Lay[A-Z]/;
const layerRE = /^(?:layer|LayLayer)$/;
const iconsRE = /^[A-Z]\w+Icon$/;
let libName = "@layui/layui-vue";
function lowerCamelCase(str) {
	return str.charAt(0).toLowerCase() + str.slice(1);
}
function getSideEffects$3(importName, options) {
	const { importStyle = "css" } = options;
	if (!importStyle) return void 0;
	if (libName !== "@layui/layui-vue") return `${libName}/lib/index.css`;
	let styleDir = lowerCamelCase(importName.slice(3));
	for (const item of matchComponents$1) if (item.pattern.test(importName)) {
		styleDir = item.styleDir;
		break;
	}
	if (importStyle === "css" || importStyle) return styleDir ? [`@layui/layui-vue/es/${styleDir}/index.css`, "@layui/layui-vue/es/index/index.css"] : void 0;
}
function resolveComponent(importName, options) {
	let name;
	if (isExclude(importName, options.exclude)) return void 0;
	if (options.resolveIcons && iconsRE.test(importName)) {
		name = importName;
		libName = "@layui/icons-vue";
	} else if (layerRE.test(importName)) {
		name = importName;
		libName = "@layui/layer-vue";
	} else if (layuiRE.test(importName) && !iconsRE.test(importName)) {
		name = importName;
		libName = "@layui/layui-vue";
	}
	return name ? {
		name,
		from: libName,
		sideEffects: getSideEffects$3(name, options)
	} : void 0;
}
/**
* Resolver for layui-vue
*
* @link http://www.layui-vue.com/ for layui-vue
*
*/
function LayuiVueResolver(options = {}) {
	return {
		type: "component",
		resolve: (name) => {
			return resolveComponent(name, options);
		}
	};
}
//#endregion
//#region src/core/resolvers/naive-ui.ts
/**
* Resolver for Naive UI
*
* @author @antfu
* @link https://www.naiveui.com/
*/
function NaiveUiResolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (/^(?:N[A-Z]|n-[a-z])/.test(name)) return {
				name,
				from: "naive-ui"
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/prime-vue.ts
const components$2 = [
	"Accordion",
	"AccordionTab",
	"AutoComplete",
	"Avatar",
	"AvatarGroup",
	"Badge",
	"BlockUI",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Carousel",
	"CascadeSelect",
	"Chart",
	"Checkbox",
	"Chip",
	"Chips",
	"ColorPicker",
	"Column",
	"ColumnGroup",
	"ContextMenu",
	"DataTable",
	"DataView",
	"DataViewLayoutOptions",
	"DeferredContent",
	"Dialog",
	"Divider",
	"Dock",
	"Dropdown",
	"Editor",
	"Fieldset",
	"FileUpload",
	"FloatLabel",
	"FullCalendar",
	"Galleria",
	"IconField",
	"IconField",
	"Image",
	"InlineMessage",
	"Inplace",
	"InputGroup",
	"InputGroupAddon",
	"InputIcon",
	"InputMask",
	"InputNumber",
	"InputOtp",
	"InputSwitch",
	"InputText",
	"Knob",
	"Listbox",
	"MegaMenu",
	"Menu",
	"Menubar",
	"Message",
	"MeterGroup",
	"MultiSelect",
	"OrderList",
	"OrganizationChart",
	"OverlayPanel",
	"Paginator",
	"Panel",
	"PanelMenu",
	"Password",
	"PickList",
	"ProgressBar",
	"ProgressSpinner",
	"RadioButton",
	"Rating",
	"Row",
	"ScrollPanel",
	"ScrollTop",
	"SelectButton",
	"Sidebar",
	"Skeleton",
	"Slider",
	"SpeedDial",
	"SplitButton",
	"Splitter",
	"SplitterPanel",
	"Stepper",
	"StepperPanel",
	"Steps",
	"TabMenu",
	"TabPanel",
	"TabView",
	"Tag",
	"Terminal",
	"TerminalService",
	"Textarea",
	"TieredMenu",
	"Timeline",
	"Timelist",
	"ToggleButton",
	"Toolbar",
	"Tree",
	"TreeSelect",
	"TreeTable",
	"TriStateCheckbox",
	"VirtualScroller"
];
/**
* Resolver for PrimeVue - If you're using a component with the same tag as an native HTML element (e.g. button) the component must be in uppercase
*
* @link https://github.com/primefaces/primevue
*/
function PrimeVueResolver(options = {}) {
	return {
		type: "component",
		resolve: (name) => {
			const sideEffects = [];
			if (options.importStyle) sideEffects.push("primevue/resources/primevue.min.css");
			if (options.importIcons) sideEffects.push("primeicons/primeicons.css");
			if (options.importTheme) sideEffects.push(`primevue/resources/themes/${options.importTheme}/theme.css`);
			if (options.prefix) {
				if (!name.startsWith(options.prefix)) return;
				name = name.substring(options.prefix.length);
			}
			if (components$2.includes(name)) return {
				from: `primevue/${name.toLowerCase()}`,
				sideEffects
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/quasar.ts
/**
* Resolver for Quasar
*
* @link https://github.com/quasarframework/quasar
*/
function QuasarResolver() {
	let components = [];
	return {
		type: "component",
		resolve: async (name) => {
			if (!components.length) {
				const quasarApiListPath = resolveModule("quasar/dist/transforms/api-list.json");
				if (quasarApiListPath) components = JSON.parse(await promises.readFile(quasarApiListPath, "utf-8"));
			}
			if (components.includes(name)) return {
				name,
				from: "quasar"
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/tdesign.ts
function TDesignResolver(options = {}) {
	const pluginList = [
		"DialogPlugin",
		"LoadingPlugin",
		"MessagePlugin",
		"NotifyPlugin"
	];
	return {
		type: "component",
		resolve: (name) => {
			const { library = "vue", exclude } = options;
			const importFrom = options.esm ? "/esm" : "";
			if (isExclude(name, exclude)) return;
			if (options.resolveIcons && /[a-z]Icon$/.test(name)) return {
				name,
				from: `tdesign-icons-${library}${importFrom}`
			};
			if (name.startsWith("TTypography") || name.startsWith("Typography")) return {
				name: name.slice(name.startsWith("TTypography") ? 11 : 10),
				from: `tdesign-${library}${importFrom}`
			};
			if (name.startsWith("TQrcode")) return {
				name: "QRCode",
				from: `tdesign-${library}${importFrom}`
			};
			if (/^T[A-Z]/.test(name) || pluginList.includes(name)) return {
				name: /^T[A-Z]/.test(name) ? name.slice(1) : name,
				from: `tdesign-${library}${importFrom}`
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/vant.ts
const moduleType = isSSR ? "lib" : "es";
function getSideEffects$2(dirName, options) {
	const { importStyle = true } = options;
	if (!importStyle || isSSR) return;
	if (importStyle === "less") return `vant/${moduleType}/${dirName}/style/less`;
	if (importStyle === "css") return `vant/${moduleType}/${dirName}/style/index`;
	return `vant/${moduleType}/${dirName}/style/index`;
}
/**
* Resolver for Vant
*
* @link https://github.com/youzan/vant
*/
function VantResolver(options = {}) {
	return {
		type: "component",
		resolve: (name) => {
			if (name.startsWith("Van")) {
				const partialName = name.slice(3);
				return {
					name: partialName,
					from: `vant/${moduleType}`,
					sideEffects: getSideEffects$2(kebabCase(partialName), options)
				};
			}
		}
	};
}
//#endregion
//#region src/core/resolvers/varlet-ui.ts
const varFunctions = [
	"ImagePreview",
	"Snackbar",
	"Picker",
	"ActionSheet",
	"Dialog",
	"Locale",
	"StyleProvider",
	"LoadingBar"
];
const varDirectives = [
	"Ripple",
	"Lazy",
	"Hover"
];
function getResolved(name, options) {
	const { importStyle = "css", importCss = true, importLess, styleExtname = ".mjs", autoImport = false } = options;
	const path = "@varlet/ui";
	const sideEffects = [];
	if (importStyle || importCss) if (importStyle === "less" || importLess) sideEffects.push(`${path}/es/${kebabCase(name)}/style/less`);
	else sideEffects.push(`${path}/es/${kebabCase(name)}/style/index${styleExtname}`);
	return {
		from: path,
		name: autoImport ? name : `_${name}Component`,
		sideEffects
	};
}
/**
* Resolver for VarletUI
*
* @link https://github.com/varletjs/varlet
*/
function VarletUIResolver(options = {}) {
	return [{
		type: "component",
		resolve: (name) => {
			const { autoImport = false } = options;
			if (autoImport && varFunctions.includes(name)) return getResolved(name, options);
			if (name.startsWith("Var")) return getResolved(name.slice(3), options);
		}
	}, {
		type: "directive",
		resolve: (name) => {
			const { directives = true } = options;
			if (!directives) return;
			if (!varDirectives.includes(name)) return;
			return getResolved(name, options);
		}
	}];
}
//#endregion
//#region src/core/resolvers/veui.ts
const VEUI_PACKAGE_NAME = "veui";
let components$1;
/**
* Resolver for VEUI
*
* @link https://github.com/ecomfe/veui
*/
function VeuiResolver(options = {}) {
	const { alias = VEUI_PACKAGE_NAME } = options;
	if (!components$1) try {
		const componentsData = __require(`${alias}/components.json`);
		components$1 = new Set(componentsData.map(({ name }) => name));
	} catch {
		throw new Error("[unplugin-vue-components:veui] VEUI is not installed");
	}
	return {
		type: "component",
		resolve: (name) => {
			if (/^Veui[A-Z]/.test(name)) {
				const componentName = name.slice(4);
				if (!components$1.has(componentName)) return;
				return {
					name: componentName,
					from: alias,
					sideEffects: getSideEffects$1(componentName, options)
				};
			}
		}
	};
}
const formatters = {
	"kebab-case": kebabCase,
	"camelCase": camelCase,
	"PascalCase": pascalCase
};
const peerPaths = /* @__PURE__ */ new Map();
function assertPeerPath(peerPath) {
	if (!peerPaths.has(peerPath)) try {
		resolvePathSync(peerPath);
		peerPaths.set(peerPath, true);
	} catch {
		peerPaths.set(peerPath, false);
	}
	return peerPaths.get(peerPath);
}
function getSideEffects$1(name, { alias = VEUI_PACKAGE_NAME, modules = [], locale = "zh-Hans", global = [] }) {
	const localeModules = (locale ? Array.isArray(locale) ? locale : [locale] : []).map((locale) => `${alias}/locale/${locale}/${name}.js`);
	const peerModules = modules.map(({ package: pack, path = "components", fileName = "{module}.css", transform = "kebab-case" }) => {
		const peer = transform ? formatters[transform](name) : name;
		return normalize(join(pack, path, fileName.replace(/\$?\{module\}/g, peer)));
	});
	return [
		...localeModules,
		...global,
		...peerModules
	].filter(assertPeerPath);
}
//#endregion
//#region src/core/resolvers/view-ui.ts
function getSideEffects(componentName) {
	const sideEffects = ["view-design/dist/styles/iview.css", "popper.js/dist/umd/popper.js"];
	if (/^Table|^Slider|^Tab/.test(componentName)) sideEffects.push("element-resize-detector");
	if (componentName.startsWith("Date")) sideEffects.push("js-calendar");
	return sideEffects;
}
const matchComponents = [{
	pattern: /^List/,
	compDir: "list"
}];
function getCompDir(compName) {
	let compPath;
	const total = matchComponents.length;
	for (let i = 0; i < total; i++) {
		const matcher = matchComponents[i];
		if (compName.match(matcher.pattern)) {
			compPath = `${matcher.compDir}/${kebabCase(compName)}.vue`;
			break;
		}
	}
	if (!compPath) compPath = kebabCase(compName);
	return compPath;
}
/**
* Resolver for View UI
* @requires @originjs/vite-plugin-commonjs
* @author @nabaonan
* @link https://www.iviewui.com/
* @description has known problems list below
* - select component render error PR: https://github.com/view-design/ViewUI/pull/944,  choose can't display value,because click option trigger twice,at second time,select value turn into undefined.
* - scroll component has a template syntax called lang='html',it is require html-loader,but vite plugin not support yet,remove it can run. relate pr: https://github.com/view-design/ViewUI/pull/985
*/
function ViewUiResolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (/^I[A-Z]/.test(name)) {
				const compName = name.slice(1);
				return {
					from: `view-design/src/components/${getCompDir(compName)}`,
					sideEffects: getSideEffects(compName)
				};
			}
		}
	};
}
//#endregion
//#region src/core/resolvers/vuetify.ts
/**
* Resolver for Vuetify
*
* @link https://github.com/vuetifyjs/vuetify
*/
function VuetifyResolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (/^V[A-Z]/.test(name)) return {
				name,
				from: "vuetify/lib"
			};
		}
	};
}
/**
* Resolver for Vuetify 3 Beta
*
* @link https://github.com/vuetifyjs/vuetify
*/
function Vuetify3Resolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (/^V[A-Z]/.test(name)) return {
				name,
				from: "vuetify/components"
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/vueuse.ts
let components;
/**
* Resolver for VueUse
*
* @link https://github.com/vueuse/vueuse
*/
function VueUseComponentsResolver() {
	return {
		type: "component",
		resolve: (name) => {
			if (!components) {
				let indexesJson;
				try {
					const corePath = resolveModule("@vueuse/core") || process.cwd();
					const path = resolveModule("@vueuse/core/indexes.json") || resolveModule("@vueuse/metadata/index.json") || resolveModule("@vueuse/metadata/index.json", { paths: [corePath] });
					indexesJson = JSON.parse(readFileSync(path, "utf-8"));
					components = indexesJson.functions.filter((i) => i.component && i.name).map(({ name }) => name[0].toUpperCase() + name.slice(1));
				} catch (error) {
					console.error(error);
					throw new Error("[vue-components] failed to load @vueuse/core, have you installed it?");
				}
			}
			if (components && components.includes(name)) return {
				name,
				as: name,
				from: "@vueuse/components"
			};
		}
	};
}
//#endregion
//#region src/core/resolvers/vueuse-directive.ts
let directives;
/**
* Resolver for VueUse
*
* @link https://github.com/vueuse/vueuse
*/
function VueUseDirectiveResolver() {
	return {
		type: "directive",
		resolve: (name) => {
			if (!directives) {
				let indexesJson;
				try {
					const corePath = resolveModule("@vueuse/core") || process.cwd();
					const path = resolveModule("@vueuse/core/indexes.json") || resolveModule("@vueuse/metadata/index.json") || resolveModule("@vueuse/metadata/index.json", { paths: [corePath] });
					indexesJson = JSON.parse(readFileSync(path, "utf-8"));
					directives = indexesJson.functions.filter((i) => i.directive && i.name).map(({ name }) => name[0].toUpperCase() + name.slice(1)).map((name) => name.startsWith("Use") ? name.slice(3) : name);
				} catch (error) {
					console.error(error);
					throw new Error("[vue-components] failed to load @vueuse/core, have you installed it?");
				}
			}
			if (directives && directives.includes(name)) return {
				name: `v${name}`,
				as: `v${name}`,
				from: "@vueuse/components"
			};
		}
	};
}
//#endregion
export { AntDesignVueResolver, ArcoResolver, BootstrapVue3Resolver, BootstrapVueNextResolver, BootstrapVueResolver, DevUiResolver, ElementPlusResolver, HeadlessUiResolver, IduxResolver, InklineResolver, IonicBuiltInComponents, IonicResolver, LayuiVueResolver, NaiveUiResolver, PrimeVueResolver, QuasarResolver, TDesignResolver, VantResolver, VarletUIResolver, VeuiResolver, ViewUiResolver, VueUseComponentsResolver, VueUseDirectiveResolver, Vuetify3Resolver, VuetifyResolver, getResolved };
