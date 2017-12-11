<!--Lexicon-->
(function (){
	function lexiconSimplexF () {
		var ID = ID || "lexicon_"+Math.round(Math.random()*100);
		var viewport = undefined;
		var viewportBackground = undefined;
		var viewportFront = undefined;
		var _input_ = undefined;
		var _values_ = [];
		var _range_ = [0,1];
		var _clamp_ = [0,1];
		var _ranges_ = undefined;
		var _labels_ = ["","","",""];//graph labels top, right, bot, left
		var _interpretation_ = undefined;
		var _tagColors_ = ["Black","AntiqueWhite"]; //[backgroundColor,textColor]
		var _curveColor_ = "Orange";
		var attrX = attrX || 0;
		var attrY = attrY || 0;
		var attrW = attrW || 100;
		var attrH = attrH || 100;
		var styleW = styleW || "100px";
		var styleH = styleH || "100px";
		var styleMargin = styleMargin || "0px";
		var bColor = bColor || "DimGray";
		var bOpacity = bOpacity || 0.25;
		var colorScheme = ["Blue","LightPink",0.75];//default color, highlight color, opacity
		var gradientColors = ["Red","Purple","Blue","AntiqueWhite"]; //start, merge, stop, crit line color
		var _container_ = _container_ || document.body;
		var position = position || "relative"
		var top = top || "0px";
		var left = left || "0px";
		var offset = 0;
		var line = d3.svg.line();
		var padding = 0.1*attrW;
		var onmouse = undefined;
		var _this_ = this; 
		//text fill, text stroke, shape fill, shape stroke , m.over text fill, m.over text stroke , m.over shape fill
		var _controllerColors_ = ["AntiqueWhite","AntiqueWhite","Red","Red","Red","Red","AntiqueWhite"];
		var postit = undefined;
		this.lexID = function (u){if(arguments.length !== 0){ID=u; return this;}else{return ID;}}
		this.x = function (u){attrX=u; return this;}
		this.y = function (u){attrY=u; return this;}
		this.w = function (u){attrW=u; padding = 0.1*attrW; attrH=u; return this;}
		this.h = function (u){attrH=u; padding = 0.1*attrH; attrW=u; return this;}
		this.sW = function (u){styleW=u; return this;}
		this.sH = function (u){styleH=u; return this;}
		this.position = function (u){position=u; return this;}
		this.color = function(u){bColor=u;return this;}
		this.opacity = function(u){bOpacity=u;return this;}
		this.colorScheme = function(u){colorScheme = u;return this;}
		this.gradientColors = function(u){gradientColors = u;return this;}
		this.colorControllers = function(u){_controllerColors_ = u;return this;}
		this.container = function(u){_container_ = u;return this;}
		this.sTop = function(u){top = u; return this;}
		this.sLeft = function(u){left = u; return this;}
		this.sMargin = function(u){styleMargin = u; return this;}
		this.input = function(input){if(arguments.length !== 0){_input_ = input; _values_ = input.points; _range_ = input.range === undefined ? _range_ : input.range; _clamp_ = input.clamp === undefined ? _range_ : input.clamp; _labels_ = input.labels === undefined ? _labels_ : input.labels; colorScheme = input.colors === undefined ? colorScheme : input.colors; _interpretation_ = input.interpretation === undefined ? false : input.interpretation; _ranges_ = input.ranges === undefined ? _ranges_ : input.ranges; return this;}else{return _input_;}}
		var _objSync_ = [];//needed because synctor recursively checks 
		this.sync = function(){return _objSync_;}////needed because synctor recursively checks 
		this.onmouse = function(f){if(arguments.length !== 0){onmouse = f.bind(this); return this;}else{return onmouse;}}
		this.isAppended = false;
		this.append = function () {
			this.isAppended = true;
			var coordinates = [0,0];
			var svg = d3.select(_container_).append("svg").attr("preserveAspectRatio","none").attr("id",ID).attr("viewBox",attrX+" "+attrY+" "+(attrX+attrW)+" "+(attrY+attrH)).style("width",styleW).style("height",styleH).style("padding","0px").style("display","block").style("position",position).style("top",top).style("left",left).style("overflow","hidden").style("line-height","normal").style("margin",styleMargin);
			d3.select("#"+ID).append("svg:rect").attr("id",function(){return ID+"_rect";}).attr("x",function(){return (attrX+attrW)/2;}).attr("y",function(){return (attrY+attrH)/2;}).attr("width",0).attr("height",0).attr("rx",15).attr("ry",15).attr("fill-opacity",bOpacity).attr("fill",bColor);
			warp(ID+"_rect",attrW,attrH);
			//viewport = d3.select("#"+ID).append("g"); items in back
			
			//***Defs***
				//clippath for etiquete
			d3.select("#"+ID).append("svg:defs").attr("id",ID+"_extras").append("clipPath").attr("id",ID+"_clipperEtiquete")
			.append("rect").attr("x",-0.025*attrH*0.9).attr("y",-0.025*attrH*0.9).attr("rx","1%").attr("ry","1%").attr("width",0.9*(attrW*0.2+attrH*0.05)).attr("height",0.9*0.05*attrH);
				//linear gradient red-blue
			d3.select("#"+ID+"_extras").append("linearGradient").attr("x1","0%").attr("y1","0%").attr("x2","0%").attr("y2","100%").attr("spreadMethod","pad").attr("id",ID+"_linearGradient");
			d3.select("#"+ID+"_linearGradient").append("stop").attr("stop-color",gradientColors[0]).attr("offset","0%").attr("stop-opacity",1);
			d3.select("#"+ID+"_linearGradient").append("stop").attr("stop-color",gradientColors[1]).attr("offset","50%").attr("stop-opacity",1);
			d3.select("#"+ID+"_linearGradient").append("stop").attr("stop-color",gradientColors[2]).attr("offset","100%").attr("stop-opacity",1);
				//linear gradient blue-red
			d3.select("#"+ID+"_extras").append("linearGradient").attr("x1","0%").attr("y1","0%").attr("x2","0%").attr("y2","100%").attr("spreadMethod","pad").attr("id",ID+"_linearGradient_reverse");
			d3.select("#"+ID+"_linearGradient_reverse").append("stop").attr("stop-color",gradientColors[2]).attr("offset","0%").attr("stop-opacity",1);
			d3.select("#"+ID+"_linearGradient_reverse").append("stop").attr("stop-color",gradientColors[1]).attr("offset","50%").attr("stop-opacity",1);
			d3.select("#"+ID+"_linearGradient_reverse").append("stop").attr("stop-color",gradientColors[0]).attr("offset","100%").attr("stop-opacity",1);
			
			//***Defs***
			
			//##############################################################SCALE###################################################################################
			scaleMainBot = d3.scale.ordinal().domain(_values_.map(function(d,i){return d.abbrv})).rangeRoundPoints([0,attrW-2*padding],1);
			axisMainBot = d3.svg.axis().scale(scaleMainBot).orient("bottom").ticks(_values_.length).tickSize(2*padding-attrH,0).tickPadding(5);
			scaleMainLeft = d3.scale.linear().domain(_range_).range([attrH-2*padding,0]);
			axisMainLeft = d3.svg.axis().scale(scaleMainLeft).orient("left").ticks(5).tickSize(2*padding-attrW,0).tickPadding(10);
			
			svg.append("g").attr("id",ID+"_lexMainAxisBot").attr("class","global_lexMainAxes").attr("transform","translate("+padding+","+(attrH-padding)+")").call(axisMainBot);
			svg.append("g").attr("id",ID+"_lexMainAxisLeft").attr("class","global_lexMainAxes").attr("transform","translate("+padding+","+padding+")").call(axisMainLeft);
			svg.append("text").text(_labels_[0] || "").attr("x",0).attr("dx",0).attr("y",0).attr("dy",0).attr("transform","translate ("+attrW/2+","+3/5*padding+")").attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/35).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0).style("cursor","pointer");
			svg.append("text").text(_labels_[1] || "").attr("x",0).attr("dx",0).attr("y",0).attr("dy",0).attr("transform","translate ("+(attrW-2/5*padding)+","+attrH/2+") rotate(90)").attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/35).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0).style("cursor","pointer");
			svg.append("text").text(_labels_[2] || "").attr("x",0).attr("dx",0).attr("y",0).attr("dy",0).attr("transform","translate ("+attrW/2+","+(attrH-2/5*padding)+")").attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/35).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0).style("cursor","pointer");
			svg.append("text").text(_labels_[3] || "").attr("x",0).attr("dx",0).attr("y",0).attr("dy",0).attr("transform","translate ("+2/5*padding+","+attrH/2+") rotate(-90)").attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/35).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0).style("cursor","pointer");
			//##############################################################SCALE###################################################################################
		
			addCurve();
			addOpts();
		
			viewportBackground = d3.select("#"+ID).append("g");
			viewport = d3.select("#"+ID).append("g"); //items in here
			postit = new postIt; //post it front of real items
			viewportFront = d3.select("#"+ID).append("g"); //overlay items here
			
			//attach the bottom axis event handler for mouseover, just like data points
			d3.selectAll("#"+ID+"_lexMainAxisBot"+" .tick").data(_values_)
			.on("mouseover",function(d,i){
				coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
				postit.relocate(coordinates[0],coordinates[1],d);
				onmouse ? onmouse(d3.event,d,i) : void(0);
			})
			.on("mouseout",function(d,i){
				postit.fade();
				onmouse ? onmouse(d3.event,d,i) : void(0);
			});
			
			return this;
		}

		var scaleMainBot;
		var axisMainBot;
		var scaleMainLeft;
		var axisMainLeft;
		var axisMainLeftGroup;
		//resusable arrays for AA reference
		var aaSymbols = {Nonpolar:"Gray",Polar:"DeepPink",Positive:"Red",Negative:"Blue",Aromatic:"Green",Stop:"Orange"};
		var aminoacidsX = {"A":["Alanine","Nonpolar"],"R":["Arginine","Positive"],"N":["Asparagine","Polar"],"D":["Aspartic-Acid","Negative"],"C":["Cysteine","Polar"],"Q":["Glutamine","Polar"],"E":["Glutamic-Acid","Negative"],"G":["Glycine","Nonpolar"],"H":["Histidine","Positive"],"I":["Isoleucine","Nonpolar"],"L":["Leucine","Nonpolar"],"K":["Lysine","Positive"],"M":["Methionine","Nonpolar"],"F":["Phenylalanine","Aromatic"],"P":["Proline","Nonpolar"],"S":["Serine","Polar"],"T":["Threonine","Polar"],"W":["Tryptophan","Aromatic"],"Y":["Tyrosine","Aromatic"],"V":["Valine","Nonpolar"],"X":["Stop","Stop"]};
		var aminoacids_OtherProperties = {"A":["Hydrophobic","Aliphatic"],"R":["Hydrophilic","H-bonding","Basic","Ionizable"],"N":["Hydrophilic"],"D":["Hydrophilic","H-bonding","Acidic","Ionizable"],"C":["Hydrophilic","H-bonding","Sulfur-containing","Acidic","Ionizable","Disulfide-bond"],"Q":["Hydrophilic","H-bonding"],"E":["Hydrophilic","H-bonding","Acidic","Ionizable"],"G":["Hydrophobic","Aliphatic"],"H":["Hydrophilic","H-bonding","Basic","Ionizable","All-aromatic"],"I":["Hydrophobic","Aliphatic"],"L":["Hydrophobic","Aliphatic"],"K":["Hydrophilic","H-bonding","Basic","Ionizable"],"M":["Hydrophobic","Sulfur-containing"],"F":["Hydrophobic","All-aromatic"],"P":["Hydrophobic","Aliphatic","Cyclic"],"S":["Hydrophilic","H-bonding"],"T":["Hydrophilic","H-bonding"],"W":["Hydrophobic","H-bonding","All-aromatic"],"Y":["Hydrophobic","H-bonding","Ionizable","All-aromatic"],"V":["Hydrophobic","Aliphatic"]};
		
		this.render = function () {
			this.showSingletons(viewport,false);
			this.showSingletons(viewportFront,true);
		}
		
		this.showBar = function (viewport,isOverlay) {
			var length = _values_.length;
			var barWidth = (attrW-2*padding)/length/1.6;
			var selection = viewport.selectAll("."+ID+"_lexSimplexBars"+(isOverlay === true ? "_overlay" : "")).data(_values_);
			//ENTER
			selection
			.enter()
			.append("rect")
			.attr("x",0)
			.attr("y",0)
			.attr("transform",function(d,i){return "translate("+(padding+scaleMainBot(d.abbrv)-barWidth/2)+","+(attrH-padding)+") scale(1,-0.1)"})
			.attr("width",barWidth)
			.attr("height",function(d,i){return attrH-2*padding - scaleMainLeft(Math.max(_clamp_[0],Math.min(_clamp_[1],d.value)));})
			.attr("fill",colorScheme[0])
			.attr("stroke",null)
			.attr("fill-opacity",function(d,i){return isOverlay === true ? 0 : colorScheme[2]})
			.attr("class",ID+"_lexSimplexBars"+(isOverlay === true ? "_overlay" : ""))
			.on("mouseover",function(d,i){
				if (isOverlay) {
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					postit.relocate(coordinates[0],coordinates[1],d);
					d3.select(this).transition("focus").attr("fill",colorScheme[1]).attr("fill-opacity",colorScheme[2]).delay(0).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.on("mouseout",function(d,i){
				if (isOverlay) {
					postit.fade();
					d3.select(this).transition("focus").attr("fill",colorScheme[0]).attr("fill-opacity",0).delay(100).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.transition("fadeInOut")
			.attr("transform",function(d,i){return "translate("+(padding+scaleMainBot(d.abbrv)-barWidth/2)+","+(attrH-padding)+") scale(1,-1)"})
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			//EXIT
			selection
			.exit()
			.transition("fadeInOut")
			.each("end",function(){d3.select(this).remove();})
			.attr("width",0)
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			//UPDATE
			selection
			.on("mouseover",function(d,i){
				if (isOverlay) {
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					postit.relocate(coordinates[0],coordinates[1],d);
					d3.select(this).transition("focus").attr("fill",colorScheme[1]).attr("fill-opacity",colorScheme[2]).delay(0).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.on("mouseout",function(d,i){
				if (isOverlay) {
					postit.fade();
					d3.select(this).transition("focus").attr("fill",colorScheme[0]).attr("fill-opacity",0).delay(100).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.transition("fadeInOut")
			.attr("transform",function(d,i){return "translate("+(padding+scaleMainBot(d.abbrv)-barWidth/2)+","+(attrH-padding)+") scale(1,-1)"})
			.attr("height",function(d,i){return attrH-2*padding - scaleMainLeft(Math.max(_clamp_[0],Math.min(_clamp_[1],d.value)));})
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
		}
		this.showSingletons = function (viewport,isOverlay,coef) {
			coef = coef || 1;
			var length = _values_.length;
			var r = (attrW-2*padding)/length/10*coef;
			var selection = viewport.selectAll("."+ID+"_lexSimplexSingletons"+(isOverlay === true ? "_overlay" : "")).data(_values_);
			//ENTER
			selection
			.enter()
			.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("transform",function(d,i){return "translate("+(padding+scaleMainBot(d.abbrv))+","+(padding+scaleMainLeft(Math.max(_clamp_[0],Math.min(_clamp_[1],d.value))))+") scale(1,0.1)"})
			.attr("r",r)
			.attr("fill",colorScheme[0])
			.attr("stroke",null)
			.attr("fill-opacity",function(d,i){return isOverlay === true ? 0 : colorScheme[2]})
			.attr("class",ID+"_lexSimplexSingletons"+(isOverlay === true ? "_overlay" : ""))
			.on("mouseover",function(d,i){
				if (isOverlay) {
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					postit.relocate(coordinates[0],coordinates[1],d);
					d3.select(this).transition("focus").attr("fill",colorScheme[1]).attr("fill-opacity",colorScheme[2]).delay(0).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.on("mouseout",function(d,i){
				if (isOverlay) {
					postit.fade();
					d3.select(this).transition("focus").attr("fill",colorScheme[0]).attr("fill-opacity",0).delay(100).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.transition("fadeInOut")
			.ease("elastic")
			.attr("transform",function(d,i){return "translate("+(padding+scaleMainBot(d.abbrv))+","+(padding+scaleMainLeft(Math.max(_clamp_[0],Math.min(_clamp_[1],d.value))))+") scale(1,1)"})
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			//EXIT
			selection
			.exit()
			.transition("fadeInOut")
			.ease("elastic")
			.each("end",function(){d3.select(this).remove();})
			.attr("r",0)
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			//UPDATE
			selection
			.on("mouseover",function(d,i){
				if (isOverlay) {
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					postit.relocate(coordinates[0],coordinates[1],d);
					d3.select(this).transition("focus").attr("fill",colorScheme[1]).attr("fill-opacity",colorScheme[2]).delay(0).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.on("mouseout",function(d,i){
				if (isOverlay) {
					postit.fade();
					d3.select(this).transition("focus").attr("fill",colorScheme[0]).attr("fill-opacity",0).delay(100).duration(350);
					onmouse ? onmouse(d3.event,d,i) : void(0);
				}
			})
			.transition("fadeInOut")
			.ease("elastic")
			.attr("r",r)
			.attr("transform",function(d,i){return "translate("+(padding+scaleMainBot(d.abbrv))+","+(padding+scaleMainLeft(Math.max(_clamp_[0],Math.min(_clamp_[1],d.value))))+") scale(1,1)"})
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
		}
		
		var renderMode = ["Singleton","SingletonS","Bar"];
		this.changeMode = function () {
			var length = _values_.length;
			switch (renderMode[0]) {
				case "Bar":
					d3.selectAll("."+ID+"_lexSimplexBars").remove();
					d3.selectAll("."+ID+"_lexSimplexBars_overlay").remove();
					this.showSingletons(viewport,false);
					this.showSingletons(viewportFront,true);
					break;
				case "SingletonS":
					d3.selectAll("."+ID+"_lexSimplexSingletons").remove();
					d3.selectAll("."+ID+"_lexSimplexSingletons_overlay").remove();
					this.showBar(viewport,false);
					this.showBar(viewportFront,true);
					break;
				case "Singleton":
					d3.selectAll("."+ID+"_lexSimplexSingletons").remove();
					d3.selectAll("."+ID+"_lexSimplexSingletons_overlay").remove();
					this.showSingletons(viewport,false,0.5);
					this.showSingletons(viewportFront,true,0.5);
					break;
			}
			var x = renderMode.shift();
			renderMode.push(x);
		}
		
		this.showRanges = function () {
			if(viewportBackground.selectAll("."+ID+"_ranges").node()) {
				var selection = viewportBackground.selectAll("."+ID+"_ranges").data([]);
			} else {
				var selection = viewportBackground.selectAll("."+ID+"_ranges").data(d3.keys(_ranges_));
			}
			var barWidth = (attrW-2*padding)/_values_.length;
			//ENTER
			selection
			.enter()
			.append("rect")
			.attr("x",function(d,i){return padding+scaleMainBot(findAbbrv(d))-barWidth/2;})
			.attr("y",function(d,i){return padding+scaleMainLeft(_ranges_[d].crit)})
			.attr("width",barWidth)
			.attr("height",0)
			.attr("fill",function(d,i){return _ranges_[d].reverse ? "url("+"#"+ID+"_linearGradient_reverse)" :"url("+"#"+ID+"_linearGradient)";})
			.attr("fill-opacity",0.5)
			.attr("stroke","transparent")
			.attr("stroke-width",2)
			.attr("stroke-linejoin","round")
			.attr("class",ID+"_ranges")
			.transition()
			.each("end",function(d,i){
				drawCritLine(d,i);
			})
			.attr("y",function(d,i){return padding+scaleMainLeft(_ranges_[d].max)})
			.attr("height",function(d,i){return Math.abs(scaleMainLeft(_ranges_[d].max)-scaleMainLeft(_ranges_[d].min))})
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			//EXIT
			selection
			.exit()
			.transition()
			.each("start",function(){d3.selectAll("."+ID+"_crits").remove();})
			.each("end",function(){d3.select(this).remove();})
			.attr("y",function(d,i){return padding+scaleMainLeft(_ranges_[d].crit)})
			.attr("height",0)
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			//UPDATE - event handlers infact do not have to exist at enter phase, since update is called anyway.
			selection
			.on("mouseover",function(d,i){
				d3.select(this).transition("highlightRange").attr("stroke",_curveColor_).delay(0).duration(500);
				onmouse ? onmouse(d3.event,d,i,{min:_ranges_[d].min,max:_ranges_[d].max,crit:_ranges_[d].crit,colors:{high:gradientColors[0],low:gradientColors[2]}}) : void(0);
			})
			.on("mouseout",function(d,i){
				d3.select(this).transition("highlightRange").attr("stroke","transparent").delay(0).duration(500);
				onmouse ? onmouse(d3.event,d,i) : void(0);
			})
			.transition()
			.each("end",function(d,i){
				drawCritLine(d,i);
			})
			.attr("y",function(d,i){return padding+scaleMainLeft(_ranges_[d].max)})
			.attr("height",function(d,i){return Math.abs(scaleMainLeft(_ranges_[d].max)-scaleMainLeft(_ranges_[d].min))})
			.delay(function(d,i){return 100*i;})
			.duration(function(d,i){return 500+100*i;});
			
			function drawCritLine (d,i) {
				viewportBackground
				.append("path")
				.attr("d",line([[padding+scaleMainBot(findAbbrv(d))-barWidth/2,padding+scaleMainLeft(_ranges_[d].crit)],[padding+scaleMainBot(findAbbrv(d))-barWidth/2,padding+scaleMainLeft(_ranges_[d].crit)]]))
				.attr("stroke-width",3)
				.attr("stroke-dasharray","5 5")
				.attr("stroke",gradientColors[3])
				.attr("stroke-opacity",0.9)
				.attr("class",ID+"_crits")
				.transition()
				.attr("d",line([[padding+scaleMainBot(findAbbrv(d))-barWidth/2,padding+scaleMainLeft(_ranges_[d].crit)],[padding+scaleMainBot(findAbbrv(d))+barWidth/2,padding+scaleMainLeft(_ranges_[d].crit)]]))
				.delay(0)
				.duration(500);
			}
		}
		
		//###############################################################INVOKED WITHIN APPEND###############################################################
		
		function addCurve(){
			//draw curve
			d3.select("#"+ID).append("g").attr("id",function(){return ID+"_drawCurve"}).style("cursor","pointer")
			.on("mouseover",function(){
				d3.select("#"+ID+"_drawCurve>rect").transition().attr("stroke-width",3).delay(0).duration(500);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_drawCurve>rect").transition().attr("stroke-width",0).delay(0).duration(500);
			})
			.on("click",function(){
				if(document.getElementById(ID+"_simplexLine")) {
					viewport.node().removeChild(document.getElementById(ID+"_simplexLine"));
				} else {
					var samples = [];
					var clone = document.createElementNS("http://www.w3.org/2000/svg","path");
					clone.setAttribute("d",line(_values_.map(function(d,i){return [(padding+scaleMainBot(d.abbrv)),(padding+scaleMainLeft(Math.max(_clamp_[0],Math.min(_clamp_[1],d.value))))]})));
					var tLength = clone.getTotalLength();
					var segment = tLength/99;
					for (var i = 99;i>=0;--i) {
						var point = clone.getPointAtLength(i*segment);
						samples.push([point.x,point.y])
					}
					samples.reverse();
					//console.log(line(samples));
					var path = viewport.append("path").attr("id",ID+"_simplexLine").attr("stroke",_curveColor_).attr("stroke-width",2).attr("stroke-linejoin","round").attr("stroke-opacity",1).attr("fill","transparent").attr("fill-opacity",0);
					path.transition("extend").tween("extend",function(){var interpolator =  d3.interpolate(0,99); return function(t){this.setAttribute("d",line(samples.slice(0,Math.floor(interpolator(t))+1)))}}).delay(0).duration(500);
				}
			})
			.append("rect").attr("x",attrX+attrW-padding).attr("y",attrY+(padding-attrW/12)).attr("rx","0.5%").attr("ry","0.5%").attr("width",attrW/20).attr("height",attrW/20).attr("stroke",_controllerColors_[4]).attr("fill-opacity",0).attr("stroke-width",0);
			d3.select("#"+ID+"_drawCurve").append("svg:image").attr("xlink:href","data:image/png;base64,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")
			.attr("title","draw curve").attr("alt","f(x)").attr("x",attrX+attrW-padding).attr("y",attrY+(padding-attrW/12)).attr("width",attrW/20).attr("height",attrW/20).attr("opacity",0.75);
		}
		function addOpts () {
			var controller = d3.select("#"+ID).append("g").attr("transform","translate("+(attrW*0.05+attrH*0.025)+","+(attrH*0.95+attrH*0.025)+")").attr("clip-path",function(){return "url(#"+ID+"_clipperEtiquete)";}).style("cursor","pointer");
			controller.append("path").attr("d",function(){return _this_.etiquete(attrH*0.05,attrW*0.20);}).attr("fill",_controllerColors_[2]);
			controller.append("text").text("appereance").attr("x",0.05*attrH).attr("y",0.0075*attrH).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","start").attr("font-size",attrW/40).attr("fill",_controllerColors_[0]).attr("stroke-width",0);
			controller
			.on("mouseover",function(){
				d3.select(this).select("path").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select(this).select("text").transition().attr("fill",_controllerColors_[4]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select(this).select("path").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select(this).select("text").transition().attr("fill",_controllerColors_[0]).delay(0).duration(250);
			})
			.on("click",function(){
				_this_.changeMode();
			});
			if(_ranges_ !== undefined) {
				var controller2 = d3.select("#"+ID).append("g").attr("transform","translate("+(attrW*0.75-attrH*0.025)+","+(attrH*0.95+attrH*0.025)+")").attr("clip-path",function(){return "url(#"+ID+"_clipperEtiquete)";}).style("cursor","pointer");
				controller2.append("path").attr("d",function(){return _this_.etiquete(attrH*0.05,attrW*0.20);}).attr("fill",_controllerColors_[2]);
				controller2.append("text").text("range").attr("x",0.05*attrH).attr("y",0.0075*attrH).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","start").attr("font-size",attrW/40).attr("fill",_controllerColors_[0]).attr("stroke-width",0);
				controller2
				.on("mouseover",function(){
					d3.select(this).select("path").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
					d3.select(this).select("text").transition().attr("fill",_controllerColors_[4]).delay(0).duration(250);
				})
				.on("mouseout",function(){
					d3.select(this).select("path").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
					d3.select(this).select("text").transition().attr("fill",_controllerColors_[0]).delay(0).duration(250);
				})
				.on("click",function(){
					_this_.showRanges();
				});
			}
		}
		
		//###############################################################INVOKED WITHIN APPEND###############################################################
		
		//generates a tag object that relocates on each mouseover
		function postIt() {
			var masterDimension = Math.min(attrW,attrH);
			var width = attrW/3;
			var height = attrH/3;
			var postitGeometry = [[0,0],[5/6*width,0],[5/6*width,3/4*height],[width,height],[3/4*width,5/6*height],[0,5/6*width]];
			var Tx = 0;
			var Ty = 0;
			var Sx = 1;
			var postit = d3.select("#"+ID).append("g").attr("id",ID+"_postit").style("opacity",0).attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)");
			postit.append("path").attr("d",function(){return line(postitGeometry)+"Z";}).attr("fill",_tagColors_[0]).attr("fill-opacity",0.5).attr("stroke",_tagColors_[0]).attr("stroke-width",2).attr("stroke-linejoin","round");
			//texts
			var t1 = postit.append("text").text("").attr("x",width*2/5).attr("dx",0).attr("y",0).attr("dy",width/4).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",width/4).attr("fill",_tagColors_[1]).attr("stroke",_tagColors_[1]).attr("stroke-width",1).style("cursor","pointer").attr("class",ID+"_postitTexts");
			var t2 = postit.append("text").text("").attr("x",width*2/5).attr("dx",0).attr("y",0).attr("dy",width*1/2).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",width/8).attr("fill",_tagColors_[1]).attr("stroke",_tagColors_[1]).attr("stroke-width",1).style("cursor","pointer").attr("class",ID+"_postitTexts");
			var t3 = postit.append("text").text("").attr("x",width*2/5).attr("dx",0).attr("y",0).attr("dy",width*3/4).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",width/10).attr("fill",_tagColors_[1]).attr("stroke",_tagColors_[1]).attr("stroke-width",1).style("cursor","pointer").attr("class",ID+"_postitTexts");
			var texts = d3.selectAll("."+ID+"_postitTexts");
			this.relocate = function(mouseX,mouseY,data){ 
				switch ((mouseX<attrW/2?0:2) + (mouseY<attrH/2?3:7)) {
					case 3: 
						postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); var interpolateText1 = d3.interpolate(0,data.value); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)"); t1.text((interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
						t1.attr("font-size",width/4);
						t2.attr("font-size",function(){return width/8*Math.min(1,15/data.name.length)}).text(data.name);//the longest you can write with width/8 font is 15 letters.
						t3.text(function(){if(typeof _interpretation_ === "function"){return _interpretation_(data.name,data.value)}else{return "";}});
						break;
					case 5: 
						postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); var interpolateText1 = d3.interpolate(0,data.value); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","scale("+Sx+",1)"); t1.text((interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
						t1.attr("font-size",width/4);
						t2.attr("font-size",function(){return width/8*Math.min(1,15/data.name.length)}).text(data.name);
						t3.text(function(){if(typeof _interpretation_ === "function"){return _interpretation_(data.name,data.value)}else{return "";}});
						break;
					case 7:
						postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); var interpolateText1 = d3.interpolate(0,data.value); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)"); t1.text((interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
						t1.attr("font-size",width/4);
						t2.attr("font-size",function(){return width/8*Math.min(1,15/data.name.length)}).text(data.name);
						t3.text(function(){if(typeof _interpretation_ === "function"){return _interpretation_(data.name,data.value)}else{return "";}});
						break;
					case 9:
						postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); var interpolateText1 = d3.interpolate(0,data.value); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","scale("+Sx+",1)"); t1.text((interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
						t1.attr("font-size",width/4);
						t2.attr("font-size",function(){return width/8*Math.min(1,15/data.name.length)}).text(data.name);
						t3.text(function(){if(typeof _interpretation_ === "function"){return _interpretation_(data.name,data.value)}else{return "";}});
						break;
				}
			}
			this.fade = function(){
				postit.transition("fadeAway").style("opacity",0).delay(0).duration(500);
			}
			this.format = function(value) {
				if (Math.floor(Math.abs(value)/1000)<1) {
					return Math.round(value*1000)/1000;
				} else if (Math.floor(Math.abs(value)/1000000)<1) {
					var kValue = value/1000;
					return Math.round(kValue*1000)/1000+"K";
				} else if (Math.floor(Math.abs(value)/1000000000)<1) {
					var mValue = value/1000000;
					return Math.round(mValue*1000)/1000+"M";
				} else {
					return value;
				}
			}
		}
		
		this.etiquete = function(h,l) {
			return "M"+-h/4+",-0.001"+"A"+h/4+","+h/4+" 0 1,1 "+-h/4+",0.001"+"L"+-h/2+",0"+"L"+-h/2+","+h/2+"L"+(h/2+l)+","+h/2+"L"+(h/2+l)+","+-h/2+"L"+-h/2+","+-h/2+"L"+-h/2+",0"+"L"+-h/4+",0"+"Z";
		}
		// returns the abbreviation, given the name or reverse
		function findAbbrv(name,reverse){
			var field = !reverse ? "name" : "abbrv";
			var fieldComp = !reverse ? "abbrv" : "name";
			for (var i = 0;i<_values_.length;++i) {
				if(_values_[i][field] === name) {
					return _values_[i][fieldComp]; 
				}
			}
		}
		
		//subs, mostly from I-PV
		function warp (ID,width,height) {
			//console.log(ID+" "+width+" "+height+" !");
			d3.select("#"+ID).transition("adjustX").attr("x",function(){var x = parseInt(d3.select(this).attr("x"));return x-width/2;}).delay(0).duration(500);
			d3.select("#"+ID).transition("adjustY").attr("y",function(){var y = parseInt(d3.select(this).attr("y"));return y-height/2;}).delay(0).duration(500);
			d3.select("#"+ID).transition("adjustW").attr("width",width).delay(0).duration(500);
			d3.select("#"+ID).transition("adjustH").attr("height",height).delay(0).duration(500);
			//d3.select("#"+ID).transition("adjustFO").attr("fill-opacity",0.6).delay(0).duration(1000);
		}
		//bound unwarp, anti-warp
		this.unwarp = function (f) {
			viewBox = d3.select("#"+ID).attr("viewBox");
			viewBoxFinal = viewBox.split(" ").map(function(d,i){return d*100}).join(" ");
			d3.select("#"+ID).transition("shrink").each("end",function(){d3.select(this).remove();if(typeof f === "function"){return f.bind(_this_)();}}).tween("unwarp",function(){var interpolator = d3.interpolate(viewBox,viewBoxFinal);return function(t){d3.select(this).attr("viewBox",interpolator(t))}}).delay(0).duration(3000);
			d3.select("#"+ID).transition("fadeAway").style("opacity",0).delay(0).duration(1000);
		}
	}
	window.lexiconSimplex = new lexiconSimplexF;
})();
<!--Lexicon-->