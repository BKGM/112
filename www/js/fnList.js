(function () {
BKGM.fnListWin={};
// fnList tại 0 là để thắng cần phải ghép được số number nào đó
// number là số cần phải có để thắng
BKGM.fnListWin[0]=function(number){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	var cellList = _this.cellList;
	var checkWin=false;
	for(var i=0;i<cellList.length;i++){
		if(cellList[i].number==number) {
			checkWin = true;
			break;
		}
	}
	return checkWin;
}
// fnList tại 1 là để thắng cần không có số number nào đó
// number là số ko đc có để thắng
BKGM.fnListWin[1]=function(number){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	var cellList = _this.cellList;
	var checkWin=true;
	for(var i=0;i<cellList.length;i++){
		if(cellList[i].number==number) {
			checkWin = false;
			break;
		}
	}
	return checkWin;
}
// fnList tại 2 là để thắng thu thập đủ số nào đó
// number là số ko đc có để thắng
BKGM.fnListWin[2]=function(count){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	var max=_this.maxHavestNumber || count;
	return _this.harvestNumber>=count;
}
// fnList tại 3 là để có sao cần tối thiểu bao nhiêu điểm
// scores là dãy 3 điểm cần có để thắng và có sao
BKGM.fnListWin[3]=function(scores){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	var isWin=false;
	for (var i = scores.length - 1; i >= 0; i--) {
		if (_this.score>=scores[i]){
			isWin=true;
			_this.star=i+1;
			break;
		}
	};
	return isWin;
}
// fnList tại 4 là để thắng thu thập đủ pokemon nào đó
// number là số ko đc có để thắng
BKGM.fnListWin[4]=function(number,count){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	for (var i = _this.pokedex.length - 1; i >= 0; i--) {
		if(_this.pokedex[i]==number){
			count--;
		}
	};
	// _this.pokecount[number+""]=count;
	return count<=0;
}

})();

(function () {
BKGM.fnListLost={};
// fnList tại 0 là sẽ thua nếu có number ô có type tương ứng trong dãy arr xuất hiện
BKGM.fnListLost[0]=function(number,arr){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	var cellList = _this.cellList;
	var total=0;
	for(var i=0, h=cellList.length;i<h;i++){		
		for (var j=0, l=arr.length;j<l;j++){
			if(cellList[i].type==arr[j]) {
				total++;
			}
		}
		
	}
	return total>=number;
}
// fnList tại 1 là sẽ thua nếu có số nước đi nhiều hơn number
BKGM.fnListLost[1]=function(){
	var _this=this.board; // Phải có cái này để link đến boardConatainer
	var number=_this.maxMoves;
	return _this.playerMove.length>=number;
}
})();