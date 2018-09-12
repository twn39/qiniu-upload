export class UploadFile {

    file: object;
    name: string;

    constructor(file: object, name: string = '') {
        this.file = file;
        this.name = name;
    }
};

export class QiniuUpload implements UploadInterface {

    readonly REMOTE_URL: string = '//up.qbox.me';

    private fetchToken;

    setFetchTokenCallback(callback) {
        this.fetchToken = callback;
    }

    upload(file, key: string = ''): Promise<{}> {
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

    multiupload(files: Array<UploadFile>): Promise<{}> {

        let farray = files.map((file:UploadFile) => {
            return this.upload(file.file, file.name);
        });

        return Promise.all(farray);
    }
};
