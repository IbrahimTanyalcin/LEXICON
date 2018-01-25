//Require and declare an instance
var mCount = 0;
var LexiconRainbow = require("../dev/LexiconRainbow.d3v4.dev.js");
var instance = new LexiconRainbow;
//Run the test
console.log("\nENUMERABLE PROPERTIES\n");
!function(){
	var chain;
	for(var i in instance){
		console.log(
			(instance.hasOwnProperty(i) ? pad("own",11,"-") : pad("prototype",11,"-"))+
			pad(i,20,"-") + ">" + typeof instance[i]
		);
		++mCount;
	}
}()
//Helper function for string padding
function pad (s,len,ch){
	len & 1 ? ++len : void(0);
	var _ = s.length & 1 ? ch : "";
	var l = s.length+_.length;
	var pL = Math.max(0,len-l)/2;
	var p = Array.apply(null,Array(pL)).map(function(){return ch}).join("");
	return p+s+_+p;
}
console.log("\n"+mCount+" PROPERTIES "+":OK:");

