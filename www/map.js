{	
	level:1,
	text:"Cai nay la text cho man choi, chac kieu tieu de hay huong dan nhiem vu gi do",
	width: 4, // Chiều rộng là 4
	height: 4, // Chiều cao là 4
	map [ // Map sẽ có kích thước 4x4 -> 16 ô :v
		// 1 ô có type và number
		// type = -2: rỗng, 0: thường, 1: gạch, 2: tường,3: ô 0,69: siêu cứng
		// Đây sẽ là map khởi tạo lúc ban đầu
		{type:1,number:2},{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:0,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},{type:0,number:2}
	],
	// Những ô có type tương ứng sẽ được random ra với tỷ lệ tương ứng.
	randomType:[
		{type:0,percent:0.8}, // 80% ra ô thường
		{type:1,percent:0.1}, // 10% ra ô gạch
		{type:3,percent:0.1}, // 10% ra ô 0
	],
	// Các điều kiện để thắng
	// fnList là 1 dãy các điều kiện, có thể kết hợp với nhau bằng && hoặc ||
	// Người chơi sẽ thắng khi thỏa mãn các điều kiện đưa ra
	// fnList tại 0 là để thắng cần phải ghép được số nào đó
	// fnList tại 1 là không có ô số x nào
	// Ví dụ fnList[0](16) ->để thắng cần ghép được ô 16
	// Ví dụ fnList[0](16)&&fnList[1](8) ->để thắng cần ghép được ô 16 đồng thời không có ô số 8 nào
	win: function(fnList){
		return (fnList[1](0) && fnList[1](8))
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	},
	// Các điều kiện để bị thua
	// Nếu thỏa mãn điều kiện đưa ra sẽ bị thua luôn
	// fnList là dãy các điều kiện thua (tương tự bên thắng)
	// fnList tại 0 là khi xuất hiện nhiều hơn x ô với mảng type nào đó
	// Ví dụ fnList[0](6,[1,0]) -> số ô gạch và thường xuất hiện là 6 thì thua
	lost: function(fnList){
		return (fnList[0](6,[1,0]))
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	}
}