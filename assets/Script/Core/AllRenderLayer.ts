import RenderLayer from "./RenderLayer";

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
export default class AllRenderLayer extends cc.Component {

    @property
    layer: number = 0;

    @property
    step: number = 100;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onLoad() {
        for (let i = 0; i < this.node.childrenCount; i++) {

        }
        this.recursiveSetRenderLayer(this.node, 0);
    }

    recursiveSetRenderLayer(node: cc.Node, r: number) {

        let layer = node.getComponent(RenderLayer);
        if (!layer) {
            layer = node.addComponent(RenderLayer);
            layer.layer = this.layer + r * this.step;
        }

        if (r > 0) {
            // 如果此层有AllRenderLayer，那么终止
            let alllayer = node.getComponent(AllRenderLayer);
            if (alllayer) {
                return;
            }
        }

        // 递归遍历所有的子节点
        for (let i = 0; i < node.childrenCount; i++) {
            this.recursiveSetRenderLayer(node.children[i], r + 1);
        }
    }

    // update (dt) {}
}
