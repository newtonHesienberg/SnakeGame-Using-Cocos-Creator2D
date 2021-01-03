const {ccclass, property} = cc._decorator;

@ccclass
export default class GameHandler extends cc.Component {
   
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

     onLoad () {

        var manager  = cc.director.getCollisionManager();
        manager.enabled = true;
     }

    start () {
        
    }

    // update (dt) {}
}
