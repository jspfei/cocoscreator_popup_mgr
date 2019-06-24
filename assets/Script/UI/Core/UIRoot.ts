 
import { UILayer } from "./UILayer"; 
/*
    UI根节点，简单的封装
*/

const { ccclass, property } = cc._decorator;

class PageElement {
    controller: IPage;
    obj: cc.Node;
};

@ccclass
export default class UIRoot extends cc.Component implements IUIRoot {

    // 分层的目的是，保证某些UI永远在上面。比如通讯协议的阻塞框。
    @property(cc.Node)
    layers: cc.Node[] = [];

    // 默认各个界面的模板。
    @property(cc.Prefab)
    prefabs: cc.Prefab[] = [];

    _pages: PageElement[] = [];


    onLoad() {
        window.uiRoot = this;

    }

    start() {

      
        if (this.layers.length !== UILayer.LAYER_MAX) {
            cc.error('UIROOT 层数不正确！');
        }
        for (let i = 0; i < this.layers.length; i++) {
            if (!this.layers[i]) {
                cc.error('UIROOT 该层数无数据！', i);
            }
        } 
      
    }

    getPrefab(prefab: string): cc.Prefab {

        for (let i = 0; i < this.prefabs.length; i++) {
            if (this.prefabs[i].name === prefab) {
                return this.prefabs[i];
            }
        }
        return null;
    }

    attachToLayer(layer: IUILayer, obj: cc.Node) {
        let n = layer as number;
        if (n >= 0 && n < this.layers.length) {
            obj.parent = this.layers[n];
        } else {
            cc.warn("无法找到层级：", n);
        }
    }

    show<T extends IPage>(type: { prototype: T, new(): T }, muteAudio = false): T {

        let ptr: IPage = null;

        if (!muteAudio) {
            //window.audioMgr.PlayAudio(SoundRes.openPage);
        }

        for (let i = 0; i < this._pages.length; i++) {
            if (typeof (this._pages[i].controller) === typeof (type)) {
                ptr = this._pages[i].controller;
            }
        }
        if (ptr == null) {
            ptr = new type();

            let obj: cc.Node = null;
            let prefab = this.getPrefab(ptr.prefab);
            if (prefab) {
                obj = cc.instantiate(prefab);

                // 将这个对方，放在对应层级上。
                this.attachToLayer(ptr.layer, obj);
                obj.zIndex = 1000;
                cc.log("创建页面成功：", obj.x, obj.y);
            } else {
                cc.warn("无法找到此页面：", ptr.prefab);
            }

            ptr.onNew(obj);

            let page = new PageElement();
            page.controller = ptr;
            page.obj = obj;
            this._pages.push(page);

            let animation = page.obj.getComponent(cc.Animation);
            if (animation) {
                let ss = animation.play('open');
                if (ss) {
                    this.scheduleOnce(() => {
                        page.obj.active = true;
                    }, ss.duration);
                }
            }
        }

        // 显示。显示。
        ptr.onShow();
        this.checkShowLayer();
        return ptr as T;
    }

    hide(page: IPage) {
        let that = this;

        for (let i = 0; i < this._pages.length; i++) {
            let currentPage = this._pages[i];

            if (this._pages[i].controller == page) {
                this._pages.RemoveAt(i);
                i--;

                currentPage.controller.onHide();

                cc.log('remove page', currentPage);
                currentPage.controller.onDestroy();

                // 删掉并销毁
                if (currentPage.obj) {

                    let destroyFunc = () => {
                        currentPage.obj.parent = null;
                        currentPage.obj.destroy();
                        currentPage.obj = null;

                        that.checkShowLayer();
                    }

                    let delayDestroy = false;
                    let animation = currentPage.obj.getComponent(cc.Animation);
                    if (animation) {
                        animation.play('close');
                        let state = animation.getAnimationState('close');
                        if (state) {
                            let component = currentPage.obj.getComponent(cc.Component);
                            if (component) {
                                component.scheduleOnce(destroyFunc, state.clip.duration);
                                delayDestroy = true;
                            }
                        }
                    }

                    if (!delayDestroy) {
                        destroyFunc();
                    }
                }
            }
        }
        //this.checkShowLayer();
        return null;
    }

    hideByPrefabName(name: string) {
        for (let i = 0; i < this._pages.length; i++) {
            if (this._pages[i].controller.prefab === name) {
                this.hide(this._pages[i].controller);
                break;
            }
        }
    }

    hideAll() {
        for (let i = this._pages.length - 1; i >= 0; i--) {
            this.hide(this._pages[i].controller);
        }
    }

    checkShowLayer() {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].childrenCount > 0) {
                this.layers[i].active = true;
            } else {
                this.layers[i].active = false;
            }
        }
    }
}
