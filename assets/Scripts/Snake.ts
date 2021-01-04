// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Snake extends cc.Component {

    @property(cc.Node)
   gameOverPanel : cc.Node = null;
    @property(cc.Prefab)
    bodyParts : cc.Prefab = null;
     @property speed : number = 0;
    @property(cc.Node)
    snakeFood : cc.Node = null;
    @property(cc.Node)
    gameHandler : cc.Node = null;

    tail : Array<cc.Node> = [];

    isMoveRight : boolean = false;
    isMoveLeft : boolean = false;
    isMoveUp : boolean = false;
    isMoveDown : boolean = false;

    ate : boolean = false;

    onKeyDown (event)
    {
        switch(event.keyCode) {
            case cc.macro.KEY.d :
                if(this.isMoveLeft == false) {
                    this.isMoveLeft = false;
                this.isMoveUp = false;
                this.isMoveDown = false;
                this.isMoveRight = true;  
                }         
            break;
            case cc.macro.KEY.a :
                if(this.isMoveRight == false) {
                    this.isMoveRight = false;               
                this.isMoveUp = false;
                this.isMoveDown = false;
                this.isMoveLeft = true;
                }
            break;
            case cc.macro.KEY.w :               
                if(this.isMoveDown == false) {
                    this.isMoveDown = false;
                this.isMoveRight = false;
                this.isMoveLeft = false;
                this.isMoveUp = true;
                }
            break;
            case cc.macro.KEY.s :                
                if(this.isMoveUp == false) {
                    this.isMoveUp = false;
                this.isMoveRight = false;
                this.isMoveLeft = false;
                this.isMoveDown = true;
                }
            break;

        }
    }

    Restart() {
        for(var i = 0 ; i < this.tail.length; i++) {
            this.tail[i].destroy();
        }
        this.tail.length = 0;
        // set position of the head to origin
        this.node.setPosition(0,0);       
    }

    onCollisionEnter(otherCollider , selfCollider) {
       if(otherCollider.name == "SnakeFood<BoxCollider>") {
        this.snakeFood.getComponent("SnakeFood").onCollisionWithSnake();

        this.ate = true;
        this.gameHandler.getComponent("GameHandler").gainScore();
       }

       if(otherCollider.name == "Borders<BoxCollider>") {
           this.Restart();
           this.gameOverPanel.active = true;
           this.StopTheMovement();
       }

    }

     onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown , this);
    }

    StartTheMovement() {
        this.schedule(this.Move , .1 , cc.macro.REPEAT_FOREVER , 0);
    }

    StopTheMovement() {
        this.unschedule(this.Move);
    }

    DisableTheGameOverPanel() {
        this.gameOverPanel.active = false;
    }
     
    Move() {
        if(this.isMoveRight)
         {
            this.node.x += 20 ;
         }
         if(this.isMoveLeft)
         {
            this.node.x -= 20;
         }
         if(this.isMoveUp)
         {
            this.node.y += 20;
         }
         if(this.isMoveDown)
         {
            this.node.y -= 20;
         }
          // saving current position of the head
          var v = this.node.position;

         if(this.ate) {
            var body = cc.instantiate(this.bodyParts);
            this.node.parent.addChild(body);
            body.setPosition(v);
            this.tail.push(body);
            this.ate = false;
         }
        else if(this.tail.length > 0) {
            this.tail[this.tail.length - 1].position = v;
            
            this.tail.unshift(this.tail[this.tail.length - 1]);
            this.tail.pop();
        }         
    }

     
}
