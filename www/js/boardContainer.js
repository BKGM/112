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
	// type = -2: rỗng, 0: thường, 1: gạch, 2: tường,3: ô 0, 4: siêu cứng, 5: x2, 6: ô bom, 7: ô mìn
	var mapType = [
		[1, 1, 0, 1, 0, 1, 1, 1],
		[1, 1, 0, 0, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 1, 1],
		[1, 1, 0, 1, 0, 1, 1, 1],
	];
	var mapMovable = [0, 1, 1, 0, 1, 0, 0, 1];
	var randomForCell=function(level){
		var percent=0;
		var random=Math.random();
		var randomCell=map[level].randomCell;
		for(var x in randomCell){
			percent+=randomCell[x].percent;
			if(random<percent){
				return {type:randomCell[x].type,number:randomCell[x].number};
			}
		}
		if (percent<1) alert("DKM, tong ko bang 1 ak?")
	}
    BKGM.BoardContainer = function () {
        return this;
    }

    BKGM.BoardContainer.prototype = {
        initialize: function (level,director,posX,posY,width,height,boardWidth,boardHeight) {
			var self = this;
			BKGM.fnListWin.board=this; // init fnListWin
			BKGM.fnListLost.board=this; // init fnListLost			
			this.level=level; // level của màn chơi			
			this.maxLvl=level;
            this.director = director;
            this.width=width;
            this.height=height;
            this.x=posX;
            this.y=posY;
			this.gameOver = false; // game kết thúc chưa
			this.gameWin = false; // thắng hay thua?
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
				var tempCell = this.initCell(i);
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
			this.keyDown=function(e){
				
				var keyCode = e.keyCode;
				var specialKey = [BKGM.KEYS.F5,BKGM.KEYS.F12,BKGM.KEYS.BACKSPACE];
				if(specialKey.indexOf(keyCode)!=-1) return;
				if(self.animationAdd||self.animationMove) self.cancelAnimation();
				if(self.gameOver && keyCode == BKGM.KEYS.ENTER) {
					_down();
						// self.resetBoard();
				}
				if(self.gameOver) return;
				e.preventDefault();				
				for(var i=0;i<controlKey.length;i++){
					if(controlKey[i].indexOf(keyCode)!=-1){
						self.animation(i);
						break;
					}
				}
			}
			this.swipe=function(type){
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
			this.down=function(){
				_down();					
			}
			var _down=function(){
				if(self.gameOver) {
					if(self.gameWin){
						self.maxLvl++;
						self.resetBoard();
						self.switchToMainMap();
					} else {
						if(self.switchToMainMap) {
							director.alert({
					        	width:400,
					        	height:250,
					        	fadeOut:1,
					        	text:"Thua cmnr, chơi lại nhé!",
					        	oktext:"PLAY",
					        	ok:function(){
					        		self.resetBoard();
					        	}
					        })
						}
					}
					// self.resetBoard();
				}
			}
            return this;
        },
		resetBoard: function(){
			this.cellList = [];
			this.gameOver = false;
			this.gameWin = false;
			this.score = 0;
			this.star = 0; // init star
			this.playerMove=[]; // số nước đi của người chơi
			this.maxMoves=map[this.level].maxMoves; // số nước đi tối đa của người chơi
			this.pokedex=[];

			// if(map[this.level].delete_count.true){
			// 	this.countNumber=map[this.level].delete_count.count;
			// 	this.harvestNumber=0;
			// 	this.maxHavestNumber=map[this.level].delete_count.max;
			// }	
			var listCell=map[this.level].map;
			for (var i = 0, l =listCell.length; i < l; i++) {
				var cell=listCell[i];
				if(cell.type>=0){
					this.addRandomNumber(i,cell.number,cell.type);
				}
			};
			if(!map[this.level].noInitRandomNumber){
				this.addRandomNumber();
				this.addRandomNumber();
			}
			// this.addRandomNumber(0,4,3);
			// this.addRandomNumber(2,8,0);
			// this.addRandomNumber(1,8,0);
			this.gameOver = false;
			this.director.ctx.globalAlpha=1;
		},
		animation: function(direction){
			var cellBoard = this.cellBoard;
			var cellList = this.cellList;
			var boardWidth = this.boardWidth;
			var boardHeight = this.boardHeight;
			var move;
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
							if (cellEach.moveable == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								for(var j=i-1;j>=0;j--){
									if(cellList[j].positionX==cellEach.positionX){
										if(mapType[cellList[j].type][cellEach.type]&& // Nếu hai ô ghép đc
											(	cellEach.type == 3 ||
												cellList[j].type == 3 ||
												cellEach.type == 5 ||
												cellList[j].type == 5 ||
												(cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number))
											) {
											console.log('up:1')
											mergeCell = true;
											newPosY = cellList[j].positionY;
											cellList[j].deleted = true;
											if(cellList[j].type==1){
												if(cellEach.level<2)cellEach.level++;
											} else
											if(cellEach.type==3||cellList[j].type==3){												
												if(cellEach.type!=3) this.pokedex.push(cellEach.newNumber);
												else this.pokedex.push(cellList[j].newNumber);
												cellEach.deleted=true;
												cellEach.positionX=-1;
												cellList[j].positionX=-1;
											}
											if(cellEach.type==6||cellList[j].type==6||cellList[j].type==7) {
													cellEach.type=cellList[j].type=6;
													this.hasBomb=true;
													cellEach.newNumber=0.5*cellEach.number;
													cellList[j].newNumber=0.5*cellEach.number;
													cellEach.bomb=true;
													// cellEach.number=cellEach.number*0.5;
											} else {
												cellEach.newNumber=2*cellEach.number;
												cellList[j].newNumber=2*cellEach.number;
											}											
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
									move=0;
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
							if (cellEach.moveable == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								for(var j=i+1;j<cellList.length;j++){
									if(cellList[j].positionX==cellEach.positionX){
										if(mapType[cellList[j].type][cellEach.type]&& // Nếu hai ô ghép đc
											(	cellEach.type == 3 ||
												cellList[j].type == 3 ||
												cellEach.type == 5 ||
												cellList[j].type == 5 ||
												(cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number))
											) {
											console.log('down:1')
											mergeCell = true;
											newPosY = cellList[j].positionY;
											cellList[j].deleted = true;
											if(cellList[j].type==1){
												if(cellEach.level<2)cellEach.level++;
											} else
											if(cellEach.type==3||cellList[j].type==3){												
												if(cellEach.type!=3) this.pokedex.push(cellEach.newNumber);
												else this.pokedex.push(cellList[j].newNumber);
												cellEach.deleted=true;
												cellEach.positionX=-1;
												cellList[j].positionX=-1;
											}
											if(cellEach.type==6||cellList[j].type==6||cellList[j].type==7) {
													cellEach.type=cellList[j].type=6;
													this.hasBomb=true;
													cellEach.newNumber=0.5*cellEach.number;
													cellList[j].newNumber=0.5*cellEach.number;
													cellEach.bomb=true;
													// cellEach.number=cellEach.number*0.5;
											} else {
												cellEach.newNumber=2*cellEach.number;
												cellList[j].newNumber=2*cellEach.number;
											}
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
									move=1;
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

							if (cellEach.moveable == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								var changePosition = true; 	// Mặc định chạy về đầu
								var mergeCell = false; 		// Mặc định không gộp 2 ô với nhau
								var newPosX = 0; 			// Khởi tạo vị trí mới
								for(var j=i-1;j>=0;j--){ 	// Tìm 1 ô bên trái cùng hàng
									if(cellList[j].positionY==cellEach.positionY){
										// Điều kiện gộp
										if(//(cellList[j].layer==cellEach.layer)&& // Nếu hai ô cùng layer
											mapType[cellList[j].type][cellEach.type]&& // Nếu hai ô ghép đc
											// Nếu hai ô cùng số
											(	cellEach.type == 3 ||
												cellList[j].type == 3 ||
												cellEach.type == 5 ||
												cellList[j].type == 5 ||
												(cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number))
											) {
											console.log('left:1')
											mergeCell = true;					// Ghi nhận gộp 2 ô
											newPosX = cellList[j].positionX;	// Ghi nhận vị trí mới của ô cellEach
											cellList[j].deleted = true;			// Ghi nhận xóa ô bên trái
											if(cellList[j].type==1){
												if(cellEach.level<2)cellEach.level++;
											} else
											if(cellEach.type==3||cellList[j].type==3){												
												if(cellEach.type!=3) this.pokedex.push(cellEach.newNumber);
												else this.pokedex.push(cellList[j].newNumber);
												cellEach.deleted=true;
												cellEach.positionY=-1;
												cellList[j].positionY=-1;
											}
											if(cellEach.type==6||cellList[j].type==6||cellList[j].type==7) {
													cellEach.type=cellList[j].type=6;
													this.hasBomb=true;
													cellEach.newNumber=0.5*cellEach.number;
													cellList[j].newNumber=0.5*cellEach.number;
													cellEach.bomb=true;
													// cellEach.number=cellEach.number*0.5;
											} else {
												cellEach.newNumber=2*cellEach.number;	// Ghi nhận giá trị mới
												cellList[j].newNumber=2*cellEach.number;// GHi nhận giá trị mới
											}
											
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
									move=2; // Lưu hành động người dùng ấn phím sang trái và vị trí ô thay đổi
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
							if (cellEach.moveable == 0) {   	// Ô có thể di chuyện // Todo: type -> canMove
								for(var j=i+1;j<cellList.length;j++){
									if(cellList[j].positionY==cellEach.positionY){
										if(mapType[cellList[j].type][cellEach.type]&& // Nếu hai ô ghép đc
											(	cellEach.type == 3 ||
												cellList[j].type == 3 ||
												cellEach.type == 5 ||
												cellList[j].type == 5 ||
												(cellList[j].number==cellEach.number)&&(cellList[j].newNumber==cellEach.number))
											) {
											console.log('right:1')
											mergeCell = true;
											newPosX = cellList[j].positionX;
											cellList[j].deleted = true;

											if(cellList[j].type==1){
												if(cellEach.level<2)cellEach.level++;
											} else
											if(cellEach.type==3||cellList[j].type==3){												
												if(cellEach.type!=3) this.pokedex.push(cellEach.newNumber);
												else this.pokedex.push(cellList[j].newNumber);
												cellEach.deleted=true;
												cellEach.positionY=-1;
												cellList[j].positionY=-1;
											}
											if(cellEach.type==6||cellList[j].type==6||cellList[j].type==7) {
													cellEach.type=cellList[j].type=6;
													this.hasBomb=true;
													cellEach.newNumber=0.5*cellEach.number;
													cellList[j].newNumber=0.5*cellEach.number;
													cellEach.bomb=true;
													// cellEach.number=cellEach.number*0.5;
											} else {
												cellEach.newNumber=2*cellEach.number;	// Ghi nhận giá trị mới
												cellList[j].newNumber=2*cellEach.number;// GHi nhận giá trị mới
											}
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
									move=3;
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
			if(typeof move!="undefined") this.playerMove.push(move);
			// console.log(this.playerMove)
		},
		initCell: function(cellIndex,type){
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
			tempCell.type=typeof type==='undefined' ? -1 : type;
			tempCell.moveable=tempCell.type<0 ? 1 : mapMovable[tempCell.type];
			tempCell.id = cellIndex;
			tempCell.level=0;
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
		addRandomNumber: function(randomIndex,number,randomType){
			var indexArr = [];
			for(var i=0;i<this.cellList.length;i++) {
				indexArr.push(this.cellList[i].id);
				//console.log(this.cellList[i].number+": "+this.cellList[i].positionX+"-"+this.cellList[i].positionY);
			}
			var randomArr = randomArrayList(this.boardHeight*this.boardWidth);
			var diffArray = arrayDiff(randomArr,indexArr);
			var randomIndex = typeof randomIndex === "undefined"? diffArray[randomNumber(diffArray.length)] : randomIndex;
			var randomCell=new randomForCell(this.level);
			var randomType =typeof randomType === "undefined"? (randomCell.type) : randomType;
			var newCell = this.initCell(randomIndex,randomType);
			numberArray = [2,4,8,16,32,64,128,256,512];
			//newCell.number =  numberArray[randomNumber(numberArray.length)];
			if (randomType==3) number=0;
			newCell.number =  typeof number === "undefined"? (randomCell.number) : number;

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
			
			// this.fnList=[function(){console.log(this)}];
			if(map[this.level].win(BKGM.fnListWin)){
				this.gameWin = true;
				// this.gameOverTime = this.director.time;
				// if(this.level<map.length-1){
				// 	this.level++;
				// }
			};
			// var cellList = this.cellList;
			// for(var i=0;i<cellList.length;i++){
			// 	if(cellList[i].number==2048) {
					
			// 	}
			// }
			// console.log("Star: "+this.star)
		},
		checkLost: function(){
			// if(this.cellList.length!=this.boardHeight*this.boardWidth) return;
			this.sortCellList();
			// console.log(this.cellList)
			if(map[this.level].lost(BKGM.fnListLost)){
				this.gameOver = true;
				this.gameOverTime = this.director.time;
				return;
			};
			for(var i=0, l=this.cellList.length; i < l; i++){
				var cellEach = this.cellList[i];
				if(cellEach.moveable==0){
					// Neu o ben canh cung hang
					if (this.cellList[i+1] && this.cellList[i+1].positionY==cellEach.positionY) {
						// Neu o ben canh khong o ngay sat ben phai
						if(this.cellList[i+1].positionX!= cellEach.positionX+1) return;
						// Neu o ben canh o sat ben phai va cung so
						else if(this.cellList[i+1].number==cellEach.number&&mapType[this.cellList[i+1].type][cellEach.type]) return;
					// Neu o ben canh khong cung hang va o hien tai khong o sat ben phai
					} else if (cellEach.positionX != this.boardWidth-1) return;
					
					// Neu o truoc do cung hang
					if (this.cellList[i-1] && this.cellList[i-1].positionY==cellEach.positionY) {
						// Neu o truoc do khong o ngay sat ben trai
						if(this.cellList[i-1].positionX!= cellEach.positionX-1) return;
						// Neu o truoc do o sat ben trai va cung so
						else if(this.cellList[i-1].number==cellEach.number&&mapType[this.cellList[i-1].type][cellEach.type]) return;
					// Neu o truoc do khong cung hang va o hien tai khong o sat ben trai
					} else if (cellEach.positionX != 0) return;

					if (cellEach.positionY != 0) {
						var found = false;
						for (var j = i-1; j >=0; j--) {
							var cell = this.cellList[j];
							if(cell.positionX==cellEach.positionX){
								if ((cell.positionY===cellEach.positionY-1 && cell.number!=cellEach.number) || !mapType[cell.type][cellEach.type]) found = true;
								else return;
								break;
							}
						};
						if (found == false) return;
					}
					if (cellEach.positionY != this.boardHeight-1) {
						var found = false;
						for (var j = i+1; j <l; j++) {
							var cell = this.cellList[j];
							if(cell.positionX==cellEach.positionX){
								if ((cell.positionY===cellEach.positionY+1 && cell.number!=cellEach.number) || !mapType[cell.type][cellEach.type]) found = true;
								else return;
								break;
							}
						};
						if (found == false) return;
					}
					
					// if(&&this.cellList[i-1]&&(cellEach.number==this.cellList[i-1].number)) return;
					// if(&&this.cellList[i-this.boardWidth]&&(cellEach.number==this.cellList[i-this.boardWidth].number)) return;
					// if(&&this.cellList[i+1]&&(cellEach.number==this.cellList[i+1].number)) return;
					// if(&&this.cellList[i+this.boardWidth]&&(cellEach.number==this.cellList[i+this.boardWidth].number)) return;
				}
				
			}
			//if(!lost()) return
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
				// // trường hợp thu hoạch số
				// if((!this.maxHavestNumber || this.harvestNumber<this.maxHavestNumber)&&(cellEach.newNumber==this.countNumber&& !cellEach.deleted)) {
				// 	cellEach.deleted=true;
				// 	this.harvestNumber++;
				// }				
				if(!cellEach.deleted) tempCellList.push(cellEach);
			}
			this.cellList = tempCellList;
			for(var i=0, l=this.cellList.length;i<l;i++){
				var cellEach = this.cellList[i];
				if(cellEach.number!=cellEach.newNumber) {
					this.score+= cellEach.newNumber;
					if(this.maxScore<this.score) this.maxScore = this.score;
					cellEach.number = cellEach.newNumber;
				}
			}
			while (this.hasBomb){
				this.sortCellList();
				this.hasBomb=false;
				for(var i=0, l=this.cellList.length;i<l;i++){
					var cellEach = this.cellList[i];
								
					// Nếu là bom
					if(cellEach.bomb&&(cellEach.type==6||cellEach.type==7)){
						cellEach.deleted=true;
						var cellRight=this.cellList[i+1];
						// Neu o ben canh cung hang					
						if (cellRight && cellRight.positionY==cellEach.positionY) {
							// Neu o ben canh o sat ben phai va không phải siêu cứng
							if(cellRight.positionX== cellEach.positionX+1&&cellRight.type!=4) {
								if(cellRight.type==6||cellRight.type==7) {
									this.hasBomb=true;
									cellRight.bomb=true;
								} else
								cellRight.deleted=true;
								
							};
						
						}
						
						var cellLeft=this.cellList[i-1]
						// Neu o truoc do cung hang
						if (cellLeft && cellLeft.positionY==cellEach.positionY) {
							// Neu o truoc do khong o ngay sat ben trai va không phải siêu cứng
							if(cellLeft.positionX== cellEach.positionX-1&&cellLeft.type!=4) {
								if(cellLeft.type==6||cellLeft.type==7) {
									this.hasBomb=true;
									cellLeft.bomb=true;
								} else
									cellLeft.deleted=true;
								
							};
						}

						if (cellEach.positionY != 0) {
							for (var j = i-1; j >=0; j--) {
								var cell = this.cellList[j];
								if(cell.type!=4 && cell.positionX==cellEach.positionX&&cell.positionY===cellEach.positionY-1){								
									
									var cellLeft=this.cellList[j-1];
									if(cellLeft && cellLeft.positionY==cell.positionY && cellLeft.positionX== cell.positionX-1&&cellLeft.type!=4) {
										if(cellLeft.type==6||cellLeft.type==7) {
											this.hasBomb=true;
											cellLeft.bomb=true;
										} else
											cellLeft.deleted=true;
										
									}
									var cellRight=this.cellList[j+1];
									if(cellRight && cellRight.positionY==cell.positionY && cellRight.positionX== cell.positionX+1&&cellRight.type!=4) {
										if(cellRight.type==6||cellRight.type==7) {
											this.hasBomb=true;
											cellRight.bomb=true;
										} else
										cellRight.deleted=true;
										
									}
									if(cell.type==6||cell.type==7) {
										this.hasBomb=true;
										cell.bomb=true;
									} else
										cell.deleted=true;
									break;															
								}
							};
						}
						if (cellEach.positionY != this.boardHeight-1) {
							for (var j = i+1; j <l; j++) {
								var cell = this.cellList[j];
								if(cell.type!=4 && cell.positionX==cellEach.positionX&&cell.positionY===cellEach.positionY+1){
									
									var cellLeft=this.cellList[j-1];
									if(cellLeft && cellLeft.positionY==cell.positionY && cellLeft.positionX== cell.positionX-1&&cellLeft.type!=4) {
										if(cellLeft.type==6||cellLeft.type==7) {
											this.hasBomb=true;
											cellLeft.bomb=true;
										} else
											cellLeft.deleted=true;
										
									}
									var cellRight=this.cellList[j+1];
									if(cellRight && cellRight.positionY==cell.positionY && cellRight.positionX== cell.positionX+1&&cellRight.type!=4) {
										if(cellRight.type==6||cellRight.type==7) {
											this.hasBomb=true;
											cellRight.bomb=true;
										} else
										cellRight.deleted=true;
										
									}
									if(cell.type==6||cell.type==7) {
										this.hasBomb=true;
										cell.bomb=true;
									} else
										cell.deleted=true;
									break;	
								}
							};
						}
					}
				}
				var tempCellList = [];
				for(var i=0;i<this.cellList.length;i++){
					var cellEach = this.cellList[i];	
					if(!cellEach.deleted) tempCellList.push(cellEach);
				}
				this.cellList = tempCellList;
				for(var i=0, l=this.cellList.length;i<l;i++){
					var cellEach = this.cellList[i];
					if(cellEach.number!=cellEach.newNumber) {
						this.score+= cellEach.newNumber;
						if(this.maxScore<this.score) this.maxScore = this.score;
						cellEach.number = cellEach.newNumber;
					}
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
			var movecount=this.maxMoves-this.playerMove.length;
			if(director.WIDTH<director.HEIGHT) {
				ctx.fillText("SCORE: "+this.score, 60,this.height + 40);
				ctx.fillText("HIGHSCORE: "+this.maxScore,60,this.height + 80);
				ctx.fillText("Move: "+movecount,60,this.height + 120);
				ctx.fillText("Mission: "+ map[this.level].text,60,this.height + 160);
				ctx.fillText("Star: "+ this.star,60,this.height + 200);
				for (var i = this.pokedex.length - 1; i >= 0; i--) {
					var poke=cellColor[0][this.pokedex[i]];
					ctx.drawImage(poke.bg,60+i*70,this.height + 300,60,60)
				};
				// ctx.fillText("Star: "+ this.star,60,this.height + 300);
			} else {
				ctx.fillText("SCORE: "+this.score, this.height + 20,30);
				ctx.fillText("HIGHSCORE: "+this.maxScore,this.width + 20,60);
				ctx.fillText("Move: "+movecount,this.width + 20,90);
				ctx.fillText("Mission: "+ map[this.level].text,this.width + 20,120);
				ctx.fillText("Star: "+ this.star,this.width + 20,150);
				for (var i = this.pokedex.length - 1; i >= 0; i--) {
					var poke=cellColor[0][this.pokedex[i]];
					var img=director.resource.images[poke.bg];
					ctx.drawImage(img,this.width + 20 + i*70,200,60,60)
				};
			}

			
			for(var i=0;i<this.cellBoard.length;i++){
				var tempCell = this.cellBoard[i];
				// ctx.fillStyle = "rgb(204,192,179)";
				// ctx.fillRect(tempCell.x,tempCell.y,tempCell.width,tempCell.height);
				// director.resource.images
				ctx.drawImage(director.resource.images['bg'],tempCell.x-10,tempCell.y-10,tempCell.width+20,tempCell.height+20)
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
				var tmptype=tempCell.type;
				
				
				switch (tmptype){
					case 0:			
							var color = cellColor[tmptype][text];		
							var img=director.resource.images[color.bg];
							ctx.drawImage(img,rectX,rectY,rectWidth,rectHeight);		
							// if(typeof color == "undefined") color = numberColor[2];
							// // if(tempCell.moveable==1) color=numberColor['den'];
							// ctx.fillStyle = color.bg;
							// ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
							// ctx.font = textSize+"px Arial";
							// ctx.fillStyle = color.number;
							// var textWidth = ctx.measureText(text).width;
							// // console.log(textSize)
							// ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
							break;
					case 1:
							var color = cellColor[tmptype][text];
							var img=director.resource.images[color.bg];
							ctx.drawImage(img,rectX,rectY,rectWidth,rectHeight);
							// ctx.font = textSize+"px Arial";
							// ctx.fillStyle = color.number;
							// var textWidth = ctx.measureText(text).width;
							// // console.log(textSize)
							// ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
							break;					
					case 2:
							var color = cellColor[tmptype][text];
							var img=director.resource.images[color.bg];
							ctx.drawImage(img,rectX,rectY,rectWidth,rectHeight);
							break;
					case 3:
							var color = cellColor[tmptype][text];
							var img=director.resource.images[color.bg];
							ctx.drawImage(img,rectX,rectY,rectWidth,rectHeight);
							// var color = cellColor[tmptype][text];
							// ctx.fillStyle = color.bg;
							// ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
							// ctx.font = textSize+"px Arial";
							// ctx.fillStyle = color.number;
							// var textWidth = ctx.measureText(text).width;
							// // console.log(textSize)
							// ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
							break;
					case 4:
							ctx.beginPath();
							ctx.fillStyle="#000";
							ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
							break;
					case 5:
							ctx.beginPath();
							ctx.fillStyle="#f00000";
							ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
							ctx.font = textSize+"px Arial";
							ctx.fillStyle = "#0e0e0e";
							var text="X2";
							var textWidth = ctx.measureText(text).width;
							ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
							break;
					case 6:
					//console.log(cellColor[tmptype],text)
							var color = cellColor[tmptype][0];
							ctx.fillStyle = color.bg;
							ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
							ctx.font = textSize+"px Arial";
							ctx.fillStyle = color.number;
							var textWidth = ctx.measureText(text).width;
							// console.log(textSize)
							ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
							break;
					case 7:
					//console.log(cellColor[tmptype],text)
							var color = cellColor[tmptype][0];
							ctx.fillStyle = color.bg;
							ctx.fillRect(rectX,rectY,rectWidth,rectHeight);
							ctx.font = textSize+"px Arial";
							ctx.fillStyle = color.number;
							var textWidth = ctx.measureText(text).width;
							// console.log(textSize)
							ctx.fillText(text,rectX + rectWidth/2 - textWidth/2,rectY + rectHeight/2+textSize/3);
							break;
				}
				
				
			}
			if(this.gameOver){
				var elapsedTime = director.time - this.gameOverTime;
				var ratio = elapsedTime/500;
				if(ratio>1) ratio = 1;
				ctx.globalAlpha = ratio*0.5;
				ctx.fillStyle = "#FFF";
				ctx.fillRect(0,0,this.width,this.height);
				ctx.fillStyle = "#555";
				var text = (this.gameWin)?("You win with "+this.star+" star"):"Game over....";
				var textSize = 40;
				ctx.font = textSize+"px Arial";
				ctx.fillText(text,this.width/2-ctx.measureText(text).width/2,this.height/2-textSize/4*3);
			}
			if(endMove) this.endMoveCalculate();
            return this;
        }
    }
})();
var cellColor ={
	// 0:{
	// 	2:{bg: "A", number: "rgb(119,110,101)"},
	// 	4:{bg: "B", number: "rgb(119,110,101)"},
	// 	8:{bg: "C", number: "rgb(249,246,242)"},
	// 	16:{bg: "D", number: "rgb(249,246,242)"},
	// 	32:{bg: "E", number: "rgb(249,246,242)"},
	// 	64:{bg: "rgb(246,94,59)", number: "rgb(249,246,242)"},
	// 	128:{bg: "rgb(237,207,114)", number: "rgb(249,246,242)"},
	// 	256:{bg: "rgb(237,204,97)", number: "rgb(249,246,242)"},
	// 	512:{bg: "rgb(237,200,80)", number: "rgb(249,246,242)"},
	// 	1024:{bg: "rgb(246,169,69)", number: "rgb(249,246,242)"},
	// 	2048:{bg: "rgb(254,150,80)", number: "rgb(249,246,242)"}
	// },
	0:{
		2:{bg: "frame28", number: "rgb(119,110,101)"},
		4:{bg: "frame5", number: "rgb(119,110,101)"},
		8:{bg: "frame8", number: "rgb(249,246,242)"},
		16:{bg: "frame11", number: "rgb(249,246,242)"},
		32:{bg: "frame2", number: "rgb(249,246,242)"},
		64:{bg: "rgb(246,94,59)", number: "rgb(249,246,242)"},
		128:{bg: "rgb(237,207,114)", number: "rgb(249,246,242)"},
		256:{bg: "rgb(237,204,97)", number: "rgb(249,246,242)"},
		512:{bg: "rgb(237,200,80)", number: "rgb(249,246,242)"},
		1024:{bg: "rgb(246,169,69)", number: "rgb(249,246,242)"},
		2048:{bg: "rgb(254,150,80)", number: "rgb(249,246,242)"}
	},
	1:{
		2:{bg: "element0004", number: "rgb(119,110,101)"},
		4:{bg: "element0011", number: "rgb(119,110,101)"},
		8:{bg: "element0012", number: "rgb(249,246,242)"},
		16:{bg: "element0013", number: "rgb(249,246,242)"},
		32:{bg: "element0014", number: "rgb(249,246,242)"},
		64:{bg: "element0015", number: "rgb(249,246,242)"},
		128:{bg: "element0016", number: "rgb(249,246,242)"},
		256:{bg: "element0017", number: "rgb(249,246,242)"},
		512:{bg: "element0018", number: "rgb(249,246,242)"},
		1024:{bg: "element0019", number: "rgb(249,246,242)"},
		2048:{bg: "element0020", number: "rgb(249,246,242)"}
	},
	2:{
		2:{bg: "brick", number: "rgb(119,110,101)"},
		4:{bg: "brick", number: "rgb(119,110,101)"},
		8:{bg: "brick", number: "rgb(249,246,242)"},
		16:{bg: "brick", number: "rgb(249,246,242)"},
		32:{bg: "brick", number: "rgb(249,246,242)"},
		64:{bg: "brick", number: "rgb(249,246,242)"},
		128:{bg: "brick", number: "rgb(249,246,242)"},
		256:{bg: "brick", number: "rgb(249,246,242)"},
		512:{bg: "brick", number: "rgb(249,246,242)"},
		1024:{bg: "brick", number: "rgb(249,246,242)"},
		2048:{bg: "brick", number: "rgb(249,246,242)"}
	},
	3:{
		0:{bg: "ball", number: "rgb(119,110,101)"}
	},
	6:{
		0:{bg: "rgb(0,0,218)", number: "rgb(119,110,101)"}
	},
	7:{
		0:{bg: "rgb(0,218,218)", number: "rgb(119,110,101)"}
	}

}
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