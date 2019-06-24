import {TipBoxUI} from './TipBox/TipBoxUI'
import {PopTipUI} from './PopTip/PopTipUI'
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   

    start () {

    }

    onBtnClick(){
       let TipBox =  window.uiRoot.show(TipBoxUI)
       TipBox.setData("测试显示",()=>{

       })
    }
    onBtn2Click(){
        let PopTip =  window.uiRoot.show(PopTipUI)
        PopTip.setData("网络端口测试提示")
    }
    
    // update (dt) {}
}
