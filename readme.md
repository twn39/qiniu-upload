### 七牛前端上传SDK

七牛前端上传SDK，小文件上传，基于qiniu表单上传api构建，无任何依赖，1.3KB文件大小。

#### 使用

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