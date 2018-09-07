var QiniuUpload = (function () {
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
                var formData = new FormData();
                formData.append('file', file);
                formData.append('token', token);
                formData.append('key', filename);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', _this.REMOTE_URL, true);
                xhr.send(formData);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
            });
        });
    };
    return QiniuUpload;
}());
//# sourceMappingURL=index.js.map