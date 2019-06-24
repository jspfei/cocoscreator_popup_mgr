import { UILayer } from "../Core/UILayer";
import TipBoxPage from "./TipBoxPage";

 
const {ccclass, property} = cc._decorator;

@ccclass
export  class TipBoxUI implements IPage {

    //prefab 名字 ,在UIRoot 中预制好的
    prefab = 'TipBox_Page';
    
    //在哪一层
    layer = UILayer.LAYER1;

    private page:TipBoxPage;

    //创建、消耗回调
    onNew(node:cc.Node){
        this.page = node.getComponent(TipBoxPage);
    }
    
    onDestroy(){}

    //显示、隐藏回调
    onShow(){}
    onHide(){}

    setData(info:string,confirm?:() => void,target?:object){
        this.page.label.string = info;
        this.page.confirmButton.node.on("click",() =>{
            if(confirm){
                if(target){
                    confirm.call(target)
                }else{
                    confirm()
                }
            }
            window.uiRoot.hide(this);
        },this)
    }
}
