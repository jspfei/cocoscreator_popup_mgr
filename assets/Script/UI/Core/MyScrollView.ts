// 简单封装scrolview

const { ccclass, property } = cc._decorator;

@ccclass
export default class MyScrollView extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    tpl: cc.Prefab = null;

    // 物品总共多少个。每行放多少个。
    @property
    itemCount: number = 3;
    @property
    lineCount: number = 2;

    @property
    prefabWidth: number = 0;
    @property
    prefabHeight: number = 0;

    // 间距
    @property
    gapX: number = 10;
    @property
    gapY: number = 20;

    onCreate: (obj: cc.Node, idx: number) => void = null;

    onLoad() {
        if (this.itemCount > 0) {
            // this.setContent(200, 150);
        }
    }

    start() {

    }

    // 告知创建的个数，以及回调
    show(count: number, _onCreate?: (obj: cc.Node, idx: number) => void) {

        // 清理资源
        this.content.destroyAllChildren();

        // 如果一个都没有，那么什么都不执行。
        if (count < 1) {
            return;
        }

        if (_onCreate) {
            this.onCreate = _onCreate;
        }

        let tplWidht = this.prefabWidth;
        let tplHeight = this.prefabHeight;

        let size = new cc.Size(tplWidht, tplHeight);
        //cc.log('this.size=', size.width, size.height);

        // 构建元素（约定模板单元的锚点在（0.5，0.5））
        let x = -1 * this.content.width * this.content.anchorX + size.width / 2;
        let y = -size.height / 2;

        let maxrow = (count + this.lineCount - 1) / this.lineCount;
        let cnt = 0;
        let maxY = 0;

        // 注意，Y是往下走，是负值。X往右走，是正值。
        for (let row = 0; row < maxrow; row++) {
            for (let col = 0; col < this.lineCount; col++) {

                if (cnt >= count) {
                    break;
                }

                let go = cc.instantiate(this.tpl);
                go.parent = this.content;
                go.active = true;

                go.x = x + (size.width + this.gapX) * col;
                go.y = y + (- size.height - this.gapY) * row;
                //cc.log(`x=${go.x} y=${go.y}`)

                maxY = go.y - size.height / 2 - this.gapY;
                // cc.log('instance:', go.x, go.y, go.scaleX, go.scaleY);

                // 告知外层
                if (this.onCreate) {
                    this.onCreate(go, cnt);
                }

                cnt++;
            }
        }

        this.content.height = -maxY;
    }
}
