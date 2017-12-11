<!--Lexicon-->
(function (){
	function lexiconCompareF () {
		var ID = ID || "lexicon_"+Math.round(Math.random()*100);
		var _seq_ = _seq_ || window.capturedSeq || "LE-IC-N";
		var _data_ = _seq_.split("");
		var _muts_ = {};
		var _valuesX_ = [];
		var _valuesY_ = [];
		var attrX = attrX || 0;
		var attrY = attrY || 0;
		var attrW = attrW || 100;
		var attrH = attrH || 100;
		var styleW = styleW || "100px";
		var styleH = styleH || "100px";
		var styleMargin = styleMargin || "0px";
		var bColor = bColor || "DimGray";
		var bOpacity = bOpacity || 0.25;
		var pColor = pColor || "DimGray";
		var pHighlight = pHighlight || "Red";
		var pOpacity = pOpacity || 0.75;
		var boxColor = boxColor || "DimGray";
		var boxOpacity = boxOpacity || 0.2;
		var _container_ = _container_ || document.body;
		var position = position || "relative"
		var top = top || "0px";
		var left = left || "0px";
		var offset = 0;
		var line = d3.svg.line();
		var padding = 0.05*attrW;
		var _this_ = this;
		var submitF = function(){alert("no function was loaded..")}
		var _submitText = "Submit sequence";
		var _orientSubmit = "top";
		var _fontConstant_ = 1;
		var _unlink_ = false;
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
		this.pColor = function(u){pColor=u;return this;}
		this.pHighlight = function(u){pHighlight=u;return this;}
		this.pOpacity = function(u){pOpacity=u;return this;}
		this.boxColor = function(u){boxColor=u;return this;}
		this.boxOpacity = function(u){boxOpacity=u;return this;}
		this.container = function(u){_container_ = u;return this;}
		this.sTop = function(u){top = u; return this;}
		this.sLeft = function(u){left = u; return this;}
		this.sMargin = function(u){styleMargin = u; return this;}
		//Do not call the below function yourself, it is automatically called by the sync method before append takes place.
		this.seq = function(u){if(arguments.length !== 0){_seq_ = u; _data_ = _seq_.split(""); _muts_ = {};return this;}else{return _seq_;}}
		this.offSet = function(u){offset=u; return this;}
		this.viewport = function(u){nElementsInView = u; return this;}
		this.submit = function(f){submitF = f.bind(_this_); return this;}
		this.submitOrient = function(u){_orientSubmit=u;return this;}
		this.submitText = function(u){if(arguments.length !== 0){_submitText=u;return this;}else{return _submitText;}}
		this.fontConstant = function(u){_fontConstant_ = u;return this;}
		this.valuesX = function(){return _valuesX_;}
		this.valuesY = function(){return _valuesY_;}
		var _objSync_ = [];
		this.sync = function(u){if(arguments.length !== 0){_objSync_ = u; this.seq(_objSync_[0].seq()); _valuesX_ = this.rescale(_objSync_[0].values().normalized); _valuesY_ = this.rescale(_objSync_[1].values().normalized); if(_objSync_[0].seq().length !== _objSync_[1].seq().length){alert("Your objects to compare do not encompass the same length. Check your data.");}; return this;}else{return _objSync_;}}
		this._sync_ = function(issuer){var length = _objSync_.length; for(var i =0;i<length;i++){if(issuer === _this_||(_objSync_[i]!==issuer && issuer.sync().every(function(d){return d!==_objSync_[i];}))){_objSync_[i].offSet(offset);_objSync_[i].viewport(nElementsInView);_objSync_[i].render(issuer);}}}
		this.isAppended = false;
		this.unlink = function(u){_unlink_=u;return this;}
		this.append = function () {
			this.isAppended = true;
			d3.select(_container_).append("svg").attr("preserveAspectRatio","none").attr("id",ID).attr("viewBox",attrX+" "+attrY+" "+(attrX+attrW)+" "+(attrY+attrH)).style("width",styleW).style("height",styleH).style("padding","0px").style("margin","0px").style("display","block").style("position",position).style("top",top).style("left",left).style("overflow","hidden").style("line-height","normal").style("margin",styleMargin);
			d3.select("#"+ID).append("svg:rect").attr("id",function(){return ID+"_rect";}).attr("x",function(){return (attrX+attrW)/2;}).attr("y",function(){return (attrY+attrH)/2;}).attr("width",0).attr("height",0).attr("rx",15).attr("ry",15).attr("fill-opacity",bOpacity).attr("fill",bColor);
			warp(ID+"_rect",attrW,attrH);
		
			//***Defs***
			d3.select("#"+ID).append("svg:defs").attr("id",ID+"_extras");
			d3.select("#"+ID+"_extras").append("filter").attr("id",ID+"_blurFilter").attr("x","-5%").attr("y","-5%").attr("width","110%").attr("height","110%");
			d3.select("#"+ID+"_blurFilter").append("feGaussianBlur").attr("in","SourceGraphic").attr("stdDeviation",5);
			//***Defs***
			
			//SUBMIT SEQUENCE
			d3.select("#"+ID).append("text").text(_submitText).attr("id",ID+"_submit_text").attr("class","global_submit_texts").style("cursor","pointer").attr("x",attrX+attrW/2).attr("dx",0).attr("y",function(){if(_orientSubmit!=="bottom"){return attrY+padding*_fontConstant_;}else{return attrY+attrH-2;}}).attr("dy",0).attr("font-family","advent-pro").attr("font-weight",300).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Green").attr("fill-opacity",0.75).attr("stroke","Green").attr("stroke-width",1)
			.on("mouseover",function(d,i){d3.select(this).transition().attr("fill-opacity",0.9).attr("stroke-width",2).delay(0).duration(250);})
			.on("mouseout",function(d,i){d3.select(this).transition().attr("fill-opacity",0.75).attr("stroke-width",1).delay(0).duration(250);})
			.on("click",function(d,i){
				submitF(_seq_,_data_,_muts_);
			});
			
			//configure Main axes
				//x=y;z=2sqrt(2)x
			var axisLength = 2*(attrH-2*padding)/(Math.sqrt(2)+6);
			var axisMirrorLength = (attrH-4*padding)/5;
				//y
			var scaleY = d3.scale.linear().domain([0,1]).range([axisLength,0]).nice();
			var axisY = d3.svg.axis().scale(scaleY).orient("left").ticks(10).tickSize(attrH/100,0).tickPadding(10);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisY").attr("class","global_lexMainAxes").attr("transform","translate("+padding+","+(2*axisLength+padding)+")").call(axisY);
				//x
			var scaleX = d3.scale.linear().domain([0,1]).range([0,axisLength]).nice();
			var axisX = d3.svg.axis().scale(scaleX).orient("left").ticks(10).tickSize(attrH/100,0).tickPadding(10);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisX").attr("class","global_lexMainAxes").attr("transform","rotate(-45,0,0) translate("+(-3*axisLength/Math.sqrt(2))+","+(3*axisLength/Math.sqrt(2)+padding*Math.sqrt(2))+")").call(axisX);
				//z
			var scaleZ = d3.scale.linear().domain([1,_data_.length]).range([0,axisLength*2*Math.sqrt(2)]);
			var axisZ = d3.svg.axis().scale(scaleZ).orient("bottom").ticks(10).tickSize(attrH/50,0).tickPadding(10).tickFormat(d3.format("d"));
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisZ").attr("class","global_lexMainAxes").attr("transform","rotate(-45,0,0) translate("+(-3*axisLength/Math.sqrt(2))+","+(3*axisLength/Math.sqrt(2)+padding*Math.sqrt(2))+")").call(axisZ);
			
			//configure Mirror axes
				//x of XZ
			var scaleXmirror = d3.scale.linear().domain([0,1]).range([0,axisMirrorLength]).nice();
			var axisXmirror = d3.svg.axis().scale(scaleXmirror).orient("bottom").ticks(0).tickSize(0,3).tickPadding(10);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisXZmirror").attr("class","global_lexMainAxes").attr("transform","translate("+(attrW-2*axisMirrorLength-padding)+","+(axisMirrorLength*2+padding)+")").call(axisXmirror);
				//z of XZ - Z needs to be declared before because render function will update the domain
			scaleZmirror.domain([Math.floor(offset+1),Math.min(Math.ceil(offset+1+attrW/(attrW-2*padding)*nElementsInView),_data_.length)]).range([2*axisMirrorLength,0]);
			axisZmirror.tickSize(-axisMirrorLength,2);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisZXmirror").attr("class","global_lexMainAxes").attr("transform","translate("+(attrW-2*axisMirrorLength-padding)+","+padding+")").call(axisZmirror);
				//x of YX
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisXYmirror").attr("class","global_lexMainAxes").attr("transform","translate("+(attrW-2*axisMirrorLength-padding)+","+(axisMirrorLength*3+padding*2)+")").call(axisXmirror);
				//y of YX
			var scaleYmirror = d3.scale.linear().domain([0,1]).range([axisMirrorLength,0]).nice();
			var axisYmirror = d3.svg.axis().scale(scaleYmirror).orient("left").ticks(5).tickSize(-axisMirrorLength,2).tickPadding(10);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisYXmirror").attr("class","global_lexMainAxes").attr("transform","translate("+(attrW-2*axisMirrorLength-padding)+","+(axisMirrorLength*2+padding*2)+")").call(axisYmirror);
				//z of ZY
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisZYmirror").attr("class","global_lexMainAxes").attr("transform","translate("+(attrW-2*axisMirrorLength-padding)+","+(axisMirrorLength*3+padding*3)+")").call(axisZmirror);
				//y of ZY
			axisXmirror.ticks(5).tickSize(-axisMirrorLength*5-padding*2,3);
			d3.select("#"+ID).append("g").attr("id",ID+"_lexAxisYZmirror").attr("class","global_lexMainAxes").attr("transform","translate("+(attrW-2*axisMirrorLength-padding)+","+(axisMirrorLength*5+padding*3)+")").call(axisXmirror);
			
			//add the axes labels
			var axesLabels = d3.select("#"+ID).append("g").attr("class","global_lexAxesLabels global_lexMainAxes");
			axesLabels.append("text").text(function(){if(_objSync_[1].submitText().length>10){return _objSync_[1].submitText().slice(0,10)+".."}else{return _objSync_[1].submitText();}}).style("cursor","default").attr("x",padding).attr("y",2*axisLength).attr("transform","rotate(-90,"+padding+","+2*axisLength+")").attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text(function(){if(_objSync_[0].submitText().length>10){return _objSync_[0].submitText().slice(0,10)+".."}else{return _objSync_[0].submitText();}}).style("cursor","default").attr("x",2*padding+axisLength/Math.sqrt(2)).attr("y",attrH-padding).attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text("residue count").style("cursor","default").attr("x",padding+axisLength).attr("y",padding+axisLength).attr("transform","rotate(-45,"+(padding+axisLength)+","+axisLength+")").attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text("residue count").style("cursor","default").attr("x",attrW-2*padding-2*axisMirrorLength).attr("y",padding+axisMirrorLength).attr("transform","rotate(-90,"+(attrW-2*padding-2*axisMirrorLength)+","+(padding+axisMirrorLength)+")").attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text("residue count").style("cursor","default").attr("x",attrW-2*padding-2*axisMirrorLength).attr("y",3*padding+4*axisMirrorLength).attr("transform","rotate(-90,"+(attrW-2*padding-2*axisMirrorLength)+","+(3*padding+4*axisMirrorLength)+")").attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text(function(){if(_objSync_[1].submitText().length>10){return _objSync_[1].submitText().slice(0,10)+".."}else{return _objSync_[1].submitText();}}).style("cursor","default").attr("x",attrW-2*padding-2*axisMirrorLength).attr("y",2*padding+2.5*axisMirrorLength).attr("transform","rotate(-90,"+(attrW-2*padding-2*axisMirrorLength)+","+(2*padding+2.5*axisMirrorLength)+")").attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text(function(){if(_objSync_[0].submitText().length>10){return _objSync_[0].submitText().slice(0,10)+".."}else{return _objSync_[0].submitText();}}).style("cursor","default").attr("x",attrW-2*padding).attr("y",2*padding+3*axisMirrorLength).attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text(function(){if(_objSync_[0].submitText().length>10){return _objSync_[0].submitText().slice(0,10)+".."}else{return _objSync_[0].submitText();}}).style("cursor","default").attr("x",attrW-2*padding).attr("y",padding+2*axisMirrorLength).attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			axesLabels.append("text").text(function(){if(_objSync_[1].submitText().length>10){return _objSync_[1].submitText().slice(0,10)+".."}else{return _objSync_[1].submitText();}}).style("cursor","default").attr("x",attrW-2*padding).attr("y",3*padding+5*axisMirrorLength).attr("font-family","advent-pro").attr("font-weight",400).attr("text-anchor","middle").attr("font-size",attrW/45*_fontConstant_).attr("fill","Black").attr("fill-opacity",0.85).attr("stroke","Black").attr("stroke-width",1);
			
			this.renderStatic();
			this.box = new this.generateBox();
			this.box.append();
			return this;
		}

		//render related variables and the main function
		var nElementsInView = 30;
		var scaleZmirror = d3.scale.linear().domain([Math.floor(offset+1),Math.min(Math.ceil(offset+1+attrW/(attrW-2*padding)*nElementsInView),_data_.length)]);
		var axisZmirror = d3.svg.axis().scale(scaleZmirror).orient("left").ticks(5).tickPadding(10);
		//resusable arrays for AA reference
		var aaSymbols = {Nonpolar:"Gray",Polar:"DeepPink",Positive:"Red",Negative:"Blue",Aromatic:"Green",Stop:"Orange"};
		var aminoacidsX = {"A":["Alanine","Nonpolar"],"R":["Arginine","Positive"],"N":["Asparagine","Polar"],"D":["Aspartic-Acid","Negative"],"C":["Cysteine","Polar"],"Q":["Glutamine","Polar"],"E":["Glutamic-Acid","Negative"],"G":["Glycine","Nonpolar"],"H":["Histidine","Positive"],"I":["Isoleucine","Nonpolar"],"L":["Leucine","Nonpolar"],"K":["Lysine","Positive"],"M":["Methionine","Nonpolar"],"F":["Phenylalanine","Aromatic"],"P":["Proline","Nonpolar"],"S":["Serine","Polar"],"T":["Threonine","Polar"],"W":["Tryptophan","Aromatic"],"Y":["Tyrosine","Aromatic"],"V":["Valine","Nonpolar"],"X":["Stop","Stop"]};
		var aminoacids_OtherProperties = {"A":["Hydrophobic","Aliphatic"],"R":["Hydrophilic","H-bonding","Basic","Ionizable"],"N":["Hydrophilic"],"D":["Hydrophilic","H-bonding","Acidic","Ionizable"],"C":["Hydrophilic","H-bonding","Sulfur-containing","Acidic","Ionizable","Disulfide-bond"],"Q":["Hydrophilic","H-bonding"],"E":["Hydrophilic","H-bonding","Acidic","Ionizable"],"G":["Hydrophobic","Aliphatic"],"H":["Hydrophilic","H-bonding","Basic","Ionizable","All-aromatic"],"I":["Hydrophobic","Aliphatic"],"L":["Hydrophobic","Aliphatic"],"K":["Hydrophilic","H-bonding","Basic","Ionizable"],"M":["Hydrophobic","Sulfur-containing"],"F":["Hydrophobic","All-aromatic"],"P":["Hydrophobic","Aliphatic","Cyclic"],"S":["Hydrophilic","H-bonding"],"T":["Hydrophilic","H-bonding"],"W":["Hydrophobic","H-bonding","All-aromatic"],"Y":["Hydrophobic","H-bonding","Ionizable","All-aromatic"],"V":["Hydrophobic","Aliphatic"]};
		
		this.renderStatic = function() {
			var axisLength = 2*(attrH-2*padding)/(Math.sqrt(2)+6);
			var axisProjection = axisLength/Math.sqrt(2);
			var axisLengthZProjection = axisLength*2;
			var axisMirrorLength = (attrH-4*padding)/5;
			var xOffset = attrW-2*axisMirrorLength-padding;
			var length = _data_.length-1;
			//i = Z, _valuesY_[i] = Y , _valuesX_[i] = X
			d3.selectAll("."+ID+"lex_Static").remove();
			d3.select("#"+ID).append("g").attr("id",ID+"lex_Static_Group").selectAll("."+ID+"lex_Static")
			.data(_data_)
			.enter()
			.append("circle")
			.attr("r",attrH/200)
			.attr("cx",function(d,i){return padding+i/length*axisLengthZProjection+_valuesX_[i]*axisProjection;})
			.attr("cy",function(d,i){return attrH-padding-axisProjection-_valuesY_[i]*axisLength-i/length*axisLengthZProjection+_valuesX_[i]*axisProjection;})
			.attr("fill",pColor)
			.attr("stroke","none")
			.attr("fill-opacity",pOpacity/2)
			.attr("class",ID+"lex_Static global_lexStaticPoints");
			//.attr("filter","url(#"+ID+"_blurFilter)");
			
			//Mirror groups - passed X,Y,Xoffset,Yoffset,Yscale
			d3.select("#"+ID).selectAll("."+ID+"_lexMirrors")
			.data([[_valuesX_,_data_,xOffset,(2*axisMirrorLength+padding),2],[_valuesX_,_valuesY_,xOffset,(3*axisMirrorLength+2*padding),1],[_valuesY_,_data_,xOffset,(5*axisMirrorLength+3*padding),2]])
			.enter()
			.append("g")
			.attr("class",ID+"_lexMirrors global_lexMirrors")
			.each(_this_.plotMirrors);
		}
		
		this.render = function (issuer) {
			issuer = issuer===undefined?_this_:issuer;
			offset = Math.min(Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView),Math.max(0,offset));
			
			//.attr("filter","url(#"+ID+"_blurFilter)") ---> I had to remove this from the below line, huge impact on Firefox's performance...Instead I added --->.attr("fill-opacity",pOpacity/2)
			d3.selectAll("."+ID+"lex_Static").attr("fill-opacity",pOpacity/2).attr("fill",pColor).classed("global_lexHighlighted",false);
			d3.selectAll("."+ID+"lex_Static").filter(function(d,i){return i>=Math.floor(offset) && i<=Math.ceil(offset+attrW/(attrW-2*padding)*nElementsInView)})
			.classed("global_lexHighlighted",true)
			//.attr("filter","none") --->Instead of this I added below:
			.attr("fill-opacity",pOpacity)
			.attr("fill",pHighlight);
			
			//update Z axis mirros
			scaleZmirror.domain([Math.floor(offset+1),Math.ceil(offset+1+attrW/(attrW-2*padding)*nElementsInView)]);
			d3.select("#"+ID+"_lexAxisZXmirror").call(axisZmirror);
			d3.select("#"+ID+"_lexAxisZYmirror").call(axisZmirror);
			
			//update mirror groups
			d3.select("#"+ID).selectAll("."+ID+"_lexMirrors").each(_this_.plotMirrors);
			
			//update controllers
			if (_unlink_===false) {
				this._sync_(issuer);
			}
			this.box.update();
		}
		this.smoothRender = function (count,_offset_,delay,duration) {
			d3.select("#"+ID).transition("smoothRender").tween("smoothRender",function(){var interpolator = d3.interpolate(nElementsInView,count); var interpolatorOffSet = d3.interpolate(offset,_offset_); return function(t){nElementsInView = interpolator(t); offset = interpolatorOffSet(t); _this_.render();}}).delay(delay).duration(duration);
		}
		this.generateBox = function (){
			var g = d3.select("#"+ID).append("g").attr("id",ID+"_lexBox");
			var axisLength = 2*(attrH-2*padding)/(Math.sqrt(2)+6);
			var axisLengthZ = axisLength*2*Math.sqrt(2);
			var axisProjection = axisLength/Math.sqrt(2);
			//ratio of current box viewport to entire Z axis length.
			this.ratio = function(){return Math.min(nElementsInView*attrW/(attrW-2*padding)/_data_.length,1);}
			this.variableArm = function(){return axisLengthZ*this.ratio();}
			this.variableArmProjection = function(){return axisLengthZ*this.ratio()/Math.sqrt(2);}
			var botFace = [[padding,attrH-padding-axisProjection],[padding+this.variableArmProjection(),attrH-padding-axisProjection-this.variableArmProjection()],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()],[padding+axisProjection,attrH-padding]];
			var backSide = [[padding,attrH-padding-axisProjection],[padding,attrH-padding-axisProjection-axisLength],[padding+this.variableArmProjection(),attrH-padding-axisProjection-axisLength-this.variableArmProjection()],[padding+this.variableArmProjection(),attrH-padding-axisProjection-this.variableArmProjection()]];
			var backFace = [[padding+this.variableArmProjection(),attrH-padding-axisProjection-this.variableArmProjection()],[padding+this.variableArmProjection(),attrH-padding-axisProjection-axisLength-this.variableArmProjection()],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()-axisLength],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()]];
			var topFace = [[padding,attrH-padding-axisProjection-axisLength],[padding+this.variableArmProjection(),attrH-padding-axisProjection-axisLength-this.variableArmProjection()],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()-axisLength],[padding+axisProjection,attrH-padding-axisLength]];
			var frontSide = [[padding+axisProjection,attrH-padding],[padding+axisProjection,attrH-padding-axisLength],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()-axisLength],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()]];
			var frontFace = [[padding,attrH-padding-axisProjection],[padding,attrH-padding-axisProjection-axisLength],[padding+axisProjection,attrH-padding-axisLength],[padding+axisProjection,attrH-padding]];
			this.append = function() {
				g.append("path").attr("id",ID+"_lexBackSide").attr("class","global_lexCompareBoxes").attr("d",function(){return line(backSide)+"Z"}).attr("fill-opacity",boxOpacity).attr("stroke-opacity",boxOpacity).attr("fill",boxColor).attr("stroke",boxColor).attr("stroke-width",2);
				g.append("path").attr("id",ID+"_lexBottomFace").attr("class","global_lexCompareBoxes").attr("d",function(){return line(botFace)+"Z"}).attr("fill-opacity",boxOpacity).attr("stroke-opacity",boxOpacity).attr("fill",boxColor).attr("stroke",boxColor).attr("stroke-width",2);
				g.append("path").attr("id",ID+"_lexBackFace").attr("class","global_lexCompareBoxes").attr("d",function(){return line(backFace)+"Z"}).attr("fill-opacity",boxOpacity).attr("stroke-opacity",boxOpacity).attr("fill",boxColor).attr("stroke",boxColor).attr("stroke-width",2);
				g.append("path").attr("id",ID+"_lexTopFace").attr("class","global_lexCompareBoxes").attr("d",function(){return line(topFace)+"Z"}).attr("fill-opacity",boxOpacity).attr("stroke-opacity",boxOpacity).attr("fill",boxColor).attr("stroke",boxColor).attr("stroke-width",2);
				g.append("path").attr("id",ID+"_lexFrontSide").attr("class","global_lexCompareBoxes").attr("d",function(){return line(frontSide)+"Z"}).attr("fill-opacity",boxOpacity).attr("stroke-opacity",boxOpacity).attr("fill",boxColor).attr("stroke",boxColor).attr("stroke-width",2);
				g.append("path").attr("id",ID+"_lexFrontFace").attr("class","global_lexCompareBoxes").attr("d",function(){return line(frontFace)+"Z"}).attr("fill-opacity",boxOpacity).attr("stroke-opacity",boxOpacity).attr("fill",boxColor).attr("stroke",boxColor).attr("stroke-width",2);
				
				
				var drag = d3.behavior.drag().origin(function(){var coords = d3.select(this).attr("transform").replace(/\s*translate\s*[(]|\s*[)]\s*/gi,"").split(/,|\s+/gi);var x = +coords[0]+padding; var y = +coords[coords.length-1]+attrH-padding-axisProjection; return {"x":x,"y":y};}).on("drag", dragFunc).on("dragstart",function (){d3.event.sourceEvent.stopPropagation();});
				function dragFunc() {
					var mouseX = (d3.event.x)-(attrX+padding);
					var min = 0;
					var max = axisLengthZ/Math.sqrt(2);
					d3.select(this).attr("transform","translate("+Math.max(min,Math.min(mouseX,max))+","+Math.max(min,Math.min(mouseX,max))+")");
					var maxOffSet = Math.max(0,_data_.length-nElementsInView-2*padding/(attrW-2*padding)*nElementsInView);
					offset = Math.min(maxOffSet,Math.max(0,(mouseX-min)/(max-min)*maxOffSet));
					_this_.render();
				}
				g.call(drag);
				return this;
			}
			this.update = function() {
				botFace = [[padding,attrH-padding-axisProjection],[padding+this.variableArmProjection(),attrH-padding-axisProjection-this.variableArmProjection()],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()],[padding+axisProjection,attrH-padding]];
				backSide = [[padding,attrH-padding-axisProjection],[padding,attrH-padding-axisProjection-axisLength],[padding+this.variableArmProjection(),attrH-padding-axisProjection-axisLength-this.variableArmProjection()],[padding+this.variableArmProjection(),attrH-padding-axisProjection-this.variableArmProjection()]];
				backFace = [[padding+this.variableArmProjection(),attrH-padding-axisProjection-this.variableArmProjection()],[padding+this.variableArmProjection(),attrH-padding-axisProjection-axisLength-this.variableArmProjection()],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()-axisLength],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()]];
				topFace = [[padding,attrH-padding-axisProjection-axisLength],[padding+this.variableArmProjection(),attrH-padding-axisProjection-axisLength-this.variableArmProjection()],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()-axisLength],[padding+axisProjection,attrH-padding-axisLength]];
				frontSide = [[padding+axisProjection,attrH-padding],[padding+axisProjection,attrH-padding-axisLength],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()-axisLength],[padding+this.variableArmProjection()+axisProjection,attrH-padding-this.variableArmProjection()]];
				
				d3.select("#"+ID+"_lexBackSide").attr("d",function(){return line(backSide)+"Z"});
				d3.select("#"+ID+"_lexBottomFace").attr("d",function(){return line(botFace)+"Z"});
				d3.select("#"+ID+"_lexBackFace").attr("d",function(){return line(backFace)+"Z"});
				d3.select("#"+ID+"_lexTopFace").attr("d",function(){return line(topFace)+"Z"});
				d3.select("#"+ID+"_lexFrontSide").attr("d",function(){return line(frontSide)+"Z"});
				
				g.attr("transform",function(){var translateXY = offset/_data_.length*axisLengthZ/Math.sqrt(2); return "translate("+translateXY+","+(-translateXY)+")";});
			}
		}
		this.rescale = function (a) {
			var min = d3.min(a);
			var max = d3.max(a);
			return a.map(function(d,i){return (d-min)/(max-min);})
		}
		this.plotMirrors = function(data) {
			//console.log(this);
			//console.log(data);
			var axisMirrorLength = (attrH-4*padding)/5;
			var dataX = data[0], dataY = data[1], xOffset = data[2], yOffset = data[3], yScale = data[4];
			//slice does not return the last specified index, thats why there is +1
			var dataSeq = _data_.slice(Math.floor(offset),Math.ceil(offset+1+attrW/(attrW-2*padding)*nElementsInView));
			var length = dataSeq.length-1;
			var circles = d3.select(this).selectAll("circle");
			//enter
			circles
			.data(dataSeq)
			.enter()
			.append("circle")
			.attr("cx",function(d,i){return xOffset+axisMirrorLength*dataX[Math.floor(offset)+i];})
			.attr("cy",function(d,i){var point = dataY[Math.floor(offset)+i]; return typeof point === "number"? yOffset-yScale*(axisMirrorLength*point):yOffset - yScale*(axisMirrorLength*i/length)})
			.attr("r",attrH/200)
			.attr("fill-opacity",pOpacity)
			.attr("fill",pHighlight)
			.on("mouseover",function(d,i){
				d3.select(this).attr("r",attrH/100);
				d3.selectAll("."+ID+"_lexMirrors").selectAll("circle:nth-child("+(i+1)+")").attr("fill","yellow").attr("r",attrH/100);
				d3.select("#"+ID+"lex_Static_Group").selectAll("circle:nth-child("+(Math.floor(offset)+i+1)+")").attr("fill","yellow").attr("r",attrH/100);
				if (_unlink_===false) {
					mimicMouseover.bind(this)(d,i);
				}
			})
			.on("mouseout",function(d,i){
				d3.select(this).attr("r",attrH/200);
				d3.selectAll("."+ID+"_lexMirrors").selectAll("circle").attr("fill",pHighlight).attr("r",attrH/200);
				d3.selectAll("."+ID+"lex_Static.global_lexHighlighted").attr("fill",pHighlight).attr("r",attrH/200);
				//its for lexicons that need explicit mouseout event
				if (_unlink_===false) {
					mimicMouseout.bind(this)(d,i);
				}
			});
			//exit
			circles
			.data(dataSeq)
			.exit()
			.remove();
			//update
			circles
			.data(dataSeq)
			.attr("cx",function(d,i){return xOffset+axisMirrorLength*dataX[Math.floor(offset)+i];})
			.attr("cy",function(d,i){var point = dataY[Math.floor(offset)+i]; return typeof point === "number"? yOffset-yScale*(axisMirrorLength*point):yOffset - yScale*(axisMirrorLength*i/length)})
			.on("mouseover",function(d,i){
				d3.select(this).attr("r",attrH/100);
				d3.selectAll("."+ID+"_lexMirrors").selectAll("circle:nth-child("+(i+1)+")").attr("fill","yellow").attr("r",attrH/100);
				d3.select("#"+ID+"lex_Static_Group").selectAll("circle:nth-child("+(Math.floor(offset)+i+1)+")").attr("fill","yellow").attr("r",attrH/100);
				if (_unlink_===false) {
					mimicMouseover.bind(this)(d,i);
				}
			})
			.on("mouseout",function(d,i){
				d3.select(this).attr("r",attrH/200);
				d3.selectAll("."+ID+"_lexMirrors").selectAll("circle").attr("fill",pHighlight).attr("r",attrH/200);
				d3.selectAll("."+ID+"lex_Static.global_lexHighlighted").attr("fill",pHighlight).attr("r",attrH/200);
				//its for lexicons that need explicit mouseout event
				if (_unlink_===false) {
					mimicMouseout.bind(this)(d,i);
				}
			});
		
			function mimicMouseover (d,i) {
				var length = _objSync_.length;
				for (var u = 0;u<length;u++) {
					var _instanceof_ =  _objSync_[u].constructor;
					switch (_instanceof_) {
						case window["lexiconPlot"].constructor:
							d3.select("#"+_objSync_[u].lexID()+"_lexPlotElement"+i).on("mouseover")(_objSync_[u].values().normalized[Math.floor(offset)+i],i);
							break;
						case window["lexiconSS"].constructor:
							d3.select("#"+_objSync_[u].lexID()+"_lexPlotElement"+i).on("mouseover")(_objSync_[u].values().normalized[Math.floor(offset)+i],i);
							break;
						case window["lexiconCompare"].constructor:
							break;
						case window["lexicon"].constructor:
							d3.select("#"+_objSync_[u].lexID()+"_lexSeqElement"+i).on("mouseover").bind(document.getElementById(_objSync_[u].lexID()+"_lexSeqElement"+i))();
					}
				}
			}
			function mimicMouseout (d,i) {
				var length = _objSync_.length;
				for (var u = 0;u<length;u++) {
					var _instanceof_ =  _objSync_[u].constructor;
					switch (_instanceof_) {
						case window["lexiconPlot"].constructor:
							break;
						case window["lexiconSS"].constructor:
							break;
						case window["lexiconCompare"].constructor:
							break;
						case window["lexicon"].constructor:
							d3.select("#"+_objSync_[u].lexID()+"_lexSeqElement"+i).on("mouseout").bind(document.getElementById(_objSync_[u].lexID()+"_lexSeqElement"+i))();
					}
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
	window.lexiconCompare = new lexiconCompareF;
})();
<!--Lexicon-->