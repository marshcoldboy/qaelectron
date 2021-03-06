module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ["electron-log"],
      nodeIntegration: false,
      preload: "src/preload.js",
      builderOptions: {
        // afterPack: "./scripts/postbuild.js",
        appId: "com.megasanjay.electronvueflask",
        afterSign: "./scripts/notarize.js",
        asar: true,
        generateUpdatesFilesForAllChannels: true,
        files: ["**/*", "!pyflask/", "!build/", "!api.spec"],
        win: {
          target: "nsis",
          icon: "./src/assets/app-icons/windowsAppIcon.ico",
          extraResources: [{ from: "./src/pyflaskdist/api.exe" }],
        },
        mac: {
          target: ["dmg", "zip"],
          // arch: ["x64", "arm64"],
          icon: "./src/assets/app-icons/macAppIcon.png",
          extraResources: [{ from: "./src/pyflaskdist/api" }],
          darkModeSupport: false,
          hardenedRuntime: true,
          gatekeeperAssess: false,
          entitlements: "./entitlements.mac.inherit.plist",
          entitlementsInherit: "./entitlements.mac.inherit.plist",
        },
        linux: {
          target: "AppImage",
          icon: "./src/assets/app-icons/linuxAppIcon.png",
          extraResources: [{ from: "./src/pyflaskdist/api" }],
        },
        nsis: {
          oneClick: false,
          deleteAppDataOnUninstall: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,// 允许修改安装目录
          installerIcon: "./src/assets/app-icons/windowsAppIcon.ico",
          createDesktopShortcut: true,
        },
        publish: {
          provider: "github",
          repository: "https://github.com/marshcoldboy/qaelectron.git",
        },
      },
    },
  },
  configureWebpack:{
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
      ]
    }
  }
};

