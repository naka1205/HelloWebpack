# HelloWebpack

## 使用 Webpack5 一步步搭建初始项目

### 项目初始化

```js
npm init -y

```
-y 表示所有选择选yes

### 安装webpack

```js
npm install --save-dev webpack webpack-cli

```
创建目录 `src` ,并在 `src` 目录下创建 `index.js` 文件

### 配置webpack

在项目的根目录创建 `webpack.config.js` 文件

```js
const path = require('path') 

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = { 
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ASSET_PATH
    },
} 
```

* 属性 `entry` 项目入口配置，这里指向 `src` 目录的 `index.js`
* 属性 `output` 编译文件配置，这里 `path` 指定输出的路径为 `dist`

### 添加插件

```js
npm install --save-dev html-webpack-plugin clean-webpack-plugin

```

在项目的根目录创建 `index.html` 文件

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello WebPack5</title>
</head>
<body>
    <div id="app"></div> 
</body>
</html>
```

在 `webpack.config.js` 文件中 加入配置

```js
const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin') 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = { 
  /* ... */ 
 
  plugins: [ 
    new HtmlWebpackPlugin({ 
      title: 'Hello Webpack5', 
      template: path.resolve(__dirname, 'index.html'), // template file 
      filename: 'index.html', // output file 
    }), 
    new CleanWebpackPlugin()
  ]
} 
```

* `html-webpack-plugin` 自定义HTML模板
* `clean-webpack-plugin` 自动清理 `dist`

### 添加Babel

```js
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties

```

安装 `Babel` 之后，项目中可以使用最新的 JS 语法。
在 `webpack.config.js` 文件中 加入配置

```js
module.exports = { 
    /* ... */ 
 
    module: {
        rules :[
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: ['babel-loader'], 
            }
        ]
    }
} 

```

在项目的根目录创建 `.babelrc` 文件

```js
{ 
    "presets": ["@babel/preset-env"], 
    "plugins": ["@babel/plugin-proposal-class-properties"] 
}
```

在 `index.js` 文件中加入测试代码

```js
class Hello { 
    name = 'Webpack5' 
} 
const hello = new Hello() 

const p = document.createElement('p') 
p.textContent = `I like ${hello.name}.` 

const heading = document.createElement('h1') 
heading.textContent = 'Hello!' 

const app = document.querySelector('#app') 
app.append(heading, p) 
```

### 添加DevServer

```js
npm install --save-dev webpack-dev-server

```
在 `webpack.config.js` 文件中 加入配置

```js
module.exports = { 
    /* ... */ 
 
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        index: 'index.html',
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000
    }
} 

```

在 `package.json` 文件中加入

```js
"scripts": {
    "start": "webpack serve --open chrome",
    "build": "webpack"
},
```

* 控制台中输入 `npm run start` 启动开发模式
* 控制台中输入 `npm run build` 将项目打包


### 添加Sass

```js
npm install --save-dev sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass 

```

在 `webpack.config.js` 文件中 加入配置
```js
module.exports = { 
    /* ... */ 
 
    module: {
        rules :[
            { 
                test: /\.(scss|css)$/, 
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], 
            }
        ]
    }
}

```

在项目的根目录创建 `postcss.config.js` 文件

```js
module.exports = { 
    plugins: { 
        'postcss-preset-env': { 
            browsers: 'last 2 versions', 
        }
    }
}

```

在 `src` 目录下创建 `styles` , ,并在 `styles` 目录下创建 `index.scss` 文件

```scss
$font-size: 1rem; 
$font-color: lch(53 105 40); 
 
html { 
  font-size: $font-size; 
  color: $font-color; 
}
```

在 `index.js` 文件导入测试

```js
import './styles/index.scss' 
```

### 添加静态资源

在 `webpack.config.js` 文件中 加入配置
```js
module.exports = { 
    /* ... */ 
 
    module: {
        rules :[
            //Image
            { 
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i, 
                type: 'asset/resource'
            },
            //Fonts
            { 
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, 
                type: 'asset/inline', 
            }, 
        ]
    }
}

```

这里使用 `webpack` 内置的asset modules，可用于静态资源
