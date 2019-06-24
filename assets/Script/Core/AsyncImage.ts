import { MyLoader, loader } from "../Utility/Core/MyLoader";
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
export default class AsyncImage extends cc.Component {

    backup: string = null;

    private complete: () => void;

    onLoad() {
    }

    start() {
    }

    onDestroy() {
        if (!this.backup) {
            loader().deRef(this.backup);
            this.backup = null;
        }
    }

    setSpriteFrame(spriteFrame: cc.SpriteFrame) {
        let _Sprite = this.getComponent(cc.Sprite);
        if (!_Sprite) {
            cc.warn('没有找到图片组件11111：', this.node.name);
        } else {
            _Sprite.spriteFrame = spriteFrame;
        }
    }

    setAtlas(icon: IIcon) {
        this.setAtlasFrame(icon.atlas, icon.icon);
    }
    setAtlasFrame(atlasWithFrame: string)
    setAtlasFrame(atlas: string, frame: string)
    setAtlasFrame(atlasOrFrame: string, frame?: string) {
        if (!frame && !atlasOrFrame) {
            return;
        }
        if (!frame) {
            let split = atlasOrFrame.split(";")
            if (split.length === 2) {
                this.setAtlasFrame(split[0], split[1])
            } else if (atlasOrFrame.length == 0) {
                // 空的，就算了。
            } else {
                cc.warn(`图集必须配置为'image;set'形式,而传入了'${atlasOrFrame}'`)
            }
        }
        else {


            if (!this.backup) {
                loader().deRef(this.backup);
                this.backup = null;
            }

            loader().loadRes(atlasOrFrame, cc.SpriteAtlas, (err, atlas: cc.SpriteAtlas) => {
                if (!err) {
                    let f = atlas.getSpriteFrame(frame);
                    if (!f) {
                        cc.warn('没有找到图集元素：', atlas, frame);
                    } else {
                        this.backup = atlasOrFrame;
                        let _Sprite = null;
                        try {
                            _Sprite = this.getComponent(cc.Sprite);
                        } catch (e) { }
                        if (!_Sprite) {
                            cc.warn('没有找到图片组件：', this.node.name);
                        } else {
                            _Sprite.spriteFrame = f;

                            // 更换完图片之后，shader不起作用了，所以刷新shader。
                            let comps = this.getComponents(cc.Component);
                            for (let i = 0; i < comps.length; i++) {
                                let comp = comps[i]
                                let func = comp["refreshShader"];
                                if (func) {
                                    func.call(comp);
                                }
                            }

                            if (this.complete) {
                                this.complete();
                            }
                        }
                    }
                } else {
                    cc.warn('无法找到图集：', atlas, frame);
                }
            });
        }
    }

    setCompleteFunc(onComnplete: () => void) {
        this.complete = onComnplete;
    }
}
