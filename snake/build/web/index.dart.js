(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
return y.__proto__&&y.__proto__.p===z.prototype.p}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isa=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isGv)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="a"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="static"){processStatics(init.statics[b1]=b2.static,b3)
delete b2.static}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]==""?[]:a9[1].split(",")
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=b7[g],e
if(typeof f=="string")e=b7[++g]
else{e=f
f=b8}var d=[b6[b8]=b6[f]=e]
e.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){e=b7[g]
if(typeof e!="function")break
if(!b9)e.$stubName=b7[++g]
d.push(e)
if(e.$stubName){b6[e.$stubName]=e
c0.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b7[g]
var a0=b7[g]
b7=b7.slice(++g)
var a1=b7[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b7[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b7[2]
if(typeof b0=="number")b7[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b7,b9,b8,a9)
b6[b8].$getter=e
e.$getterStub=true
if(b9){init.globalFunctions[b8]=e
c0.push(a0)}b6[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}var b2=b7.length>b1
if(b2){d[0].$reflectable=1
d[0].$reflectionInfo=b7
for(var c=1;c<d.length;c++){d[c].$reflectable=2
d[c].$reflectionInfo=b7}var b3=b9?init.mangledGlobalNames:init.mangledNames
var b4=b7[b1]
var b5=b4
if(a0)b3[a0]=b5
if(a4)b5+="="
else if(!a5)b5+=":"+(a2+a7)
b3[b8]=b5
d[0].$reflectionName=b5
d[0].$metadataIndex=b1+1
if(a7)b6[b4+"*"]=d[0]}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = H.qm("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = H.qm("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.qm(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}HU=function(){}
var dart=[["","",,H,{
"^":"",
FK:{
"^":"a;Q"}}],["","",,J,{
"^":"",
t:function(a){return void 0},
Qu:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ks:function(a){var z,y,x,w
z=a[init.dispatchPropertyName]
if(z==null)if($.Bv==null){H.XD()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.ds("Return interceptor for "+H.d(y(a,z))))}w=H.w3(a)
if(w==null){y=Object.getPrototypeOf(a)
if(y==null||y===Object.prototype)return C.ZQ
else return C.vB}return w},
Gv:{
"^":"a;",
m:function(a,b){return a===b},
giO:function(a){return H.eQ(a)},
X:["VE",function(a){return H.H9(a)}],
P:["p4",function(a,b){throw H.b(P.lr(a,b.gWa(),b.gnd(),b.gVm(),null))},null,"gkh",2,0,null,0],
"%":"CanvasGradient|CanvasPattern|DOMError|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGRect|WebGLActiveInfo|WebGLBuffer|WebGLFramebuffer|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture"},
yE:{
"^":"Gv;",
X:function(a){return String(a)},
giO:function(a){return a?519018:218159},
$isa2:1},
PE:{
"^":"Gv;",
m:function(a,b){return null==b},
X:function(a){return"null"},
giO:function(a){return 0},
P:[function(a,b){return this.p4(a,b)},null,"gkh",2,0,null,0]},
Ue:{
"^":"Gv;",
giO:function(a){return 0},
$isvm:1},
iC:{
"^":"Ue;"},
kd:{
"^":"Ue;",
X:function(a){return String(a)}},
G:{
"^":"Gv;",
uy:function(a,b){if(!!a.immutable$list)throw H.b(new P.ub(b))},
PP:function(a,b){if(!!a.fixed$length)throw H.b(new P.ub(b))},
h:function(a,b){this.PP(a,"add")
a.push(b)},
W4:function(a,b){this.PP(a,"removeAt")
if(b<0||b>=a.length)throw H.b(P.D(b,null,null))
return a.splice(b,1)[0]},
aP:function(a,b,c){this.PP(a,"insert")
if(b<0||b>a.length)throw H.b(P.D(b,null,null))
a.splice(b,0,c)},
Rz:function(a,b){var z
this.PP(a,"remove")
for(z=0;z<a.length;++z)if(J.mG(a[z],b)){a.splice(z,1)
return!0}return!1},
Ay:function(a,b){var z
this.PP(a,"addAll")
for(z=J.Nx(b);z.D();)a.push(z.gk())},
aN:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.UV(a))}},
ez:function(a,b){return H.J(new H.A8(a,b),[null,null])},
Zv:function(a,b){return a[b]},
gFV:function(a){if(a.length>0)return a[0]
throw H.b(H.Wp())},
YW:function(a,b,c,d,e){var z,y
this.uy(a,"set range")
P.jB(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.vh(P.TE(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.ar())
if(e<b)for(y=z-1;y>=0;--y)a[b+y]=d[e+y]
else for(y=0;y<z;++y)a[b+y]=d[e+y]},
XU:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.mG(a[z],b))return z
return-1},
OY:function(a,b){return this.XU(a,b,0)},
X:function(a){return P.WE(a,"[","]")},
gu:function(a){return new J.m1(a,a.length,0,null)},
giO:function(a){return H.eQ(a)},
gv:function(a){return a.length},
sv:function(a,b){this.PP(a,"set length")
if(b<0)throw H.b(P.D(b,null,null))
a.length=b},
p:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.p(b))
if(b>=a.length||b<0)throw H.b(P.D(b,null,null))
return a[b]},
q:function(a,b,c){this.uy(a,"indexed set")
if(b>=a.length||b<0)throw H.b(P.D(b,null,null))
a[b]=c},
$isDD:1,
$iszM:1,
$aszM:null,
$isqC:1},
Po:{
"^":"G;"},
m1:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z,y,x
z=this.Q
y=z.length
if(this.a!==y)throw H.b(new P.UV(z))
x=this.b
if(x>=y){this.c=null
return!1}this.c=z[x]
this.b=x+1
return!0}},
F:{
"^":"Gv;",
gzP:function(a){return a===0?1/a<0:a<0},
JV:function(a,b){if(b==null)H.vh(H.aL(b))
if(typeof b!=="number")throw H.b(P.p(b))
return a%b},
yu:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(new P.ub(""+a))},
zQ:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.ub(""+a))},
Hp:function(a){return a},
X:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
giO:function(a){return a&0x1FFFFFFF},
BU:function(a,b){return(a|0)===a?a/b|0:this.yu(a/b)},
wG:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
w:function(a,b){if(typeof b!=="number")throw H.b(P.p(b))
return a<b},
$isU:1},
im:{
"^":"F;",
$isCP:1,
$isU:1,
$isP:1},
VA:{
"^":"F;",
$isCP:1,
$isU:1},
E:{
"^":"Gv;",
O2:function(a,b){if(b>=a.length)throw H.b(P.D(b,null,null))
return a.charCodeAt(b)},
Nj:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)H.vh(H.aL(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.vh(H.aL(c))
if(b<0)throw H.b(P.D(b,null,null))
if(b>c)throw H.b(P.D(b,null,null))
if(c>a.length)throw H.b(P.D(c,null,null))
return a.substring(b,c)},
yn:function(a,b){return this.Nj(a,b,null)},
eM:function(a,b,c){if(c>a.length)throw H.b(P.TE(c,0,a.length,null,null))
return H.b0(a,b,c)},
gl0:function(a){return a.length===0},
X:function(a){return a},
giO:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10>>>0)
y^=y>>6}y=536870911&y+((67108863&y)<<3>>>0)
y^=y>>11
return 536870911&y+((16383&y)<<15>>>0)},
p:function(a,b){if(b>=a.length||!1)throw H.b(P.D(b,null,null))
return a[b]},
$isDD:1,
$isI:1}}],["","",,H,{
"^":"",
zd:function(a,b){var z=a.vV(b)
if(!init.globalState.c.cy)init.globalState.e.bL()
return z},
ox:function(){--init.globalState.e.a},
Rq:function(a,b){var z,y,x,w,v,u
z={}
z.Q=b
b=b
z.Q=b
if(b==null){b=[]
z.Q=b
y=b}else y=b
if(!J.t(y).$iszM)throw H.b(P.p("Arguments to main must be a List: "+H.d(y)))
y=new H.f0(0,0,1,null,null,null,null,null,null,null,null,null,a)
y.Em()
y.e=new H.cC(P.NZ(null,H.IY),0)
y.y=P.V(null,null,null,P.P,H.aX)
y.ch=P.V(null,null,null,P.P,null)
if(y.r){y.z=new H.JH()
y.O0()}init.globalState=y
if(init.globalState.r)return
y=init.globalState.Q++
x=P.V(null,null,null,P.P,H.yo)
w=P.fM(null,null,null,P.P)
v=new H.yo(0,null,!1)
u=new H.aX(y,x,w,init.createNewIsolate(),v,new H.ku(H.Uh()),new H.ku(H.Uh()),!1,!1,[],P.fM(null,null,null,null),null,null,!1,!0,P.fM(null,null,null,null))
w.h(0,0)
u.co(0,v)
init.globalState.d=u
init.globalState.c=u
y=H.N7()
x=H.KT(y,[y]).Zg(a)
if(x)u.vV(new H.JO(z,a))
else{y=H.KT(y,[y,y]).Zg(a)
if(y)u.vV(new H.mP(z,a))
else u.vV(a)}init.globalState.e.bL()},
yl:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.r)return H.mf()
return},
mf:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.ub("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.ub("Cannot extract URI from \""+H.d(z)+"\""))},
Mg:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.fP(!0,[]).QS(b.data)
y=J.U6(z)
switch(y.p(z,"command")){case"start":init.globalState.a=y.p(z,"id")
x=y.p(z,"functionName")
w=x==null?init.globalState.cx:H.Cr(x)
v=y.p(z,"args")
u=new H.fP(!0,[]).QS(y.p(z,"msg"))
t=y.p(z,"isSpawnUri")
s=y.p(z,"startPaused")
r=new H.fP(!0,[]).QS(y.p(z,"replyTo"))
y=init.globalState.Q++
q=P.V(null,null,null,P.P,H.yo)
p=P.fM(null,null,null,P.P)
o=new H.yo(0,null,!1)
n=new H.aX(y,q,p,init.createNewIsolate(),o,new H.ku(H.Uh()),new H.ku(H.Uh()),!1,!1,[],P.fM(null,null,null,null),null,null,!1,!0,P.fM(null,null,null,null))
p.h(0,0)
n.co(0,o)
init.globalState.e.Q.Ai(new H.IY(n,new H.jl(w,v,u,t,s,r),"worker-start"))
init.globalState.c=n
init.globalState.e.bL()
break
case"spawn-worker":break
case"message":if(y.p(z,"port")!=null)y.p(z,"port").wR(y.p(z,"msg"))
init.globalState.e.bL()
break
case"close":init.globalState.ch.Rz(0,$.p6().p(0,a))
a.terminate()
init.globalState.e.bL()
break
case"log":H.VL(y.p(z,"msg"))
break
case"print":if(init.globalState.r){y=init.globalState.z
q=P.Td(["command","print","msg",z])
q=new H.jP(!0,P.Q9(null,P.P)).a3(q)
y.toString
self.postMessage(q)}else P.JS(y.p(z,"msg"))
break
case"error":throw H.b(y.p(z,"msg"))}},null,null,4,0,null,2,3],
VL:function(a){var z,y,x,w
if(init.globalState.r){y=init.globalState.z
x=P.Td(["command","log","msg",a])
x=new H.jP(!0,P.Q9(null,P.P)).a3(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.Ru(w)
z=H.ts(w)
throw H.b(P.FM(z))}},
Cr:function(a){return init.globalFunctions[a]()},
Z7:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.c
y=z.Q
$.te=$.te+("_"+y)
$.Mr=$.Mr+("_"+y)
y=z.d
x=init.globalState.c.Q
w=z.e
f.wR(["spawned",new H.JM(y,x),w,z.f])
x=new H.Vg(a,b,c,d,z)
if(e){z.v8(w,w)
init.globalState.e.Q.Ai(new H.IY(z,x,"start isolate"))}else x.$0()},
Gx:function(a){return new H.fP(!0,[]).QS(new H.jP(!1,P.Q9(null,P.P)).a3(a))},
JO:{
"^":"r:0;Q,a",
$0:function(){this.a.$1(this.Q.Q)}},
mP:{
"^":"r:0;Q,a",
$0:function(){this.a.$2(this.Q.Q,null)}},
f0:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z,ch,cx",
Em:function(){var z,y,x
z=self.window==null
y=self.Worker
x=z&&!!self.postMessage
this.r=x
if(!x)y=y!=null&&$.Jz()!=null
else y=!0
this.x=y
this.f=z&&!x},
O0:function(){self.onmessage=function(a,b){return function(c){a(b,c)}}(H.Mg,this.z)
self.dartPrint=self.dartPrint||function(a){return function(b){if(self.console&&self.console.log)self.console.log(b)
else self.postMessage(a(b))}}(H.wI)},
static:{wI:[function(a){var z=P.Td(["command","print","msg",a])
return new H.jP(!0,P.Q9(null,P.P)).a3(z)},null,null,2,0,null,1]}},
aX:{
"^":"a;Q,a,b,En:c<,EE:d<,e,f,r,x,y,z,ch,cx,cy,db,dx",
v8:function(a,b){if(!this.e.m(0,a))return
if(this.z.h(0,b)&&!this.x)this.x=!0
this.Wp()},
cK:function(a){var z,y,x,w,v
if(!this.x)return
z=this.z
z.Rz(0,a)
if(z.Q===0){for(z=this.y;z.length!==0;){y=z.pop()
x=init.globalState.e.Q
w=x.a
v=x.Q
w=(w-1&v.length-1)>>>0
x.a=w
v[w]=y
if(w===x.b)x.wL();++x.c}this.x=!1}this.Wp()},
h4:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
Hh:function(a){var z,y,x
if(this.ch==null)return
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.m(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.vh(new P.ub("removeRange"))
P.jB(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
MZ:function(a,b){if(!this.f.m(0,a))return
this.db=b},
l7:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.wR(c)
return}z=this.cx
if(z==null){z=P.NZ(null,null)
this.cx=z}z.Ai(new H.NY(a,c))},
bc:function(a,b){var z
if(!this.f.m(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.Dm()
return}z=this.cx
if(z==null){z=P.NZ(null,null)
this.cx=z}z.Ai(this.gIm())},
hk:function(a,b){var z,y,x
z=this.dx
if(z.Q===0){if(this.db&&this===init.globalState.d)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.JS(a)
if(b!=null)P.JS(b)}return}y=Array(2)
y.fixed$length=Array
y[0]=J.Lz(a)
y[1]=b==null?null:b.X(0)
for(x=new P.zQ(z,z.f,null,null),x.b=z.d;x.D();)x.c.wR(y)},
vV:function(a){var z,y,x,w,v,u,t
z=init.globalState.c
init.globalState.c=this
$=this.c
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.Ru(u)
w=t
v=H.ts(u)
this.hk(w,v)
if(this.db){this.Dm()
if(this===init.globalState.d)throw u}}finally{this.cy=x
init.globalState.c=z
if(z!=null)$=z.gEn()
if(this.cx!=null)for(;t=this.cx,!t.gl0(t);)this.cx.Ux().$0()}return y},
Ds:function(a){var z=J.U6(a)
switch(z.p(a,0)){case"pause":this.v8(z.p(a,1),z.p(a,2))
break
case"resume":this.cK(z.p(a,1))
break
case"add-ondone":this.h4(z.p(a,1),z.p(a,2))
break
case"remove-ondone":this.Hh(z.p(a,1))
break
case"set-errors-fatal":this.MZ(z.p(a,1),z.p(a,2))
break
case"ping":this.l7(z.p(a,1),z.p(a,2),z.p(a,3))
break
case"kill":this.bc(z.p(a,1),z.p(a,2))
break
case"getErrors":this.dx.h(0,z.p(a,1))
break
case"stopErrors":this.dx.Rz(0,z.p(a,1))
break}},
Zt:function(a){return this.a.p(0,a)},
co:function(a,b){var z=this.a
if(z.NZ(a))throw H.b(P.FM("Registry: ports must be registered only once."))
z.q(0,a,b)},
Wp:function(){if(this.a.Q-this.b.Q>0||this.x||!this.r)init.globalState.y.q(0,this.Q,this)
else this.Dm()},
Dm:[function(){var z,y,x
z=this.cx
if(z!=null)z.V1(0)
for(z=this.a,y=z.gUQ(z),y=H.J(new H.MH(null,J.Nx(y.Q),y.a),[H.Kp(y,0),H.Kp(y,1)]);y.D();)y.Q.EC()
z.V1(0)
this.b.V1(0)
init.globalState.y.Rz(0,this.Q)
this.dx.V1(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].wR(z[x+1])
this.ch=null}},"$0","gIm",0,0,1]},
NY:{
"^":"r:1;Q,a",
$0:[function(){this.Q.wR(this.a)},null,null,0,0,null,"call"]},
cC:{
"^":"a;Q,a",
mj:function(){var z=this.Q
if(z.a===z.b)return
return z.Ux()},
xB:function(){var z,y,x
z=this.mj()
if(z==null){if(init.globalState.d!=null&&init.globalState.y.NZ(init.globalState.d.Q)&&init.globalState.f&&init.globalState.d.a.Q===0)H.vh(P.FM("Program exited with open ReceivePorts."))
y=init.globalState
if(y.r&&y.y.Q===0&&y.e.a===0){y=y.z
x=P.Td(["command","close"])
x=new H.jP(!0,P.Q9(null,P.P)).a3(x)
y.toString
self.postMessage(x)}return!1}z.VU()
return!0},
Ex:function(){if(self.window!=null)new H.RA(this).$0()
else for(;this.xB(););},
bL:function(){var z,y,x,w,v
if(!init.globalState.r)this.Ex()
else try{this.Ex()}catch(x){w=H.Ru(x)
z=w
y=H.ts(x)
w=init.globalState.z
v=P.Td(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.jP(!0,P.Q9(null,P.P)).a3(v)
w.toString
self.postMessage(v)}}},
RA:{
"^":"r:1;Q",
$0:function(){if(!this.Q.xB())return
P.rT(C.RT,this)}},
IY:{
"^":"a;Q,a,b",
VU:function(){var z=this.Q
if(z.x){z.y.push(this)
return}z.vV(this.a)}},
JH:{
"^":"a;"},
jl:{
"^":"r:0;Q,a,b,c,d,e",
$0:function(){H.Z7(this.Q,this.a,this.b,this.c,this.d,this.e)}},
Vg:{
"^":"r:1;Q,a,b,c,d",
$0:function(){var z,y,x
this.d.r=!0
if(!this.c)this.Q.$1(this.b)
else{z=this.Q
y=H.N7()
x=H.KT(y,[y,y]).Zg(z)
if(x)z.$2(this.a,this.b)
else{y=H.KT(y,[y]).Zg(z)
if(y)z.$1(this.a)
else z.$0()}}}},
Iy:{
"^":"a;"},
JM:{
"^":"Iy;a,Q",
wR:function(a){var z,y,x,w
z=init.globalState.y.p(0,this.Q)
if(z==null)return
y=this.a
if(y.b)return
x=H.Gx(a)
if(z.gEE()===y){z.Ds(x)
return}y=init.globalState.e
w="receive "+H.d(a)
y.Q.Ai(new H.IY(z,new H.Ua(this,x),w))},
m:function(a,b){if(b==null)return!1
return b instanceof H.JM&&this.a===b.a},
giO:function(a){return this.a.Q}},
Ua:{
"^":"r:0;Q,a",
$0:function(){var z=this.Q.a
if(!z.b)z.FL(this.a)}},
ns:{
"^":"Iy;a,b,Q",
wR:function(a){var z,y,x
z=P.Td(["command","message","port",this,"msg",a])
y=new H.jP(!0,P.Q9(null,P.P)).a3(z)
if(init.globalState.r){init.globalState.z.toString
self.postMessage(y)}else{x=init.globalState.ch.p(0,this.a)
if(x!=null)x.postMessage(y)}},
m:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.ns){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.Q
y=b.Q
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
giO:function(a){return(this.a<<16^this.Q<<8^this.b)>>>0}},
yo:{
"^":"a;Q,a,b",
EC:function(){this.b=!0
this.a=null},
FL:function(a){if(this.b)return
this.mY(a)},
mY:function(a){return this.a.$1(a)},
$isSF:1},
yH:{
"^":"a;Q,a,b",
Qa:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.r
else z=!1
if(z){this.b=1
z=init.globalState.e
y=init.globalState.c
z.Q.Ai(new H.IY(y,new H.FA(this,b),"timer"))
this.a=!0}else if(self.setTimeout!=null){++init.globalState.e.a
this.b=self.setTimeout(H.tR(new H.Av(this,b),0),a)}else throw H.b(new P.ub("Timer greater than 0."))},
static:{cy:function(a,b){var z=new H.yH(!0,!1,null)
z.Qa(a,b)
return z}}},
FA:{
"^":"r:1;Q,a",
$0:function(){this.Q.b=null
this.a.$0()}},
Av:{
"^":"r:1;Q,a",
$0:[function(){this.Q.b=null
H.ox()
this.a.$0()},null,null,0,0,null,"call"]},
ku:{
"^":"a;Q",
giO:function(a){var z=this.Q
z=C.jn.wG(z,0)^C.jn.BU(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
m:function(a,b){if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ku)return this.Q===b.Q
return!1}},
jP:{
"^":"a;Q,a",
a3:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.a
y=z.p(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.Q)
z=J.t(a)
if(!!z.$isWZ)return["buffer",a]
if(!!z.$isET)return["typed",a]
if(!!z.$isDD)return this.BE(a)
if(!!z.$isym){x=this.gpC()
w=new H.i5(a)
w.$builtinTypeInfo=[H.Kp(a,0)]
w=H.K1(w,x,H.ip(w,"cX",0),null)
w=P.z(w,!0,H.ip(w,"cX",0))
z=z.gUQ(a)
z=H.K1(z,x,H.ip(z,"cX",0),null)
return["map",w,P.z(z,!0,H.ip(z,"cX",0))]}if(!!z.$isvm)return this.OD(a)
if(!!z.$isGv)this.jf(a)
if(!!z.$isSF)this.kz(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isJM)return this.PE(a)
if(!!z.$isns)return this.ff(a)
if(!!z.$isr){v=a.$name
if(v==null)this.kz(a,"Closures can't be transmitted:")
return["function",v]}return["dart",init.classIdExtractor(a),this.jG(init.classFieldsExtractor(a))]},"$1","gpC",2,0,2,4],
kz:function(a,b){throw H.b(new P.ub(H.d(b==null?"Can't transmit:":b)+" "+H.d(a)))},
jf:function(a){return this.kz(a,null)},
BE:function(a){var z=this.dY(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.kz(a,"Can't serialize indexable: ")},
dY:function(a){var z,y
z=[]
C.M.sv(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.a3(a[y])
return z},
jG:function(a){var z
for(z=0;z<a.length;++z)C.M.q(a,z,this.a3(a[z]))
return a},
OD:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.kz(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.M.sv(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.a3(a[z[x]])
return["js-object",z,y]},
ff:function(a){if(this.Q)return["sendport",a.a,a.Q,a.b]
return["raw sendport",a]},
PE:function(a){if(this.Q)return["sendport",init.globalState.a,a.Q,a.a.Q]
return["raw sendport",a]}},
fP:{
"^":"a;Q,a",
QS:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.p("Bad serialized message: "+H.d(a)))
switch(C.M.gFV(a)){case"ref":return this.a[a[1]]
case"buffer":z=a[1]
this.a.push(z)
return z
case"typed":z=a[1]
this.a.push(z)
return z
case"fixed":z=a[1]
this.a.push(z)
y=this.NB(z)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.a.push(z)
y=this.NB(z)
y.$builtinTypeInfo=[null]
return y
case"mutable":z=a[1]
this.a.push(z)
return this.NB(z)
case"const":z=a[1]
this.a.push(z)
y=this.NB(z)
y.$builtinTypeInfo=[null]
y.fixed$length=Array
return y
case"map":return this.di(a)
case"sendport":return this.Vf(a)
case"raw sendport":z=a[1]
this.a.push(z)
return z
case"js-object":return this.ZQ(a)
case"function":z=init.globalFunctions[a[1]]()
this.a.push(z)
return z
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.a.push(v)
this.NB(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.b("couldn't deserialize: "+H.d(a))}},"$1","gia",2,0,2,4],
NB:function(a){var z
for(z=0;z<a.length;++z)C.M.q(a,z,this.QS(a[z]))
return a},
di:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.u5()
this.a.push(x)
z=J.kl(z,this.gia()).br(0)
for(w=J.U6(y),v=0;v<z.length;++v)x.q(0,z[v],this.QS(w.p(y,v)))
return x},
Vf:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.a
if(z==null?w==null:z===w){v=init.globalState.y.p(0,y)
if(v==null)return
u=v.Zt(x)
if(u==null)return
t=new H.JM(u,y)}else t=new H.ns(z,x,y)
this.a.push(t)
return t},
ZQ:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.a.push(x)
for(w=J.U6(z),v=J.U6(y),u=0;u<w.gv(z);++u)x[w.p(z,u)]=this.QS(v.p(y,u))
return x}}}],["","",,H,{
"^":"",
lL:function(a){return init.types[a]},
wV:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.t(a).$isXj},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.Lz(a)
if(typeof z!=="string")throw H.b(H.aL(a))
return z},
eQ:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
lh:function(a){var z,y
z=C.w2(J.t(a))
if(z==="Object"){y=String(a.constructor).match(/^\s*function\s*([\w$]*)\s*\(/)[1]
if(typeof y==="string")z=/^\w+$/.test(y)?y:z}if(z.length>1&&C.xB.O2(z,0)===36)z=C.xB.yn(z,1)
return(z+H.ia(H.oX(a),0,null)).replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})},
H9:function(a){return"Instance of '"+H.lh(a)+"'"},
o2:function(a){if(a.date===void 0)a.date=new Date(a.Q)
return a.date},
VK:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.aL(a))
return a[b]},
aw:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.aL(a))
a[b]=c},
zo:function(a,b,c){var z,y,x
z={}
z.Q=0
y=[]
x=[]
z.Q=b.length
C.M.Ay(y,b)
z.a=""
if(c!=null&&!c.gl0(c))c.aN(0,new H.Cj(z,y,x))
return J.DZ(a,new H.LI(C.Te,"$"+z.Q+z.a,0,y,x,null))},
bv:function(a,b){var z,y
z=b instanceof Array?b:P.z(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3)if(!!a.$3)return a.$3(z[0],z[1],z[2])
return H.be(a,z)},
be:function(a,b){var z,y,x,w,v,u
z=b.length
y=a["$"+z]
if(y==null){y=J.t(a)["call*"]
if(y==null)return H.zo(a,b,null)
x=H.zh(y)
w=x.c
v=w+x.d
if(x.e||w>z||v<z)return H.zo(a,b,null)
b=P.z(b,!0,null)
for(u=z;u<v;++u)C.M.h(b,init.metadata[x.BX(0,u)])}return y.apply(a,b)},
aL:function(a){return new P.AT(!0,a,null,null)},
E0:function(a){return a},
b:function(a){var z
if(a==null)a=new P.LK()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.Ju})
z.name=""}else z.toString=H.Ju
return z},
Ju:[function(){return J.Lz(this.dartException)},null,null,0,0,null],
vh:function(a){throw H.b(a)},
lk:function(a){throw H.b(new P.UV(a))},
Ru:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.Am(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.jn.wG(x,16)&8191)===10)switch(w){case 438:return z.$1(H.T3(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.Zo(v,null))}}if(a instanceof TypeError){u=$.WD()
t=$.OI()
s=$.PH()
r=$.D1()
q=$.rx()
p=$.Kr()
o=$.zO()
$.Bi()
n=$.eA()
m=$.ko()
l=u.qS(y)
if(l!=null)return z.$1(H.T3(y,l))
else{l=t.qS(y)
if(l!=null){l.method="call"
return z.$1(H.T3(y,l))}else{l=s.qS(y)
if(l==null){l=r.qS(y)
if(l==null){l=q.qS(y)
if(l==null){l=p.qS(y)
if(l==null){l=o.qS(y)
if(l==null){l=r.qS(y)
if(l==null){l=n.qS(y)
if(l==null){l=m.qS(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.Zo(y,l==null?null:l.method))}}return z.$1(new H.vV(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.VS()
return z.$1(new P.AT(!1,null,null,null))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.VS()
return a},
ts:function(a){return new H.XO(a,null)},
CU:function(a){if(a==null||typeof a!='object')return J.v1(a)
else return H.eQ(a)},
B7:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
ft:[function(a,b,c,d,e,f,g){if(c===0)return H.zd(b,new H.dr(a))
else if(c===1)return H.zd(b,new H.TL(a,d))
else if(c===2)return H.zd(b,new H.KX(a,d,e))
else if(c===3)return H.zd(b,new H.uZ(a,d,e,f))
else if(c===4)return H.zd(b,new H.OQ(a,d,e,f,g))
else throw H.b(P.FM("Unsupported number of arguments for wrapped closure"))},null,null,14,0,null,5,6,7,8,9,10,11],
tR:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.c,H.ft)
a.$identity=z
return z},
iA:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.t(c).$iszM){z.$reflectionInfo=c
x=H.zh(z).f}else x=c
w=d?Object.create(new H.zx().constructor.prototype):Object.create(new H.q(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.yj
$.yj=u+1
u=new Function("a,b,c,d","this.$initialize(a,b,c,d);"+u)
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.SD(a,z,t)
s.$reflectionInfo=c}else{w.$name=f
s=z
t=!1}if(typeof x=="number")r=function(g){return function(){return H.lL(g)}}(x)
else if(u&&typeof x=="function"){q=t?H.yS:H.eZ
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.SD(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
vq:function(a,b,c,d){var z=H.eZ
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
SD:function(a,b,c){var z,y,x,w,v,u
if(c)return H.Hf(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.vq(y,!w,z,b)
if(y===0){w=$.bf
if(w==null){w=H.B3("self")
$.bf=w}w="return function(){return this."+H.d(w)+"."+H.d(z)+"();"
v=$.yj
$.yj=v+1
return new Function(w+H.d(v)+"}")()}u="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w="return function("+u+"){return this."
v=$.bf
if(v==null){v=H.B3("self")
$.bf=v}v=w+H.d(v)+"."+H.d(z)+"("+u+");"
w=$.yj
$.yj=w+1
return new Function(v+H.d(w)+"}")()},
Zq:function(a,b,c,d){var z,y
z=H.eZ
y=H.yS
switch(b?-1:a){case 0:throw H.b(new H.Eq("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
Hf:function(a,b){var z,y,x,w,v,u,t,s
z=H.oN()
y=$.n9
if(y==null){y=H.B3("receiver")
$.n9=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.Zq(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.yj
$.yj=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.yj
$.yj=u+1
return new Function(y+H.d(u)+"}")()},
qm:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.t(c).$iszM){c.fixed$length=Array
z=c}else z=c
return H.iA(a,b,z,!!d,e,f)},
ag:function(a){throw H.b(new P.t7("Cyclic initialization for static "+H.d(a)))},
KT:function(a,b,c){return new H.tD(a,b,c,null)},
N7:function(){return C.KZ},
Uh:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
Yg:function(a){return init.getIsolateTag(a)},
J:function(a,b){if(a!=null)a.$builtinTypeInfo=b
return a},
oX:function(a){if(a==null)return
return a.$builtinTypeInfo},
IM:function(a,b){return H.Y9(a["$as"+H.d(b)],H.oX(a))},
ip:function(a,b,c){var z=H.IM(a,b)
return z==null?null:z[c]},
Kp:function(a,b){var z=H.oX(a)
return z==null?null:z[b]},
Ko:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.ia(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)if(b==null)return C.jn.X(a)
else return b.$1(a)
else return},
ia:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.Rn("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.Q=v+", "
u=a[y]
if(u!=null)w=!1
v=z.Q+=H.d(H.Ko(u,c))}return w?"":"<"+H.d(z)+">"},
Y9:function(a,b){if(typeof a=="function"){a=H.ml(a,null,b)
if(a==null||typeof a==="object"&&a!==null&&a.constructor===Array)b=a
else if(typeof a=="function")b=H.ml(a,null,b)}return b},
hv:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.t1(a[y],b[y]))return!1
return!0},
IG:function(a,b,c){return H.ml(a,b,H.IM(b,c))},
t1:function(a,b){var z,y,x,w,v
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.Ly(a,b)
if('func' in a)return b.builtin$cls==="Pe"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){if(!('$is'+H.Ko(w,null) in y.prototype))return!1
v=y.prototype["$as"+H.d(H.Ko(w,null))]}else v=null
if(!z&&v==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.hv(H.Y9(v,z),x)},
Hc:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.t1(z,v)||H.t1(v,z)))return!1}return!0},
oM:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.t1(v,u)||H.t1(u,v)))return!1}return!0},
Ly:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("void" in a){if(!("void" in b)&&"ret" in b)return!1}else if(!("void" in b)){z=a.ret
y=b.ret
if(!(H.t1(z,y)||H.t1(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.Hc(x,w,!1))return!1
if(!H.Hc(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.t1(o,n)||H.t1(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.t1(o,n)||H.t1(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.t1(o,n)||H.t1(n,o)))return!1}}return H.oM(a.named,b.named)},
ml:function(a,b,c){return a.apply(b,c)},
or:function(a){var z=$.NF
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
wz:function(a){return H.eQ(a)},
iw:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
w3:function(a){var z,y,x,w,v,u
z=$.NF.$1(a)
y=$.nw[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.vv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.TX.$2(a,z)
if(z!=null){y=$.nw[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.vv[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.Va(x)
$.nw[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.vv[z]=x
return x}if(v==="-"){u=H.Va(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.Lc(a,x)
if(v==="*")throw H.b(new P.ds(z))
if(init.leafTags[z]===true){u=H.Va(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.Lc(a,x)},
Lc:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.Qu(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
Va:function(a){return J.Qu(a,!1,null,!!a.$isXj)},
ow:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.Qu(z,!1,null,!!z.$isXj)
else return J.Qu(z,c,null,null)},
XD:function(){if(!0===$.Bv)return
$.Bv=!0
H.Z1()},
Z1:function(){var z,y,x,w,v,u,t,s
$.nw=Object.create(null)
$.vv=Object.create(null)
H.kO()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.x7.$1(v)
if(u!=null){t=H.ow(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
kO:function(){var z,y,x,w,v,u,t
z=C.M1()
z=H.ud(C.Mc,H.ud(C.hQ,H.ud(C.XQ,H.ud(C.XQ,H.ud(C.Jh,H.ud(C.lR,H.ud(C.ur(C.w2),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.NF=new H.dC(v)
$.TX=new H.wN(u)
$.x7=new H.VX(t)},
ud:function(a,b){return a(b)||b},
b0:function(a,b,c){return a.indexOf(b,c)>=0},
WU:{
"^":"a;",
X:function(a){return P.vW(this)}},
kz:{
"^":"WU;Q",
Ag:function(){var z=this.$map
if(z==null){z=new H.N5(0,null,null,null,null,null,0)
z.$builtinTypeInfo=this.$builtinTypeInfo
H.B7(this.Q,z)
this.$map=z}return z},
p:function(a,b){return this.Ag().p(0,b)},
aN:function(a,b){this.Ag().aN(0,b)}},
LI:{
"^":"a;Q,a,b,c,d,e",
gWa:function(){return this.Q},
gnd:function(){var z,y,x,w
if(this.b===1)return C.xD
z=this.c
y=z.length-this.d.length
if(y===0)return C.xD
x=[]
for(w=0;w<y;++w)x.push(z[w])
x.immutable$list=!0
x.fixed$length=!0
return x},
gVm:function(){var z,y,x,w,v,u
if(this.b!==0)return P.A(P.wv,null)
z=this.d
y=z.length
x=this.c
w=x.length-y
if(y===0)return P.A(P.wv,null)
v=P.V(null,null,null,P.wv,null)
for(u=0;u<y;++u)v.q(0,new H.GD(z[u]),x[w+u])
return v}},
FD:{
"^":"a;Q,a,b,c,d,e,f,r",
BX:function(a,b){var z=this.c
if(b<z)return
return this.a[3+b-z]},
static:{zh:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.FD(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
Cj:{
"^":"r:3;Q,a,b",
$2:function(a,b){var z=this.Q
z.a=z.a+"$"+H.d(a)
this.b.push(a)
this.a.push(b);++z.Q}},
Zr:{
"^":"a;Q,a,b,c,d,e",
qS:function(a){var z,y,x
z=new RegExp(this.Q).exec(a)
if(z==null)return
y=Object.create(null)
x=this.a
if(x!==-1)y.arguments=z[x+1]
x=this.b
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.c
if(x!==-1)y.expr=z[x+1]
x=this.d
if(x!==-1)y.method=z[x+1]
x=this.e
if(x!==-1)y.receiver=z[x+1]
return y},
static:{cM:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(new RegExp("[[\\]{}()*+?.\\\\^$|]",'g'),'\\$&')
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.Zr(a.replace('\\$arguments\\$','((?:x|[^x])*)').replace('\\$argumentsExpr\\$','((?:x|[^x])*)').replace('\\$expr\\$','((?:x|[^x])*)').replace('\\$method\\$','((?:x|[^x])*)').replace('\\$receiver\\$','((?:x|[^x])*)'),y,x,w,v,u)},S7:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},Mj:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
Zo:{
"^":"Ge;Q,a",
X:function(a){var z=this.a
if(z==null)return"NullError: "+H.d(this.Q)
return"NullError: method not found: '"+H.d(z)+"' on null"}},
az:{
"^":"Ge;Q,a,b",
X:function(a){var z,y
z=this.a
if(z==null)return"NoSuchMethodError: "+H.d(this.Q)
y=this.b
if(y==null)return"NoSuchMethodError: method not found: '"+H.d(z)+"' ("+H.d(this.Q)+")"
return"NoSuchMethodError: method not found: '"+H.d(z)+"' on '"+H.d(y)+"' ("+H.d(this.Q)+")"},
static:{T3:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.az(a,y,z?null:b.receiver)}}},
vV:{
"^":"Ge;Q",
X:function(a){var z=this.Q
return C.xB.gl0(z)?"Error":"Error: "+z}},
Am:{
"^":"r:2;Q",
$1:function(a){if(!!J.t(a).$isGe)if(a.$thrownJsError==null)a.$thrownJsError=this.Q
return a}},
XO:{
"^":"a;Q,a",
X:function(a){var z,y
z=this.a
if(z!=null)return z
z=this.Q
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.a=z
return z}},
dr:{
"^":"r:0;Q",
$0:function(){return this.Q.$0()}},
TL:{
"^":"r:0;Q,a",
$0:function(){return this.Q.$1(this.a)}},
KX:{
"^":"r:0;Q,a,b",
$0:function(){return this.Q.$2(this.a,this.b)}},
uZ:{
"^":"r:0;Q,a,b,c",
$0:function(){return this.Q.$3(this.a,this.b,this.c)}},
OQ:{
"^":"r:0;Q,a,b,c,d",
$0:function(){return this.Q.$4(this.a,this.b,this.c,this.d)}},
r:{
"^":"a;",
X:function(a){return"Closure '"+H.lh(this)+"'"},
gCk:function(){return this},
$isPe:1,
gCk:function(){return this}},
Bp:{
"^":"r;"},
zx:{
"^":"Bp;",
X:function(a){var z=this.$name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
q:{
"^":"Bp;Q,a,b,c",
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.q))return!1
return this.Q===b.Q&&this.a===b.a&&this.b===b.b},
giO:function(a){var z,y
z=this.b
if(z==null)y=H.eQ(this.Q)
else y=typeof z!=="object"?J.v1(z):H.eQ(z)
return(y^H.eQ(this.a))>>>0},
X:function(a){var z=this.b
if(z==null)z=this.Q
return"Closure '"+H.d(this.c)+"' of "+H.H9(z)},
static:{eZ:function(a){return a.Q},yS:function(a){return a.b},oN:function(){var z=$.bf
if(z==null){z=H.B3("self")
$.bf=z}return z},B3:function(a){var z,y,x,w,v
z=new H.q("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
Eq:{
"^":"Ge;Q",
X:function(a){return"RuntimeError: "+H.d(this.Q)}},
lb:{
"^":"a;"},
tD:{
"^":"lb;Q,a,b,c",
Zg:function(a){var z=this.LC(a)
return z==null?!1:H.Ly(z,this.za())},
LC:function(a){var z=J.t(a)
return"$signature" in z?z.$signature():null},
za:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.Q
x=J.t(y)
if(!!x.$isnr)z.void=true
else if(!x.$ishJ)z.ret=y.za()
y=this.a
if(y!=null&&y.length!==0)z.args=H.P4(y)
y=this.b
if(y!=null&&y.length!==0)z.opt=H.P4(y)
y=this.c
if(y!=null){w=Object.create(null)
v=H.kU(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].za()}z.named=w}return z},
X:function(a){var z,y,x,w,v,u,t,s
z=this.a
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=J.Lz(u)}else{x="("
w=!1}z=this.b
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=J.Lz(u)}x+="]"}else{z=this.c
if(z!=null){x=(w?x+", ":x)+"{"
t=H.kU(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.d(z[s].za())+" "+s}x+="}"}}return x+(") -> "+J.Lz(this.Q))},
static:{P4:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].za())
return z}}},
hJ:{
"^":"lb;",
X:function(a){return"dynamic"},
za:function(){return}},
cu:{
"^":"a;Q,a",
X:function(a){var z,y
z=this.a
if(z!=null)return z
y=this.Q.replace(/[^<,> ]+/g,function(b){return init.mangledGlobalNames[b]||b})
this.a=y
return y},
giO:function(a){return J.v1(this.Q)},
m:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cu){z=this.Q
y=b.Q
y=z==null?y==null:z===y
z=y}else z=!1
return z}},
N5:{
"^":"a;Q,a,b,c,d,e,f",
gl0:function(a){return this.Q===0},
gUQ:function(a){return H.K1(H.J(new H.i5(this),[H.Kp(this,0)]),new H.mJ(this),H.Kp(this,0),H.Kp(this,1))},
NZ:function(a){var z,y
if(typeof a==="string"){z=this.a
if(z==null)return!1
return this.Xu(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.b
if(y==null)return!1
return this.Xu(y,a)}else return this.CX(a)},
CX:function(a){var z=this.c
if(z==null)return!1
return this.Fh(this.r0(z,this.xi(a)),a)>=0},
p:function(a,b){var z,y,x
if(typeof b==="string"){z=this.a
if(z==null)return
y=this.r0(z,b)
return y==null?null:y.a}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.b
if(x==null)return
y=this.r0(x,b)
return y==null?null:y.a}else return this.aa(b)},
aa:function(a){var z,y,x
z=this.c
if(z==null)return
y=this.r0(z,this.xi(a))
x=this.Fh(y,a)
if(x<0)return
return y[x].a},
q:function(a,b,c){var z,y
if(typeof b==="string"){z=this.a
if(z==null){z=this.zK()
this.a=z}this.u9(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.b
if(y==null){y=this.zK()
this.b=y}this.u9(y,b,c)}else this.xw(b,c)},
xw:function(a,b){var z,y,x,w
z=this.c
if(z==null){z=this.zK()
this.c=z}y=this.xi(a)
x=this.r0(z,y)
if(x==null)this.EI(z,y,[this.x4(a,b)])
else{w=this.Fh(x,a)
if(w>=0)x[w].a=b
else x.push(this.x4(a,b))}},
to:function(a,b){var z
if(this.NZ(a))return this.p(0,a)
z=b.$0()
this.q(0,a,z)
return z},
Rz:function(a,b){if(typeof b==="string")return this.JN(this.a,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.JN(this.b,b)
else return this.WM(b)},
WM:function(a){var z,y,x,w
z=this.c
if(z==null)return
y=this.r0(z,this.xi(a))
x=this.Fh(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.GS(w)
return w.a},
V1:function(a){if(this.Q>0){this.e=null
this.d=null
this.c=null
this.b=null
this.a=null
this.Q=0
this.f=this.f+1&67108863}},
aN:function(a,b){var z,y
z=this.d
y=this.f
for(;z!=null;){b.$2(z.Q,z.a)
if(y!==this.f)throw H.b(new P.UV(this))
z=z.b}},
u9:function(a,b,c){var z=this.r0(a,b)
if(z==null)this.EI(a,b,this.x4(b,c))
else z.a=c},
JN:function(a,b){var z
if(a==null)return
z=this.r0(a,b)
if(z==null)return
this.GS(z)
this.rn(a,b)
return z.a},
x4:function(a,b){var z,y
z=new H.db(a,b,null,null)
if(this.d==null){this.e=z
this.d=z}else{y=this.e
z.c=y
y.b=z
this.e=z}++this.Q
this.f=this.f+1&67108863
return z},
GS:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.d=y
else z.b=y
if(y==null)this.e=z
else y.c=z;--this.Q
this.f=this.f+1&67108863},
xi:function(a){return J.v1(a)&0x3ffffff},
Fh:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.mG(a[y].Q,b))return y
return-1},
X:function(a){return P.vW(this)},
r0:function(a,b){return a[b]},
EI:function(a,b,c){a[b]=c},
rn:function(a,b){delete a[b]},
Xu:function(a,b){return this.r0(a,b)!=null},
zK:function(){var z=Object.create(null)
this.EI(z,"<non-identifier-key>",z)
this.rn(z,"<non-identifier-key>")
return z},
$isym:1},
mJ:{
"^":"r:2;Q",
$1:[function(a){return this.Q.p(0,a)},null,null,2,0,null,12,"call"]},
db:{
"^":"a;Q,a,b,c"},
i5:{
"^":"cX;Q",
gv:function(a){return this.Q.Q},
gu:function(a){var z,y
z=this.Q
y=new H.N6(z,z.f,null,null)
y.b=z.d
return y},
aN:function(a,b){var z,y,x
z=this.Q
y=z.d
x=z.f
for(;y!=null;){b.$1(y.Q)
if(x!==z.f)throw H.b(new P.UV(z))
y=y.b}},
$isqC:1},
N6:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z=this.Q
if(this.a!==z.f)throw H.b(new P.UV(z))
else{z=this.b
if(z==null){this.c=null
return!1}else{this.c=z.Q
this.b=z.b
return!0}}}},
dC:{
"^":"r:2;Q",
$1:function(a){return this.Q(a)}},
wN:{
"^":"r:4;Q",
$2:function(a,b){return this.Q(a,b)}},
VX:{
"^":"r:5;Q",
$1:function(a){return this.Q(a)}}}],["","",,H,{
"^":"",
Wp:function(){return new P.lj("No element")},
ar:function(){return new P.lj("Too few elements")},
ho:{
"^":"cX;",
gu:function(a){return new H.a7(this,this.gv(this),0,null)},
aN:function(a,b){var z,y
z=this.gv(this)
for(y=0;y<z;++y){b.$1(this.Zv(0,y))
if(z!==this.gv(this))throw H.b(new P.UV(this))}},
ez:function(a,b){return H.J(new H.A8(this,b),[null,null])},
tt:function(a,b){var z,y
if(b){z=H.J([],[H.ip(this,"ho",0)])
C.M.sv(z,this.gv(this))}else z=H.J(Array(this.gv(this)),[H.ip(this,"ho",0)])
for(y=0;y<this.gv(this);++y)z[y]=this.Zv(0,y)
return z},
br:function(a){return this.tt(a,!0)},
$isqC:1},
nH:{
"^":"ho;Q,a,b",
gUD:function(){var z,y
z=J.wS(this.Q)
y=this.b
if(y==null||y>z)return z
return y},
gAs:function(){var z,y
z=J.wS(this.Q)
y=this.a
if(y>z)return z
return y},
gv:function(a){var z,y,x
z=J.wS(this.Q)
y=this.a
if(y>=z)return 0
x=this.b
if(x==null||x>=z)return z-y
return x-y},
Zv:function(a,b){var z=this.gAs()+b
if(b<0||z>=this.gUD())throw H.b(P.Cf(b,this,"index",null,null))
return J.i4(this.Q,z)},
Hd:function(a,b,c,d){var z,y
z=this.a
if(z<0)H.vh(P.TE(z,0,null,"start",null))
y=this.b
if(y!=null){if(y<0)H.vh(P.TE(y,0,null,"end",null))
if(z>y)throw H.b(P.TE(z,0,y,"start",null))}},
static:{j5:function(a,b,c,d){var z=H.J(new H.nH(a,b,c),[d])
z.Hd(a,b,c,d)
return z}}},
a7:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z,y,x,w
z=this.Q
y=J.U6(z)
x=y.gv(z)
if(this.a!==x)throw H.b(new P.UV(z))
w=this.b
if(w>=x){this.c=null
return!1}this.c=y.Zv(z,w);++this.b
return!0}},
i1:{
"^":"cX;Q,a",
gu:function(a){var z=new H.MH(null,J.Nx(this.Q),this.a)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z},
gv:function(a){return J.wS(this.Q)},
$ascX:function(a,b){return[b]},
static:{K1:function(a,b,c,d){if(!!J.t(a).$isqC)return H.J(new H.xy(a,b),[c,d])
return H.J(new H.i1(a,b),[c,d])}}},
xy:{
"^":"i1;Q,a",
$isqC:1},
MH:{
"^":"An;Q,a,b",
D:function(){var z=this.a
if(z.D()){this.Q=this.Mi(z.gk())
return!0}this.Q=null
return!1},
gk:function(){return this.Q},
Mi:function(a){return this.b.$1(a)}},
A8:{
"^":"ho;Q,a",
gv:function(a){return J.wS(this.Q)},
Zv:function(a,b){return this.Mi(J.i4(this.Q,b))},
Mi:function(a){return this.a.$1(a)},
$asho:function(a,b){return[b]},
$ascX:function(a,b){return[b]},
$isqC:1},
U5:{
"^":"cX;Q,a",
gu:function(a){var z=new H.SO(J.Nx(this.Q),this.a)
z.$builtinTypeInfo=this.$builtinTypeInfo
return z}},
SO:{
"^":"An;Q,a",
D:function(){for(var z=this.Q;z.D();)if(this.Mi(z.gk()))return!0
return!1},
gk:function(){return this.Q.gk()},
Mi:function(a){return this.a.$1(a)}},
SU:{
"^":"a;"},
GD:{
"^":"a;Q",
m:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.GD){z=this.Q
y=b.Q
y=z==null?y==null:z===y
z=y}else z=!1
return z},
giO:function(a){return 536870911&664597*J.v1(this.Q)},
X:function(a){return"Symbol(\""+H.d(this.Q)+"\")"}}}],["","",,H,{
"^":"",
kU:function(a){var z=H.J(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,P,{
"^":"",
Oj:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.Sx()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.Q=null
new self.MutationObserver(H.tR(new P.th(z),1)).observe(y,{childList:true})
return new P.ha(z,y,x)}else if(self.setImmediate!=null)return P.q9()
return P.K7()},
ZV:[function(a){++init.globalState.e.a
self.scheduleImmediate(H.tR(new P.C6(a),0))},"$1","Sx",2,0,22],
oA:[function(a){++init.globalState.e.a
self.setImmediate(H.tR(new P.Ft(a),0))},"$1","q9",2,0,22],
Bz:[function(a){P.YF(C.RT,a)},"$1","K7",2,0,22],
VH:function(a,b){var z=H.N7()
z=H.KT(z,[z,z]).Zg(a)
if(z){b.toString
return a}else{b.toString
return a}},
pH:function(a,b,c){var z,y,x,w,v
z={}
y=H.J(new P.vs(0,$.X3,null),[P.zM])
z.Q=null
z.a=0
z.b=null
z.c=null
x=new P.VN(z,c,b,y)
for(w=new H.a7(a,a.gv(a),0,null);w.D();)w.c.Rx(new P.ff(z,c,b,y,z.a++),x)
x=z.a
if(x===0){z=H.J(new P.vs(0,$.X3,null),[null])
z.Xf(C.xD)
return z}v=Array(x)
v.fixed$length=Array
z.Q=v
return y},
pu:function(){var z,y
for(;z=$.S6,z!=null;){$.mg=null
y=z.b
$.S6=y
if(y==null)$.k8=null
$.X3=z.a
z.Ki()}},
ye:[function(){$.UD=!0
try{P.pu()}finally{$.X3=C.NU
$.mg=null
$.UD=!1
if($.S6!=null)$.ej().$1(P.M7())}},"$0","M7",0,0,1],
IA:function(a){if($.S6==null){$.k8=a
$.S6=a
if(!$.UD)$.ej().$1(P.M7())}else{$.k8.b=a
$.k8=a}},
rb:function(a){var z,y
z=$.X3
if(C.NU===z){P.Tk(null,null,C.NU,a)
return}z.toString
if(C.NU.gF7()===z){P.Tk(null,null,z,a)
return}y=$.X3
P.Tk(null,null,y,y.kb(a,!0))},
bK:function(a,b,c,d){var z
if(c){z=H.J(new P.zW(b,a,0,null,null,null,null),[d])
z.d=z
z.c=z}else{z=H.J(new P.DL(b,a,0,null,null,null,null),[d])
z.d=z
z.c=z}return z},
ot:function(a){var z,y,x,w,v
if(a==null)return
try{z=a.$0()
if(!!J.t(z).$isb8)return z
return}catch(w){v=H.Ru(w)
y=v
x=H.ts(w)
v=$.X3
v.toString
P.L2(null,null,v,y,x)}},
QE:[function(a){},"$1","ux",2,0,23,13],
Z0:[function(a,b){var z=$.X3
z.toString
P.L2(null,null,z,a,b)},function(a){return P.Z0(a,null)},"$2","$1","bx",2,2,9,14,15,16],
dL:[function(){},"$0","v3",0,0,1],
FE:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){t=H.Ru(u)
z=t
y=H.ts(u)
$.X3.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.w8(x)
w=t
v=x.gI4()
c.$2(w,v)}}},
NX:function(a,b,c,d){var z=a.Gv()
if(!!J.t(z).$isb8)z.wM(new P.dR(b,c,d))
else b.ZL(c,d)},
TB:function(a,b){return new P.uR(a,b)},
rT:function(a,b){var z=$.X3
if(z===C.NU){z.toString
return P.YF(a,b)}return P.YF(a,z.kb(b,!0))},
YF:function(a,b){var z=C.jn.BU(a.Q,1000)
return H.cy(z<0?0:z,b)},
PJ:function(a){var z=$.X3
$.X3=a
return z},
L2:function(a,b,c,d,e){var z,y,x
z=new P.nx(new P.pK(d,e),C.NU,null)
y=$.S6
if(y==null){P.IA(z)
$.mg=$.k8}else{x=$.mg
if(x==null){z.b=y
$.mg=z
$.S6=z}else{z.b=x.b
x.b=z
$.mg=z
if(z.b==null)$.k8=z}}},
T8:function(a,b,c,d){var z,y
if($.X3===c)return d.$0()
z=P.PJ(c)
try{y=d.$0()
return y}finally{$.X3=z}},
yv:function(a,b,c,d,e){var z,y
if($.X3===c)return d.$1(e)
z=P.PJ(c)
try{y=d.$1(e)
return y}finally{$.X3=z}},
Qx:function(a,b,c,d,e,f){var z,y
if($.X3===c)return d.$2(e,f)
z=P.PJ(c)
try{y=d.$2(e,f)
return y}finally{$.X3=z}},
Tk:function(a,b,c,d){var z=C.NU!==c
if(z){d=c.kb(d,!(!z||C.NU.gF7()===c))
c=C.NU}P.IA(new P.nx(d,c,null))},
th:{
"^":"r:2;Q",
$1:[function(a){var z,y
H.ox()
z=this.Q
y=z.Q
z.Q=null
y.$0()},null,null,2,0,null,17,"call"]},
ha:{
"^":"r:6;Q,a,b",
$1:function(a){var z,y;++init.globalState.e.a
this.Q.Q=a
z=this.a
y=this.b
z.firstChild?z.removeChild(y):z.appendChild(y)}},
C6:{
"^":"r:0;Q",
$0:[function(){H.ox()
this.Q.$0()},null,null,0,0,null,"call"]},
Ft:{
"^":"r:0;Q",
$0:[function(){H.ox()
this.Q.$0()},null,null,0,0,null,"call"]},
O6:{
"^":"OH;Q,a",
X:function(a){var z,y
z="Uncaught Error: "+H.d(this.Q)
y=this.a
return y!=null?z+("\nStack Trace:\n"+J.Lz(y)):z},
static:{HR:function(a,b){if(b!=null)return b
if(!!J.t(a).$isGe)return a.gI4()
return}}},
Gm:{
"^":"u8;Q"},
JI:{
"^":"yU;x,tL:y@,n8:z?,r,Q,a,b,c,d,e,f",
gz3:function(){return this.r},
lT:function(){},
ie:function(){}},
WV:{
"^":"a;YM:b?,tL:c@,n8:d?",
gd9:function(){return this.b<4},
fC:function(a){var z,y
z=a.z
y=a.y
z.stL(y)
y.sn8(z)
a.z=a
a.y=a},
MI:function(a,b,c,d){var z,y
if((this.b&4)!==0){if(c==null)c=P.v3()
z=new P.EM($.X3,0,c)
z.q1()
return z}z=$.X3
y=new P.JI(null,null,null,this,null,null,null,z,d?1:0,null,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
y.Cy(a,b,c,d)
y.z=y
y.y=y
z=this.d
y.z=z
y.y=this
z.stL(y)
this.d=y
y.x=this.b&1
if(this.c===y)P.ot(this.Q)
return y},
rR:function(a){var z
if(a.y===a)return
z=a.x
if((z&2)!==0)a.x=z|4
else{this.fC(a)
if((this.b&2)===0&&this.c===this)this.cR()}return},
EB:function(a){},
ho:function(a){},
Pq:["Kc",function(){if((this.b&4)!==0)return new P.lj("Cannot add new events after calling close")
return new P.lj("Cannot add new events while doing an addStream")}],
C4:function(a){var z,y,x,w
z=this.b
if((z&2)!==0)throw H.b(new P.lj("Cannot fire new event. Controller is already firing an event"))
y=this.c
if(y===this)return
x=z&1
this.b=z^3
for(;y!==this;){z=y.x
if((z&1)===x){y.x=z|2
a.$1(y)
z=y.x^1
y.x=z
w=y.y
if((z&4)!==0)this.fC(y)
y.x=y.x&4294967293
y=w}else y=y.y}this.b&=4294967293
if(this.c===this)this.cR()},
cR:function(){if((this.b&4)!==0&&this.f.Q===0)this.f.Xf(null)
P.ot(this.a)}},
zW:{
"^":"WV;Q,a,b,c,d,e,f",
gd9:function(){return P.WV.prototype.gd9.call(this)&&(this.b&2)===0},
Pq:function(){if((this.b&2)!==0)return new P.lj("Cannot fire new event. Controller is already firing an event")
return this.Kc()},
MW:function(a){var z=this.c
if(z===this)return
if(z.gtL()===this){this.b|=2
this.c.Rg(a)
this.b&=4294967293
if(this.c===this)this.cR()
return}this.C4(new P.tK(this,a))}},
tK:{
"^":"r;Q,a",
$1:function(a){a.Rg(this.a)},
$signature:function(){return H.IG(function(a){return{func:1,args:[[P.KA,a]]}},this.Q,"zW")}},
DL:{
"^":"WV;Q,a,b,c,d,e,f",
MW:function(a){var z
for(z=this.c;z!==this;z=z.y)z.C2(new P.LV(a,null))}},
b8:{
"^":"a;"},
VN:{
"^":"r:7;Q,a,b,c",
$2:[function(a,b){var z,y
z=this.Q
y=--z.a
if(z.Q!=null){z.Q=null
if(z.a===0||this.a)this.c.ZL(a,b)
else{z.b=a
z.c=b}}else if(y===0&&!this.a)this.c.ZL(z.b,z.c)},null,null,4,0,null,18,19,"call"]},
ff:{
"^":"r:8;Q,a,b,c,d",
$1:[function(a){var z,y,x
z=this.Q
y=--z.a
x=z.Q
if(x!=null){x[this.d]=a
if(y===0)this.c.X2(x)}else if(z.a===0&&!this.a)this.c.ZL(z.b,z.c)},null,null,2,0,null,13,"call"]},
Fe:{
"^":"a;Q,a,b,c,d"},
vs:{
"^":"a;YM:Q?,a,b",
sKl:function(a){if(a)this.Q=2
else this.Q=0},
Rx:function(a,b){var z,y
z=H.J(new P.vs(0,$.X3,null),[null])
y=z.a
if(y!==C.NU){y.toString
if(b!=null)b=P.VH(b,y)}this.xf(new P.Fe(null,z,b==null?1:3,a,b))
return z},
ml:function(a){return this.Rx(a,null)},
wM:function(a){var z,y
z=$.X3
y=new P.vs(0,z,null)
y.$builtinTypeInfo=this.$builtinTypeInfo
if(z!==C.NU)z.toString
this.xf(new P.Fe(null,y,8,a,null))
return y},
eY:function(){if(this.Q!==0)throw H.b(new P.lj("Future already completed"))
this.Q=1},
vd:function(a){this.Q=4
this.b=a},
P9:function(a){this.Q=8
this.b=a},
Is:function(a,b){this.P9(new P.OH(a,b))},
xf:function(a){var z
if(this.Q>=4){z=this.a
z.toString
P.Tk(null,null,z,new P.da(this,a))}else{a.Q=this.b
this.b=a}},
ah:function(){var z,y,x
z=this.b
this.b=null
for(y=null;z!=null;y=z,z=x){x=z.Q
z.Q=y}return y},
HH:function(a){var z,y
z=J.t(a)
if(!!z.$isb8)if(!!z.$isvs)P.A9(a,this)
else P.k3(a,this)
else{y=this.ah()
this.vd(a)
P.HZ(this,y)}},
X2:function(a){var z=this.ah()
this.vd(a)
P.HZ(this,z)},
ZL:[function(a,b){var z=this.ah()
this.P9(new P.OH(a,b))
P.HZ(this,z)},function(a){return this.ZL(a,null)},"yk","$2","$1","gFa",2,2,9,14,15,16],
Xf:function(a){var z
if(a==null);else{z=J.t(a)
if(!!z.$isb8){if(!!z.$isvs){z=a.Q
if(z>=4&&z===8){this.eY()
z=this.a
z.toString
P.Tk(null,null,z,new P.rH(this,a))}else P.A9(a,this)}else P.k3(a,this)
return}}this.eY()
z=this.a
z.toString
P.Tk(null,null,z,new P.EH(this,a))},
$isb8:1,
static:{k3:function(a,b){var z,y,x,w
b.sYM(2)
try{a.Rx(new P.pV(b),new P.U7(b))}catch(x){w=H.Ru(x)
z=w
y=H.ts(x)
P.rb(new P.vr(b,z,y))}},A9:function(a,b){var z
b.Q=2
z=new P.Fe(null,b,0,null,null)
if(a.Q>=4)P.HZ(a,z)
else a.xf(z)},HZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.Q=a
for(y=a;!0;){x={}
w=y.Q===8
if(b==null){if(w){z=y.b
y=y.a
x=z.Q
z=z.a
y.toString
P.L2(null,null,y,x,z)}return}for(;v=b.Q,v!=null;b=v){b.Q=null
P.HZ(z.Q,b)}x.Q=!0
u=w?null:z.Q.b
x.a=u
x.b=!1
y=!w
if(y){t=b.b
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.a
s=t.a
if(w){r=z.Q.a
r.toString
if(r==null?s!=null:r!==s){r=r.gF7()
s.toString
r=r===s}else r=!0
r=!r}else r=!1
if(r){y=z.Q
x=y.b
y=y.a
t=x.Q
x=x.a
y.toString
P.L2(null,null,y,t,x)
return}q=$.X3
if(q==null?s!=null:q!==s)$.X3=s
else q=null
if(y){if((b.b&1)!==0)x.Q=new P.rq(x,b,u,s).$0()}else new P.RW(z,x,b,s).$0()
if(b.b===8)new P.YP(z,x,w,b,s).$0()
if(q!=null)$.X3=q
if(x.b)return
if(x.Q){y=x.a
y=(u==null?y!=null:u!==y)&&!!J.t(y).$isb8}else y=!1
if(y){p=x.a
if(p instanceof P.vs)if(p.Q>=4){t.Q=2
z.Q=p
b=new P.Fe(null,t,0,null,null)
y=p
continue}else P.A9(p,t)
else P.k3(p,t)
return}}o=b.a
b=o.ah()
y=x.Q
x=x.a
if(y){o.Q=4
o.b=x}else{o.Q=8
o.b=x}z.Q=o
y=o}}}},
da:{
"^":"r:0;Q,a",
$0:function(){P.HZ(this.Q,this.a)}},
pV:{
"^":"r:2;Q",
$1:[function(a){this.Q.X2(a)},null,null,2,0,null,13,"call"]},
U7:{
"^":"r:10;Q",
$2:[function(a,b){this.Q.ZL(a,b)},function(a){return this.$2(a,null)},"$1",null,null,null,2,2,null,14,15,16,"call"]},
vr:{
"^":"r:0;Q,a,b",
$0:[function(){this.Q.ZL(this.a,this.b)},null,null,0,0,null,"call"]},
rH:{
"^":"r:0;Q,a",
$0:function(){P.A9(this.a,this.Q)}},
EH:{
"^":"r:0;Q,a",
$0:function(){this.Q.X2(this.a)}},
rq:{
"^":"r:11;Q,a,b,c",
$0:function(){var z,y,x,w
try{this.Q.a=this.c.FI(this.a.c,this.b)
return!0}catch(x){w=H.Ru(x)
z=w
y=H.ts(x)
this.Q.a=new P.OH(z,y)
return!1}}},
RW:{
"^":"r:1;Q,a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.Q.Q.b
y=!0
r=this.b
if(r.b===6){x=r.c
try{y=this.c.FI(x,J.w8(z))}catch(q){r=H.Ru(q)
w=r
v=H.ts(q)
r=J.w8(z)
p=w
o=(r==null?p==null:r===p)?z:new P.OH(w,v)
r=this.a
r.a=o
r.Q=!1
return}}u=r.d
if(y&&u!=null){try{r=u
p=H.N7()
p=H.KT(p,[p,p]).Zg(r)
n=this.c
m=this.a
if(p)m.a=n.mg(u,J.w8(z),z.gI4())
else m.a=n.FI(u,J.w8(z))}catch(q){r=H.Ru(q)
t=r
s=H.ts(q)
r=J.w8(z)
p=t
o=(r==null?p==null:r===p)?z:new P.OH(t,s)
r=this.a
r.a=o
r.Q=!1
return}this.a.Q=!0}else{r=this.a
r.a=z
r.Q=!1}}},
YP:{
"^":"r:1;Q,a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z={}
z.Q=null
try{w=this.d.Gr(this.c.c)
z.Q=w
v=w}catch(u){z=H.Ru(u)
y=z
x=H.ts(u)
if(this.b){z=this.Q.Q.b.Q
v=y
v=z==null?v==null:z===v
z=v}else z=!1
v=this.a
if(z)v.a=this.Q.Q.b
else v.a=new P.OH(y,x)
v.Q=!1
return}if(!!J.t(v).$isb8){t=this.c.a
t.sKl(!0)
this.a.b=!0
v.Rx(new P.jZ(this.Q,t),new P.FZ(z,t))}}},
jZ:{
"^":"r:2;Q,a",
$1:[function(a){P.HZ(this.Q.Q,new P.Fe(null,this.a,0,null,null))},null,null,2,0,null,20,"call"]},
FZ:{
"^":"r:10;Q,a",
$2:[function(a,b){var z,y
z=this.Q
if(!(z.Q instanceof P.vs)){y=H.J(new P.vs(0,$.X3,null),[null])
z.Q=y
y.Is(a,b)}P.HZ(z.Q,new P.Fe(null,this.a,0,null,null))},function(a){return this.$2(a,null)},"$1",null,null,null,2,2,null,14,15,16,"call"]},
nx:{
"^":"a;Q,a,b",
Ki:function(){return this.Q.$0()}},
qh:{
"^":"a;",
aN:function(a,b){var z,y
z={}
y=H.J(new P.vs(0,$.X3,null),[null])
z.Q=null
z.Q=this.X5(new P.lz(z,this,b,y),!0,new P.M4(y),y.gFa())
return y},
gv:function(a){var z,y
z={}
y=H.J(new P.vs(0,$.X3,null),[P.P])
z.Q=0
this.X5(new P.B5(z),!0,new P.PI(z,y),y.gFa())
return y}},
lz:{
"^":"r;Q,a,b,c",
$1:[function(a){P.FE(new P.Rl(this.b,a),new P.Jb(),P.TB(this.Q.Q,this.c))},null,null,2,0,null,21,"call"],
$signature:function(){return H.IG(function(a){return{func:1,args:[a]}},this.a,"qh")}},
Rl:{
"^":"r:0;Q,a",
$0:function(){return this.Q.$1(this.a)}},
Jb:{
"^":"r:2;",
$1:function(a){}},
M4:{
"^":"r:0;Q",
$0:[function(){this.Q.HH(null)},null,null,0,0,null,"call"]},
B5:{
"^":"r:2;Q",
$1:[function(a){++this.Q.Q},null,null,2,0,null,17,"call"]},
PI:{
"^":"r:0;Q,a",
$0:[function(){this.a.HH(this.Q.Q)},null,null,0,0,null,"call"]},
MO:{
"^":"a;"},
u8:{
"^":"ez;Q",
w3:function(a,b,c,d){return this.Q.MI(a,b,c,d)},
giO:function(a){return(H.eQ(this.Q)^892482866)>>>0},
m:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.u8))return!1
return b.Q===this.Q}},
yU:{
"^":"KA;z3:r<",
cZ:function(){return this.gz3().rR(this)},
lT:function(){this.gz3().EB(this)},
ie:function(){this.gz3().ho(this)}},
NO:{
"^":"a;"},
KA:{
"^":"a;Q,a,b,c,YM:d?,e,f",
Gv:function(){var z=(this.d&4294967279)>>>0
this.d=z
if((z&8)!==0)return this.e
this.WN()
return this.e},
WN:function(){var z,y
z=(this.d|8)>>>0
this.d=z
if((z&64)!==0){y=this.f
if(y.Q===1)y.Q=3}if((z&32)===0)this.f=null
this.e=this.cZ()},
Rg:function(a){var z=this.d
if((z&8)!==0)return
if(z<32)this.MW(a)
else this.C2(new P.LV(a,null))},
lT:function(){},
ie:function(){},
cZ:function(){return},
C2:function(a){var z,y
z=this.f
if(z==null){z=new P.Qk(null,null,0)
this.f=z}z.h(0,a)
y=this.d
if((y&64)===0){y=(y|64)>>>0
this.d=y
if(y<128)this.f.t2(this)}},
MW:function(a){var z=this.d
this.d=(z|32)>>>0
this.c.m1(this.Q,a)
this.d=(this.d&4294967263)>>>0
this.Iy((z&4)!==0)},
Iy:function(a){var z,y,x
z=this.d
if((z&64)!==0&&this.f.b==null){z=(z&4294967231)>>>0
this.d=z
if((z&4)!==0)if(z<128){y=this.f
y=y==null||y.b==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.d=z}}for(;!0;a=x){if((z&8)!==0){this.f=null
return}x=(z&4)!==0
if(a===x)break
this.d=(z^32)>>>0
if(x)this.lT()
else this.ie()
z=(this.d&4294967263)>>>0
this.d=z}if((z&64)!==0&&z<128)this.f.t2(this)},
Cy:function(a,b,c,d){var z=this.c
z.toString
this.Q=a
this.a=P.VH(b==null?P.bx():b,z)
this.b=c==null?P.v3():c},
$isNO:1,
$isMO:1,
static:{jO:function(a,b,c,d){var z=$.X3
z=new P.KA(null,null,null,z,d?1:0,null,null)
z.Cy(a,b,c,d)
return z}}},
ez:{
"^":"qh;",
X5:function(a,b,c,d){return this.w3(a,d,c,!0===b)},
yI:function(a){return this.X5(a,null,null,null)},
w3:function(a,b,c,d){return P.jO(a,b,c,d)}},
fI:{
"^":"a;aw:Q@"},
LV:{
"^":"fI;M:a>,Q",
dP:function(a){a.MW(this.a)}},
Zj:{
"^":"a;YM:Q?",
t2:function(a){var z=this.Q
if(z===1)return
if(z>=1){this.Q=1
return}P.rb(new P.CR(this,a))
this.Q=1}},
CR:{
"^":"r:0;Q,a",
$0:[function(){var z,y
z=this.Q
y=z.Q
z.Q=0
if(y===3)return
z.TO(this.a)},null,null,0,0,null,"call"]},
Qk:{
"^":"Zj;a,b,Q",
h:function(a,b){var z=this.b
if(z==null){this.b=b
this.a=b}else{z.saw(b)
this.b=b}},
TO:function(a){var z,y
z=this.a
y=z.gaw()
this.a=y
if(y==null)this.b=null
z.dP(a)}},
EM:{
"^":"a;Q,YM:a?,b",
q1:function(){var z,y
if((this.a&2)!==0)return
z=this.Q
y=this.gcv()
z.toString
P.Tk(null,null,z,y)
this.a=(this.a|2)>>>0},
Gv:function(){return},
Dd:[function(){var z=(this.a&4294967293)>>>0
this.a=z
if(z>=4)return
this.a=(z|1)>>>0
this.Q.bH(this.b)},"$0","gcv",0,0,1]},
dR:{
"^":"r:0;Q,a,b",
$0:[function(){return this.Q.ZL(this.a,this.b)},null,null,0,0,null,"call"]},
uR:{
"^":"r:12;Q,a",
$2:function(a,b){return P.NX(this.Q,this.a,a,b)}},
OH:{
"^":"a;kc:Q>,I4:a<",
X:function(a){return H.d(this.Q)},
$isGe:1},
m0:{
"^":"a;"},
pK:{
"^":"r:0;Q,a",
$0:function(){var z=this.Q
throw H.b(new P.O6(z,P.HR(z,this.a)))}},
R8:{
"^":"m0;",
gF7:function(){return this},
bH:function(a){var z,y,x,w
try{if(C.NU===$.X3){x=a.$0()
return x}x=P.T8(null,null,this,a)
return x}catch(w){x=H.Ru(w)
z=x
y=H.ts(w)
return P.L2(null,null,this,z,y)}},
m1:function(a,b){var z,y,x,w
try{if(C.NU===$.X3){x=a.$1(b)
return x}x=P.yv(null,null,this,a,b)
return x}catch(w){x=H.Ru(w)
z=x
y=H.ts(w)
return P.L2(null,null,this,z,y)}},
kb:function(a,b){if(b)return new P.hj(this,a)
else return new P.MK(this,a)},
oj:function(a,b){if(b)return new P.pQ(this,a)
else return new P.FG(this,a)},
p:function(a,b){return},
Gr:function(a){if($.X3===C.NU)return a.$0()
return P.T8(null,null,this,a)},
FI:function(a,b){if($.X3===C.NU)return a.$1(b)
return P.yv(null,null,this,a,b)},
mg:function(a,b,c){if($.X3===C.NU)return a.$2(b,c)
return P.Qx(null,null,this,a,b,c)}},
hj:{
"^":"r:0;Q,a",
$0:function(){return this.Q.bH(this.a)}},
MK:{
"^":"r:0;Q,a",
$0:function(){return this.Q.Gr(this.a)}},
pQ:{
"^":"r:2;Q,a",
$1:[function(a){return this.Q.m1(this.a,a)},null,null,2,0,null,22,"call"]},
FG:{
"^":"r:2;Q,a",
$1:[function(a){return this.Q.FI(this.a,a)},null,null,2,0,null,22,"call"]}}],["","",,P,{
"^":"",
A:function(a,b){return H.J(new H.N5(0,null,null,null,null,null,0),[a,b])},
u5:function(){return H.J(new H.N5(0,null,null,null,null,null,0),[null,null])},
Td:function(a){return H.B7(a,H.J(new H.N5(0,null,null,null,null,null,0),[null,null]))},
Ou:[function(a,b){return J.mG(a,b)},"$2","iv",4,0,24],
T9:[function(a){return J.v1(a)},"$1","rm",2,0,25,23],
Py:function(a,b,c,d,e){return H.J(new P.k6(0,null,null,null,null),[d,e])},
EP:function(a,b,c){var z,y
if(P.hB(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.xb()
y.push(a)
try{P.Vr(a,z)}finally{y.pop()}y=P.vg(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
WE:function(a,b,c){var z,y,x
if(P.hB(a))return b+"..."+c
z=new P.Rn(b)
y=$.xb()
y.push(a)
try{x=z
x.sIN(P.vg(x.gIN(),a,", "))}finally{y.pop()}y=z
y.sIN(y.gIN()+c)
y=z.gIN()
return y.charCodeAt(0)==0?y:y},
hB:function(a){var z,y
for(z=0;y=$.xb(),z<y.length;++z)if(a===y[z])return!0
return!1},
Vr:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gu(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.D())return
w=H.d(z.gk())
b.push(w)
y+=w.length+2;++x}if(!z.D()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gk();++x
if(!z.D()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gk();++x
for(;z.D();t=s,s=r){r=z.gk();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
V:function(a,b,c,d,e){return H.J(new H.N5(0,null,null,null,null,null,0),[d,e])},
Q9:function(a,b){return H.J(new P.ey(0,null,null,null,null,null,0),[a,b])},
fM:function(a,b,c,d){return H.J(new P.b6(0,null,null,null,null,null,0),[d])},
vW:function(a){var z,y,x
z={}
if(P.hB(a))return"{...}"
y=new P.Rn("")
try{$.xb().push(a)
x=y
x.sIN(x.gIN()+"{")
z.Q=!0
J.kH(a,new P.W0(z,y))
z=y
z.sIN(z.gIN()+"}")}finally{$.xb().pop()}z=y.gIN()
return z.charCodeAt(0)==0?z:z},
k6:{
"^":"a;Q,a,b,c,d",
NZ:function(a){var z
if(typeof a==="number"&&(a&0x3ffffff)===a){z=this.b
return z==null?!1:z[a]!=null}else return this.KY(a)},
KY:function(a){var z=this.c
if(z==null)return!1
return this.DF(z[this.rk(a)],a)>=0},
p:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.a
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.b
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.c8(b)},
c8:function(a){var z,y,x
z=this.c
if(z==null)return
y=z[this.rk(a)]
x=this.DF(y,a)
return x<0?null:y[x+1]},
q:function(a,b,c){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.b
if(z==null){z=P.a0()
this.b=z}this.dg(z,b,c)}else this.Gk(b,c)},
Gk:function(a,b){var z,y,x,w
z=this.c
if(z==null){z=P.a0()
this.c=z}y=this.rk(a)
x=z[y]
if(x==null){P.cW(z,y,[a,b]);++this.Q
this.d=null}else{w=this.DF(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.Q
this.d=null}}},
Rz:function(a,b){if(typeof b==="number"&&(b&0x3ffffff)===b)return this.H4(this.b,b)
else return this.qg(b)},
qg:function(a){var z,y,x
z=this.c
if(z==null)return
y=z[this.rk(a)]
x=this.DF(y,a)
if(x<0)return;--this.Q
this.d=null
return y.splice(x,2)[1]},
aN:function(a,b){var z,y,x,w
z=this.Cf()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.p(0,w))
if(z!==this.d)throw H.b(new P.UV(this))}},
Cf:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.d
if(z!=null)return z
y=Array(this.Q)
y.fixed$length=Array
x=this.a
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.b
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.c
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.d=y
return y},
dg:function(a,b,c){if(a[b]==null){++this.Q
this.d=null}P.cW(a,b,c)},
H4:function(a,b){var z
if(a!=null&&a[b]!=null){z=P.vL(a,b)
delete a[b];--this.Q
this.d=null
return z}else return},
rk:function(a){return J.v1(a)&0x3ffffff},
DF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.mG(a[y],b))return y
return-1},
static:{vL:function(a,b){var z=a[b]
return z===a?null:z},cW:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},a0:function(){var z=Object.create(null)
P.cW(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
ey:{
"^":"N5;Q,a,b,c,d,e,f",
xi:function(a){return H.CU(a)&0x3ffffff},
Fh:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].Q
if(x==null?b==null:x===b)return y}return-1}},
b6:{
"^":"u3;Q,a,b,c,d,e,f",
gu:function(a){var z=new P.zQ(this,this.f,null,null)
z.b=this.d
return z},
gv:function(a){return this.Q},
tg:function(a,b){var z
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.b
if(z==null)return!1
return z[b]!=null}else return this.PR(b)},
PR:function(a){var z=this.c
if(z==null)return!1
return this.DF(z[this.rk(a)],a)>=0},
Zt:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.tg(0,a)?a:null
else return this.vR(a)},
vR:function(a){var z,y,x
z=this.c
if(z==null)return
y=z[this.rk(a)]
x=this.DF(y,a)
if(x<0)return
return J.Tf(y,x).gdA()},
aN:function(a,b){var z,y
z=this.d
y=this.f
for(;z!=null;){b.$1(z.Q)
if(y!==this.f)throw H.b(new P.UV(this))
z=z.a}},
h:function(a,b){var z,y
if(typeof b==="number"&&(b&0x3ffffff)===b){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cA(z,b)}else return this.Ai(b)},
Ai:function(a){var z,y,x
z=this.c
if(z==null){z=P.T2()
this.c=z}y=this.rk(a)
x=z[y]
if(x==null)z[y]=[this.c5(a)]
else{if(this.DF(x,a)>=0)return!1
x.push(this.c5(a))}return!0},
Rz:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.H4(this.a,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.H4(this.b,b)
else return this.qg(b)},
qg:function(a){var z,y,x
z=this.c
if(z==null)return!1
y=z[this.rk(a)]
x=this.DF(y,a)
if(x<0)return!1
this.Vb(y.splice(x,1)[0])
return!0},
V1:function(a){if(this.Q>0){this.e=null
this.d=null
this.c=null
this.b=null
this.a=null
this.Q=0
this.f=this.f+1&67108863}},
cA:function(a,b){if(a[b]!=null)return!1
a[b]=this.c5(b)
return!0},
H4:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.Vb(z)
delete a[b]
return!0},
c5:function(a){var z,y
z=new P.tj(a,null,null)
if(this.d==null){this.e=z
this.d=z}else{y=this.e
z.b=y
y.a=z
this.e=z}++this.Q
this.f=this.f+1&67108863
return z},
Vb:function(a){var z,y
z=a.b
y=a.a
if(z==null)this.d=y
else z.a=y
if(y==null)this.e=z
else y.b=z;--this.Q
this.f=this.f+1&67108863},
rk:function(a){return J.v1(a)&0x3ffffff},
DF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.mG(a[y].Q,b))return y
return-1},
$isqC:1,
static:{T2:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
tj:{
"^":"a;dA:Q<,a,b"},
zQ:{
"^":"a;Q,a,b,c",
gk:function(){return this.c},
D:function(){var z=this.Q
if(this.a!==z.f)throw H.b(new P.UV(z))
else{z=this.b
if(z==null){this.c=null
return!1}else{this.c=z.Q
this.b=z.a
return!0}}}},
u3:{
"^":"Vj;"},
lD:{
"^":"a;",
gu:function(a){return new H.a7(a,this.gv(a),0,null)},
Zv:function(a,b){return this.p(a,b)},
aN:function(a,b){var z,y
z=this.gv(a)
for(y=0;y<z;++y){b.$1(this.p(a,y))
if(z!==this.gv(a))throw H.b(new P.UV(a))}},
ez:function(a,b){return H.J(new H.A8(a,b),[null,null])},
X:function(a){return P.WE(a,"[","]")},
$iszM:1,
$aszM:null,
$isqC:1},
W0:{
"^":"r:13;Q,a",
$2:function(a,b){var z,y
z=this.Q
if(!z.Q)this.a.Q+=", "
z.Q=!1
z=this.a
y=z.Q+=H.d(a)
z.Q=y+": "
z.Q+=H.d(b)}},
Sw:{
"^":"cX;Q,a,b,c",
gu:function(a){return new P.o0(this,this.b,this.c,this.a,null)},
aN:function(a,b){var z,y
z=this.c
for(y=this.a;y!==this.b;y=(y+1&this.Q.length-1)>>>0){b.$1(this.Q[y])
if(z!==this.c)H.vh(new P.UV(this))}},
gl0:function(a){return this.a===this.b},
gv:function(a){return(this.b-this.a&this.Q.length-1)>>>0},
V1:function(a){var z,y,x,w
z=this.a
y=this.b
if(z!==y){for(x=this.Q,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.b=0
this.a=0;++this.c}},
X:function(a){return P.WE(this,"{","}")},
Ux:function(){var z,y,x
z=this.a
if(z===this.b)throw H.b(H.Wp());++this.c
y=this.Q
x=y[z]
y[z]=null
this.a=(z+1&y.length-1)>>>0
return x},
Ai:function(a){var z,y
z=this.Q
y=this.b
z[y]=a
z=(y+1&z.length-1)>>>0
this.b=z
if(this.a===z)this.wL();++this.c},
wL:function(){var z,y,x,w
z=Array(this.Q.length*2)
z.fixed$length=Array
y=H.J(z,[H.Kp(this,0)])
z=this.Q
x=this.a
w=z.length-x
C.M.YW(y,0,w,z,x)
C.M.YW(y,w,w+this.a,this.Q,0)
this.a=0
this.b=this.Q.length
this.Q=y},
Eo:function(a,b){var z=Array(8)
z.fixed$length=Array
this.Q=H.J(z,[b])},
$isqC:1,
static:{NZ:function(a,b){var z=H.J(new P.Sw(null,0,0,0),[b])
z.Eo(a,b)
return z}}},
o0:{
"^":"a;Q,a,b,c,d",
gk:function(){return this.d},
D:function(){var z,y
z=this.Q
if(this.b!==z.c)H.vh(new P.UV(z))
y=this.c
if(y===this.a){this.d=null
return!1}z=z.Q
this.d=z[y]
this.c=(y+1&z.length-1)>>>0
return!0}},
lf:{
"^":"a;",
ez:function(a,b){return H.J(new H.xy(this,b),[H.Kp(this,0),null])},
X:function(a){return P.WE(this,"{","}")},
aN:function(a,b){var z
for(z=this.gu(this);z.D();)b.$1(z.c)},
$isqC:1},
Vj:{
"^":"lf;"}}],["","",,P,{
"^":"",
FM:function(a){return new P.HG(a)},
ad:[function(a,b){return a==null?b==null:a===b},"$2","n0",4,0,26],
xv:[function(a){return H.CU(a)},"$1","J2",2,0,27],
z:function(a,b,c){var z,y
z=H.J([],[c])
for(y=J.Nx(a);y.D();)z.push(y.gk())
if(b)return z
z.fixed$length=Array
return z},
JS:function(a){var z=H.d(a)
H.qw(z)},
CL:{
"^":"r:14;Q,a",
$2:function(a,b){var z,y,x
z=this.a
y=this.Q
z.Q+=y.Q
x=z.Q+=H.d(a.Q)
z.Q=x+": "
z.Q+=H.d(P.hl(b))
y.Q=", "}},
a2:{
"^":"a;"},
"+bool":0,
iP:{
"^":"a;Q,a",
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.iP))return!1
return this.Q===b.Q&&this.a===b.a},
giO:function(a){return this.Q},
X:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=P.Gq(z?H.o2(this).getUTCFullYear()+0:H.o2(this).getFullYear()+0)
x=P.h0(z?H.o2(this).getUTCMonth()+1:H.o2(this).getMonth()+1)
w=P.h0(z?H.o2(this).getUTCDate()+0:H.o2(this).getDate()+0)
v=P.h0(z?H.o2(this).getUTCHours()+0:H.o2(this).getHours()+0)
u=P.h0(z?H.o2(this).getUTCMinutes()+0:H.o2(this).getMinutes()+0)
t=P.h0(z?H.o2(this).getUTCSeconds()+0:H.o2(this).getSeconds()+0)
s=P.Vx(z?H.o2(this).getUTCMilliseconds()+0:H.o2(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
RM:function(a,b){if(Math.abs(a)>864e13)throw H.b(P.p(a))},
static:{Wu:function(a,b){var z=new P.iP(a,b)
z.RM(a,b)
return z},Gq:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.d(z)
if(z>=10)return y+"00"+H.d(z)
return y+"000"+H.d(z)},Vx:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},h0:function(a){if(a>=10)return""+a
return"0"+a}}},
CP:{
"^":"U;"},
"+double":0,
a6:{
"^":"a;Q",
w:function(a,b){return C.jn.w(this.Q,b.gm5())},
m:function(a,b){if(b==null)return!1
if(!(b instanceof P.a6))return!1
return this.Q===b.Q},
giO:function(a){return this.Q&0x1FFFFFFF},
X:function(a){var z,y,x,w,v
z=new P.DW()
y=this.Q
if(y<0)return"-"+new P.a6(-y).X(0)
x=z.$1(C.jn.JV(C.jn.BU(y,6e7),60))
w=z.$1(C.jn.JV(C.jn.BU(y,1e6),60))
v=new P.P7().$1(C.jn.JV(y,1e6))
return""+C.jn.BU(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)}},
P7:{
"^":"r:15;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
DW:{
"^":"r:15;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
Ge:{
"^":"a;",
gI4:function(){return H.ts(this.$thrownJsError)},
static:{hl:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.Lz(a)
if(typeof a==="string")return JSON.stringify(a)
return P.os(a)},os:function(a){var z=J.t(a)
if(!!z.$isr)return z.X(a)
return H.H9(a)}}},
LK:{
"^":"Ge;",
X:function(a){return"Throw of null."}},
AT:{
"^":"Ge;Q,a,b,c",
gZ2:function(){return"Invalid argument"+(!this.Q?"(s)":"")},
guF:function(){return""},
X:function(a){var z,y,x,w,v,u
z=this.b
y=z!=null?" ("+H.d(z)+")":""
z=this.c
x=z==null?"":": "+H.d(z)
w=this.gZ2()+y+x
if(!this.Q)return w
v=this.guF()
u=P.hl(this.a)
return w+v+": "+H.d(u)},
static:{p:function(a){return new P.AT(!1,null,null,a)}}},
bJ:{
"^":"AT;d,e,Q,a,b,c",
gZ2:function(){return"RangeError"},
guF:function(){var z,y,x
z=this.d
if(z==null){z=this.e
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.e
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
static:{C3:function(a){return new P.bJ(null,null,!1,null,null,a)},D:function(a,b,c){return new P.bJ(null,null,!0,a,b,"Value not in range")},TE:function(a,b,c,d,e){return new P.bJ(b,c,!0,a,d,"Invalid value")},jB:function(a,b,c,d,e,f){if(0>a||a>c)throw H.b(P.TE(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.b(P.TE(b,a,c,"end",f))
return b}return c}}},
eY:{
"^":"AT;d,e,Q,a,b,c",
gZ2:function(){return"RangeError"},
guF:function(){P.hl(this.d)
var z=": index should be less than "+this.e
return J.UN(this.a,0)?": index must not be negative":z},
static:{Cf:function(a,b,c,d,e){var z=e!=null?e:J.wS(b)
return new P.eY(b,z,!0,a,c,"Index out of range")}}},
mp:{
"^":"Ge;Q,a,b,c,d",
X:function(a){var z,y,x,w,v,u,t,s
z={}
y=new P.Rn("")
z.Q=""
for(x=this.b,w=x.length,v=0;v<x.length;x.length===w||(0,H.lk)(x),++v){u=x[v]
y.Q+=z.Q
y.Q+=H.d(P.hl(u))
z.Q=", "}this.c.aN(0,new P.CL(z,y))
t=P.hl(this.Q)
s=H.d(y)
return"NoSuchMethodError: method not found: '"+H.d(this.a.Q)+"'\nReceiver: "+H.d(t)+"\nArguments: ["+s+"]"},
static:{lr:function(a,b,c,d,e){return new P.mp(a,b,c,d,e)}}},
ub:{
"^":"Ge;Q",
X:function(a){return"Unsupported operation: "+this.Q}},
ds:{
"^":"Ge;Q",
X:function(a){var z=this.Q
return z!=null?"UnimplementedError: "+H.d(z):"UnimplementedError"}},
lj:{
"^":"Ge;Q",
X:function(a){return"Bad state: "+this.Q}},
UV:{
"^":"Ge;Q",
X:function(a){var z=this.Q
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.hl(z))+"."}},
VS:{
"^":"a;",
X:function(a){return"Stack Overflow"},
gI4:function(){return},
$isGe:1},
t7:{
"^":"Ge;Q",
X:function(a){return"Reading static variable '"+this.Q+"' during its initialization"}},
HG:{
"^":"a;Q",
X:function(a){var z=this.Q
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
kM:{
"^":"a;Q",
X:function(a){return"Expando:"+H.d(this.Q)},
p:function(a,b){var z=H.VK(b,"expando$values")
return z==null?null:H.VK(z,this.KV())},
KV:function(){var z,y
z=H.VK(this,"expando$key")
if(z==null){y=$.Ss
$.Ss=y+1
z="expando$key$"+y
H.aw(this,"expando$key",z)}return z}},
P:{
"^":"U;"},
"+int":0,
cX:{
"^":"a;",
ez:function(a,b){return H.K1(this,b,H.ip(this,"cX",0),null)},
aN:function(a,b){var z
for(z=this.gu(this);z.D();)b.$1(z.gk())},
gv:function(a){var z,y
z=this.gu(this)
for(y=0;z.D();)++y
return y},
Zv:function(a,b){var z,y,x
if(b<0)H.vh(P.TE(b,0,null,"index",null))
for(z=this.gu(this),y=0;z.D();){x=z.gk()
if(b===y)return x;++y}throw H.b(P.Cf(b,this,"index",null,y))},
X:function(a){return P.EP(this,"(",")")}},
An:{
"^":"a;"},
zM:{
"^":"a;",
$aszM:null,
$isqC:1},
"+List":0,
c8:{
"^":"a;",
X:function(a){return"null"}},
"+Null":0,
U:{
"^":"a;"},
"+num":0,
a:{
"^":";",
m:function(a,b){return this===b},
giO:function(a){return H.eQ(this)},
X:["Ke",function(a){return H.H9(this)}],
P:function(a,b){throw H.b(P.lr(this,b.gWa(),b.gnd(),b.gVm(),null))}},
Gz:{
"^":"a;"},
I:{
"^":"a;"},
"+String":0,
Rn:{
"^":"a;IN:Q@",
X:function(a){var z=this.Q
return z.charCodeAt(0)==0?z:z},
static:{vg:function(a,b,c){var z=J.Nx(b)
if(!z.D())return a
if(c.length===0){do a+=H.d(z.gk())
while(z.D())}else{a+=H.d(z.gk())
for(;z.D();)a=a+c+H.d(z.gk())}return a}}},
wv:{
"^":"a;"}}],["","",,W,{
"^":"",
lq:function(){return window},
d9:function(a,b){var z=document.createElement("canvas",null)
J.TZ(z,b)
J.OE(z,a)
return z},
ZD:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.Vu)},
Z3:[function(a){return"wheel"},"$1","wQ",2,0,28,3],
C0:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
Up:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
qc:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.P1(a)
if(!!J.t(z).$isD0)return z
return}else return a},
VF:function(a){var z=$.X3
if(z===C.NU)return a
return z.oj(a,!0)},
qE:{
"^":"cv;",
$isqE:1,
$isD0:1,
$isa:1,
"%":"HTMLAppletElement|HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
Ps:{
"^":"qE;K:target=",
X:function(a){return String(a)},
$isGv:1,
"%":"HTMLAnchorElement"},
LL:{
"^":"pS;O3:url=",
"%":"ApplicationCacheErrorEvent"},
fY:{
"^":"qE;K:target=",
X:function(a){return String(a)},
$isGv:1,
"%":"HTMLAreaElement"},
nB:{
"^":"qE;K:target=",
"%":"HTMLBaseElement"},
Az:{
"^":"Gv;",
$isAz:1,
"%":"Blob|File"},
QP:{
"^":"qE;",
$isD0:1,
$isGv:1,
"%":"HTMLBodyElement"},
IF:{
"^":"qE;M:value=",
"%":"HTMLButtonElement"},
Ny:{
"^":"qE;fg:height},N:width}",
eW:function(a,b,c){return a.getContext(b,P.ed(c))},
gZE:function(a){return a.getContext("2d")},
Bw:function(a,b,c,d,e,f,g){var z,y
z=P.Td(["alpha",b,"depth",d,"stencil",g,"antialias",c,"premultipliedAlpha",e,"preserveDrawingBuffer",f])
y=this.eW(a,"webgl",z)
return y==null?this.eW(a,"experimental-webgl",z):y},
$isNy:1,
"%":"HTMLCanvasElement"},
Gc:{
"^":"Gv;NE:lineCap},ZW:lineJoin},Wi:lineWidth}",
dZ:function(a,b,c,d,e){return a.isPointInPath(b,c,d,e)},
Pk:function(a,b,c){return a.isPointInPath(b,c)},
uP:function(a,b,c,d){return a.isPointInStroke(b,c,d)},
R8:function(a,b,c){return a.isPointInStroke(b,c)},
"%":"CanvasRenderingContext2D"},
Zv:{
"^":"uH;",
$isGv:1,
"%":"CDATASection|Comment|Text;CharacterData"},
oJ:{
"^":"BV;",
T2:function(a,b){var z=this.RT(a,b)
return z!=null?z:""},
RT:function(a,b){if(W.ZD(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.O2()+b)},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
BV:{
"^":"Gv+id;"},
id:{
"^":"a;",
goP:function(a){return this.T2(a,"mask")}},
oe:{
"^":"pS;M:value=",
"%":"DeviceLightEvent"},
Ec:{
"^":"uH;",
$isGv:1,
"%":"DocumentFragment|ShadowRoot"},
Nh:{
"^":"Gv;",
X:function(a){return String(a)},
"%":"DOMException"},
IB:{
"^":"Gv;OR:bottom=,fg:height=,Bb:left=,T8:right=,G6:top=,N:width=",
X:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gN(a))+" x "+H.d(this.gfg(a))},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$istn)return!1
y=a.left
x=z.gBb(b)
if(y==null?x==null:y===x){y=a.top
x=z.gG6(b)
if(y==null?x==null:y===x){y=this.gN(a)
x=z.gN(b)
if(y==null?x==null:y===x){y=this.gfg(a)
z=z.gfg(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
giO:function(a){var z,y,x,w
z=J.v1(a.left)
y=J.v1(a.top)
x=J.v1(this.gN(a))
w=J.v1(this.gfg(a))
return W.Up(W.C0(W.C0(W.C0(W.C0(0,z),y),x),w))},
$istn:1,
$astn:HU,
"%":";DOMRectReadOnly"},
cv:{
"^":"uH;",
X:function(a){return a.localName},
$isGv:1,
$isD0:1,
"%":";Element"},
Fs:{
"^":"qE;fg:height},N:width}",
"%":"HTMLEmbedElement"},
hY:{
"^":"pS;kc:error=",
"%":"ErrorEvent"},
pS:{
"^":"Gv;",
gSd:function(a){return W.qc(a.currentTarget)},
gK:function(a){return W.qc(a.target)},
$ispS:1,
"%":"AnimationPlayerEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeUnloadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaKeyNeededEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|TrackEvent|TransitionEvent|WebKitAnimationEvent|WebKitTransitionEvent;ClipboardEvent|Event|InputEvent"},
D0:{
"^":"Gv;",
On:function(a,b,c,d){if(c!=null)this.v0(a,b,c,d)},
Y9:function(a,b,c,d){if(c!=null)this.Ci(a,b,c,d)},
v0:function(a,b,c,d){return a.addEventListener(b,H.tR(c,1),d)},
Ci:function(a,b,c,d){return a.removeEventListener(b,H.tR(c,1),d)},
$isD0:1,
$isa:1,
"%":"MediaStream;EventTarget"},
Yu:{
"^":"qE;K:target=",
"%":"HTMLFormElement"},
tb:{
"^":"qE;fg:height},N:width}",
"%":"HTMLIFrameElement"},
Sg:{
"^":"Gv;",
$isSg:1,
"%":"ImageData"},
pA:{
"^":"qE;v6:complete=,fg:height},N:width}",
"%":"HTMLImageElement"},
Mi:{
"^":"qE;fg:height},M:value=,N:width}",
$isGv:1,
$isD0:1,
$isuH:1,
"%":"HTMLInputElement"},
XF:{
"^":"w6;",
$isXF:1,
$isa:1,
"%":"KeyboardEvent"},
wP:{
"^":"qE;M:value=",
"%":"HTMLLIElement"},
El:{
"^":"qE;kc:error=",
"%":"HTMLAudioElement;HTMLMediaElement"},
Qb:{
"^":"qE;M:value=",
"%":"HTMLMeterElement"},
OK:{
"^":"w6;",
$isOK:1,
$isa:1,
"%":";DragEvent|MSPointerEvent|MouseEvent|PointerEvent"},
oU:{
"^":"Gv;",
$isGv:1,
"%":"Navigator"},
uH:{
"^":"D0;",
X:function(a){var z=a.nodeValue
return z==null?this.VE(a):z},
$isuH:1,
$isD0:1,
$isa:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
G7:{
"^":"qE;fg:height},N:width}",
"%":"HTMLObjectElement"},
Ql:{
"^":"qE;M:value=",
"%":"HTMLOptionElement"},
wL:{
"^":"qE;M:value=",
"%":"HTMLOutputElement"},
me:{
"^":"qE;M:value=",
"%":"HTMLParamElement"},
nC:{
"^":"Zv;K:target=",
"%":"ProcessingInstruction"},
KR:{
"^":"qE;M:value=",
"%":"HTMLProgressElement"},
kQ:{
"^":"pS;",
"%":"XMLHttpRequestProgressEvent;ProgressEvent"},
h8:{
"^":"kQ;O3:url=",
"%":"ResourceProgressEvent"},
lp:{
"^":"qE;M:value=",
"%":"HTMLSelectElement"},
zD:{
"^":"pS;kc:error=",
"%":"SpeechRecognitionError"},
ii:{
"^":"pS;O3:url=",
"%":"StorageEvent"},
FB:{
"^":"qE;M:value=",
"%":"HTMLTextAreaElement"},
a3:{
"^":"Gv;",
gK:function(a){return W.qc(a.target)},
gwl:function(a){return H.J(new P.EX(C.CD.zQ(a.clientX),C.CD.zQ(a.clientY)),[null])},
$isa:1,
"%":"Touch"},
yT:{
"^":"w6;",
$isyT:1,
$isa:1,
"%":"TouchEvent"},
ci:{
"^":"ec;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
Zv:function(a,b){return a[b]},
$iszM:1,
$aszM:function(){return[W.a3]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"TouchList"},
nN:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.a3]},
$isqC:1},
ec:{
"^":"nN+Pb;",
$iszM:1,
$aszM:function(){return[W.a3]},
$isqC:1},
w6:{
"^":"pS;",
"%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent;UIEvent"},
aG:{
"^":"El;fg:height},N:width}",
"%":"HTMLVideoElement"},
J6:{
"^":"OK;",
gNC:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.b(new P.ub("deltaY is not supported"))},
gOW:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.b(new P.ub("deltaX is not supported"))},
$isJ6:1,
$isOK:1,
$isa:1,
"%":"WheelEvent"},
K5:{
"^":"D0;",
ne:function(a,b){return a.requestAnimationFrame(H.tR(b,1))},
y4:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isK5:1,
$isGv:1,
$isD0:1,
"%":"DOMWindow|Window"},
RX:{
"^":"uH;M:value=",
"%":"Attr"},
YC:{
"^":"Gv;OR:bottom=,fg:height=,Bb:left=,T8:right=,G6:top=,N:width=",
X:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$istn)return!1
y=a.left
x=z.gBb(b)
if(y==null?x==null:y===x){y=a.top
x=z.gG6(b)
if(y==null?x==null:y===x){y=a.width
x=z.gN(b)
if(y==null?x==null:y===x){y=a.height
z=z.gfg(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
giO:function(a){var z,y,x,w
z=J.v1(a.left)
y=J.v1(a.top)
x=J.v1(a.width)
w=J.v1(a.height)
return W.Up(W.C0(W.C0(W.C0(W.C0(0,z),y),x),w))},
$istn:1,
$astn:HU,
"%":"ClientRect"},
hq:{
"^":"uH;",
$isGv:1,
"%":"DocumentType"},
w4:{
"^":"IB;",
gfg:function(a){return a.height},
gN:function(a){return a.width},
"%":"DOMRect"},
Nf:{
"^":"qE;",
$isD0:1,
$isGv:1,
"%":"HTMLFrameSetElement"},
rh:{
"^":"x5;",
gv:function(a){return a.length},
p:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.Cf(b,a,null,null,null))
return a[b]},
Zv:function(a,b){return a[b]},
$iszM:1,
$aszM:function(){return[W.uH]},
$isqC:1,
$isXj:1,
$isDD:1,
"%":"MozNamedAttrMap|NamedNodeMap"},
zL:{
"^":"Gv+lD;",
$iszM:1,
$aszM:function(){return[W.uH]},
$isqC:1},
x5:{
"^":"zL+Pb;",
$iszM:1,
$aszM:function(){return[W.uH]},
$isqC:1},
e0:{
"^":"a;Q",
zc:function(a,b){return H.J(new W.RO(a,this.Q,b),[null])},
aM:function(a){return this.zc(a,!1)},
Qm:function(a,b){return H.J(new W.Cq(a,this.Q,b),[null])},
f0:function(a){return this.Qm(a,!1)}},
RO:{
"^":"qh;Q,a,b",
X5:function(a,b,c,d){var z=new W.xC(0,this.Q,this.a,W.VF(a),this.b)
z.$builtinTypeInfo=this.$builtinTypeInfo
z.Y()
return z}},
Cq:{
"^":"RO;Q,a,b"},
xC:{
"^":"MO;Q,a,b,c,d",
Gv:function(){if(this.a==null)return
this.EO()
this.a=null
this.c=null
return},
Y:function(){var z=this.c
if(z!=null&&this.Q<=0)J.qV(this.a,this.b,z,this.d)},
EO:function(){var z=this.c
if(z!=null)J.GJ(this.a,this.b,z,this.d)}},
kG:{
"^":"a;Q",
Qm:function(a,b){return H.J(new W.Cq(a,this.At(a),b),[null])},
f0:function(a){return this.Qm(a,!1)},
At:function(a){return this.Q.$1(a)}},
Pb:{
"^":"a;",
gu:function(a){return new W.W9(a,this.gv(a),-1,null)},
$iszM:1,
$aszM:null,
$isqC:1},
W9:{
"^":"a;Q,a,b,c",
D:function(){var z,y
z=this.b+1
y=this.a
if(z<y){this.c=J.Tf(this.Q,z)
this.b=z
return!0}this.c=null
this.b=y
return!1},
gk:function(){return this.c}},
dW:{
"^":"a;Q",
On:function(a,b,c,d){return H.vh(new P.ub("You can only attach EventListeners to your own window."))},
Y9:function(a,b,c,d){return H.vh(new P.ub("You can only attach EventListeners to your own window."))},
$isD0:1,
$isGv:1,
static:{P1:function(a){if(a===window)return a
else return new W.dW(a)}}}}],["","",,P,{
"^":"",
hF:{
"^":"Gv;",
$ishF:1,
"%":"IDBKeyRange"}}],["","",,P,{
"^":"",
Y0:{
"^":"zU;K:target=",
$isGv:1,
"%":"SVGAElement"},
ZJ:{
"^":"Eo;",
$isGv:1,
"%":"SVGAltGlyphElement"},
ui:{
"^":"d5;",
$isGv:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},
jw:{
"^":"d5;",
$isGv:1,
"%":"SVGFEBlendElement"},
lv:{
"^":"d5;",
$isGv:1,
"%":"SVGFEColorMatrixElement"},
pf:{
"^":"d5;",
$isGv:1,
"%":"SVGFEComponentTransferElement"},
py:{
"^":"d5;",
$isGv:1,
"%":"SVGFECompositeElement"},
Ef:{
"^":"d5;",
$isGv:1,
"%":"SVGFEConvolveMatrixElement"},
ee:{
"^":"d5;",
$isGv:1,
"%":"SVGFEDiffuseLightingElement"},
wf:{
"^":"d5;",
$isGv:1,
"%":"SVGFEDisplacementMapElement"},
ih:{
"^":"d5;",
$isGv:1,
"%":"SVGFEFloodElement"},
tk:{
"^":"d5;",
$isGv:1,
"%":"SVGFEGaussianBlurElement"},
US:{
"^":"d5;",
$isGv:1,
"%":"SVGFEImageElement"},
oB:{
"^":"d5;",
$isGv:1,
"%":"SVGFEMergeElement"},
yu:{
"^":"d5;",
$isGv:1,
"%":"SVGFEMorphologyElement"},
MI:{
"^":"d5;",
$isGv:1,
"%":"SVGFEOffsetElement"},
kK:{
"^":"d5;",
$isGv:1,
"%":"SVGFESpecularLightingElement"},
Qy:{
"^":"d5;",
$isGv:1,
"%":"SVGFETileElement"},
ju:{
"^":"d5;",
$isGv:1,
"%":"SVGFETurbulenceElement"},
QN:{
"^":"d5;",
$isGv:1,
"%":"SVGFilterElement"},
zU:{
"^":"d5;",
$isGv:1,
"%":"SVGCircleElement|SVGClipPathElement|SVGDefsElement|SVGEllipseElement|SVGForeignObjectElement|SVGGElement|SVGGeometryElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSwitchElement;SVGGraphicsElement"},
rE:{
"^":"zU;",
$isGv:1,
"%":"SVGImageElement"},
zm:{
"^":"d5;",
$isGv:1,
"%":"SVGMarkerElement"},
NB:{
"^":"d5;",
$isGv:1,
"%":"SVGMaskElement"},
Ac:{
"^":"d5;",
$isGv:1,
"%":"SVGPatternElement"},
qI:{
"^":"d5;",
$isGv:1,
"%":"SVGScriptElement"},
d5:{
"^":"cv;",
$isD0:1,
$isGv:1,
"%":"SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGGlyphElement|SVGHKernElement|SVGMetadataElement|SVGMissingGlyphElement|SVGStopElement|SVGStyleElement|SVGTitleElement|SVGVKernElement;SVGElement"},
hy:{
"^":"zU;",
$isGv:1,
"%":"SVGSVGElement"},
aS:{
"^":"d5;",
$isGv:1,
"%":"SVGSymbolElement"},
qF:{
"^":"zU;",
"%":";SVGTextContentElement"},
xN:{
"^":"qF;",
$isGv:1,
"%":"SVGTextPathElement"},
Eo:{
"^":"qF;",
"%":"SVGTSpanElement|SVGTextElement;SVGTextPositioningElement"},
Cl:{
"^":"zU;",
$isGv:1,
"%":"SVGUseElement"},
GR:{
"^":"d5;",
$isGv:1,
"%":"SVGViewElement"},
wD:{
"^":"d5;",
$isGv:1,
"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},
We:{
"^":"d5;",
$isGv:1,
"%":"SVGCursorElement"},
cB:{
"^":"d5;",
$isGv:1,
"%":"SVGFEDropShadowElement"},
Pi:{
"^":"d5;",
$isGv:1,
"%":"SVGGlyphRefElement"},
zu:{
"^":"d5;",
$isGv:1,
"%":"SVGMPathElement"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
Sl:{
"^":"pS;",
$isSl:1,
$isa:1,
"%":"WebGLContextEvent"},
Jo:{
"^":"Gv;",
$isJo:1,
"%":"WebGLRenderingContext"},
SI:{
"^":"Gv;",
$isa:1,
"%":"WebGLUniformLocation"}}],["","",,P,{
"^":""}],["","",,P,{
"^":"",
IU:{
"^":"a;"}}],["","",,P,{
"^":"",
R4:[function(a,b,c,d){var z,y
if(b){z=[c]
C.M.Ay(z,d)
d=z}y=P.z(J.kl(d,P.Xl()),!0,null)
return P.wY(H.bv(a,y))},null,null,8,0,null,24,25,26,27],
Dm:function(a,b,c){var z
if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b))try{Object.defineProperty(a,b,{value:c})
return!0}catch(z){H.Ru(z)}return!1},
Om:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
wY:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.t(a)
if(!!z.$isE4)return a.Q
if(!!z.$isAz||!!z.$ispS||!!z.$ishF||!!z.$isSg||!!z.$isuH||!!z.$isAS||!!z.$isK5)return a
if(!!z.$isiP)return H.o2(a)
if(!!z.$isPe)return P.hE(a,"$dart_jsFunction",new P.DV())
return P.hE(a,"_$dart_jsObject",new P.Hp($.hs()))},"$1","En",2,0,2,28],
hE:function(a,b,c){var z=P.Om(a,b)
if(z==null){z=c.$1(a)
P.Dm(a,b,z)}return z},
dU:[function(a){var z
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else{if(a instanceof Object){z=J.t(a)
z=!!z.$isAz||!!z.$ispS||!!z.$ishF||!!z.$isSg||!!z.$isuH||!!z.$isAS||!!z.$isK5}else z=!1
if(z)return a
else if(a instanceof Date)return P.Wu(a.getTime(),!1)
else if(a.constructor===$.hs())return a.o
else return P.ND(a)}},"$1","Xl",2,0,29,28],
ND:function(a){if(typeof a=="function")return P.iQ(a,$.Dp(),new P.Nz())
if(a instanceof Array)return P.iQ(a,$.Iq(),new P.Jd())
return P.iQ(a,$.Iq(),new P.QS())},
iQ:function(a,b,c){var z=P.Om(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.Dm(a,b,z)}return z},
E4:{
"^":"a;Q",
p:["Aq",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.b(P.p("property is not a String or num"))
return P.dU(this.Q[b])}],
giO:function(a){return 0},
m:function(a,b){if(b==null)return!1
return b instanceof P.E4&&this.Q===b.Q},
X:function(a){var z,y
try{z=String(this.Q)
return z}catch(y){H.Ru(y)
return this.Ke(this)}},
V7:function(a,b){var z,y
z=this.Q
y=b==null?null:P.z(H.J(new H.A8(b,P.En()),[null,null]),!0,null)
return P.dU(z[a].apply(z,y))},
nQ:function(a){return this.V7(a,null)},
static:{kW:function(a){if(typeof a==="number"||typeof a==="string"||typeof a==="boolean"||a==null)throw H.b(P.p("object cannot be a num, string, bool, or null"))
return P.ND(P.wY(a))}}},
r7:{
"^":"E4;Q",
qP:function(a,b){var z,y
z=P.wY(b)
y=P.z(a.ez(0,P.En()),!0,null)
return P.dU(this.Q.apply(z,y))},
PO:function(a){return this.qP(a,null)}},
Tz:{
"^":"Wk;Q",
p:function(a,b){var z
if(typeof b==="number"&&b===C.jn.yu(b)){z=b<0||b>=this.gv(this)
if(z)H.vh(P.TE(b,0,this.gv(this),null,null))}return this.Aq(this,b)},
gv:function(a){var z=this.Q.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.b(new P.lj("Bad JsArray length"))}},
Wk:{
"^":"E4+lD;",
$iszM:1,
$aszM:null,
$isqC:1},
DV:{
"^":"r:2;",
$1:function(a){var z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.R4,a,!1)
P.Dm(z,$.Dp(),a)
return z}},
Hp:{
"^":"r:2;Q",
$1:function(a){return new this.Q(a)}},
Nz:{
"^":"r:2;",
$1:function(a){return new P.r7(a)}},
Jd:{
"^":"r:2;",
$1:function(a){return H.J(new P.Tz(a),[null])}},
QS:{
"^":"r:2;",
$1:function(a){return new P.E4(a)}}}],["","",,P,{
"^":"",
VC:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
xk:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)},
C:function(a,b){if(typeof a!=="number")throw H.b(P.p(a))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0&&C.CD.gzP(b)||isNaN(b))return b
return a}return a},
u:function(a,b){if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.CD.gzP(a))return b
return a},
hR:{
"^":"a;",
j1:function(a){if(a<=0||a>4294967296)throw H.b(P.C3("max must be in range 0 < max \u2264 2^32, was "+H.d(a)))
return Math.random()*a>>>0}},
EX:{
"^":"a;x:Q>,y:a>",
X:function(a){return"Point("+H.d(this.Q)+", "+H.d(this.a)+")"},
m:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$isEX)return!1
y=this.Q
x=z.gx(b)
if(y==null?x==null:y===x){y=this.a
z=z.gy(b)
z=y==null?z==null:y===z}else z=!1
return z},
giO:function(a){var z,y
z=J.v1(this.Q)
y=J.v1(this.a)
return P.xk(P.VC(P.VC(0,z),y))}}}],["","",,H,{
"^":"",
T0:function(a){return a},
Hj:function(a,b,c){},
WZ:{
"^":"Gv;",
$isWZ:1,
"%":"ArrayBuffer"},
ET:{
"^":"Gv;",
aq:function(a,b,c){if(b<0||b>=c){if(!!this.$iszM)if(c===a.length)throw H.b(P.Cf(b,a,null,null,null))
throw H.b(P.TE(b,0,c-1,null,null))}else throw H.b(P.p("Invalid list index "+b))},
$isET:1,
$isAS:1,
"%":";ArrayBufferView;LZ|Ob|GV|Dg|pb|Ip|Pg"},
T1:{
"^":"ET;",
$isAS:1,
"%":"DataView"},
LZ:{
"^":"ET;",
gv:function(a){return a.length},
$isXj:1,
$isDD:1},
Dg:{
"^":"GV;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]}},
Ob:{
"^":"LZ+lD;",
$iszM:1,
$aszM:function(){return[P.CP]},
$isqC:1},
GV:{
"^":"Ob+SU;"},
Pg:{
"^":"Ip;",
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1},
pb:{
"^":"LZ+lD;",
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1},
Ip:{
"^":"pb+SU;"},
Hg:{
"^":"Dg;",
$isAS:1,
$iszM:1,
$aszM:function(){return[P.CP]},
$isqC:1,
"%":"Float32Array"},
K8:{
"^":"Dg;",
$isAS:1,
$iszM:1,
$aszM:function(){return[P.CP]},
$isqC:1,
"%":"Float64Array"},
xj:{
"^":"Pg;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":"Int16Array"},
dE:{
"^":"Pg;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":"Int32Array"},
ZA:{
"^":"Pg;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":"Int8Array"},
dT:{
"^":"Pg;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":"Uint16Array"},
nl:{
"^":"Pg;",
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":"Uint32Array"},
eE:{
"^":"Pg;",
gv:function(a){return a.length},
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":"CanvasPixelArray|Uint8ClampedArray"},
cD:{
"^":"Pg;",
gv:function(a){return a.length},
p:function(a,b){var z=a.length
if(b>>>0!==b||b>=z)this.aq(a,b,z)
return a[b]},
$isAS:1,
$iszM:1,
$aszM:function(){return[P.P]},
$isqC:1,
"%":";Uint8Array"}}],["","",,H,{
"^":"",
qw:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,P,{
"^":"",
ed:function(a){var z={}
a.aN(0,new P.d8(z))
return z},
dg:function(){var z=$.L4
if(z==null){z=J.NT(window.navigator.userAgent,"Opera",0)
$.L4=z}return z},
O2:function(){var z,y
z=$.aj
if(z!=null)return z
y=$.w5
if(y==null){y=J.NT(window.navigator.userAgent,"Firefox",0)
$.w5=y}if(y)z="-moz-"
else{y=$.eG
if(y==null){y=!P.dg()&&J.NT(window.navigator.userAgent,"Trident/",0)
$.eG=y}if(y)z="-ms-"
else z=P.dg()?"-o-":"-webkit-"}$.aj=z
return z},
p8:function(a){var z,y,x
try{y=document.createEvent(a)
y.initEvent("",!0,!0)
z=y
return!!J.t(z).$ispS}catch(x){H.Ru(x)}return!1},
d8:{
"^":"r:3;Q",
$2:function(a,b){this.Q[a]=b}}}],["","",,O,{
"^":"",
E2:[function(){var z,y,x,w
z=document.querySelector("#stage")
$.N=z
$.X=A.T(z,null,null,null)
z=new K.S(null,null,0,P.bK(null,null,!1,P.U))
y=new K.Gn(null,null)
z.Q=y
z.a=y
y=H.J([],[A.L])
z=new A.Q(z,y,!1,0,new R.O(0,"enterFrame",!1,C.wq,null,null,!1,!1),new R.Z("exitFrame",!1,C.wq,null,null,!1,!1),new R.W("render",!1,C.wq,null,null,!1,!1),!1)
z.wE(0)
$.EG=z
x=$.X
w=x.y2
if(w!=null){C.M.Rz(w.b,x)
x.y2=null}y.push(x)
x.y2=z
$.fg=$.EG.a
$.Dz=new O.fm(P.V(null,null,null,P.I,O.Y),P.bK(null,null,!1,P.U))
z=new O.R(P.Py(null,null,null,P.P,P.P))
P.JS("KEYBOARD")
y=C.rl.aM(window)
H.J(new W.xC(0,y.Q,y.a,W.VF(z.gHQ(z)),y.b),[H.Kp(y,0)]).Y()
y=C.Z4.aM(window)
H.J(new W.xC(0,y.Q,y.a,W.VF(z.gS0(z)),y.b),[H.Kp(y,0)]).Y()
$.OM=z
$.Dz.xW(0).ml(new O.em())},"$0","Zi",0,0,1],
em:{
"^":"r:2;",
$1:[function(a){var z,y,x,w
z=H.J([],[A.fE])
y=$.LS
$.LS=y+1
y=new O.fq(0,null,null,null,null,null,null,0,null,null,null,z,!0,!0,!1,!0,"auto",!0,0,y,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,[],null,"",null,T.oy(),!0,null,null)
P.JS("GAME")
y.sN(0,400)
y.sfg(0,400)
y.ej=C.jn.zQ(40)
y.lZ=C.jn.zQ(40)
y.kI()
$.Vt=y
z=$.X
z.ww(y,z.rx.length)
z=$.fg
y=$.Vt
z.toString
if(!J.t(y).$isDM)H.vh(P.p("The supplied animatable does not extend type Animatable."))
if(!z.tg(0,y)){x=new K.Gn(null,null)
w=z.a
w.Q=y
w.a=x
z.a=x}},null,null,2,0,null,29,"call"]},
fq:{
"^":"AE;TB,ej,lZ,Ab,zR,Ky,bR,pV,x2,y1,y2,rx,ry,x1,k2,k3,k4,r1,r2,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,Q",
kI:function(){P.JS("INIT")
this.Ky=O.QW()
this.bR=this.lt()},
lt:function(){P.JS("RANDOM POINT")
return H.J(new U.hL(C.pr.j1(this.ej),C.pr.j1(this.lZ)),[null])},
TR:function(a,b){var z,y,x,w,v,u,t,s
z=a.Q*10
y=a.a*10
x=this.gIk()
x.Q.push(new U.jC())
x.b=!0
x=this.gIk()
w=x.Q
w.push(new U.kR(z,y))
x.b=!0
v=z+10
u=v-0
w.push(new U.cb(u,y))
x.b=!0
w.push(U.a4(v,y,v,y))
x.b=!0
t=y+10
s=t-0
w.push(new U.cb(v,s))
x.b=!0
w.push(U.a4(v,t,u,t))
x.b=!0
w.push(new U.cb(z,t))
x.b=!0
w.push(U.a4(z,t,z,s))
x.b=!0
w.push(new U.cb(z,y))
x.b=!0
w.push(U.a4(z,y,z,y))
x.b=!0
x=this.gIk()
x.Q.push(new U.Q0())
x.b=!0
x=this.gIk()
x.toString
w=V.xH(b)
x.Q.push(new U.Vm(w))
x.b=!0
x=this.gIk()
x.toString
w=V.xH(4294967295)
x.Q.push(new U.lY(w,1,"round","round"))
x.b=!0
x=this.gcl().b
w=this.gcl().c
v=this.fr
v=v!=null?v:new A.aI(this,1,!0,H.J(new U.Vb(0,0,256,256),[P.P]),null,null)
this.fr=v
v.b=!1
v.a=1
v.c=H.J(new U.Vb(0,0,x,w),[P.P])
this.fr.Li()},
$isDM:1},
R:{
"^":"a;Q",
Ql:[function(a,b){var z
P.JS("KEYCODE:"+J.Lz(b.keyCode))
z=this.Q
if(!z.NZ(b.keyCode))z.q(0,b.keyCode,b.timeStamp)},"$1","gHQ",2,0,16,3],
t4:[function(a,b){this.Q.Rz(0,b.keyCode)},"$1","gS0",2,0,16,3]},
zG:{
"^":"a;Q,a",
hp:function(){var z,y,x,w
for(z=this.Q,y=z.length,x=0;x<z.length;z.length===y||(0,H.lk)(z),++x){w=z[x]
$.Vt.TR(w,4278222848)}},
RB:function(){var z,y,x
for(z=this.Q,z.toString,z=H.j5(z,1,null,H.Kp(z,0)),z=new H.a7(z,z.gv(z),0,null);z.D();){y=z.c
x=this.Q
if(J.mG(y,(x&&C.M).gFV(x)))return!0}return!1},
WK:function(){var z,y,x
this.Q=H.J([],[U.hL])
for(z=5;z>=0;--z){y=this.Q
x=new U.hL(z,0)
x.$builtinTypeInfo=[null]
y.push(x)}},
static:{QW:function(){var z=new O.zG(null,$.Ao())
z.WK()
return z}}}},1],["","",,K,{
"^":"",
DM:{
"^":"a;"},
Gn:{
"^":"a;Q,a"},
S:{
"^":"a;Q,a,b,c",
tg:function(a,b){var z,y
z=this.Q
for(y=this.a;z==null?y!=null:z!==y;){if(z.Q===b)return!0
z=z.a}return!1},
Gz:function(a){var z,y,x,w,v,u,t,s
z=this.b+=a
y=this.c
if(!y.gd9())H.vh(y.Pq())
y.MW(z)
x=this.Q
w=this.a
for(;x==null?w!=null:x!==w;){v=x.Q
if(v==null){u=x.a
x.Q=u.Q
x.a=u.a
if(u==null?w==null:u===w)w=x
z=this.a
if(u==null?z==null:u===z)this.a=x}else{z=v.pV+=a
if(z-v.TB>=0.1){v.TB=z
z=v.x2
if(z!=null);else{z=[]
z.$builtinTypeInfo=[U.pT]
y=new U.Vb(0,0,0,0)
y.$builtinTypeInfo=[P.U]
z=new U.D3(z,y,!0)
v.x2=z}C.M.sv(z.Q,0)
z.b=!0
v.TR(v.bR,4278190335)
z=v.Ky
z.toString
if($.OM.Q.NZ(37)&&!J.mG(z.a,$.Ao())){H.qw("LEFT")
z.a=$.zR()}else if($.OM.Q.NZ(39)&&!J.mG(z.a,$.zR())){H.qw("RIGHT")
z.a=$.Ao()}else if($.OM.Q.NZ(38)&&!J.mG(z.a,$.Gh())){H.qw("UP")
z.a=$.SZ()}else if($.OM.Q.NZ(40)&&!J.mG(z.a,$.SZ())){H.qw("DOWN")
z.a=$.Gh()}y=z.Q
t=(y&&C.M).gFV(y)
s=z.a
s=new U.hL(t.Q+s.Q,t.a+s.a)
s.$builtinTypeInfo=[H.Kp(t,0)]
C.M.aP(y,0,s)
z.Q.pop()
z.hp()
z=v.Ky.Q
if((z&&C.M).gFV(z).m(0,v.bR)){z=v.Ky
y=z.Q
t=(y&&C.M).gFV(y)
z=z.a
z=new U.hL(t.Q+z.Q,t.a+z.a)
z.$builtinTypeInfo=[H.Kp(t,0)]
C.M.aP(y,0,z)
H.qw("RANDOM POINT")
z=new U.hL(C.pr.j1(v.ej),C.pr.j1(v.lZ))
z.$builtinTypeInfo=[null]
v.bR=z}z=v.Ky.Q
if(!((z&&C.M).gFV(z).Q<=-1)){z=v.Ky.Q
if(!((z&&C.M).gFV(z).Q>=v.ej)){z=v.Ky.Q
if(!((z&&C.M).gFV(z).a<=-1)){z=v.Ky.Q
z=(z&&C.M).gFV(z).a>=v.lZ||v.Ky.RB()}else z=!0}else z=!0}else z=!0
if(z){H.qw("INIT")
v.Ky=O.QW()
H.qw("RANDOM POINT")
z=new U.hL(C.pr.j1(v.ej),C.pr.j1(v.lZ))
z.$builtinTypeInfo=[null]
v.bR=z}}x=x.a}}return!0},
$isDM:1}}],["","",,A,{
"^":"",
fE:{
"^":"pp;",
sHs:function(a){this.f=a
this.id=!0},
sNe:function(a){this.r=a
this.id=!0},
gwx:function(){return this.cx},
gGb:function(){return this.cy},
goP:function(a){return this.db},
gYK:function(){var z,y
for(z=this;y=z.fy,y!=null;z=y);return z},
gDA:function(){var z=this.gYK()
return z instanceof A.L?z:null},
sN:function(a,b){var z
this.sHs(1)
z=this.gcl().b
this.sHs(z!==0?b/z:1)},
sfg:function(a,b){var z
this.sNe(1)
z=this.gcl().c
this.sNe(z!==0?b/z:1)},
gwr:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(this.id){this.id=!1
z=this.x
y=this.z
x=z+y
w=this.y+y
v=this.f
u=this.r
t=this.d
s=this.e
if(v>-0.0001&&v<0.0001)v=v>=0?0.0001:-0.0001
if(u>-0.0001&&u<0.0001)u=u>=0?0.0001:-0.0001
if(x===0&&w===0)this.go.Vy(v,0,0,u,this.b-t*v,this.c-s*u)
else{r=Math.cos(H.E0(x))
q=Math.sin(H.E0(x))
p=u*r
z=-u
if(x===w){o=v*r
n=v*q
m=z*q}else{o=v*Math.cos(H.E0(w))
n=v*Math.sin(H.E0(w))
m=z*q}this.go.Vy(o,n,m,p,this.b-(t*o+s*m),this.c-(t*n+s*p))}}return this.go},
gKQ:function(){return H.J(new U.Vb(0,0,0,0),[P.U])},
gcl:function(){var z=this.gKQ()
return this.gwr().Qb(z,z)},
Fo:function(a,b){return this.gKQ().eM(0,a,b)?this:null},
TK:function(a,b){b.Q=a.Q
b.a=a.a
this.V8(b)
return b},
V8:function(a){var z,y,x,w,v,u,t,s,r
z=this.fy
if(z!=null)z.V8(a)
y=a.Q
x=a.a
z=this.gwr().Q
w=z[3]
v=y-z[4]
u=z[2]
t=x-z[5]
s=z[0]
z=z[1]
r=s*w-z*u
a.Q=(w*v-u*t)/r
a.a=(s*t-z*v)/r},
H2:function(a,b){var z,y,x,w
z=H.J([],[R.pp])
for(y=this.fy;y!=null;y=y.fy)z.push(y)
x=z.length-1
while(!0){if(!(x>=0&&b.gB7()))break
z[x].J0(b,this,C.b7)
if(b.e)return;--x}this.J0(b,this,C.wq)
if(b.e)return
w=b.a
x=0
while(!0){if(!(x<z.length&&w))break
z[x].J0(b,this,C.V6)
if(b.e)return;++x}},
dd:function(a){}},
aI:{
"^":"a;Q,a,b,c,d,e",
Li:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=C.ON.yu(Math.floor(this.a*this.c.Q))
y=C.ON.yu(Math.floor(this.a*this.c.a))
x=this.a
w=this.c
v=C.ON.yu(Math.ceil(x*(w.Q+w.b)))
w=this.a
x=this.c
u=v-z
t=C.ON.yu(Math.ceil(w*(x.a+x.c)))-y
s=this.a
r=H.J(new U.Vb(0,0,u,t),[P.P])
q=H.J(new U.Vb(0-z,0-y,u,t),[P.P])
x=this.d
if(x==null){x=L.fL(u,t,16777215)
this.d=x
this.e=L.NA(x,r,q,0,s)}else{x.lO(0,u,t)
this.e=L.NA(this.d,r,q,0,s)}x=this.d
p=x.gqN(x)
o=this.e.gmH()
x=T.oy()
p.toString
n=new L.p5(p,p.getContext("2d"),x,C.dH,1,P.bK(null,null,!1,L.dZ),P.bK(null,null,!1,L.dZ))
n.CH(0)
m=L.mN(n,o,null,null)
n.Sl(0,16777215)
this.Q.dd(m)
if(this.b){l=p.getContext("2d")
l.setTransform(1,0,0,1,0,0)
l.lineWidth=1
l.lineJoin="miter"
l.lineCap="butt"
l.strokeStyle="#FF00FF"
l.strokeRect(0.5,0.5,p.width-1,p.height-1)}this.d.Li()}},
IT:{
"^":"HV;",
ww:function(a,b){var z,y,x,w,v
if(b>this.rx.length)throw H.b(P.p("The supplied index is out of bounds."))
if(a===this)throw H.b(P.p("An object cannot be added as a child of itself."))
z=a.fy
if(z===this){z=this.rx
C.M.Rz(z,a)
C.M.aP(z,b>z.length?b-1:b,a)}else{if(z!=null){y=z.rx
x=C.M.OY(y,a)
if(x===-1)H.vh(P.p("The supplied DisplayObject must be a child of the caller."))
if(x<0||x>=y.length)H.vh(P.p("The supplied index is out of bounds."))
w=y[x]
w.H2(0,new R.ea("removed",!0,C.wq,null,null,!1,!1))
if(z.gDA()!=null)z.ul(w,"removedFromStage")
w.fy=null
C.M.W4(y,x)}for(v=this;v!=null;v=v.fy)if(v==null?a==null:v===a)throw H.b(P.p("An object cannot be added as a child to one of it's children (or children's children, etc.)."))
C.M.aP(this.rx,b,a)
a.fy=this
a.H2(0,new R.ea("added",!0,C.wq,null,null,!1,!1))
if(this.gDA()!=null)this.ul(a,"addedToStage")}},
gKQ:function(){var z,y,x,w,v,u,t,s,r,q,p
z=this.rx
if(z.length===0)return A.fE.prototype.gKQ.call(this)
for(y=1/0,x=1/0,w=-1/0,v=-1/0,u=0;u<z.length;++u){t=z[u].gcl()
s=t.Q
if(s<y)y=s
r=t.a
if(r<x)x=r
q=s+t.b
if(q>w)w=q
p=r+t.c
if(p>v)v=p}return H.J(new U.Vb(y,x,w-y,v-x),[P.U])},
Fo:["TJ",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
for(z=this.rx,y=z.length-1,x=null;y>=0;--y){w=z[y]
v=J.Wj(w)
u=w.gwr()
if(w.gwx()&&!w.gGb()){t=u.Q
s=a-t[4]
r=b-t[5]
q=t[3]
p=t[2]
o=t[0]
t=t[1]
n=o*q-t*p
m=(q*s-p*r)/n
l=(o*r-t*s)/n
if(v!=null){k=v.gLK()?a:m
v.i1(k,v.gLK()?b:l)}j=w.Fo(m,l)
if(j==null)continue
if(!!j.$isHV&&j.k3)return this.ry?j:this
x=this}}return x}],
dd:["u1",function(a){var z,y,x
for(z=this.rx,y=0;y<z.length;++y){x=z[y]
if(x.cx&&!x.cy)a.zs(x)}}],
ul:function(a,b){var z,y
z=!1
y=this
while(!0){if(!(y!=null&&!z))break
if(y.jQ(b,!0))z=!0
y=y.fy}this.CI(a,new R.ea(b,!1,C.wq,null,null,!1,!1),z)},
CI:function(a,b,c){var z,y,x
z=!c
if(!z||a.mZ(b.Q))a.H2(0,b)
if(a instanceof A.IT){c=!z||a.jQ(b.Q,!0)
y=a.rx
for(x=0;x<y.length;++x)this.CI(y[x],b,c)}}},
HV:{
"^":"fE;"},
Q:{
"^":"je;a,b,c,d,e,f,r,Q",
Gz:function(a){var z,y,x,w,v,u,t,s
this.d+=a
z=this.e
z.r=a
R.lo(z,$.Kb())
this.a.Gz(a)
for(z=this.b,y=0;y<z.length;++y)z[y].LD.Gz(a)
if(this.c){this.c=!1
R.lo(this.r,$.tz())}for(y=0;y<z.length;++y){x=z[y]
w=this.d
v=x.C7
if(v===C.EJ||v===C.lU){x.Vp()
x.y1.CH(0)
x.y1.Sl(0,x.RZ)
v=x.of
u=x.pV
t=v.c
v.d=t
v=t.Q
s=v.Q
s[0]=1
s[1]=0
s[2]=0
s[3]=1
s[4]=0
s[5]=0
t.b=1
t.c=C.dH
v.M1(u)
x.of.Q=V.DN(w)
x.of.a=V.DN(a)
x.of.zs(x)
x.of.b.fZ(0)
if(x.C7===C.lU)x.C7=C.OA}}R.lo(this.f,$.Ra())}},
AE:{
"^":"IT;",
gIk:function(){var z=this.x2
if(z!=null);else{z=new U.D3(H.J([],[U.pT]),H.J(new U.Vb(0,0,0,0),[P.U]),!0)
this.x2=z}return z},
gKQ:function(){var z,y,x,w
z=A.IT.prototype.gKQ.call(this)
y=this.x2
if(y==null)y=z
else{y=y.gKQ()
x=P.C(z.Q,y.Q)
w=P.C(z.a,y.a)
y=H.J(new U.Vb(x,w,P.u(z.Q+z.b,y.Q+y.b)-x,P.u(z.a+z.c,y.a+y.c)-w),[H.Kp(z,0)])}return y},
Fo:function(a,b){var z,y
z=this.x2
y=this.TJ(a,b)
if(y==null&&z!=null)y=z.i1(a,b)?this:null
return y},
dd:function(a){var z=this.x2
if(z!=null){z.toString
if(a.b instanceof L.I6);else z.Qp(a)}this.u1(a)}},
dG:{
"^":"a;Q",
X:function(a){return C.qQ.p(0,this.Q)}},
jK:{
"^":"a;Q",
X:function(a){return C.aP.p(0,this.Q)}},
uq:{
"^":"a;Q",
X:function(a){return C.Is.p(0,this.Q)}},
L:{
"^":"IT;x2,y1,y2,TB,ej,lZ,Ab,zR,Ky,bR,pV,of,DN,C7,Z,Uu,j3,iU,lq,pn,NH,e1,LD,kX,RZ,ij,TQ,ca,Jc,rx,ry,x1,k2,k3,k4,r1,r2,a,b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,Q",
gAT:function(){return this.y1.gAT()},
PS:function(){throw H.b(new P.ub("The Stage class does not implement this property or method."))},
sHs:function(a){this.PS()},
sNe:function(a){this.PS()},
Fo:function(a,b){var z=this.TJ(a,b)
return z!=null?z:this},
vW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
if(b.gAT()===C.XB)try{z=a
y=b.gaX()
x=b.gxc()
w=new L.nP(null,null,0,-1,null,null,P.V(null,null,null,P.I,P.P),P.V(null,null,null,P.I,P.SI))
v=P.V(null,null,null,P.I,P.P)
u=P.V(null,null,null,P.I,P.SI)
t=P.V(null,null,null,P.I,P.P)
s=P.V(null,null,null,P.I,P.SI)
r=L.yC(2048)
q=new Int16Array(H.T0(6144))
p=new Float32Array(H.T0(32768))
o=H.J([],[L.F7])
n=P.V(null,null,null,P.P,L.Gp)
m=P.V(null,null,null,P.I,L.e7)
l=new T.Xo(new Float32Array(H.T0(16)))
l.xI()
l=new L.I6(z,w,new L.HL(null,0,-1,null,null,v,u),new L.UG(null,null,0,0,-1,null,null,t,s),r,new L.Io(q,35048,-1,null,null),new L.ys(p,35048,-1,null,null),o,n,m,null,l,null,null,null,null,null,!0,0,0,0,0,P.bK(null,null,!1,L.dZ),P.bK(null,null,!1,L.dZ))
m=C.Pk.f0(z)
H.J(new W.xC(0,m.Q,m.a,W.VF(l.gpX()),m.b),[H.Kp(m,0)]).Y()
m=C.fx.f0(z)
H.J(new W.xC(0,m.Q,m.a,W.VF(l.gyD()),m.b),[H.Kp(m,0)]).Y()
k=(z&&C.p1).Bw(z,y,x,!1,!0,!1,!0)
if(!J.t(k).$isJo)H.vh(new P.lj("Failed to get WebGL context."))
l.cx=k
k.enable(3042)
l.cx.disable(2960)
l.cx.disable(2929)
l.cx.disable(2884)
l.cx.pixelStorei(37441,1)
l.cx.blendFunc(1,771)
l.dx=w
w.W9(l)
l.fy=!0
z=$.cU+1
$.cU=z
l.go=z
l.CH(0)
return l}catch(j){H.Ru(j)
z=a
y=T.oy()
z.toString
y=new L.p5(z,z.getContext("2d"),y,C.dH,1,P.bK(null,null,!1,L.dZ),P.bK(null,null,!1,L.dZ))
y.CH(0)
return y}else if(b.gAT()===C.i6){z=a
y=T.oy()
z.toString
y=new L.p5(z,z.getContext("2d"),y,C.dH,1,P.bK(null,null,!1,L.dZ),P.bK(null,null,!1,L.dZ))
y.CH(0)
return y}else throw H.b(new P.lj("Unknown RenderEngine"))},
Vp:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.TB
y=this.ej
if($.y8()){x=window.innerWidth
w=window.innerHeight
v=0
u=0}else{t=this.x2.getBoundingClientRect()
s=J.RE(t)
v=C.CD.zQ(this.x2.clientLeft)+J.NQ(s.gBb(t))
u=C.CD.zQ(this.x2.clientTop)+J.NQ(s.gG6(t))
x=C.CD.zQ(this.x2.clientWidth)
w=C.CD.zQ(this.x2.clientHeight)}if(typeof x!=="number")throw H.b("dart2js_hint")
if(typeof w!=="number")throw H.b("dart2js_hint")
if(x===0||w===0)return
r=x/z
q=w/y
switch(this.Z){case C.pq:p=q
o=r
break
case C.o6:p=r>q?r:q
o=p
break
case C.bM:o=1
p=1
break
case C.as:p=r<q?r:q
o=p
break
default:o=1
p=1}s=this.Uu
switch(s){case C.fR:case C.kx:case C.e8:n=0
break
case C.d4:case C.eb:case C.L6:n=(x-z*o)/2
break
case C.IK:case C.ld:case C.Kq:n=x-z*o
break
default:n=0}switch(s){case C.e8:case C.d4:case C.IK:m=0
break
case C.fR:case C.eb:case C.ld:m=(w-y*p)/2
break
case C.kx:case C.L6:case C.Kq:m=w-y*p
break
default:m=0}s=this.Ky
s.Q=-n/o
s.a=-m/p
s.b=x/o
s.c=w/p
s=this.pV
s.Vy(o,0,0,p,n,m)
l=this.zR
s.Pc(0,l,l)
l=this.bR
l.Vy(1,0,0,1,-v-n,-u-m)
l.Pc(0,1/o,1/p)
if(this.lZ!==x||this.Ab!==w){this.lZ=x
this.Ab=w
this.x2.width=C.CD.zQ(x*this.zR)
this.x2.height=C.CD.zQ(w*this.zR)
if(C.CD.zQ(this.x2.clientWidth)!==x||C.CD.zQ(this.x2.clientHeight)!==w){s=this.x2.style
l=H.d(x)+"px"
s.width=l
s=this.x2.style
l=H.d(w)+"px"
s.height=l}this.H2(0,new R.ea("resize",!1,C.wq,null,null,!1,!1))}},
cq:function(){var z,y,x,w,v,u,t,s,r,q
z=this.lq
y=$.Mx
if(z!=null&&y==="auto"){x=z.k4
if(x!=="auto")y=x}if(y==="auto")y="default"
w=this.j3
if(w==null?y!=null:w!==y){this.j3=y
w=this.x2.style
if($.fn().NZ(y)){v=$.fn().p(0,y)
u=J.Nl(v)
t=v.gOh()
s=t.gx(t)
t=v.gOh()
r=t.gy(t)
q="url('"+H.d(u)+"') "+H.d(s)+" "+H.d(r)+", "+H.d(y)}else q=y
t=$.rD?"none":q
w.toString
w.cursor=t==null?"":t}},
kp:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(this.TQ)a.preventDefault()
z=Date.now()
y=a.button
x=this.bR.Ey(H.J(new P.EX(a.clientX,a.clientY),[null]))
w=H.J(new U.hL(0,0),[P.U])
if(y<0||y>2)return
if(a.type==="mousemove"&&this.iU.m(0,x))return
v=this.e1[y]
this.iU=x
C.M.aN(this.pn,new A.PK(x))
if(a.type!=="mouseout")u=this.Fo(x.Q,x.a)
else{this.H2(0,new R.ea("mouseLeave",!1,C.wq,null,null,!1,!1))
u=null}t=this.lq
if(t==null?u!=null:t!==u){s=[]
r=[]
for(q=t;q!=null;q=q.fy)s.push(q)
for(q=u;q!=null;q=q.fy)r.push(q)
for(p=s.length,o=r.length,n=0;!0;++n){if(n===p)break
if(n===o)break
if(s[p-n-1]!==r[o-n-1])break}if(t!=null){t.TK(x,w)
p=w.Q
o=w.a
m=x.Q
l=x.a
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
t.H2(0,new R.Aj(0,0,v.e,0,p,o,m,l,k,j,i,!1,"mouseOut",!0,C.wq,null,null,!1,!1))}for(h=0;h<s.length-n;++h){g=s[h]
g.TK(x,w)
p=w.Q
o=w.a
m=x.Q
l=x.a
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
g.H2(0,new R.Aj(0,0,v.e,0,p,o,m,l,k,j,i,!1,"rollOut",!1,C.wq,null,null,!1,!1))}for(h=r.length-n-1;h>=0;--h){g=r[h]
g.TK(x,w)
p=w.Q
o=w.a
m=x.Q
l=x.a
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
g.H2(0,new R.Aj(0,0,v.e,0,p,o,m,l,k,j,i,!1,"rollOver",!1,C.wq,null,null,!1,!1))}if(u!=null){u.TK(x,w)
p=w.Q
o=w.a
m=x.Q
l=x.a
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
u.H2(0,new R.Aj(0,0,v.e,0,p,o,m,l,k,j,i,!1,"mouseOver",!0,C.wq,null,null,!1,!1))}this.lq=u}this.cq()
if(a.type==="mousedown"){this.x2.focus()
f=v.Q
p=v.d
if((u==null?p!=null:u!==p)||z>v.f+500)v.r=0
v.e=!0
v.d=u
v.f=z;++v.r}else f=null
if(a.type==="mouseup"){f=v.a
v.e=!1
p=v.d
e=p==null?u==null:p===u
d=e&&(v.r&1)===0&&z<v.f+500}else{e=!1
d=!1}z=a.type
if(z==="mousemove")f="mouseMove"
if(z==="contextmenu")f="contextMenu"
if(f!=null&&u!=null){u.TK(x,w)
z=w.Q
p=w.a
o=x.Q
m=x.a
l=a.altKey
k=a.ctrlKey
j=a.shiftKey
u.H2(0,new R.Aj(0,0,v.e,v.r,z,p,o,m,l,k,j,!1,f,!0,C.wq,null,null,!1,!1))
if(e){f=d&&u.k2?v.c:v.b
z=w.Q
p=w.a
o=x.Q
m=x.a
l=a.altKey
k=a.ctrlKey
j=a.shiftKey
u.H2(0,new R.Aj(0,0,v.e,0,z,p,o,m,l,k,j,!1,f,!0,C.wq,null,null,!1,!1))}}},"$1","gNT",2,0,17,30],
Yo:[function(a){var z,y,x,w,v,u,t,s,r,q,p
if(this.ca)a.preventDefault()
z=this.bR.Ey(H.J(new P.EX(a.clientX,a.clientY),[null]))
y=H.J(new U.hL(0,0),[P.U])
x=this.Fo(z.Q,z.a)
x.TK(z,y)
w=y.Q
v=y.a
u=z.Q
t=z.a
s=a.altKey
r=a.ctrlKey
q=a.shiftKey
p=new R.Aj((a&&C.fj).gOW(a),C.fj.gNC(a),!1,0,w,v,u,t,s,r,q,!1,"mouseWheel",!0,C.wq,null,null,!1,!1)
x.H2(0,p)
if(p.f)a.stopImmediatePropagation()
if(p.e)a.stopPropagation()
if(p.db)a.preventDefault()},"$1","gUm",2,0,18,30],
XM:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
if($.y8()){z=P.kW(a)
y=[]
C.M.Ay(y,J.kl(z.p(0,"changedTouches"),P.En()))
x=H.J(new P.Tz(y),[null])
w=V.uz(z.p(0,"type"))
if(this.ij)z.nQ("preventDefault")
for(y=x.gu(x);y.D();){v=P.kW(y.c)
u=V.YX(v.p(0,"identifier"))
t=new P.EX(V.DN(v.p(0,"clientX")),V.DN(v.p(0,"clientY")))
t.$builtinTypeInfo=[null]
this.Up(w,u,t,!1,!1,!1)}}else{if(this.ij)a.preventDefault()
w=a.type
s=a.altKey
r=a.ctrlKey
q=a.shiftKey
for(y=a.changedTouches,p=y.length,o=0;o<y.length;y.length===p||(0,H.lk)(y),++o){n=y[o]
this.Up(w,n.identifier,C.tT.gwl(n),s,r,q)}}},"$1","gd6",2,0,19,30],
Up:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.bR.Ey(c)
y=new U.hL(0,0)
y.$builtinTypeInfo=[P.U]
x=this.TJ(z.Q,z.a)
x=x!=null?x:this
w=this.NH
v=w.to(b,new A.fv(this,x))
u=v.gTD()
t=v.gr5()
C.M.aN(this.pn,new A.Tl(z,u))
s=J.RE(v)
r=s.gSd(v)
if(r==null?x!=null:r!==x){q=s.gSd(v)
p=[]
o=[]
for(n=q;n!=null;n=n.fy)p.push(n)
for(n=x;n!=null;n=n.fy)o.push(n)
for(r=p.length,m=o.length,l=0;!0;++l){if(l===r)break
if(l===m)break
if(p[r-l-1]!==o[m-l-1])break}if(q!=null){q.TK(z,y)
q.H2(0,new R.y6(u,t,y.Q,y.a,z.Q,z.a,d,e,f,!1,"touchOut",!0,C.wq,null,null,!1,!1))}for(k=0;k<p.length-l;++k){j=p[k]
j.TK(z,y)
j.H2(0,new R.y6(u,t,y.Q,y.a,z.Q,z.a,d,e,f,!1,"touchRollOut",!1,C.wq,null,null,!1,!1))}for(k=o.length-l-1;k>=0;--k){j=o[k]
j.TK(z,y)
j.H2(0,new R.y6(u,t,y.Q,y.a,z.Q,z.a,d,e,f,!1,"touchRollOver",!1,C.wq,null,null,!1,!1))}if(x!=null){x.TK(z,y)
x.H2(0,new R.y6(u,t,y.Q,y.a,z.Q,z.a,d,e,f,!1,"touchOver",!0,C.wq,null,null,!1,!1))}s.sSd(v,x)}if(a==="touchstart"){this.x2.focus()
w.q(0,b,v)
i="touchBegin"}else i=null
if(a==="touchend"){w.Rz(0,b)
s=s.gK(v)
h=s==null?x==null:s===x
i="touchEnd"}else h=!1
if(a==="touchcancel"){w.Rz(0,b)
i="touchCancel"}if(a==="touchmove")i="touchMove"
if(i!=null&&x!=null){x.TK(z,y)
x.H2(0,new R.y6(u,t,y.Q,y.a,z.Q,z.a,d,e,f,!1,i,!0,C.wq,null,null,!1,!1))
if(h)x.H2(0,new R.y6(u,t,y.Q,y.a,z.Q,z.a,d,e,f,!1,"touchTap",!0,C.wq,null,null,!1,!1))}},
Pr:[function(a){if(this.Jc)a.preventDefault()
return},"$1","gSf",2,0,16,30],
aT:function(a,b,c,d){var z
if(!J.t(a).$isNy)throw H.b(P.p("canvas"))
if(a.tabIndex<=0)a.tabIndex=1
z=a.style
if(z.outline==="")z.outline="none"
c=$.Ud()
d=a.width
b=a.height
this.RZ=c.e
this.ij=c.y
this.TQ=c.z
this.ca=c.ch
this.Jc=c.cx
this.x2=a
this.Uu=c.d
this.Z=c.c
this.C7=c.b
this.DN=c.a
this.TB=V.YX(d)
this.ej=V.YX(b)
this.zR=V.Jy(c.x,$.Of())
z=this.vW(a,c)
this.y1=z
this.of=L.mN(z,null,null,null)
P.JS("StageXL render engine : "+C.bb.p(0,this.y1.gAT().Q))
z=C.rl.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gSf()),z.b),[H.Kp(z,0)]).Y()
z=C.Z4.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gSf()),z.b),[H.Kp(z,0)]).Y()
z=C.fW.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gSf()),z.b),[H.Kp(z,0)]).Y()
z=this.DN
if(z===C.aN||z===C.Pr){z=C.Wh.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gNT()),z.b),[H.Kp(z,0)]).Y()
z=C.hV.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gNT()),z.b),[H.Kp(z,0)]).Y()
z=C.Cm.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gNT()),z.b),[H.Kp(z,0)]).Y()
z=C.DH.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gNT()),z.b),[H.Kp(z,0)]).Y()
z=C.BC.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gNT()),z.b),[H.Kp(z,0)]).Y()
z=C.Fp.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gUm()),z.b),[H.Kp(z,0)]).Y()}z=this.DN
if((z===C.O7||z===C.Pr)&&$.zI()){z=C.BD.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gd6()),z.b),[H.Kp(z,0)]).Y()
z=C.Za.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gd6()),z.b),[H.Kp(z,0)]).Y()
z=C.Db.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gd6()),z.b),[H.Kp(z,0)]).Y()
z=C.lS.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gd6()),z.b),[H.Kp(z,0)]).Y()
z=C.JN.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gd6()),z.b),[H.Kp(z,0)]).Y()
z=C.hu.f0(a)
H.J(new W.xC(0,z.Q,z.a,W.VF(this.gd6()),z.b),[H.Kp(z,0)]).Y()}$.xR().yI(new A.I0(this))
this.cq()
this.Vp()},
static:{T:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
z=H.J(new U.Vb(0,0,0,0),[P.U])
y=T.oy()
x=T.oy()
w=H.J(new U.hL(0,0),[P.U])
v=H.J([],[A.ZF])
u=P.V(null,null,null,P.P,A.Nd)
t=new K.S(null,null,0,P.bK(null,null,!1,P.U))
s=new K.Gn(null,null)
t.Q=s
t.a=s
s=H.J([],[A.fE])
r=$.LS
$.LS=r+1
r=new A.L(null,null,null,0,0,0,0,1,z,y,x,null,C.aN,C.EJ,C.as,C.eb,"default",w,null,v,u,[new A.Bg("mouseDown","mouseUp","click","doubleClick",null,!1,0,0),new A.Bg("middleMouseDown","middleMouseUp","middleClick","middleClick",null,!1,0,0),new A.Bg("rightMouseDown","rightMouseUp","rightClick","rightClick",null,!1,0,0)],t,null,4294967295,!0,!0,!1,!1,s,!0,!0,!1,!0,"auto",!0,0,r,0,0,0,0,1,1,0,0,0,1,!0,!1,null,null,[],null,"",null,T.oy(),!0,null,null)
r.aT(a,b,c,d)
return r}}},
I0:{
"^":"r:2;Q",
$1:[function(a){return this.Q.cq()},null,null,2,0,null,31,"call"]},
PK:{
"^":"r:2;Q",
$1:function(a){return a.xV(0,this.Q)}},
fv:{
"^":"r:0;Q,a",
$0:function(){var z,y,x
z=this.a
y=this.Q.NH.Q
x=$.j4
$.j4=x+1
return new A.Nd(x,y===0,z,z)}},
Tl:{
"^":"r:2;Q,a",
$1:function(a){return a.xV(this.a,this.Q)}},
Rx:{
"^":"a;AT:Q<,a,b,c,d,e,aX:f<,xc:r<,x,y,z,ch,cx"},
Bg:{
"^":"a;Q,a,b,c,K:d>,e,f,r"},
Nd:{
"^":"a;TD:Q<,r5:a<,K:b>,Sd:c*"},
ZF:{
"^":"a;"}}],["","",,U,{
"^":"",
jC:{
"^":"pT;",
Ls:function(a){a.a=0/0
a.Q=0/0
a.d=1/0
a.b=1/0
a.e=-1/0
a.c=-1/0},
IM:function(a){a.beginPath()}},
Q0:{
"^":"pT;",
IM:function(a){a.closePath()}},
Vm:{
"^":"Kc;Q",
IM:function(a){a.fillStyle=this.Q
a.toString
a.fill("nonzero")}},
cb:{
"^":"pT;Q,a",
Ls:function(a){var z,y
if(!(!isNaN(a.Q)&&!isNaN(a.a))){a.Q=this.Q
a.a=this.a}a.a7(a.Q,a.a)
z=this.Q
y=this.a
a.a7(z,y)
a.Q=z
a.a=y},
IM:function(a){a.lineTo(this.Q,this.a)}},
kR:{
"^":"pT;Q,a",
Ls:function(a){a.Q=this.Q
a.a=this.a},
IM:function(a){a.moveTo(this.Q,this.a)}},
ZX:{
"^":"pT;Q,a,b,c",
kQ:function(a,b,c,d){var z=1-a
return z*z*b+2*z*a*c+a*a*d},
Zu:function(a,b,c){var z=a-2*b+c
return z!==0?(a-b)/z:-1},
Ls:function(a){var z,y,x,w,v,u,t,s,r
if(!(!isNaN(a.Q)&&!isNaN(a.a))){a.Q=this.Q
a.a=this.a}z=a.Q
y=a.a
x=this.Q
w=this.a
v=this.b
u=this.c
a.a7(z,y)
t=this.Zu(z,x,v)
s=this.Zu(y,w,u)
r=t>=0&&t<=1?this.kQ(t,z,x,v):z
a.a7(r,s>=0&&s<=1?this.kQ(s,y,w,u):y)
a.a7(v,u)
a.Q=v
a.a=u},
IM:function(a){a.quadraticCurveTo(this.Q,this.a,this.b,this.c)},
static:{a4:function(a,b,c,d){return new U.ZX(a,b,c,d)}}},
lY:{
"^":"ap;c,Q,a,b",
IM:function(a){a.strokeStyle=this.c
a.lineWidth=this.Q
a.lineJoin=this.a
a.lineCap=this.b
a.stroke()}},
D3:{
"^":"a;Q,a,b",
gKQ:function(){var z,y,x,w,v,u,t,s
if(this.b){z=new U.KO(0/0,0/0,1/0,-1/0,1/0,-1/0,1/0,-1/0,1/0,-1/0)
y=this.Q
for(x=0;x<y.length;++x)y[x].Ls(z)
this.b=!1
w=this.a
v=z.Sg()
u=v.Q
t=v.a
s=v.b
v=v.c
w.Q=u
w.a=t
w.b=s
w.c=v}w=this.a
return H.J(new U.Vb(w.Q,w.a,w.b,w.c),[H.Kp(w,0)])},
i1:function(a,b){var z,y,x,w
z=$.l3()
y=this.Q
if(this.gKQ().eM(0,a,b)){z.setTransform(1,0,0,1,0,0)
z.beginPath()
x=!1
w=0
while(!0){if(!(w<y.length&&x===!1))break
x=y[w].jH(z,a,b);++w}}else x=!1
return x},
Qp:function(a){var z,y,x,w,v
z=a.b
y=z.c
x=this.Q
z.A3(0,a.d.Q)
w=a.d.b
z.f=w
y.globalAlpha=w
y.beginPath()
for(v=0;v<x.length;++v)x[v].IM(y)}},
KO:{
"^":"a;Q,a,b,c,d,e,f,r,x,y",
gZ8:function(){var z=this.b
if(!(z==Infinity||z==-Infinity)){z=this.c
if(!(z==Infinity||z==-Infinity)){z=this.d
if(!(z==Infinity||z==-Infinity)){z=this.e
z=!(z==Infinity||z==-Infinity)}else z=!1}else z=!1}else z=!1
return z},
a7:function(a,b){if(!isNaN(this.Q)&&!isNaN(this.a)){if(this.b>a)this.b=a
if(this.c<a)this.c=a
if(this.d>b)this.d=b
if(this.e<b)this.e=b}},
Sg:function(){var z,y,x,w
z=this.f
if(!(z==Infinity||z==-Infinity)){y=this.r
if(!(y==Infinity||y==-Infinity)){y=this.x
if(!(y==Infinity||y==-Infinity)){y=this.y
y=!(y==Infinity||y==-Infinity)}else y=!1}else y=!1}else y=!1
if(y){y=this.r
x=this.y
w=this.x
return H.J(new U.Vb(z,w,y-z,x-w),[P.U])}else return H.J(new U.Vb(0,0,0,0),[P.U])}},
pT:{
"^":"a;",
Ls:function(a){},
IM:function(a){},
jH:function(a,b,c){this.IM(a)
return!1}},
Kc:{
"^":"pT;",
Ls:function(a){var z,y
if(a.gZ8()){z=a.f
y=a.b
if(z>y)a.f=y
z=a.r
y=a.c
if(z<y)a.r=y
z=a.x
y=a.d
if(z>y)a.x=y
z=a.y
y=a.e
if(z<y)a.y=y}},
jH:function(a,b,c){var z,y
try{z=J.mz(a,b,c)
return z}catch(y){H.Ru(y)
return!0}}},
ap:{
"^":"pT;",
Ls:function(a){var z,y,x,w,v
if(a.gZ8()){z=this.Q/2
y=a.b-z
x=a.c+z
w=a.d-z
v=a.e+z
if(a.f>y)a.f=y
if(a.r<x)a.r=x
if(a.x>w)a.x=w
if(a.y<v)a.y=v}},
jH:function(a,b,c){var z,y
J.SK(a,this.Q)
J.kV(a,this.a)
J.LM(a,this.b)
try{z=J.Hs(a,b,c)
return z}catch(y){H.Ru(y)
return!1}}}}],["","",,L,{
"^":"",
mW:function(){if($.uU===-1){var z=window
C.ol.y4(z)
$.uU=C.ol.ne(z,W.VF(new L.HD()))}},
GK:{
"^":"a;Q,a,b"},
Io:{
"^":"a;Q,a,b,c,d",
xV:function(a,b){var z,y
z=this.Q.buffer
z.toString
H.Hj(z,a,b)
y=new Int16Array(z,a,b)
this.d.bufferSubData(34963,0,y)},
mD:function(a){var z,y,x,w,v
for(z=this.Q,y=z.length-6,x=0,w=0;x<=y;x+=6,w+=4){z[x]=w
z[x+1]=w+1
v=w+2
z[x+2]=v
z[x+3]=w
z[x+4]=v
z[x+5]=w+3}},
static:{yC:function(a){var z=new L.Io(new Int16Array(H.T0(a*6)),35044,-1,null,null)
z.mD(a)
return z}}},
ys:{
"^":"a;Q,a,b,c,d",
xV:function(a,b){var z,y,x
z=a*4
y=this.Q.buffer
y.toString
H.Hj(y,z,b)
x=new Float32Array(y,z,b)
this.d.bufferSubData(34962,z,x)}},
aK:{
"^":"a;Q",
X:function(a){return C.bb.p(0,this.Q)}},
dZ:{
"^":"a;"},
UE:{
"^":"a;"},
p5:{
"^":"UE;b,c,d,e,f,Q,a",
gAT:function(){return C.i6},
CH:function(a){var z
this.A3(0,this.d)
this.e=C.dH
z=this.c
z.globalCompositeOperation="source-over"
this.f=1
z.globalAlpha=1},
Sl:function(a,b){var z,y,x
this.A3(0,this.d)
this.e=C.dH
z=this.c
z.globalCompositeOperation="source-over"
this.f=1
z.globalAlpha=1
y=b>>>24&255
if(y<255){x=this.b
z.clearRect(0,0,x.width,x.height)}if(y>0){z.fillStyle=V.xH(b)
x=this.b
z.fillRect(0,0,x.width,x.height)}},
fZ:function(a){},
d5:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.c
y=b.Q.b
x=b.c
w=b.e
v=b.f
u=a.d
t=u.Q
s=u.b
r=u.c
if(this.f!==s){this.f=s
z.globalAlpha=s}if(this.e!==r){this.e=r
z.globalCompositeOperation=r.b}if(x===0){u=t.Q
z.setTransform(u[0],u[1],u[2],u[3],u[4],u[5])
z.drawImage(y,w[0],w[1],w[8],w[9],v[0],v[1],v[8],v[9])}else if(x===1){u=t.Q
z.setTransform(-u[2],-u[3],u[0],u[1],u[4],u[5])
z.drawImage(y,w[6],w[7],w[8],w[9],0-v[7],v[6],v[9],v[8])}else if(x===2){u=t.Q
z.setTransform(-u[0],-u[1],-u[2],-u[3],u[4],u[5])
z.drawImage(y,w[4],w[5],w[8],w[9],0-v[4],0-v[5],v[8],v[9])}else if(x===3){u=t.Q
z.setTransform(u[2],u[3],-u[0],-u[1],u[4],u[5])
z.drawImage(y,w[2],w[3],w[8],w[9],v[3],0-v[2],v[9],v[8])}},
A3:function(a,b){var z=b.Q
this.c.setTransform(z[0],z[1],z[2],z[3],z[4],z[5])}},
I6:{
"^":"UE;b,c,d,e,f,r,x,y,z,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,Q,a",
gAT:function(){return C.XB},
CH:function(a){var z,y
z=this.b
this.k1=z.width
this.k2=z.height
this.dy=null
this.cx.bindFramebuffer(36160,null)
this.cx.viewport(0,0,this.k1,this.k2)
z=this.cy
z.xI()
z.Qh(0,2/this.k1,-2/this.k2,1)
z.px(0,-1,1,0)
y=this.dx
y.a.uniformMatrix4fv(y.d.p(0,"uProjectionMatrix"),!1,z.Q)},
Sl:function(a,b){var z,y
z=(b>>>24&255)/255
this.cx.colorMask(!0,!0,!0,!0)
this.cx.clearColor((b>>>16&255)/255*z,(b>>>8&255)/255*z,(b&255)/255*z,z)
this.cx.clear(17408)
y=this.dy
if(y instanceof L.F7){y=y.a
y.toString
y.b=V.YX(0)
this.cx.disable(2960)}else{this.id=0
this.cx.disable(2960)}},
fZ:function(a){this.dx.fZ(0)},
d5:function(a,b){var z,y
z=this.c
y=this.dx
if(z!==y){y.fZ(0)
this.dx=z
z.W9(this)
y=this.dx
y.a.uniformMatrix4fv(y.d.p(0,"uProjectionMatrix"),!1,this.cy.Q)}this.Cp(a.d.c)
this.wi(b.Q)
z.d5(a,b)},
Cp:function(a){if(a!==this.fx){this.dx.fZ(0)
this.fx=a
this.cx.blendFunc(a.Q,a.a)}},
wi:function(a){var z,y
z=this.db
if(a==null?z!=null:a!==z){this.dx.fZ(0)
this.db=a
z=a.f
y=this.go
if(z!==y){a.e=this
a.f=y
z=this.cx
a.x=z
a.y=z.createTexture()
a.x.activeTexture(33984)
a.x.bindTexture(3553,a.y)
z=a.b
if(z!=null){a.x.texImage2D(3553,0,6408,6408,5121,z)
a.r=a.x.getError()===1281}else a.x.texImage2D(3553,0,6408,a.Q,a.a,0,6408,5121,null)
if(a.r){z=a.Q
z=W.d9(a.a,z)
a.c=z
z.toString
z.getContext("2d").drawImage(a.b,0,0)
a.x.texImage2D(3553,0,6408,6408,5121,a.c)}a.x.texParameteri(3553,10242,33071)
a.x.texParameteri(3553,10243,33071)
z=a.x
y=a.d.Q
z.texParameteri(3553,10241,y)
a.x.texParameteri(3553,10240,y)}else{a.x.activeTexture(33984)
a.x.bindTexture(3553,a.y)}}},
yM:[function(a){var z
a.preventDefault()
this.fy=!1
z=this.Q
if(!z.gd9())H.vh(z.Pq())
z.MW(new L.dZ())},"$1","gpX",2,0,20,32],
dV:[function(a){var z
this.fy=!0
z=$.cU+1
$.cU=z
this.go=z
z=this.a
if(!z.gd9())H.vh(z.Pq())
z.MW(new L.dZ())},"$1","gyD",2,0,20,32]},
F7:{
"^":"a;Q,a,b,c,d,e,f,r"},
HD:{
"^":"r:2;",
$1:[function(a){var z,y,x
z=V.DN(a)/1000
y=$.m2
$.m2=z
$.uU=-1
L.mW()
x=$.E6()
x.toString
x=H.J(x.slice(),[H.Kp(x,0)])
C.M.aN(x,new L.eF(z-y))},null,null,2,0,null,33,"call"]},
eF:{
"^":"r:2;Q",
$1:function(a){return a.$1(this.Q)}},
je:{
"^":"a;",
wE:[function(a){this.Q=!0
L.mW()
$.E6().push(this.gEh())},null,"gJ",0,0,null],
Ve:[function(a){if(this.Q&&a>=0)if(typeof a==="number")this.Gz(a)},"$1","gEh",2,0,21,34]},
e7:{
"^":"a;",
gNl:function(){return this.a},
gMU:function(){return this.b},
W9:["Tz",function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.Q
y=a.go
if(z!==y){this.Q=y
z=a.cx
this.a=z
this.b=z.createProgram()
z=this.c
z.V1(0)
y=this.d
y.V1(0)
x=this.f9(this.a,this.gRr(),35633)
w=this.f9(this.a,this.gE0(),35632)
this.a.attachShader(this.b,x)
this.a.attachShader(this.b,w)
this.a.linkProgram(this.b)
v=this.a.getProgramParameter(this.b,35714)
u=this.a.isContextLost()
if(v===!1&&u===!1)throw H.b(this.gNl().getProgramInfoLog(this.gMU()))
t=this.a.getProgramParameter(this.b,35721)
s=this.a.getProgramParameter(this.b,35718)
for(r=0;r<t;++r){q=this.a.getActiveAttrib(this.b,r)
p=this.a.getAttribLocation(this.b,q.name)
this.a.enableVertexAttribArray(p)
z.q(0,q.name,p)}for(r=0;r<s;++r){q=this.a.getActiveUniform(this.b,r)
p=this.a.getUniformLocation(this.b,q.name)
y.q(0,q.name,p)}}this.a.useProgram(this.b)}],
f9:function(a,b,c){var z,y,x
z=a.createShader(c)
a.shaderSource(z,b)
a.compileShader(z)
y=a.getShaderParameter(z,35713)
x=a.isContextLost()
if(y===!1&&x===!1)throw H.b(a.getShaderInfoLog(z))
return z}},
UG:{
"^":"e7;e,f,r,x,Q,a,b,c,d",
gRr:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec2 aVertexTextCoord;\r\n    attribute vec4 aVertexColor;\r\n    varying vec2 vTextCoord;\r\n    varying vec4 vColor; \r\n\r\n    void main() {\r\n      vTextCoord = aVertexTextCoord;\r\n      vColor = aVertexColor;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gE0:function(){return"\r\n    precision mediump float;\r\n    uniform sampler2D uSampler;\r\n    varying vec2 vTextCoord;\r\n    varying vec4 vColor; \r\n\r\n    void main() {\r\n      vec4 color = texture2D(uSampler, vTextCoord);\r\n      gl_FragColor = vec4(color.rgb * vColor.rgb * vColor.a, color.a * vColor.a);\r\n    }\r\n    "}},
nP:{
"^":"e7;e,f,r,Q,a,b,c,d",
gRr:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec2 aVertexTextCoord;\r\n    attribute float aVertexAlpha;\r\n    varying vec2 vTextCoord;\r\n    varying float vAlpha;\r\n\r\n    void main() {\r\n      vTextCoord = aVertexTextCoord;\r\n      vAlpha = aVertexAlpha;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gE0:function(){return"\r\n    precision mediump float;\r\n    uniform sampler2D uSampler;\r\n\r\n    varying vec2 vTextCoord;\r\n    varying float vAlpha;\r\n\r\n    void main() {\r\n      gl_FragColor = texture2D(uSampler, vTextCoord) * vAlpha;\r\n    }\r\n    "},
W9:function(a){var z,y,x
this.Tz(a)
L.e7.prototype.gNl.call(this).uniform1i(this.d.p(0,"uSampler"),0)
z=a.f
this.e=z
y=z.b
x=a.go
if(y!==x){z.b=x
y=a.cx
z.d=y
y=y.createBuffer()
z.c=y
z.d.bindBuffer(34963,y)
z.d.bufferData(34963,z.Q,z.a)}z.d.bindBuffer(34963,z.c)
z=a.x
this.f=z
y=z.b
x=a.go
if(y!==x){z.b=x
y=a.cx
z.d=y
y=y.createBuffer()
z.c=y
z.d.bindBuffer(34962,y)
z.d.bufferData(34962,z.Q,z.a)}z.d.bindBuffer(34962,z.c)
z=this.f
y=this.c
x=y.p(0,"aVertexPosition")
z.d.vertexAttribPointer(x,2,5126,!1,20,0)
x=this.f
z=y.p(0,"aVertexTextCoord")
x.d.vertexAttribPointer(z,2,5126,!1,20,8)
z=this.f
y=y.p(0,"aVertexAlpha")
z.d.vertexAttribPointer(y,1,5126,!1,20,16)},
fZ:function(a){var z=this.r
if(z>0){this.f.xV(0,z*20)
this.a.drawElements(4,this.r*6,5123,0)
this.r=0}},
d5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=b.f
y=b.r
x=a.d
w=x.Q
v=x.b
x=w.Q
u=x[0]
t=x[1]
s=x[2]
r=x[3]
q=x[4]
p=z[0]
o=z[1]
n=q+p*u+o*s
m=x[5]+p*t+o*r
o=z[8]
p=z[9]
l=p*s
k=p*r
j=this.e.Q
if(j.length<this.r*6+6)this.fZ(0)
i=this.f.Q
x=i.length
if(x<this.r*20+20)this.fZ(0)
q=this.r
h=q*20
if(h>x-20)return
i[h]=n
i[h+1]=m
i[h+2]=y[0]
i[h+3]=y[1]
i[h+4]=v
x=n+o*u
i[h+5]=x
o=m+o*t
i[h+6]=o
i[h+7]=y[2]
i[h+8]=y[3]
i[h+9]=v
i[h+10]=x+l
i[h+11]=o+k
i[h+12]=y[4]
i[h+13]=y[5]
i[h+14]=v
i[h+15]=n+l
i[h+16]=m+k
i[h+17]=y[6]
i[h+18]=y[7]
i[h+19]=v
this.r=q+1}},
HL:{
"^":"e7;e,f,Q,a,b,c,d",
gRr:function(){return"\r\n    uniform mat4 uProjectionMatrix;\r\n    attribute vec2 aVertexPosition;\r\n    attribute vec4 aVertexColor;\r\n    varying vec4 vColor;\r\n\r\n    void main() {\r\n      vColor = aVertexColor;\r\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\r\n    }\r\n    "},
gE0:function(){return"\r\n    precision mediump float;\r\n    varying vec4 vColor;\r\n\r\n    void main() {\r\n      gl_FragColor = vec4(vColor.rgb * vColor.a, vColor.a);\r\n    }\r\n    "}},
PQ:{
"^":"a;Q,a,b,c,d"},
up:{
"^":"a;Q,a,b,c,d",
zs:function(a){var z,y,x,w,v,u
z=a.gwr()
y=a.ch
x=a.fr
w=x!=null?x.e:null
v=this.d
x=v.d
if(x==null){x=T.oy()
u=new T.Xo(new Float32Array(H.T0(16)))
u.xI()
u=new L.PQ(x,u,1,C.dH,null)
v.d=u
x=u}x.Q.kx(z,v.Q)
x.c=v.c
x.b=y*v.b
this.d=x
if(w!=null)this.b.d5(this,w)
else a.dd(this)
this.d=v},
SP:function(a,b,c,d){var z=this.c
this.d=z
if(b instanceof T.yW)z.Q.M1(b)
if(typeof c==="number")z.b=c},
static:{mN:function(a,b,c,d){var z,y
z=T.oy()
y=new T.Xo(new Float32Array(H.T0(16)))
y.xI()
y=new L.up(0,0,a,new L.PQ(z,y,1,C.dH,null),null)
y.SP(a,b,c,d)
return y}}},
Gp:{
"^":"a;Q,a,b,c,d,e,f,r,x,y,z",
gqN:function(a){var z=this.b
if(!!J.t(z).$isNy)return z
else throw H.b(new P.lj("RenderTexture is read only."))},
lO:function(a,b,c){var z
if(this.Q===b&&this.a===c);else if(this.b==null){this.Q=b
this.a=c
z=this.e
if(z==null||this.y==null)return
if(z.go!==this.f)return
z.wi(this)
this.x.texImage2D(3553,0,6408,this.Q,this.a,0,6408,5121,null)}else{this.Q=b
this.a=c
z=W.d9(c,b)
this.b=z
this.c=z}},
Li:function(){var z=this.e
if(z==null||this.y==null)return
if(z.go!==this.f)return
if(this.r){z=this.c
z.toString
z.getContext("2d").drawImage(this.b,0,0)
this.e.wi(this)
this.x.texImage2D(3553,0,6408,6408,5121,this.c)}else{z.wi(this)
this.x.texImage2D(3553,0,6408,6408,5121,this.b)}},
xZ:function(a,b,c){var z,y
if(a<=0)throw H.b(P.p("width"))
if(b<=0)throw H.b(P.p("height"))
this.Q=V.YX(a)
z=V.YX(b)
this.a=z
z=W.d9(z,this.Q)
this.c=z
this.b=z
if(c!==0){z.toString
y=z.getContext("2d")
y.fillStyle=V.xH(c)
y.fillRect(0,0,this.Q,this.a)}},
static:{fL:function(a,b,c){var z=new L.Gp(0,0,null,null,C.Ls,null,-1,!1,null,null,-1)
z.xZ(a,b,c)
return z}}},
jc:{
"^":"a;M:Q>"},
RK:{
"^":"a;Q,a,b,c,d,e,f,r",
gmH:function(){var z,y,x,w
z=this.d
y=this.c
if(y===0){y=this.a
x=this.b
return T.iI(z,0,0,z,y.Q+x.Q,y.a+x.a)}else if(y===1){y=this.a
x=this.b
return T.iI(0,z,0-z,0,y.Q+y.b-x.a,y.a+x.Q)}else if(y===2){y=this.a
x=this.b
w=0-z
return T.iI(w,0,0,w,y.Q+y.b-x.Q,y.a+y.c-x.a)}else if(y===3){y=this.a
x=this.b
return T.iI(0,0-z,z,0,y.Q+x.a,y.a+y.c-x.Q)}else throw H.b(new P.Ge())},
IT:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c
y=z!==0
x=!y||z===2
w=this.a
v=x?w.b:w.c
u=!y||z===2?w.c:w.b
x=this.b
t=0-x.Q
s=0-x.a
x=this.e
if(!y||z===3){r=w.Q
q=r}else{r=w.Q
q=r+w.b
p=q
q=r
r=p}x[0]=r
if(!y||z===1){r=w.a
o=r}else{r=w.a
o=r+w.c
p=o
o=r
r=p}x[1]=r
r=z===2
n=!r
x[2]=!n||z===3?q:q+w.b
x[3]=!y||z===3?o:o+w.c
m=z===1
l=!m
x[4]=!l||r?q:q+w.b
x[5]=!n||z===3?o:o+w.c
x[6]=!y||m?q:q+w.b
x[7]=!l||r?o:o+w.c
x[8]=w.b
x[9]=w.c
y=this.f
w=this.d
q=t/w
y[6]=q
y[0]=q
q=s/w
y[3]=q
y[1]=q
q=(t+v)/w
y[4]=q
y[2]=q
q=(s+u)/w
y[7]=q
y[5]=q
y[8]=v/w
y[9]=u/w
w=this.r
y=x[0]
q=this.Q
o=q.Q
w[0]=y/o
y=x[1]
q=q.a
w[1]=y/q
w[2]=x[2]/o
w[3]=x[3]/q
w[4]=x[4]/o
w[5]=x[5]/q
w[6]=x[6]/o
w[7]=x[7]/q
w[8]=x[8]/o
w[9]=x[9]/q},
static:{NA:function(a,b,c,d,e){var z=new L.RK(a,b,c,d,e,new Int32Array(H.T0(10)),new Float32Array(H.T0(10)),new Float32Array(H.T0(10)))
z.IT(a,b,c,d,e)
return z}}}}],["","",,R,{
"^":"",
lo:function(a,b){var z,y,x,w
z=b.length
for(y=0;y<z;++y){x=b[y]
if(!x.b){a.e=!1
a.f=!1
w=x.d.Q
a.c=w
a.d=w
a.b=C.wq
x.tn(a)}else{C.M.W4(b,y);--z;--y}}},
ZL:{
"^":"ea;",
gB7:function(){return!1}},
O:{
"^":"ZL;r,Q,a,b,c,d,e,f"},
Z:{
"^":"ZL;Q,a,b,c,d,e,f"},
W:{
"^":"ZL;Q,a,b,c,d,e,f"},
ea:{
"^":"a;Q,a,b,c,d,e,f",
gB7:function(){return!0},
gK:function(a){return this.c},
gSd:function(a){return this.d}},
pp:{
"^":"a;",
jQ:function(a,b){var z,y
z=this.Q
if(z==null)return!1
y=z.p(0,a)
if(y==null)return!1
return b?y.gCD():y.gm3()},
mZ:function(a){return this.jQ(a,!1)},
J0:function(a,b,c){var z,y
a.e=!1
a.f=!1
z=this.Q
if(z==null)return
y=z.p(0,a.Q)
if(y==null)return
y.wb(a,b,c)}},
ZZ:{
"^":"a;Q",
X:function(a){return C.Vn.p(0,this.Q)}},
vZ:{
"^":"a;Q",
X:function(a){return C.Vk.p(0,this.Q)}},
PA:{
"^":"ea;"},
Aj:{
"^":"PA;dx,dy,fr,fx,r,x,y,z,ch,cx,cy,db,Q,a,b,c,d,e,f"},
y6:{
"^":"PA;TD:dx<,dy,r,x,y,z,ch,cx,cy,db,Q,a,b,c,d,e,f"}}],["","",,T,{
"^":"",
yW:{
"^":"a;Q",
X:function(a){var z=this.Q
return"Matrix [a="+H.d(z[0])+", b="+H.d(z[1])+", c="+H.d(z[2])+", d="+H.d(z[3])+", tx="+H.d(z[4])+", ty="+H.d(z[5])+"]"},
fv:function(a,b){var z,y,x,w,v,u,t,s
z=J.Oq(a.Q)
y=J.Oq(a.a)
x=this.Q
w=x[0]
v=x[2]
u=x[4]
t=x[1]
s=x[3]
x=x[5]
return H.J(new U.hL(z*w+y*v+u,z*t+y*s+x),[P.U])},
Ey:function(a){return this.fv(a,null)},
Qb:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=a.Q
y=z+a.b
x=a.a
w=x+a.c
v=this.Q
u=v[0]
t=z*u
s=v[2]
r=x*s
q=t+r
p=v[1]
o=z*p
n=v[3]
m=x*n
l=o+m
u=y*u
k=u+r
p=y*p
j=p+m
s=w*s
i=u+s
n=w*n
h=p+n
g=t+s
f=o+n
e=q>k?k:q
if(e>i)e=i
if(e>g)e=g
d=l>j?j:l
if(d>h)d=h
if(d>f)d=f
c=q<k?k:q
if(c<i)c=i
if(c<g)c=g
b=l<j?j:l
if(b<h)b=h
if(b<f)b=f
u=v[4]
v=v[5]
a0.Q=u+e
a0.a=v+d
a0.b=c-e
a0.c=b-d
return a0},
Pc:function(a,b,c){var z=this.Q
z[0]=z[0]*b
z[1]=z[1]*c
z[2]=z[2]*b
z[3]=z[3]*c
z[4]=z[4]*b
z[5]=z[5]*c},
Vy:function(a,b,c,d,e,f){var z=this.Q
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f},
M1:function(a){var z,y
z=this.Q
y=a.Q
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
z[4]=y[4]
z[5]=y[5]},
kx:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.Q
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
z=b.Q
s=z[0]
r=z[1]
q=z[2]
p=z[3]
o=z[4]
n=z[5]
z=this.Q
z[0]=y*s+x*q
z[1]=y*r+x*p
z[2]=w*s+v*q
z[3]=w*r+v*p
z[4]=u*s+t*q+o
z[5]=u*r+t*p+n},
Oy:function(a,b,c,d,e,f){var z=this.Q
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f},
XW:function(){var z=this.Q
z[0]=1
z[1]=0
z[2]=0
z[3]=1
z[4]=0
z[5]=0},
static:{iI:function(a,b,c,d,e,f){var z=new T.yW(new Float32Array(H.T0(6)))
z.Oy(a,b,c,d,e,f)
return z},oy:function(){var z=new T.yW(new Float32Array(H.T0(6)))
z.XW()
return z}}}}],["","",,T,{
"^":"",
Xo:{
"^":"a;Q",
xI:function(){var z=this.Q
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
Qh:function(a,b,c,d){var z=this.Q
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*c
z[5]=z[5]*c
z[6]=z[6]*c
z[7]=z[7]*c
z[8]=z[8]*d
z[9]=z[9]*d
z[10]=z[10]*d
z[11]=z[11]*d},
px:function(a,b,c,d){var z=this.Q
z[3]=z[3]+b
z[7]=z[7]+c
z[11]=z[11]+d}}}],["","",,U,{
"^":"",
hL:{
"^":"a;x:Q>,y:a>",
X:function(a){return"Point<"+new H.cu(H.Ko(H.Kp(this,0)),null).X(0)+"> [x="+H.d(this.Q)+", y="+H.d(this.a)+"]"},
m:function(a,b){var z
if(b==null)return!1
z=J.t(b)
return!!z.$isEX&&this.Q===z.gx(b)&&this.a===z.gy(b)},
giO:function(a){var z,y
z=this.Q
y=this.a
return O.h5(O.iM(O.iM(0,z&0x1FFFFFFF),y&0x1FFFFFFF))},
$isEX:1}}],["","",,U,{
"^":"",
Vb:{
"^":"a;Bb:Q>,G6:a>,N:b>,fg:c>",
X:function(a){return"Rectangle<"+new H.cu(H.Ko(H.Kp(this,0)),null).X(0)+"> [left="+H.d(this.Q)+", top="+H.d(this.a)+", width="+H.d(this.b)+", height="+H.d(this.c)+"]"},
m:function(a,b){var z
if(b==null)return!1
z=J.t(b)
return!!z.$istn&&this.Q===z.gBb(b)&&this.a===z.gG6(b)&&this.b===z.gN(b)&&this.c===z.gfg(b)},
giO:function(a){var z,y,x,w
z=this.Q
y=this.a
x=C.CD.giO(this.b)
w=C.CD.giO(this.c)
return O.h5(O.iM(O.iM(O.iM(O.iM(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x),w))},
gT8:function(a){return this.Q+this.b},
gOR:function(a){return this.a+this.c},
eM:function(a,b,c){var z,y
z=this.Q
if(z<=b){y=this.a
z=y<=c&&z+this.b>b&&y+this.c>c}else z=!1
return z},
$istn:1,
$astn:null}}],["","",,Q,{
"^":"",
cz:function(){var z,y
try{z=P.p8("TouchEvent")
return z}catch(y){H.Ru(y)
return!1}}}],["","",,O,{
"^":"",
iM:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10>>>0)
return a^a>>>6},
h5:function(a){a=536870911&a+((67108863&a)<<3>>>0)
a^=a>>>11
return 536870911&a+((16383&a)<<15>>>0)}}],["","",,V,{
"^":"",
xH:function(a){return"rgba("+(a>>>16&255)+","+(a>>>8&255)+","+(a&255)+","+H.d((a>>>24&255)/255)+")"},
Jy:function(a,b){if(a<=b)return a
else return b},
YX:function(a){if(typeof a==="number"&&Math.floor(a)===a)return a
else throw H.b(P.p("The supplied value ("+H.d(a)+") is not an int."))},
DN:function(a){if(typeof a==="number")return a
else throw H.b(P.p("The supplied value ("+H.d(a)+") is not a number."))},
uz:function(a){if(typeof a==="string")return a
else throw H.b(P.p("The supplied value ("+H.d(a)+") is not a string."))}}],["","",,O,{
"^":"",
fm:{
"^":"a;Q,a",
xW:function(a){return P.pH(H.J(new H.A8(this.gPb(),new O.Gr()),[null,null]),null,!1).ml(new O.XL(this))},
gPb:function(){var z=this.Q
z=z.gUQ(z)
z=H.J(new H.U5(z,new O.BH()),[H.ip(z,"cX",0)])
return P.z(z,!0,H.ip(z,"cX",0))},
gow:function(){var z=this.Q
z=z.gUQ(z)
z=H.J(new H.U5(z,new O.PW()),[H.ip(z,"cX",0)])
return P.z(z,!0,H.ip(z,"cX",0))}},
Gr:{
"^":"r:2;",
$1:[function(a){return J.R9(a)},null,null,2,0,null,35,"call"]},
XL:{
"^":"r:2;Q",
$1:[function(a){var z,y
z=this.Q
y=z.gow().length
if(y>0)throw H.b(new P.lj("Failed to load "+y+" resource(s)."))
else return z},null,null,2,0,null,13,"call"]},
BH:{
"^":"r:2;",
$1:function(a){var z=J.RE(a)
return z.gM(a)==null&&z.gkc(a)==null}},
PW:{
"^":"r:2;",
$1:function(a){return J.w8(a)!=null}},
Y:{
"^":"a;"}}],["","",,Q,{
"^":"",
JW:{
"^":"a;"}}]]
setupProgram(dart,0)
J.RE=function(a){if(a==null)return a
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.U6=function(a){if(typeof a=="string")return J.E.prototype
if(a==null)return a
if(a.constructor==Array)return J.G.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.Wx=function(a){if(typeof a=="number")return J.F.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.kd.prototype
return a}
J.t=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.im.prototype
return J.VA.prototype}if(typeof a=="string")return J.E.prototype
if(a==null)return J.PE.prototype
if(typeof a=="boolean")return J.yE.prototype
if(a.constructor==Array)return J.G.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.w1=function(a){if(a==null)return a
if(a.constructor==Array)return J.G.prototype
if(typeof a!="object")return a
if(a instanceof P.a)return a
return J.ks(a)}
J.DZ=function(a,b){return J.t(a).P(a,b)}
J.GJ=function(a,b,c,d){return J.RE(a).Y9(a,b,c,d)}
J.Hs=function(a,b,c){return J.RE(a).R8(a,b,c)}
J.LM=function(a,b){return J.RE(a).sNE(a,b)}
J.Lz=function(a){return J.t(a).X(a)}
J.NQ=function(a){return J.Wx(a).zQ(a)}
J.NT=function(a,b,c){return J.U6(a).eM(a,b,c)}
J.Nl=function(a){return J.RE(a).gO3(a)}
J.Nx=function(a){return J.w1(a).gu(a)}
J.OE=function(a,b){return J.RE(a).sfg(a,b)}
J.Oq=function(a){return J.Wx(a).Hp(a)}
J.R9=function(a){return J.RE(a).gv6(a)}
J.SK=function(a,b){return J.RE(a).sWi(a,b)}
J.TZ=function(a,b){return J.RE(a).sN(a,b)}
J.Tf=function(a,b){if(a.constructor==Array||typeof a=="string"||H.wV(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.U6(a).p(a,b)}
J.UN=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.Wx(a).w(a,b)}
J.Wj=function(a){return J.RE(a).goP(a)}
J.i4=function(a,b){return J.w1(a).Zv(a,b)}
J.kH=function(a,b){return J.w1(a).aN(a,b)}
J.kV=function(a,b){return J.RE(a).sZW(a,b)}
J.kl=function(a,b){return J.w1(a).ez(a,b)}
J.mG=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.t(a).m(a,b)}
J.mz=function(a,b,c){return J.RE(a).Pk(a,b,c)}
J.qV=function(a,b,c,d){return J.RE(a).On(a,b,c,d)}
J.v1=function(a){return J.t(a).giO(a)}
J.w8=function(a){return J.RE(a).gkc(a)}
J.wS=function(a){return J.U6(a).gv(a)}
I.uL=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.p1=W.Ny.prototype
C.M=J.G.prototype
C.ON=J.VA.prototype
C.jn=J.im.prototype
C.CD=J.F.prototype
C.xB=J.E.prototype
C.ZQ=J.iC.prototype
C.tT=W.a3.prototype
C.vB=J.kd.prototype
C.fj=W.J6.prototype
C.ol=W.K5.prototype
C.dH=new L.GK(1,771,"source-over")
C.KZ=new H.hJ()
C.pr=new P.hR()
C.NU=new P.R8()
C.RT=new P.a6(0)
C.b7=new R.ZZ(0)
C.wq=new R.ZZ(1)
C.V6=new R.ZZ(2)
C.BC=new W.e0("contextmenu")
C.rl=new W.e0("keydown")
C.fW=new W.e0("keypress")
C.Z4=new W.e0("keyup")
C.Wh=new W.e0("mousedown")
C.Cm=new W.e0("mousemove")
C.DH=new W.e0("mouseout")
C.hV=new W.e0("mouseup")
C.hu=new W.e0("touchcancel")
C.Za=new W.e0("touchend")
C.lS=new W.e0("touchenter")
C.JN=new W.e0("touchleave")
C.Db=new W.e0("touchmove")
C.BD=new W.e0("touchstart")
C.Pk=new W.e0("webglcontextlost")
C.fx=new W.e0("webglcontextrestored")
C.aN=new R.vZ(0)
C.O7=new R.vZ(1)
C.Pr=new R.vZ(2)
C.Mc=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.lR=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.w2=function getTagFallback(o) {
  var constructor = o.constructor;
  if (typeof constructor == "function") {
    var name = constructor.name;
    if (typeof name == "string" &&
        name.length > 2 &&
        name !== "Object" &&
        name !== "Function.prototype") {
      return name;
    }
  }
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.XQ=function(hooks) { return hooks; }

C.ur=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.Jh=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.M1=function() {
  function typeNameInChrome(o) {
    var constructor = o.constructor;
    if (constructor) {
      var name = constructor.name;
      if (name) return name;
    }
    var s = Object.prototype.toString.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = Object.prototype.toString.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: typeNameInChrome,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.hQ=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.Vu=function(_, letter) { return letter.toUpperCase(); }
C.xD=I.uL([])
C.bb=new H.kz([0,"RenderEngine.WebGL",1,"RenderEngine.Canvas2D"])
C.aP=new H.kz([0,"StageScaleMode.EXACT_FIT",1,"StageScaleMode.NO_BORDER",2,"StageScaleMode.NO_SCALE",3,"StageScaleMode.SHOW_ALL"])
C.qQ=new H.kz([0,"StageRenderMode.AUTO",1,"StageRenderMode.STOP",2,"StageRenderMode.ONCE"])
C.Vn=new H.kz([0,"EventPhase.CAPTURING_PHASE",1,"EventPhase.AT_TARGET",2,"EventPhase.BUBBLING_PHASE"])
C.Vk=new H.kz([0,"InputEventMode.MouseOnly",1,"InputEventMode.TouchOnly",2,"InputEventMode.MouseAndTouch"])
C.Is=new H.kz([0,"StageAlign.TOP_LEFT",1,"StageAlign.TOP",2,"StageAlign.TOP_RIGHT",3,"StageAlign.LEFT",4,"StageAlign.NONE",5,"StageAlign.RIGHT",6,"StageAlign.BOTTOM_LEFT",7,"StageAlign.BOTTOM",8,"StageAlign.BOTTOM_RIGHT"])
C.XB=new L.aK(0)
C.i6=new L.aK(1)
C.Ls=new L.jc(9729)
C.e8=new A.uq(0)
C.d4=new A.uq(1)
C.IK=new A.uq(2)
C.fR=new A.uq(3)
C.eb=new A.uq(4)
C.ld=new A.uq(5)
C.kx=new A.uq(6)
C.L6=new A.uq(7)
C.Kq=new A.uq(8)
C.EJ=new A.dG(0)
C.OA=new A.dG(1)
C.lU=new A.dG(2)
C.pq=new A.jK(0)
C.o6=new A.jK(1)
C.bM=new A.jK(2)
C.as=new A.jK(3)
C.Te=new H.GD("call")
C.Fp=new W.kG(W.wQ())
$.te="$cachedFunction"
$.Mr="$cachedInvocation"
$.yj=0
$.bf=null
$.n9=null
$.NF=null
$.TX=null
$.x7=null
$.nw=null
$.vv=null
$.Bv=null
$.S6=null
$.k8=null
$.mg=null
$.UD=!1
$.X3=C.NU
$.Ss=0
$.L4=null
$.eG=null
$.w5=null
$.aj=null
$.N=null
$.X=null
$.EG=null
$.Dz=null
$.fg=null
$.OM=null
$.Vt=null
$.LS=0
$.j4=1
$.cU=0
$.m2=17976931348623157e292
$.uU=-1
$.rD=!1
$.Mx="auto"
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a](S0,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){var z=3
for(var y=0;y<a.length;y+=z){var x=a[y]
var w=a[y+1]
var v=a[y+2]
I.$lazy(x,w,v)}})(["Xr","Jz",function(){return H.yl()},"rS","p6",function(){return new P.kM(null)},"lm","WD",function(){return H.cM(H.S7({toString:function(){return"$receiver$"}}))},"k1","OI",function(){return H.cM(H.S7({$method$:null,toString:function(){return"$receiver$"}}))},"Re","PH",function(){return H.cM(H.S7(null))},"fN","D1",function(){return H.cM(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"qi","rx",function(){return H.cM(H.S7(void 0))},"rZ","Kr",function(){return H.cM(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"BX","zO",function(){return H.cM(H.Mj(null))},"tt","Bi",function(){return H.cM(function(){try{null.$method$}catch(z){return z.message}}())},"dt","eA",function(){return H.cM(H.Mj(void 0))},"A7","ko",function(){return H.cM(function(){try{(void 0).$method$}catch(z){return z.message}}())},"lI","ej",function(){return P.Oj()},"xg","xb",function(){return[]},"eo","LX",function(){return P.ND(self)},"kt","Iq",function(){return H.Yg("_$dart_dartObject")},"Ri","Dp",function(){return H.Yg("_$dart_dartClosure")},"Je","hs",function(){return function DartObject(a){this.o=a}},"U9","zR",function(){return H.J(new U.hL(-1,0),[null])},"AW","Ao",function(){return H.J(new U.hL(1,0),[null])},"Go","SZ",function(){return H.J(new U.hL(0,-1),[null])},"qk","Gh",function(){return H.J(new U.hL(0,1),[null])},"L3","Ud",function(){return new A.Rx(C.XB,C.aN,C.EJ,C.as,C.eb,4294967295,!1,!1,5,!0,!0,!1,!1)},"IL","la",function(){return W.d9(16,16)},"wp","l3",function(){var z=$.la()
return(z&&C.p1).gZE(z)},"CY","E6",function(){return[]},"Jp","Kb",function(){return[]},"Af","Ra",function(){return[]},"KV","tz",function(){return[]},"KE","Of",function(){var z=W.lq().devicePixelRatio
return typeof z!=="number"?1:z},"H2","y8",function(){return J.mG(J.Tf($.LX().p(0,"navigator"),"isCocoonJS"),!0)},"iu","zI",function(){return Q.cz()},"br","fn",function(){return P.V(null,null,null,P.I,Q.JW)},"u0","kE",function(){return P.bK(null,null,!1,P.I)},"BY","xR",function(){var z=$.kE()
z.toString
return H.J(new P.Gm(z),[H.Kp(z,0)])}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["invocation","object","sender","e","x","closure","isolate","numberOfArguments","arg1","arg2","arg3","arg4","each","value",null,"error","stackTrace","_","theError","theStackTrace","ignored","element","arg","a","callback","captureThis","self","arguments","o","res","event","cursorName","contextEvent","frameTime","deltaTime","r"]
init.types=[{func:1},{func:1,void:true},{func:1,args:[,]},{func:1,args:[P.I,,]},{func:1,args:[,P.I]},{func:1,args:[P.I]},{func:1,args:[{func:1,void:true}]},{func:1,void:true,args:[,,]},{func:1,args:[P.a]},{func:1,void:true,args:[,],opt:[P.Gz]},{func:1,args:[,],opt:[,]},{func:1,ret:P.a2},{func:1,args:[,P.Gz]},{func:1,args:[,,]},{func:1,args:[P.wv,,]},{func:1,ret:P.I,args:[P.P]},{func:1,void:true,args:[W.XF]},{func:1,void:true,args:[W.OK]},{func:1,void:true,args:[W.J6]},{func:1,void:true,args:[W.yT]},{func:1,args:[P.Sl]},{func:1,void:true,args:[P.U]},{func:1,void:true,args:[{func:1,void:true}]},{func:1,void:true,args:[,]},{func:1,ret:P.a2,args:[,,]},{func:1,ret:P.P,args:[,]},{func:1,ret:P.a2,args:[P.a,P.a]},{func:1,ret:P.P,args:[P.a]},{func:1,ret:P.I,args:[W.D0]},{func:1,ret:P.a,args:[,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=Object.create(null)
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=Object.create(null)
init.leafTags=Object.create(null)
init.finishedClasses=Object.create(null)
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.ag(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.uL=a.uL
return Isolate}}!function(){function intern(a){var u={}
u[a]=1
return Object.keys(convertToFastObject(u))[0]}init.getIsolateTag=function(a){return intern("___dart_"+a+init.isolateTag)}
var z="___dart_isolate_tags_"
var y=Object[z]||(Object[z]=Object.create(null))
var x="_ZxYxX"
for(var w=0;;w++){var v=intern(x+"_"+w+"_")
if(!(v in y)){y[v]=1
init.isolateTag=v
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(document.currentScript){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.Rq(O.Zi(),b)},[])
else (function(b){H.Rq(O.Zi(),b)})([])})})()