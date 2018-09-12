declare class QiniuUpload implements UploadInterface {
    private REMOTE_URL;
    private fetchToken;
    setFetchTokenCallback(callback: any): void;
    upload(file: any, key?: string): Promise<{}>;
}
export default QiniuUpload;
