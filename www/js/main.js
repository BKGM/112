(function(){

	// Wait for device API libraries to load
            //
            document.addEventListener("deviceready", onDeviceReady, false);
            window.addEventListener("load", onDeviceReady, false);

            // device APIs are available
            //
            function onDeviceReady() { 
    //         	var preload= new BKGM.preload();           	
				// preload.load("image","wall","img/wall.png")
				// 	   .load("image","brick","img/brick.png")
				// 	   .load("image","A","img/A.png")
				// 	   .load("image","B","img/B.png")
				// 	   .load("image","C","img/C.png")
				// 	   .load("image","D","img/D.png")
				// 	   .load("image","E","img/E.png")
				// 	   .load("image","bg","img/bg.png")
				// 	   ;
				// preload.onloadAll= function(){
					// windowLoad(preload);
					windowLoad();
				// }
            	// windowLoad();           	  
               
            }
	// window.onload=function(){
        function windowLoad(preload) {
   //      	if (navigator.isCocoonJS) {
			//     CocoonJS.App.setAntialias(true);
			// }
            var canvas = document.createElement('canvas');
            canvas.setAttribute("id", "game"); 
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            var ctx = canvas.getContext("2d");
            document.body.appendChild(canvas);
            
            var director;
            var _fb;
            BKGM.DeviceMotion=0;	
            
            var Game = new BKGM({
			    setup: function(){
			        director = new BKGM.States();
			        var Game = this;
			        var ctx=Game.ctx;
			        var Images=Game.resource.images;
			        // Game.Codea=true;
			        BKGM.debug=1;	
			              
			        // if(BKGM.FBConnect)
			       	// _fb = new BKGM.FBConnect();
			       	// _fb.init({appId:"666473616723788"});
			       	// Game.touchStart=function(){
			       	// 		// _fb.postCanvas("Test post diem");
			       	// }
			       	var testImg;
			       	// var testTe=new BKGM.textureAtlas('asset/assets.json',function(images,aimages){
			       	// 	// testImg=aimages[10].img;
			       	// 	for (var x in images){
			       	// 		Game.resource.images[x]=images[x].img;
			       	// 	}
			       	// })
			       	// var testTe2=new BKGM.textureAtlas('asset/sprites.json',function(images,aimages){
			       	// 	// testImg=aimages[10].img;
			       	// 	for (var x in images){
			       	// 		Game.resource.images[x]=images[x].img;
			       	// 	}
			       	// })
			       	// Tạo bảng chơi 
			        var mapCellWidth = 4;
					var mapCellHeight = 4;
			        var boardContainer = new BKGM.BoardContainer().initialize(0,Game,20,20,400,400,mapCellWidth,mapCellHeight);
			        boardContainer.switchToMainMap=function(){
			        	director.switch('welcome',true);
			        }
			        var mainMap = new BKGM.Map();
			        mainMap.selectMap=function(x){
			        	if(x>map.length-1) {
			        		alert("khong co map")
			        		return;
			        	}
			        	if(x<=boardContainer.maxLvl){
			        		boardContainer.level=x;						
							director.switch('game',true);
							boardContainer.resetBoard();
			        	} else {
			        		alert("chua qua man truoc");
			        	}
						
					}
			       
			        director.state("loading", [	
				     	"setup",
				     	"loading"
				    ]);

			        director.state("welcome", [
			        	"setupwel",
				     	"background",
				     	"drawmap",
				     	"welcome"
				    ]);

				    director.state("menu", [	
				     	"background",
				     	"drawmap"
				    ]);
				    
				    director.state("game", [
				    	// "setup",
				    	"background",
				    	"board"
				    ],true);
				        
				    director.taskOnce("setup", function(){
				        var preload= new BKGM.preload();           	
						preload.load("image","wall","img/wall.png")
							   .load("image","brick","img/brick.png")
							   .load("image","A","img/A.png")
							   .load("image","B","img/B.png")
							   .load("image","C","img/C.png")
							   .load("image","D","img/D.png")
							   .load("image","E","img/E.png")
							   .load("image","bg","img/bg.png")
							   .load("image","ball","img/pokemonball.png")
							   .load("image","ballopen","img/pokeball_open.png")
							   // .load("image","bkgm","img/bkgm.jpg")
							   ;
						preload.onloadAll= function(){
							Game.addRes(preload);
							var testTe=new BKGM.textureAtlas('asset/assets.json',function(images,aimages){
					       		// testImg=aimages[10].img;
					       		for (var x in images){
					       			Game.resource.images[x]=images[x].img;
					       		}

					       		var testTe2=new BKGM.textureAtlas('asset/sprites.json',function(images,aimages){
						       		// testImg=aimages[10].img;
						       		for (var x in images){
						       			Game.resource.images[x]=images[x].img;
						       		}
						       		director.switch("welcome",true);	
						       	})
					       	})
					       	
							// Images=Game.resource.images;
													
						}
				    });

				    var bkgm=new Image();
				    bkgm.src="img/bkgm.jpg";
				    director.task("loading", function(){
				        // ctx.fillStyle="#0f0";
				        // ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
				        ctx.drawImage(bkgm,0,0,window.innerWidth,window.innerHeight);
				        // testBox.draw(Game);
				    },true);


				    
				    director.taskOnce("setupwel", function(){
				        Game.alert({
				        	width:430,
				        	height:257,
				        	fadeOut:1,
				        	text:"Demo hiện cái box gì đấy",
				        	// oktext:"Invite",
				        	ok:function(){
				        		// director.switch("game",1);
				        	}
				        })
				    });


				    director.task("board", function(){
				        boardContainer.paint(Game);
				        // testBox.draw(Game);
				    },true);
				    
				    
				    director.task("background", function(){
				        Game.background(255, 255, 255, 1);
				    });	

				    director.task("drawmap", function(){
				        mainMap.draw(Game);
				        if(testImg) ctx.drawImage(testImg,100,100)
				    },true);				    
				   	
				   	Game.touchStart=function(e){
						_down(e);
					}
					Game.mouseDown=function(e){
						_down(e);
					}
					var _down=function(e){
						switch(director.current){
							case 'game':
									// Game.promt({text:"ASFAF",
			      //   			title:"ABC",
			      //   			fadeOut:true,
			      //   			fadeIn:true,
			      //   			yestext:'OK',
			      //   			notext:'CANCEL',
			      //   			yes:function(){
	        // 			        	// alert('yes')
	        // 			        },
	        // 			        no:function(){
	        // 			        	// alert('no')
	        // 			        }
			      //   })
									boardContainer.down(e);
									break;
							case 'welcome':
								mainMap.down(e);
								break;
						}
						
						
						
						
					}

					Game.touchEnd=function(e){
						_up(e);
					}
					Game.mouseUp=function(e){
						_up(e);
					}
					var _up=function(e){
						switch(director.current){
							case 'game':
									// boardContainer.down(e);
									break;
							case 'welcome':
								mainMap.up(e);
								break;
						}
						
						
						
						
					}


				    Game.swipe=function(type){
				    	if(director.current!="game") return;
				    	boardContainer.swipe(type);		
					}
					Game.keyDown=function(e){
						if(Game._alertBox) Game._alertBox.keyDown(e);
						switch(director.current){
							case 'game':
									boardContainer.keyDown(e);
									break;
						}
					}
				    director.switch("loading");
			    },
			    draw: function(){
			        // Runs every interval
			        director.run();
			        director.draw();
			    }
			}).run();
        }
	// };
})()