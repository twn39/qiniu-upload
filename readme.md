### 七牛前端上传SDK

七牛前端上传SDK，小文件上传，基于qiniu表单上传api构建，无任何依赖，1.3KB文件大小。

#### 教程和说明

https://lives.ws/posts/15

#### 安装

```
npm i @twn39/qiniu-upload
```
或者

```
yarn add @twn39/qiniu-upload
```

### 加载

**裸插件**（无模块加载器）

```js
<script src="node_modules/@twn39/qiniu-upload/dist/QiniuUpload.js"></script>
```

**模块化导入** (webpack)

```js
import {QiniuUpload, UploadFile} from '@twn39/qiniu-upload';
```

#### 使用

**单文件上传**：

```js
const fileUpload = new QiniuUpload();
fileUpload.setFetchTokenCallback(async () => {
    //  fetch remote token ...
    return token;
});
const file = document.querySelector('#file').files[0];
button.addEventListener('click', () => {
    fileUpload.upload(file, filename = '').then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
});
```

**多文件上传**

```js
let files = [];
files.push(new UploadFile(document.querySelector('.file').files[0]));
files.push(new UploadFile(document.querySelector('.file1').files[0]));
files.push(new UploadFile(document.querySelector('.file2').files[0]));
console.log(files);
qiniuUpload.multiupload(files).then(data => {
    console.log(data);
});
```

#### 方法

```ts
declare class UploadFile {
    file: object;
    name: string;
    constructor(file: object, name?: string);
}
declare class QiniuUpload implements UploadInterface {
    readonly REMOTE_URL: string;
    private fetchToken;
    setFetchTokenCallback(callback: any): void;
    upload(file: any, key?: string): Promise<{}>;
    multiupload(files: Array<UploadFile>): Promise<{}>;
}
```
