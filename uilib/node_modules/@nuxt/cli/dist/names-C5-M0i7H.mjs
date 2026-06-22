//#region ../nuxi/src/utils/templates/names.ts
/**
* List of available template names for `nuxi add-template`.
*
* This is a separate module so that `main.ts` can import just the names
* without pulling in all 16 template implementation modules.
*/
const templateNames = [
	"api",
	"app",
	"app-config",
	"component",
	"composable",
	"error",
	"layer",
	"layout",
	"middleware",
	"module",
	"page",
	"plugin",
	"server-middleware",
	"server-plugin",
	"server-route",
	"server-util"
];
//#endregion
export { templateNames as t };
