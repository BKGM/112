map=[
{	
	level:1,
	text:"Ghép con sâu (Caterpie) trong 25 nước",
	width: 4, // Chiều rộng là 4
	height: 4, // Chiều cao là 4
	noInitRandomNumber:true, // Ko init số random lúc đầu
	map: [ // Map sẽ có kích thước 4x4 -> 16 ô :v
		// 1 ô có type và number
		// type = -2: rỗng, 0: thường, 1: gạch, 2: tường,3: ô 0, 4: siêu cứng, 5: x2
		// Đây sẽ là map khởi tạo lúc ban đầu
		{type:0,number:2},{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:0,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:0,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},{type:0,number:2}
	],
	// Những ô có type tương ứng sẽ được random ra với tỷ lệ tương ứng.
	randomCell:[
		{type:0,number:2,percent:0.8}, // 80% ra ô thường
		{type:0,number:4,percent:0.2} // 20% ra ô thường
	],
	
	// Số nước đi tối đa mà người chơi được đi
	maxMoves: 25,
	// Các điều kiện để thắng
	// fnList là 1 dãy các điều kiện, có thể kết hợp với nhau bằng && hoặc ||
	// Người chơi sẽ thắng khi thỏa mãn các điều kiện đưa ra
	// fnList tại 0 là để thắng cần phải ghép được số nào đó
	// fnList tại 1 là không có ô số x nào
	// Ví dụ fnList[0](16) ->để thắng cần ghép được ô 16
	// Ví dụ fnList[0](16)&&fnList[1](8) ->để thắng cần ghép được ô 16 đồng thời không có ô số 8 nào	
	// fnList tại 2 là để thắng thu thập đủ số nào đó
	win: function(fnList){
		var list3=fnList[3]([40,50,60]);
		return (fnList[0](16)&&list3)
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	},
	// Các điều kiện để bị thua
	// Nếu thỏa mãn điều kiện đưa ra sẽ bị thua luôn
	// fnList là dãy các điều kiện thua (tương tự bên thắng)
	// fnList tại 0 là khi xuất hiện nhiều hơn x ô với mảng type nào đó
	// Ví dụ fnList[0](6,[1,0]) -> số ô gạch và thường xuất hiện là 6 thì thua
	// fnList[1]() kích hoạt việc kiểm tra số nước đi tối đa
	lost: function(fnList){
		// return false;
		// return (fnList[0](6,[1,0]))
		return (fnList[1]())
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	}
},
{	
	level:2,
	text:"Ghép con Bulbasaur trong 25 nước.",
	width: 4, // Chiều rộng là 4
	height: 4, // Chiều cao là 4
	noInitRandomNumber:false, // Ko init số random lúc đầu
	map: [
		// 1 ô có type và number
		// type = -2: rỗng, 0: thường, 1: gạch, 2: tường,3: ô 0,4: siêu cứng, 5: x2
		// Đây sẽ là map khởi tạo lúc ban đầu
		{type:1,number:2},{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:0,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},{type:0,number:2}
	],
	// Những ô có type tương ứng sẽ được random ra với tỷ lệ tương ứng.
	randomCell:[
		{type:0,number:2,percent:0.7}, // 80% ra ô thường
		{type:0,number:4,percent:0.1}, // 80% ra ô thường
		{type:1,number:2,percent:0.2} // 10% ra ô gạch
	],
	
	// Số nước đi tối đa mà người chơi được đi
	maxMoves: 25,
	// Các điều kiện để thắng
	// fnList là 1 dãy các điều kiện, có thể kết hợp với nhau bằng && hoặc ||
	// Người chơi sẽ thắng khi thỏa mãn các điều kiện đưa ra
	// fnList tại 0 là để thắng cần phải ghép được số nào đó
	// fnList tại 1 là không có ô số x nào
	// Ví dụ fnList[0](16) ->để thắng cần ghép được ô 16
	// Ví dụ fnList[0](16)&&fnList[1](8) ->để thắng cần ghép được ô 16 đồng thời không có ô số 8 nào	
	// fnList tại 2 là để thắng thu thập đủ số nào đó
	win: function(fnList){
		var list3=fnList[3]([40,50,60]);
		return (fnList[0](32)&&list3)
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	},
	// Các điều kiện để bị thua
	// Nếu thỏa mãn điều kiện đưa ra sẽ bị thua luôn
	// fnList là dãy các điều kiện thua (tương tự bên thắng)
	// fnList tại 0 là khi xuất hiện nhiều hơn x ô với mảng type nào đó
	// Ví dụ fnList[0](6,[1,0]) -> số ô gạch và thường xuất hiện là 6 thì thua
	// fnList[1]() kích hoạt việc kiểm tra số nước đi tối đa
	lost: function(fnList){
		// return false;
		// return (fnList[0](6,[1,0]))
		return (fnList[1]())
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	}
},
{	
	level:3,
	text:"Thu thập được 4 con Charmander trong 40 nước.",
	width: 4, // Chiều rộng là 4
	height: 4, // Chiều cao là 4
	noInitRandomNumber:false, // Ko init số random lúc đầu
	map: [
		// 1 ô có type và number
		// type = -2: rỗng, 0: thường, 1: gạch, 2: tường,3: ô 0,4: siêu cứng, 5: x2
		// Đây sẽ là map khởi tạo lúc ban đầu
		{type:1,number:2},{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:0,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:1,number:2},{type:3,number:2}
	],
	// Những ô có type tương ứng sẽ được random ra với tỷ lệ tương ứng.
	randomCell:[
		{type:0,number:2,percent:0.7}, // 80% ra ô thường
		{type:1,number:2,percent:0.1}, // 10% ra ô gạch
		{type:3,number:2,percent:0.2} // 10% ra ô 0
	],
	
	// Số nước đi tối đa mà người chơi được đi
	maxMoves: 40,
	// Các điều kiện để thắng
	// fnList là 1 dãy các điều kiện, có thể kết hợp với nhau bằng && hoặc ||
	// Người chơi sẽ thắng khi thỏa mãn các điều kiện đưa ra
	// fnList tại 0 là để thắng cần phải ghép được số nào đó
	// fnList tại 1 là không có ô số x nào
	// Ví dụ fnList[0](16) ->để thắng cần ghép được ô 16
	// Ví dụ fnList[0](16)&&fnList[1](8) ->để thắng cần ghép được ô 16 đồng thời không có ô số 8 nào	
	// fnList tại 2 là để thắng thu thập đủ số nào đó
	win: function(fnList){
		var list3=fnList[3]([40,50,60]);
		return (fnList[4](4,4)&&list3)
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	},
	// Các điều kiện để bị thua
	// Nếu thỏa mãn điều kiện đưa ra sẽ bị thua luôn
	// fnList là dãy các điều kiện thua (tương tự bên thắng)
	// fnList tại 0 là khi xuất hiện nhiều hơn x ô với mảng type nào đó
	// Ví dụ fnList[0](6,[1,0]) -> số ô gạch và thường xuất hiện là 6 thì thua
	// fnList[1]() kích hoạt việc kiểm tra số nước đi tối đa
	lost: function(fnList){
		// return false;
		// return (fnList[0](6,[1,0]))
		return (fnList[1]())
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	}
},
{	
	level:4,
	text:"Ghép con sâu (Caterpie) trong 20 nước nhưng không được xuất hiện con rồng (Charmander).",
	width: 4, // Chiều rộng là 4
	height: 4, // Chiều cao là 4
	noInitRandomNumber:false, // Ko init số random lúc đầu
	map: [
		// 1 ô có type và number
		// type = -2: rỗng, 0: thường, 1: gạch, 2: tường,3: ô 0,4: siêu cứng, 5: x2
		// Đây sẽ là map khởi tạo lúc ban đầu
		{type:1,number:2},{type:-1,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:0,number:2},{type:-1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:1,number:2},{type:-1,number:2},
		{type:-1,number:2},{type:-1,number:2},{type:1,number:2},{type:3,number:2}
	],
	// Những ô có type tương ứng sẽ được random ra với tỷ lệ tương ứng.
	randomCell:[
		{type:0,number:2,percent:0.7}, // 80% ra ô thường
		{type:1,number:2,percent:0.1}, // 10% ra ô gạch
		{type:3,number:2,percent:0.2} // 20% ra ô 0
	],	
	// Số nước đi tối đa mà người chơi được đi
	maxMoves: 20,
	// Các điều kiện để thắng
	// fnList là 1 dãy các điều kiện, có thể kết hợp với nhau bằng && hoặc ||
	// Người chơi sẽ thắng khi thỏa mãn các điều kiện đưa ra
	// fnList tại 0 là để thắng cần phải ghép được số nào đó
	// fnList tại 1 là không có ô số x nào
	// Ví dụ fnList[0](16) ->để thắng cần ghép được ô 16
	// Ví dụ fnList[0](16)&&fnList[1](8) ->để thắng cần ghép được ô 16 đồng thời không có ô số 8 nào	
	// fnList tại 2 là để thắng thu thập đủ số nào đó
	win: function(fnList){
		var list3=fnList[3]([40,50,60]);
		return (fnList[0](16)&&fnList[1](4)&&list3)
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	},
	// Các điều kiện để bị thua
	// Nếu thỏa mãn điều kiện đưa ra sẽ bị thua luôn
	// fnList là dãy các điều kiện thua (tương tự bên thắng)
	// fnList tại 0 là khi xuất hiện nhiều hơn x ô với mảng type nào đó
	// Ví dụ fnList[0](6,[1,0]) -> số ô gạch và thường xuất hiện là 6 thì thua
	// fnList[1]() kích hoạt việc kiểm tra số nước đi tối đa
	lost: function(fnList){
		// return false;
		// return (fnList[0](6,[1,0]))
		return (fnList[1]())
		//return (fnList[1](x,y,z) && fnList[2]() || ...)
	}
}
]