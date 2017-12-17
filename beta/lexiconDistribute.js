<!--Lexicon-->
/*Copyright Ibrahim Tanyalcin 2014-2017
Free for academic use.*/
(function (){
	function lexiconDistributeF () {
		var ID = ID || "lexicon_"+Math.round(Math.random()*100);
		var _seq_ = undefined;
		var _data_ = undefined;
		var _muts_ = {};
		var _values_ = [];
		var _valuesSorted_ = [];
		var _realMax_ = undefined;
		var _realMin_ = undefined;
		var _windowUnits_ = 32;
		var _markerIndex_ = undefined;
		var _labels_ = [];
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
		var barColors = ["Purple","Yellow"];//fill,stroke
		var barHighlights = ["LightPink","Blue"];//global,local
		var barOpacities = [0.5,0.75];//fill,stroke
		var _container_ = _container_ || document.body;
		var position = position || "relative"
		var top = top || "0px";
		var left = left || "0px";
		var offset = 0;
		var line = d3.svg.line();
		var cardinal = d3.svg.line().interpolate("cardinal-closed");
		var padding = 0.05*attrW;
		var onmouse = undefined;
		var _this_ = this;
		var maxZoom = 100;
		var submitF = function(){alert("no function was loaded..")}
		var _submitText = "Distribution";
		var _orientSubmit = "top";
		var _fontConstant_ = 1;
		//text fill, text stroke, shape fill, shape stroke , m.over text fill, m.over text stroke , m.over shape fill
		var _controllerColors_ = ["AntiqueWhite","AntiqueWhite","Red","Red","Red","Red","AntiqueWhite"];
		var _currentScaleX_ = 1;
		var _currentScaleY_ = 1;
		var _currentTranslateX_ = attrW*0.05;
		var _currentTranslateY_ = attrH*0.05;
		var map = undefined;
		var postit = undefined;
		var marker = undefined;
		var local = undefined;
		this.local = function(){return local};
		var fixedBin = undefined; //leave undefined if you want to be able to change binSize
		var axisVisibility = ["visible","visible"];
		var axisLabel = [undefined,undefined];
		this.lexID = function (u){if(arguments.length !== 0){ID=u; return this;}else{return ID;}}
		this.x = function (u){attrX=u; return this;}
		this.y = function (u){attrY=u; return this;}
		this.w = function (u){attrW=u; padding = 0.05*attrW; _currentTranslateX_ = attrW*0.05; return this;}
		this.h = function (u){attrH=u; _currentTranslateY_ = attrH*0.05; return this;}
		this.sW = function (u){styleW=u; return this;}
		this.sH = function (u){styleH=u; return this;}
		this.position = function (u){position=u; return this;}
		this.color = function(u){bColor=u;return this;}
		this.customColor = function(){for (var i = arguments.length-1, j = undefined;i>=0;--i){typeof arguments[i] === "function" ? (j = arguments[i].bind(this), j.lexiconColor = i, colorMode.unshift(j)) : void(0)}; return this;}
		this.opacity = function(u){bOpacity=u;return this;}
		this.barColors = function(u){barColors=u;return this;}
		this.barHighlights = function(u){barHighlights=u;return this;}
		this.barOpacities = function(u){barOpacities = u;return this;}
		this.container = function(u){_container_ = u;return this;}
		this.sTop = function(u){top = u; return this;}
		this.sLeft = function(u){left = u; return this;}
		this.sMargin = function(u){styleMargin = u; return this;}
		this.seq = function(u){if(arguments.length !== 0){_seq_ = u; _data_ = _seq_.split(""); _muts_ = {};return this;}else{return _seq_;}}
		this.offSet = function(u){offset=u; return this;}
		this.viewport = function(u){nElementsInView = u; return this;}
		this.zoom = function(u){maxZoom = u; return this;}
		this.submit = function(f){submitF = f.bind(_this_); return this;}
		this.submitOrient = function(u){_orientSubmit=u;return this;}
		this.submitText = function(u){if(arguments.length !== 0){_submitText=u;return this;}else{return _submitText;}}
		this.fontConstant = function(u){_fontConstant_ = u;return this;}
		this.values = function(u,w,m){if(arguments.length !== 0){_values_ = u.bind(_this_)(_data_,w); _realMax_ = d3.max(_values_); _realMin_ = d3.min(_values_) ;_values_ = _values_.map(function(d,i){return [d,i];}); /*_valuesSorted_ = _values_.slice().sort(function(a,b){return a[0]-b[0];}) ;*/_markerIndex_ = m;return this;}else{return {"default":_values_,"sorted":_valuesSorted_,"realMax":_realMax_,"realMin":_realMin_};}}
		this.labels = function(u,labels){if(arguments.length !== 0){_labels_ = u.bind(_this_)(_data_,_values_,labels); _labels_.forEach(function(d,i){_values_[i].push(d);}); return this;}else{ return _labels_;}}
		this.fixedBin = function(f){if(arguments.length === 0){return fixedBin;} fixedBin = f(_values_.length); if(fixedBin !== Math.floor(fixedBin)){console.log("WARNING:non-integer bin size")} return this;}
		var _objSync_ = [];
		this.sync = function(u){if(arguments.length !== 0){_objSync_ = u;return this;}else{return _objSync_;}}
		this._sync_ = function(issuer){
			if (this._sync_._busy) {
				return;
			}
			this._sync_._busy = true;
			window.requestAnimationFrame(function(){
				issuer = issuer === local ? _this_ : issuer; 
				var length = _objSync_.length; 
				for(var i =0;i<length;i++){
					if (
						_objSync_[i].local().on 
						&& (
							issuer === _this_ 
							|| (
								_objSync_[i]!==issuer 
								&& issuer.sync()
								.every(function(d){return d!==_objSync_[i];})
							)
						)
					){
						_objSync_[i].offSet(offset);
						_objSync_[i].viewport(nElementsInView);
						_objSync_[i].render(issuer);
					}
				}
				_this_._sync_._busy = false;
			})
		}
		this._sync_._busy = false;
		this.onmouse = function(f){if(arguments.length !== 0){onmouse = f.bind(this); return this;}else{return onmouse;}}
		this.isAppended = false;
		this.isRendered = false;
		this.colorControllers = function(u){_controllerColors_ = u;return this;}
		this.hideAxes = function(x,y){for(var i =0;i<2;++i){axisVisibility[i] = arguments[i] || arguments[i]===undefined?"hidden":"visible"}return this;}
		this.labelAxes = function(x,y){for(var i =0;i<2;++i){axisLabel[i] = typeof arguments[i] === "string" ? arguments[i] : undefined}return this;}
		this.append = function () {
			this.isAppended = true;
			_valuesSorted_ = this.sortValues();
			var coordinates = [0,0];
			d3.select(_container_).append("svg").attr("preserveAspectRatio","none").attr("id",ID).attr("viewBox",attrX+" "+attrY+" "+(attrX+attrW)+" "+(attrY+attrH)).style("width",styleW).style("height",styleH).style("padding","0px").style("display","block").style("position",position).style("top",top).style("left",left).style("overflow","hidden").style("line-height","normal").style("margin",styleMargin);
			d3.select("#"+ID).append("svg:rect").attr("id",function(){return ID+"_rect";}).attr("x",function(){return (attrX+attrW)/2;}).attr("y",function(){return (attrY+attrH)/2;}).attr("width",0).attr("height",0).attr("rx",15).attr("ry",15).attr("fill-opacity",bOpacity).attr("fill",bColor);
			warp(ID+"_rect",attrW,attrH);
		
			
			//***Defs***
			d3.select("#"+ID).append("svg:defs").attr("id",ID+"_extras");
			d3.select("#"+ID+"_extras").append("filter").attr("id",ID+"_buttonShadow").attr("primitiveUnits","objectBoundingBox").attr("x",-0.05).attr("y",-0.05).attr("width",1.25).attr("height",1.25);
			d3.select("#"+ID+"_buttonShadow").append("feOffset").attr("in","SourceAlpha").attr("dx",0.1).attr("dy",0.1).attr("result","offsetout");
			d3.select("#"+ID+"_buttonShadow").append("feGaussianBlur").attr("in","offsetout").attr("stdDeviation",0.0125).attr("result","blurout");
			d3.select("#"+ID+"_buttonShadow").append("feMerge").append("feMergeNode").attr("in","blurout");
			d3.select("#"+ID+"_buttonShadow>feMerge").append("feMergeNode").attr("in","SourceGraphic");
				//clippath for masterPort
			d3.select("#"+ID+"_extras").append("clipPath").attr("id",ID+"_clipper")
			.append("rect").attr("x",0.05*attrW).attr("y",0.05*attrH).attr("rx","1%").attr("ry","1%").attr("width",0.9*attrW).attr("height",0.9*attrH);
				//clippath for etiquete
			d3.select("#"+ID+"_extras").append("clipPath").attr("id",ID+"_clipperEtiquete")
			.append("rect").attr("x",-0.025*attrH*0.9).attr("y",-0.025*attrH*0.9).attr("rx","1%").attr("ry","1%").attr("width",0.9*(attrW*0.1+attrH*0.05)).attr("height",0.9*0.05*attrH);
			//***Defs***
			
			//test feOffset
			//--->d3.select("#"+ID).append("polygon").attr("points","100,400 500,400 300,100").attr("fill","red").attr("fill-opacity",0.6).attr("stroke","pink").attr("stroke-width",5).attr("stroke-linejoin","round").attr("filter",function(){return "url(#"+ID+"_buttonShadow)";});
			
			recalibrate();
			//postit = new postIt; //i can afford to place the postit at upper layer as it relocates
			addViewPort();
			map = new addMap;
			postit = new postIt;
			if (_markerIndex_ !== undefined) {
				marker = new markerObj;
			}
			local = new addLocal;
			addMode();
			addColor();
			addBin();
			addZoom();
			addCurve();
			addCameraControl();
			this.AUC = new AUC;
			this.AUC.init();
			
			//SUBMIT SEQUENCE
			d3.select("#"+ID).append("text").text(_submitText).attr("id",ID+"_submit_text").attr("class","global_submit_texts").style("cursor","pointer").attr("x",attrX+attrW/2).attr("dx",0).attr("y",function(){if(_orientSubmit!=="bottom"){return attrY+padding*_fontConstant_;}else{return attrY+attrH-2;}}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[4]).attr("fill-opacity",0.75).attr("stroke",_controllerColors_[5]).attr("stroke-width",1)
			.on("mouseover",function(d,i){d3.select(this).transition().attr("fill-opacity",0.9).attr("stroke-width",2).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select(this).transition().attr("fill-opacity",0.75).attr("stroke-width",1).delay(0).duration(250);})
			.on("click",function(d,i){
				submitF(_seq_,_data_,_muts_);
			});
		
			return this;
		}

		//render related variables and the main function
		var nElementsInView = 30;
		//resusable arrays for AA reference
		var aaSymbols = {Nonpolar:"Gray",Polar:"DeepPink",Positive:"Red",Negative:"Blue",Aromatic:"Green",Stop:"Orange"};
		var aminoacidsX = {"A":["Alanine","Nonpolar"],"R":["Arginine","Positive"],"N":["Asparagine","Polar"],"D":["Aspartic-Acid","Negative"],"C":["Cysteine","Polar"],"Q":["Glutamine","Polar"],"E":["Glutamic-Acid","Negative"],"G":["Glycine","Nonpolar"],"H":["Histidine","Positive"],"I":["Isoleucine","Nonpolar"],"L":["Leucine","Nonpolar"],"K":["Lysine","Positive"],"M":["Methionine","Nonpolar"],"F":["Phenylalanine","Aromatic"],"P":["Proline","Nonpolar"],"S":["Serine","Polar"],"T":["Threonine","Polar"],"W":["Tryptophan","Aromatic"],"Y":["Tyrosine","Aromatic"],"V":["Valine","Nonpolar"],"X":["Stop","Stop"]};
		var aminoacids_OtherProperties = {"A":["Hydrophobic","Aliphatic"],"R":["Hydrophilic","H-bonding","Basic","Ionizable"],"N":["Hydrophilic"],"D":["Hydrophilic","H-bonding","Acidic","Ionizable"],"C":["Hydrophilic","H-bonding","Sulfur-containing","Acidic","Ionizable","Disulfide-bond"],"Q":["Hydrophilic","H-bonding"],"E":["Hydrophilic","H-bonding","Acidic","Ionizable"],"G":["Hydrophobic","Aliphatic"],"H":["Hydrophilic","H-bonding","Basic","Ionizable","All-aromatic"],"I":["Hydrophobic","Aliphatic"],"L":["Hydrophobic","Aliphatic"],"K":["Hydrophilic","H-bonding","Basic","Ionizable"],"M":["Hydrophobic","Sulfur-containing"],"F":["Hydrophobic","All-aromatic"],"P":["Hydrophobic","Aliphatic","Cyclic"],"S":["Hydrophilic","H-bonding"],"T":["Hydrophilic","H-bonding"],"W":["Hydrophobic","H-bonding","All-aromatic"],"Y":["Hydrophobic","H-bonding","Ionizable","All-aromatic"],"V":["Hydrophobic","Aliphatic"]};
		
	
		//***Below will be recalibrated by the recalibrate function once append is called***
		var gWidth = 0.9*attrW;
		var gHeight = 0.9*attrH;
		var gOffsetX = 0.1*gWidth;
		var gOffsetY = 0.1*gHeight;
		var renderingWidth = 0.8*gWidth;
		var renderingHeight = 0.8*gHeight;
		//***Above will be recalibrated by the recalibrate function once append is called***
		//##############################################################SCALE###################################################################################
		var scaleMainBot;
		var axisMainBot;
		var scaleMainLeft;
		var axisMainLeft;
		var axisMainLeftGroup;
		//##############################################################SCALE###################################################################################
		this.render = function (issuer) {
			issuer = issuer===undefined?_this_:issuer;
			if (this.isRendered === false) {
				_this_.changeWindow(1);
				_this_.isRendered = true;
			}
			
			//offset = Math.min(Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView),Math.max(0,offset)); not needed checked within the local
			if (local.on === true) {
				if(issuer !== local) {
					local.updateIndicator(true);
				}
				//update controllers
				this._sync_(issuer);
			}
		}
		
		this.changeWindow = function (coef) {
			if(this.AUC.isOn === true){
				this.AUC.turnoff();
			}
			_windowUnits_ = fixedBin || Math.max(4,Math.min(256,_windowUnits_*coef));
			var viewport = d3.select("#"+ID+"_viewPort");
			var data = this.formatValues(_valuesSorted_,_windowUnits_);
			var barWidth = renderingWidth/_windowUnits_;
			var length = _valuesSorted_.length;
			var rgb = d3.interpolateRgb("Blue","Red");
			
			//################SCALE###################
			viewport.transition("adjustScal").tween("adjustScale",function(){
				var interpolator = d3.interpolateArray(scaleMainLeft.domain(),[0,data.maxFrequency/100]);
				return function(t){
					scaleMainLeft.domain(interpolator(t));
					axisMainLeftGroup.call(axisMainLeft);
				}
			}).delay(0).duration(1000);
			//################SCALE###################
			
			
			var distElements = viewport.selectAll("."+ID+"_lexDistElements").data(data);
			distElements
			.enter()
			.append("rect")
			.attr("x",function(d,i){return gOffsetX+i*barWidth;})
			.attr("y",function(d,i){return gOffsetY+(1-d.frequency/data.maxFrequency)*renderingHeight;})
			.attr("width",0)
			.attr("height",function(d,i){return d.frequency/data.maxFrequency*renderingHeight;})
			.attr("fill",returnColor)
			.attr("fill-opacity",barOpacities[0])
			.attr("stroke-width",0)
			.attr("stroke",barColors[1])
			.attr("stroke-opacity",barOpacities[1])
			.attr("stroke-linejoin","round")
			.attr("class",ID+"_lexDistElements")
			.attr("id",function(d,i){return ID+"_lexDistElement"+i})
			.on("mouseover",function(d,i){
				coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
				postit.relocate(coordinates[0],coordinates[1],d);
				d3.select(this).transition("focus").attr("fill",barHighlights[0]).delay(0).duration(350);
				onmouse ? onmouse(d3.event,d,i,"bar") : void(0);
			})
			.on("mouseout",function(d,i){
				postit.fade();
				d3.select(this).transition("focus").attr("fill",returnColor).delay(100).duration(350);
				onmouse ? onmouse(d3.event,d,i,"bar") : void(0);
			})
			.transition("changeWindow")
			.attr("width",barWidth)
			.delay(0)
			.duration(1000);
			
			distElements
			.exit()
			.transition("changeWindow")
			.each("end",function(){d3.select(this).remove();})
			.attr("width",0)
			.delay(0)
			.duration(1000);
			
			distElements
			.attr("id",function(d,i){return ID+"_lexDistElement"+i})
			.on("mouseover",function(d,i){
				coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
				postit.relocate(coordinates[0],coordinates[1],d);
				d3.select(this).transition("focus").attr("fill",barHighlights[0]).delay(0).duration(350);
				onmouse ? onmouse(d3.event,d,i,"bar") : void(0);
			})
			.on("mouseout",function(d,i){
				postit.fade();
				d3.select(this).transition("focus").attr("fill",returnColor).delay(100).duration(350);
				onmouse ? onmouse(d3.event,d,i,"bar") : void(0);
			})
			.transition("changeWindow")
			.attr("x",function(d,i){return gOffsetX+i*barWidth;})
			.attr("y",function(d,i){return gOffsetY+(1-d.frequency/data.maxFrequency)*renderingHeight;})
			.attr("width",barWidth)
			.attr("height",function(d,i){return d.frequency/data.maxFrequency*renderingHeight;})
			.attr("fill",returnColor)
			.delay(0)
			.duration(1000);
		
			function returnColor(dd,ii){ //must pass array--> dd.children
				if(colorMode[0]==="default") {
					return barColors[0];
				} else if (colorMode[0]==="index") {
					return rgb(_this_.calculateAvgIndex(dd.children)/length);
				}
				if(typeof colorMode[0]==="function") {
					var prop = "lexiconColor"+colorMode[0].lexiconColor;
					return this[prop] ? this[prop] : this[prop] = colorMode[0](dd);
				}
			}
		}
		var renderMode = ["Bar","Singleton"];
		this.changeMode = function () {
			if(renderMode[0] === "Singleton") {
				this.switchBar(1);
				return;
			}
			this.showSingletons();
			var x = renderMode.shift();
			renderMode.push(x);
		}
		
		this.showSingletons = function() {
			if(this.AUC.isOn === true){
				this.AUC.turnoff();
			}
			var viewport = d3.select("#"+ID+"_viewPort");
			var data = this.formatValues(_valuesSorted_,_windowUnits_);
			var barWidth = renderingWidth/_windowUnits_;
			var length = _valuesSorted_.length;
			var rgb = d3.interpolateRgb("Blue","Red");
			
			viewport.selectAll("."+ID+"_lexDistElements")
			.data(data)
			.transition("changeWindow")
			.each("end",function(d,i){d3.select(this).remove();})
			.attr("width",0)
			.delay(0)
			.duration(1000);
			
			viewport.selectAll("."+ID+"_lexDistGroups").remove();
			viewport.selectAll("singletonGroups")
			.data(data)
			.enter()
			.append("g")
			.attr("class",ID+"_lexDistGroups")
			.each(function(d,i){
				addSingletons(d.children,d,i,this);
			})
			
			function addSingletons(children,d,i,container){ // d and i are the parent d,i which is the g element
				var length = children.length;
				var elemWidth = barWidth*0.9;
				var elemBoundingBoxHeight = (d.frequency/data.maxFrequency*renderingHeight)/length;
				var elemHeight = 0.9*elemBoundingBoxHeight;
				var xPadding = barWidth*0.05;
				var yPadding = elemBoundingBoxHeight*0.05;
				
				d3.select(container).selectAll("singletons")
				.data(children)
				.enter()
				.append("rect")
				.attr("x",function(dd,ii){return gOffsetX+i*barWidth+xPadding;})
				.attr("y",function(dd,ii){return gOffsetY+renderingHeight-(ii+1)*elemBoundingBoxHeight+yPadding;})
				.attr("width",0)
				.attr("height",elemHeight)
				.attr("fill",returnColor)
				.attr("fill-opacity",barOpacities[0])
				.attr("stroke-width",0)
				.attr("stroke",barColors[1])
				.attr("stroke-opacity",barOpacities[1])
				.attr("stroke-linejoin","round")
				.attr("class",ID+"_lexDistSingletons")
				.attr("id",function(dd,ii){return ID+"_lexSingletonElement"+dd[1]})
				.on("mouseover",function(dd,ii){
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					postit.relocate(coordinates[0],coordinates[1],dd,"singleton");
					d3.select(this).transition("focus").attr("fill",barHighlights[0]).delay(0).duration(350);
				})
				.on("mouseout",function(dd,ii){
					postit.fade();
					d3.select(this).transition("focus").attr("fill",returnColor).delay(100).duration(350);
				})
				.transition("changeMode")
				.attr("width",elemWidth)
				.delay(0)
				.duration(1000);
			}
			function returnColor(dd,ii){ //real index--> dd[1]
				if(colorMode[0]==="default") {
					return barColors[0];
				} else if (colorMode[0]==="index") {
					return rgb(dd[1]/length);
				}
				if(typeof colorMode[0]==="function") {
					var prop = "lexiconColor"+colorMode[0].lexiconColor;
					return this[prop] ? this[prop] : this[prop] = colorMode[0](dd);
				}
			}
		}
		var colorMode = ["default","index"];
		this.changeColor = function () {
			var x = colorMode.shift();
			colorMode.push(x);
			if(renderMode[0] === "Singleton") {
				_this_.showSingletons();
			} else {
				_this_.changeWindow(1);
			}
		}
		this.calculateMaxAvgIndex = function(formattedValues) {//it is a heavy computation for repetitive task, probably wont use it but keep it anyway
			var avgs = [];
			var length = formattedValues.length;
			for (var j=length-1;j>=0;--j) {
				avgs.push(this.calculateAvgIndex(formattedValues[j].children));
			}
			return d3.max(avgs);
		}
		this.calculateAvgIndex = function(arr){
			if(arr.length === 0) {
				return 0;
			}
			var avg = 0;
			var length = arr.length;
			for (var i=length-1;i>=0;--i) {
				avg += arr[i][1];
			}
			return avg/length;
		}
		this.switchBar = function (coef) { //usefull when someone clicks a button that is not mode but transitions bar elements. One is invoked inside changeMode, 2 others are in the bin << and >> buttons.
			d3.selectAll("."+ID+"_lexDistSingletons")
			.transition("changeMode")
			.each("end",function(){d3.select(this).remove();})
			.attr("width",0)
			.delay(0)
			.duration(1000);
			this.changeWindow(coef);
			local.on === true ? local.turnOff() : false;
			var x = renderMode.shift();
			renderMode.push(x);
		}
		
		this.smoothRender = function (count,_offset_,delay,duration) {
			if(local.on === true) {
				d3.select("#"+ID).transition("smoothRender").tween("smoothRender",function(){var interpolator = d3.interpolate(nElementsInView,count); var interpolatorOffSet = d3.interpolate(offset,_offset_); return function(t){nElementsInView = interpolator(t); offset = interpolatorOffSet(t); _this_.render();}}).delay(delay).duration(duration);
			}
		}
		
		//###############################################################INVOKED WITHIN APPEND###############################################################
		//Add mode
		function addMode() {
			//mode
			d3.select("#"+ID).append("text").text("[mode]").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
			.on("click",function(){_this_.changeMode();});
		}
		//Add color 
		function addColor() {
			//color
			d3.select("#"+ID).append("text").text("[color]").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.1}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
			.on("click",function(){_this_.changeColor();});
		}
		//Add bin
		function addBin() {
			//bin
			d3.select("#"+ID).append("text").text("bin:").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.185}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer");
				//half the bin size
			d3.select("#"+ID).append("g").attr("id",ID+"_lexBinHalf").style("cursor","pointer").attr("class","global_lexPlotControls")
			.on("mouseover",function(){
				d3.select("#"+ID+"_lexBinHalf_circle").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+"_lexBinHalf_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_lexBinHalf_circle").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+"_lexBinHalf_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(){
				if(renderMode[0] === "Singleton") {
					_this_.switchBar(1);
					return;
				}
				_this_.changeWindow(2);
			});
			d3.select("#"+ID+"_lexBinHalf").append("circle").attr("id",ID+"_lexBinHalf_circle").attr("cx",function(){return attrX+padding+attrW*0.225;}).attr("cy",function(){return attrY+(padding-attrW/160)*_fontConstant_;}).attr("r",attrW/120*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexBinHalf").append("text").text("<<").attr("id",ID+"_lexBinHalf_text").attr("x",function(){return attrX+padding+attrW*0.225;}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",-attrW/400*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/60*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1); 
				//double the bin size
			d3.select("#"+ID).append("g").attr("id",ID+"_lexBinDouble").style("cursor","pointer").attr("class","global_lexPlotControls")
			.on("mouseover",function(){
				d3.select("#"+ID+"_lexBinDouble_circle").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+"_lexBinDouble_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_lexBinDouble_circle").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+"_lexBinDouble_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(){
				if(renderMode[0] === "Singleton") {
					_this_.switchBar(1);
					return;
				}
				_this_.changeWindow(1/2);
			});
			d3.select("#"+ID+"_lexBinDouble").append("circle").attr("id",ID+"_lexBinDouble_circle").attr("cx",function(){return attrX+padding+attrW*0.250;}).attr("cy",function(){return attrY+(padding-attrW/160)*_fontConstant_;}).attr("r",attrW/120*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexBinDouble").append("text").text(">>").attr("id",ID+"_lexBinDouble_text").attr("x",function(){return attrX+padding+attrW*0.250;}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",-attrW/400*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/60*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1); 
		}
		function addZoom(){
			//zoom
			d3.select("#"+ID).append("text").text("zoom :").attr("x",attrX+attrW*0.81).attr("dx",0).attr("y",attrY+padding*_fontConstant_).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","default");
			d3.select("#"+ID).selectAll("zoomElems")
			.data([{id:"_lexZoomX",text:"X",clss:"global_lexZoomin_groups"},{id:"_lexZoomY",text:"Y",clss:"global_lexZoomin_groups"},{id:"_lexZoomXY",text:"XY",clss:"global_lexZoomin_groups"},{id:"_lexZoomoutX",text:"x",clss:"global_lexZoomout_groups"},{id:"_lexZoomoutY",text:"y",clss:"global_lexZoomout_groups"},{id:"_lexZoomoutXY",text:"xy",clss:"global_lexZoomout_groups"}])
			.enter()
			.append("g")
			.attr("id",function(d,i){return ID+d.id})
			.style("cursor","pointer")
			.attr("class",function(d,i){return d.clss})
			.on("mouseover",function(d,i){
				d3.select("#"+ID+d.id+"_rect").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+d.id+"_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(d,i){
				d3.select("#"+ID+d.id+"_rect").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+d.id+"_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(d,i){
				//_this_.smoothRender(Math.max(5,nElementsInView/2),offset,0,1000);
				var viewport = d3.select("#"+ID+"_viewPort");
				switch (d.text) {
					case "X":
						viewport.transition("enlargeX").tween("enlargeX",function(){
							var newScaleX = Math.min(_currentScaleX_*1.1,10);
							var interpolateScale = d3.interpolate(_currentScaleX_,newScaleX);
							//var newTranslateX = _currentTranslateX_ - (0.5*attrW - _currentTranslateX_)*(newScaleX-_1) ;
							//var newTranslateX = _currentTranslateX_ - (0.5*attrW - _currentTranslateX_)*(newScaleX-_currentScaleX_) ;
							//var newTranslateX = -_currentTranslateX_ - (0.5*attrW)*(newScaleX-1);
							var newTranslateX = _currentTranslateX_ - (0.45*attrW)*(newScaleX-_currentScaleX_);
							var interpolateTranslate = d3.interpolate(_currentTranslateX_,newTranslateX);
							return function(t){
								_currentScaleX_ = interpolateScale(t);
								_currentTranslateX_ = interpolateTranslate(t);
								//_currentTranslateX_ = Math.min(0.05*attrW,Math.max(0.95*attrW-_currentScaleX_*0.9*attrW,interpolateTranslate(t)));
								viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
								map.relocate();
								//console.log(viewport);
							}
						}).delay(0).duration(500);
						break;
					case "x":
						viewport.transition("enlargeX").tween("enlargeX",function(){
							var newScaleX = Math.max(_currentScaleX_/1.1,1);
							var interpolateScale = d3.interpolate(_currentScaleX_,newScaleX);
							var newTranslateX = _currentTranslateX_ - (0.45*attrW)*(newScaleX-_currentScaleX_);
							var interpolateTranslate = d3.interpolate(_currentTranslateX_,newTranslateX);
							return function(t){
								_currentScaleX_ = interpolateScale(t);
								_currentTranslateX_ = Math.min(0.05*attrW,Math.max(0.95*attrW-_currentScaleX_*0.9*attrW,interpolateTranslate(t)));
								viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
								map.relocate();
							}
						}).delay(0).duration(500);
						break;
					case "Y":
						viewport.transition("enlargeY").tween("enlargeY",function(){
							var newScaleY = Math.min(_currentScaleY_*1.1,10);
							var interpolateScale = d3.interpolate(_currentScaleY_,newScaleY);
							var newTranslateY = _currentTranslateY_ - (0.45*attrH)*(newScaleY-_currentScaleY_);
							var interpolateTranslate = d3.interpolate(_currentTranslateY_,newTranslateY);
							return function(t){
								_currentScaleY_ = interpolateScale(t);
								_currentTranslateY_ = interpolateTranslate(t);
								viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
								map.relocate();
							}
						}).delay(0).duration(500);
						break;
					case "y":
						viewport.transition("enlargeY").tween("enlargeY",function(){
							var newScaleY = Math.max(_currentScaleY_/1.1,1);
							var interpolateScale = d3.interpolate(_currentScaleY_,newScaleY);
							var newTranslateY = _currentTranslateY_ - (0.45*attrH)*(newScaleY-_currentScaleY_);
							var interpolateTranslate = d3.interpolate(_currentTranslateY_,newTranslateY);
							return function(t){
								_currentScaleY_ = interpolateScale(t);
								_currentTranslateY_ = Math.min(0.05*attrH,Math.max(0.95*attrH-_currentScaleY_*0.9*attrH,interpolateTranslate(t)));
								viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
								map.relocate();
							}
						}).delay(0).duration(500);
						break;
					case "XY":
						viewport.transition("enlargeXY").tween("enlargeXY",function(){
							//X
							var newScaleX = Math.min(_currentScaleX_*1.1,10);
							var interpolateScaleX = d3.interpolate(_currentScaleX_,newScaleX);
							var newTranslateX = _currentTranslateX_ - (0.45*attrW)*(newScaleX-_currentScaleX_);
							var interpolateTranslateX = d3.interpolate(_currentTranslateX_,newTranslateX);
							//Y
							var newScaleY = Math.min(_currentScaleY_*1.1,10);
							var interpolateScaleY = d3.interpolate(_currentScaleY_,newScaleY);
							var newTranslateY = _currentTranslateY_ - (0.45*attrH)*(newScaleY-_currentScaleY_);
							var interpolateTranslateY = d3.interpolate(_currentTranslateY_,newTranslateY);
							return function(t){
								_currentScaleX_ = interpolateScaleX(t);
								_currentTranslateX_ = interpolateTranslateX(t);
								_currentScaleY_ = interpolateScaleY(t);
								_currentTranslateY_ = interpolateTranslateY(t);
								viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
								map.relocate();
							}
						}).delay(0).duration(500);
						break;
					case "xy":
						viewport.transition("enlargeXY").tween("enlargeXY",function(){
							//X
							var newScaleX = Math.max(_currentScaleX_/1.1,1);
							var interpolateScaleX = d3.interpolate(_currentScaleX_,newScaleX);
							var newTranslateX = _currentTranslateX_ - (0.45*attrW)*(newScaleX-_currentScaleX_);
							var interpolateTranslateX = d3.interpolate(_currentTranslateX_,newTranslateX);
							//Y
							var newScaleY = Math.max(_currentScaleY_/1.1,1);
							var interpolateScaleY = d3.interpolate(_currentScaleY_,newScaleY);
							var newTranslateY = _currentTranslateY_ - (0.45*attrH)*(newScaleY-_currentScaleY_);
							var interpolateTranslateY = d3.interpolate(_currentTranslateY_,newTranslateY);
							return function(t){
								_currentScaleX_ = interpolateScaleX(t);
								_currentTranslateX_ = Math.min(0.05*attrW,Math.max(0.95*attrW-_currentScaleX_*0.9*attrW,interpolateTranslateX(t)));
								_currentScaleY_ = interpolateScaleY(t);
								_currentTranslateY_ = Math.min(0.05*attrH,Math.max(0.95*attrH-_currentScaleY_*0.9*attrH,interpolateTranslateY(t)));
								viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
								map.relocate();
							}
						}).delay(0).duration(500);
						break;
				}
			})
			.each(function(d,i){
				d3.select(this).append("rect").attr("id",ID+d.id+"_rect").attr("x",function(){return attrX+attrW*0.85+(i%3)*attrW/40*_fontConstant_}).attr("y",function(){return i<=2?attrY+(padding-attrW/40)*_fontConstant_:attrY+padding*_fontConstant_}).attr("width",attrW/45*_fontConstant_).attr("height",attrW/45*_fontConstant_).attr("rx","0.5%").attr("ry","0.5%").attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
				d3.select(this).append("text").text(function(){return d.text}).attr("id",ID+d.id+"_text").attr("x",attrX+attrW*0.85+(i%3)*attrW/40*_fontConstant_).attr("dx",attrW/45*_fontConstant_/2).attr("y",function(){return i<=2?attrY+padding*_fontConstant_:attrY+(padding+attrW/40)*_fontConstant_}).attr("dy",-attrW/120*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/60*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1);
			});
		}
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
				if (_this_.AUC.isOn === false) {
					_this_.AUC.turnon().drawCurve();
				} else {
					_this_.AUC.turnoff();
				}
			})
			.append("rect").attr("x",attrX+attrW*0.65).attr("y",attrY+(padding-attrW/35)*_fontConstant_).attr("rx","0.5%").attr("ry","0.5%").attr("width",attrW/20*_fontConstant_).attr("height",attrW/20*_fontConstant_).attr("stroke",_controllerColors_[4]).attr("fill-opacity",0).attr("stroke-width",0);
			d3.select("#"+ID+"_drawCurve").append("svg:image").attr("xlink:href","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAB2CAYAAABrndWaAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJOgAACToB8GSSSgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAfDSURBVHic7Z17jFxVGcB/352ZfUxnuo/ultlS3KTLupakWsSAFcFoo7SGoLFaqFWDkT+AElwR1/iKjyrGQIAQwQBWEMUiFEl5VG1ZoYUiRZG20pJFCivaTep2F7ftbpvu3vP5x5mtS7Pbu4+5cx8zv2QyyZx7z/fll3vuPefce+5AmbehkDHQqXBe0LmEEhfucUFduC3oXELHCKzIy9mrkA46n1ChMN+FPheOKSwOOp9QoeAY6MwfPV8NOp/Q4cI3XFADmxWcsWUSVFJhQaHVwN97KiuP3drSsmZvNts7tjwZVGJhQeFnQOX9Z5xx/55s9psnlzvj7FMyjMAqhaUKz26dM2fHeNuUrCCFrMCNwEgC1hgRHW+7khVk4AfA6cDNArsn2q4kBSksAtYA/3Zg7am2LUlBLvwUSCm0Cxw51bYldxUbgeUCFwo8lYCHvbYvqSNIQQR+CCDwrcnsU1KCXFgJvFdgo8CfJ7NPyQhSSAh8FzD570lRMkONEbhC4O5Hcrln7m5u7htbJiLDCltEtf3k/UriJK1QaeA7wPAf5s7tFNvU/l+uOozIlvH2LYkm5sIXgHcAv/hXdfXBqewbe0EKjsBXANexQ4spEXtBLnwSWAg8JLBvqvvHXhBwPYADN01n51gLUviQwBKBJwVenE4dcRf0NQB3GueeUWIrSOEshY8Du5Iw7iV8MsRWkIGrAFG4RWDcybDJEEtBChls36cvAb+dSV2xFGTg88BsYJ3AsZnUFdehxpVbGhv1rubm85cnEptHfzQwCDw5lYpiJ0jhAgPv7qmq2juUSNQBdaNlAkemejKKXRMzcDXAq+n0c4WoL1aCFBqATwHdu2tqXilEnbESZGA1UAGsMzO4tI8lVoKAywHjwH2FqjA2ghTOBhYLdAq8Wah6YyPIwBfz3/cUst5YCFJ73lkFDCRgYyHrjoUgFy7BXsHWCwwVsu5YCHLsuAsH7vWh7mijUKdwEXY69YVC1x95QcbewqkAfj2TaY2JiLwgtSdnHHjQj/ojLUhhnsAFwIsCe/2IEWlB+aGFA/zGrxhRn+5Y1Z1OmxtbWg5flE6vOPGr6owmycYSWUEK7zJwdmdDw77udLr9bU9hiPSj+rtCxIlsEzPwWYCe6uqdfsaJrCDgMuD4nkxmj59BIilI4f1Aq8CmQ6lUQYcWJxNJQSbf9zGw3u9YkROkkMD2ng8n4HG/40VO0AgsBXLAI4UeuY9H5AQ5sAJA4YEixYsO+cVul2AnxjqLETNSgoAl2Oa1SeB4MQJGSpCBTwAoPFqsmJERlL96rQKOJmBTseJGRpALy4D5wAaBQ8WKGxlBDnwp/72uyHHDj0JO4WLgNWBbMWNHQpCBa4EUcKcf886nIvTzQQqzDVzVlc0e+VFr68DyiorVJwpFBo366yv0goxdW1q78bTTtvalUu2MEaKqBxD5o5/xQ93EFLJAO3D0pZqa54PIIdSCjH0QfC5wx0AyORhEDqEVpDAPuA54y4EbgsojtIKMXc8+C1gr0B9UHqEUpPBB7NNi+xy4PchcQicov3zyTuxLj64u1qh9IkInKL+29Czg3hRs9treb0IlSOF9QAdwwAnJq7JC01HM95gfeK6+PrWhqenZrkzm+mX5MkfkoOtzj3kiQiPI2DdBtWyvq/tLVyazELvO1JYZ8yYiBXlyfqqEoom5cCX2VvLO7fX1RZlrniyBCxqGj2DfennIgUuHHWck6JzGEqgghTYHNgCOwmqBV4PMZzwCOwcpNBp7Z7QOuCZZhLuk0yGQI0ih3tiFtmcCtyUC7i2fiqILUpjtwu+B9wg85NgBaWgpahNTqHHhCYFzb16woOtPDQ0LVeSl0f4OIq+h6uvzPlOlaEeQQpOBpwXOF3h8a0PDEyriYO932Y9qolj5TJaiCFJYYOzdiMUCDwt8ZkTELUbsmeK7IIULDTyPPSHfIrBypku1i4mvgly41thl2HOAjgRcJ2D8jFlofDlJK6TzczqfeyyXG3qssfGp/dXVbcvg5wA4TjcBDT6nSsEFKZxn4JdAG7D7wXnz/tafSp2Lva+e30hrgDcKHdsPCtbEFCpcuMHAduCdwF0OfOCtVGqgUDGCoCBH0DAs7Uulbj/uOG1G5MA/Zs36+tq2tqczrpspRP1BMiNBCs0KNyl8ev38+eyorR3oT6X+a0Q6Kly3Y1hkJ6q93jWFl2kJUsgZ6DB2Hqca2LWrpqb7YEVFa2HTC54pnYMUTnfhVgOvY1+9dwS4xoFz9ldV9fiSYcBM6ghSOMfAlw1ctq2+PrW/unpwf1VV5466umeGEoksqivj+s7TCQXl/05hBXC5sZdsgNcfzeX+05XN1hpoYvSVnyIvAEd9zzYATjQxtW/oXuLC913Ybezs3o+BMwU2GljuQOsrmczLJmK94ZmQdOHbAh82dgXN6B/+uD9pbe15OZMZPpxM9h93nBzwPRH5GKZk3AD2CLpU7cR5L/ArhSscaNpWX9/ZX1ExOOw4lWL/YiGL6qyA8y06yTWLFv21t7LyjaFEYgi7/vyjQG3AeYWG5D/T6WqFlrE/ikhvVAaTfhP4fbGwUxbkQVmQB2VBHpQFeVAW5EFZkAdlQR6UBXlQFuRBWZAHZUEelAV5UBbkQVmQB2VBHpQFeVAW5EFZkAf/A6jfC9M9Md2HAAAAAElFTkSuQmCC")
			.attr("title","draw curve").attr("alt","f(x)").attr("x",attrX+attrW*0.65).attr("y",attrY+(padding-attrW/35)*_fontConstant_).attr("width",attrW/20*_fontConstant_).attr("height",attrW/20*_fontConstant_).attr("opacity",0.75);
		}
		function addCameraControl(){
			//cameraControl
			d3.select("#"+ID).append("g").attr("id",function(){return ID+"_navigate"}).style("cursor","pointer").attr("transform","translate("+attrW/10+","+attrW/6+") scale(0.75,0.75)").style("opacity",0)
			.on("mouseover",function(){
				d3.select(this).transition("fadein").style("opacity",1).delay(0).duration(500);
				d3.select("#"+ID+"_navigate>path").transition("fadein").attr("stroke-width",3).delay(0).duration(500);
			})
			.on("mouseout",function(){
				d3.select(this).transition("fadeout").style("opacity",0).delay(0).duration(500);
				d3.select("#"+ID+"_navigate>path").transition("fadeout").attr("stroke-width",0).delay(0).duration(500);
			})
			.on("mousemove",function(){
				d3.select(this).transition("fadein").style("opacity",1).delay(0).duration(500);
				d3.select("#"+ID+"_navigate>path").transition("fadein").attr("stroke-width",3).delay(0).duration(500);
			})
			.append("path").attr("d",function(){var points = [[attrW/30,-attrW/10],[attrW/30,-attrW/30],[attrW/10,-attrW/30],[attrW/10,attrW/30],[attrW/30,attrW/30],[attrW/30,attrW/10],[-attrW/30,attrW/10],[-attrW/30,attrW/30],[-attrW/10,attrW/30],[-attrW/10,-attrW/30],[-attrW/30,-attrW/30],[-attrW/30,-attrW/10]];return cardinal(points);})
			.attr("stroke",_controllerColors_[4])
			.attr("stroke-opacity",0.75)
			.attr("stroke-width",0)
			.attr("fill-opacity",0);
			d3.select("#"+ID+"_navigate").selectAll("navigateElements")
			.data([{translate:[0,-attrW/15],rotate:0,direction:"up"},{translate:[attrW/15,0],rotate:90,direction:"right"},{translate:[0,attrW/15],rotate:180,direction:"down"},{translate:[-attrW/15,0],rotate:270,direction:"left"}])
			.enter()
			.append("polygon")
			.attr("points",[[-attrW/60,0],[0,-attrW/60],[attrW/60,0]])
			.attr("transform",function(d,i){return "translate("+d.translate+") rotate("+d.rotate+")"})
			.attr("stroke",_controllerColors_[1])
			.attr("stroke-width",3)
			.attr("fill",_controllerColors_[1])
			.attr("fill-opacity",0.75)
			.attr("stroke-linejoin","round")
			.attr("filter",function(){return "url(#"+ID+"_buttonShadow)";})
			.on("mouseout",function(d,i){
				d3.select(this).attr("filter",function(){return "url(#"+ID+"_buttonShadow)";});
			})
			.on("mouseup",function(d,i){
				d3.select(this).attr("filter",function(){return "url(#"+ID+"_buttonShadow)";});
			})
			.on("mousedown",function(d,i){
				d3.select(this).attr("filter",null);
			})
			.on("click",function(d,i){
				var viewport = d3.select("#"+ID+"_viewPort");
				var stepCount = 20;//the amount of equidistant intervals which the translate will be incremented
				switch (d.direction) {
					case "up":
						var step = _currentScaleY_*0.9*attrH/stepCount;
						_currentTranslateY_ = Math.min(0.05*attrH,Math.max(0.95*attrH-_currentScaleY_*0.9*attrH,_currentTranslateY_+step));
						viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
						map.relocate();
						break;
					case "right":
						var step = _currentScaleX_*0.9*attrW/stepCount;
						_currentTranslateX_ = Math.min(0.05*attrW,Math.max(0.95*attrW-_currentScaleX_*0.9*attrW,_currentTranslateX_-step));
						viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
						map.relocate();
						break;
					case "down":
						var step = _currentScaleY_*0.9*attrH/stepCount;
						_currentTranslateY_ = Math.min(0.05*attrH,Math.max(0.95*attrH-_currentScaleY_*0.9*attrH,_currentTranslateY_-step));
						viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
						map.relocate();
						break;
					case "left":
						var step = _currentScaleX_*0.9*attrW/stepCount;
						_currentTranslateX_ = Math.min(0.05*attrW,Math.max(0.95*attrW-_currentScaleX_*0.9*attrW,_currentTranslateX_+step));
						viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
						map.relocate();
						break;
				}
			});
		
			d3.select("#"+ID+"_navigate").selectAll("navigateElements")
			.data([{translate:0,rotate:0,direction:"center"}])
			.enter()
			.append("circle")
			.attr("cx",0)
			.attr("cy",0)
			.attr("r",attrW/60)
			.attr("stroke-width",3)
			.attr("fill",_controllerColors_[1])
			.attr("fill-opacity",0.75)
			.attr("stroke-linejoin","round")
			.attr("filter",function(){return "url(#"+ID+"_buttonShadow)";})
			.on("mouseout",function(d,i){
				d3.select(this).attr("filter",function(){return "url(#"+ID+"_buttonShadow)";});
			})
			.on("mouseup",function(d,i){
				d3.select(this).attr("filter",function(){return "url(#"+ID+"_buttonShadow)";});
			})
			.on("mousedown",function(d,i){
				d3.select(this).attr("filter",null);
			})
			.on("click",function(d,i){
				var viewport = d3.select("#"+ID+"_viewPort");
				viewport.transition("reset").tween("reset",function(){
					//X
					var interpolateScaleX = d3.interpolate(_currentScaleX_,1);
					var interpolateTranslateX = d3.interpolate(_currentTranslateX_,attrW*0.05);
					//Y
					var interpolateScaleY = d3.interpolate(_currentScaleY_,1);
					var interpolateTranslateY = d3.interpolate(_currentTranslateY_,attrH*0.05);
					return function(t){
						_currentScaleX_ = interpolateScaleX(t);
						_currentTranslateX_ = interpolateTranslateX(t);
						_currentScaleY_ = interpolateScaleY(t);
						_currentTranslateY_ = interpolateTranslateY(t);
						viewport.attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
						map.relocate();
					};
				}).delay(0).duration(1000);
			});
		}
		function addMap() {
			d3.select("#"+ID).append("rect").attr("x",0.8*attrW).attr("y",0.15*attrH).attr("width",0.175*attrW).attr("height",0.175*attrH).attr("stroke-linejoin","round").attr("stroke",_controllerColors_[1]).attr("stroke-opacity",0.4).attr("stroke-width",2).attr("fill",_controllerColors_[1]).attr("fill-opacity",0.4);
			var map = d3.select("#"+ID).append("rect").attr("id",ID+"_mapMarker").attr("x",0.8*attrW).attr("y",0.15*attrH).attr("width",0.175*attrW).attr("height",0.175*attrH).attr("stroke-linejoin","round").attr("stroke",_controllerColors_[4]).attr("stroke-opacity",0.4).attr("fill",_controllerColors_[4]).attr("fill-opacity",0.4);
			var mapWidth = 0.175*attrW;
			var mapHeight = 0.175*attrH;
			var mapOffsetX = 0.8*attrW;
			var mapOffsetY = 0.15*attrH;
			var maxTranslateX = 0.05*attrW;
			var maxTranslateY = 0.05*attrH;
			this.relocate = function() {
				var minTranslateX = 0.95*attrW-_currentScaleX_*0.9*attrW;
				var minTranslateY = 0.95*attrH-_currentScaleY_*0.9*attrH;
				var highlightScaleX = 1/_currentScaleX_;
				var highlightScaleY = 1/_currentScaleY_;
				var maxHighlightTranslateX = (1-highlightScaleX)*mapWidth;
				var maxHighlightTranslateY = (1-highlightScaleY)*mapHeight;
				var highlightTranslateX = (1-(_currentTranslateX_ - minTranslateX)/(maxTranslateX-minTranslateX))*maxHighlightTranslateX || 0;
				var highlightTranslateY = (1-(_currentTranslateY_ - minTranslateY)/(maxTranslateY-minTranslateY))*maxHighlightTranslateY || 0;
				map.attr("x",mapOffsetX+highlightTranslateX).attr("y",mapOffsetY+highlightTranslateY).attr("width",mapWidth*highlightScaleX).attr("height",mapHeight*highlightScaleY);
			}
		}
		
		function addViewPort(){
			var masterPort = d3.select("#"+ID).append("g").attr("id",function(){return ID+"_masterPort"}).attr("clip-path",function(){return "url(#"+ID+"_clipper)";});
			var viewport = masterPort.append("g").attr("id",function(){return ID+"_viewPort"}).style("cursor","pointer").attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")");
			//var viewport = d3.select("#"+ID).append("g").attr("id",function(){return ID+"_viewPort"}).style("cursor","pointer").attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")")/*.style("clip-path",function(){return "url(#"+ID+"_clipper)";})*/;
			var width = 0.9*attrW;
			var height = 0.9*attrH;
			var origin = [0,0];
			//test viewport
			//keep the below rect as a viewport boundary marker
			viewport.append("rect").attr("x",origin[0]).attr("y",origin[1]).attr("rx","1%").attr("ry","1%").attr("width",width).attr("height",height).attr("stroke",null).attr("fill",bColor).attr("fill-opacity",bOpacity);
			//--->viewport.append("circle").attr("r",attrW*0.1).attr("cx",0.45*attrW).attr("cy",0.45*attrH).attr("fill","LightBlue");
		
		
			var startPos = [];
			var startTranslateX;
			var startTranslateY;
			var drag = d3.behavior.drag().on("drag", dragFunc).on("dragstart",function (){d3.event.sourceEvent.stopPropagation(); coordinates = d3.mouse(document.getElementById(ID)); startPos = [coordinates[0],coordinates[1]]; startTranslateX = _currentTranslateX_; startTranslateY = _currentTranslateY_;});
			function dragFunc() {
				var dX = d3.event.x-startPos[0];
				var dY = d3.event.y-startPos[1];
				//_currentTranslateX_ = startTranslateX + dX;
				//_currentTranslateY_ = startTranslateY + dY;
				_currentTranslateX_ = Math.min(0.05*attrW,Math.max(0.95*attrW-_currentScaleX_*width,startTranslateX + dX));
				_currentTranslateY_ = Math.min(0.05*attrH,Math.max(0.95*attrH-_currentScaleY_*height,startTranslateY + dY));
				
				d3.select(this).attr("transform","translate("+_currentTranslateX_+","+_currentTranslateY_+") scale("+_currentScaleX_+","+_currentScaleY_+")")
				map.relocate();
			}
			viewport.call(drag)
			//.origin(function(){return {"x":_currentTranslateX_,"y":_currentTranslateY_};})
		
			//##############################################################SCALE###################################################################################
			scaleMainBot = d3.scale.linear().domain([_realMin_,_realMax_]).range([gOffsetX,gOffsetX+renderingWidth]);
			axisMainBot = d3.svg.axis().scale(scaleMainBot).orient("bottom").ticks(5).tickSize(attrH/100,0).tickPadding(5);
			scaleMainLeft = d3.scale.linear().domain([0,1]).range([gOffsetY+renderingHeight,gOffsetY]);
			axisMainLeft = d3.svg.axis().scale(scaleMainLeft).orient("left").ticks(5).tickSize(-attrW/50,0).tickPadding(10);
			
			viewport.append("g").attr("id",ID+"_lexMainAxisBot").attr("class","global_lexMainAxes").attr("transform","translate(0,"+(gOffsetY+renderingHeight)+")").attr("visibility",axisVisibility[0]).call(axisMainBot);
			axisMainLeftGroup = viewport.append("g");
			axisMainLeftGroup.attr("id",ID+"_lexMainAxisLeft").attr("class","global_lexMainAxes").attr("transform","translate("+gOffsetX+",0)").attr("visibility",axisVisibility[1]).call(axisMainLeft);
			viewport.append("text").text(axisLabel[1] || "frequency").style("white-space","pre").attr("x",0).attr("dx",0).attr("y",0).attr("dy",0).attr("transform","translate ("+2/5*gOffsetX+","+(gOffsetY+renderingHeight/2)+") rotate(-90)").attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/35).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0).style("cursor","pointer");
			viewport.append("text").text(axisLabel[0] || "values").style("white-space","pre").attr("x",0).attr("dx",0).attr("y",0).attr("dy",0).attr("transform","translate ("+(gOffsetX+renderingWidth/2)+","+(9/5*gOffsetY+renderingHeight)+")").attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/35).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0).style("cursor","pointer");
			//##############################################################SCALE###################################################################################
			//viewport.on("click",function(){console.log(d3.mouse(this))}); check if scale of translate affects the captured mouse pos
		}
		function recalibrate(){
			gWidth = 0.9*attrW;
			gHeight = 0.9*attrH;
			gOffsetX = 0.1*gWidth;
			gOffsetY = 0.1*gHeight;
			renderingWidth = 0.8*gWidth;
			renderingHeight = 0.8*gHeight;
		}
		//###############################################################INVOKED WITHIN APPEND###############################################################
		
		//sorts the array based on first index(value) in ascending format and returns a new array.
		this.sortValues = function (start,end) {
			if (arguments.length === 0) {
				return _values_.slice().sort(function(a,b){return a[0]-b[0];});
			} else if (start !== undefined && end === undefined) {
				return _values_.slice(start).sort(function(a,b){return a[0]-b[0];});
			} else if (start !== undefined && end !== undefined) {
				return _values_.slice(start,end).sort(function(a,b){return a[0]-b[0];});
			}
		}
		
		//formats the values into an array of objects [d,d',d''] where each d is {f:...,children:[[x,i],[x',i']..]} f is frequency, children are sorted according to to index ascending
		this.formatValues = function (sorted,_windowUnits_) {//sorted by VALUE
			var result = [];
			var step = (_realMax_-_realMin_)/_windowUnits_;
			var frequencies = [];
			for (var i =0;i<_windowUnits_;i++) {
				if (i !== _windowUnits_-1) {
					var obj = generateObj(i);
					frequencies.push(obj.frequency);
					result.push(obj);
				} else {
					var obj = generateObj(i,"end");
					frequencies.push(obj.frequency);
					result.push(obj);
				}
			}
			result.maxFrequency = d3.max(frequencies);
			return result;
			
			function generateObj (windowNumber,end){
				var length = sorted.length;
				var result = {"frequency":0,"children":[],"lowerBound":undefined,"upperBound":undefined};
				var lowerLimit = _realMin_+windowNumber*step;
				var upperLimit = _realMin_+(windowNumber+1)*step;
				if (end !== "end") {
					result.lowerBound = lowerLimit;
					result.upperBound = upperLimit;
					for (var i = 0;i<length;i++) {
						if (sorted[i][0]>=lowerLimit && sorted[i][0] < upperLimit) {
							result.frequency++;
							result.children.push(sorted[i]);
						} else if (sorted[i][0] >= upperLimit) {
							break;
						}
					}
				} else if (end === "end") {
					result.lowerBound = lowerLimit;
					result.upperBound = "Infinity";
					for (var i = 0;i<length;i++) {
						if (sorted[i][0]>=lowerLimit) {
							result.frequency++;
							result.children.push(sorted[i]);
						}
					}
				}
				//result.frequency = "%"+Math.round(result.frequency/length*1000)/10;
				result.frequency = result.frequency/length*100;
				result.children.sort(function(a,b){return a[1]-b[1];});
				if (result.children.length === 1) {
					//result.label = "single value: "+result.children[0][2];
					result.label = "single value";
				} else {
					result.label = result.children.length + " values";
				}
				return result;
			}
		}
		
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
			this.relocate = function(mouseX,mouseY,data,type){ //type is optional if undefined than it is default bar tag, other ops are singleton and pvalue
				//console.log("X:"+mouseX+" Y:"+mouseY+" W/2:"+(attrW/2)+" H/2:"+(attrH/2));
				//console.log(mouseX<(attrW/2)?0:2 + mouseY<(attrH/2)?3:7);
				switch ((mouseX<attrW/2?0:2) + (mouseY<attrH/2?3:7)) {
					case 3: 
						switch(type) {
							case undefined:
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); var interpolateText1 = d3.interpolate(0,data.frequency); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)"); t1.text("%"+(interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
								t1.attr("font-size",width/4);
								t2.text(data.label);
								t3.text(this.format(data.lowerBound)+" to "+this.format(data.upperBound));
								break;
							case "singleton":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("data: "+this.format(data[0])).attr("font-size",width/8);
								t2.text("index: "+data[1]);
								t3.text(function(){return "label: "+(data[2]===undefined?"NA":(data[2]).toString().slice(0,10));});
								break;
							case "pvalue":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",1); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("p-value: "+data["p-value"]).attr("font-size",width/8);
								t2.text("SD: "+data.SD);
								t3.text("mean: "+data.mean);
								break;
						}
						break;
					case 5: 
						switch(type) {
							case undefined:
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); var interpolateText1 = d3.interpolate(0,data.frequency); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","scale("+Sx+",1)"); t1.text("%"+(interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
								t1.attr("font-size",width/4);
								t2.text(data.label);
								t3.text(this.format(data.lowerBound)+" to "+this.format(data.upperBound));
								break;
							case "singleton":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("data: "+this.format(data[0])).attr("font-size",width/8);
								t2.text("index: "+data[1]);
								t3.text(function(){return "label: "+(data[2]===undefined?"NA":(data[2]).toString().slice(0,10));});
								break;
							case "pvalue":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",1); texts.attr("transform","scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("p-value: "+data["p-value"]).attr("font-size",width/8);
								t2.text("SD: "+data.SD);
								t3.text("mean: "+data.mean);
								break;
						}
						break;
					case 7:
						switch(type) {
							case undefined:
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); var interpolateText1 = d3.interpolate(0,data.frequency); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)"); t1.text("%"+(interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
								t1.attr("font-size",width/4);
								t2.text(data.label);
								t3.text(this.format(data.lowerBound)+" to "+this.format(data.upperBound));
								break;
							case "singleton":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("data: "+this.format(data[0])).attr("font-size",width/8);
								t2.text("index: "+data[1]);
								t3.text(function(){return "label: "+(data[2]===undefined?"NA":(data[2]).toString().slice(0,10));});
								break;
							case "pvalue":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX+width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,-1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",1); texts.attr("transform","translate("+4/5*width+",0) scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("p-value: "+data["p-value"]).attr("font-size",width/8);
								t2.text("SD: "+data.SD);
								t3.text("mean: "+data.mean);
								break;
						}
						break;
					case 9:
						switch(type) {
							case undefined:
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); var interpolateText1 = d3.interpolate(0,data.frequency); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","scale("+Sx+",1)"); t1.text("%"+(interpolateText1(t)).toString().slice(0,4));}}).delay(0).duration(500);
								t1.attr("font-size",width/4);
								t2.text(data.label);
								t3.text(this.format(data.lowerBound)+" to "+this.format(data.upperBound));
								break;
							case "singleton":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",t); texts.attr("transform","scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("data: "+this.format(data[0])).attr("font-size",width/8);
								t2.text("index: "+data[1]);
								t3.text(function(){return "label: "+(data[2]===undefined?"NA":(data[2]).toString().slice(0,10));});
								break;
							case "pvalue":
								postit.transition("relocate").tween("relocate",function(){var interpolateTx = d3.interpolate(Tx,mouseX-width); var interpolateTy = d3.interpolate(Ty,mouseY-height); var interpolateSx = d3.interpolate(Sx,1); return function(t){Tx = interpolateTx(t); Ty = interpolateTy(t); Sx = interpolateSx(t); postit.attr("transform","translate("+Tx+","+Ty+") scale("+Sx+",1)").style("opacity",1); texts.attr("transform","scale("+Sx+",1)");}}).delay(0).duration(500);
								t1.text("p-value: "+data["p-value"]).attr("font-size",width/8);
								t2.text("SD: "+data.SD);
								t3.text("mean: "+data.mean);
								break;
						}
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
		function AUC(){
			var _currentPoints_ = undefined;//current x,y cordinates of the upper left corner of each bar.
			var _currentSamples_ = undefined;//current x,y coordinates of the cardinal spline sampled by 1000 equidistant intervals
			var _currentAreas_ = undefined;
			var _placeHolder_ = undefined;//stores the 'clone' node
			var _data_ = undefined;//refreshed everytime AUC turned on
			var __data__ = {"mean":undefined,"median":undefined,"SD":undefined,"p-value":undefined};//mean,median and SD stay constant, p-value updated and passed onto postit.
			var _barWidth_ = undefined;
			var viewport = d3.select("#"+ID+"_viewPort");
			var viewportNode = viewport.node();
			var cardinal = d3.svg.line().interpolate("cardinal");//main cardinal variable is closed, so open one has to be declared here.
			var lineAUC = line;//just copy the main line variable
			this.isOn = false;
			this.isReady = false;
			this.init = function () {//invoked once in append
				var length = _valuesSorted_.length;
				var total = 0;
				for (var i = length-1;i>=0;--i) {
					total += _valuesSorted_[i][0];
				}
				var mean = __data__.mean = postit.format(total/length);
				__data__.median = postit.format(length % 2 === 0 ? (_valuesSorted_[length/2][0]+_valuesSorted_[length/2-1][0])/2 : _valuesSorted_[Math.floor(length/2)][0]);
				var distSquare = 0;
				for (var i = length-1;i>=0;--i) {
					distSquare += Math.pow(mean-_valuesSorted_[i][0],2);
				}
				__data__.SD = postit.format(Math.sqrt(distSquare/length));
			}
			this.data = __data__;
			this.turnoff = function () {
				 document.getElementById(ID+"_viewPort").removeChild(document.getElementById(ID+"_AUC"));
				/*while(containerNode.hasChildNodes()) {
					containerNode.removeChild(containerNode.lastChild);
				}*/
				this.isOn = false;
				this.isReady = false;
				this.flush();
				return this;
			}
			this.turnon = function () {
				this.isOn = true;
				this.getPoints().samplePoints().calculateAreas();
				return this;
			}
			this.getPoints = function(){
				_data_ = _this_.formatValues(_valuesSorted_,_windowUnits_);
				_barWidth_ = renderingWidth/_windowUnits_;
				var length = _data_.length;
				_currentPoints_ = [];
				for (var i=0;i<length;++i){
					_currentPoints_.push([gOffsetX+(i+1/2)*_barWidth_,gOffsetY+(1-_data_[i].frequency/_data_.maxFrequency)*renderingHeight]);
				}
				return this;
			}
			this.samplePoints = function () {
				var dAttr = cardinal(_currentPoints_);
				_placeHolder_ = document.createElementNS("http://www.w3.org/2000/svg","path");
				_placeHolder_.setAttribute("d",dAttr);
				var length = _placeHolder_.getTotalLength();
				var dL = length/1000;
				_currentSamples_ = [];
				var loopPoint = undefined;
				for (var i =0;i<=1000;++i) {
					loopPoint = _placeHolder_.getPointAtLength(i*dL);
					_currentSamples_.push([loopPoint.x,loopPoint.y]);
				}
				return this;
			}
			this.calculateAreas = function () {
				_currentAreas_ = [];
				var length = _currentSamples_.length;
				var totalA = 0;
				for (var i = length-1; i>=0;--i) {
					totalA += (_currentSamples_[i][0] - _currentSamples_[Math.max(i-1,0)][0])*(gOffsetY+renderingHeight-_currentSamples_[i][1]);
					_currentAreas_.push(totalA);
				}
				for (var i = length-1; i>=0;--i) {
					_currentAreas_[i] = Math.round(_currentAreas_[i]/totalA*1000)/1000; 
				}
				_currentAreas_ = _currentAreas_.reverse();
				return this;
			}
			this.flush = function () {
				_currentPoints_ = undefined;
				//_currentSamples_ = undefined; //has to be turned off because it breaks on going interpolation. it is refreshed anyway.
				_currentAreas_ = undefined;
				_placeHolder_ = undefined;
				_data_ = undefined;
				_barWidth_ = undefined;
				__data__["p-value"] = undefined;
			}
			this.findClosestPoint = function (mouseX) {
				return _currentSamples_[_currentSamples_.map(function(d,i){return [Math.abs(mouseX-d[0]),i]}).sort(function(a,b){return a[0]-b[0];})[0][1]];
			}
			this.findClosestIndex = function (mouseX) {
				return _currentSamples_.map(function(d,i){return [Math.abs(mouseX-d[0]),i]}).sort(function(a,b){return a[0]-b[0];})[0][1];
			}
			this.getSegment = function (startIndex) { //is combined with findClosestIndex
				var dPoints = _currentSamples_.map(function(d,i){return [d[0],d[1]];}).slice(startIndex);//need to copy the primitives otherwise pointers will make trouble
				var botEnd = [dPoints.slice(-1)[0][0],gOffsetY+renderingHeight];
				var botStart = [dPoints.slice(0,1)[0][0],gOffsetY+renderingHeight];
				dPoints.push(botEnd,botStart);
				return dPoints;
			}
			this.drawCurve = function () {
				var container = viewport.append("g").attr("id",ID+"_AUC");
				var pathSpan = container.append("path").attr("stroke",_curveColor_).attr("stroke-width",0).attr("stroke-linejoin","round").attr("stroke-opacity",1).attr("fill",_curveColor_).attr("fill-opacity",0.5).attr("d","M 0,0 L 0,0");
				var path = container.append("path").attr("stroke",_curveColor_).attr("stroke-width",2).attr("stroke-linejoin","round").attr("stroke-opacity",1).attr("fill","transparent").attr("fill-opacity",0);
				path
				.on("mouseover",function(){
					var mX = d3.touch(viewportNode) || d3.mouse(viewportNode);
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					var index = _this_.AUC.findClosestIndex(mX[0]);
					pathSpan.attr("d",function(){return lineAUC(_this_.AUC.getSegment(index))+" Z";});
					__data__["p-value"] = _currentAreas_[index];
					postit.relocate(coordinates[0],coordinates[1],__data__,"pvalue");
				})
				.on("mouseout",function(){
					//pathSpan.attr("d","M 0,0 L 0,0");
					//postit.fade();
				})
				.on("mousemove",function(){
					var mX = d3.touch(viewportNode) || d3.mouse(viewportNode);
					coordinates = d3.touch(document.getElementById(ID)) || d3.mouse(document.getElementById(ID));
					var index = _this_.AUC.findClosestIndex(mX[0]);
					pathSpan.attr("d",function(){return lineAUC(_this_.AUC.getSegment(index))+" Z";});
					__data__["p-value"] = _currentAreas_[index];
					postit.relocate(coordinates[0],coordinates[1],__data__,"pvalue");
				});
				path.transition("draw").each("end",function(){_this_.AUC.isReady = true;}).ease("linear").tween("draw",function(){
					var interpolator = d3.interpolate(0,1001);//at t =1, slice (0,1001) will get all the indexes. 1001 excluded (slice specification)
					return function(t){
						path.attr("d",lineAUC(_currentSamples_.slice(0,Math.floor(interpolator(t)))));
					}
				}).delay(0).duration(1000);
			}
		}
		
		function markerObj () {
			this.unit = 1;
			var on = false;
			var sqrt3 = Math.sqrt(3);
			var d = postit.format(_values_[_markerIndex_][0]);//data
			var dReal = _values_[_markerIndex_][0]; //real raw value of data
			var i = _markerIndex_;//index
			var l = _values_[_markerIndex_][2];//label
			var markerString = this.markerString = (function(){return "M"+-(this.unit)/4+","+((this.unit*0.75)*sqrt3)+"L"+-(this.unit)+","+0+"A"+(2*this.unit/sqrt3)+","+(2*this.unit/sqrt3)+" 0 1,1 "+(this.unit)+",0 L"+(this.unit)/4+","+((this.unit*0.75)*sqrt3)+"L"+(this.unit)/4+","+((this.unit*0.25)*sqrt3)+"A"+(this.unit)/2+","+(this.unit)/2+" 0 1,0 "+-(this.unit)/4+","+((this.unit*0.25)*sqrt3)+"Z"}).bind(this)();
			var interpolator = d3.interpolate("translate("+(gOffsetX+(dReal-_realMin_)/(_realMax_-_realMin_)*renderingWidth)+","+2*gOffsetY+") scale(0.1,0.1)","translate("+(gOffsetX+(dReal-_realMin_)/(_realMax_-_realMin_)*renderingWidth)+","+2*gOffsetY+") scale(1,1)");
			
			var markerG = d3.select("#"+ID+"_viewPort").append("g").attr("visibility","hidden");
			markerG.append("path").attr("d",markerString).attr("transform",function(){return "scale("+attrW/15+","+attrH/15+")"}).attr("fill","Red").attr("fill-opacity",0.8);
			markerG.append("rect").attr("x",-attrW/10).attr("y",attrW/15).attr("width",attrW/5).attr("height",attrH/5).attr("rx","1%").attr("ry","1%").attr("fill",_tagColors_[0]).attr("fill-opacity",0.8).attr("stroke-width",0);
			markerG.append("path").attr("d","M0,0 L0,"+(renderingHeight-gOffsetY)).attr("fill","Red").attr("stroke","Red").attr("fill-opacity",0.8).attr("stroke-opacity",0.8).attr("stroke-dasharray","5 5");
			var t1 = markerG.append("text").text(function(){return "data: "+d;}).attr("x",0).attr("y",0).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","middle").attr("font-size",attrW/40).attr("fill",_tagColors_[1]).attr("stroke",_tagColors_[1]).attr("stroke-width",0).style("cursor","pointer");
			var t2 = markerG.append("text").text(function(){return "index: "+i;}).attr("x",0).attr("y",0).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","middle").attr("font-size",attrW/40).attr("fill",_tagColors_[1]).attr("stroke",_tagColors_[1]).attr("stroke-width",0).style("cursor","pointer");
			var t3 = markerG.append("text").text(function(){return "label: "+(l===undefined?"NA":(l).toString().slice(0,10));}).attr("x",0).attr("y",0).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","middle").attr("font-size",attrW/40).attr("fill",_tagColors_[1]).attr("stroke",_tagColors_[1]).attr("stroke-width",0).style("cursor","pointer");
			t1.attr("dy",attrW/10+attrW/40)
			t2.attr("dy",attrW/10+3*attrW/40);
			t3.attr("dy",attrW/10+5*attrW/40);
			markerG.attr("transform",interpolator(0));
			var controller = d3.select("#"+ID).append("g").attr("transform","translate("+(attrW*0.05+attrH*0.025)+","+(attrH*0.95+attrH*0.025)+")").attr("clip-path",function(){return "url(#"+ID+"_clipperEtiquete)";}).style("cursor","pointer");
			controller.append("path").attr("d",function(){return _this_.etiquete(attrH*0.05,attrW*0.10);}).attr("fill",_controllerColors_[2]);
			controller.append("text").text("marker").attr("x",0.05*attrH).attr("y",0.0075*attrH).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","middle").attr("font-size",attrW/40).attr("fill",_controllerColors_[0]).attr("stroke-width",0);
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
				if (on === true) {
					markerG.transition("popOut").ease("elastic").each("end",function(){this.setAttribute("visibility","hidden")}).tween("popOut",function(){return function(t){markerG.attr("transform",interpolator(1-t));}}).delay(0).duration(1000);
					on = false;
				} else {
					_this_.moveNodeTop(markerG);
					markerG.attr("visibility","visible");
					markerG.transition("popOut").ease("elastic").tween("popOut",function(){return function(t){markerG.attr("transform",interpolator(t));}}).delay(0).duration(1000);
					on = true;
				}
			});
		}
		function addLocal() {
			var thisObj = this;
			var allSingletonNodes = [];//keeps in memory the style objects of all singletons
			var controller = d3.select("#"+ID).append("g").attr("transform","translate("+(attrW*0.15+attrH*0.075)+","+(attrH*0.95+attrH*0.025)+")").attr("clip-path",function(){return "url(#"+ID+"_clipperEtiquete)";}).style("cursor","pointer");
			controller.append("path").attr("d",function(){return _this_.etiquete(attrH*0.05,attrW*0.10);}).attr("fill",_controllerColors_[2]);
			controller.append("text").text("local").attr("x",0.05*attrH).attr("y",0.0075*attrH).attr("font-family","advent-pro").attr("font-weight",200).attr("text-anchor","middle").attr("font-size",attrW/40).attr("fill",_controllerColors_[0]).attr("stroke-width",0);
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
				if(renderMode[0] === "Bar") {
					_this_.changeMode();
				}
				thisObj.on === false ? thisObj.turnOn() : thisObj.turnOff();
			});
			var gScale = d3.interpolate("translate("+(attrX+attrW*0.5)+","+(attrY+attrH*0.9)+") scale(0.1,0.1)","translate("+(attrX+attrW*0.05)+","+(attrY+attrH*0.9)+") scale(1,1)");
			var indicatorG = d3.select("#"+ID).append("g").attr("transform",gScale(0)).style("cursor","pointer").attr("visibility","hidden");
			var K = 1+2*padding/(attrW-2*padding);
			var N = K*nElementsInView; //corrected number of elements in view
			var length = _valuesSorted_.length;
			var spanWidth = Math.max(0,Math.min(N,length)/length*attrW*0.9);
			//var maxDiff = Math.min(maxZoom,length)*K/length*attrW*0.9;
			//var minDiff = Math.min(5,length)*K/length*attrW*0.9;
			var maxDiff = Math.min(maxZoom,length)/length*attrW*0.9;
			var minDiff = Math.min(5,length)/length*attrW*0.9;
			var lowerPrevious = Math.floor(offset);
			var upperPrevious = Math.ceil(offset+N);
			var lower = Math.floor(offset);
			var upper = Math.ceil(offset+N);
			this.on = false;
			this.renderIndicator = function() {
				//main trail
				indicatorG.append("rect").attr("id",function(){return ID+"_indicator";}).attr("class","global_lexIndicator_trails").attr("x",0).attr("y",0).attr("width",attrW*0.9).attr("height",attrH*0.05).attr("fill-opacity",0.6).attr("fill","LightBlue")
				.on("click",function(){
					var mouseX = (d3.touch(this) || d3.mouse(this))[0];
					var min = 0;
					var max = attrW*0.9-spanWidth;
					d3.select("#"+ID+"_indicatorSpanRegion").attr("x",Math.max(min,Math.min(mouseX,max)));
					var maxOffSet = Math.max(0,length-N);
					offset = Math.min(maxOffSet,Math.max(0,(mouseX-min)/(max-min)*maxOffSet));
					local.updateIndicator();
				});
				//2 "bars" and a span region and 2 text showing intervals
				var leftG = indicatorG.append("g");
				leftG.append("path").attr("id",function(){return ID+"_indicatorLeftBar";}).attr("d",marker.markerString).attr("transform","translate("+(offset/length*attrW*0.9)+",0) scale("+attrW/30+","+attrH/30+")").attr("fill-opacity",0.6).attr("fill","Red");
				leftG.append("text").text(function(){return Math.floor(offset)+1;}).attr("id",function(){return ID+"_indicatorLeftText";}).attr("transform","translate("+(offset/length*attrW*0.9)+",0)").attr("dy",-attrH/45).attr("x",0).attr("y",0).attr("font-family","advent-pro").attr("font-weight",800).attr("text-anchor","end").attr("font-size",attrW/40).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0);
				var rightG = indicatorG.append("g");
				rightG.append("path").attr("id",function(){return ID+"_indicatorRightBar";}).attr("d",marker.markerString).attr("transform","translate("+(offset/length*attrW*0.9+spanWidth)+",0) scale("+attrW/30+","+attrH/30+")").attr("fill-opacity",0.6).attr("fill","Red");
				rightG.append("text").text(function(){return Math.min(Math.ceil(offset+N)+1,length);}).attr("id",function(){return ID+"_indicatorRightText";}).attr("transform","translate("+(offset/length*attrW*0.9+spanWidth)+",0)").attr("dy",-attrH/45).attr("x",0).attr("y",0).attr("font-family","advent-pro").attr("font-weight",800).attr("text-anchor","start").attr("font-size",attrW/40).attr("fill",_tagColors_[0]).attr("stroke",_tagColors_[0]).attr("stroke-width",0);
				indicatorG.append("rect").attr("id",function(){return ID+"_indicatorSpanRegion";}).attr("class","global_lexIndicator_spans").attr("x",offset/length*attrW*0.9).attr("y",0).attr("width",spanWidth).attr("height",attrH*0.05).attr("fill-opacity",0.2).attr("fill","DarkBlue");
				//add drag gesture to span element
				var xOffset = undefined;
				/*origin(function(){var x = +d3.select(this).attr("x");var y = +d3.select(this).attr("y");return {"x":x,"y":y};}) ---> WONT WORK.*/
				var drag = d3.behavior.drag().on("drag", dragFunc).on("dragstart",function (){d3.event.sourceEvent.stopPropagation();xOffset = (offset/length*attrW*0.9)-(d3.touch(document.getElementById(ID+"_indicator")) || d3.mouse(document.getElementById(ID+"_indicator")))[0];});
				function dragFunc() {
					var mouseX = (d3.touch(document.getElementById(ID+"_indicator")) || d3.mouse(document.getElementById(ID+"_indicator")))[0];
					mouseX += xOffset;
					var min = 0;
					var max = attrW*0.9-spanWidth;
					d3.select(this).attr("x",Math.max(min,Math.min(mouseX,max)));
					var maxOffSet = Math.max(0,length-N);
					offset = Math.min(maxOffSet,Math.max(0,(mouseX-min)/(max-min)*maxOffSet)) || 0;
					//console.log("drag:"+maxOffSet+" "+mouseX+" "+offset+" "+spanWidth+);
					local.updateIndicator();
					_this_.render(thisObj);
				}
				d3.select("#"+ID+"_indicatorSpanRegion").on("touchstart",function(){disableScroll(this);}).on("touchend",function(){enableScroll(this);}).call(drag);
				var dragLeft = d3.behavior.drag().on("drag", dragFuncLeft).on("dragstart",function (){d3.event.sourceEvent.stopPropagation();xOffset = (offset/length*attrW*0.9)-(d3.touch(document.getElementById(ID+"_indicator")) || d3.mouse(document.getElementById(ID+"_indicator")))[0]});
				function dragFuncLeft() {
					var mouseX = (d3.touch(document.getElementById(ID+"_indicator")) || d3.mouse(document.getElementById(ID+"_indicator")))[0];
					mouseX += xOffset;
					//var min = 0;
					var max = offset/length*attrW*0.9+spanWidth;
					var pos = Math.max(max-maxDiff,Math.min(mouseX,max-minDiff));
					offset = pos/(attrW*0.9)*length;
					N = (max-pos)/(attrW*0.9)*length;
					nElementsInView = N/K;
					spanWidth = Math.max(0,Math.min(N,length)/length*attrW*0.9);
					local.updateIndicator();
					_this_.render(thisObj);
					//console.log("nElmenets: "+ nElementsInView+","+"N: "+ N+","+"Offset: "+offset);
				}
				leftG.on("touchstart",function(){disableScroll(this);}).on("touchend",function(){enableScroll(this);}).call(dragLeft);
				var dragRight = d3.behavior.drag().on("drag", dragFuncRight).on("dragstart",function (){d3.event.sourceEvent.stopPropagation();xOffset = (offset/length*attrW*0.9+spanWidth)-(d3.touch(document.getElementById(ID+"_indicator")) || d3.mouse(document.getElementById(ID+"_indicator")))[0]});
				function dragFuncRight() {
					var mouseX = (d3.touch(document.getElementById(ID+"_indicator")) || d3.mouse(document.getElementById(ID+"_indicator")))[0];
					mouseX += xOffset;
					var min = offset/length*attrW*0.9;
					//var max = attrW*0.9;
					var pos = Math.max(min+minDiff,Math.min(mouseX,min+maxDiff));
					//var pos = Math.max(min,Math.min(mouseX,max));
					//offset = pos/(attrW*0.9)*length;
					N = (pos-min)/(attrW*0.9)*length;
					nElementsInView = N/K;
					spanWidth = Math.max(0,Math.min(N,length)/length*attrW*0.9);
					local.updateIndicator();
					_this_.render(thisObj);
					//console.log("nElmenets: "+ nElementsInView+","+"N: "+ N+","+"Offset: "+offset);
				}
				rightG.on("touchstart",function(){disableScroll(this);}).on("touchend",function(){enableScroll(this);}).call(dragRight);
			}
			this.updateIndicator = function(foreignCaller) {
				if (this.updateIndicator._busy) {
					return;
				}
				this.updateIndicator._busy = true;
				window.requestAnimationFrame(function(){
					/*N = nElementsInView+2*padding/(attrW-2*padding)*nElementsInView; //corrected number of elements in view
					spanWidth = Math.max(0,Math.min(N,length)/length*attrW*0.9);*/ //although not needed if called by a foreign function like render it can be recalculted like below
					if(foreignCaller === true) {
						N = K*nElementsInView;
						spanWidth = Math.max(0,Math.min(N,length)/length*attrW*0.9);
					}
					offset = Math.min(Math.max(0,length-N),Math.max(0,offset));
					lowerPrevious = lower;
					upperPrevious = upper;
					lower = Math.floor(offset);
					upper = Math.ceil(offset+N);
					//console.log("update:"+offset+" "+N+" "+spanWidth);
					/*Since I wrapped whole statements inside rAF,
					I can use either 'local' or 'thisObj' instead of
					this. thisObj is closer so I go with that:
					this.highlight(); */
					thisObj.highlight(); 
					//2 bars and a span region and 2 text showing intervals
					var self = thisObj.updateIndicator;
					self._indicatorLeftBar.attr("transform","translate("+(offset/length*attrW*0.9)+",0) scale("+attrW/30+","+attrH/30+")");
					self._indicatorRightBar.attr("transform","translate("+(offset/length*attrW*0.9+spanWidth)+",0) scale("+attrW/30+","+attrH/30+")");
					self._indicatorSpanRegion.attr("x",offset/length*attrW*0.9).attr("width",spanWidth);
					self._indicatorLeftText.text(function(){return Math.floor(offset)+1;}).attr("transform","translate("+(offset/length*attrW*0.9)+",0)");
					self._indicatorRightText.text(function(){return Math.min(Math.ceil(offset+N)+1,length);}).attr("transform","translate("+(offset/length*attrW*0.9+spanWidth)+",0)");
					self._busy = false;
				})
			}
			//throttle this update function as it is the 'entry point' for this.highlight
			this.updateIndicator._busy = false;
			//cache the selections on the same function with lazy getters
			!function(obj){
				["_indicatorLeftBar",
					"_indicatorRightBar",
					"_indicatorSpanRegion",
					"_indicatorLeftText",
					"_indicatorRightText"
				].forEach(function(d,i){
					Object.defineProperty(obj,d,descGen(d));
				})
				function descGen(p) {
					descGen.descriptor = descGen.descriptor || {configurable:true};
					descGen.descriptor.get = function(){delete this[p]; return this[p] = d3.select("#"+ID+p)};
					return descGen.descriptor;
				}
			}(this.updateIndicator);
			var idRoot = ID+"_lexSingletonElement";
			this.turnOn = function () {
				indicatorG.attr("visibility","visible");
				indicatorG.transition("fadeInOut").ease("linear").tween("fadeInOut",function(){return function(t){indicatorG.attr("transform",gScale(t));}}).delay(0).duration(500);
				this.on = true;
				allSingletonNodes = [];
				for(var i = 0;i<length;++i){
					allSingletonNodes.push(document.getElementById(idRoot+i).style);
				}
			}
			this.turnOff = function () {
				indicatorG.transition("fadeInOut").each("end",function(){indicatorG.attr("visibility","hidden");}).ease("linear").tween("fadeInOut",function(){return function(t){indicatorG.attr("transform",gScale(1-t));}}).delay(0).duration(500);
				for (var i=length-1;i>=0;--i) {
					//document.getElementById(idRoot+i).setAttribute("stroke-width",0);
					allSingletonNodes[i].strokeWidth = 0;
				}
				this.on = false;
				allSingletonNodes = [];
			}
			this.highlight = function () {
				var r = Math.min(length-1,Math.max(upperPrevious,upper));
				var l = Math.max(0,Math.min(lowerPrevious,lower));
				for (var i=r;i>=l;--i) {
					if (i>= lower && i<= upper) {
						//document.getElementById(idRoot+i).setAttribute("stroke-width",2);
						allSingletonNodes[i].strokeWidth = 2;
					} else {
						//document.getElementById(idRoot+i).setAttribute("stroke-width",0);
						allSingletonNodes[i].strokeWidth = 0;
					}
				}
				//onmouse ? onmouse(d3.event,lower,upper) : void(0);
				onmouse ? onmouse(d3.event,lower,Math.min(upper,length-1)) : void(0);//offset is already >=0 at updateIndicator
			}
			this.renderIndicator();
		}
		
		this.etiquete = function(h,l) {
			return "M"+-h/4+",-0.001"+"A"+h/4+","+h/4+" 0 1,1 "+-h/4+",0.001"+"L"+-h/2+",0"+"L"+-h/2+","+h/2+"L"+(h/2+l)+","+h/2+"L"+(h/2+l)+","+-h/2+"L"+-h/2+","+-h/2+"L"+-h/2+",0"+"L"+-h/4+",0"+"Z";
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
		//disable iOS touchmove
		function disableScroll(el){
			d3.event.preventDefault();
			d3.select(document).on("touchmove.lexDistPreventDef",function(){d3.event.preventDefault();});
		}
		//reEnable iOS touchmove
		function enableScroll(el){
			d3.select(document).on("touchmove.lexDistPreventDef",null);
		}
	}
	var prt = lexiconDistributeF.prototype;
	prt.moveNodeTop = function(obj){ //selection or node
		obj = typeof obj.node === "function" ? obj.node() : obj;
		if (obj.parentNode.lastChild === obj) {return};
		obj.parentNode.insertBefore(obj,null);
	}
	window.lexiconDistribute = new lexiconDistributeF;
})();
<!--Lexicon-->
/*Copyright Ibrahim Tanyalcin 2014-2017
Free for academic use.*/