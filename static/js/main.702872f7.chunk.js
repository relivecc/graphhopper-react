(this["webpackJsonp@relive/graphhopper-react"]=this["webpackJsonp@relive/graphhopper-react"]||[]).push([[0],{181:function(e,t){},271:function(e,t,n){e.exports=n(401)},277:function(e,t,n){},297:function(e,t,n){},376:function(e,t){},401:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(49),c=n.n(o),i=(n(276),n(277),n(72)),l=n(80),s=n.n(l),u=n(110),b=n(32),p=n(437),d=n(430),h=n(449),f=n(448),O=n(431),m=n(432),v=n(443),j=n(433),g=n(441),y=n(6),C=n(98),_=n(434),E=n(90),k=(n(297),n(163)),S=n(242),A=n(159);function P(e){var t=e.content,n=e.text,o=e.isHighlighted,c=Object(k.c)(),i=c.isVisible,l=c.closeOverflowMenu,s=Object(r.useState)(!1),u=Object(b.a)(s,2),p=u[0],d=u[1];if(!i)return a.a.createElement(f.a,{testId:n,onClick:function(){console.log("Programmatically closing the menu, even though the click happens inside the popup menu."),l()}},n);var h=function(){d(!p)},O=function(e){"ArrowDown"===e.key&&d(!0)};return a.a.createElement(A.a,{content:t,isOpen:p,onClose:function(){d(!1)},placement:"bottom-start",testId:"".concat(n,"-popup"),trigger:function(e){return a.a.createElement(S.a,Object.assign({onClick:h,onKeyDown:O,isHighlighted:o,isSelected:p,testId:"".concat(n,"-popup-trigger")},e),n)}})}var w="";Object({NODE_ENV:"production",PUBLIC_URL:"/graphhopper-react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MAPBOX_TOKEN:"pk.eyJ1IjoieW91c2VmZWQiLCJhIjoiY2lxbTVrbnhlMDAxMmh0bm11cjhleG1pciJ9.0Hkaq-NVwVphx8AWcSovYg",REACT_APP_GRAPHHOPPER_BASE_URI:"https://graphhopper.com"}).REACT_APP_THUNDERFOREST_API_KEY&&(w="?apikey="+Object({NODE_ENV:"production",PUBLIC_URL:"/graphhopper-react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MAPBOX_TOKEN:"pk.eyJ1IjoieW91c2VmZWQiLCJhIjoiY2lxbTVrbnhlMDAxMmh0bm11cjhleG1pciJ9.0Hkaq-NVwVphx8AWcSovYg",REACT_APP_GRAPHHOPPER_BASE_URI:"https://graphhopper.com"}).THUNDERFOREST_API_KEY);var x="";Object({NODE_ENV:"production",PUBLIC_URL:"/graphhopper-react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MAPBOX_TOKEN:"pk.eyJ1IjoieW91c2VmZWQiLCJhIjoiY2lxbTVrbnhlMDAxMmh0bm11cjhleG1pciJ9.0Hkaq-NVwVphx8AWcSovYg",REACT_APP_GRAPHHOPPER_BASE_URI:"https://graphhopper.com"}).REACT_APP_MAPILION_API_KEY&&(x="?key="+Object({NODE_ENV:"production",PUBLIC_URL:"/graphhopper-react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MAPBOX_TOKEN:"pk.eyJ1IjoieW91c2VmZWQiLCJhIjoiY2lxbTVrbnhlMDAxMmh0bm11cjhleG1pciJ9.0Hkaq-NVwVphx8AWcSovYg",REACT_APP_GRAPHHOPPER_BASE_URI:"https://graphhopper.com"}).MAPILION_API_KEY);var T=Object({NODE_ENV:"production",PUBLIC_URL:"/graphhopper-react",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_MAPBOX_TOKEN:"pk.eyJ1IjoieW91c2VmZWQiLCJhIjoiY2lxbTVrbnhlMDAxMmh0bm11cjhleG1pciJ9.0Hkaq-NVwVphx8AWcSovYg",REACT_APP_GRAPHHOPPER_BASE_URI:"https://graphhopper.com"}).REACT_APP_OMNISCALE_API_KEY||"mapsgraph-bf48cc0b",I='&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',R=window.devicePixelRatio>1,K=[{name:"Mapbox Light",type:"mapstyle",url:"mapbox://styles/mapbox/light-v9"},{type:"raster",name:"Esri Aerial",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",attribution:'&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',maxZoom:18},{type:"raster",name:"Lyrk",url:"https://tiles.lyrk.org/"+(R?"lr":"ls")+"/{z}/{x}/{y}?apikey=6e8cfef737a140e2a58c8122aaa26077",attribution:I+', <a href="https://geodienste.lyrk.de/">Lyrk</a>'},{type:"raster",name:"Omniscale",url:"https://maps.omniscale.net/v2/"+T+"/style.default/{z}/{x}/{y}.png"+(R?"?hq=true":""),attribution:I+', &copy; <a href="https://maps.omniscale.com/">Omniscale</a>'},{type:"raster",name:"OpenStreetMap",subdomains:["a","b","c"],url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:I},{type:"raster",name:"TF Transport",subdomains:["a","b","c"],url:"https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png"+w,attribution:I+', <a href="https://www.thunderforest.com/maps/transport/" target="_blank">Thunderforest Transport</a>'},{type:"raster",name:"TF OpenCycleMap",subdomains:["a","b","c"],url:"https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png"+w,attribution:I+', <a href="https://www.thunderforest.com/maps/opencyclemap/" target="_blank">Thunderforest Cycle</a>'},{type:"raster",name:"TF Outdoors",subdomains:["a","b","c"],url:"https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png"+w,attribution:I+', <a href="https://www.thunderforest.com/maps/outdoors/" target="_blank">Thunderforest Outdoors</a>'},{type:"raster",name:"TF Neighbourhood",subdomains:["a","b","c"],url:"https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png"+w,attribution:I+', <a href="https://www.thunderforest.com/maps/neighbourhood/" target="_blank">Thunderforest Neighbourhood</a>'},{type:"raster",name:"Kurviger Liberty",url:"https://{s}-tiles.mapilion.com/raster/styles/kurviger-liberty/{z}/{x}/{y}"+(R?"@2x":"")+".png"+x,attribution:I+',&copy; <a href="https://kurviger.de/" target="_blank">Kurviger</a> &copy; <a href="https://mapilion.com/attribution" target="_blank">Mapilion</a> <a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',subdomains:["a","b","c","d","e"]}];function H(e){return"mapstyle"===e.type?e.url:{version:8,sources:{"raster-tiles":{type:"raster",tiles:e.subdomains?e.subdomains.map((function(t){return e.url.replace("{s}",t)})):[e.url],tileSize:256,attribution:e.attribution}},layers:[{id:"simple-tiles",type:"raster",source:"raster-tiles",minzoom:0,maxzoom:e.maxZoom||24}]}}var W=n(438),D=n(92),M=n.n(D),N=n(444),V=n(186),L=n(149),J=n(226),U=n(227),B=function(){function e(){var t=this;Object(J.a)(this,e),this.handlers=[],this.dispatch=function(){var e=t.handlers;return function(){var t,n=Object(L.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;r.apply(void 0,arguments)}}catch(a){n.e(a)}finally{n.f()}}}()}return Object(U.a)(e,[{key:"subscribe",value:function(e){var t=this;return this.handlers.push(e),function(){var n=t.handlers.indexOf(e);n>-1&&t.handlers.splice(n,1)}}}]),e}(),F=function(){return{onClick:new B,onHover:new B,onActionChange:new B,graphHopperInfo:void 0}},G=a.a.createContext(F());function Y(e){return null===e||void 0===e?void 0:e.map((function(e){return e.toFixed(6)})).join()}function z(e,t){var n=Object(r.useState)(e),a=Object(b.a)(n,2),o=a[0],c=a[1];return Object(r.useEffect)((function(){var n=setTimeout((function(){c(e)}),t);return function(){clearTimeout(n)}}),[e,t]),o}var q=function(e){return c.a.createPortal(e.children,e.domNode)},Z=n(150),Q=n(178);var X,$=function(){var e=new URLSearchParams(window.location.search).get("state");return e?JSON.parse(Q.decompressFromEncodedURIComponent(e)):void 0}()||{};function ee(){var e=JSON.stringify($),t=Q.compressToEncodedURIComponent(e),n="?state="+t;window.history.pushState({},"",n),console.log(t.length,e.length,t.length/e.length)}function te(e,t){var n=a.a.useState((function(){var n=$;return n&&void 0!==n[e]?n[e]:t})),o=Object(b.a)(n,2),c=o[0],i=o[1];return Object(r.useEffect)((function(){$[e]=c,clearTimeout(X),X=setTimeout(ee,1e3)}),[e,c]),[c,i]}var ne=function(e){var t=Object(r.useState)(),n=Object(b.a)(t,2),o=n[0],c=n[1],l=te(e.myKey+"-distance",5e3),p=Object(b.a)(l,2),d=p[0],h=p[1],f=Object(r.useState)(),O=Object(b.a)(f,2),m=O[0],v=O[1],j=te(e.myKey+"-start"),g=Object(b.a)(j,2),_=g[0],k=g[1],S=Object(r.useState)([]),A=Object(b.a)(S,2),P=A[0],w=A[1];"set-start"===o&&_!==m&&k(m);var x=z(Object(r.useMemo)((function(){return{startPosition:_,distanceLimit:d}}),[_,d]),1e3);Object(r.useEffect)((function(){var t=!!P.length&&new V.a({id:"deck-"+e.myKey,data:P,getPath:function(e){return[[e.longitude,e.latitude],[e.prev_longitude,e.prev_latitude]]},getColor:function(e){var t=e.distance/d;return[255*(1-t),128*t,255*t,255]},getWidth:30,highlightColor:[255,255,0,255],autoHighlight:!0,pickable:!0});e.setLayers(e.myKey,[t])}),[P]);var T=Object(r.useContext)(G);Object(r.useEffect)((function(){var e=[T.onClick.subscribe((function(e,t){c(void 0)})),T.onHover.subscribe((function(e,t){e.coordinate&&o&&v(Object(i.a)(e.coordinate).reverse())}))];return function(){e.forEach((function(e){return e()}))}}),[o]);var I=Object(r.useCallback)((function(e){c("set-start")}),[]),R=Object(r.useCallback)((function(e){T.onHover.dispatch({coordinate:e.lngLat},void 0)}),[]),K=Object(r.useCallback)((function(e){c(void 0)}),[]);return Object(r.useEffect)((function(){_&&(console.log("querying isochrone spt"),Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,!1,e.next=4,Object(C.getSPT)({point:_.join(),vehicle:Z.VehicleProfileId.Bike,elevation:!1,distance_limit:d,columns:["longitude","latitude","time","distance","prev_longitude","prev_latitude"].join(",")},"..");case 4:t=e.sent,w(t.data),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))())}),[x]),Object(y.e)(a.a.Fragment,null,_&&Object(y.e)(E.a,{longitude:_[1],latitude:_[0],draggable:!0,onDrag:R,onDragStart:I,onDragEnd:K,captureClick:void 0==o},Object(y.e)("div",{css:{position:"relative",transform:"translate(-50%, -100%)"}},Object(y.e)(M.a,{label:"",primaryColor:"green"}))),e.sidebarElement&&Object(y.e)(q,{domNode:e.sidebarElement},Object(y.e)("div",null,Object(y.e)("label",{htmlFor:"xsmall"},"From:"),Object(y.e)("div",{css:{flex:0,alignItems:"center",display:"flex"}},Object(y.e)(N.a,{isReadOnly:!0,value:Y(_)}),Object(y.e)(W.a,{isSelected:"set-start"===o,onClick:function(){return c("set-start")}},Object(y.e)(M.a,{label:"",primaryColor:"green"}))),Object(y.e)("label",null,"Distance limit:"),Object(y.e)(N.a,{type:"number",defaultValue:d,onChange:function(e){return h(parseInt(e.currentTarget.value)||d)}}))))},re=n(442),ae=n(436);function oe(e){throw new Error("Didn't expect to get here")}function ce(e,t){var n=t[e.source];if(!e.function||"category"===e.function){var r;r=Array.isArray(e.categories)?e.categories:Object.entries(e.categories).map((function(e){var t=Object(b.a)(e,2);return{match:{eq:t[0]},value:t[1]}}));var a,o=Object(L.a)(r);try{for(o.s();!(a=o.n()).done;){var c=a.value;if("eq"in c.match&&c.match.eq===n)return c.value;if("lt"in c.match&&n<c.match.lt)return c.value;if("gt"in c.match&&n>c.match.gt)return c.value}}catch(l){o.e(l)}finally{o.f()}return e.default}if("linear"===e.function){if("number"!==typeof n)throw new Error("can't execute linear on non-number");var i=n/e.denominator;return e.power&&(i=Math.pow(i,e.power)),e.value?e.value.map((function(e){return-1===e?255*i:e})):i}oe(e.function)}var ie={lineWidth:{source:"road_class",categories:{motorway:30,primary:20,trunk:20,secondary:20},default:10},color:{source:"road_class",categories:{motorway:[221,80,75,255],primary:[226,160,18,255],trunk:[226,160,18,255],secondary:[247,201,19,255]},default:[170,165,167,255]}},le=function(e){var t=te(e.myKey+"-vis",ie),n=Object(b.a)(t,2),o=n[0],c=n[1],i=z(Object(r.useCallback)((function(){return{}}),[o]),200),l=Object(r.useContext)(G);Object(r.useEffect)((function(){var t;console.log("change layer");var n=Object.keys((null===(t=l.graphHopperInfo)||void 0===t?void 0:t.encoded_values)||{}).map((function(e){return"details="+encodeURIComponent(e)})).join("&"),r=new ae.a({id:"deck-"+e.myKey,data:".."+"/mvt/{z}/{x}/{y}.mvt?".concat(n),minZoom:0,maxZoom:23,getLineColor:function(e){return o.color?ce(o.color,e.properties):[255,0,0,255]},getFillColor:[140,170,180],highlightColor:[255,0,0,255],autoHighlight:!0,pickable:!0,onHover:function(e){var t;return console.log(null===e||void 0===e||null===(t=e.object)||void 0===t?void 0:t.properties)},getLineWidth:function(e){return o.lineWidth?ce(o.lineWidth,e.properties):1},updateTriggers:{getLineWidth:Math.random(),getLineColor:Math.random()},lineWidthMinPixels:1});e.setLayers(e.myKey,[r])}),[i]);var s=Object(r.useRef)();return Object(y.e)(a.a.Fragment,null,e.sidebarElement&&Object(y.e)(q,{domNode:e.sidebarElement},Object(y.e)("div",{css:{width:"300px"}},Object(y.e)("label",null,"Visualization settings:"),Object(y.e)(re.a,{ref:s,defaultValue:JSON.stringify(o,void 0,2),onChange:function(e){var t=e.target.value;try{c(JSON.parse(t))}catch(n){console.log(n)}}}))))},se=n(165),ue=n(439),be=n(185),pe=n.n(be),de=n(233);function he(e,t){for(var n=e.length,r=0,a=[],o=0,c=0,i=0;r<n;){var l,s=0,u=0;do{u|=(31&(l=e.charCodeAt(r++)-63))<<s,s+=5}while(l>=32);o+=1&u?~(u>>1):u>>1,s=0,u=0;do{u|=(31&(l=e.charCodeAt(r++)-63))<<s,s+=5}while(l>=32);if(c+=1&u?~(u>>1):u>>1,t){s=0,u=0;do{u|=(31&(l=e.charCodeAt(r++)-63))<<s,s+=5}while(l>=32);i+=1&u?~(u>>1):u>>1,a.push([1e-5*c,1e-5*o,i/100])}else a.push([1e-5*c,1e-5*o])}return a}var fe=n(241),Oe=["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],me=Oe.map((function(e){return{label:e,value:e}}));function ve(e){return function(e){return[e>>16&255,e>>8&255,255&e]}(parseInt(e.replace("#","0x")))}var je=new de.RoutingAPIApi(void 0,".."),ge={priority:{bike_network:{other:.1,"*":1}}},ye=function(e){var t=te(e.myKey+"-alt",!1),n=Object(b.a)(t,2),o=n[0],c=n[1],l=Object(r.useState)(),p=Object(b.a)(l,2),d=p[0],h=p[1],f=Object(r.useState)(),O=Object(b.a)(f,2),m=O[0],v=O[1],j=te(e.myKey+"-start"),g=Object(b.a)(j,2),_=g[0],k=g[1],S=te(e.myKey+"-end"),A=Object(b.a)(S,2),P=A[0],w=A[1],x=Object(r.useState)(!1),T=Object(b.a)(x,2),I=T[0],R=T[1],K=Object(r.useState)(!1),H=Object(b.a)(K,2),D=H[0],L=H[1],J=te(e.myKey+"-json",""),U=Object(b.a)(J,2),B=U[0],F=U[1],Q=te(e.myKey+"-color",Oe[0]),X=Object(b.a)(Q,2),$=X[0],ee=X[1],ne=Object(r.useState)([]),ae=Object(b.a)(ne,2),oe=ae[0],ce=ae[1],ie=Object(r.useCallback)((function(t){be.onActionChange.dispatch(t,e.myKey)}),[]);Object(r.useEffect)((function(){"set-start"===d&&_!==m&&k(m),"set-end"===d&&P!==m&&w(m)}),[d,m,_,P]);var le=z(Object(r.useMemo)((function(){return{startPosition:_,endPosition:P}}),[_,P]),100);Object(r.useEffect)((function(){var t=!!oe.length&&new V.a({id:"deck-"+e.myKey,data:oe.map((function(e,t){return{path:e,alternate:t>0}})),getPath:function(e){return e.path},getColor:function(e){return[].concat(Object(i.a)(ve($)),[e.alternate?80:255])},getWidth:function(e){return 5},widthUnits:"pixels"});e.setLayers(e.myKey,[t])}),[oe,$]);var be=Object(r.useContext)(G);Object(r.useEffect)((function(){var t=[be.onClick.subscribe((function(e,t){ie(void 0)})),be.onActionChange.subscribe((function(t,n){console.log("action",t,n,e.myKey),console.log("linked",I),n!==e.myKey&&void 0!==t?("set-start"===t&&I||"set-end"===t&&D)&&h(t):h(t)})),be.onHover.subscribe((function(e,t){e.coordinate&&d&&v(Object(i.a)(e.coordinate).reverse())}))];return function(){t.forEach((function(e){return e()}))}}),[d,I,D]);var de=Object(r.useCallback)((function(e){ie("set-start")}),[]),ye=Object(r.useCallback)((function(e){be.onHover.dispatch({coordinate:e.lngLat},void 0)}),[]),Ce=Object(r.useCallback)((function(e){ie("set-end")}),[]),_e=Object(r.useCallback)((function(e){ie(void 0)}),[]);Object(r.useEffect)((function(){_&&P&&(console.log("querying route"),Object(u.a)(s.a.mark((function e(){var t,n,r,a,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=!1,n=B.trim(),r={point:[_,P].map((function(e){return e.join()})),vehicle:Z.VehicleProfileId.Bike,elevation:t,algorithm:o?"alternative_route":void 0},!n){e.next=10;break}return e.next=7,Object(C.getCustomRoute)(Object(se.a)(Object(se.a)(Object(se.a)({},r),JSON.parse(n)),{},{vehicle:void 0,points:[Object(i.a)(_).reverse(),Object(i.a)(P).reverse()],point:void 0,profile:"bike"}),"..");case 7:e.t0=e.sent,e.next=13;break;case 10:return e.next=12,je.getRoute(r);case 12:e.t0=e.sent;case 13:(a=e.t0).data.paths&&(c=a.data.paths.map((function(e){if(!e.points_encoded)throw new Error("unencoded points not implemented");if("string"!==typeof e.points)throw new Error("unexpected path.points not string");return he(e.points,t)})),ce(c)),e.next=20;break;case 17:e.prev=17,e.t1=e.catch(0),console.error(e.t1);case 20:case"end":return e.stop()}}),e,null,[[0,17]])})))())}),[le,o,B]);var Ee=fe.a,ke=Object(r.useRef)();return Object(y.e)(a.a.Fragment,null,_&&Object(y.e)(E.a,{longitude:_[1],latitude:_[0],draggable:!0,onDrag:ye,onDragStart:de,onDragEnd:_e,captureClick:void 0==d},Object(y.e)("div",{css:{position:"relative",transform:"translate(-50%, -100%)"}},Object(y.e)(M.a,{label:"",primaryColor:"green"}))),P&&Object(y.e)(E.a,{longitude:P[1],latitude:P[0],draggable:!0,onDrag:ye,onDragStart:Ce,onDragEnd:_e,captureClick:void 0==d},Object(y.e)("div",{css:{position:"relative",transform:"translate(-50%, -100%)"}},Object(y.e)(M.a,{label:"",primaryColor:"red"}))),e.sidebarElement&&Object(y.e)(q,{domNode:e.sidebarElement},Object(y.e)("div",null,Object(y.e)("label",{htmlFor:"xsmall"},"From:"),Object(y.e)("div",{css:{flex:0,alignItems:"center",display:"flex"}},Object(y.e)(N.a,{isReadOnly:!0,value:Y(_)}),Object(y.e)(W.a,{isSelected:"set-start"===d,onClick:function(){return ie("set-start")}},Object(y.e)(M.a,{label:"",primaryColor:"green"})),Object(y.e)(W.a,{isSelected:I,onClick:function(){return R(!I)}},Object(y.e)(pe.a,{label:""}))),Object(y.e)("label",{htmlFor:"xsmall"},"To:"),Object(y.e)("div",{css:{flex:0,alignItems:"center",display:"flex"}},Object(y.e)(N.a,{isReadOnly:!0,value:Y(P)}),Object(y.e)(W.a,{isSelected:"set-end"===d,onClick:function(){return ie("set-end")}},Object(y.e)(M.a,{label:"",primaryColor:"red"})),Object(y.e)(W.a,{isSelected:D,onClick:function(){return L(!D)}},Object(y.e)(pe.a,{label:""}))),Object(y.e)(ue.a,{css:{marginTop:"20px"},isChecked:o,onChange:function(){return c(!o)},label:"Alternate routes"}),Object(y.e)("label",null,"Flex mode:"),Object(y.e)(re.a,{css:{minHeight:"300px !important"},ref:ke,defaultValue:B,onChange:function(e){return F(e.target.value)}}),Object(y.e)(W.a,{onClick:function(){ke.current.value=JSON.stringify(ge,void 0,2),F(ke.current.value)}},"Bike network template"),Object(y.e)("div",null,"Color:",Object(y.e)(Ee,{label:"Change color",palette:me,selectedColor:$,cols:6,onChange:function(e){return ee(e)}})))))},Ce={latitude:51.92339,longitude:4.467195,zoom:9,bearing:0,pitch:0},_e=function(){return Object(y.e)("div",null)},Ee=function(e){return Object(y.e)(d.a,null,Object(y.e)(h.a,{hasSeparator:!0,title:"Vector"},K.filter((function(e){return"mapstyle"===e.type})).map((function(t){return Object(y.e)(f.a,{key:t.name,onClick:function(){return e.setMapStyle(H(t))}},t.name)}))),Object(y.e)(h.a,{title:"Raster"},K.filter((function(e){return"raster"===e.type})).map((function(t){return Object(y.e)(f.a,{key:t.name,onClick:function(){return e.setMapStyle(H(t))}},t.name)}))))},ke=F();var Se=function(){var e=te("viewstate",Ce),t=Object(b.a)(e,2),n=t[0],o=t[1],c=te("viz",[{type:"route",label:"Route"}]),l=Object(b.a)(c,2),k=l[0],S=l[1],A=Object(r.useState)(H(K[0])),w=Object(b.a)(A,2),x=w[0],T=w[1],I=Object(r.useRef)(new Map),R=Object(r.useState)(),W=Object(b.a)(R,2),D=W[0],M=W[1],N=Object(r.useCallback)((function(e){var t=e.viewState;return o(t)}),[]);Object(r.useEffect)((function(){Object(u.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(C.getInfo)("..");case 3:t=e.sent,ke.graphHopperInfo=t.data,console.log(t.data.encoded_values),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}),[]);var V=Object(r.useCallback)((function(e){S([].concat(Object(i.a)(k),[{type:e,label:e+" ("+(k.length+1)+")"}]))}),[k]),L=Object(r.useState)(),J=Object(b.a)(L,2),U=(J[0],J[1]),B=Object(r.useCallback)((function(e){U(e)}),[]),F=Object(r.useCallback)((function(e,t){I.current.set(e,t.filter((function(e){return e}))),M(Array.from(I.current.values()).flat())}),[]),Y=Object(r.useState)([]),z=Object(b.a)(Y,2),q=z[0],Z=z[1],Q=Object(r.useState)([]),X=Object(b.a)(Q,2),$=X[0],ee=X[1],re=_.a;return Object(r.useEffect)((function(){var e=k.map((function(e,t){return{label:e.label,content:Object(y.e)("div",{key:"tab"+t,css:{padding:"20px 0"},ref:function(e){console.log("setref"),q[t]=e||void 0,Z(Object(i.a)(q))}})}}));ee(e)}),[k]),Object(y.e)(a.a.Fragment,null,Object(y.e)(p.a,{label:"hello",primaryItems:[Object(y.e)(P,{content:function(){return Object(y.e)(Ee,{setMapStyle:T})},text:"Background layer"}),Object(y.e)(P,{content:function(e){return Object(y.e)(d.a,null,Object(y.e)(h.a,{title:"Overlays"},Object(y.e)(f.a,{onClick:function(){return V("route")}},"Add route overlay"),Object(y.e)(f.a,{onClick:function(){return V("isochrone")}},"Add isochrone overlay"),Object(y.e)(f.a,{onClick:function(){return V("mvt")}},"Add MVT overlay")))},text:"Overlays"})],renderProductHome:_e}),Object(y.e)(O.a,null,Object(y.e)(m.a,{testId:"content",css:{height:"100%"}},Object(y.e)(v.a,{testId:"leftSidebar",width:350},Object(y.e)("div",{css:{minWidth:50,padding:"10px 10px"},ref:B},Object(y.e)(g.a,{tabs:$}))),Object(y.e)(j.a,{testId:"main",css:{height:"100%"}},Object(y.e)(G.Provider,{value:ke},Object(y.e)(re,{width:void 0,height:void 0,effects:[],style:{position:"relative"},controller:!0,layers:D,onHover:ke.onHover.dispatch,onClick:ke.onClick.dispatch,ContextProvider:E.c.Provider,viewState:n,onViewStateChange:N},Object(y.e)(E.b,{width:void 0,height:void 0,mapboxApiAccessToken:"pk.eyJ1IjoieW91c2VmZWQiLCJhIjoiY2lxbTVrbnhlMDAxMmh0bm11cjhleG1pciJ9.0Hkaq-NVwVphx8AWcSovYg",mapStyle:x}),k.map((function(e,t){var n=q[t];switch(e.type){case"route":return Object(y.e)(ye,{key:e.label,sidebarElement:n,setLayers:F,myKey:e.label});case"isochrone":return Object(y.e)(ne,{key:e.label,sidebarElement:n,setLayers:F,myKey:e.label});case"mvt":return Object(y.e)(le,{key:e.label,sidebarElement:n,setLayers:F,myKey:e.label});default:oe(e.type)}}))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(Se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[271,1,2]]]);
//# sourceMappingURL=main.702872f7.chunk.js.map