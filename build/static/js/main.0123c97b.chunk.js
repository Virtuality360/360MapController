(this["webpackJsonpreact-controller"]=this["webpackJsonpreact-controller"]||[]).push([[0],{48:function(t,e,n){},51:function(t,e){},72:function(t,e,n){"use strict";n.r(e);var o=n(4),a=n.n(o),r=n(11),c=n.n(r),i=(n(48),n(15)),s=n(16),p=n(19),u=n(18),l=n(21),h=n.p+"static/media/alma.690bd3af.jpg",j=(n.p,n(7)),b=function(){return Object(j.jsx)("div",{children:Object(j.jsxs)(l.a,{width:"100%",height:"100%",image:h,pitch:10,yaw:180,hfov:110,autoLoad:!0,onLoad:function(){console.log("panorama loaded")},children:[Object(j.jsx)(l.a.Hotspot,{type:"info",pitch:11,yaw:-167,text:"Info Hotspot Text 3",URL:"https://github.com/farminf/pannellum-react"}),Object(j.jsx)(l.a.Hotspot,{type:"info",pitch:31,yaw:-107,text:"Info Hotspot Text 4",URL:"https://github.com/farminf/pannellum-react"})]})})},f=n(74),d=n(75),m=n(1),g=n.n(m),O=n(10),v=n(73),x=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"createButtonControl",value:function(){var t=this;return new(g.a.Control.extend({onAdd:function(e){var n=g.a.DomUtil.create("button","");t.helpDiv=n,n.innerHTML=t.props.title;var o=t;return n.addEventListener("click",(function(){o.props.toggleMap("PanoViewer")})),n}}))({position:this.props.position})}},{key:"componentDidMount",value:function(){var t=this.props.map;this.createButtonControl().addTo(t)}},{key:"componentWillUnmount",value:function(){this.helpDiv.remove()}},{key:"render",value:function(){return null}}]),n}(a.a.Component);var y,w=(y=x,function(t){var e=Object(v.a)();return Object(j.jsx)(y,Object(O.a)(Object(O.a)({},t),{},{map:e}))}),C=(n(67),n(68),n(69),n(70),function(t){return Object(j.jsxs)(f.a,{center:[0,0],zoom:3,scrollWheelZoom:!1,style:{height:"100vh",width:"100wh"},children:[Object(j.jsx)(d.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"}),Object(j.jsx)(w,{title:"Switch",position:"topleft",toggleMap:t.toggleMap})]})}),M=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var o;return Object(i.a)(this,n),(o=e.call(this,t)).switchComponent=function(t){o.setState({currentComponent:t})},o.state={currentComponent:"Map"},o}return Object(s.a)(n,[{key:"render",value:function(){return Object(j.jsx)("div",{children:Object(j.jsxs)("div",{children:["Map"===this.state.currentComponent&&Object(j.jsx)(C,{toggleMap:this.switchComponent}),"PanoViewer"===this.state.currentComponent&&Object(j.jsx)(b,{toggleMap:this.switchComponent})]})})}}]),n}(a.a.Component),k=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,76)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),o(t),a(t),r(t),c(t)}))};c.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(M,{})}),document.getElementById("root")),k()}},[[72,1,2]]]);
//# sourceMappingURL=main.0123c97b.chunk.js.map