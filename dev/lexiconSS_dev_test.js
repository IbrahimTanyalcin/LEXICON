<!--Lexicon-->
(function (){
	function lexiconSSF () {
		var ID = ID || "lexicon_"+Math.round(Math.random()*100);
		var _seq_ = _seq_ || window.capturedSeq || "LE-IC-N";
		var _data_ = _seq_.split("");
		var _muts_ = {};
		var attrX = attrX || 0;
		var attrY = attrY || 0;
		var attrW = attrW || 100;
		var attrH = attrH || 100;
		var styleW = styleW || "100px";
		var styleH = styleH || "100px";
		var styleMargin = styleMargin || "0px";
		var bColor = bColor || "DimGray";
		var bOpacity = bOpacity || 0.25;
		var _container_ = _container_ || document.body;
		var position = position || "relative"
		var top = top || "0px";
		var left = left || "0px";
		var offset = 0;
		var line = d3.svg.line();
		var padding = 0.05*attrW;
		var _this_ = this;
		var dataChunk = [];
		var _renderPanel = true;
		var _renderIndicator = true;
		var extent = [300,500];
		var maxZoom = 100;
		//configure dataChunk
		this.chunk = function() {
			dataChunk = [];
			for (var i=0;i<=Math.ceil((_data_.length-extent[1])/extent[0]);i++) {
				dataChunk[i] = _data_.slice(i*extent[0],i*extent[0]+extent[1]);
			}
		}
		this.chunk();
		var vShift = 0;
		var vShiftIndicator = vShift;
		var vShiftPanel = vShift;
		var activeAA = "";
		var _assignedAnimations_ = {};
		var panelOngoingAnim = 0;
		var submitF = function(){alert("no function was loaded..")}
		var _heightConstant = function(){return 1;};
		var _orientWindow = "default";
		var _orientSubmit = "top";
		var _submitText = "Submit sequence";
		var _renderOverview = true;
		var _renderComposition = true;
		var overviewLineColor = "Navy";
		var _values_ = [];
		var _phantom_ = [];
		var showPhantom = false;
		var valuesMax = 1;
		var _realMax_;//d3.max(_values_)
		var _realMin_;//d3.min(_values_)
		var _normalizedMax_;//not initialized now but will always be 1
		var _normalizedMin_;
		var _valuesNormalized_ = [];
		var _phantomNormalized_ = [];
		var valuesChunk = [];
		var phantomChunk = [];
		var binColor = "Orange";
		var phantomColor = "LightBlue";
		var tagColor = "Purple";
		var tagLabelColor = "Black";
		var _fontConstant_ = 1;
		//text fill, text stroke, shape fill, shape stroke , m.over text fill, m.over text stroke , m.over shape fill
		var _controllerColors_ = ["AntiqueWhite","AntiqueWhite","Red","Red","Red","Red","AntiqueWhite"];
		this.chunkValues = function() {
			valuesChunk = [];
			for (var i=0;i<=Math.ceil((_data_.length-extent[1])/extent[0]);i++) {
				valuesChunk[i] = _valuesNormalized_.slice(i*extent[0],i*extent[0]+extent[1]);
			}
		}
		this.chunkPhantom = function() {
			phantomChunk = [];
			for (var i=0;i<=Math.ceil((_data_.length-extent[1])/extent[0]);i++) {
				phantomChunk[i] = _phantomNormalized_.slice(i*extent[0],i*extent[0]+extent[1]);
			}
		}
		this.lexID = function (u){if(arguments.length !== 0){ID=u; return this;}else{return ID;}}
		this.x = function (u){attrX=u; return this;}
		this.y = function (u){attrY=u; return this;}
		this.w = function (u){attrW=u; padding = 0.05*attrW; return this;}
		this.h = function (u){attrH=u; return this;}
		this.sW = function (u){styleW=u; return this;}
		this.sH = function (u){styleH=u; return this;}
		this.position = function (u){position=u; return this;}
		this.color = function(u){bColor=u;return this;}
		this.opacity = function(u){bOpacity=u;return this;}
		this.container = function(u){_container_ = u;return this;}
		this.sTop = function(u){top = u; return this;}
		this.sLeft = function(u){left = u; return this;}
		this.sMargin = function(u){styleMargin = u; return this;}
		this.seq = function(u){if(arguments.length !== 0){_seq_ = u; _data_ = _seq_.split(""); _muts_ = {}; this.resetAssignedAnimations(); this.checkExtent(); this.chunk(); return this;}else{return _seq_;}}
		this.offSet = function(u){offset=u; return this;}
		this.viewport = function(u){nElementsInView = u; return this;}
		this.vshift = function(u){vShift=u; return this;}
		this.submit = function(f){submitF = f.bind(_this_); return this;}
		this.submitOrient = function(u){_orientSubmit=u;return this;}
		this.submitText = function(u){if(arguments.length !== 0){_submitText=u;return this;}else{return _submitText;}}
		this.panel = function(u){_renderPanel = u;return this;}
		this.indicator = function(u){_renderIndicator = u;return this;}
		this.heightConstant = function(f){_heightConstant=f;return this;}
		this.vshiftIndicator = function(u){vShiftIndicator=u; return this;}
		this.vshiftPanel = function(u){vShiftPanel=u; return this;}
		this.windowOrient = function(u){_orientWindow=u;return this;}
		this.overview = function(u){_renderOverview=u;return this;}
		this.composition = function(u){_renderComposition=u;return this;}
		this.overviewLineColor = function(u){overviewLineColor=u;return this;}
		this.extent = function(u){extent[0]=u[0];extent[1]=u[1];this.chunk();return this;}
		this.checkExtent = function(){extent[0] = extent[0]<1?1:extent[0]; extent[1] = extent[1]>_data_.length?_data_.length:extent[1]; return this;}
		this.zoom = function(u){maxZoom = u;return this;}
		this.values = function(u,w){if(arguments.length !== 0){_values_ = u.bind(_this_)(_data_,w);return this;}else{return {"raw":_values_,"normalized":_valuesNormalized_,"absMax":valuesMax};}}
		this.phantom = function(u,w){if(arguments.length !== 0){_phantom_ = u.bind(_this_)(_data_,w); return this;}else{return {"raw":_phantom_,"normalized":_phantomNormalized_,"absMax":valuesMax};}}
		this.binColor = function(u){colorMode[colorMode.indexOf(binColor)] = u; binColor = u;return this;}
		this.phantomColor = function(u){phantomColor = u;return this;}
		this.tagColor = function(u){tagColor = u;return this;}
		this.tagLabelColor = function(u){tagLabelColor = u;return this;}
		this.fontConstant = function(u){_fontConstant_ = u;return this;}
		var _structure_ = [];
		var structureChunk = [];
		this.chunkStructure = function() {
			structureChunk = [];
			for (var i=0;i<=Math.ceil((_data_.length-extent[1])/extent[0]);i++) {
				structureChunk[i] = _structure_.slice(i*extent[0],i*extent[0]+extent[1]);
			}
		}
		this.structure = function(f){_structure_ = f.call(_this_,_values_); this.chunkStructure(); return this;}
		var _phantomStructure_ = [];
		var phantomStructureChunk = [];
		this.chunkPhantomStructure = function() {
			phantomStructureChunk = [];
			for (var i=0;i<=Math.ceil((_data_.length-extent[1])/extent[0]);i++) {
				phantomStructureChunk[i] = _phantomStructure_.slice(i*extent[0],i*extent[0]+extent[1]);
			}
		}
		this.phantomStructure = function(f){_phantomStructure_ = f.call(_this_,_phantom_); this.chunkPhantomStructure(); return this;}
		var _objSync_ = [];
		this.sync = function(u){if(arguments.length !== 0){_objSync_ = u;return this;}else{return _objSync_;}}
		this._sync_ = function(issuer){var length = _objSync_.length; for(var i =0;i<length;i++){if(issuer === _this_||(_objSync_[i]!==issuer && issuer.sync().every(function(d){return d!==_objSync_[i];}))){_objSync_[i].offSet(offset);_objSync_[i].viewport(nElementsInView);_objSync_[i].render(issuer);}}}
		this.colorControllers = function(u){_controllerColors_ = u;return this;}
		this.append = function () {
			d3.select(_container_).append("svg").attr("preserveAspectRatio","none").attr("id",ID).attr("viewBox",attrX+" "+attrY+" "+(attrX+attrW)+" "+(attrY+attrH)).style("width",styleW).style("height",styleH).style("padding","0px").style("margin","0px").style("display","block").style("position",position).style("top",top).style("left",left).style("overflow","hidden").style("line-height","normal").style("margin",styleMargin)/*.attr("shape-rendering","optimizeSpeed").attr("text-rendering","optimizeSpeed")*/;
			d3.select("#"+ID).append("svg:rect").attr("id",function(){return ID+"_rect";}).attr("x",function(){return (attrX+attrW)/2;}).attr("y",function(){return (attrY+attrH)/2;}).attr("width",0).attr("height",0).attr("rx",15).attr("ry",15).attr("fill-opacity",bOpacity).attr("fill",bColor);
			warp(ID+"_rect",attrW,attrH);
			//the drag behavior
			var drag = d3.behavior.drag().origin(function(){var x = +d3.select(this).attr("x"); var y = +d3.select(this).attr("y"); return {"x":x,"y":y};}).on("drag", dragFunc).on("dragstart",function (){d3.event.sourceEvent.stopPropagation();});
			function dragFunc() {
				offset = Math.min(Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView),Math.max(0,offset-3*d3.event.dx/attrW*nElementsInView));
				_this_.render();
			}
			d3.select("#"+ID).call(drag);
			//add the marker
			d3.select("#"+ID).append("rect").attr("id",function(){return ID+"_marker";}).attr("x",attrX).attr("y",attrY-attrH*0.1).attr("width",attrW/100).attr("height",attrH*1.2).attr("fill-opacity",0.45).attr("fill","Red").attr("stroke","Red").attr("stroke-width",attrW/500).attr("stroke-opacity",0.8);
			d3.select("#"+ID).on("mousemove",function(){d3.select("#"+ID+"_marker").attr("x",d3.mouse(this)[0]-attrW/200)});
			//zoom listener for PCs with a cap of 100 aminoacids
			d3.select("#"+ID).on("mousewheel",function(){d3.event.preventDefault();d3.event.stopPropagation();if(d3.event.wheelDelta<0){nElementsInView = Math.min(maxZoom,nElementsInView+5);_this_.render();}else{nElementsInView = Math.max(5,nElementsInView-5);_this_.render();}});
			//add the overview paths that might be later used. Beware that the path also initializes the normalized values. So when overview is disabled d is not returned. But the path node exists.
			d3.select("#"+ID).append("path").attr("id",function(){return ID+"_indicatorOverviewPath";}).attr("d",function(){valuesMax = Math.max(Math.abs(_realMax_ = d3.max(_values_)),Math.abs(_realMin_ = d3.min(_values_))); _valuesNormalized_ = _values_.map(function(d,i){return d/valuesMax;}); _normalizedMax_ = d3.max(_valuesNormalized_); _normalizedMin_ = d3.min(_valuesNormalized_); _this_.chunkValues(); _phantomNormalized_ = _phantom_.map(function(d,i){return d/valuesMax;});_this_.chunkPhantom(); /*the remaining is about path data*/ if(_renderOverview){var valuesBinned = _this_.simpleBin(_values_,1000); var valuesBinnedMax = Math.max(Math.abs(d3.max(valuesBinned)),Math.abs(d3.min(valuesBinned))); var points = []; for(var i=0;i<valuesBinned.length;i++){points[i]=[Math.round(attrX+padding+0.9*attrW*i/(valuesBinned.length-1)),Math.round(attrY+attrH*0.9+vShiftIndicator*attrH+0.025*attrH-valuesBinned[i]/valuesBinnedMax*0.075*attrH)];} points.unshift([attrX+padding,attrY+attrH*0.9+vShiftIndicator*attrH+0.025*attrH]); points.push([attrX+padding+0.9*attrW,attrY+attrH*0.9+vShiftIndicator*attrH+0.025*attrH]) ;return line(points)+"Z";}}).attr("fill","GoldenRod").attr("fill-opacity",0.6).attr("stroke",overviewLineColor).attr("stroke-linejoin","round").attr("stroke-width",1);
			//mid axis line
			d3.select("#"+ID).append("path").attr("id",function(){return ID+"_midAxisLine";}).attr("class","global_lexMainAxes").attr("fill","none").attr("fill-opacity",0).attr("stroke-linejoin","round").attr("stroke-width",2);
			//attach the indicator
			this.renderIndicator();
			//attach zoom and window handlers for firefox and other browsers that fail to detect wheel events
			//zoom
			d3.select("#"+ID).append("text").text("zoom:").attr("x",attrX+attrW*0.85).attr("dx",0).attr("y",attrY+padding*_fontConstant_).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/30*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","default");
				//zoom-in
			d3.select("#"+ID).append("g").attr("id",ID+"_lexZoomin").style("cursor","pointer").attr("class","global_lexZoomin_groups")
			.on("mouseover",function(){
				d3.select("#"+ID+"_lexZoomin_circle").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+"_lexZoomin_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_lexZoomin_circle").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+"_lexZoomin_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(){
				_this_.smoothRender(Math.max(5,nElementsInView/2),offset,0,1000);
			});
			d3.select("#"+ID+"_lexZoomin").append("circle").attr("id",ID+"_lexZoomin_circle").attr("cx",attrX+attrW*0.92).attr("cy",attrY+(padding-attrW/80)*_fontConstant_).attr("r",attrW/60*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexZoomin").append("text").text("2x").attr("id",ID+"_lexZoomin_text").attr("x",attrX+attrW*0.92).attr("dx",0).attr("y",attrY+padding*_fontConstant_).attr("dy",-attrW/180*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1);
				//zoom-out
			d3.select("#"+ID).append("g").attr("id",ID+"_lexZoomout").style("cursor","pointer").attr("class","global_lexZoomout_groups")
			.on("mouseover",function(){
				d3.select("#"+ID+"_lexZoomout_circle").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+"_lexZoomout_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_lexZoomout_circle").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+"_lexZoomout_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(){
				_this_.smoothRender(Math.min(maxZoom,nElementsInView*2),offset,0,1000);
			});
			d3.select("#"+ID+"_lexZoomout").append("circle").attr("id",ID+"_lexZoomout_circle").attr("cx",attrX+attrW*0.96).attr("cy",attrY+(padding-attrW/80)*_fontConstant_).attr("r",attrW/60*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexZoomout").append("text").text(".5x").attr("id",ID+"_lexZoomout_text").attr("x",attrX+attrW*0.96).attr("dx",0).attr("y",attrY+padding*_fontConstant_).attr("dy",-attrW/180*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1);
			//window
			d3.select("#"+ID).append("text").text("window:").attr("x",function(){if(_orientWindow!=="top"){return attrX+attrW*0.85;}else{return attrX+attrW*0.5}}).attr("dx",0).attr("y",function(){if(_orientWindow!=="top"){return attrY+padding+attrW/10;}else{return attrY+padding*_fontConstant_;}}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/30*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","default");
				//decrease window
			d3.select("#"+ID).append("g").attr("id",ID+"_lexWindowbackward").style("cursor","pointer").attr("class","global_lexWindowbackward_groups")
			.on("mouseover",function(){
				d3.select("#"+ID+"_lexWindowbackward_circle").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+"_lexWindowbackward_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_lexWindowbackward_circle").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+"_lexWindowbackward_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(){
				_this_.smoothRender(nElementsInView,Math.min(_data_.length-1,Math.max(0,offset-_data_.length/5)),0,1000);
			});
			d3.select("#"+ID+"_lexWindowbackward").append("circle").attr("id",ID+"_lexWindowbackward_circle").attr("cx",function(){if(_orientWindow!=="top"){return attrX+attrW*0.92;}else{return attrX+attrW*0.57;}}).attr("cy",function(){if(_orientWindow!=="top"){return attrY+padding-attrW/80*_fontConstant_+attrW/10;}else{return attrY+(padding-attrW/80)*_fontConstant_;}}).attr("r",attrW/60*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexWindowbackward").append("text").text("<<").attr("id",ID+"_lexWindowbackward_text").attr("x",function(){if(_orientWindow!=="top"){return attrX+attrW*0.92;}else{return attrX+attrW*0.57;}}).attr("dx",0).attr("y",function(){if(_orientWindow!=="top"){return attrY+padding+attrW/10;}else{return attrY+padding*_fontConstant_;}}).attr("dy",-attrW/180*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1);
				//increase window
			d3.select("#"+ID).append("g").attr("id",ID+"_lexWindowforward").style("cursor","pointer").attr("class","global_lexWindowforward_groups")
			.on("mouseover",function(){
				d3.select("#"+ID+"_lexWindowforward_circle").transition().attr("fill",_controllerColors_[6]).delay(0).duration(250);
				d3.select("#"+ID+"_lexWindowforward_text").transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(250);
			})
			.on("mouseout",function(){
				d3.select("#"+ID+"_lexWindowforward_circle").transition().attr("fill",_controllerColors_[2]).delay(0).duration(250);
				d3.select("#"+ID+"_lexWindowforward_text").transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(250);
			})
			.on("click",function(){
				_this_.smoothRender(nElementsInView,Math.min(_data_.length-1,Math.max(0,offset+_data_.length/5)),0,1000);
			});
			d3.select("#"+ID+"_lexWindowforward").append("circle").attr("id",ID+"_lexWindowforward_circle").attr("cx",function(){if(_orientWindow!=="top"){return attrX+attrW*0.96;}else{return attrX+attrW*0.61;}}).attr("cy",function(){if(_orientWindow!=="top"){return attrY+padding-attrW/80*_fontConstant_+attrW/10;}else{return attrY+(padding-attrW/80)*_fontConstant_;}}).attr("r",attrW/60*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexWindowforward").append("text").text(">>").attr("id",ID+"_lexWindowforward_text").attr("x",function(){if(_orientWindow!=="top"){return attrX+attrW*0.96;}else{return attrX+attrW*0.61;}}).attr("dx",0).attr("y",function(){if(_orientWindow!=="top"){return attrY+padding+attrW/10;}else{return attrY+padding*_fontConstant_;}}).attr("dy",-attrW/180*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1);
			//mode
			d3.select("#"+ID).append("text").text("[mode]").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
			.on("click",function(){_this_.changeMode();});
			//color
			d3.select("#"+ID).append("text").text("[color]").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.075}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
			.on("click",function(){_this_.changeColor();});
			//bin
			d3.select("#"+ID).append("text").text("bin:").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.15}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer");
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
				_this_.binValues(1/2);
			});
			d3.select("#"+ID+"_lexBinHalf").append("circle").attr("id",ID+"_lexBinHalf_circle").attr("cx",function(){return attrX+padding+attrW*0.175;}).attr("cy",function(){return attrY+(padding-attrW/160)*_fontConstant_;}).attr("r",attrW/120*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexBinHalf").append("text").text("<<").attr("id",ID+"_lexBinHalf_text").attr("x",function(){return attrX+padding+attrW*0.175;}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",-attrW/400*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/60*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1); 
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
				_this_.binValues(2);
			});
			d3.select("#"+ID+"_lexBinDouble").append("circle").attr("id",ID+"_lexBinDouble_circle").attr("cx",function(){return attrX+padding+attrW*0.192;}).attr("cy",function(){return attrY+(padding-attrW/160)*_fontConstant_;}).attr("r",attrW/120*_fontConstant_).attr("fill",_controllerColors_[2]).attr("stroke",_controllerColors_[3]).attr("stroke-width",1);
			d3.select("#"+ID+"_lexBinDouble").append("text").text(">>").attr("id",ID+"_lexBinDouble_text").attr("x",function(){return attrX+padding+attrW*0.192;}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",-attrW/400*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/60*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1); 
			//compress
			d3.select("#"+ID).append("text").text("[compress]").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.25}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
			.on("click",function(){_this_.binCompression();});
			
			//compare
			if (_phantom_.length !== 0) {
				d3.select("#"+ID).append("text").text("[compare]").attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.325}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
				.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
				.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
				.on("click",function(){showPhantom = showPhantom === false?true:false; _this_.render(); });
			}
			
			//scale
			d3.select("#"+ID).append("text").text(function(){return "scale:["+scaleMode[0]+"]";}).attr("class","global_lexPlotControls").attr("x",function(){return attrX+padding+attrW*0.67}).attr("dx",0).attr("y",function(){return attrY+padding*_fontConstant_;}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",1).style("cursor","pointer")
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).attr("stroke",_controllerColors_[5]).delay(0).duration(1000)})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).delay(0).duration(1000)})
			.on("click",function(){_this_.transformScale();this.textContent = scaleMode[0];});
			
			//***Markers***
			d3.select("#"+ID).append("svg:defs").attr("id",ID+"_extras");
			d3.select("#"+ID+"_extras").append("marker").attr("id",ID+"_markerArrow").attr("markerWidth",15).attr("markerHeight",15).attr("refX",4).attr("refY",6).attr("orient","auto").attr("markerUnits","userSpaceOnUse");
			d3.select("#"+ID+"_markerArrow").append("path").attr("id",ID+"_markerArrowPath").attr("d","M0,0 L8,6 L0,12 L0,9 L4,6 L0,3 L0,0 Z").attr("fill","GoldenRod").attr("fill-opacity",0.8).attr("stroke-width",0).attr("stroke-opacity",0).attr("stroke","Black").attr("stroke-linejoin","round");
			//***Markers***
			
			//AA composition
			d3.select("#"+ID).append("text").text("AA composition").attr("id",ID+"_composition_text").attr("class","global_composition_texts").style("cursor","pointer").attr("visibility",function(){return _renderComposition===true?"visible":"hidden";}).attr("x",attrX+padding).attr("dx",0).attr("y",attrY+padding+attrW/10).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","start").attr("font-size",attrW/30*_fontConstant_).attr("fill-opacity",1).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",0)
			.on("click",function(){
				var theController = this;
				d3.select(this).transition().attr("x",0).attr("fill-opacity",0).delay(0).duration(1000);
				var AAs = d3.keys(aminoacidsX).sort();
				AAs.splice(-2,1);
				var result = _this_.calculateComposition();
				//calculate the max value
				var maxResult = 0;
				for (var i=0;i<AAs.length;i++){
					maxResult = result[AAs[i]]>maxResult?result[AAs[i]]:maxResult;
				}
				//configure axis
				var scale = d3.scale.linear().domain([0,maxResult/_data_.length]).range([attrY+padding+attrW/10+attrH/10,attrY+padding+attrW/10]);
				var axis = d3.svg.axis().scale(scale).orient("left").ticks(3).tickSize(20*attrW/50,0).tickPadding(10).tickFormat(d3.format("%"));
				d3.select("#"+ID).append("g").attr("id",ID+"_lexComp").attr("class","global_lexCompGroups").attr("transform","scale(0.1,0.1)").transition("enlarge").each("end",function(){d3.selectAll("."+ID+"_lexCompAnnotations").transition("fadein").style("opacity",1).delay(0).duration(1000);}).attr("transform","scale(1,1)").delay(0).duration(1000);
				d3.select("#"+ID+"_lexComp").append("g").attr("transform","translate("+(attrX+padding+20*attrW/50)+",0)").call(axis);
				//bars
				d3.select("#"+ID+"_lexComp").selectAll("compElements")
				.data(AAs)
				.enter()
				.append("rect")
				.attr("x",function(d,i){return attrX+padding+i*attrW/50;})
				.attr("y",function(d,i){return attrY+padding+attrW/10+attrH/10;})
				.attr("width",function(d,i){return attrW/75;})
				.attr("rx",attrW/75*0.1)
				.attr("ry",attrW/75*0.1)
				.attr("height",function(d,i){return 0;})
				.attr("fill",function(d,i){var r = Math.round(255*result[d]/maxResult); var b = Math.round(255*(1-result[d]/maxResult)); return "rgb("+r+",20,"+b+")";})
				.attr("fill-opacity",0.8)
				.attr("stroke-width",0)
				.on("mouseover",function(d,i){
					d3.select(this).transition().attr("transform",function(){var x = (attrX+padding+i*attrW/50)*0.4/1.4; var y = (attrY+padding+attrW/10+attrH/10*(1-result[d]/maxResult))*0.4/1.4; return "scale(1.4,1.4) translate("+-x+","+-y+")";}).delay(0).duration(250);
					d3.select("#"+ID+"_lexCompText"+i).transition().ease("elastic").attr("transform",function(){var x = (attrX+padding+i*attrW/50)*0.4/1.4; var y = (attrY+padding+attrW/10+attrH/10*(1-result[d]/maxResult))*0.3/1.4; return "scale(1.4,1.4) translate("+-x+","+-y+")";}).delay(0).duration(750);
					d3.select("#"+ID+"_lexCompCount"+i).transition().ease("elastic").attr("transform",function(){var init = d3.select(this).attr("transform"); var x = (attrX+padding+i*attrW/50)*0.4/1.4-attrW/60; var y = (attrY+padding+attrW/10+attrH/10*(1-result[d]/maxResult))*0.45/1.4; return init+" scale(1.4,1.4) translate("+-x+","+-y+")";}).delay(0).duration(750);
				})
				.on("mouseout",function(d,i){
					d3.select(this).transition().attr("transform","scale(1,1)").delay(0).duration(250);
					d3.select("#"+ID+"_lexCompText"+i).transition().ease("elastic").attr("transform","scale(1,1)").delay(0).duration(750);
					var init = "rotate("+-45+","+(attrX+padding+i*attrW/50)+","+(attrY+padding+attrW/10)+")";
					d3.select("#"+ID+"_lexCompCount"+i).transition().ease("elastic").attr("transform",function(){return init}).delay(0).duration(750);
				})
				.on("click",function(){
					d3.select("#"+ID+"_lexComp").transition().each("end",function(){d3.select(this).remove();}).attr("transform","scale(0.01,0.01)").delay(0).duration(500);
					d3.select(theController).transition().attr("x",attrX+padding).attr("fill-opacity",1).delay(0).duration(1000);
				})
				.transition()
				.ease("elastic")
				.attr("height",function(d,i){return attrH/10*result[d]/maxResult;})
				.attr("y",function(d,i){return attrY+padding+attrW/10+attrH/10*(1-result[d]/maxResult);})
				.delay(function(d,i){return 1000+50*i;})
				.duration(1000);
				//AAs texts
				d3.select("#"+ID+"_lexComp").selectAll("compElements")
				.data(AAs)
				.enter()
				.append("text")
				.text(function(d,i){return d;})
				.attr("x",function(d,i){return attrX+padding+i*attrW/50;;})
				.attr("dx",attrW/120)
				.attr("y",function(d,i){return attrY+padding+attrW/10+attrH/10;})
				.attr("dy",attrW/60)
				.style("opacity",0)
				.attr("fill",_controllerColors_[0])
				.attr("fill-opacity",0.9)
				.attr("stroke",_controllerColors_[1])
				.attr("stroke-opacity",0.9)
				.attr("stroke-width",1)
				.attr("font-size",attrW/60)
				.attr("font-family","sans-serif")
				.attr("font-weight",300)
				.attr("text-anchor","middle")
				.attr("id",function(d,i){return ID+"_lexCompText"+i;})
				.attr("class",ID+"_lexCompAnnotations global_lexCompAnnotations");
				//Counts
				d3.select("#"+ID+"_lexComp").selectAll("compElements")
				.data(AAs)
				.enter()
				.append("text")
				.text(function(d,i){return result[d];})
				.attr("x",function(d,i){return attrX+padding+i*attrW/50;})
				.attr("dx",attrW/30)
				.attr("y",function(d,i){return attrY+padding+attrW/10;})
				.attr("dy",-attrW/60)
				.style("opacity",0)
				.attr("fill",_controllerColors_[0])
				.attr("fill-opacity",0.9)
				.attr("stroke",_controllerColors_[1])
				.attr("stroke-opacity",0.9)
				.attr("stroke-width",1)
				.attr("font-size",attrW/60)
				.attr("font-family","sans-serif")
				.attr("font-weight",300)
				.attr("text-anchor","middle")
				.attr("transform",function(d,i){return "rotate("+-45+","+(attrX+padding+i*attrW/50)+","+(attrY+padding+attrW/10)+")"})
				.attr("id",function(d,i){return ID+"_lexCompCount"+i;})
				.attr("class",ID+"_lexCompAnnotations global_lexCompAnnotations");
			});
			//AA composition
			
			//SUBMIT SEQUENCE
			d3.select("#"+ID).append("text").text(_submitText).attr("id",ID+"_submit_text").attr("class","global_submit_texts").style("cursor","pointer").attr("x",attrX+attrW/2).attr("dx",0).attr("y",function(){if(_orientSubmit!=="bottom"){return attrY+padding*_fontConstant_;}else{return attrY+attrH-2;}}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill",_controllerColors_[4]).attr("fill-opacity",0.75).attr("stroke",_controllerColors_[5]).attr("stroke-width",1)
			.on("mouseover",function(d,i){d3.select(this).transition().attr("fill-opacity",0.9).attr("stroke-width",2).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select(this).transition().attr("fill-opacity",0.75).attr("stroke-width",1).delay(0).duration(250);})
			.on("click",function(d,i){
				submitF(_seq_,_data_,_muts_);
			});
			
			//configure Main axes
				//horizontal
			scaleMainBot.range([attrX,attrX+attrW]).nice();
			axisMainBot = d3.svg.axis().scale(scaleMainBot).orient("bottom").ticks(3).tickSize(attrH/25,0).tickPadding(10);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexMainAxisBot").attr("class","global_lexMainAxes").attr("transform","translate(0,"+(attrY+padding+0.6*(attrH-2*padding)+vShift*attrH)+")").call(axisMainBot);
				//vertical
			scaleMainLeft = d3.scale.linear().domain([-valuesMax,valuesMax]).range([0,0]);
			axisMainLeft = d3.svg.axis().scale(scaleMainLeft).orient("left").ticks(5).tickSize(-attrW/50,0).tickPadding(0);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexMainAxisLeft").attr("class","global_lexMainAxes").attr("transform","translate("+attrW/25+","+(attrY+padding+0.6*(attrH-2*padding)+vShift*attrH)+")").call(axisMainLeft);
			return this;
		}

		//render related variables and the main function
		var nElementsInView = 30;
		var scaleMainBot = d3.scale.linear().domain([offset+0.5,offset+nElementsInView+2*padding/(attrW-2*padding)*nElementsInView+0.5]).range([0,attrW]).nice();
		var axisMainBot = d3.svg.axis().scale(scaleMainBot).orient("bottom").ticks(3).tickSize(attrH/25,0).tickPadding(10);
		var scaleMainLeft = d3.scale.linear().domain([-valuesMax,valuesMax]).range([0,0]).nice();
		var axisMainLeft = d3.svg.axis().scale(scaleMainLeft).orient("left").ticks(5).tickSize(-attrW/50,0).tickPadding(0);
		var barWidth = attrW*0.01;
		var barHeight = attrH*0.1;
		var spanWidth = Math.max(0,Math.min(nElementsInView+2*padding/(attrW-2*padding)*nElementsInView,_data_.length)/_data_.length*attrW*0.9-barWidth);
		//resusable arrays for AA reference
		var aaSymbols = {Nonpolar:"Gray",Polar:"DeepPink",Positive:"Red",Negative:"Blue",Aromatic:"Green",Stop:"Orange"};
		var aminoacidsX = {"A":["Alanine","Nonpolar"],"R":["Arginine","Positive"],"N":["Asparagine","Polar"],"D":["Aspartic-Acid","Negative"],"C":["Cysteine","Polar"],"Q":["Glutamine","Polar"],"E":["Glutamic-Acid","Negative"],"G":["Glycine","Nonpolar"],"H":["Histidine","Positive"],"I":["Isoleucine","Nonpolar"],"L":["Leucine","Nonpolar"],"K":["Lysine","Positive"],"M":["Methionine","Nonpolar"],"F":["Phenylalanine","Aromatic"],"P":["Proline","Nonpolar"],"S":["Serine","Polar"],"T":["Threonine","Polar"],"W":["Tryptophan","Aromatic"],"Y":["Tyrosine","Aromatic"],"V":["Valine","Nonpolar"],"X":["Stop","Stop"]};
		var aminoacids_OtherProperties = {"A":["Hydrophobic","Aliphatic"],"R":["Hydrophilic","H-bonding","Basic","Ionizable"],"N":["Hydrophilic"],"D":["Hydrophilic","H-bonding","Acidic","Ionizable"],"C":["Hydrophilic","H-bonding","Sulfur-containing","Acidic","Ionizable","Disulfide-bond"],"Q":["Hydrophilic","H-bonding"],"E":["Hydrophilic","H-bonding","Acidic","Ionizable"],"G":["Hydrophobic","Aliphatic"],"H":["Hydrophilic","H-bonding","Basic","Ionizable","All-aromatic"],"I":["Hydrophobic","Aliphatic"],"L":["Hydrophobic","Aliphatic"],"K":["Hydrophilic","H-bonding","Basic","Ionizable"],"M":["Hydrophobic","Sulfur-containing"],"F":["Hydrophobic","All-aromatic"],"P":["Hydrophobic","Aliphatic","Cyclic"],"S":["Hydrophilic","H-bonding"],"T":["Hydrophilic","H-bonding"],"W":["Hydrophobic","H-bonding","All-aromatic"],"Y":["Hydrophobic","H-bonding","Ionizable","All-aromatic"],"V":["Hydrophobic","Aliphatic"]};
		
		this.displayOverview = function(){var result = {}; for(i=0;i<_data_.length;i++){result[i]=[_data_[i],_values_[i]];} console.log(JSON.stringify(result));};
		this.calculateComposition = function(){
			var AAs = d3.keys(aminoacidsX).sort();
			AAs.splice(-2,1);
			var result = {};
			for (var i=0;i<AAs.length;i++){
				result[AAs[i]] = 0;
			}
			for (var i=0;i<_data_.length;i++){
				var matched = AAs.filter(function(d){return d===_data_[i];})[0];
				result[matched]++;
			}
			return result;
		};
		this.resetAssignedAnimations = function(){
			var animKeys = d3.keys(_assignedAnimations_).filter(function(d,i){return !(d.match(/status/gi));});
			for (var i=0;i<animKeys.length;i++){
				clearInterval(_assignedAnimations_[animKeys[i]]);
				_assignedAnimations_[animKeys[i]+"_status"] = 0;
			}
			_assignedAnimations_ = {};
		}
		this.render = function (issuer) {
			issuer = issuer===undefined?_this_:issuer;
			offset = Math.min(Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView),Math.max(0,offset));
			//below variable be better updated again inside so that they are properly set by the time the render function is called.
			var sPadding = (attrW-2*padding)/nElementsInView*0.05;
			var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
			var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
			
			//update background - disabled to shave off some performance
			//d3.select("#"+ID+"_rect").transition("updateBackgroundColor").attr("fill",bColor).delay(0).duration(250);
			
			//clear before redraw - only tag removal is necessary
			//d3.selectAll("."+ID+"_lexPlotElements").remove();
			d3.selectAll("."+ID+"_lexPlotElementTags").remove();
			//d3.selectAll("."+ID+"_lexSeqElementsMutTexts").remove();
			//the data
			var chunkIndex = Math.min(Math.floor(offset/extent[0]),Math.ceil((_data_.length-extent[1])/extent[0]));
			var chunkOffset = offset-chunkIndex*extent[0];
			var data = dataChunk[chunkIndex];
			data = data.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var mutData = d3.keys(_muts_).filter(function (d,i) {var x = attrX+(d-1-offset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			//remove animations that are out of sight and refresh ones if not running already
			var animKeys = d3.keys(_assignedAnimations_).filter(function(d,i){return !(d.match(/status/gi));});
			(function(){
				for (var i=0;i<animKeys.length;i++){
					var x = attrX+(animKeys[i]-1-offset)*(elemWidth+sPadding);
					if (x<(attrX-(elemWidth+sPadding)) || x>attrX+attrW+(elemWidth+sPadding)) {
						clearInterval(_assignedAnimations_[animKeys[i]]);
						_assignedAnimations_[animKeys[i]+"_status"] = 0;
					} else if (_assignedAnimations_[animKeys[i]+"_status"] === 0) {
						_this_.arrow(animKeys[i]);
						_assignedAnimations_[animKeys[i]] = setInterval(function(){if(!document.hidden){_this_.arrow(arguments[0])}else{clearInterval(_assignedAnimations_[arguments[0]]);_assignedAnimations_[arguments[0]+"_status"] = 0;}},1000,animKeys[i]);
						_assignedAnimations_[animKeys[i]+"_status"] = 1;
					}
				}
			})();
			var dataValues = valuesChunk[chunkIndex];
			dataValues = dataValues.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var phantomValues = showPhantom === false? [] : phantomChunk[chunkIndex];
			phantomValues = phantomValues.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var maxValueIndex = dataValues.length-1;
			var base = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH+elemHeight/2;
			//##########SCALE RELATED##########
			if (scaleMode[0] === "min,max") {
				dataValues = dataValues.map(function(d,i){return (d-_normalizedMin_)/(_normalizedMax_-_normalizedMin_)*2;});
				phantomValues = phantomValues.map(function(d,i){return (d-_normalizedMin_)/(_normalizedMax_-_normalizedMin_)*2;});
				base += elemHeight;
			}
			if (scaleMode[0] === "min,max") {
				scaleMainLeft.domain([_realMin_,_realMax_]).range([elemHeight,-elemHeight]);
				d3.select("#"+ID+"_lexMainAxisLeft").attr("transform","translate("+attrW/25+","+(attrY+padding+0.6*(attrH-2*padding)+vShift*attrH+elemHeight/2)+")").call(axisMainLeft);
			} else {
				scaleMainLeft.domain([-valuesMax,valuesMax]).range([elemHeight,-elemHeight]);
				d3.select("#"+ID+"_lexMainAxisLeft").attr("transform","translate("+attrW/25+","+(attrY+padding+0.6*(attrH-2*padding)+vShift*attrH+elemHeight/2)+")").call(axisMainLeft);
			}
			scaleMainBot.domain([offset+0.5,offset+nElementsInView+2*padding/(attrW-2*padding)*nElementsInView+0.5]);
			d3.select("#"+ID+"_lexMainAxisBot").attr("transform","translate(0,"+base+")").call(axisMainBot);
			//##########SCALE RELATED##########
			
			var structures = structureChunk[chunkIndex];
			structures = structures.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var phantomStructures = showPhantom === false? [] : phantomStructureChunk[chunkIndex];
			phantomStructures = phantomStructures.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			//mid axis line
			d3.select("#"+ID+"_midAxisLine").attr("d",line([[attrX,base],[attrX+attrW,base]]));
			//Bins - ENTER
			d3.select("#"+ID).selectAll("."+ID+"_lexPlotElements")
			.data(dataValues)
			.enter()
			.append("path")
			.attr("d",function(d,i){
				if (renderMode[0]==="line") {
					return _this_.generateBin(dataValues[Math.max(0,i-1)],d,dataValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="histogram") {
					return _this_.generateBin(d,d,d,i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="glyph") {
					return aminoacidsX_renderMethods[data[i]](dataValues[Math.max(0,i-1)],d,dataValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else {
					return _drawSS_[structures[i][0]](structures[i],i,elemWidth*1/0.95,elemHeight,offset,base);
				}
			})
			.attr("stroke-linejoin","round")
			.attr("fill",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return binColor;}else{return colorMode[0][structures[i][0]]}})
			.attr("fill-opacity",0.7)
			//.attr("stroke",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return binColor;}else{return colorMode[0][structures[i][0]]}})
			//.attr("stroke","AntiqueWhite")
			//.attr("stroke-opacity",0.7)
			//.attr("stroke-width",function(){if(renderMode[0]==="structures"){return 0;}else{return 0;}})
			.attr("stroke-width",0)
			.attr("class",ID+"_lexPlotElements")
			.attr("id",function(d,i){return ID+"_lexPlotElement"+i;})
			.on("mouseover",function(d,i){
				if (!(d3.select("#"+ID+"_lexPlotElement"+i+"_tag").node())) {
					d3.selectAll("."+ID+"_lexPlotElementTags").remove();
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPlotElement"+i+"_tag";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("stroke-width",0).attr("fill",tagColor).attr("fill-opacity",0.65).attr("d",function(){return _this_.generateBin(0,0,0,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition("pop").ease("elastic").attr("d",function(){return _this_.generateBin(d*0.81,d*0.9,d*0.81,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return data[i];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_AA";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",-Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return _values_[(i+Math.floor(offset))];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_value";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
				}
			});
			//Bins - EXIT
			d3.select("#"+ID).selectAll("."+ID+"_lexPlotElements")
			.data(dataValues)
			.exit()
			.remove();
			//Bins - UPDATE
			d3.select("#"+ID).selectAll("."+ID+"_lexPlotElements")
			.data(dataValues)
			.attr("d",function(d,i){
				if (renderMode[0]==="line") {
					return _this_.generateBin(dataValues[Math.max(0,i-1)],d,dataValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="histogram") {
					return _this_.generateBin(d,d,d,i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="glyph") {
					return aminoacidsX_renderMethods[data[i]](dataValues[Math.max(0,i-1)],d,dataValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else {
					return _drawSS_[structures[i][0]](structures[i],i,elemWidth*1/0.95,elemHeight,offset,base);
				}
			})
			.attr("fill",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return binColor;}else{return colorMode[0][structures[i][0]]}})
			.attr("id",function(d,i){return ID+"_lexPlotElement"+i;})
			.on("mouseover",function(d,i){
				if (!(d3.select("#"+ID+"_lexPlotElement"+i+"_tag").node())) {
					d3.selectAll("."+ID+"_lexPlotElementTags").remove();
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPlotElement"+i+"_tag";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("stroke-width",0).attr("fill",tagColor).attr("fill-opacity",0.65).attr("d",function(){return _this_.generateBin(0,0,0,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition("pop").ease("elastic").attr("d",function(){return _this_.generateBin(d*0.81,d*0.9,d*0.81,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return data[i];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_AA";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",-Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return _values_[(i+Math.floor(offset))];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_value";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
				}
			});
			//***PHANTOMS***
			//Bins - ENTER
			d3.select("#"+ID).selectAll("."+ID+"_lexPhantomElements")
			.data(phantomValues)
			.enter()
			.append("path")
			.attr("d",function(d,i){
				if (renderMode[0]==="line") {
					return _this_.generateBin(phantomValues[Math.max(0,i-1)],d,phantomValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="histogram") {
					return _this_.generateBin(d,d,d,i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="glyph") {
					return aminoacidsX_renderMethods[data[i]](phantomValues[Math.max(0,i-1)],d,phantomValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else {
					return _drawSS_[phantomStructures[i][0]](phantomStructures[i],i,elemWidth*1/0.95,elemHeight,offset,base);
				}
			})
			.attr("stroke-linejoin","round")
			.attr("fill",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return phantomColor;}else{return colorMode[0][phantomStructures[i][0]]}})
			.attr("fill-opacity",0.4)
			//.attr("stroke",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return binColor;}else{return colorMode[0][structures[i][0]]}})
			//.attr("stroke","AntiqueWhite")
			//.attr("stroke-opacity",0.7)
			//.attr("stroke-width",function(){if(renderMode[0]==="structures"){return 0;}else{return 0;}})
			.attr("stroke-width",0)
			.attr("class",ID+"_lexPhantomElements")
			.attr("id",function(d,i){return ID+"_lexPhantomElement"+i;})
			.on("mouseover",function(d,i){
				if (!(d3.select("#"+ID+"_lexPhantomElement"+i+"_tag").node())) {
					d3.selectAll("."+ID+"_lexPlotElementTags").remove();
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPhantomElement"+i+"_tag";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("stroke-width",0).attr("fill",tagColor).attr("fill-opacity",0.65).attr("d",function(){return _this_.generateBin(0,0,0,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition("pop").ease("elastic").attr("d",function(){return _this_.generateBin(d*0.81,d*0.9,d*0.81,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return data[i];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_AA";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",-Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return _phantom_[(i+Math.floor(offset))];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_value";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
				}
			});
			//Bins - EXIT
			d3.select("#"+ID).selectAll("."+ID+"_lexPhantomElements")
			.data(phantomValues)
			.exit()
			.remove();
			//Bins - UPDATE
			d3.select("#"+ID).selectAll("."+ID+"_lexPhantomElements")
			.data(phantomValues)
			.attr("d",function(d,i){
				if (renderMode[0]==="line") {
					return _this_.generateBin(phantomValues[Math.max(0,i-1)],d,phantomValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="histogram") {
					return _this_.generateBin(d,d,d,i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="glyph") {
					return aminoacidsX_renderMethods[data[i]](phantomValues[Math.max(0,i-1)],d,phantomValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else {
					return _drawSS_[phantomStructures[i][0]](phantomStructures[i],i,elemWidth*1/0.95,elemHeight,offset,base);
				}
			})
			.attr("fill",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return phantomColor;}else{return colorMode[0][phantomStructures[i][0]]}})
			.attr("id",function(d,i){return ID+"_lexPhantomElement"+i;})
			.on("mouseover",function(d,i){
				if (!(d3.select("#"+ID+"_lexPhantomElement"+i+"_tag").node())) {
					d3.selectAll("."+ID+"_lexPlotElementTags").remove();
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPhantomElement"+i+"_tag";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("stroke-width",0).attr("fill",tagColor).attr("fill-opacity",0.65).attr("d",function(){return _this_.generateBin(0,0,0,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition("pop").ease("elastic").attr("d",function(){return _this_.generateBin(d*0.81,d*0.9,d*0.81,i,elemWidth*1/0.95,elemHeight,offset,base,0);}).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return data[i];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_AA";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",-Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
					d3.select("#"+ID).append("text").text(function(){return _phantom_[(i+Math.floor(offset))];}).attr("id",function(){return ID+"_lexPlotElement"+i+"_value";}).attr("class",function(){return ID+"_lexPlotElementTags global_lexPlotElementTags"}).attr("x",function(){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);}).attr("dx",elemWidth/2).attr("y",base).attr("dy",Math.min(elemWidth,elemHeight)/2).attr("fill",tagLabelColor).attr("fill-opacity",0.9).attr("stroke",tagLabelColor).attr("stroke-opacity",0.9).attr("stroke-width",1).attr("font-size",function(){return Math.min(elemWidth,elemHeight)/2;}).attr("font-family","sans-serif").attr("font-weight",300).attr("text-anchor","middle").style("cursor","pointer").on("click",function(){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(data[i]+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}})
					.transition().ease("elastic").attr("y",base-0.81*d*elemHeight).delay(0).duration(500);
				}
			});
			//***PHANTOMS***
			//Muts if any
				//Circles::have the same global class as below text elements - ENTER
				d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsMutCircles")
				.data(mutData)
				.enter()
				.append("circle")
				.attr("cx",function(d,i){return attrX+(d-Math.floor(offset)-0.5-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
				.attr("cy",function(d,i){return attrY+padding+0.3*(attrH-2*padding)+vShift*attrH+elemWidth/4;})
				.attr("r",elemWidth/2)
				.attr("fill",function(d,i){if(!(_muts_[d].match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[_muts_[d]][1]];} else {return "Black";}})
				.attr("fill-opacity",0.9)
				.attr("stroke-opacity",0)
				.style("cursor","pointer")
				.attr("class",ID+"_lexSeqElementsMutCircles "+"global_lexSeqElementsMutTexts")
				.attr("id",function(d,i){return ID+"_lexSeqElementsMut"+i;})
				.on("mouseover",function(){d3.select(this).transition().ease("elastic").attr("r",elemWidth*3/4).delay(0).duration(500);})
				.on("mouseout",function(){d3.select(this).transition().ease("elastic").attr("r",elemWidth/2).delay(0).duration(500);})
				.on("click",function(d,i){
					var position = d;
					//clear animations
					delete _muts_[position];
					clearInterval(_assignedAnimations_[position]);
					delete _assignedAnimations_[position];
					_assignedAnimations_[position+"_status"] = 0;
					delete _assignedAnimations_[position+"_status"];
					//remove the bubble mutation
					d3.select(this).remove();
					d3.select("#"+ID+"_lexSeqElementsMutText"+i).remove();
				});
				//Circles::have the same global class as below text elements - EXIT
				d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsMutCircles")
				.data(mutData)
				.exit()
				.remove();
				//Circles::have the same global class as below text elements - UPDATE
				d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsMutCircles")
				.data(mutData)
				.attr("cx",function(d,i){return attrX+(d-Math.floor(offset)-0.5-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
				.attr("cy",function(d,i){return attrY+padding+0.3*(attrH-2*padding)+vShift*attrH+elemWidth/4;})
				.attr("r",elemWidth/2)
				.attr("fill",function(d,i){if(!(_muts_[d].match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[_muts_[d]][1]];} else {return "Black";}})
				.attr("id",function(d,i){return ID+"_lexSeqElementsMut"+i;})
				.on("mouseover",function(){d3.select(this).transition().ease("elastic").attr("r",elemWidth*3/4).delay(0).duration(500);})
				.on("mouseout",function(){d3.select(this).transition().ease("elastic").attr("r",elemWidth/2).delay(0).duration(500);})
				.on("click",function(d,i){
					var position = d;
					//clear animations
					delete _muts_[position];
					clearInterval(_assignedAnimations_[position]);
					delete _assignedAnimations_[position];
					_assignedAnimations_[position+"_status"] = 0;
					delete _assignedAnimations_[position+"_status"];
					//remove the bubble mutation
					d3.select(this).remove();
					d3.select("#"+ID+"_lexSeqElementsMutText"+i).remove();
				});
				//Texts - ENTER
				d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsMutTexts")
				.data(mutData)
				.enter()
				.append("text")
				.text(function(d,i){return _muts_[d];})
				.attr("x",function(d,i){return attrX+(d-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
				.attr("dx",elemWidth/2)
				.attr("y",function(d,i){return attrY+padding+0.3*(attrH-2*padding)+vShift*attrH;})
				.attr("dy",elemWidth/4)
				.attr("fill","AntiqueWhite")
				.attr("fill-opacity",0.9)
				.attr("stroke","Black")
				.attr("stroke-opacity",0)
				.attr("stroke-width",0)
				.attr("font-size",elemWidth/2)
				.attr("font-family","sans-serif")
				.attr("font-weight",300)
				.attr("text-anchor","middle")
				.style("cursor","pointer")
				.attr("class",ID+"_lexSeqElementsMutTexts "+"global_lexSeqElementsMutTexts")
				.attr("id",function(d,i){return ID+"_lexSeqElementsMutText"+i;})
				.on("mouseover",function(d,i){d3.select("#"+ID+"_lexSeqElementsMut"+i).transition().ease("elastic").attr("r",elemWidth*3/4).delay(0).duration(500);})
				.on("mouseout",function(d,i){d3.select("#"+ID+"_lexSeqElementsMut"+i).transition().ease("elastic").attr("r",elemWidth/2).delay(0).duration(500);})
				.on("click",function(d,i){
					var position = d;
					//clear animations
					delete _muts_[position];
					clearInterval(_assignedAnimations_[position]);
					delete _assignedAnimations_[position];
					_assignedAnimations_[position+"_status"] = 0;
					delete _assignedAnimations_[position+"_status"];
					//remove the bubble mutation
					d3.select(this).remove();
					d3.select("#"+ID+"_lexSeqElementsMut"+i).remove();
				});
				//Texts - EXIT
				d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsMutTexts")
				.data(mutData)
				.exit()
				.remove();
				//Texts - UPDATE
				d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsMutTexts")
				.data(mutData)
				.text(function(d,i){return _muts_[d];})
				.attr("x",function(d,i){return attrX+(d-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
				.attr("dx",elemWidth/2)
				.attr("y",function(d,i){return attrY+padding+0.3*(attrH-2*padding)+vShift*attrH;})
				.attr("dy",elemWidth/4)
				.attr("font-size",elemWidth/2)
				.attr("id",function(d,i){return ID+"_lexSeqElementsMutText"+i;})
				.on("mouseover",function(d,i){d3.select("#"+ID+"_lexSeqElementsMut"+i).transition().ease("elastic").attr("r",elemWidth*3/4).delay(0).duration(500);})
				.on("mouseout",function(d,i){d3.select("#"+ID+"_lexSeqElementsMut"+i).transition().ease("elastic").attr("r",elemWidth/2).delay(0).duration(500);})
				.on("click",function(d,i){
					var position = d;
					//clear animations
					delete _muts_[position];
					clearInterval(_assignedAnimations_[position]);
					delete _assignedAnimations_[position];
					_assignedAnimations_[position+"_status"] = 0;
					delete _assignedAnimations_[position+"_status"];
					//remove the bubble mutation
					d3.select(this).remove();
					d3.select("#"+ID+"_lexSeqElementsMut"+i).remove();
				});
			//update Indicator&panel&markers
			this.updateIndicator();
			this.updatePanel(activeAA);
			this.updateArrow();
			this._sync_(issuer);
		}
		this.smoothRender = function (count,_offset_,delay,duration) {
			d3.select("#"+ID).transition("smoothRender").tween("smoothRender",function(){var interpolator = d3.interpolate(nElementsInView,count); var interpolatorOffSet = d3.interpolate(offset,_offset_); return function(t){nElementsInView = interpolator(t); offset = interpolatorOffSet(t); _this_.render();}}).delay(delay).duration(duration);
		}
		this.renderIndicator = function() {
			if (_renderIndicator===true){
				//same as the render padding of elements
				var sPadding = (attrW-2*padding)/nElementsInView*0.05;
				barWidth = attrW*0.01;
				barHeight = attrH*0.1;
				spanWidth = Math.max(0,Math.min(nElementsInView+2*padding/(attrW-2*padding)*nElementsInView,_data_.length)/_data_.length*attrW*0.9-barWidth);
				//main trail
				d3.select("#"+ID).append("rect").attr("id",function(){return ID+"_indicator";}).attr("class","global_lexIndicator_trails").style("cursor","pointer").attr("x",attrX+padding).attr("y",attrY+attrH*0.9+vShiftIndicator*attrH).attr("width",attrW*0.9).attr("height",attrH*0.05).attr("fill-opacity",0.6).attr("fill","LightBlue")
				.on("click",function(){
					var mouseX = d3.mouse(d3.select("#"+ID).node())[0];
					var min = attrX+padding+barWidth/2;
					var max = attrX+padding+attrW*0.9-spanWidth-barWidth/2;
					d3.select("#"+ID+"_indicatorSpanRegion").attr("x",Math.max(min,Math.min(mouseX,max)));
					var maxOffSet = Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView);
					offset = Math.min(maxOffSet,Math.max(0,(mouseX-min)/(max-min)*maxOffSet));
					_this_.render();
				});
				//2 bars and a span region
				d3.select("#"+ID).append("rect").attr("id",function(){return ID+"_indicatorLeftBar";}).attr("x",attrX+padding+offset/_data_.length*attrW*0.9-barWidth/2).attr("y",attrY+attrH*0.875+vShiftIndicator*attrH).attr("width",barWidth).attr("height",barHeight).attr("fill-opacity",0.6).attr("fill","Blue");
				d3.select("#"+ID).append("rect").attr("id",function(){return ID+"_indicatorRightBar";}).attr("x",attrX+padding+offset/_data_.length*attrW*0.9+spanWidth+barWidth/2).attr("y",attrY+attrH*0.875+vShiftIndicator*attrH).attr("width",barWidth).attr("height",barHeight).attr("fill-opacity",0.6).attr("fill","Blue");
				d3.select("#"+ID).append("rect").attr("id",function(){return ID+"_indicatorSpanRegion";}).attr("class","global_lexIndicator_spans").style("cursor","pointer").attr("x",attrX+padding+offset/_data_.length*attrW*0.9+barWidth/2).attr("y",attrY+attrH*0.875+vShiftIndicator*attrH).attr("width",spanWidth).attr("height",barHeight).attr("fill-opacity",0.2).attr("fill","DarkBlue");
				//path variables and the path itself
				var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
				var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
				var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
				var elemBotLine = elemY+elemHeight;
				//i/((W/W-2p)*E)*W = (W-2p)*i/E
				var minRightX = d3.selectAll("."+ID+"_lexPlotElements")[0].length !== 0 ? d3.selectAll("."+ID+"_lexPlotElements")[0].length*(attrW-2*padding)/nElementsInView: attrX+attrW;
				var pathPoints = [[attrX,elemBotLine],[attrX,elemBotLine+attrH*0.025],[+d3.select("#"+ID+"_indicatorLeftBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorLeftBar").attr("y")-0.025*attrH],[+d3.select("#"+ID+"_indicatorLeftBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorLeftBar").attr("y")],
				[+d3.select("#"+ID+"_indicatorRightBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorRightBar").attr("y")],[+d3.select("#"+ID+"_indicatorRightBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorRightBar").attr("y")-0.025*attrH],[minRightX,elemBotLine+attrH*0.025],[minRightX,elemBotLine]];
				d3.select("#"+ID).append("path").attr("id",function(){return ID+"_indicatorPath";}).attr("d",line(pathPoints)).attr("fill","Lime").attr("fill-opacity",0.1).attr("stroke","Lime").attr("stroke-linejoin","round").attr("stroke-width",sPadding);
				//add drag gesture to span element
				var drag = d3.behavior.drag().origin(function(){var x = +d3.select(this).attr("x"); var y = +d3.select(this).attr("y"); return {"x":x,"y":y};}).on("drag", dragFunc).on("dragstart",function (){d3.event.sourceEvent.stopPropagation();});
				function dragFunc() {
					//var mouseX = d3.mouse(d3.select("#"+ID).node())[0];
					var mouseX = d3.event.x;
					var min = attrX+padding+barWidth/2;
					var max = attrX+padding+attrW*0.9-spanWidth+barWidth/2;
					d3.select(this).attr("x",Math.max(min,Math.min(mouseX,max)));
					var maxOffSet = Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView);
					offset = Math.min(maxOffSet,Math.max(0,(mouseX-min)/(max-min)*maxOffSet));
					_this_.render();
				}
				d3.select("#"+ID+"_indicatorSpanRegion").call(drag);
			}
		}
		this.updateIndicator = function() {
			//same as the render padding of elements
			var sPadding = (attrW-2*padding)/nElementsInView*0.05;
			barWidth = attrW*0.01;
			barHeight = attrH*0.1;
			spanWidth = Math.max(0,Math.min(nElementsInView+2*padding/(attrW-2*padding)*nElementsInView,_data_.length)/_data_.length*attrW*0.9-barWidth);
			offset = Math.min(Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView),Math.max(0,offset));
			//2 bars and a span region
			d3.select("#"+ID+"_indicatorLeftBar").attr("x",attrX+padding+offset/_data_.length*attrW*0.9-barWidth/2);
			d3.select("#"+ID+"_indicatorRightBar").attr("x",attrX+padding+offset/_data_.length*attrW*0.9+spanWidth+barWidth/2);
			d3.select("#"+ID+"_indicatorSpanRegion").attr("x",attrX+padding+offset/_data_.length*attrW*0.9+barWidth/2).attr("width",spanWidth);
			//path variables and the path itself
			var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
			var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
			var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
			var elemBotLine = elemY+elemHeight;
			//i/((W/W-2p)*E)*W = (W-2p)*i/E
			var minRightX = d3.selectAll("."+ID+"_lexPlotElements")[0].length !== 0 ? d3.selectAll("."+ID+"_lexPlotElements")[0].length*(attrW-2*padding)/nElementsInView: attrX+attrW;
			var pathPoints = [[attrX,elemBotLine],[attrX,elemBotLine+attrH*0.025],[+d3.select("#"+ID+"_indicatorLeftBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorLeftBar").attr("y")-0.025*attrH],[+d3.select("#"+ID+"_indicatorLeftBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorLeftBar").attr("y")],
			[+d3.select("#"+ID+"_indicatorRightBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorRightBar").attr("y")],[+d3.select("#"+ID+"_indicatorRightBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorRightBar").attr("y")-0.025*attrH],[minRightX,elemBotLine+attrH*0.025],[minRightX,elemBotLine]];
			d3.select("#"+ID+"_indicatorPath").attr("d",line(pathPoints));
		}
		this.renderPanel = function(AA) {
			if(_renderPanel===true){
				if (panelOngoingAnim !== 1) {
					//path variables and the path itself, I repeated these definitions in tweens, because animations do not display correct position during transition if someone starts drag gesture.
					var sPadding = (attrW-2*padding)/nElementsInView*0.05;
					var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
					var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
					var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
					var position = +(AA.replace("*","").slice(1));
					var midPointElem = attrX+(position-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
					var leftBoxMid = attrX+attrW*0.1+attrW/30+attrW/70;
					var rightBoxMid = attrX+attrW*0.1+19*attrW/30+attrW/70;
					var boxBot = attrY+padding+attrW/10+attrW/20+vShiftPanel*attrH;
					var pathPoints1 = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY-0.025*attrH],[leftBoxMid,boxBot+attrH*0.025],[leftBoxMid,boxBot]];
					var pathPoints2 = [[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY-attrH*0.025],[rightBoxMid,boxBot+attrH*0.025],[rightBoxMid,boxBot]];
					var pathFill = [[leftBoxMid,boxBot],[leftBoxMid,boxBot+attrH*0.025],[midPointElem-elemWidth/2,elemY-0.025*attrH],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY-attrH*0.025],[rightBoxMid,boxBot+attrH*0.025],[rightBoxMid,boxBot]];
					var pathFillinit = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY]];
				
					d3.selectAll("."+ID+"_lexPanel").remove();
					activeAA = AA;
					var data = d3.keys(aminoacidsX).slice(0,d3.keys(aminoacidsX).length-1).filter(function(d,i){return !(AA.slice(0,1)===d);}).sort();
					
					//the function below is called by the last line within renderPanel function, by the pathFill element
					function showPanel(){
						//AAboxes
						d3.select("#"+ID).selectAll("lexPanelAABoxes")
						.data(data)
						.enter()
						.append("rect")
						.attr("x",function(d,i){return attrX+attrW*0.1+(i+1)*attrW/30;})
						.attr("y",attrY+padding+attrW/10+vShiftPanel*attrH)
						.attr("width",function(){return attrW/35;})
						.attr("height",function(){return attrW/20;})
						.attr("rx",function(){return attrW/20*0.05;})
						.attr("ry",function(){return attrW/20*0.05;})
						.attr("fill",function(d,i){if(!(d.match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[d][1]];} else {return "Black";}})
						.attr("fill-opacity",0.6)
						.attr("stroke",function(d,i){if(!(d.match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[d][1]];} else {return "Black";}})
						.attr("stroke-opacity",0.6)
						.attr("stroke-width",0)
						.attr("class",ID+"_lexPanel "+ID+"_lexPanelChoices "+"global_lexPanelChoices_boxes")
						.style("cursor","pointer")
						.attr("id",function(d,i){return ID+"_lexPanelBox"+i;})
						.on("mouseover",function(d,i){d3.select(this).transition("panelFocus").ease("elastic").attr("stroke-width",attrW/50).attr("fill-opacity",1).attr("stroke-opacity",1).delay(0).duration(250);
							d3.select("#"+ID+"_marker").attr("visibility","hidden");
						})
						.on("mouseout",function(d,i){d3.select(this).transition("panelFocus").ease("elastic").attr("stroke-width",0).attr("fill-opacity",0.6).attr("stroke-opacity",0.6).delay(0).duration(250);
							d3.select("#"+ID+"_marker").attr("visibility","visible");
						})
						.on("click",function(d,i){
							d3.select("#"+ID+"_marker").attr("visibility","visible");
							var position = +(AA.replace("*","").slice(1));
							if(!((_data_[position-1]).match(d))) {
								_muts_[position]=d;
								clearInterval(_assignedAnimations_[position]);
								_this_.arrow(position);
								_assignedAnimations_[position] = setInterval(function(){if(!document.hidden){_this_.arrow(position)}else{clearInterval(_assignedAnimations_[position]);_assignedAnimations_[position+"_status"] = 0;}},1000);
								_assignedAnimations_[position+"_status"] = 1;
							}
							d3.selectAll("."+ID+"_lexPanel").remove();
							_this_.render();
						});
						//AA texts
						d3.select("#"+ID).selectAll("lexPanelAAs")
						.data(data)
						.enter()
						.append("text")
						.text(function(d,i){return d;})
						.attr("x",function(d,i){return attrX+attrW*0.1+(i+1)*attrW/30;})
						.attr("dx",attrW/70)
						.attr("y",attrY+padding+attrW/10+vShiftPanel*attrH)
						.attr("dy",attrW/30)
						.attr("fill","AntiqueWhite")
						.attr("fill-opacity",0.9)
						.attr("stroke","AntiqueWhite")
						.attr("stroke-opacity",0.9)
						.attr("stroke-width",0)
						.attr("font-size",attrW/30)
						.attr("font-family","sans-serif")
						.attr("font-weight",400)
						.attr("text-anchor","middle")
						.attr("class",ID+"_lexPanel "+ID+"_lexPanelChoices "+"global_lexPanelChoices_texts")
						.style("cursor","pointer")
						.on("mouseover",function(d,i){d3.select("#"+ID+"_lexPanelBox"+i).transition("panelFocus").ease("elastic").attr("stroke-width",attrW/50).attr("fill-opacity",1).attr("stroke-opacity",1).delay(0).duration(250);
							d3.select("#"+ID+"_marker").attr("visibility","hidden");
						})
						.on("mouseout",function(d,i){d3.select("#"+ID+"_lexPanelBox"+i).transition("panelFocus").ease("elastic").attr("stroke-width",0).attr("fill-opacity",0.6).attr("stroke-opacity",0.6).delay(0).duration(250);
							d3.select("#"+ID+"_marker").attr("visibility","visible");
						})
						.on("click",function(d,i){
							d3.event.stopPropagation();
							d3.select("#"+ID+"_marker").attr("visibility","visible");
							var position = +(AA.replace("*","").slice(1));
							if(!((_data_[position-1]).match(d))) {
								_muts_[position]=d;
								clearInterval(_assignedAnimations_[position]);
								_this_.arrow(position);
								_assignedAnimations_[position] = setInterval(function(){if(!document.hidden){_this_.arrow(position)}else{clearInterval(_assignedAnimations_[position]);_assignedAnimations_[position+"_status"] = 0;}},1000);
								_assignedAnimations_[position+"_status"] = 1;
							}
							d3.selectAll("."+ID+"_lexPanel").remove();
							_this_.render();
						});
					}
					//AA paths (2 lines + fill)
					
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPanelPath1";}).attr("class",ID+"_lexPanel").attr("fill","Red").attr("fill-opacity",0).attr("stroke-opacity",0.5).attr("stroke","Red").attr("stroke-linejoin","round").attr("stroke-width",sPadding).transition().ease("linear").tween("d",function(){return function(t){
						var sPadding = (attrW-2*padding)/nElementsInView*0.05;
						var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
						var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
						var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
						var position = +(AA.replace("*","").slice(1));
						var midPointElem = attrX+(position-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
						var leftBoxMid = attrX+attrW*0.1+attrW/30+attrW/70;
						var rightBoxMid = attrX+attrW*0.1+19*attrW/30+attrW/70;
						var boxBot = attrY+padding+attrW/10+attrW/20+vShiftPanel*attrH;
						var pathPoints1 = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY-0.025*attrH],[leftBoxMid,boxBot+attrH*0.025],[leftBoxMid,boxBot]];
						var f = trace(this,pathPoints1,2,1,"linear"); 
						d3.select(this).attr("d",f.call(this,t));
					}.bind(this)}).delay(0).duration(500);
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPanelPath2";}).attr("class",ID+"_lexPanel").attr("fill","Red").attr("fill-opacity",0).attr("stroke-opacity",0.5).attr("stroke","Red").attr("stroke-linejoin","round").attr("stroke-width",sPadding).transition().ease("linear").tween("d",function(){return function(t){
						var sPadding = (attrW-2*padding)/nElementsInView*0.05;
						var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
						var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
						var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
						var position = +(AA.replace("*","").slice(1));
						var midPointElem = attrX+(position-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
						var leftBoxMid = attrX+attrW*0.1+attrW/30+attrW/70;
						var rightBoxMid = attrX+attrW*0.1+19*attrW/30+attrW/70;
						var boxBot = attrY+padding+attrW/10+attrW/20+vShiftPanel*attrH;
						var pathPoints2 = [[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY-attrH*0.025],[rightBoxMid,boxBot+attrH*0.025],[rightBoxMid,boxBot]];
						var f = trace(this,pathPoints2,2,1,"linear"); 
						d3.select(this).attr("d",f.call(this,t));
					}.bind(this)}).delay(0).duration(500);
					//d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPanelPathFill";}).attr("class",ID+"_lexPanel").attr("d",function(){return line(pathFillinit);}).attr("fill","Red").attr("fill-opacity",0.3).attr("stroke-opacity",0).attr("stroke","Red").attr("stroke-linejoin","round").attr("stroke-width",0).transition().each("end",function(){showPanel();_this_.updatePanel(AA);}).ease("linear").attr("d",function(){return line(pathFill);}).delay(0).duration(500);
					d3.select("#"+ID).append("path").attr("id",function(){return ID+"_lexPanelPathFill";}).attr("class",ID+"_lexPanel").attr("d",function(){return line(pathFillinit);}).attr("fill","Red").attr("fill-opacity",0.3).attr("stroke-opacity",0).attr("stroke","Red").attr("stroke-linejoin","round").attr("stroke-width",0).transition().each("end",function(){showPanel();_this_.updatePanel(AA);}).ease("linear").tween("d",function(){return function(t){
						var sPadding = (attrW-2*padding)/nElementsInView*0.05;
						var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
						var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
						var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
						var position = +(AA.replace("*","").slice(1));
						var midPointElem = attrX+(position-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
						var leftBoxMid = attrX+attrW*0.1+attrW/30+attrW/70;
						var rightBoxMid = attrX+attrW*0.1+19*attrW/30+attrW/70;
						var boxBot = attrY+padding+attrW/10+attrW/20+vShiftPanel*attrH;
						var pathFillinit = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY]];
						var pathFill = [[leftBoxMid,boxBot],[leftBoxMid,boxBot+attrH*0.025],[midPointElem-elemWidth/2,elemY-0.025*attrH],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY-attrH*0.025],[rightBoxMid,boxBot+attrH*0.025],[rightBoxMid,boxBot]];
						var interpolator = d3.interpolate(line(pathFillinit),line(pathFill));
						d3.select(this).attr("d",interpolator(t));
					}.bind(this)}).delay(0).duration(500);
				} else if (panelOngoingAnim ===1 && !d3.select("#"+ID+"_lexPanelPathFill").node()) {
					panelOngoingAnim = 0;
					this.renderPanel(AA);
				}
			}
		}
		this.updatePanel = function(AA) {
			var position = +(AA.replace("*","").slice(1));
			if (AA !== "") {
				if(position-offset<0 || position > offset+nElementsInView+2*padding/(attrW-2*padding)*nElementsInView+1) {
					this.shrinkPanel(AA);
				} else {
					//path variables and the path itself
					var sPadding = (attrW-2*padding)/nElementsInView*0.05;
					var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
					var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
					var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
					var midPointElem = attrX+(position-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
					var leftBoxMid = attrX+attrW*0.1+attrW/30+attrW/70;
					var rightBoxMid = attrX+attrW*0.1+19*attrW/30+attrW/70;
					var boxBot = attrY+padding+attrW/10+attrW/20+vShiftPanel*attrH;
					var pathPoints1 = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY-0.025*attrH],[leftBoxMid,boxBot+attrH*0.025],[leftBoxMid,boxBot]];
					var pathPoints2 = [[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY-attrH*0.025],[rightBoxMid,boxBot+attrH*0.025],[rightBoxMid,boxBot]];
					var pathFill = [[leftBoxMid,boxBot],[leftBoxMid,boxBot+attrH*0.025],[midPointElem-elemWidth/2,elemY-0.025*attrH],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY-attrH*0.025],[rightBoxMid,boxBot+attrH*0.025],[rightBoxMid,boxBot]];
					var pathFillinit = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY]];
					
					d3.select("#"+ID+"_lexPanelPath1").attr("stroke-width",sPadding).attr("d",function(){return line(pathPoints1);});
					d3.select("#"+ID+"_lexPanelPath2").attr("stroke-width",sPadding).attr("d",function(){return line(pathPoints2);});
					d3.select("#"+ID+"_lexPanelPathFill").attr("d",function(){return line(pathFill);});
				}
			}
		}
		this.shrinkPanel = function(AA) {
			panelOngoingAnim = 1;
			d3.selectAll("."+ID+"_lexPanelChoices").remove();
			var position = +(AA.replace("*","").slice(1));
			//path variables and the path itself, no need to be accurate here like in renderPanel function as the user is closing the panel anyway.
			var sPadding = (attrW-2*padding)/nElementsInView*0.05;
			var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
			var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
			var elemY = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
			var midPointElem = attrX+(position-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
			var leftBoxMid = attrX+attrW*0.1+attrW/30+attrW/70;
			var rightBoxMid = attrX+attrW*0.1+19*attrW/30+attrW/70;
			var boxBot = attrY+padding+attrW/10+attrW/20+vShiftPanel*attrH;
			var pathPoints1 = [[midPointElem-elemWidth/2,elemY]];
			var pathPoints2 = [[midPointElem+elemWidth/2,elemY]];
			var pathFillinit = [[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem-elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY],[midPointElem+elemWidth/2,elemY]];
			
			d3.select("#"+ID+"_lexPanelPath1").transition().ease("linear").attr("stroke-width",sPadding).attrTween("d",function(){return traceBack(this,pathPoints1,2,1,"linear")}).delay(0).duration(500);
			d3.select("#"+ID+"_lexPanelPath2").transition().ease("linear").attr("stroke-width",sPadding).attrTween("d",function(){return traceBack(this,pathPoints2,2,1,"linear")}).delay(0).duration(500);
			d3.select("#"+ID+"_lexPanelPathFill").transition().each("end",function(){d3.selectAll("."+ID+"_lexPanel").remove();panelOngoingAnim=0;}).ease("linear").attr("d",function(){return line(pathFillinit);}).delay(0).duration(500);
		}
		this.arrow = function(pos) {
			d3.select("#"+ID).append("path").attr("class",ID+"_arrows").attr("id",ID+"_arrow_"+pos)
			.style("marker-end","url(#"+ID+"_markerArrow)")
			.attr("stroke-width",0)
			.attr("stroke","transparent")
			.attr("fill","transparent")
			.style("opacity",0)
			.transition()
			.ease("linear")
			.each("end",function(){d3.select(this).remove();})
			.tween("arrowUpdate",function(){
				return function(t) {
					var sPadding = (attrW-2*padding)/nElementsInView*0.05;
					var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
					var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
					var elemBot = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;
					var midPointElem = attrX+(pos-Math.floor(offset)-1-(offset-Math.floor(offset)))*(elemWidth+sPadding)+elemWidth/2;
					d3.select(this).attr("d",line([[midPointElem,elemBot],[midPointElem,elemBot-t*0.3*(attrH-2*padding-2*elemWidth)]])).style("opacity",function(){return -4*Math.pow((t-0.5),2)+1;});
				}
			})
			.delay(0)
			.duration(5000);
		}
		this.updateArrow = function () {
			var sPadding = (attrW-2*padding)/nElementsInView*0.05;
			var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
			//beware that the below elemHeight is NOT the correct elemHeight. The heightconstant coefficient is missing to prevent arrowhead from over scaling.
			var elemHeight = elemWidth/1.618;
			var hScale = elemWidth/24;
			var vScale = elemHeight/6;
			var points = [[0,0],[8,6],[0,12],[0,9],[4,6],[0,3]];
			for (var i =0;i<points.length;i++) {
				points[i][0] *= hScale;
				points[i][1] *= vScale;
			}
			d3.select("#"+ID+"_markerArrow").attr("markerWidth",elemWidth).attr("markerHeight",elemHeight*2).attr("refX",4*hScale).attr("refY",6*vScale);
			d3.select("#"+ID+"_markerArrowPath").attr("d",line(points)+"Z");
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
		//shape transitions
		this.circulize = function (vp,vc,vn,i,eW,eH,offset,base,c) {
			i -= offset-Math.floor(offset);
			var cx = (i+1/2)*eW;
			var cy = base-vc*eH;
			var r = attrW/nElementsInView/3;
			var pointsNew = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			for (var i=0;i<6;i++){
				pointsNew[i][0] = cx+r*Math.sin(Math.PI/3*i);
				pointsNew[i][1] = cy-r*Math.cos(Math.PI/3*i);
			}
			return this.compile(pointsNew,r);
		}
		this.hexagonate = function (vp,vc,vn,i,eW,eH,offset,base,c) {
			i -= offset-Math.floor(offset);
			var cx = (i+1/2)*eW;
			var cy = base-vc*eH;
			var r = attrW/nElementsInView/3;
			var pointsNew = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			for (var i=0;i<6;i++){
				pointsNew[i][0] = cx+r*Math.sin(Math.PI/3*i);
				pointsNew[i][1] = cy-r*Math.cos(Math.PI/3*i);
			}
			return this.compile(pointsNew,Math.max(500,attrW*4));
		}
		this.triangulate = function (vp,vc,vn,i,eW,eH,offset,base,c) {
			i -= offset-Math.floor(offset);
			var cx = (i+1/2)*eW;
			var cy = base-vc*eH;
			var r = attrW/nElementsInView/3;
			var pointsNew = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			for(var i=0;i<6;i++) {
				pointsNew[i][0] = cx+r*Math.sin(2*Math.PI/3*Math.floor(i/2));
				pointsNew[i][1] = cy-r*Math.cos(2*Math.PI/3*Math.floor(i/2));
			}
			return this.compile(pointsNew,Math.max(500,attrW*4));
		}
		this.helix = function (vc,i,eW,eH,offset,base){
			var points = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			i -= offset-Math.floor(offset);
			var p = vc[1];
			// rather than changin the eH passed to the function, change the eH inside as below
			eH *= 0.75;
			points[0] = [(i+1/2+1/2*p)*eW,base-p*eH];
			points[1] = [(i+1/2+1/4*p)*eW,base-p*eH/2];
			points[2] = [(i+1/2+1/4*p)*eW,base+p*eH/2];
			points[3] = [(i+1/2-1/2*p)*eW,base+p*eH];
			points[4] = [(i+1/2-1/4*p)*eW,base+p*eH/2];
			points[5] = [(i+1/2-1/4*p)*eW,base-p*eH/2];
			return this.compile(points,Math.max(500,attrW*4));
		}
		this.strand = function (vc,i,eW,eH,offset,base) {
			var points = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			i -= offset-Math.floor(offset);
			var p = vc[1];
			var cx = (i+1/2)*eW;
			var cy = base;
			var rx = eW/2;
			var ry = eH/2;
			for(var i=0;i<6;i++) {
				points[i] = [];
				points[i][0] = cx+p*rx*Math.sin(2*Math.PI/3*Math.floor(i/2)+Math.PI/2);
				points[i][1] = cy-p*ry*Math.cos(2*Math.PI/3*Math.floor(i/2)+Math.PI/2);
			}
			return this.compile(points,Math.max(500,attrW*4));
		}
		this.coil = function (vc,i,eW,eH,offset,base){
			var p = vc[1];
			return this.generateBin (1,1,1,i,eW,eH/4*p,offset,base+eH/4*p/2,(1-p));
		}
		var _drawSS_ = {"C":_this_.coil.bind(_this_),"H":_this_.helix.bind(_this_),"S":_this_.strand.bind(_this_)};
		this.generateBin = function (vp,vc,vn,i,eW,eH,offset,base,c) {
			var points = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
			i -= offset-Math.floor(offset);
			points[0] = [(i+1/2)*eW,base-vc*eH];
			points[1] = [(i+1/2+1/2*(1-c))*eW,base-(vc-(1-c)*(vc-vn)/2)*eH];
			points[2] = [(i+1/2+1/2*(1-c))*eW,base];
			points[3] = [(i+1/2)*eW,base];
			points[4] = [(i+1/2-1/2*(1-c))*eW,base];
			points[5] = [(i+1/2-1/2*(1-c))*eW,base-(vc-(1-c)*(vc-vp)/2)*eH];
			return this.compile(points,Math.max(500,attrW*4));
		}
		this.compile = function (points,r){
			var d= "";
			for(i=0;i<6;i++){
				if (i===0){
					d += "M"+points[i].toString()+" ";
				}else if (i!==5){
					d += "A"+r+","+r+" 0 0,1 "+points[i].toString()+" ";
				}else{
					d += "A"+r+","+r+" 0 0,1 "+points[i].toString()+" A"+r+","+r+" 0 0,1 "+points[0].toString()+"Z";
				}
			}
			return d;
		}
		
		var aminoacidsX_renderMethods = {};
		d3.keys(aminoacidsX).forEach(function(d,i){
			var aaSymbols = {Nonpolar:_this_.circulize.bind(_this_),Polar:_this_.circulize.bind(_this_),Positive:_this_.triangulate.bind(_this_),Negative:_this_.triangulate.bind(_this_),Aromatic:_this_.hexagonate.bind(_this_)};
			if(d !== "X") {
				aminoacidsX_renderMethods[d] = aaSymbols[aminoacidsX[d][1]];
			}
		});
		var colorMode = [{"H":"Red","C":"Gray","S":"Yellow"},binColor,"AA"];
		this.changeColor = function () {
			var x = colorMode.shift();
			colorMode.push(x);
			//console.log(colorMode);
			_this_.miniRender();
		}
		var renderMode = ["structures","line","histogram","glyph"];
		this.changeMode = function(){
			var x = renderMode.shift();
			renderMode.push(x);
			//console.log(renderMode);
			_this_.miniRender();
		}
		var binCompression = [0,0.25,0.5,0.75];
		this.binCompression = function (){
			var x = binCompression.shift();
			binCompression.push(x);
			//console.log(binCompression);
			_this_.miniRender();
		}
		var valuesBinSize = 1;
		this.binValues = function(coef){
			valuesBinSize = Math.min(Math.max(Math.round(valuesBinSize*coef),1),_values_.length);
			//console.log(valuesBinSize);
			var lastBinValue = 0;
			_valuesNormalized_ = _values_.map(function(d,i,a){
				if(i/valuesBinSize === Math.floor(i/valuesBinSize)) {
					for (var binIndex=Math.floor(i/valuesBinSize),j=0,total=0,count=0;j<valuesBinSize;j++){
						total += a[Math.min(valuesBinSize*binIndex+j,a.length-1)];
						count++;
					}
					lastBinValue = total/count;
					return lastBinValue;
				} else {
					return lastBinValue
				}
			}); 
			_phantomNormalized_ = _phantom_.map(function(d,i,a){
				if(i/valuesBinSize === Math.floor(i/valuesBinSize)) {
					for (var binIndex=Math.floor(i/valuesBinSize),j=0,total=0,count=0;j<valuesBinSize;j++){
						total += a[Math.min(valuesBinSize*binIndex+j,a.length-1)];
						count++;
					}
					lastBinValue = total/count;
					return lastBinValue;
				} else {
					return lastBinValue
				}
			}); 
			_valuesNormalized_ = _valuesNormalized_.map(function(d,i){return d/valuesMax;});
			_phantomNormalized_ = _phantomNormalized_.map(function(d,i){return d/valuesMax;});
			_this_.chunkValues();
			_this_.chunkPhantom();
			//console.log(valuesChunk);
			_this_.miniRender();
		}
		var scaleMode = ["-absMax,0,absMax","min,max"];
		this.transformScale = function(){
			var x = scaleMode.shift();
			scaleMode.push(x);
			//console.log(colorMode);
			_this_.miniRender("scale");
		}
		
		//shares similarities with render function, many things recomputed with attr changes involving transitions
		this.miniRender = function(){
			//similar to render function - Elements
			var sPadding = (attrW-2*padding)/nElementsInView*0.05;
			var elemWidth = (attrW-2*padding)/nElementsInView*0.95;
			var elemHeight = elemWidth/1.618*_heightConstant.call(_this_,nElementsInView,elemWidth,attrW,attrH);
			//similar to render function - Get the index of the chunk to prepare values
			var chunkIndex = Math.min(Math.floor(offset/extent[0]),Math.ceil((_data_.length-extent[1])/extent[0]));
			var chunkOffset = offset-chunkIndex*extent[0];
			//similar to render function - Data
			var data = dataChunk[chunkIndex];
			data = data.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			//similar to render function - Values
			var dataValues = valuesChunk[chunkIndex];
			dataValues = dataValues.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var phantomValues = showPhantom === false? [] : phantomChunk[chunkIndex];
			phantomValues = phantomValues.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var maxValueIndex = dataValues.length-1;
			var base = attrY+padding+0.6*(attrH-2*padding)+vShift*attrH+elemHeight/2;
			//##########SCALE RELATED##########
			if (scaleMode[0] === "min,max") {
				dataValues = dataValues.map(function(d,i){return (d-_normalizedMin_)/(_normalizedMax_-_normalizedMin_)*2;});
				phantomValues = phantomValues.map(function(d,i){return (d-_normalizedMin_)/(_normalizedMax_-_normalizedMin_)*2;});
				base += elemHeight;
			}
			if (scaleMode[0] === "min,max" && Array.prototype.some.call(arguments,function(d,i){return d==="scale"})) {
				d3.select("#"+ID).transition("rescale").tween("rescaleAndlowerBase",function(){
					var scale = d3.interpolateArray([-valuesMax,valuesMax],[_realMin_,_realMax_]);
					var botAxisPos = d3.interpolate("translate(0,"+(base-elemHeight)+")","translate(0,"+base+")");
					return function(t){
						scaleMainLeft.domain(scale(t));
						d3.select("#"+ID+"_lexMainAxisLeft").call(axisMainLeft);
						d3.select("#"+ID+"_lexMainAxisBot").attr("transform",botAxisPos(t)).call(axisMainBot);
					}
				}).each("end",function(){_this_.render();}).delay(0).duration(1000);
			} else if (Array.prototype.some.call(arguments,function(d,i){return d==="scale"})) {
				d3.select("#"+ID).transition("rescale").tween("rescaleAndhigherBase",function(){
					var scale = d3.interpolateArray([_realMin_,_realMax_],[-valuesMax,valuesMax]);
					var botAxisPos = d3.interpolate("translate(0,"+(base+elemHeight)+")","translate(0,"+base+")");
					return function(t){
						scaleMainLeft.domain(scale(t));
						d3.select("#"+ID+"_lexMainAxisLeft").call(axisMainLeft);
						d3.select("#"+ID+"_lexMainAxisBot").attr("transform",botAxisPos(t)).call(axisMainBot);
					}
				}).each("end",function(){_this_.render();}).delay(0).duration(1000);
			}
			//##########SCALE RELATED##########
			var structures = structureChunk[chunkIndex];
			structures = structures.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			var phantomStructures = showPhantom === false? [] : phantomStructureChunk[chunkIndex];
			phantomStructures = phantomStructures.filter(function (d,i) {var x = attrX+(i-chunkOffset)*(elemWidth+sPadding); return x>(attrX-(elemWidth+sPadding)) && x<attrX+attrW+(elemWidth+sPadding)});
			d3.selectAll("."+ID+"_lexPlotElements").data(dataValues).transition("colorAndShape")
			.attr("d",function(d,i){
				if (renderMode[0]==="line") {
					return _this_.generateBin(dataValues[Math.max(0,i-1)],d,dataValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="histogram") {
					return _this_.generateBin(d,d,d,i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="glyph") {
					return aminoacidsX_renderMethods[data[i]](dataValues[Math.max(0,i-1)],d,dataValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else {
					return _drawSS_[structures[i][0]](structures[i],i,elemWidth*1/0.95,elemHeight,offset,base);
				}
			})
			.attr("fill",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return binColor;}else{return colorMode[0][structures[i][0]]}})
			//.attr("stroke",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return binColor;}else{return colorMode[0][structures[i][0]]}})
			//.attr("stroke-width",function(){if(renderMode[0]==="structures"){return 4*sPadding;}else{return 0;}})
			.delay(0).duration(1000);
		
			d3.selectAll("."+ID+"_lexPhantomElements").data(phantomValues).transition("colorAndShape")
			.attr("d",function(d,i){
				if (renderMode[0]==="line") {
					return _this_.generateBin(phantomValues[Math.max(0,i-1)],d,phantomValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="histogram") {
					return _this_.generateBin(d,d,d,i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else if (renderMode[0]==="glyph") {
					return aminoacidsX_renderMethods[data[i]](phantomValues[Math.max(0,i-1)],d,phantomValues[Math.min(i+1,maxValueIndex)],i,elemWidth*1/0.95,elemHeight,offset,base,binCompression[0]);
				} else {
					return _drawSS_[phantomStructures[i][0]](phantomStructures[i],i,elemWidth*1/0.95,elemHeight,offset,base);
				}
			})
			.attr("fill",function(d,i){if(colorMode[0]==="AA"){return aaSymbols[aminoacidsX[data[i]][1]];}else if (colorMode[0]===binColor){return phantomColor;}else{return colorMode[0][phantomStructures[i][0]]}})
			.delay(0).duration(1000);
		}
		//simple Bin algorithm, return length is not guaranteed
		this.simpleBin = function (a,l) {
			if (l===0) {
				return [];
			}
			var result = [];
			var length = a.length;
			var windowSize = Math.ceil(length/l);
			var niceLength = windowSize !== 1 && length%windowSize !== 0?length + windowSize-(length%windowSize):length;
			for (var i=0,total=0;i<niceLength;i++){
				if((i+1)%windowSize !== 0){
					total += a[Math.min(i,length-1)];
				} else {
					total += a[Math.min(i,length-1)];
					result.push(total/windowSize);
					total =0;
				} 
			}
			return result;
		}
	}
	window.lexiconSS = new lexiconSSF;
})();
<!--Lexicon-->