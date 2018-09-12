export declare class UploadFile {
    file: object;
    name: string;
    constructor(file: object, name?: string);
}
export declare class QiniuUpload implements UploadInterface {
    readonly REMOTE_URL: string;
    private fetchToken;
    setFetchTokenCallback(callback: any): void;
    upload(file: any, key?: string): Promise<{}>;
    multiupload(files: Array<UploadFile>): Promise<{}>;
}
