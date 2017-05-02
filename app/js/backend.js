var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

var lists = [
    {
		gameToken: "123abc",
        owner: "Criss Parotisse", 			// автор игры
		opponent: "",        				// присоединенный игрок
		size: 3, 							// размер игорового поля
		gameDuration: 12323,					// сколько уже идет игра в миллисекундах
		gameResult: "",						// кто выиграл партию
		state: "ready"						// статус игры
    },
	{
        gameToken: "123abc",
		owner: "Man Rouse", 	
		opponent: "",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
		state: "ready"			
	},
	{
        gameToken: "123abc",
		owner: "Criss Parotisse", 	
		opponent: "",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
		state: "ready"			
	},
	{
        gameToken: "123abc",
		owner: "Jason Moore", 	
		opponent: "",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
		state: "ready"			
	},
	{
        gameToken: "123abc",
		owner: "Clark Fran", 	
		opponent: "",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
		state: "ready"			
	},
	{
        gameToken: "123abc",
		owner: "Chuck Norris", 	
		opponent: "Jerry Berry",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
		state: "playing"			
	},
    {
        gameToken: "123abc",
		owner: "Morris Noore", 	
		opponent: "Block Rob",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
		state: "playing"			
	},
    {
       gameToken: "123abc",
	   owner: "Rabbit", 	
	   opponent: "Jane Simon",           
	   size: 3, 				
	   gameDuration: 12323,		
	   gameResult: "",	
	   state: "playing"			
	},
	{
		gameToken: "123abc",
		owner: "Apply C", 	
		opponent: "Tom Wayne",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "",	
	    state: "playing"
	},
	{
		gameToken: "123abc",
		owner: "Jonny B", 	
		opponent: "Tommy Lee",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "opponent",	
	    state: "done"
	},
	{
		gameToken: "123abc",
		owner: "Jonnatan Broock", 	
		opponent: "Tommy Lee",           
		size: 3, 				
		gameDuration: 12323,		
		gameResult: "owner",	
	    state: "done"
	}
];

app.get("/lists", function (req, res) {
    res.send(lists);
});

/*app.post("/list", function (req, res) {
    var list = {
        owner: req.body.owner
    };
    list.push(list);
    res.send(200);
});*/


var server = app.listen(3002, function () {
    console.log("backend started");
});
