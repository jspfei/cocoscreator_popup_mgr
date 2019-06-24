import { enhancedLoadResourceWithType, enhancedLoadResource } from "./AssetLoader";


class AssetRef {
    asset: Object = null;
    counter: number = 0;
}

export class MyLoader {

    _map: { [key: string]: AssetRef } = {};

    loadRes(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any) => void): void {
        let a = this._map[url];
        if (a) {
            a.counter++;
            completeCallback(null, a.asset);
        } else {
            enhancedLoadResourceWithType(url, type, (error: Error, resource: any) => {
                if (!error) {
                    a = this._map[url];
                    if (!a) {
                        a = new AssetRef();
                        a.asset = resource;
                        a.counter = 0;
                        this._map[url] = a;
                    }
                    a.counter++;
                    completeCallback(null, a.asset);
                } else {
                    completeCallback(error, resource);
                }
            });
        }
    }

    loadRes2(url: string, completeCallback: (error: Error, resource: any) => void): void {
        let a = this._map[url];
        if (a) {
            a.counter++;
            completeCallback(null, a.asset);
        } else {
            enhancedLoadResource(url, (error: Error, resource: any) => {
                if (!error) {
                    a = this._map[url];
                    if (!a) {
                        a = new AssetRef();
                        a.asset = resource;
                        a.counter = 0;
                        this._map[url] = a;
                    }
                    a.counter++;
                    completeCallback(null, a.asset);
                } else {
                    completeCallback(error, resource);
                }
            });
        }
    }

    // 减少引用
    deRef(url: string) {
        let a = this._map[url];
        if (a) {
            a.counter--;

            // 自动释放（暂时关闭）
            if (false && a.counter <= 0) {
                cc.loader.release(a.asset as cc.Asset);
            }
        }
    }
}

let _myLoader = null;
export function loader(): MyLoader {
    if (!_myLoader) {
        _myLoader = new MyLoader()
    }
    return _myLoader;
}