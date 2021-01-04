const {ccclass, property} = cc._decorator;

@ccclass
export default class GameHandler extends cc.Component {
   
   @property(cc.Node)
   gameController : cc.Node = null;
   @property(cc.Node)
   gameStartPanel : cc.Node = null;
   @property(cc.Label) scoreLabel : cc.Label = null;
   score : number = 0;

   gainScore() {
      this.score++;
      this.scoreLabel.string = 'SCORE : ' + this.score.toString();
   }
   ResetScore() {
      this.score = 0;
      this.scoreLabel.string = 'SCORE : ' + this.score.toString();
   }

   StartGame() {
      this.gameController.getComponent("GameController").initGameMovement();
      this.gameStartPanel.active = false;
   }
   RestartTheGame() {
      this.gameController.getComponent("GameController").RestartHandler();
      this.ResetScore();
   }

     onLoad () {

        var manager  = cc.director.getCollisionManager();
        manager.enabled = true;
     }

}
