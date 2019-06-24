## 管理弹框界面层

## 环境
1. cocos creator 1.9.3
2. typescript
3. win10

## 需求

管理所有的二级弹出界面。让协议错误提示可以弹出到最上层

## 实现

### 1.接口设计
 
mergefarm.d.ts 

定义windows的uiRoot 管理弹窗界面接口

### 2.实现类

UIRoot.ts 

初始化弹出框层级和 Prefab 弹出界面列表


window.uiRoot = this;

### 3.引用类
Main.ts


