(function () {
	function randomArrayList(length){
		var output = [];
		var firstArray = [];
		for(var i=0;i<length;i++){
			firstArray.push(i);
		}
		for(var i=0;i<length;i++){
			var index = randomNumber(firstArray.length);
			output.push(firstArray[index]);
			firstArray.splice(index,1);
		}
		return output;
	}
	function randomNumber(number){
		var output = (Math.random()*number)<<0;
		if(output==number) output = 0;
		return output;
	}
	function arrayDiff(array,checkArr) {
	    return array.filter(function(i) {return !(checkArr.indexOf(i) > -1);});
	}
	function indexOfArray(array,propertyArray){
		for(var i=0;i<array.length;i++){
			if(compareArray(array[i],propertyArray),true) return i;
		}
		return -1;
	}
	function compareArray(array1, array2, sort){
		if(sort) {
			array1 = array1.sort();
			array2 = array2.sort();
		}
		if(array1.length == 0) return false;
		console.log("1");
		if(array1.length!= array2.length) return false;
		console.log("2");
		for(var i=0;i<array1.length;i++){
			if(array1[i] != array2[i]) return false;
			console.log("3");
		}
		return true;
	}
    BKGM.BoardContainer = function () {
        return this;
    }

    BKGM.BoardContainer.prototype = {
        initialize: function (director,posX,posY,width,height,boardWidth,boardHeight) {
			var self = this;
            this.director = director;
            this.width=width;
            this.height=height;
            this.x=posX;
            this.y=posY;
			this.gameOver = false;
			this.gameWin = false;
			var marginWidth = 15*director.SCALE;
			var marginHeight = 15*director.SCALE;
			this.marginWidth = 15*director.SCALE;
			this.marginHeight = 15*director.SCALE;
			this.textSize = 35*director.SCALE;
			this.boardWidth = boardWidth;
			this.boardHeight = boardHeight;
			var cellWidth = (width-marginWidth*(boardWidth+1))/boardWidth;
			var cellHeight = (height - marginHeight*(boardHeight+1))/boardHeight;
			this.cellWidth = cellWidth;
			this.cellHeight = cellHeight;
			var cellBoard = [];
			for(var i=0;i<boardWidth*boardHeight;i++){
				var tempCell = this.initCell(i,0);
				cellBoard.push(tempCell);
			}
			this.cellList = [];
			this.cellBoard = cellBoard;
			this.animationAdd = false;
			this.animationMove = false;
			this.animationTime = 150;
			this.resetBoard();
			var controlKey = [[BKGM.KEYS.UP,BKGM.KEYS.w],
								[BKGM.KEYS.DOWN,BKGM.KEYS.s],
								[BKGM.KEYS.LEFT,BKGM.KEYS.a],
								[BKGM.KEYS.RIGHT,BKGM.KEYS.d]];
			// BKGM.registerKeyListener(
			// function event(e){
			// 	if(e.getAction()=="down"){
			// 		var keyCode = e.getKeyCode();
			// 		var specialKey = [BKGM.KEYS.F5,BKGM.KEYS.F12,BKGM.KEYS.BACKSPACE];
			// 		if(specialKey.indexOf(keyCode)!=-1) return;
			// 		if(self.animationAdd||self.animationMove) self.cancelAnimation();
			// 		if(self.gameOver) return;
			// 		e.preventDefault();
			// 		//if(keyCode == BKGM.KEYS.ENTER) self.addRandomNumber();
			// 		for(var i=0;i<controlKey.length;i++){
			// 			if(controlKey[i].indexOf(keyCode)!=-1){
			// 				self.animation(i);
			// 				break;
			// 			}
			// 		}
			// 	}
			// }
			// )
			director.keyDown=function(e){
				var keyCode = e.keyCode;
				var specialKey = [BKGM.KEYS.F5,BKGM.KEYS.F12,BKGM.KEYS.BACKSPACE];
				if(specialKey.indexOf(keyCode)!=-1) return;
				if(self.animationAdd||self.animationMove) self.cancelAnimation();
				if(self.gameOver && keyCode == BKGM.KEYS.ENTER) self.resetBoard();
				if(self.gameOver) return;
				e.preventDefault();				
				for(var i=0;i<controlKey.length;i++){
					if(controlKey[i].indexOf(keyCode)!=-1){
						self.animation(i);
						break;
					}
				}
			}
			director.swipe=function(type){
				var keyCode;
    			switch(type){
    				case 'UP'	: keyCode=BKGM.KEYS.UP;		break;
    				case 'DOWN'	: keyCode=BKGM.KEYS.DOWN;	break;
    				case 'LEFT'	: keyCode=BKGM.KEYS.LEFT;	break;
    				case 'RIGHT': keyCode=BKGM.KEYS.RIGHT;	break;
    			}
    			for(var i=0;i<controlKey.length;i++){
					if(controlKey[i].indexOf(keyCode)!=-1){
						self.animation(i);
						break;
					}
				}
			}
			// Hammer(director.canvas).on("swipeup", function(e) {
			//     for(var i=0;i<controlKey.length;i++){
			// 		if(controlKey[i].indexOf(BKGM.KEYS.UP)!=-1){
			// 			self.animation(i);
			// 			break;
			// 		}
			// 	}
			// });
			// Hammer(director.canvas).on("swipedown", function(e) {
			//     for(var i=0;i<controlKey.length;i++){
			// 		if(controlKey[i].indexOf(BKGM.KEYS.DOWN)!=-1){
			// 			self.animation(i);
			// 			break;
			// 		}
			// 	}
			// });
			// Hammer(director.canvas).on("swipeleft", function(e) {
			//     for(var i=0;i<controlKey.length;i++){
			// 		if(controlKey[i].indexOf(BKGM.KEYS.LEFT)!=-1){
			// 			self.animation(i);
			// 			break;
			// 		}
			// 	}
			// });
			// Hammer(director.canvas).on("swiperight", function(e) {
			//     for(var i=0;i<controlKey.length;i++){
			// 		if(controlKey[i].indexOf(BKGM.KEYS.RIGHT)!=-1){
			// 			self.animation(i);
			// 			break;
			// 		}
			// 	}
			// });
			this.maxScore = 0;
			var buttonWidth = 100;
			var buttonHeight = 30;
			// var normalPaint = function(ctx){
			// 	ctx.fillStyle = "#24D";
			// 	ctx.strokeStyle = "#FFF";
			// 	roundedRect(ctx,0,0,this.width,this.height,5,true,true);
			// }
			// var overPaint = function(ctx){
			// 	ctx.fillStyle = "#35E";
			// 	ctx.strokeStyle = "#FFF";
			// 	roundedRect(ctx,0,0,this.width,this.height,5,true,true);
			// }
			// var pressPaint = function(ctx){
			// 	ctx.fillStyle = "#13C";
			// 	ctx.strokeStyle = "#FFF";
			// 	roundedRect(ctx,0,0,this.width,this.height,5,true,true);
			// }
			// this.replayButton = new BKGM.MyButton().
			// 							initialize(director,this.width/2-buttonWidth/2,this.height/2- buttonHeight/2,buttonWidth,buttonHeight,
			// 										"Try again?", "center","#FFF","19px Arial",
			// 										normalPaint,overPaint,pressPaint,normalPaint,
			// 										function(){},function(){},
			// 										function(button,ex,ey){	// mouse Up
			// 											if(button.AABB.contains(ex,ey))self.resetBoard();
			// 										}).setVisible(false);
			// this.addChild(this.replayButton);
			director.touchStart=function(){
				if(self.gameOver) 
					self.resetBoard();
			}
			director.mouseDown=function(){
				if(self.gameOver) 
					self.resetBoard();
			}
            return this;
        },
		resetBoard: function(){
			this.cellList = [];
			this.gameOver = false;
			this.gameWin = false;
			this.score = 0;
			this.addRandomNumber();
			this.addRandomNumber();
			this.director.ctx.globalAlpha=1;
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
							if (cellEach.type == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								for(var j=i-1;j>=0;j--){
									if(cellList[j].positionX==cellEach.positionX){
										if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
											console.log('up:1')
											mergeCell = true;
											newPosY = cellList[j].positionY;
											cellList[j].deleted = true;
											cellEach.newNumber=2*cellEach.number;
											cellList[j].newNumber=2*cellEach.number;
										}
										else if(cellList[j].positionY == cellEach.positionY-1) {
											console.log('up:2')
											changePosition = false;
										}
										else {
											console.log('up:3')
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
							if (cellEach.type == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								for(var j=i+1;j<cellList.length;j++){
									if(cellList[j].positionX==cellEach.positionX){
										if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
											console.log('down:1')
											mergeCell = true;
											newPosY = cellList[j].positionY;
											cellList[j].deleted = true;
											cellEach.newNumber=2*cellEach.number;
											cellList[j].newNumber=2*cellEach.number;
										}
										else if(cellList[j].positionY == cellEach.positionY+1) {
											console.log('down:2')
											changePosition = false;
										}
										else {
											console.log('down:3')
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
					}
					break;
				case 2:	//left
					// Duyệt qua tất cả các ô
					for(var i=0;i<cellList.length;i++){
						if(cellList[i].positionX>0){ 	// Nếu không ở cạnh trái
							var cellEach = cellList[i];	// Ghi nhận ô hiện tại

							if (cellEach.type == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								var changePosition = true; 	// Mặc định chạy về đầu
								var mergeCell = false; 		// Mặc định không gộp 2 ô với nhau
								var newPosX = 0; 			// Khởi tạo vị trí mới
								for(var j=i-1;j>=0;j--){ 	// Tìm 1 ô bên trái cùng hàng
									if(cellList[j].positionY==cellEach.positionY){
										// Điều kiện gộp
										if(//(cellList[j].layer==cellEach.layer)&& // Nếu hai ô cùng layer
											// Nếu hai ô cùng số
											(cellList[j].number==cellEach.number)&&	
											(cellList[j].newNumber==cellEach.number)) {
											console.log('left:1')
											mergeCell = true;					// Ghi nhận gộp 2 ô
											newPosX = cellList[j].positionX;	// Ghi nhận vị trí mới của ô cellEach
											cellList[j].deleted = true;			// Ghi nhận xóa ô bên trái
											cellEach.newNumber=2*cellEach.number;	// Ghi nhận giá trị mới
											cellList[j].newNumber=2*cellEach.number;// GHi nhận giá trị mới
										}
										// Điều kiện không di chuyển
										// Hai ô không gộp nhưng đứng cạnh nhau
										else if(cellList[j].positionX == cellEach.positionX-1) {
											console.log('left:2')
											changePosition = false;
										} else { // Di chuyển về vị trí cạnh ô gần nhất bên trái
											console.log('left:3')
											newPosX = cellList[j].positionX+1;
										}
										break; // Đã tìm thấy
									}
								}

								if (changePosition) { // Nếu được ghi nhận cần di chuyển
									cellEach.positionX = newPosX; // Cập nhật vị trí mới
									// Ghi nhận vị trí mới để di chuyển đến
									// cellEach.newY = cellEach.y;
									// Tính toán vị trí thực tế trên canvas để vẽ
									cellEach.newX = (newPosX+1)*this.marginWidth+newPosX*this.cellWidth;
									// Cập nhật id
									cellEach.id = newPosX+this.boardWidth*cellEach.positionY;
									cellEach.animationMove = true;	//Flag
									this.animationMove = true;		//Flag
									cellEach.animationStart = this.director.time; // Bắt đầu animation
								}
							}
						}
					}
					break;
				case 3:	//right
					for(var i=cellList.length-1;i>=0;i--){
						if(cellList[i].positionX<boardWidth-1){
							var changePosition = true;
							var mergeCell = false;
							var newPosX = boardWidth-1;
							var cellEach = cellList[i];
							if (cellEach.type == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								for(var j=i+1;j<cellList.length;j++){
									if(cellList[j].positionY==cellEach.positionY){
										if((cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number)) {
											console.log('right:1')
											mergeCell = true;
											newPosX = cellList[j].positionX;
											cellList[j].deleted = true;
											cellEach.newNumber=2*cellEach.number;
											cellList[j].newNumber=2*cellEach.number;
										}
										else if(cellList[j].positionX == cellEach.positionX+1) {
											console.log('right:2')
											changePosition = false;
										}
										else {
											console.log('right:3')
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
					}
					break;
			}
		},
		initCell: function(cellIndex,type,layer){
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
			tempCell.type=type;
			tempCell.layer=layer||0;
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
			var randomType=Math.random()*2>>0;
			var newCell = this.initCell(randomIndex,randomType,0);
			numberArray = [2,4,8,16,32,64,128,256,512];
			//newCell.number =  numberArray[randomNumber(numberArray.length)];
			newCell.number =  Math.random() < 0.9 ? 2 : 4;
			newCell.newNumber =  newCell.number;
			newCell.animationAdd = true;
			newCell.animationStart = this.director.time;
			// console.log(this.director.time)
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
			// BKGM.BoardContainer.superclass.paint.call(this, director, time);
			// console.log(this.textSize)
			var ctx = director.ctx;
			ctx.fillStyle = "rgb(187,173,160)";
			ctx.fillRect(0,0,this.width,this.height);
			ctx.fillStyle = "#000";
			ctx.font = "20px Arial";
			if(director.WIDTH<director.HEIGHT) {
				ctx.fillText("SCORE: "+this.score, 60,this.height + 40);
				ctx.fillText("HIGHSCORE: "+this.maxScore,60,this.height + 80);
			} else {
				ctx.fillText("SCORE: "+this.score, this.height + 20,30);
				ctx.fillText("HIGHSCORE: "+this.maxScore,this.width + 20,60);
			}

			
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
				var textSize = this.textSize*4/(this.boardWidth);

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
				if(tempCell.type==1) color=numberColor['den'];
				ctx.fillStyle = color.bg;
				ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
				ctx.font = textSize+"px Arial";
				ctx.fillStyle = color.number;
				var textWidth = ctx.measureText(text).width;
				// console.log(textSize)
				ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
			}
			if(this.gameOver){
				var elapsedTime = director.time - this.gameOverTime;
				var ratio = elapsedTime/500;
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
})();
var numberColor = {
	'den':{bg: "rgb(0,0,0)", number: "rgb(255,255,255)"},
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