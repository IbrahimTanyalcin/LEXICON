<!--Lexicon-->
(function (){
	function lexiconF () {
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
		var _renderSegmentation = true;
		var _renderComposition = true;
		var segmentationLineColor = "Navy";
		var _fontConstant_ = 1;
		//text fill, text stroke, shape fill, shape stroke , m.over text fill, m.over text stroke , m.over shape fill
		var _controllerColors_ = ["AntiqueWhite","AntiqueWhite","Red","Red","Red","Red","AntiqueWhite"];
		var _submitIcon_ = false;
		var _submitBox_ = false;
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
		this.segmentation = function(u){_renderSegmentation=u;return this;}
		this.composition = function(u){_renderComposition=u;return this;}
		this.segmentationLineColor = function(u){segmentationLineColor=u;return this;}
		this.extent = function(u){extent[0]=u[0];extent[1]=u[1];this.chunk();return this;}
		this.checkExtent = function(){extent[0] = extent[0]<1?1:extent[0]; extent[1] = extent[1]>_data_.length?_data_.length:extent[1]; return this;}
		this.zoom = function(u){maxZoom = u;return this;}
		this.fontConstant = function(u){_fontConstant_ = u;return this;}
		var _objSync_ = [];
		this.sync = function(u){if(arguments.length !== 0){_objSync_ = u;return this;}else{return _objSync_;}}
		this._sync_ = function(issuer){var length = _objSync_.length; for(var i =0;i<length;i++){if(issuer === _this_||(_objSync_[i]!==issuer && issuer.sync().every(function(d){return d!==_objSync_[i];}))){_objSync_[i].offSet(offset);_objSync_[i].viewport(nElementsInView);_objSync_[i].render(issuer);}}}
		this.colorControllers = function(u){_controllerColors_ = u;return this;}
		this.submitIcon = function(u){_submitIcon_ = Boolean(u);return this;}
		this.submitBox = function(u){_submitBox_ = Boolean(u);return this;}
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
			//add the segmentation paths that might be later used.
			d3.select("#"+ID).append("path").attr("id",function(){return ID+"_indicatorSegmentPathTop";}).attr("fill","GoldenRod").attr("fill-opacity",0.6).attr("stroke",segmentationLineColor).attr("stroke-linejoin","round").attr("stroke-width",attrH*0.01);
			d3.select("#"+ID).append("path").attr("id",function(){return ID+"_indicatorSegmentPathBot";}).attr("transform","scale(1,-1)"+" translate(0,"+(-2*(attrY+attrH*0.9+vShiftIndicator*attrH+attrH*0.025))+")").attr("fill","GoldenRod").attr("fill-opacity",0.6).attr("stroke",segmentationLineColor).attr("stroke-linejoin","round").attr("stroke-width",attrH*0.01);
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
			
			//***Markers***
			d3.select("#"+ID).append("svg:defs").attr("id",ID+"_extras");
			d3.select("#"+ID+"_extras").append("marker").attr("id",ID+"_markerArrow").attr("markerWidth",15).attr("markerHeight",15).attr("refX",4).attr("refY",6).attr("orient","auto").attr("markerUnits","userSpaceOnUse");
			d3.select("#"+ID+"_markerArrow").append("path").attr("id",ID+"_markerArrowPath").attr("d","M0,0 L8,6 L0,12 L0,9 L4,6 L0,3 L0,0 Z").attr("fill","GoldenRod").attr("fill-opacity",0.8).attr("stroke-width",0).attr("stroke-opacity",0).attr("stroke","Black").attr("stroke-linejoin","round");
			//***Markers***
			
			//Segmentation Control
			d3.select("#"+ID).append("text").text("Segmentation: off").attr("id",ID+"_segmentation_text").attr("class","global_segmentation_texts").style("cursor","pointer").attr("visibility",function(){return _renderSegmentation===true?"visible":"hidden";}).attr("x",attrX+padding).attr("dx",0).attr("y",attrY+padding*_fontConstant_).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","start").attr("font-size",attrW/30*_fontConstant_).attr("fill",_controllerColors_[0]).attr("stroke",_controllerColors_[1]).attr("stroke-width",0)
			.on("mouseover",function(){d3.select(this).transition().attr("fill",_controllerColors_[4]).delay(0).duration(500);})
			.on("mouseout",function(){d3.select(this).transition().attr("fill",_controllerColors_[0]).delay(0).duration(500);})
			.on("click",function(){
				var line = d3.svg.line().interpolate("cardinal");
				if(d3.select(this).node().textContent === "Segmentation: off") {
					//segmentPath
					_this_.initSegmentation();
					d3.select("#"+ID+"_indicatorSegmentPathTop").attr("d",line(segmentPathInit)).transition().attr("d",line(segmentPathFinal)).delay(0).duration(1000);
					d3.select("#"+ID+"_indicatorSegmentPathBot").attr("d",line(segmentPathInit)).transition().attr("d",line(segmentPathFinal)).delay(0).duration(1000);
					d3.select(this).node().textContent = "Segmentation: on";
				} else {
					d3.select("#"+ID+"_indicatorSegmentPathTop").transition().attr("d",line(segmentPathInit)).delay(0).duration(1000);
					d3.select("#"+ID+"_indicatorSegmentPathBot").transition().attr("d",line(segmentPathInit)).delay(0).duration(1000);
					d3.select(this).node().textContent = "Segmentation: off";
				}
			});
			//Segmentation Control
			
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
			if (_submitIcon_ && !_submitBox_) {
				var submitter = d3.select("#"+ID).append("g").attr("class","global_submit_groups").attr("transform","translate("+(attrX+attrW/2)+","+(_orientSubmit!=="bottom" ? attrY+padding*_fontConstant_ : attrY+attrH-2)+")");
				submitter.append("text").text("✓").attr("id",ID+"_submit_text").attr("class","global_submit_texts").style("cursor","pointer").attr("dx",0).attr("dy",attrW/120*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/30*_fontConstant_).attr("fill",_controllerColors_[4]).attr("fill-opacity",0.75).attr("stroke",_controllerColors_[5]).attr("stroke-width",1);
				submitter.append("circle").attr("r",attrW/30*_fontConstant_).attr("cx",0).attr("cy",0).attr("fill",_controllerColors_[4]).attr("fill-opacity",0).attr("stroke",_controllerColors_[5]).attr("stroke-opacity",0.75).attr("stroke-width",1).attr("stroke-dashoffset",Math.PI*attrW/60*_fontConstant_);
			} else if (_submitBox_ && !_submitIcon_) {
				var submitter = d3.select("#"+ID).append("g").attr("class","global_submit_groups").attr("transform","translate("+(attrX+attrW/2)+","+(_orientSubmit!=="bottom" ? attrY+padding*_fontConstant_ : attrY+attrH-2)+")");
				submitter.append("text").text(_submitText).attr("id",ID+"_submit_text").attr("class","global_submit_texts").style("cursor","pointer").attr("dx",0).attr("dy",attrW/120*_fontConstant_).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/30*_fontConstant_).attr("fill",_controllerColors_[4]).attr("fill-opacity",0.75).attr("stroke",_controllerColors_[5]).attr("stroke-width",1);
				submitter.append("rect").attr("width",attrW/60*_fontConstant_*(_submitText.length || 1)).attr("height",attrW/15*_fontConstant_).attr("x",-attrW/120*_fontConstant_*(_submitText.length || 1)).attr("y",-attrW/30*_fontConstant_).attr("rx",Math.min(attrW/40,attrH/40)).attr("ry",Math.min(attrW/40,attrH/40)).attr("fill",_controllerColors_[4]).attr("fill-opacity",0).attr("stroke",_controllerColors_[5]).attr("stroke-opacity",0.75).attr("stroke-width",1);
			} else {
				var submitter = d3.select("#"+ID).append("text").text(_submitText).attr("id",ID+"_submit_text").attr("class","global_submit_texts").style("cursor","pointer").attr("x",attrX+attrW/2).attr("dx",0).attr("y",function(){if(_orientSubmit!=="bottom"){return attrY+padding*_fontConstant_;}else{return attrY+attrH-2;}}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/30*_fontConstant_).attr("fill",_controllerColors_[4]).attr("fill-opacity",0.75).attr("stroke",_controllerColors_[5]).attr("stroke-width",1);
			}
			submitter
			.on("mouseover",function(d,i){
				if (_submitBox_ && !_submitIcon_) {
					d3.select(this).select("text").transition().attr("fill-opacity",0.9).attr("stroke-width",2).delay(0).duration(250);
					d3.select(this).select("rect").attr("stroke-width",3).transition().ease("linear").attrTween("stroke-dasharray",function(){var interpolator = d3.interpolate(("0 "+attrW),(attrW+" 0"));return function(t){return interpolator(t)};}).delay(0).duration(1000);
				} else if (_submitIcon_ && !_submitBox_) {
					d3.select(this).select("circle").attr("stroke-width",3).transition().attrTween("stroke-dasharray",function(){var interpolator = d3.interpolate(("0 "+Math.PI*2*attrW/30*_fontConstant_),(Math.PI*2*attrW/30*_fontConstant_+" 0"));return function(t){return interpolator(t)};}).delay(0).duration(500);
				} else {
					d3.select(this).transition().attr("fill-opacity",0.9).attr("stroke-width",2).delay(0).duration(250);
				}
			})
			.on("mouseout",function(d,i){
				if (_submitBox_ && !_submitIcon_) {
					d3.select(this).select("text").transition().attr("fill-opacity",0.75).attr("stroke-width",1).delay(0).duration(250);
					d3.select(this).select("rect").attr("stroke-width",1).attr("stroke-dasharray",null);
				} else if (_submitIcon_ && !_submitBox_) {
					d3.select(this).select("circle").attr("stroke-width",1).attr("stroke-dasharray",null);
				} else {
					d3.select(this).transition().attr("fill-opacity",0.75).attr("stroke-width",1).delay(0).duration(250);
				}
			})
			.on("click",function(d,i){
				submitF(_seq_,_data_,_muts_);
			});
			return this;
		}

		//render related variables and the main function
		var nElementsInView = 30;
		var barWidth = attrW*0.01;
		var barHeight = attrH*0.1;
		var spanWidth = Math.max(0,Math.min(nElementsInView+2*padding/(attrW-2*padding)*nElementsInView,_data_.length)/_data_.length*attrW*0.9-barWidth);
		//resusable arrays for AA reference
		var aaSymbols = {Nonpolar:"Gray",Polar:"DeepPink",Positive:"Red",Negative:"Blue",Aromatic:"Green",Stop:"Orange"};
		var aminoacidsX = {"A":["Alanine","Nonpolar"],"R":["Arginine","Positive"],"N":["Asparagine","Polar"],"D":["Aspartic-Acid","Negative"],"C":["Cysteine","Polar"],"Q":["Glutamine","Polar"],"E":["Glutamic-Acid","Negative"],"G":["Glycine","Nonpolar"],"H":["Histidine","Positive"],"I":["Isoleucine","Nonpolar"],"L":["Leucine","Nonpolar"],"K":["Lysine","Positive"],"M":["Methionine","Nonpolar"],"F":["Phenylalanine","Aromatic"],"P":["Proline","Nonpolar"],"S":["Serine","Polar"],"T":["Threonine","Polar"],"W":["Tryptophan","Aromatic"],"Y":["Tyrosine","Aromatic"],"V":["Valine","Nonpolar"],"X":["Stop","Stop"]};
		var aminoacids_OtherProperties = {"A":["Hydrophobic","Aliphatic"],"R":["Hydrophilic","H-bonding","Basic","Ionizable"],"N":["Hydrophilic"],"D":["Hydrophilic","H-bonding","Acidic","Ionizable"],"C":["Hydrophilic","H-bonding","Sulfur-containing","Acidic","Ionizable","Disulfide-bond"],"Q":["Hydrophilic","H-bonding"],"E":["Hydrophilic","H-bonding","Acidic","Ionizable"],"G":["Hydrophobic","Aliphatic"],"H":["Hydrophilic","H-bonding","Basic","Ionizable","All-aromatic"],"I":["Hydrophobic","Aliphatic"],"L":["Hydrophobic","Aliphatic"],"K":["Hydrophilic","H-bonding","Basic","Ionizable"],"M":["Hydrophobic","Sulfur-containing"],"F":["Hydrophobic","All-aromatic"],"P":["Hydrophobic","Aliphatic","Cyclic"],"S":["Hydrophilic","H-bonding"],"T":["Hydrophilic","H-bonding"],"W":["Hydrophobic","H-bonding","All-aromatic"],"Y":["Hydrophobic","H-bonding","Ionizable","All-aromatic"],"V":["Hydrophobic","Aliphatic"]};
		//construct matrix mold for segmentation
		var matrixColumns = ["Nonpolar","Polar","Positive","Negative","Aromatic","All-aromatic","Aliphatic","Cyclic","Hydrophobic","Hydrophilic","Acidic","Basic","Ionizable","H-bonding","Disulfide-bond","Sulfur-containing"].sort();
		(function(){
			var array = d3.keys(aminoacidsX).sort();
			array.splice(-2,1);
			for (var i =array.length-1;i>=0;i--){
				matrixColumns.unshift(array[i]);
			}
		})();
		this.displayMasterMatrix = function(){console.log(matrixColumns)};
		//convert AA to a vector 
		this.calculateRow = function(a){
			var vector = [];
			for (var i=0;i<matrixColumns.length;i++){
				if (a===matrixColumns[i] || aminoacidsX[a].some(function(d){return d===matrixColumns[i]}) || aminoacids_OtherProperties[a].some(function(d){return d===matrixColumns[i]})) {
					vector.push(1);
				} else {
					vector.push(0);
				}
			}
			return vector;
		}
		//13 is the max value a distance can be;
		this.vecDist = function(vec1,vec2) {
			var result =  0;
			for (var i=0;i<vec1.length;i++) {
				result += Math.abs(vec1[i]-vec2[i]);
			}
			return result;
		}
		//Segmentation
		var segmentVector = [];
		var segmentPathInit = [];
		var segmentPathFinal = [];
		this.initSegmentation = function() {
			segmentVector = [];
			segmentPathInit = [];
			segmentPathFinal = [];
			var _ceiling_ = Math.PI*Math.PI/3;
			segmentVector = [];
			for (var i=0,total=_ceiling_;i<_data_.length;i++) {
				total=_ceiling_;
				for (var j=1;j<11;j++) {
					if(i-j>=0) {
						total -= this.vecDist(this.calculateRow(_data_[i]),this.calculateRow(_data_[i-j]))/13/Math.pow(j,2);
					}
					if(i+j<_data_.length) {
						total -= this.vecDist(this.calculateRow(_data_[i]),this.calculateRow(_data_[i+j]))/13/Math.pow(j,2);
					}
				}
				segmentVector[i] = total;
			}
			for (var i=0;i<segmentVector.length;i++) {
				segmentVector[i] = segmentVector[i]/_ceiling_;
			}
			var binCount = Math.min(20,Math.ceil(_data_.length/20));
			var binSize = Math.ceil(segmentVector.length/binCount);
			var binnedVector = [];
			for (var i=0;i<binCount;i++) {
				total=0;
				var count = 0;
				for (var j=0;j<binSize;j++) {
					if (i*binSize+j <segmentVector.length) {
						total+= segmentVector[i*binSize+j];
						count++;
					}
				}
				var result = Math.round(total/count*100);
				binnedVector[i] = result;
			}
			var max = d3.max(binnedVector);
			var min = d3.min(binnedVector);
			var max_min = max - min ===0?Infinity:max-min;
			for (var i=0;i<binnedVector.length;i++) {
				binnedVector[i] -= min;
				binnedVector[i] = Math.round(binnedVector[i]/(max_min)*100)/100;
			}
			segmentVector = binnedVector;
			var startX = attrX+padding;
			var width = attrW*0.9;
			var height = attrH*0.025;
			var startY = attrY+attrH*0.9+vShiftIndicator*attrH+height;
			var maxHeight = 4*height;
			segmentPathInit[0] = [startX,startY];
			segmentPathFinal[0] = [startX,startY];
			segmentPathInit[binCount+1] = [startX+width,startY];
			segmentPathFinal[binCount+1] = [startX+width,startY];
			for (var i=1;i<=binCount;i++) {
				segmentPathInit[i] = [startX+(i-0.5)*width/binCount,startY];
				segmentPathFinal[i] = [startX+(i-0.5)*width/binCount,startY-segmentVector[i-1]*maxHeight];
			}
		}
		this.displaySegmentation = function(){console.log(JSON.stringify(segmentVector));};
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
			
			//clear before redraw - no longer necessary
			//d3.selectAll("."+ID+"_lexSeqElements").remove();
			//d3.selectAll("."+ID+"_lexSeqElementsTexts").remove();
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
			//AA boxes-enter
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElements")
			.data(data)
			.enter()
			.append("rect")
			.attr("x",function(d,i){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
			.attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;})
			.attr("width",function(){return elemWidth;})
			.attr("height",function(){return elemHeight;})
			.attr("rx",function(){return elemWidth*0.05;})
			.attr("ry",function(){return elemHeight*0.05;})
			.attr("fill",function(d,i){if(!(d.match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[d][1]];} else {return "Black";}})
			.attr("fill-opacity",0.8)
			.attr("stroke",function(d,i){if(!(d.match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[d][1]];} else {return "Black";}})
			.attr("stroke-opacity",1)
			.attr("stroke-width",sPadding)
			.attr("class",ID+"_lexSeqElements")
			.attr("id",function(d,i){return ID+"_lexSeqElement"+i;})
			.on("mouseover",function(){d3.select(this).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH-elemHeight*0.25;}).attr("height",elemHeight*1.5).attr("stroke-width",2*sPadding).delay(0).duration(250);})
			.on("mouseout",function(){d3.select(this).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;}).attr("height",elemHeight).attr("stroke-width",sPadding).delay(0).duration(250);})
			.on("click",function(d,i){if(!d3.selectAll("."+ID+"_lexPanel").node()){_this_.renderPanel(d+(i+Math.floor(offset)+1));}else{_this_.shrinkPanel(activeAA);}});
			//AA boxes-exit
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElements")
			.data(data)
			.exit()
			.remove();
			//AA boxes-update
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElements")
			.data(data)
			.attr("x",function(d,i){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
			.attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;})
			.attr("width",function(){return elemWidth;})
			.attr("height",function(){return elemHeight;})
			.attr("rx",function(){return elemWidth*0.05;})
			.attr("ry",function(){return elemHeight*0.05;})
			.attr("fill",function(d,i){if(!(d.match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[d][1]];} else {return "Black";}})
			.attr("stroke",function(d,i){if(!(d.match(/[^ARNDCQEGHILKMFPSTWYVX]/g))){return aaSymbols[aminoacidsX[d][1]];} else {return "Black";}})
			.attr("stroke-width",sPadding)
			.attr("id",function(d,i){return ID+"_lexSeqElement"+i;})
			.on("mouseover",function(){d3.select(this).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH-elemHeight*0.25;}).attr("height",elemHeight*1.5).attr("stroke-width",2*sPadding).delay(0).duration(250);})
			.on("mouseout",function(){d3.select(this).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;}).attr("height",elemHeight).attr("stroke-width",sPadding).delay(0).duration(250);})
			.on("click",function(d,i){if(!d3.selectAll("."+ID+"_lexPanel").node()){_this_.renderPanel(d+(i+Math.floor(offset)+1));}else{_this_.shrinkPanel(activeAA);}});
			//AA texts - Letters - enter
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsTexts")
			.data(data)
			.enter()
			.append("text")
			.text(function(d,i){return d;})
			.attr("x",function(d,i){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
			.attr("dx",elemWidth/2)
			.attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;})
			.attr("dy",elemHeight*1.2/3)
			.attr("fill","AntiqueWhite")
			.attr("fill-opacity",0.9)
			.attr("stroke","AntiqueWhite")
			.attr("stroke-opacity",0.9)
			.attr("stroke-width",1)
			.attr("font-size",function(d,i){return Math.min(elemWidth,elemHeight)/2;})
			.attr("font-family","sans-serif")
			.attr("font-weight",300)
			.attr("text-anchor","middle")
			.style("cursor","pointer")
			.attr("class",ID+"_lexSeqElementsTexts "+"global_lexSeqElementsTexts")
			.on("mouseover",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH-elemHeight*0.25;}).attr("height",elemHeight*1.5).attr("stroke-width",2*sPadding).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;}).attr("height",elemHeight).attr("stroke-width",sPadding).delay(0).duration(250);})
			.on("click",function(d,i){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(d+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}});
			//AA texts - Letters - exit
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsTexts")
			.data(data)
			.exit()
			.remove();
			//AA texts - Letters - update
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsTexts")
			.data(data)
			.text(function(d,i){return d;})
			.attr("x",function(d,i){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
			.attr("dx",elemWidth/2)
			.attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;})
			.attr("dy",elemHeight*1.2/3)
			.attr("font-size",function(d,i){return Math.min(elemWidth,elemHeight)/2;})
			.on("mouseover",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH-elemHeight*0.25;}).attr("height",elemHeight*1.5).attr("stroke-width",2*sPadding).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;}).attr("height",elemHeight).attr("stroke-width",sPadding).delay(0).duration(250);})
			.on("click",function(d,i){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(d+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}});
			//AA texts - Numbers - enter
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsNumbers")
			.data(data)
			.enter()
			.append("text")
			.text(function(d,i){return (i+Math.floor(offset)+1);})
			.attr("x",function(d,i){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
			.attr("dx",elemWidth/2)
			.attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;})
			.attr("fill","AntiqueWhite")
			.attr("fill-opacity",0.9)
			.attr("stroke","AntiqueWhite")
			.attr("stroke-opacity",0.9)
			.attr("stroke-width",1)
			.attr("font-size",function(d,i){value = (i+Math.floor(offset)+1);return Math.min(elemWidth,elemHeight)/(Math.max(value.toString().length,2));})
			.attr("dy",function(d,i){return elemHeight*2.8/3})
			.attr("font-family","sans-serif")
			.attr("font-weight",300)
			.attr("text-anchor","middle")
			.style("cursor","pointer")
			.attr("class",ID+"_lexSeqElementsNumbers "+"global_lexSeqElementsTexts")
			.on("mouseover",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH-elemHeight*0.25;}).attr("height",elemHeight*1.5).attr("stroke-width",2*sPadding).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;}).attr("height",elemHeight).attr("stroke-width",sPadding).delay(0).duration(250);})
			.on("click",function(d,i){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(d+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}});
			//AA texts - Numbers - exit
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsNumbers")
			.data(data)
			.exit()
			.remove();
			//AA texts - Numbers - update
			d3.select("#"+ID).selectAll("."+ID+"_lexSeqElementsNumbers")
			.data(data)
			.text(function(d,i){return (i+Math.floor(offset)+1);})
			.attr("x",function(d,i){return attrX+(i-(offset-Math.floor(offset)))*(elemWidth+sPadding);})
			.attr("dx",elemWidth/2)
			.attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;})
			.attr("font-size",function(d,i){value = (i+Math.floor(offset)+1);return Math.min(elemWidth,elemHeight)/(Math.max(value.toString().length,2));})
			.attr("dy",function(d,i){return elemHeight*2.8/3})
			.on("mouseover",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH-elemHeight*0.25;}).attr("height",elemHeight*1.5).attr("stroke-width",2*sPadding).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select("#"+ID+"_lexSeqElement"+i).transition().ease("elastic").attr("y",function(d,i){return attrY+padding+0.6*(attrH-2*padding)+vShift*attrH;}).attr("height",elemHeight).attr("stroke-width",sPadding).delay(0).duration(250);})
			.on("click",function(d,i){if(!d3.selectAll("."+ID+"_lexPanel").node()){d3.event.stopPropagation();_this_.renderPanel(d+(i+Math.floor(offset)+1));}else{d3.event.stopPropagation();_this_.shrinkPanel(activeAA);}});
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
				var minRightX = d3.selectAll("."+ID+"_lexSeqElements")[0].length !== 0 ? Math.min(attrX+attrW,+d3.select(d3.selectAll("."+ID+"_lexSeqElements")[0].slice(-1)[0]).attr("x")+elemWidth/2): attrX+attrW;
				var pathPoints = [[attrX,elemBotLine],[attrX,elemBotLine+attrH*0.025],[+d3.select("#"+ID+"_indicatorLeftBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorLeftBar").attr("y")-0.025*attrH],[+d3.select("#"+ID+"_indicatorLeftBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorLeftBar").attr("y")],
				[+d3.select("#"+ID+"_indicatorRightBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorRightBar").attr("y")],[+d3.select("#"+ID+"_indicatorRightBar").attr("x")+barWidth/2,+d3.select("#"+ID+"_indicatorRightBar").attr("y")-0.025*attrH],[minRightX,elemBotLine+attrH*0.025],[minRightX,elemBotLine]];
				d3.select("#"+ID).append("path").attr("id",function(){return ID+"_indicatorPath";}).attr("d",line(pathPoints)).attr("fill","Lime").attr("fill-opacity",0.5).attr("stroke","Lime").attr("stroke-linejoin","round").attr("stroke-width",sPadding);
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
			var minRightX = d3.selectAll("."+ID+"_lexSeqElements")[0].length !== 0 ? Math.min(attrX+attrW,+d3.select(d3.selectAll("."+ID+"_lexSeqElements")[0].slice(-1)[0]).attr("x")+elemWidth/2): attrX+attrW;
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
	}
	window.lexicon = new lexiconF;
})();
<!--Lexicon-->