class QiniuUpload implements UploadInterface {

    private REMOTE_URL: string = '//up.qbox.me';

    private fetchToken;

    setFetchTokenCallback(callback) {
        this.fetchToken = callback;
    }

    upload(file, key: string = '') {
        return new Promise((resolve, reject) => {
            if (typeof this.fetchToken !== 'function') {
                throw new Error('please set fetch token callback.');
            }
            this.fetchToken().then(token => {
                const filename = key === '' ? file.name : key;
                // @ts-ignore
                const formData = new FormData();
                formData.append('file', file);
                formData.append('token', token);
                formData.append('key', filename);
                // @ts-ignore
                const xhr = new XMLHttpRequest();
                xhr.open('POST', this.REMOTE_URL, true);
                xhr.send(formData);
                xhr.onreadystatechange = () => {
                    // @ts-ignore
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        // @ts-ignore
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            });
        });
    }
}

export default QiniuUpload;
