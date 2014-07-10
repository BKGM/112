(function () {
	var list=[
	{x:100,y:100},{x:200,y:100},{x:300,y:100},{x:400,y:100},{x:500,y:100},{x:600,y:100},{x:700,y:100}
	]
	BKGM.Map=function(){
		var pointWidth=20;
		var a=Math.sqrt(2)*pointWidth;
		var a2=Math.sqrt(2)*pointWidth*2;
		this.mapPoints=[];
		for (var i = 0,l=list.length ; i <l; i++) {
			
			var point={
				x:list[i].x,
				y:list[i].y,
				w:a2,
				h:a2
			};
			point._x=point.x+a;
			point._y=point.y+a;
			this.mapPoints.push(point);
		};
		// for (var i = 0; i < 10; i++) {
		// 	var point={
		// 		x:100+50*i,
		// 		y:100+50*i,
		// 		w:a2,
		// 		h:a2
		// 	};
		// 	point._x=point.x+a;
		// 	point._y=point.y+a;
		// 	this.mapPoints.push(point);
		// };
		this.pointWidth=pointWidth;
	}
	BKGM.Map.prototype={
		choose:null,
		init:function(){

		},
		draw:function(Game){
			var ctx=Game.ctx;
			ctx.fillStyle="#000";
			var pointWidth=this.pointWidth*2;
			var images=Game.resource.images;
			
			for (var i = this.mapPoints.length - 1; i >= 0; i--) {
				// ctx.beginPath();
				// ctx.arc(this.mapPoints[i]._x,this.mapPoints[i]._y,pointWidth,0,Math.PI*2,true);
				// ctx.fill();
				// ctx.closePath();
				var ball=images['ball'];
				if(this.choose==i) ball=images['ballopen'];
				ctx.drawImage(ball,this.mapPoints[i].x,this.mapPoints[i].y,pointWidth,pointWidth)
				ctx.font ='25px '+Game.font;
				var text=(i+1)+"";
				ctx.fillText(text,this.mapPoints[i].x-ctx.measureText(text).width/2,this.mapPoints[i].y)
			};
			

		},
		move:function(e){
			
		},
		down:function(e){
			for (var i = this.mapPoints.length - 1; i >= 0; i--) {
				if (BKGM.checkMouseBox(e,this.mapPoints[i])){
					this.choose=i;
					break;
				}
			};
		},
		up:function(e){
			for (var i = this.mapPoints.length - 1; i >= 0; i--) {
				if (BKGM.checkMouseBox(e,this.mapPoints[i])){
					if(this.choose==i&&this.selectMap) this.selectMap(i);
					break;
				}
			};
			this.choose=null;
		}
	}
})()