/**
 * Created by Aqua on 2016/6/13.
 */
function Game() {
    //this.best = 0;
    this.highscore = 0;
    this.score = 0;
    this.brick = new Array();
    this.isOver = false;
    this.needNewBrick = true;
    //this.isMoveable = 0x1111;//1000代表可以向上移动，0100向下，0010向左，0001向右，1111任何方向都可以移动

}

//初始化游戏
Game.prototype.init=function(){
    for(var i=0;i<4;i++){
        this.brick[i]=new Array();
        for(var j=0;j<4;j++){
            this.brick[i][j]=new Object();
            this.brick[i][j].value=0;
            this.brick[i][j].type="";
        }
    }
};//这是一个语句，加分号结束

//
Game.prototype.check=function(){
    for(var i=0;i<4;i++){
        this.isOver=this.isOver||this.brick[i].some(function(item,index,array){
            return item.value === 2048; })
    }

    if(this.isOver){
        alert("you win!")
    }

    for(var i=0;i<4;i++){
        if(this.brick[i].some(function(item,index,array){
                return item.value === 0;
            })){
            this.isOver = false;
            return;//控制权返还给页面
        }
    }

    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(i + 1 < 4)
            {
                if(this.brick[i][j].value == this.brick[i + 1][j].value)
                {
                    this.isOver = false;
                    return;
                }
            }

            if(j + 1 < 4)
            {
                if(this.brick[i][j].value == this.brick[i][j + 1].value)
                {
                    this.isOver = false;
                    return;
                }
            }
        }
    }
    //程序运行至此，说明输啦
    this.isOver = true;
    alert("you lose!")
};

Game.prototype.newBrick = function(){
    if(this.needNewBrick){
        do{
            var row = Math.floor(Math.random()*4);//随机数取整
            var col = Math.floor(Math.random()*4);
        }while(this.brick[row][col].value!=0);

        this.brick[row][col].value = 4-(Math.random()>=0.3)*2;
    }
}

Game.prototype.move = function(flag){

    var brickTemp = new Array();
    var test = new Array();//测试是否需要newBrick，格子都满了的时候就不能
    var i, j, k;
    for(i = 0 ; i < 4; i ++){
        brickTemp[i] = new Array();
        test[i] = new Array();
        for(j = 0; j < 4; j ++){
            brickTemp[i][j] = {
                value:0,
                type:''
            };
            test[i][j] = {
                value:0,
                type:''
            };

        }
    }

    switch(flag){
        case "up":{
                for (i = 0; i < 4; i++) {
                    for (j = 0, k = 0; j < 4; j++) {
                        brickTemp[k][i].value = this.brick[j][i].value ? (k++, this.brick[j][i].value) : 0
                        //brickTemp只要brick中每一列的非0数，避免了要判断202->4,2002->4的情况
                        test[j][i].value=this.brick[j][i].value;
                    }


                    for (j = 0; j < 3; j++) {
                        if (brickTemp[j][i].value == brickTemp[j + 1][i].value && brickTemp[j][i].value) {
                            brickTemp[j][i].value *= 2;
                            brickTemp[j + 1][i].value = 0;
                            this.score += brickTemp[j][i].value;
                        }
                    }//合并

                    for (j = 0,k=0; j < 4; j++) {
                        this.brick[j][i].value = 0;
                        this.brick[k][i].value=brickTemp[j][i].value ? ( k++,brickTemp[j][i].value) : 0;
                    }

                    for (j = 0; j < 4; j++) {
                        if(test[j][i].value!=this.brick[j][i].value){
                            this.needNewBrick=true;
                        }
                    }
                }
                break;
        }
        case "down":{
                for(i = 0 ; i < 4; i ++) {

                    for (j = 3, k = 3; j >= 0; j--) {
                        brickTemp[k][i].value = this.brick[j][i].value ? (k--, this.brick[j][i].value) : 0;
                        test[j][i].value=this.brick[j][i].value;
                    }

                    for (j = 3; j > 0; j--) {
                        if (brickTemp[j][i].value == brickTemp[j - 1][i].value && brickTemp[j][i].value) {
                            brickTemp[j][i].value *= 2;
                            brickTemp[j - 1][i].value = 0;
                            this.score += brickTemp[j][i].value;
                        }
                    }

                    for (j = 3,k=3; j >= 0; j--) {
                        this.brick[j][i].value = 0;
                        this.brick[k][i].value=brickTemp[j][i].value ? ( k--,brickTemp[j][i].value) : 0;
                    }

                    for (j = 3; j >= 0; j--) {
                        if(test[j][i].value!=this.brick[j][i].value){
                            this.needNewBrick=true;
                        }
                    }
                }
                 break;
        }
        case "left":{
                for(i = 0 ; i < 4; i ++){

                    for(j = 0,k = 0; j < 4; j ++){
                        brickTemp[i][k].value = this.brick[i][j].value ? (k ++,this.brick[i][j].value) : 0;
                        test[i][j].value=this.brick[i][j].value;
                    }// clear zero for each clo

                    for(j = 0; j < 3; j ++){
                        if(brickTemp[i][j].value == brickTemp[i][j + 1].value && brickTemp[i][j].value){
                            brickTemp[i][j].value *= 2;
                            brickTemp[i][j + 1].value = 0;
                            this.score += brickTemp[i][j].value;//compute score;
                        }
                    }// merge

                    for(j = 0,k=0; j < 4; j ++){
                        this.brick[i][j].value = 0;
                        this.brick[i][k].value=brickTemp[i][j].value ? ( k++,brickTemp[i][j].value) : 0;
                    }//clear zero

                    for (j = 0; j < 4; j++) {
                        if(test[i][j].value!=this.brick[i][j].value){
                            this.needNewBrick=true;
                        }
                    }
                }
                break;
        }

        case "right":{
                for(i = 0 ; i < 4; i ++){

                    for(j = 3,k = 3; j >= 0; j --){
                        brickTemp[i][k].value = this.brick[i][j].value ? (k --,this.brick[i][j].value) : 0;
                        test[i][j].value=this.brick[i][j].value;
                    }// clear zero for each row

                    for(j = 3; j > 0; j --){
                        if(brickTemp[i][j].value == brickTemp[i][j - 1].value && brickTemp[i][j].value){
                            brickTemp[i][j].value *= 2;
                            brickTemp[i][j - 1].value = 0;
                            this.score += brickTemp[i][j].value;//compute score;
                        }
                    }// merge

                    for(j = 3,k=3; j >= 0; j --){
                        this.brick[i][j].value = 0;
                        this.brick[i][k].value=brickTemp[i][j].value ? ( k--,brickTemp[i][j].value) : 0;
                    }//clear zero

                    for (j = 3; j >= 0; j --) {
                        if(test[i][j].value!=this.brick[i][j].value){
                            this.needNewBrick=true;
                        }
                    }

                }
                break;
        }
    }
    if(this.needNewBrick){
        this.newBrick();
    }
    this.needNewBrick = false;
}

Game.prototype.paint = function(){
    var box=document.getElementsByClassName("grid-cell");
    var index=0;
    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            index=4*i+j;
            if(this.brick[i][j].value==0){
                box[index].innerHTML="";
            }else{
                if(box[index].childElementCount){
                    var childs=box[index].childNodes;
                    box[index].removeChild(childs[0]);
                }

                var inner=document.createElement("div");
                inner.setAttribute("class","mode"+this.brick[i][j].value);
                inner.innerHTML= this.brick[i][j].value;
                box[index].appendChild(inner);
            }
        }
    }
}

Game.prototype.refreshscore = function(){
    this.highscore = (this.score > this.highscore) ? this.score : this.highscore;
    document.getElementById("score").innerHTML= "SCORE<br/>"+this.score;
    document.getElementById("best").innerHTML= "BEST<br/>"+this.highscore;

}
Game.prototype.restart = function(){


    this.isOver = false;
    this.needNewBrick = true;
    this.brick = null;//清空
    this.brick = new Array();
    this.score = 0;
    this.start();
    this.paint();
}
Game.prototype.start = function(){
    this.init();
    this.newBrick();
    this.newBrick();
    //this.refreshscore();
}
