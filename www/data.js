module.exports = {
	width: 4,
	height: 4,
	map [
		{
			type:1,
			number:2,

		}
	],
	win: function(fnList){
		return (fnList[1](x,y,z) && fnList[2]() || ...)
	},
	lost: function(fnList){
		return (fnList[1](x,y,z) && fnList[2]() || ...)
	}
}
mapType = [
	[1, 1, 0, 1],
	[1, 1, 0, 1],
	[0, 0, 0, 0],
	[1, 1, 0, 1]
]
mapMovable = [0, 1, 1, 0]
type
-1: siêu cứng,
-2: rỗng,
0: thường,
1: gạch,
2: tường,
3: ô 0,

