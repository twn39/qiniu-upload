var QiniuUpload = /** @class */ (function () {
    function QiniuUpload() {
        this.REMOTE_URL = '//up.qbox.me';
    }
    QiniuUpload.prototype.setFetchTokenCallback = function (callback) {
        this.fetchToken = callback;
    };
    QiniuUpload.prototype.upload = function (file, key) {
        var _this = this;
        if (key === void 0) { key = ''; }
        return new Promise(function (resolve, reject) {
            if (typeof _this.fetchToken !== 'function') {
                throw new Error('please set fetch token callback.');
            }
            _this.fetchToken().then(function (token) {
                var filename = key === '' ? file.name : key;
                // @ts-ignore
                var formData = new FormData();
                formData.append('file', file);
                formData.append('token', token);
                formData.append('key', filename);
                // @ts-ignore
                var xhr = new XMLHttpRequest();
                xhr.open('POST', _this.REMOTE_URL, true);
                xhr.send(formData);
                xhr.onreadystatechange = function () {
                    // @ts-ignore
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        // @ts-ignore
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
            });
        });
    };
    return QiniuUpload;
}());
export default QiniuUpload;
