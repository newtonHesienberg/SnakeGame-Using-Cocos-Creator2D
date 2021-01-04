const {ccclass, property} = cc._decorator;

@ccclass
export default class GameHandler extends cc.Component {
   
   @property(cc.Node)
   snakeScript : cc.Node = null;
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
      this.snakeScript.getComponent("Snake").StartTheMovement();
      this.gameStartPanel.active = false;
   }
   RestartTheGame() {
      this.snakeScript.getComponent("Snake").DisableTheGameOverPanel();
      this.snakeScript.getComponent("Snake").StartTheMovement();
      this.ResetScore();
   }

     onLoad () {

        var manager  = cc.director.getCollisionManager();
        manager.enabled = true;
     }

}
