/**
 * Created by Aqua on 2016/6/15.
 */
var game = new Game();
game.start();
game.paint();

var handler = function(event){
    var keycode = event.keyCode;
    if(!game.isOver){
        if(keycode == 87 || keycode == 38){
            game.move('up');
            game.refreshscore();
            game.paint();
            game.check();
        }
        if(keycode == 83 || keycode == 40){
            game.move('down');
            game.refreshscore();
            game.paint();

            game.check();
        }
        if(keycode == 65 || keycode == 37){
            game.move('left');
            game.refreshscore();
            game.paint();

            game.check();
        }
        if(keycode == 68 || keycode == 39){

            game.move('right');
            game.refreshscore();
            game.paint();

            game.check();
        }

    }
}
document.addEventListener('keydown',handler,false);

var restart = document.getElementById('restart-button');
restart.addEventListener('click',function(){
    game.restart();
    game.refreshscore();
},false);