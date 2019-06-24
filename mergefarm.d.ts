
/**
 * 通用接口
 */

interface IUIRoot {
	show<T extends IPage>(type: { prototype: T, new(): T }, muteAudio = false): T;
	hide(page: IPage);
	hideByPrefabName(name: string);
	hideAll();
}
interface IUILayer {

}
interface IPage {
	// prefab名字。在UIRoot中预制好的。
	prefab: string;

	// 在哪一层
	layer: IUILayer;

	// 创建、销毁回调
	onNew(node: cc.Node);
	onDestroy();

	// 显示、隐藏回调
	onShow();
	onHide();
}

// 图集图标
interface IIcon {
	atlas: string;
	icon: string;
}

// 音频相关的
interface IAudioMgr {
	PlayBgMusic();
	MuteMusic(mute: boolean);

	PlayAudio(audio: string);
}

// 收获动画
interface IHarvestAnim {
	// 世界坐标
	playProduct(pos: cc.Vec2, product: number, count: number);
	playCoin(pos: cc.Vec2, count: number);
}

interface IPopTip {
	popTip(info: string);
}

// 效果
interface IFixtureEffect {
	x2(pos: cc.Vec2);
	hecheng(pos: cc.Vec2);
	yezi(pos: cc.Vec2);
}

// 全局变量
declare interface Window {
	uiRoot: IUIRoot;
	audioMgr: IAudioMgr;
	harvestAnim: IHarvestAnim;
	layerRender: boolean;
	popTip: IPopTip;

	// 优化开关
	gg_frame: boolean;
	lotteryUtil: boolean;
	fixtureEffect: IFixtureEffect;

	//当前分享位置
	currentSharPoint: number;
	android: any;
}

