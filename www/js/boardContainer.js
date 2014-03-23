(function () {
    CAAT.BoardContainer = function () {
        CAAT.BoardContainer.superclass.constructor.call(this);
        return this;
    }

    CAAT.BoardContainer.prototype = {
        initialize: function (director,posX,posY,width,height,boardWidth,boardHeight) {
			var self = this;
            this.director = director;
            this.setBounds(posX,posY,width,height);
			this.gameOver = false;
			this.gameWin = false;
			var marginWidth = 15;
			var marginHeight = 15;
			this.marginWidth = 15;
			this.marginHeight = 15;
			this.textSize = 35;
			this.boardWidth = boardWidth;
			this.boardHeight = boardHeight;
			var cellWidth = (width-marginWidth*(boardWidth+1))/boardWidth;
			var cellHeight = (height - marginHeight*(boardHeight+1))/boardHeight;
			this.cellWidth = cellWidth;
			this.cellHeight = cellHeight;
			var cellBoard = [];
			for(var i=0;i<boardWidth*boardHeight;i++){
				var tempCell = this.initCell(i);
				cellBoard.push(tempCell);
			}
			this.cellList = [];
			this.cellBoard = cellBoard;
			this.animationAdd = false;
			this.animationMove = false;
			this.animationTime = 150;
			this.resetBoard();
			var controlKey = [[CAAT.KEYS.UP,CAAT.KEYS.w],
								[CAAT.KEYS.DOWN,CAAT.KEYS.s],
								[CAAT.KEYS.LEFT,CAAT.KEYS.a],
								[CAAT.KEYS.RIGHT,CAAT.KEYS.d]];
			CAAT.registerKeyListener(
			function event(e){
				if(e.getAction()=="down"){
					var keyCode = e.getKeyCode();
					var specialKey = [CAAT.KEYS.F5,CAAT.KEYS.F12,CAAT.KEYS.BACKSPACE];
					if(specialKey.indexOf(keyCode)!=-1) return;
					if(self.animationAdd||self.animationMove) self.cancelAnimation();
					if(self.gameOver) return;
					e.preventDefault();
					//if(keyCode == CAAT.KEYS.ENTER) self.addRandomNumber();
					for(var i=0;i<controlKey.length;i++){
						if(controlKey[i].indexOf(keyCode)!=-1){
							self.animation(i);
							break;
						}
					}
				}
			}
			)
			this.maxScore = 0;
			var buttonWidth = 100;
			var buttonHeight = 30;
			var normalPaint = function(ctx){
				ctx.fillStyle = "#24D";
				ctx.strokeStyle = "#FFF";
				roundedRect(ctx,0,0,this.width,this.height,5,true,true);
			}
			var overPaint = function(ctx){
				ctx.fillStyle = "#35E";
				ctx.strokeStyle = "#FFF";
				roundedRect(ctx,0,0,this.width,this.height,5,true,true);
			}
			var pressPaint = function(ctx){
				ctx.fillStyle = "#13C";
				ctx.strokeStyle = "#FFF";
				roundedRect(ctx,0,0,this.width,this.height,5,true,true);
			}
			this.replayButton = new CAAT.MyButton().
										initialize(director,this.width/2-buttonWidth/2,this.height/2- buttonHeight/2,buttonWidth,buttonHeight,
													"Try again?", "center","#FFF","19px Arial",
													normalPaint,overPaint,pressPaint,normalPaint,
													function(){},function(){},
													function(button,ex,ey){	// mouse Up
														if(button.AABB.contains(ex,ey))self.resetBoard();
													}).setVisible(false);
			this.addChild(this.replayButton);
            return this;
        },
		resetBoard: function(){
			this.cellList = [];
			this.gameOver = false;
			this.gameWin = false;
			if(this.replayButton)this.replayButton.setVisible(false);
			this.score = 0;
			this.addRandomNumber();
			this.addRandomNumber();
		},
		animation: function(direction){
			var cellBoard = this.cellBoard;
			var cellList = this.cellList;
			var boardWidth = this.boardWidth;
			var boardHeight = this.boardHeight;
			this.sortCellList();
			switch(direction){
				case 0:	//up
					//console.log("up");
					for(var i=0;i<cellList.length;i++){
						if(cellList[i].positionY>0){
							var changePosition = true;
							var mergeCell = false;
							var newPosY = 0;
							var cellEach = cellList[i];
							for(var j=i-1;j>=0;j--){
								if(cellList[j].positionX==cellEach.positionX){
									if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
										mergeCell = true;
										newPosY = cellList[j].positionY;
										cellList[j].deleted = true;
										cellEach.newNumber=2*cellEach.number;
										cellList[j].newNumber=2*cellEach.number;
									}
									else if(cellList[j].positionY == cellEach.positionY-1) changePosition = false;
									else {
										newPosY = cellList[j].positionY+1;
									}
									break;
								}
							}
							if(changePosition){
								cellEach.positionY = newPosY;
								cellEach.newX = cellEach.x;
								cellEach.newY = (newPosY+1)*this.marginHeight+newPosY*this.cellHeight;
								cellEach.id = newPosY*this.boardWidth+cellEach.positionX;
								cellEach.animationMove = true;
								this.animationMove = true;
								cellEach.animationStart = this.director.time;
							}
						}
					}
					break;
				case 1:	//down
					//console.log("down");
					for(var i=cellList.length-1;i>=0;i--){
						if(cellList[i].positionY<boardHeight-1){
							var changePosition = true;
							var mergeCell = false;
							var newPosY = boardHeight-1;
							var cellEach = cellList[i];
							for(var j=i+1;j<cellList.length;j++){
								if(cellList[j].positionX==cellEach.positionX){
									if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
										mergeCell = true;
										newPosY = cellList[j].positionY;
										cellList[j].deleted = true;
										cellEach.newNumber=2*cellEach.number;
										cellList[j].newNumber=2*cellEach.number;
									}
									else if(cellList[j].positionY == cellEach.positionY+1) changePosition = false;
									else {
										newPosY = cellList[j].positionY-1;
									}
									break;
								}
							}
							if(changePosition){
								cellEach.positionY = newPosY;
								cellEach.newX = cellEach.x;
								cellEach.newY = (newPosY+1)*this.marginHeight+newPosY*this.cellHeight;
								cellEach.id = newPosY*this.boardWidth+cellEach.positionX;
								cellEach.animationMove = true;
								this.animationMove = true;
								cellEach.animationStart = this.director.time;
							}
						}
					}
					break;
				case 2:	//left
					//console.log("left");
					for(var i=0;i<cellList.length;i++){
						if(cellList[i].positionX>0){
							var changePosition = true;
							var mergeCell = false;
							var newPosX = 0;
							var cellEach = cellList[i];
							for(var j=i-1;j>=0;j--){
								if(cellList[j].positionY==cellEach.positionY){
									if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
										mergeCell = true;
										newPosX = cellList[j].positionX;
										cellList[j].deleted = true;
										cellEach.newNumber=2*cellEach.number;
										cellList[j].newNumber=2*cellEach.number;
									}
									else if(cellList[j].positionX == cellEach.positionX-1) changePosition = false;
									else {
										newPosX = cellList[j].positionX+1;
									}
									break;
								}
							}
							if(changePosition){
								cellEach.positionX = newPosX;
								cellEach.newY = cellEach.y;
								cellEach.newX = (newPosX+1)*this.marginWidth+newPosX*this.cellWidth;
								cellEach.id = newPosX+this.boardWidth*cellEach.positionY;
								cellEach.animationMove = true;
								this.animationMove = true;
								cellEach.animationStart = this.director.time;
							}
						}
					}
					break;
				case 3:	//right
					//console.log("right");
					for(var i=cellList.length-1;i>=0;i--){
						if(cellList[i].positionX<boardWidth-1){
							var changePosition = true;
							var mergeCell = false;
							var newPosX = boardWidth-1;
							var cellEach = cellList[i];
							for(var j=i+1;j<cellList.length;j++){
								if(cellList[j].positionY==cellEach.positionY){
									if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
										mergeCell = true;
										newPosX = cellList[j].positionX;
										cellList[j].deleted = true;
										cellEach.newNumber=2*cellEach.number;
										cellList[j].newNumber=2*cellEach.number;
									}
									else if(cellList[j].positionX == cellEach.positionX+1) changePosition = false;
									else {
										newPosX = cellList[j].positionX-1;
									}
									break;
								}
							}
							if(changePosition){
								cellEach.positionX = newPosX;
								cellEach.newY = cellEach.y;
								cellEach.newX = (newPosX+1)*this.marginWidth+newPosX*this.cellWidth;
								cellEach.id = newPosX+this.boardWidth*cellEach.positionY;
								cellEach.animationMove = true;
								this.animationMove = true;
								cellEach.animationStart = this.director.time;
							}
						}
					}
					break;
			}
		},
		initCell: function(cellIndex){
			var positionX = cellIndex%this.boardWidth;
			var positionY = (cellIndex/this.boardWidth)<<0;
			var tempCell = {};
			tempCell.x = (positionX+1)*this.marginWidth+positionX*this.cellWidth;
			tempCell.y = (positionY+1)*this.marginHeight+positionY*this.cellHeight;
			tempCell.newX = tempCell.x;
			tempCell.newY = tempCell.y;
			tempCell.width = this.cellWidth;
			tempCell.height = this.cellHeight;
			tempCell.positionX = positionX;
			tempCell.positionY = positionY;
			tempCell.id = cellIndex;
			return tempCell;
		},
		sortCellList: function(){
			this.cellList.sort(
			function compare(a,b){
				if(a.id<b.id) return -1;
				if(a.id>b.id) return 1;
				return 0;
			});
		},
		addRandomNumber: function(){
			var indexArr = [];
			for(var i=0;i<this.cellList.length;i++) {
				indexArr.push(this.cellList[i].id);
				//console.log(this.cellList[i].number+": "+this.cellList[i].positionX+"-"+this.cellList[i].positionY);
			}
			var randomArr = randomArrayList(this.boardHeight*this.boardWidth);
			var diffArray = arrayDiff(randomArr,indexArr);
			var randomIndex = diffArray[randomNumber(diffArray.length)];
			var newCell = this.initCell(randomIndex);
			numberArray = [2,4,8,16,32,64,128,256,512];
			//newCell.number =  numberArray[randomNumber(numberArray.length)];
			newCell.number =  Math.random() < 0.9 ? 2 : 4;
			newCell.newNumber =  newCell.number;
			newCell.animationAdd = true;
			newCell.animationStart = this.director.time;
			this.cellList.push(newCell);
			//console.log(newCell.number+": "+newCell.positionX+"-"+newCell.positionY+" spawned");
			//console.log("_______________________________________________");
			this.animationAdd = true;
			this.checkLost();
			return this;
		},
		checkWin: function(){
			var cellList = this.cellList;
			for(var i=0;i<cellList.length;i++){
				if(cellList[i].number==2048) {
					this.gameWin = true;
					this.gameOver = true;
					this.gameOverTime = this.director.time;
					break;
				}
			}
		},
		checkLost: function(){
			if(this.cellList.length!=this.boardHeight*this.boardWidth) return;
			this.sortCellList();
			for(var i=0;i<this.cellList.length;i++){
				var cellEach = this.cellList[i];
				if((cellEach.positionX>0)&&(cellEach.number==this.cellList[i-1].number)) return;
				if((cellEach.positionY>0)&&(cellEach.number==this.cellList[i-this.boardWidth].number)) return;
				if((cellEach.positionX<this.boardWidth-1)&&(cellEach.number==this.cellList[i+1].number)) return;
				if((cellEach.positionY<this.boardHeight-1)&&(cellEach.number==this.cellList[i+this.boardWidth].number)) return;
			}
			this.gameOver = true;
			this.gameOverTime = this.director.time;
		},
		cancelAnimation: function(){
			var endMove = false;
			for(var i=0;i<this.cellList.length;i++){
				var tempCell = this.cellList[i];
				if(tempCell.animationMove){
					endMove = true;
					this.animationMove = false;
					tempCell.animationMove = false;					
					tempCell.x = tempCell.newX;
					tempCell.y = tempCell.newY;
				}
			}
			if(endMove) this.endMoveCalculate();
			for(var i=0;i<this.cellList.length;i++){
				var tempCell = this.cellList[i];
				if(tempCell.animationAdd){
					tempCell.animationAdd = false;
					this.animationAdd = false;
				}
			}
		},
		endMoveCalculate: function(){
			var tempCellList = [];
			for(var i=0;i<this.cellList.length;i++){
				var cellEach = this.cellList[i];
				if(!cellEach.deleted) tempCellList.push(cellEach);
			}
			this.cellList = tempCellList;
			for(var i=0;i<this.cellList.length;i++){
				var cellEach = this.cellList[i];
				if(cellEach.number!=cellEach.newNumber) {
					this.score+= cellEach.newNumber;
					if(this.maxScore<this.score) this.maxScore = this.score;
					cellEach.number = cellEach.newNumber;
				}
			}
			this.checkWin();
			this.addRandomNumber();
		},
        paint: function (director,time) {
			CAAT.BoardContainer.superclass.paint.call(this, director, time);
			var ctx = director.ctx;
			ctx.fillStyle = "rgb(187,173,160)";
			ctx.fillRect(0,0,this.width,this.height);
			ctx.fillStyle = "#000";
			ctx.font = "20px Arial";
			ctx.fillText("SCORE: "+this.score, this.width + 20,30);
			ctx.fillText("HIGHSCORE: "+this.maxScore,this.width + 20,60);
			for(var i=0;i<this.cellBoard.length;i++){
				var tempCell = this.cellBoard[i];
				ctx.fillStyle = "rgb(204,192,179)";
				ctx.fillRect(tempCell.x,tempCell.y,tempCell.width,tempCell.height);
			}
			var endMove = false;
			for(var i=0;i<this.cellList.length;i++){
				var tempCell = this.cellList[i];
				var rectX = tempCell.x; rectY = tempCell.y;
				var rectWidth = tempCell.width; rectHeight = tempCell.height;
				var textSize = this.textSize;
				if(tempCell.animationMove){
					var elapsedTime = director.time - tempCell.animationStart;
					var ratio = elapsedTime/this.animationTime;
					if(elapsedTime>this.animationTime){
						tempCell.animationMove = false;
						this.animationMove = false;
						endMove = true;
						tempCell.x = tempCell.newX;
						tempCell.y = tempCell.newY;
						rectX = tempCell.x; 
						rectY = tempCell.y;
					}
					else{
						rectX = rectX+ ratio*(tempCell.newX-rectX);
						rectY = rectY+ ratio*(tempCell.newY-rectY);
					}
				}
				if(tempCell.animationAdd){
					var elapsedTime = director.time - tempCell.animationStart;
					var ratio = elapsedTime/this.animationTime;
					if(elapsedTime>this.animationTime){
						tempCell.animationAdd = false;
						this.animationAdd = false;
					}
					else{
						textSize = ratio*textSize<<0;
						rectX += rectWidth/2;
						rectY += rectHeight/2;
						rectWidth = ratio*rectWidth<<0;
						rectHeight = ratio*rectHeight<<0;
						rectX -= rectWidth/2;
						rectY -= rectHeight/2;
					}
				}
				
				var text = tempCell.number;
				var color = numberColor[text];
				if(typeof color == "undefined") color = numberColor[2];
				ctx.fillStyle = color.bg;
				ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
				ctx.font = textSize+"px Arial";
				ctx.fillStyle = color.number;
				var textWidth = ctx.measureText(text).width;
				ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
			}
			if(this.gameOver){
				var elapsedTime = director.time - this.gameOverTime;
				var ratio = elapsedTime/500;
				if(ratio>1&&this.replayButton.visible==false) this.replayButton.setVisible(true);
				if(ratio>1) ratio = 1;
				ctx.globalAlpha = ratio*0.5;
				ctx.fillStyle = "#FFF";
				ctx.fillRect(0,0,this.width,this.height);
				ctx.fillStyle = "#555";
				var text = (this.gameWin)?"You win!!!":"Game over....";
				var textSize = 40;
				ctx.font = textSize+"px Arial";
				ctx.fillText(text,this.width/2-ctx.measureText(text).width/2,this.height/2-textSize/4*3);
			}
			if(endMove) this.endMoveCalculate();
            return this;
        }
    }
    extend(CAAT.BoardContainer, CAAT.Foundation.ActorContainer);
})();
var numberColor = {
	2:{bg: "rgb(238,228,218)", number: "rgb(119,110,101)"},
	4:{bg: "rgb(237,224,200)", number: "rgb(119,110,101)"},
	8:{bg: "rgb(242,177,121)", number: "rgb(249,246,242)"},
	16:{bg: "rgb(245,149,99)", number: "rgb(249,246,242)"},
	32:{bg: "rgb(246,124,95)", number: "rgb(249,246,242)"},
	64:{bg: "rgb(246,94,59)", number: "rgb(249,246,242)"},
	128:{bg: "rgb(237,207,114)", number: "rgb(249,246,242)"},
	256:{bg: "rgb(237,204,97)", number: "rgb(249,246,242)"},
	512:{bg: "rgb(237,200,80)", number: "rgb(249,246,242)"},
	1024:{bg: "rgb(246,169,69)", number: "rgb(249,246,242)"},
	2048:{bg: "rgb(254,150,80)", number: "rgb(249,246,242)"},
}