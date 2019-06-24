 
const { ccclass, property } = cc._decorator;

@ccclass
export class CanvasAutoFit extends cc.Component {
  @property(cc.Canvas)
  canvas: cc.Canvas = null;

  onLoad() {


    if (this.canvas) {
      let size = cc.winSize;

      if (size.height / size.width < 16 / 9) {
        this.canvas.fitHeight = true;
        this.canvas.fitWidth = false;
      }
    }
  }
}
