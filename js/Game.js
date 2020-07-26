class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    man1 = createSprite(200,70);
    man1.addImage("car1",man1_img);
    man1.scale = 0.2;
    man2 = createSprite(300,220);
    man2.addImage("car2",man2_img);
    man2.scale = 0.2;
    man3 = createSprite(500,370);
    man3.addImage("car3",man3_img);
    man3.scale = 0.2;
    man4 = createSprite(700,520);
    man4.addImage("car4",man4_img); 
    man4.scale = 0.2;
    men = [man1, man2, man3, man4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(backgroundImage);      
            var index = 0;

      var y = 5 ;
      var x;

      for(var plr in allPlayers){
        index = index + 1 ;

        y = y - 50;
        x = displayHeight - allPlayers[plr].distance;
        men[index-1].x = x;
      //  men[index-1].y = y-300;

        if (index === player.index){
          stroke(10);
          fill("yellow");
          ellipse(men[index - 1].x,men[index - 1].y,60,60);
          men[index - 1].shapeColor = "red";
          camera.position.x = men[index-1].x;
       //   camera.position.y = men[index-1].y;

        
        }
    
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
