<!--Lexicon-->
/*Copyright Ibrahim Tanyalcin 2014-2017
Free for academic use.*/
(function (){
	function lexiconDashF () {
		var ID = ID || "lexicon_"+Math.round(Math.random()*100);
		var viewport = undefined;
		var viewport_layer0 = undefined;
		var viewport_layer1 = undefined;
		var viewport_layer2 = undefined;
		var gRotateCenter = undefined;
		var _input_ = undefined;
		var _values_ = [];
		var _range_ = undefined;
		var _overall_ = undefined;
		var _barColor_ = ["Black","DimGray"];
		var _colorScale_ = (function(){var interpolator = d3.interpolateRgb("blue","red");return d3.range(10).map(function(d,i){return interpolator(i/9);})})();
		var _textColor_ = "DimGray";
		var _colorScheme_ = ["Black","Gray"];//fill colors of the flask
		var _fillUps_ = undefined;
		var _pitchforker_ = undefined;
		var _highlight_ = "Orange";
		var _threshold_ = 0;
		var _categories_ = undefined;
		var marker;
		var _strokeWidth_ = 10;
		var attrX = attrX || 0;
		var attrY = attrY || 0;
		var attrW = attrW || 100;
		var attrH = attrH || 100;
		var _refLine_ = [[-50,0],[50,0]];
		var styleW = styleW || "100px";
		var styleH = styleH || "100px";
		var styleMargin = styleMargin || "0px";
		var bColor = bColor || "DimGray";
		var bOpacity = bOpacity || 0.25;
		var _container_ = _container_ || document.body;
		var position = position || "relative"
		var top = top || "0px";
		var left = left || "0px";
		var line = d3.svg.line();
		var padding = 0.1*attrW;
		var onmouse = undefined;
		var _this_ = this;
		this.configFillUp = function(points){
			var total = 0; 
			var result = [];
			var rescaled = [];
			for(var i = 0;i<points.length;++i){
				var scaled = typeof _range_ === "function" ? _range_(points[i],_overall_) : (points[i].value-_range_[0])/(_range_[1]-_range_[0]);
				rescaled.push(scaled);
				total+= scaled;
			} 
			for(var i = 0, j = 0;i<points.length;++i){
				var by = rescaled[i]/total*_overall_;
				result.push({name:points[i].name,_from_:j,by:by});
				j += by;
			}
			return result;
		};
		this.lexID = function (u){if(arguments.length !== 0){ID=u; return this;}else{return ID;}}
		this.x = function (u){attrX=u; return this;}
		this.y = function (u){attrY=u; return this;}
		this.w = function (u){attrW=u; padding = 0.1*attrW; return this;}
		this.h = function (u){attrH=u; padding = 0.1*attrH; return this;}
		this.sW = function (u){styleW=u; return this;}
		this.sH = function (u){styleH=u; return this;}
		this.position = function (u){position=u; return this;}
		this.color = function(u){bColor=u;return this;}
		this.opacity = function(u){bOpacity=u;return this;}
		this.colorScheme = function(u){_colorScheme_ = u;return this;}
		this.barColor = function(u){_barColor_ = u;return this;}
		this.colorScale = function(w){var args = Array.prototype.slice.call(arguments);args.shift();_colorScale_ = w.apply(_this_,args);return this;}
		this.textColor = function(u){_textColor_ = u;return this;}
		this.container = function(u){_container_ = u;return this;}
		this.sTop = function(u){top = u; return this;}
		this.sLeft = function(u){left = u; return this;}
		this.sMargin = function(u){styleMargin = u; return this;}
		this.input = function(input,range,categories,threshold){if(arguments.length !== 0){_input_ = input; _values_ = input.points; _overall_ = Math.min(Number(input.overall),1); _range_ = range !== undefined ? range : (input.range || [0,1]); _fillUps_ = this.configFillUp(_values_); _categories_ = categories !== undefined ? categories : (input.categories || ["Benign","Deleterious"]); _threshold_ = threshold !== undefined ? threshold : (input.threshold || 0.75); return this;}else{return _input_;}}
		var _objSync_ = [];//needed because synctor recursively checks 
		this.sync = function(){return _objSync_;}////needed because synctor recursively checks 
		this.onmouse = function(f){if(arguments.length !== 0){onmouse = f.bind(this); return this;}else{return onmouse;}}
		this.fillUps = function(){return _fillUps_.slice()}
		this.isAppended = false;
		this.append = function () {
			var svg = d3.select(_container_).append("svg").attr("preserveAspectRatio","none").attr("id",ID).attr("viewBox",attrX+" "+attrY+" "+(attrX+attrW)+" "+(attrY+attrH)).style("width",styleW).style("height",styleH).style("padding","0px").style("display","block").style("position",position).style("top",top).style("left",left).style("overflow","visible").style("line-height","normal").style("margin",styleMargin);
			d3.select("#"+ID).append("svg:rect").attr("id",function(){return ID+"_rect";}).attr("x",function(){return (attrX+attrW)/2;}).attr("y",function(){return (attrY+attrH)/2;}).attr("width",0).attr("height",0).attr("rx",15).attr("ry",15).attr("fill-opacity",bOpacity).attr("fill",bColor);
			warp(ID+"_rect",attrW,attrH);
			
			//***Defs***
			//***Defs***
		
			_refLine_ = [[-attrW/2+padding,0],[attrW/2-padding,0]];
			_strokeWidth_ = Math.max(Math.min(attrW,attrH)/20,4);
			viewport = d3.select("#"+ID).append("g").attr("transform",function(){return "translate("+(attrW/2)+","+(attrH/2)+")"}).on("click",function(){_this_.render();}); //items in front because they will be below the layer g elements.
			viewport.append("g").append("rect").attr("x",-attrW/2).attr("y",-attrH/2).attr("width",attrW).attr("height",attrH).attr("fill-opacity",0).on("click",function(){viewport.on("click")();}); //background rect for ease of interactivity
			viewport_layer0 = viewport.append("g");
			viewport_layer1 = viewport.append("g");
			viewport_layer2 = viewport.append("g");
			
			gRotateCenter = viewport.append("g").attr("transform","translate(0,"+(padding-attrW/2)+") rotate(180)");
			marker = new markerObj;
			_pitchforker_ = new pitchfork(_refLine_,0,0,1,-2,1.25,0.25,0.2);
			beginBar();
			
			
			this.isAppended = true;
			return this;
		}

		//resusable arrays for AA reference
		var aaSymbols = {Nonpolar:"Gray",Polar:"DeepPink",Positive:"Red",Negative:"Blue",Aromatic:"Green",Stop:"Orange"};
		var aminoacidsX = {"A":["Alanine","Nonpolar"],"R":["Arginine","Positive"],"N":["Asparagine","Polar"],"D":["Aspartic-Acid","Negative"],"C":["Cysteine","Polar"],"Q":["Glutamine","Polar"],"E":["Glutamic-Acid","Negative"],"G":["Glycine","Nonpolar"],"H":["Histidine","Positive"],"I":["Isoleucine","Nonpolar"],"L":["Leucine","Nonpolar"],"K":["Lysine","Positive"],"M":["Methionine","Nonpolar"],"F":["Phenylalanine","Aromatic"],"P":["Proline","Nonpolar"],"S":["Serine","Polar"],"T":["Threonine","Polar"],"W":["Tryptophan","Aromatic"],"Y":["Tyrosine","Aromatic"],"V":["Valine","Nonpolar"],"X":["Stop","Stop"]};
		var aminoacids_OtherProperties = {"A":["Hydrophobic","Aliphatic"],"R":["Hydrophilic","H-bonding","Basic","Ionizable"],"N":["Hydrophilic"],"D":["Hydrophilic","H-bonding","Acidic","Ionizable"],"C":["Hydrophilic","H-bonding","Sulfur-containing","Acidic","Ionizable","Disulfide-bond"],"Q":["Hydrophilic","H-bonding"],"E":["Hydrophilic","H-bonding","Acidic","Ionizable"],"G":["Hydrophobic","Aliphatic"],"H":["Hydrophilic","H-bonding","Basic","Ionizable","All-aromatic"],"I":["Hydrophobic","Aliphatic"],"L":["Hydrophobic","Aliphatic"],"K":["Hydrophilic","H-bonding","Basic","Ionizable"],"M":["Hydrophobic","Sulfur-containing"],"F":["Hydrophobic","All-aromatic"],"P":["Hydrophobic","Aliphatic","Cyclic"],"S":["Hydrophilic","H-bonding"],"T":["Hydrophilic","H-bonding"],"W":["Hydrophobic","H-bonding","All-aromatic"],"Y":["Hydrophobic","H-bonding","Ionizable","All-aromatic"],"V":["Hydrophobic","Aliphatic"]};
		
		this.renderFlask = function () {
			this.animComplete = false;
			var r = _refLine_[1][0];
			var rCoef = 0.6;
			var odometer = undefined;
			var transitionMaster = d3.select("#"+ID).transition("master").delay(0).duration(500); //WATCH OUT, chained transitions loose the pointer to varibles, I will have to use absolute string selectors here. Tried var.node(), did not work.
			transitionMaster.select("#"+ID+"_lexDashMarker").attr("fill-opacity",0).each("end",function(){d3.select(this).attr("visibility","hidden");});
			transitionMaster.selectAll("."+ID+"_segments").transition().duration(0).transition().each("start",function(){var property = this.__data__; d3.select(this).transition().each("end",function(){d3.select(this).attr("visibility","hidden");_colorScale_.indexOf(property) === 0?(d3.select("#"+ID+"_lexDashBar").transition().delay(0).duration(1000).call(bend),odometer = new odometerObj):void(0);}).attr("width",0).delay(function(){return (9-_colorScale_.indexOf(property))*50;}).duration(100)}).duration(0);
			transitionMaster.selectAll("."+ID+"_indicators").attr("fill-opacity",0).each("end",function(){d3.select(this).attr("visibility","hidden");});
			
			function bend(transition) {
				transition
				.ease("cubic-out")
				.attr("stroke-width",_strokeWidth_*rCoef)
				.attr("stroke",_barColor_[1])
				.attrTween("d",function(){return function(t){return barToCircle(_refLine_,t,0.5,1,rCoef);}})
				.attrTween("transform",function(){return function(t){return t<=0.5?"translate(0,0) rotate(0)":"translate(0,"+(-_refLine_[1][0]*rCoef*2*(t-0.5))+") rotate("+(180*2*(t-0.5))+")";}})
				.each("end",function(){_fillUp_();});
			}
			
			function odometerObj () {
				this.a = 3;
				//var _lineHeight_ = 2*(attrH-2*padding)/_fillUps_.length/(rCoef);
				var _lineHeight_ = attrH*0.20; //fixed lineHeight
				//var _fontSize_ = Math.max(20,Math.min(_lineHeight_/2,40));
				var _fontSize_ = r/5;//fixed font-size
				var meter = 0;
				this.meter = viewport_layer2.append("text")
				.text(meter*100+"%")
				.attr("x",0)
				.attr("y",-r*rCoef-_lineHeight_/4)
				.attr("text-anchor","middle")
				.attr("font-size",_fontSize_)
				.attr("font-family","advent-pro")
				.attr("fill",_textColor_)
				.attr("fill-opacity",0)
				.attr("stroke","none")
				.attr("class",ID+"_annotations");
				this.meter
				.transition()
				.ease("cubic-out")
				.attr("fill-opacity",0.6)
				.delay(0)
				.duration(1000);
				
				this.indicators = viewport_layer2.selectAll().data(d3.range(2)).enter().append("text")
				.text(function(d,i){return _categories_[d]})
				.attr("x",0)
				.attr("y",-r*rCoef-_lineHeight_/4)
				.attr("dx",function(d,i){return d === 0 ? -r/3 - _strokeWidth_ : r/3 + _strokeWidth_})
				.attr("text-anchor",function(d,i){return d === 0 ? "end" : "start"})
				.attr("font-size",_fontSize_/2)
				.attr("font-family","advent-pro")
				.attr("fill",function(d,i){return d===0?_barColor_[1]:"Red"})
				.attr("fill-opacity",0)
				.attr("stroke","none")
				.attr("class",ID+"_annotations");
				this.indicators
				.transition()
				.ease("cubic-out")
				.attr("fill-opacity",0.9)
				.delay(0)
				.duration(1000);
				
				viewport_layer1.selectAll("."+ID+"_gauges").data(d3.range(2))
				.enter()
				.append("path")
				.attr("d",barToCircle([[-r/3,0],[r/3,0]],0))
				.attr("stroke",function(d,i){return i===0?_barColor_[1]:"Red"})
				.attr("stroke-opacity",0)
				.attr("stroke-linecap","butt")
				.attr("stroke-dasharray",function(d,i){return i===0?"none":"0 "+(Math.PI*r/3)+" 0"})
				.attr("transform","translate(0,"+(-r*rCoef-_lineHeight_/4)+")")
				.attr("fill","none")
				.attr("stroke-width",function(d,i){return i===0?_strokeWidth_/3:_strokeWidth_/1.5})
				.attr("class",ID+"_gauges "+ID+"_annotations")
				.transition()
				.attrTween("d",function(){return function(t){return barToCircle([[-r/3,0],[r/3,0]],t,1);}})
				.attr("stroke-dasharray",function(d,i){return i===0?void(0):"0 "+(Math.PI*r/3*_threshold_)+" "+(Math.PI*r/3*(1-_threshold_))})
				.attr("stroke-opacity",1)
				.delay(0)
				.duration(1000);
				
				this.odometer = viewport_layer1.append("path")
				.attr("d","M0,"+(r/50)+" L"+(-r/3)+",0 L0,"+(-r/50)+"Z")
				.attr("stroke","none")
				.attr("stroke-linejoin","round")
				.attr("fill","DodgerBlue")
				.attr("fill-opacity",0)
				.attr("transform","translate(0,"+(-r*rCoef-_lineHeight_/4)+") rotate(0)")
				.attr("class",ID+"_annotations");
				this.odometer
				.transition()
				.attr("fill-opacity",0.9)
				.delay(0)
				.duration(1000);
				
				this.increaseBy = function (value) {
					var interpolatorRotate = d3.interpolate(meter*180,(meter+value)*180);
					var interpolatorMeter = d3.interpolate(meter*100,(meter+value)*100);
					meter += value;
					this.meter.transition().tween("text",function(){return function(t){d3.select(this).text(String(interpolatorMeter(t)).slice(0,4)+"%");}}).delay(0).duration(500);
					this.odometer.transition().attrTween("transform",function(){return function(t){return "translate(0,"+(-r*rCoef-_lineHeight_/4)+") rotate("+interpolatorRotate(t)+")"}}).delay(0).duration(500);
				}
			}
			
			function _fillUp_() {
				var fillUps = viewport_layer0.selectAll("."+ID+"_fillUps").data(_values_);
				//enter
				fillUps
				.enter()
				.append("path")
				.attr("d",function(d,i){return fillUp(_refLine_,0,_fillUps_[i].by,_fillUps_[i]._from_,rCoef)})
				.attr("transform","translate(0,"+(-_refLine_[1][0]*rCoef)+") rotate(180)")
				.attr("fill",function(d,i){return _colorScheme_[i%_colorScheme_.length]})
				.attr("fill-opacity",0.75)
				.attr("stroke","none")
				.attr("stroke-width",2)
				.attr("id",function(d,i){return ID+"_fillUp"+i;})
				.attr("class",ID+"_fillUps")
				.on("click",function(d,i){d3.event.preventDefault();d3.event.stopPropagation();})
				.on("touchstart",function(d,i){/*d3.event.preventDefault();*/d3.event.stopPropagation();})
				.on("touchmove",function(d,i){d3.event.preventDefault();d3.event.stopPropagation();})
				.on("mouseover",function(d,i){d3.select(this).attr("stroke",_highlight_);d3.select("#"+ID+"_annotationText"+i).node()?d3.select("#"+ID+"_annotationText"+i).attr("fill",_highlight_):void(0);onmouse ? onmouse(d3.event,d,i) : void(0);})
				.on("mouseout",function(d,i){d3.select(this).attr("stroke","none");d3.select("#"+ID+"_annotationText"+i).node()?d3.select("#"+ID+"_annotationText"+i).attr("fill",_textColor_):void(0);onmouse ? onmouse(d3.event,d,i) : void(0);})
				.transition()
				.each("end",function(d,i){i===0?annotate():void(0);odometer.increaseBy(_fillUps_[i].by)})
				.attrTween("d",function(d,i){return function(t){return fillUp(_refLine_,t,_fillUps_[i].by,_fillUps_[i]._from_,rCoef)}})
				.delay(function(d,i){return i*500;})
				.duration(500);
				//update
				fillUps
				.attr("visibility","visible")
				.attr("d",function(d,i){return fillUp(_refLine_,0,_fillUps_[i].by,_fillUps_[i]._from_,rCoef)})
				.transition()
				.each("end",function(d,i){i===0?annotate():void(0);odometer.increaseBy(_fillUps_[i].by)})
				.attrTween("d",function(d,i){return function(t){return fillUp(_refLine_,t,_fillUps_[i].by,_fillUps_[i]._from_,rCoef)}})
				.delay(function(d,i){return i*500;})
				.duration(500);
			}
			
			function annotate() {
				var _lineHeight_ = 2*(attrH-2*padding)/_fillUps_.length/(r*rCoef);
				var base = -((attrH-2*padding)/(r*rCoef)/2+1);
				_pitchforker_.reset().lineHeight(_lineHeight_).vBase(base).rCoef(rCoef).points(_refLine_);
				var anotLines = viewport_layer2.selectAll("."+ID+"_annotationLines").data(_values_);
				//enter only
				anotLines
				.enter()
				.append("path")
				.attr("d",null)
				.attr("transform","translate(0,"+(-_refLine_[1][0]*rCoef)+") rotate(180)")
				.attr("stroke",_textColor_)
				.attr("stroke-linejoin","round")
				.attr("stroke-linecap","round")
				.attr("stroke-dasharray","5 5")
				.attr("fill","none")
				.attr("stroke-opacity",0.4)
				.attr("stroke-width",2)
				.attr("class",ID+"_annotationLines "+ID+"_annotations")
				.transition()
				.attrTween("d",function(d,i){var trajectory = _pitchforker_.from(_fillUps_[i]._from_).height(_fillUps_[i].by).calculate();addText.call(_this_,d,i,trajectory);_pitchforker_.flip();i!==0?_pitchforker_.lever():void(0);return function(t){return labelLine(trajectory,t);}})
				.delay(function(d,i){return i*500;})
				.duration(450);//important if duration is equal or longer than delay, than pitchfork will get out of sync
			}
			
			function addText(data,i,trajectory) {
				var _lineHeight_ = 2*(attrH-2*padding)/_fillUps_.length/(rCoef);
				var _fontSize_ = Math.max(20,Math.min(_lineHeight_/8,40));
				viewport_layer2
				.append("text")
				.attr("font-size",_fontSize_)
				.attr("font-family","advent-pro")
				.attr("fill",_textColor_)
				.attr("stroke","none")
				.attr("id",function(){return ID+"_annotationText"+i;})
				.attr("class",ID+"_annotationTexts "+ID+"_annotations")
				.on("click",function(d,i){d3.event.preventDefault();d3.event.stopPropagation();})
				.on("touchstart",function(d,i){/*d3.event.preventDefault();*/d3.event.stopPropagation();})
				.on("touchmove",function(d,i){d3.event.preventDefault();d3.event.stopPropagation();})
				.on("mouseover",function(){d3.select(this).attr("stroke",_highlight_);d3.select("#"+ID+"_fillUp"+i).node()?d3.select("#"+ID+"_fillUp"+i).attr("fill",_highlight_):void(0);onmouse ? onmouse(d3.event,data,i) : void(0);})
				.on("mouseout",function(){d3.select(this).attr("stroke","none");d3.select("#"+ID+"_fillUp"+i).node()?d3.select("#"+ID+"_fillUp"+i).attr("fill",_colorScheme_[i%_colorScheme_.length]):void(0);onmouse ? onmouse(d3.event,data,i) : void(0);})
				.transition()
				.each("end",function(){i===_values_.length-1 ? _this_.animComplete = _this_.renderBar : void(0);})
				.tween("keyboard",function(){var selection = d3.select(this);/*var trajectory = _pitchforker_.calculate();_pitchforker_.flip();i!==0?_pitchforker_.lever():void(0);*/return function(t){selection.call(labelText,trajectory,t,data.name,_fillUps_[i].by*100,(-r*rCoef))}})
				.delay(450)
				.duration(500);
			}
		}
		this.renderBar = function abc() {
			//console.log("hehe");
			this.animComplete = false;
			var r = _refLine_[1][0];
			var rCoef = 0.6;
			var length = _values_.length;
			var barPadding = 0.05;
			var barWidth = 2*r/((1+barPadding)*10+barPadding);
			var transitionMaster = d3.select("#"+ID).transition("master").delay(0).duration(500);
			transitionMaster.selectAll("."+ID+"_annotations").attr("fill-opacity",0).attr("stroke-opacity",0).each("end",function(){d3.select(this).remove()});
			transitionMaster.selectAll("."+ID+"_fillUps").transition().duration(0).transition().each("start",function(d,i){
				d3.select(this)
				.transition()
				.ease("linear")
				.each("end",function(){
					d3.select(this).attr("visibility","hidden");
					i === 0 ? d3.select("#"+ID+"_lexDashBar").transition().delay(0).duration(1000).call(unbend): void(0);
				})
				.attrTween("d",function(){return function(t){return fillUp(_refLine_,(1-t),_fillUps_[i].by,_fillUps_[i]._from_,rCoef)}})
				.delay(function(){return (length-1-i)*100})
				.duration(100)
			}).duration(0);
			
			function unbend(transition) {
				transition
				.ease("cubic-in")
				.attr("stroke-width",_strokeWidth_)
				.attr("stroke",_barColor_[0])
				.attrTween("d",function(){return function(t){return circleToBar(_refLine_,t,0.5,rCoef,1);}})
				//.attrTween("transform",function(){return function(t){return t<=0.5?"translate(0,0) rotate(0)":"translate(0,"+(-_refLine_[1][0]*rCoef*2*(t-0.5))+") rotate("+(180*2*(t-0.5))+")";}})
				.attrTween("transform",function(){return function(t){return t<=0.5?"translate(0,"+(-_refLine_[1][0]*rCoef*2*(0.5-t))+") rotate("+(180*2*(0.5-t))+")" : "translate(0,0) rotate(0)";}})
				.each("end",function(){
					d3.select("#"+ID+"_lexDashMarker").transition().attr("fill-opacity",1).each("start",function(){d3.select(this).attr("visibility","visible");}).delay(0).duration(500);
					d3.selectAll("."+ID+"_segments").transition().each("end",function(d,i){i === _colorScale_.length-1 ? _this_.animComplete = _this_.renderFlask : void(0);}).attr("width",barWidth).attr("visibility","visible").delay(function(d,i){return i*50;}).duration(100);
					d3.selectAll("."+ID+"_indicators").transition().attr("fill-opacity",0.9).each("start",function(){d3.select(this).attr("visibility","visible");}).delay(0).duration(500);
				});
			}
		}
		this.animComplete = false;
		this.render = function () {
			this.animComplete ? this.animComplete() : void(0);
		}
		
		//###############################################################INVOKED WITHIN APPEND###############################################################
		function beginBar () {
			var r = _refLine_[1][0];
			var transitionMaster = d3.select("#"+ID).transition("master").delay(0).duration(1500); //WATCH OUT, chained transitions loose the pointer to varibles, I will have to use absolute string selectors here. Tried var.node(), did not work.
			var barPadding = 0.05;
			var barWidth = 2*r/((1+barPadding)*10+barPadding);
			var segments = viewport_layer1.selectAll("."+ID+"_segments").data(_colorScale_);
			viewport_layer1.append("path").attr("id",ID+"_lexDashBar").attr("d",barToCircle([[0,0],[0,0]],0)).attr("stroke",_barColor_[0]).attr("stroke-opacity",0.9).attr("stroke-linecap","round").attr("fill","none").attr("stroke-width",_strokeWidth_);
			segments
			.enter()
			.append("rect")
			.attr("width",0)
			.attr("height",_strokeWidth_*0.75)
			.attr("x",function(d,i){return barWidth*(i*(1+barPadding)+barPadding)-r;})
			.attr("y",-_strokeWidth_*0.45)
			.attr("rx","1%")
			.attr("ry","1%")
			.attr("stroke","none")
			.attr("class",ID+"_segments")
			.attr("fill",function(d,i){return _colorScale_[i]});
			
			viewport_layer1.selectAll("."+ID+"_indicators").data(d3.range(5)).enter().append("text")
			.text(function(d,i){
				if (d<2) {
					return _categories_[d];
				} else if (d>=2 && d<4) {
					return ["0%","100%"][d-2];
				} else {
					return String(_overall_*100).slice(0,4)+"%";
				}
			})
			.attr("x",function(d,i){
				if (d % 2 === 0 && d<4) {
					return barWidth*(barPadding)-r;
				} else if (d % 2 === 1 && d<4) {
					return barWidth*((_colorScale_.length)*(1+barPadding)+barPadding)-r;
				} else {
					return 2*r*_overall_-r;
				}
			})
			.attr("y",function(d,i){
				if (d < 2) {
					return _strokeWidth_*3;
				} else if (d>=2 && d<4) {
					return _strokeWidth_*5;
				} else {
					return _strokeWidth_*-3;
				}
			})
			.attr("text-anchor",function(d,i){return d === 0 ? "middle" : "middle"})
			.attr("font-size",r/10)
			.attr("font-family","advent-pro")
			.attr("fill",function(d,i){
				if (d % 2 === 0 && d<4) {
					return _barColor_[1];
				} else if (d % 2 === 1 && d<4) {
					return "Red";
				} else {
					return _colorScale_[Math.max(0,Math.min(_colorScale_.length-1,~~(_colorScale_.length*_overall_)))];
				}
				return d===0?_barColor_[1]:"Red"
			})
			.attr("fill-opacity",0)
			.attr("stroke","none")
			.attr("class",ID+"_indicators")
			.attr("visibility","hidden");
			
			transitionMaster.select("#"+ID+"_lexDashBar").ease("cubic-out").attrTween("d",function(){ var interpolator = d3.interpolateArray([[0,0],[0,0]],_refLine_);return function(t){return barToCircle(interpolator(t),0);}});
			transitionMaster.select("#"+ID+"_lexDashMarker").transition().duration(0).transition().each("start",function(){d3.select(this).attr("visibility","visible");}).attr("transform", function(){return "translate("+(2*r*_overall_-r)+",0)"+" scale("+(_strokeWidth_*1.25)+","+(_strokeWidth_*1.25)+")"}).duration(500);
			transitionMaster.selectAll("."+ID+"_segments").transition().duration(0).transition().each("start",function(){var property = this.__data__; d3.select(this).transition().each("end",function(){_colorScale_.indexOf(property) === _colorScale_.length-1?_this_.animComplete = _this_.renderFlask:void(0);}).attr("width",barWidth).delay(function(){return _colorScale_.indexOf(property)*50;}).duration(100)}).duration(0);
			transitionMaster.selectAll("."+ID+"_indicators").transition().duration(0).transition().ease("cubic-out").each("start",function(){d3.select(this).attr("visibility","visible");}).attr("fill-opacity",0.9).duration(500);
		}
		function markerObj () {
			this.unit = 1;
			var sqrt3 = Math.sqrt(3);
			var markerString = this.markerString = (function(){return "M"+-(this.unit)/4+","+((this.unit*0.75)*sqrt3)+"L"+-(this.unit)+","+0+"A"+(2*this.unit/sqrt3)+","+(2*this.unit/sqrt3)+" 0 1,1 "+(this.unit)+",0 L"+(this.unit)/4+","+((this.unit*0.75)*sqrt3)+"L"+(this.unit)/4+","+((this.unit*0.25)*sqrt3)+"A"+(this.unit)/2+","+(this.unit)/2+" 0 1,0 "+-(this.unit)/4+","+((this.unit*0.25)*sqrt3)+"Z"}).bind(this)();
			this.marker = viewport.append("path").attr("id",ID+"_lexDashMarker").attr("d",markerString).attr("transform",function(){return "scale("+(_strokeWidth_*1.25)+","+(_strokeWidth_*1.25)+")"}).attr("fill","Red").attr("fill-opacity",0.8).attr("visibility","hidden");
			this.node = this.marker.node();
		}
		//###############################################################INVOKED WITHIN APPEND###############################################################
		
		//subs for animation
		function barToCircle (points,t,bendDur,rCoefStart,rCoefEnd) {
			rCoefStart = rCoefStart || 1;
			rCoefEnd = (rCoefEnd * 1/rCoefStart) || 1/rCoefStart;
			bendDur = bendDur || 0.5;
			var dx = 0.0001;
			var r = (points[1][0]-points[0][0])/2*rCoefStart;
			var R = 100*r;
			if (t<=bendDur) {
				return "M"+(-r)+","+points[0][1]+" A"+(R-(R-r)*1/bendDur*t)+","+(R-(R-r)*1/bendDur*t)+" 0 0,1 "+(r)+","+points[1][1];
			} else {
				return "M"+(-r+1/(1-bendDur)*r*(t-bendDur)-dx)+","+points[0][1]+" A"+(r-(r*(1-rCoefEnd))*(t-bendDur)/(1-bendDur))+","+(r-(r*(1-rCoefEnd))*(t-bendDur)/(1-bendDur))+" 0 1,1 "+(r-1/(1-bendDur)*r*(t-bendDur)+dx)+","+points[1][1];
			}
		}
		function circleToBar (points,t,ungripDur,rCoefStart,rCoefEnd) {
			rCoefStart = rCoefStart || 1;
			rCoefEnd = (rCoefEnd * 1/rCoefStart) || 1/rCoefStart;
			ungripDur = ungripDur || 0.5;
			var dx = 0.0001;
			var r = (points[1][0]-points[0][0])/2*rCoefStart;
			var R = 100*r;
			if (t<=ungripDur) {
				//return "M"+(-1/ungripDur*r*rCoefEnd*t+dx)+","+points[0][1]+" A"+(r-(r*(1-rCoefEnd))*t/(ungripDur))+","+(r-(r*(1-rCoefEnd))*t/(ungripDur))+" 0 1,1 "+(1/(ungripDur)*r*rCoefEnd*t-dx)+","+points[1][1];
				return "M"+(-1/ungripDur*r*rCoefEnd*t-dx)+","+points[0][1]+" A"+(r-(r*(1-rCoefEnd))*t/(ungripDur))+","+(r-(r*(1-rCoefEnd))*t/(ungripDur))+" 0 1,1 "+(1/(ungripDur)*r*rCoefEnd*t+dx)+","+points[1][1];
			} else {
				r *= rCoefEnd;
				R *= rCoefEnd;
				return "M"+(-r)+","+points[0][1]+" A"+(r+(R-r)*1/(1-ungripDur)*(t-ungripDur))+","+(r+(R-r)*1/(1-ungripDur)*(t-ungripDur))+" 0 0,1 "+(r)+","+points[1][1];
			}
		}
		function fillUp (points,t,height,_from_,rCoef) { 
			_from_ = _from_ || 0;
			rCoef = rCoef || 1;
			var totalHeight = (points[1][0]-points[0][0])*rCoef;
			var r = totalHeight/2;
			height *= t;
			var A = [-Math.sqrt(r*r-r*r*Math.pow((1-2*_from_),2)),-2*r*(1-_from_)];
			var B = [Math.sqrt(r*r-r*r*Math.pow((1-2*_from_),2)),-2*r*(1-_from_)];
			var D = [-Math.sqrt(r*r-r*r*Math.pow((1-2*_from_-2*height),2)),-2*r*(1-_from_-height)];
			var C = [Math.sqrt(r*r-r*r*Math.pow((1-2*_from_-2*height),2)),-2*r*(1-_from_-height)];
			return "M"+A.toString()+" L"+B.toString()+" A"+r+","+r+" 0 0,1 "+C.toString()+" L"+D.toString()+" A"+r+","+r+" 0 0,1 "+A.toString()+"Z";
		}
		function pitchfork (points,height,_from_,rCoef,vBaselineInR,hBaselineInR,tickLengthInR,lineHeight) {
			rCoef = rCoef || 1;
			var countR = 0;
			var countL = 0;
			var totalHeight = (points[1][0]-points[0][0])*rCoef;
			var r = totalHeight/2;
			var flip = -1;
			_from_ = _from_ || 0;
			vBaselineInR = vBaselineInR || -2;
			hBaselineInR = hBaselineInR || -1.6;
			tickLengthInR = tickLengthInR || 0.1;
			lineHeight = lineHeight || 0.1;
			this.from = function(u){if(u !== undefined){_from_ = u;return this;}else{return _from_;}};
			this.rCoef = function(u){if(u !== undefined){rCoef = u;return this;}else{return rCoef;}};
			this.points = function(u){if(u !== undefined){points = u;totalHeight = (points[1][0]-points[0][0])*rCoef;r = totalHeight/2;return this;}else{return points;}};
			this.vBase = function(u){if(u !== undefined){vBaselineInR = u;return this;}else{return vBaselineInR;}};
			this.hBase = function(u){if(u !== undefined){hBaselineInR = u;return this;}else{return hBaselineInR;}};
			this.tick = function(u){if(u !== undefined){tickLengthInR = u;return this;}else{return tickLengthInR;}};
			this.lineHeight = function(u){if(u !== undefined){lineHeight = u;return this;}else{return lineHeight;}};
			this.height =  function(u){if(u !== undefined){height = u;return this;}else{return height;}};
			this.from = function(u){if(u !== undefined){_from_ = u;return this;}else{return _from_;}};
			this.flip = function(){flip *= -1;return this;};
			this.lever = function(){flip === -1?countR++:countL++;return this;};
			this.reset = function(){flip = -1;countR = 0;countL=0;return this;}
			this.calculate = function() {
				var count = flip === -1?countR:countL;
				var horizontalDev = Math.sqrt(0.5*0.5-Math.pow((0.5-(_from_+height/2)),2))*0.8;//0.8 or any other coef is 'insidedness'
				var start = [2*r*horizontalDev*flip,-2*r*(1-height/2-_from_)];
				var joint = [r*hBaselineInR*flip,r*vBaselineInR+count*lineHeight*r];
				var end = [joint[0]+tickLengthInR*r*flip,joint[1]];
				return [start,joint,end];
			}
		}
		function labelLine (pitchfork,t,tickDur) {
			tickDur = tickDur || 0.1;
			var startJointDuration = 1 - tickDur;
			var start = pitchfork[0];
			var joint = pitchfork[1];
			var end = pitchfork[2];
			if(t<= startJointDuration) {
				return "M"+start.toString()+" L"+(start[0]+(joint[0]-start[0])*t/startJointDuration)+","+(start[1]+(joint[1]-start[1])*t/startJointDuration);
			} else {
				return "M"+start.toString()+" L"+joint.toString()+" L"+(joint[0]+(end[0]-joint[0])*(t-startJointDuration)/tickDur)+","+end[1];
			}
		}
		function labelText (selection,pitchfork,t,text,percentage,ty) {
			var length = text.length;
			var mapped = pitchfork.map(function(d,i){return [-d[0],-d[1]+ty]});
			selection.text(text.slice(0,Math.ceil(t*length))+": "+String(percentage*t).slice(0,4)+"%").attr("text-anchor",function(){if(mapped[2][0]<0){return "end";}else{return "start";}}).attr("x",mapped[2][0]).attr("y",mapped[2][1]);
		}
		function dashAnimateCircle(dataset,direction){
			
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
	window.lexiconDash = new lexiconDashF;
})();
<!--Lexicon-->
/*Copyright Ibrahim Tanyalcin 2014-2017
Free for academic use.*/