##
由于前端迭代太快，使用npm可能无法完全下载所需库
npm install -g yarn
安装yarn包管理器进行依赖安装
## Project setup

```shell
yarn install
cd src/pyflask
pip install -r requirements.txt
```
yarn install时需要下载electron，科学上网可解决或者换cnpm在国内源下载
## Running the application

### Vue frontend running in Electron

To compile the front end application and open it an Electron instance, use the following command:

```shell
yarn electron:serve
```

Using this command should compile your application and also allow hot-reloads for development. The `dist_electron` folder will be created at the root of your project and is your final actual electron application with an automatically generated 'package.json' and 'index.js' files. You don't have to worry about this folder too much. It should also automatically copy the `pyflask` folder to the dist_electron directory. If you would like to change/modify this functionality, change the path locations in the `package.json` file under the `electron:serve-precopy` script.

If you want the backend to also run alongside the browser instance, just open a new terminal instance and run the following command:

```shell
python pyflask/api.py
```
之前pip install -r requirements.txt可能漏装一些库，运行时按照报错补充
`Note:` This instance will still not have access to the native node libraries since these are provided through the remote Electron mopdule.
