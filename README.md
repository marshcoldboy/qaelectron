##
由于前端迭代太快，使用npm可能无法完全下载所需库
npm install -g yarn
安装yarn包管理器进行依赖安装
## Project setup

```shell
yarn install
```
yarn install时需要下载electron，科学上网可解决或者换cnpm在国内源下载
## Running the application

### Vue frontend running in Electron

To compile the front end application and open it an Electron instance, use the following command:

```shell
yarn electron:serve
```

Using this command should compile your application and also allow hot-reloads for development. The `dist_electron` folder will be created at the root of your project and is your final actual electron application with an automatically generated 'package.json' and 'index.js' files. You don't have to worry about this folder too much. It should also automatically copy the `pyflask` folder to the dist_electron directory. If you would like to change/modify this functionality, change the path locations in the `package.json` file under the `electron:serve-precopy` script.

前端的样例服务端api.py不再使用
运行后端问答系统的api.py

```shell
pip install -r requirements.txt
python api.py
```
之前pip install -r requirements.txt可能漏装一些库，运行时按照报错补充
`Note:` This instance will still not have access to the native node libraries since these are provided through the remote Electron mopdule.
## Create Electron application
### Local build
To now build the final electron application you can use the following command:
```shell
yarn electron:build
```
This will create the installer needed to share your application. The final installer will be saved in the dist_electron folder.
### application
绿色版：win-unpacked
安装：vue-electron-flask Setup 1.0.1.exe
其他文件无需理会
