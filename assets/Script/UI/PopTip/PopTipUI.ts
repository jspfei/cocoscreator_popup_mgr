import { UILayer } from "../Core/UILayer";
import PopTipPage from "./PopTipPage";

 
const {ccclass, property} = cc._decorator;

@ccclass
export  class PopTipUI implements IPage {

    //prefab 名字 ,在UIRoot 中预制好的
    prefab = 'PopTip_Page';
    
    //在哪一层
    layer = UILayer.LAYER1;

    private page:PopTipPage;

    //创建、消耗回调
    onNew(node:cc.Node){
        this.page = node.getComponent(PopTipPage);
    }
    
    onDestroy(){}

    //显示、隐藏回调
    onShow(){
        let animation = this.page.node.getComponent(cc.Animation);
        let clip = animation.defaultClip;

        animation.play();
        this.page.scheduleOnce(() => {
            window.uiRoot.hide(this)
        },clip.duration)
    }
    onHide(){}

    setData(info:string,confirm?:() => void,target?:object){
        this.page.label.string = info;
       
    }
}
