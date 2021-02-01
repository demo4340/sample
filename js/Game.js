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

    person1 = createSprite(300,1000);
    person1.addAnimation("person1", person1_Img);
    person1.scale = 0.5;
        
    person2 = createSprite(600,1000);
    person2.addAnimation("person2", person2_Img);
    
    persons = [person1, person2];
  }

  play(){
    form.hide();

    Player.PlayerInfo();
    
    if(allPlayers !== undefined){
      //var player_position = 100;
      
      background("lightgreen");
      image(ground, 0, -displayHeight*4, displayWidth, displayHeight*5);


      //index of the array
      var index = 0;

      //x and y position of the persons
      var x = 450;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the persons a little away from each other in x direction
        x = x + 200;
        //use data from the database to display the persons in y direction
        y = displayHeight - allPlayers[plr].distance;
        persons[index-1].x = x;
        persons[index-1].y = y;

        if (index === player.index){
          persons[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = persons[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,player_position)
      }

      

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance = player.distance + 5;
      player.update();
    }

    drawSprites();
  }
}
