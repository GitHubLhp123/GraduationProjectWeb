(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9efcc90a"],{"026e":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-pie-chart"}),t._v(" schart图表\n            ")])],1)],1),i("div",{staticClass:"container"},[t._m(0),i("div",{staticClass:"schart-box"},[i("div",{staticClass:"content-title"},[t._v("柱状图")]),i("schart",{staticClass:"schart",attrs:{canvasId:"bar",options:t.options1}})],1),i("div",{staticClass:"schart-box"},[i("div",{staticClass:"content-title"},[t._v("折线图")]),i("schart",{staticClass:"schart",attrs:{canvasId:"line",options:t.options2}})],1),i("div",{staticClass:"schart-box"},[i("div",{staticClass:"content-title"},[t._v("饼状图")]),i("schart",{staticClass:"schart",attrs:{canvasId:"pie",options:t.options3}})],1),i("div",{staticClass:"schart-box"},[i("div",{staticClass:"content-title"},[t._v("环形图")]),i("schart",{staticClass:"schart",attrs:{canvasId:"ring",options:t.options4}})],1)])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"plugins-tips"},[t._v("\n            vue-schart：vue.js封装sChart.js的图表组件。\n            访问地址：\n            "),i("a",{attrs:{href:"https://github.com/lin-xin/vue-schart",target:"_blank"}},[t._v("vue-schart")])])}],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("canvas",{attrs:{id:t.canvasId}})])},o=[],l=(i("8e6e"),i("ac6a"),i("456d"),i("ade3")),r=i("b367"),h=i.n(r);function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function d(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){Object(l["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var f={props:{canvasId:{type:String,default:"",required:!0},options:{type:Object,required:!0}},mounted:function(){this.renderChart()},methods:{renderChart:function(){if(this.checkOptions()){var t=d({},this.options);new h.a(this.canvasId,t)}},checkOptions:function(){var t=this.options;return!(!t.datasets||!t.datasets.length)&&!(!t.labels||!t.labels.length)}},watch:{options:{handler:function(t,e){this.renderChart()},deep:!0}}},g=f,u=i("2877"),v=Object(u["a"])(g,n,o,!1,null,null,null),b=v.exports,p={name:"basecharts",components:{Schart:b},data:function(){return{options1:{type:"bar",title:{text:"最近一周各品类销售图"},bgColor:"#fbfbfb",labels:["周一","周二","周三","周四","周五"],datasets:[{label:"家电",fillColor:"rgba(241, 49, 74, 0.5)",data:[234,278,270,190,230]},{label:"百货",data:[164,178,190,135,160]},{label:"食品",data:[144,198,150,235,120]}]},options2:{type:"line",title:{text:"最近几个月各品类销售趋势图"},bgColor:"#fbfbfb",labels:["6月","7月","8月","9月","10月"],datasets:[{label:"家电",data:[234,278,270,190,230]},{label:"百货",data:[164,178,150,135,160]},{label:"食品",data:[114,138,200,235,190]}]},options3:{type:"pie",title:{text:"服装品类销售饼状图"},legend:{position:"left"},bgColor:"#fbfbfb",labels:["T恤","牛仔裤","连衣裙","毛衣","七分裤","短裙","羽绒服"],datasets:[{data:[334,278,190,235,260,200,141]}]},options4:{type:"ring",title:{text:"环形三等分"},showValue:!1,legend:{position:"bottom",bottom:40},bgColor:"#fbfbfb",labels:["vue","react","angular"],datasets:[{data:[500,500,500]}]}}}},x=p,y=(i("9770"),Object(u["a"])(x,a,s,!1,null,"026bc4e4",null));e["default"]=y.exports},4607:function(t,e,i){},9770:function(t,e,i){"use strict";i("4607")},ade3:function(t,e,i){"use strict";function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}i.d(e,"a",(function(){return a}))},b367:function(t,e,i){!function(e,i){t.exports=i()}(0,(function(){"use strict";function t(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function e(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=window.devicePixelRatio||1,a=10*i,s=a/2;return function(){function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.canvas=function(t){var e=document.getElementById(t),a=e.parentNode.clientWidth,s=e.parentNode.clientHeight;return e.style.width=a+"px",e.style.height=s+"px",e.width=a*i,e.height=s*i,e}(t),this.ctx=this.canvas.getContext("2d"),this.type="bar",this.showValue=!0,this.showGrid=!0,this.topPadding=60*i,this.leftPadding=50*i,this.rightPadding=10*i,this.bottomPadding=50*i,this.yEqual=5,this.yLength=0,this.xLength=0,this.ySpace=0,this.xRorate=0,this.yRorate=0,this.bgColor="#fff",this.axisColor="#666",this.gridColor="#eee",this.title={text:"",color:"#666",position:"top",font:"bold "+18*i+"px Arial",top:a,bottom:s},this.legend={display:!0,position:"top",color:"#666",font:14*i+"px Arial",top:45*i,bottom:15*i,textWidth:0},this.radius=100*i,this.innerRadius=60*i,this.colorList=["#4A90E2","#F5A623","#ff5858","#5e64ff","#2AC766","#743ee2","#b554ff","#199475"],this.init(e)}return function(e,i,a){i&&t(e.prototype,i),a&&t(e,a)}(n,[{key:"init",value:function(t){if(t.title=Object.assign({},this.title,t.title),t.legend=Object.assign({},this.legend,t.legend),Object.assign(this,t),!t.labels||!t.labels.length)throw new Error("缺少主要参数labels");if(!t.datasets||!t.datasets.length)throw new Error("缺少主要参数datasets");this.drawBackground(),"bar"===this.type||"line"===this.type?this.renderBarChart():this.renderPieChart(),this.drawLegend()}},{key:"renderBarChart",value:function(){this.yLength=Math.floor((this.canvas.height-this.topPadding-this.bottomPadding-a)/this.yEqual),this.xLength=Math.floor((this.canvas.width-this.leftPadding-this.rightPadding-a)/this.labels.length),this.ySpace=function(t,i){var a=t.map((function(t){return t.data.reduce((function(t,e){return e<t?t:e}))})),s=Math.ceil(Math.max.apply(Math,e(a))/i),n=s.toString().length-1;return n=2<n?2:n,Math.ceil(s/Math.pow(10,n))*Math.pow(10,n)}(this.datasets,this.yEqual),this.drawXAxis(),this.drawYAxis(),this.drawBarContent()}},{key:"drawBarContent",value:function(){var t=this.ctx,e=this.datasets.length;t.beginPath();for(var n=0;n<e;n++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.datasets[n].label).width),t.fillStyle=t.strokeStyle=this.datasets[n].fillColor||this.colorList[n];for(var o=this.datasets[n].data,l=0;l<o.length;l++)if(!(l>this.labels.length-1)){var r=this.xLength/(e+1),h=this.yLength/this.ySpace,c=this.leftPadding+this.xLength*l+r*(n+.5),d=c+r,f=this.canvas.height-this.bottomPadding,g=f-o[l]*h;if("bar"===this.type)t.fillRect(c,g,d-c,f-g),this.drawValue(o[l],c+r/2,g-s);else if("line"===this.type){var u=this.leftPadding+this.xLength*(l+.5);t.beginPath(),t.arc(u,g,3*i,0,2*Math.PI,!0),t.fill(),0!==l&&(t.beginPath(),t.strokeStyle=this.datasets[n].fillColor||this.colorList[n],t.lineWidth=2*i,t.moveTo(u-this.xLength,f-o[l-1]*h),t.lineTo(u,g),t.stroke(),t.lineWidth=1*i),this.drawValue(o[l],u,g-a)}}}t.stroke()}},{key:"renderPieChart",value:function(){for(var t=this.ctx,e=this.labels.length,i=this.datasets[0],a=i.data,s=a.reduce((function(t,e){return t+e})),n=-Math.PI/2,o=this.canvas.width/2,l=this.canvas.height/2,r=0;r<e;r++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.labels[r]).width),t.beginPath(),t.strokeStyle=t.fillStyle=i.colorList&&i.colorList[r]||this.colorList[r],t.moveTo(o,l);var h=n,c=n+=a[r]/s*2*Math.PI;t.arc(o,l,this.radius,h,c),t.closePath(),t.fill();var d=(h+c)/2;this.drawPieValue(a[r],d)}"ring"===this.type&&(t.beginPath(),t.fillStyle=this.bgColor,t.arc(o,l,this.innerRadius,0,2*Math.PI),t.closePath(),t.fill())}},{key:"drawValue",value:function(t,e,a){var s=this.ctx;this.showValue&&(s.textBaseline="middle",s.font=12*i+"px Arial",s.textAlign="center",s.fillText(t,e,a))}},{key:"drawPieValue",value:function(t,e){var i=this.ctx;if(this.showValue){var s=this.canvas.width/2,n=this.canvas.height/2,o=Math.ceil(Math.abs(this.radius*Math.cos(e))),l=Math.floor(Math.abs(this.radius*Math.sin(e)));i.textBaseline="middle",this.showValue&&(e<=0?(i.textAlign="left",i.moveTo(s+o,n-l),i.lineTo(s+o+a,n-l-a),i.moveTo(s+o+a,n-l-a),i.lineTo(s+o+3*a,n-l-a),i.stroke(),i.fillText(t,s+o+3.5*a,n-l-a)):0<e&&e<=Math.PI/2?(i.textAlign="left",i.moveTo(s+o,n+l),i.lineTo(s+o+a,n+l+a),i.moveTo(s+o+a,n+l+a),i.lineTo(s+o+3*a,n+l+a),i.stroke(),i.fillText(t,s+o+3.5*a,n+l+a)):e>Math.PI/2&&e<Math.PI?(i.textAlign="right",i.moveTo(s-o,n+l),i.lineTo(s-o-a,n+l+a),i.moveTo(s-o-a,n+l+a),i.lineTo(s-o-3*a,n+l+a),i.stroke(),i.fillText(t,s-o-3.5*a,n+l+a)):(i.textAlign="right",i.moveTo(s-o,n-l),i.lineTo(s-o-a,n-l-a),i.moveTo(s-o-a,n-l-a),i.lineTo(s-o-3*a,n-l-a),i.stroke(),i.fillText(t,s-o-3.5*a,n-l-a)))}}},{key:"drawBackground",value:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawTitle()}},{key:"drawTitle",value:function(){var t=this.title;if(t.text){var e=this.ctx;e.beginPath(),e.font=t.font,e.textAlign="center",e.fillStyle=t.color,"top"===t.position?(e.textBaseline="top",e.fillText(t.text,this.canvas.width/2,t.top)):(e.textBaseline="bottom",e.fillText(t.text,this.canvas.width/2,this.canvas.height-t.bottom))}}},{key:"drawXAxis",value:function(){var t=this.ctx,e=this.canvas.height-this.bottomPadding+.5;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding,e),t.lineTo(this.canvas.width-this.rightPadding,e),t.stroke(),this.drawXPoint()}},{key:"drawXPoint",value:function(){var t=this.ctx;t.beginPath(),t.font=12*i+"px Microsoft YaHei",t.textAlign=this.xRorate?"right":"center",t.textBaseline="top",t.fillStyle=this.axisColor;for(var e=0;e<this.labels.length;e++){var n=this.labels[e],o=this.leftPadding+this.xLength*(e+1)+.5,l=this.canvas.height-this.bottomPadding;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(o,l),t.lineTo(o,this.topPadding+a)):(t.moveTo(o,l),t.lineTo(o,l-s)),t.stroke(),t.save(),t.translate(o-this.xLength/2,l+s),t.rotate(-this.xRorate*Math.PI/180),t.fillText(n,0,0),t.restore()}}},{key:"drawYAxis",value:function(){var t=this.ctx;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding-.5,this.canvas.height-this.bottomPadding+.5),t.lineTo(this.leftPadding-.5,this.topPadding+.5),t.stroke(),this.drawYPoint()}},{key:"drawYPoint",value:function(){var t=this.ctx;t.font=12*i+"px Microsoft YaHei",t.textAlign="right",t.textBaseline="middle",t.beginPath();for(var e=0;e<this.yEqual;e++){var n=this.leftPadding,o=this.canvas.height-this.bottomPadding-this.yLength*(e+1)+.5;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(n,o),t.lineTo(this.canvas.width-this.rightPadding-a,o)):(t.strokeStyle=this.axisColor,t.moveTo(n-s,o),t.lineTo(n,o)),t.stroke(),t.save(),t.fillStyle=this.axisColor,t.translate(n-a,o),t.rotate(-this.yRorate*Math.PI/180),t.fillText(this.ySpace*(e+1),0,0),t.restore()}}},{key:"drawLegend",value:function(){var t=this.legend;if(t.display){var e=this.ctx,i="pie"===this.type||"ring"===this.type;e.beginPath(),e.font=t.font,e.textAlign="left",e.textBaseline="middle";for(var n=i?this.labels.length:this.datasets.length,o=(this.canvas.width-(this.legend.textWidth+(5*n-2)*a))/2,l=0,r=0;r<n;r++){var h=i?this.datasets[0]:this.datasets[r],c=(i?this.labels[r]:h.label)||"";e.fillStyle=h.colorList&&h.colorList[r]||h.fillColor||this.colorList[r],"top"===t.position?(this.drawLegendIcon(o+5*a*r+l,t.top-s,2*a,a),e.fillStyle=t.color,e.fillText(c,o+(5*r+3)*a+l,t.top)):"bottom"===t.position?(this.drawLegendIcon(o+5*a*r+l,this.canvas.height-t.bottom-s,2*a,a),e.fillStyle=t.color,e.fillText(c,o+(5*r+3)*a+l,this.canvas.height-t.bottom)):(e.fillRect(a,t.top+2*a*r,2*a,a),e.fillStyle=t.color,e.fillText(c,4*a,t.top+2*a*r+.5*a)),l+=Math.ceil(e.measureText(c).width)}}}},{key:"drawLegendIcon",value:function(t,e,n,o){var l=this.ctx;"line"===this.type?(l.beginPath(),l.strokeStyle=l.fillStyle,l.lineWidth=2*i,l.moveTo(t,e+s),l.lineTo(t+2*a,e+s),l.stroke(),l.lineWidth=1*i,l.arc(t+a,e+s,3*i,0,2*Math.PI,!0),l.fill()):l.fillRect(t,e,n,o)}}]),n}()}))}}]);