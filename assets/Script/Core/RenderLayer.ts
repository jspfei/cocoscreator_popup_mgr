// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class RenderLayer extends cc.Component {

    @property
    layer: number = 0;

    _freq: boolean = false;

    _addon: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.layer > 0 && this.node && this.node._sgNode) {
            this.node._sgNode.renderLayer = this.layer;
        }
    }

    start() {
        if (this._freq) {
            this.schedule(() => {
                if (this.layer > 0 && this.node && this.node._sgNode) {
                    this.node._sgNode.renderLayer = this.layer;
                }
            }, 1);
            // cc.log("render layer:", this.layer);
        } else {
            this.scheduleOnce(() => {
                if (this.layer > 0 && this.node && this.node._sgNode) {
                    this.node._sgNode.renderLayer = this.layer;
                }
                cc.renderer.childrenOrderDirty = true;
            });
        }
    }
    refreshShader() {
        if (this.layer > 0 && this.node && this.node._sgNode) {
            this.node._sgNode.renderLayer = this.layer + this._addon;
        }
    }

    // 重置layer，addon是额外值
    resetLayer(addon: number) {
        this._addon = addon;
        if (this.layer > 0 && this.node && this.node._sgNode) {
            this.node._sgNode.renderLayer = this.layer + this._addon;
            //console.error("resetLayer 设置层级：", this.node.name, this.node._sgNode.renderLayer);
        }
        cc.renderer.childrenOrderDirty = true;
    }

    setDirty() {
        if (this.layer > 0 && this.node && this.node._sgNode) {
            this.node._sgNode.renderLayer = this.layer + this._addon;
            //console.error("resetLayer 设置层级：", this.node.name, this.node._sgNode.renderLayer);
        }
        cc.renderer.childrenOrderDirty = true;
    }

    // update (dt) {}
}
