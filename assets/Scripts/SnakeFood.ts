const {ccclass, property} = cc._decorator;

@ccclass
export default class SnakeFood extends cc.Component {

    @property Xmin : number = 0;
    @property Xmax : number = 0;
    @property Ymin : number = 0;
    @property Ymax : number = 0;

    private getRndInteger(min, max) {
        
        return Math.floor(Math.random() * (max - min) ) + min;
      }

    public onCollisionWithSnake() {

        this.node.setPosition(this.getRndInteger(this.Xmin , this.Xmax) ,  this.getRndInteger(this.Ymin , this.Ymax));
    }  

     onLoad () {
        
        this.node.setPosition(this.getRndInteger(this.Xmin , this.Xmax) ,  this.getRndInteger(this.Ymin , this.Ymax));
        
     }

}
