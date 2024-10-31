module.exports = {
	paths: function (paths, env) {
		const root = paths.appPath
		paths.appBuild = `${root}/servers/ui_app`
		paths.appPublic = `${root}/src/ui/public`
		paths.appHtml = `${root}/src/ui/public/index.html`
		paths.appIndexJs = `${root}/src/ui/index.js`
		paths.appPackageJson = `${root}/package.json`
		paths.appSrc = `${root}/src/ui`
		paths.testsSetup = `${root}/src/ui/setupTests.js`
		paths.appNodeModules = `${root}/node_modules`
		paths.ownPath = `${root}/node_modules/react-scripts`
		paths.ownNodeModules = `${root}/node_modules/react-scripts/node_modules`
		return paths;
	},
}