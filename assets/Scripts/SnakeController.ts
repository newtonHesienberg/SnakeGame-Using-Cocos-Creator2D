// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    snakeFood : cc.Node = null;
    @property(cc.Node)
    gameHandler : cc.Node = null;

    OnCollision() {
        this.gameHandler.getComponent("GameHandler").gainScore();
        this.snakeFood.getComponent("SnakeFood").onCollisionWithSnake();
    }
}
