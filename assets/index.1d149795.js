var e,t,a=Object.defineProperty,n=Object.defineProperties,r=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,l=(e,t,n)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,c=(e,t)=>{for(var a in t||(t={}))o.call(t,a)&&l(e,a,t[a]);if(s)for(var a of s(t))i.call(t,a)&&l(e,a,t[a]);return e},d=(e,t)=>n(e,r(t));import{r as u,j as m,u as h,_ as p,a as v,N as g,b as f,C as b,L as N,c as y,B as w,d as x,e as S,O as k,T as C,F as P,f as I,g as O,h as A,R as $,i as B,I as L,k as E,M as T,l as j,m as D,n as F,t as M,o as U,p as q,S as H,q as K,A as R,s as z,v as G,G as Y,w as J,x as V,P as Z,y as W,z as _,D as Q,E as X,H as ee,J as te,K as ae,Q as ne,U as re,V as se,W as oe,X as ie,Y as le,Z as ce,$ as de,a0 as ue,a1 as me,a2 as he,a3 as pe,a4 as ve,a5 as ge,a6 as fe,a7 as be,a8 as Ne,a9 as ye,aa as we}from"./vendor.b5e68304.js";(t=e||(e={}))[t.NotLoggedIn=0]="NotLoggedIn",t[t.LoggedIn=1]="LoggedIn",t[t.LoggedOut=2]="LoggedOut",t[t.Expired=3]="Expired",t[t.Banned=4]="Banned";const xe=u.exports.createContext(void 0);function Se(){return u.exports.useContext(xe)}function ke(e){const[t,a]=u.exports.useState(0);return m(xe.Provider,{value:{authStatus:t,setAuthStatus:a},children:e.children})}function Ce(e,t){return h("/api"+e,(async e=>{const t=await fetch(e);if(!t.ok)throw t;return t.json()}),t)}const Pe={"Content-type":"application/json; charset=UTF-8"};function Ie(e,t){return fetch("/api"+e,{method:"POST",body:t,headers:Pe})}function Oe(e,t){return fetch("/api"+e,{method:"PUT",body:t,headers:Pe})}function Ae(e,t){return fetch("/api"+e,{method:"DELETE",body:t,headers:Pe})}function $e(e,t){return fetch("/api"+e,{method:"PATCH",body:t,headers:Pe})}var Be,Le;function Ee(){const e=Ce("/users/check",{refreshInterval:1e4}),t=e.data&&!e.error?e.data.user_type===Be.admin:void 0;return c({isAdmin:t},e)}function Te(){var e,t,a,n,r,s;const o=Ce("/cart/"),i=o.data&&!o.error?p(o.data.books).map((e=>e.count)).sum():0;return c({books:null!=(t=o.error||null==(e=o.data)?void 0:e.books)?t:[],discount:null!=(n=o.error||null==(a=o.data)?void 0:a.discount)?n:0,total:null!=(s=o.error||null==(r=o.data)?void 0:r.total)?s:0,cartCount:i},o)}function je({active:e}){var t,a;const{cartCount:n}=Te(),r=null!=(t=Ee().isAdmin)&&t,s=null!=(a=v().params.keyword)?a:"";return m(g,{bg:"white",expand:"lg",className:"shadow-sm fixed-top",children:f(b,{children:[m(g.Brand,{className:"fw-bolder",as:N,to:"/home",children:"Book Store"}),m(g.Toggle,{"aria-controls":"basic-navbar-nav"}),f(g.Collapse,{id:"basic-navbar-nav",children:[f(y,{className:"me-auto",children:[m(y.Link,{as:N,to:"/home",active:"home"===e||"detail"===e||"search"===e,children:"Books"}),m(y.Link,{as:N,to:"/checkout",active:"cart"===e,children:f("div",{className:"d-flex align-items-center",children:[m("span",{className:"me-1",children:"My Cart"}),m(w,{children:m(x,{bg:0===n?"secondary":"danger",pill:!0,children:n})})]})}),m(y.Link,{as:N,to:"/orders",active:"orders"===e,children:"My Orders"}),m(De,{})]}),m(Fe,{initial:s}),r?m(Me,{active:e}):null]})]})})}function De(){var t;const{setAuthStatus:a}=Se(),n=S(),{data:r,revalidate:s}=Ee();return m(k,{overlay:m(C,{id:"signout-tooltip",children:"Click to sign out"}),placement:"auto",children:f(y.Link,{onClick:async()=>{await Ie("/users/logout"),await s(),a(e.LoggedOut),n.push("/login")},children:[m("span",{children:"Hi, "}),m("span",{className:"fw-bold",children:null!=(t=null==r?void 0:r.username)?t:"???"})]})})}function Fe({initial:e=""}){const t=u.exports.useRef(null),a=S();return f(P,{className:"d-flex mb-2 mb-lg-0",onSubmit:()=>{const e=t.current.value;e.length>0&&a.push(`/search/${e}`)},children:[m(I,{className:"form-control me-2",type:"search",placeholder:"Search Books...",defaultValue:e,ref:t}),m(O,{variant:"outline-secondary",type:"submit",children:"Search"})]})}function Me({active:e}){return m("div",{className:"ms-lg-2 d-flex",children:m(O,"dashboard"===e?{as:N,to:"/home",variant:"success",className:"w-100",children:"Book Store"}:{as:N,to:"/dashboard",variant:"primary",className:"w-100",children:"Dashboard"})})}function Ue({py:e=4,children:t}){return m("main",{className:`py-${e} container`,children:t})}function qe(e){return m("div",{className:"store-home",children:e.children})}function He({book:e,count:t}){const a=`/detail/${e.id}`,{revalidate:n}=Te();return m(A.Item,{as:N,to:a,style:{color:"inherit",textDecoration:"inherit"},action:!0,children:f($,{className:"d-flex justify-content-between",children:[m(B,{xs:3,children:m(L,{src:e.image,fluid:!0})}),f(B,{className:"d-flex align-items-center",children:[f("div",{className:"me-auto",children:[m("h6",{className:"mb-0",children:e.name}),m("small",{className:"text-muted",children:e.author})]}),f("div",{className:"me-3",children:[f("span",{className:"h5",children:["¥",e.price]}),t>1?f("span",{className:"text-muted",children:[" x",t]}):null]}),m(x,{pill:!0,as:O,variant:"danger",onClick:async t=>{var a;t.preventDefault(),await(a=e.id.toString(),Ae(`/cart/${a}`)),await n()},children:"—"})]})]})})}function Ke({title:e,value:t}){const a="Discount"===e?"text-danger":"fw-bold",n="Discount"===e?"-¥":"¥";return m(A.Item,{children:f("div",{className:"d-flex justify-content-between align-items-center",children:[m("div",{children:m("span",{className:"h6",children:e})}),m("div",{children:f("span",{className:`h5 ${a}`,children:[n,t.toFixed(2)]})})]})})}function Re(){const{books:e,cartCount:t,discount:a,total:n,revalidate:r}=Te(),s=p(e).map((e=>m(He,{book:e.book,count:e.count},e.book.id))).value();return f("div",{children:[f("h4",{className:"d-flex align-items-center mb-3",children:[m("span",{className:"text-muted me-2",children:"My cart"}),m(x,{pill:!0,bg:"secondary",className:"me-auto",children:t}),t>0?m(x,{pill:!0,as:O,variant:"danger",onClick:async()=>{await Ae("/cart/"),await r()},children:"Clear"}):null]}),f("ul",{className:"list-group mb-3",children:[s,m(Ke,{title:"Discount",value:a}),m(Ke,{title:"Total",value:n})]})]})}(Le=Be||(Be={})).admin="admin",Le.normal="normal";const ze=u.exports.createContext(null);function Ge({name:e,children:t}){const{selected:a,setSelected:n}=u.exports.useContext(ze);return m("button",{onClick:()=>n(e),className:"list-group-item list-group-item-action "+(a===e?"active":""),children:f("div",{className:"d-flex w-100 justify-content-between align-items-center",children:[m("span",{children:e}),t]})})}function Ye(){return m("div",{className:"col",children:f("div",{className:"row gy-2",children:[f("div",{className:"col-md-6",children:[m("label",{htmlFor:"cc-name",className:"form-label",children:"Name on card"}),m("input",{type:"text",className:"form-control",id:"cc-name",placeholder:"",required:!0})]}),f("div",{className:"col-md-6",children:[m("label",{htmlFor:"cc-number",className:"form-label",children:"Card number"}),m("input",{type:"text",className:"form-control",id:"cc-number",placeholder:"",required:!0})]}),f("div",{className:"col-md-6",children:[m("label",{htmlFor:"cc-expiration",className:"form-label",children:"Expiration"}),m("input",{type:"text",className:"form-control",id:"cc-expiration",placeholder:"",required:!0})]}),f("div",{className:"col-md-6",children:[m("label",{htmlFor:"cc-cvv",className:"form-label",children:"CVV"}),m("input",{type:"text",className:"form-control",id:"cc-cvv",placeholder:"",required:!0})]})]})})}function Je(){const[e,t]=u.exports.useState("Credit card");return m(ze.Provider,{value:{selected:e,setSelected:t},children:f("div",{children:[m("h4",{className:"mb-3",children:"Payment"}),f("div",{className:"row gy-2",children:[m("div",{className:"col-lg-5 col-xxl-4",children:f("div",{className:"list-group",children:[m(Ge,{name:"PayPal"}),m(Ge,{name:"WeChat Pay",children:m("span",{className:"badge bg-success rounded-pill",children:"Recommended"})}),m(Ge,{name:"Alipay"}),m(Ge,{name:"Credit card",children:m("span",{className:"badge bg-secondary rounded-pill",children:"Last used"})})]})}),"Credit card"===e?m(Ye,{}):f("div",{className:"col",children:["You'll be redirected to ",e,' after clicking "Checkout".']})]})]})})}const Ve=u.exports.createContext(void 0);function Ze({address:e}){var t;const a="Default"===e.tag?"bg-secondary":"bg-success",{selected:n,setSelected:r}=u.exports.useContext(Ve);return f("button",{onClick:()=>r(e),className:"list-group-item list-group-item-action "+((null!=(t=null==n?void 0:n.id)?t:0)===e.id?"active":""),children:[f("div",{className:"d-flex w-100 justify-content-between align-items-center",children:[m("h5",{className:"mb-1",children:e.name}),m("span",{className:`badge ${a} rounded-pill`,children:e.tag})]}),m("p",{className:"mb-0 small",children:e.phone}),m("p",{className:"mb-0",children:e.address})]})}function We(){const{modalShow:e,setModalShow:t}=u.exports.useContext(Ve),{register:a,handleSubmit:n}=E();return f(T,{show:e,size:"lg",onHide:()=>t(!1),backdrop:"static",centered:!0,children:[m(T.Header,{closeButton:!0,children:m(T.Title,{children:"Add a New Address"})}),m(T.Body,{children:f(P,{onSubmit:n((e=>{alert(JSON.stringify(e)),t(!1)})),id:"add-new-address-form",children:[f(P.Group,{as:$,className:"mb-3",children:[m(P.Label,{column:!0,sm:3,children:"Name"}),m(B,{sm:9,children:m(P.Control,c({placeholder:"Enter full name",required:!0},a("name")))})]}),f(P.Group,{as:$,className:"mb-3",children:[m(P.Label,{column:!0,sm:3,children:"Phone Number"}),m(B,{sm:9,children:m(P.Control,c({placeholder:"Enter phone number",required:!0},a("phone")))})]}),f(P.Group,{as:$,className:"mb-3",children:[m(P.Label,{column:!0,sm:3,children:"Address"}),m(B,{sm:9,children:m(P.Control,c({as:"textarea",placeholder:"Enter address",required:!0},a("address")))})]}),m(P.Group,{className:"mb-3",children:m(P.Check,{type:"checkbox",label:"Set as default",id:"set-as-default"})})]})}),m(T.Footer,{children:m(O,{variant:"primary",type:"submit",form:"add-new-address-form",children:"Confirm"})})]})}function _e(){const{setModalShow:e}=u.exports.useContext(Ve);return m(j,{children:m("button",{className:"list-group-item list-group-item-action",onClick:()=>e(!0),children:m("span",{className:"text-muted",children:"Add a new address..."})})})}function Qe(){const[e,t]=u.exports.useState(),[a,n]=u.exports.useState(!1);return m(Ve.Provider,{value:{selected:e,setSelected:t,modalShow:a,setModalShow:n},children:f("div",{children:[m("h4",{className:"mb-3",children:"Shipping Address"}),m("div",{children:f("div",{className:"list-group",children:[m(Ze,{address:{id:0,name:"Bugen Zhao",tag:"Default",phone:"+86 155 2121 2121",address:"1234 Main St., Minhang, Shanghai, China"}}),m(Ze,{address:{id:1,name:"Alice Cook",tag:"Home",phone:"+1 802 812 3456",address:"4321 Home St., Cupertino, CA, United States"}}),m(Ze,{address:{id:2,name:"Dave Jobs",tag:"School",phone:"+86 188 1234 5678",address:"9876 School St., Shanghai, China"}}),m(_e,{}),m(We,{})]})})]})})}function Xe(){const{cartCount:e,revalidate:t}=Te(),[a,n]=u.exports.useState("no"),[r,s]=u.exports.useState(!1),o=0===e;return f("div",{children:[f(T,{show:"no"!==a,onHide:()=>{n("no"),s(!1)},children:[m(T.Header,{closeButton:!0,children:m(T.Title,{children:"success"===a?"Checkout Success":"Checkout Failed"})}),m(T.Body,{children:"success"===a?f(j,{children:["Go to ",m(N,{to:"/orders",children:"My Orders"})," to check the order."]}):"There is not enough stock of some books in your cart."})]}),f("div",{className:"row",children:[m("div",{className:"col-md-6 col-lg-5 order-md-last",children:m(Re,{})}),f("div",{className:"col-md-6 col-lg-7",children:[m(Qe,{}),m("hr",{className:"my-4"}),m(Je,{}),m("hr",{className:"my-4"}),m("div",{className:"d-flex justify-content-end",children:m(k,{overlay:m(C,{id:"no-book-tooltip",children:"There's no book in the cart"}),placement:"bottom",show:o,children:m("button",{className:"btn btn-primary btn-lg col-12 col-lg-3",type:"submit",disabled:r||o,onClick:async()=>{s(!0);const e=await Ie("/cart/checkout");await t(),e.ok?n("success"):n("failed"),s(!1)},children:r?"Processing...":"Checkout"})})})]})]})]})}function et(){return f(qe,{children:[m(je,{active:"cart"}),m(Ue,{py:5,children:m(D,{children:m(Xe,{})})})]})}function tt({book:e,withLink:t=!0}){const a=`/detail/${e.id}`;return f(F,{children:[t?m(F.Link,{className:"stretched-link",as:N,to:a}):null,m(F.Img,{variant:"top",src:e.image}),f(F.Body,{children:[m(F.Title,{className:"text-truncate",children:e.name}),f("div",{className:"d-flex justify-content-between align-items-center",children:[f(F.Subtitle,{className:"text-danger",as:"h6",children:["¥",e.price]}),m(F.Subtitle,{className:"text-muted",as:"small",children:e.inventory})]})]})]})}function at({book:e}){const{revalidate:t}=Te();return f("div",{className:"d-flex flex-column justify-content-between",style:{height:"100%"},children:[f("div",{children:[m("h1",{className:"h2 my-3",children:e.name}),m("div",{className:"mb-3",children:f("dl",{className:"row",children:[m("dt",{className:"col-sm-3",children:"Author"}),m("dd",{className:"col-sm-9",children:e.author}),m("dt",{className:"col-sm-3",children:"Press"}),m("dd",{className:"col-sm-9",children:"Unknown Press"}),m("dt",{className:"col-sm-3",children:"ISBN"}),m("dd",{className:"col-sm-9",children:e.isbn}),m("dt",{className:"col-sm-3",children:"Category"}),m("dd",{className:"col-sm-9",children:e.type}),m("dt",{className:"col-sm-3",children:"Stock"}),m("dd",{className:M("col-sm-9",{"text-danger":0===e.inventory}),children:e.inventory}),m("dt",{className:"col-sm-3",children:"Price"}),f("dd",{className:"col-sm-9 text-danger fw-bold",children:["¥",e.price]}),m("dt",{className:"col-sm-3",children:"Introduction"}),m("dd",{className:"col-sm-9",children:e.description})]})})]}),m("div",{className:"my-3",children:m("div",{className:"d-flex justify-content-end",children:f(U,{className:"col-12 col-xl-6 col-lg-8",size:"lg",children:[m(O,{variant:"outline-danger",className:"w-100",disabled:0===e.inventory,onClick:async()=>{var a;await(a=e.id.toString(),Oe(`/cart/${a}`)),await t()},children:"Add to Cart"}),m(O,{variant:"outline-danger",className:"w-100",as:N,to:"/checkout",children:"Checkout"})]})})})]})}function nt(e){return Object.entries(e).map((e=>e.map(encodeURIComponent).join("="))).join("&")}const rt=()=>q().subtract(q.duration(7,"days")),st=()=>q();function ot(e){var t,a;const n=Ce("/books/?"+nt(e));return c({books:n.error||null==(t=n.data)?void 0:t.data,total:n.error||null==(a=n.data)?void 0:a.total},n)}function it(e,t){var a,n;const r=Ce(`/books/search/${e}?`+nt(t));return c({books:r.error||null==(a=r.data)?void 0:a.data,total:r.error||null==(n=r.data)?void 0:n.total},r)}function lt(e){const t=e.match.params.id;return f(qe,{children:[m(je,{active:"detail"}),m(Ue,{py:5,children:m(ct,{id:t})})]})}function ct({id:e}){const{book:t}=function(e){const t=Ce(`/books/id/${e}`);return c({book:t.error?void 0:t.data},t)}(e);return f("div",t?{children:[m(dt,{name:t.name}),m(D,{children:f($,{children:[m("div",{className:"col-md-5 col-lg-4 align-self-center",children:m(tt,{book:t,withLink:!1})}),m("div",{className:"col-md-7 col-lg-8",children:m(at,{book:t})})]})})]}:{children:[m(dt,{}),m($,{className:"justify-content-center mt-5",children:m(H,{animation:"border",variant:"primary"})})]})}function dt({name:e}){const t=S();return m("nav",{children:f("ol",{className:"breadcrumb h6",children:[m("li",{className:"breadcrumb-item",children:m(N,{to:"#",className:"",onClick:()=>t.goBack(),children:"⬅ Go Back"})}),m("li",e?{className:"breadcrumb-item active",children:e}:{className:"breadcrumb-item",children:"..."})]})})}function ut(){const e=function(){var e;const t=Ce("/carousels/");return c({carousels:null!=(e=t.error?void 0:t.data)?e:[]},t)}().carousels.map((e=>function(e){return m(K.Item,{children:m("img",{className:"d-block w-100",src:e,alt:e})},e)}(e)));return m(D,{triggerOnce:!0,children:m(K,{className:"mb-4",fade:!0,children:e})})}function mt(){const{page:e,keyword:t}=v().params;return{page:parseInt(null!=e?e:"",10)||1,keyword:t}}function ht(){const{total:e,pathBase:t}=u.exports.useContext(vt),{page:a}=mt(),n=S(),r=Math.ceil(e/12),s=e=>{n.push(t+`/${e}`)},o=p(p.range(1,r+1)).map((e=>m("li",{className:"page-item "+(e===a?"active":""),children:m("button",{className:"page-link",onClick:()=>s(e),children:e})},e))).value();return m("div",{className:"py-5",id:"footer",children:m("nav",{children:f("ul",{className:"pagination justify-content-center",children:[m("li",{className:M("page-item",1===a?"disabled":void 0),children:m("button",{className:"page-link",onClick:()=>s(a-1),children:"Previous"})}),o,m("li",{className:M("page-item",a===r?"disabled":void 0),children:m("button",{className:"page-link",onClick:()=>s(a+1),children:"Next"})})]})})})}function pt({useBooks:e}){const{setTotal:t}=u.exports.useContext(vt),{page:a}=mt(),{books:n,total:r}=e({page:a-1,size:12});if(u.exports.useEffect((()=>t(null!=r?r:0))),!n)return m($,{className:"justify-content-center mt-5",children:m(H,{animation:"border",variant:"primary"})});const s=(null!=n?n:[]).map((e=>m("div",{className:"col",children:m(tt,{book:e,withLink:!0})},`book${e.id}`)));return m("div",{className:"row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3",id:"books",children:m(D,{cascade:!0,damping:.025,triggerOnce:!0,children:s})})}const vt=u.exports.createContext(null);function gt({type:e}){const[t,a]=u.exports.useState(0),{keyword:n}=mt(),{pathBase:r,useBooks:s}=(()=>{switch(e){case"search":return{pathBase:`/search/${n}`,useBooks:p.curry(it)(null!=n?n:"")};case"home":return{pathBase:`/${e}`,useBooks:ot}}})();return m(vt.Provider,{value:{total:t,setTotal:a,pathBase:r},children:f("div",{children:[m(pt,{useBooks:s}),m(ht,{})]})})}function ft(){return f(qe,{children:[m(je,{active:"home"}),m(Ue,{children:m(bt,{})})]})}function bt(){return f("div",{children:[m(ut,{}),m(gt,{type:"home"})]})}function Nt({isSignIn:e}){const t=e=>e?"Sign in":"Sign up",a=t(e),n=t(!e),r=e?"/register":"/login";return m(j,{children:f("h1",{className:"mb-3",children:[m("span",{className:"h1 fw-bold",children:a}),m("span",{className:"h4",children:" / "}),m(N,{className:"h5 fw-bold text-muted",to:r,children:n})]})})}function yt({isSignIn:e,children:t,onSubmit:a,isProcessing:n}){return m(j,{children:m("main",{className:"form-signin",children:f(D,{children:[m(Nt,{isSignIn:e}),f("form",{onSubmit:a,children:[t,f(O,{className:"w-100 mt-3",variant:"dark",size:"lg",type:"submit",disabled:n,children:[n?"Signing ":"Sign ",e?"in":"up",n?"...":""]})]})]})})})}function wt(){const{authStatus:t,setAuthStatus:a}=Se(),{revalidate:n}=Ee(),r=S(),[s,o]=u.exports.useState(!1),[i,l]=u.exports.useState(!1),[d,h]=u.exports.useState(!1),[p,v]=u.exports.useState(!1),[g,b]=u.exports.useState(!1),{register:N,handleSubmit:y}=E({defaultValues:{username:"thunderboy",password:"reins1409"}});return u.exports.useEffect((()=>{o(t===e.LoggedOut),h(t===e.Banned),l(t===e.Expired);const a=setTimeout((()=>{h(!1),o(!1),l(!1)}),5e3);return()=>{clearTimeout(a)}}),[t]),f(j,{children:[m(R,{show:s,variant:"primary",className:"text-center h5",children:"You have signed out."}),m(R,{show:d,variant:"danger",className:"text-center h5",children:"Your account has been banned by administrators."}),m(R,{show:i,variant:"danger",className:"text-center h5",children:"Your session has expired. Please sign in again."}),f(yt,{isSignIn:!0,onSubmit:y((async t=>{v(!0),b(!1);const s=await function(e){return Ie("/users/login",JSON.stringify(e))}(t);await n(),v(!1),s.ok?(a(e.LoggedIn),r.push("/home")):403===s.status?a(e.Banned):(a(e.NotLoggedIn),b(!0))})),isProcessing:p,children:[m(k,{placement:"bottom-end",trigger:"focus",delay:300,overlay:m("div",{}),children:m(P.Control,c({className:"input-first",placeholder:"Username",autoComplete:"username",required:!0,autoFocus:!0,isInvalid:g},N("username")))}),m(P.Control,c({className:"input-last",placeholder:"Password",type:"password",required:!0,isInvalid:g},N("password"))),g?m(P.Control.Feedback,{type:"invalid",children:"Please try again."}):null,m(P.Switch,{className:"mt-3",label:"Remember me",defaultChecked:!0})]})]})}function xt(){return f(qe,{children:[m(je,{active:"search"}),m(Ue,{children:m(St,{})})]})}function St(){var e;const t=null!=(e=v().params.keyword)?e:"";return f("div",{children:[m("div",{className:"py-5",children:f("span",{className:"h1",children:['Search Results for "',t,'"']})}),m(gt,{type:"search"})]})}function kt({modalShow:e,setModalShow:t,title:a="Error",children:n}){return f(T,{show:e,onHide:()=>t(!1),backdrop:"static",centered:!0,children:[m(T.Header,{closeButton:!0,children:m(T.Title,{children:a})}),m(T.Body,{children:n}),m(T.Footer,{children:m(O,{variant:"primary",onClick:()=>t(!1),children:"OK"})})]})}function Ct(e){var t,a;const n=Ce("/admin/orders/?"+nt(e));return c({orders:n.error||null==(t=n.data)?void 0:t.data,total:n.error||null==(a=n.data)?void 0:a.total},n)}const Pt=({direction:e})=>m("asc"===e?z:G,{}),It=({onSort:e,children:t,direction:a})=>f(O,{variant:"light",onClick:()=>e({}),children:[m("span",{className:"fw-bold",children:t}),a&&m(Pt,{direction:a})]});function Ot({useData:e,cols:t,onCommitChanges:a,booleanCols:n,disableEditingCols:r=["id"],showAddCommand:s=!1,showEditCommand:o=!1,showDeleteCommand:i=!1}){const l=u.exports.useRef(r.map((e=>({columnName:e,editingEnabled:!1})))),[c,d]=u.exports.useState(0),{rows:h,total:p,revalidate:v}=e({page:c,size:20});return m("div",{className:"card",children:f(Y,{rows:h,columns:t,getRowId:e=>e.id,children:[m(J,{}),m(V,{}),m(Z,{currentPage:c,onCurrentPageChange:d,pageSize:20}),m(W,{totalCount:p}),m(_,{defaultSorting:[{columnName:"id",direction:"asc"}]}),m(Q,{}),m(Bt,{for:null!=n?n:[]}),m(X,{onCommitChanges:async e=>{await a(e),await v()},columnExtensions:l.current}),m(ee,{}),m(te,{showSortingControls:!0,sortLabelComponent:It}),m(ae,{}),m(ne,{showAddCommand:s,showEditCommand:o,showDeleteCommand:i}),m(re,{}),m(se,{}),m(oe,{})]})})}const At=({value:e})=>m(P.Check,{type:"checkbox",checked:e,disabled:!0}),$t=({value:e,onValueChange:t})=>m(P.Check,{type:"checkbox",defaultChecked:e,onChange:e=>t(e.target.checked)}),Bt=({for:e})=>m(ie,{formatterComponent:At,editorComponent:$t,for:e});function Lt(){const e=Te().revalidate,t=["id","isbn","name","type","author","price","description","inventory","image"].map((e=>({name:e,title:le(e)}))),[a,n]=u.exports.useState(!1),[r,s]=u.exports.useState();return f(j,{children:[m(kt,{modalShow:a,setModalShow:n,children:r?f(j,{children:[m("h5",{children:`Error occurred while processing "${r.url}":`}),m("p",{children:`${r.status} ${r.statusText}`})]}):null}),m(Ot,{showAddCommand:!0,showDeleteCommand:!0,showEditCommand:!0,useData:e=>{const{books:t,total:a,revalidate:n}=ot(e);return{rows:null!=t?t:[],total:null!=a?a:0,revalidate:n}},cols:t,onCommitChanges:async({added:t,changed:a,deleted:r})=>{let o=[];if(t){const e=p(t).map((e=>{return t=e,Oe("/admin/books/",JSON.stringify(t));var t})).value();o.push(...e)}if(a){const e=p(a).entries().filter((([e,t])=>!!t)).map((([e,t])=>function(e,t){return $e(`/admin/books/${e}`,JSON.stringify(t))}(e,t))).value();o.push(...e)}if(r){const e=p(r).map((e=>function(e){return Ae(`/admin/books/${e}`)}(e.toString()))).value();o.push(...e)}const i=(await Promise.all(o)).find((e=>!e.ok));s(i),n(!!i),await e()}})]})}function Et(){const[e,t]=u.exports.useState(!1),[a,n]=u.exports.useState();return f(j,{children:[m(kt,{modalShow:e,setModalShow:t,children:a?f(j,{children:[m("h5",{children:`Error occurred while processing "${a.url}":`}),m("p",{children:`${a.status} ${a.statusText}`})]}):null}),m(Ot,{showEditCommand:!0,useData:e=>{const{users:t,total:a,revalidate:n}=function(e){var t,a;const n=Ce("/admin/users/?"+nt(e));return c({users:n.error||null==(t=n.data)?void 0:t.data,total:n.error||null==(a=n.data)?void 0:a.total},n)}(e);return{rows:(null!=t?t:[]).map((e=>c({admin:e.type===Be.admin},e))),total:null!=a?a:0,revalidate:n}},cols:[{name:"id",title:"User ID"},{name:"username",title:"Username"},{name:"email",title:"Email"},{name:"admin",title:"Is Admin"},{name:"banned",title:"Is Banned"}],booleanCols:["admin","banned"],onCommitChanges:async({changed:e})=>{let a=[];if(e){const t=p(e).entries().filter((([e,t])=>!!t)).map((([e,t])=>function(e,t){return $e(`/admin/users/${e}`,JSON.stringify(t))}(e,c({type:void 0!==t.admin?t.admin?Be.admin:Be.normal:void 0},t)))).value();a.push(...t)}const r=(await Promise.all(a)).find((e=>!e.ok));n(r),t(!!r)}})]})}function Tt({value:e}){const t=q(e);return m(j,{children:t.format("YYYY-MM-DD HH:mm:ss")})}function jt({useOrders:e,showUser:t=!1}){const[a,n]=u.exports.useState(0),{orders:r,total:s}=e({page:a,size:20}),o=(null!=r?r:[]).map((e=>{var t,a;return c({userShow:`${null==(t=e.user)?void 0:t.username} [${null==(a=e.user)?void 0:a.id}]`},e)})),i=[{name:"id",title:"Order ID"},{name:"createdAt",title:"Created At"},{name:"items",title:"Items"},{name:"totalPrice",title:"Total"},{name:"consignee",title:"Consignee"},{name:"status",title:"Status"}];t&&i.splice(1,0,{name:"userShow",title:"User"});const l=[{columnName:"createdAt",predicate:(e,t)=>{if(!t.value)return!0;const a=t.value.split(/,|~/).map((e=>e.trim())),n=q(e);return 1===a.length?n.isSameOrAfter(a[0]):n.isSameOrAfter(a[0])&&n.isBefore(a[1])}},{columnName:"items",predicate:(e,t)=>{if(!t.value)return!0;return e.map((e=>e.book.name)).filter((e=>e.indexOf(t.value)>=0)).length>0}}];return m("div",{className:"card",children:f(Y,{rows:o,columns:i,getRowId:e=>e.id,children:[m(ce,{}),m(V,{columnExtensions:l}),m(Z,{currentPage:a,onCurrentPageChange:n,pageSize:20}),m(W,{totalCount:s}),m(_,{defaultSorting:[{columnName:"id",direction:"asc"}]}),m(Q,{}),m(ie,{formatterComponent:({value:e})=>{const t=e.map((({book:e,quantity:t})=>m($,{children:f(N,{to:`/detail/${e.id}`,className:"d-flex nav-link",children:[m("span",{className:"me-auto",children:e.name}),f("span",{className:"text-muted",children:["x",t]})]})},e.id)));return m(j,{children:t})},for:["items"]}),m(ie,{formatterComponent:Tt,for:["createdAt"]}),m(ee,{}),m(de,{defaultColumnWidths:[{columnName:"id",width:120},{columnName:"userShow",width:150},{columnName:"createdAt",width:280},{columnName:"items",width:350},{columnName:"totalPrice",width:100},{columnName:"consignee",width:150},{columnName:"status",width:100}]}),m(te,{showSortingControls:!0,sortLabelComponent:It}),m(ue,{}),m(oe,{})]})})}function Dt(){return m(jt,{useOrders:Ct,showUser:!0})}var Ft,Mt;function Ut({initial:e,onChange:t}){const[a,n]=u.exports.useState(e);return m(me,{selected:a.toDate(),onChange:e=>{n(q(null==e?void 0:e.toString())),t(q(null==e?void 0:e.toString()))},showTimeInput:!0,showTimeSelect:!0,dateFormat:"Pp"})}function qt({onChange:e}){const t=u.exports.useRef(rt()),a=u.exports.useRef(st()),n=()=>e({from:t.current,to:a.current});return u.exports.useEffect((()=>{n()})),f(P,{className:"mx-4 my-4",children:[f(P.Group,{as:$,className:"mb-2",controlId:"formFrom",children:[m(P.Label,{column:!0,md:"1",xs:"2",children:"From"}),m(B,{lg:"3",sm:"7",xs:"10",children:m(Ut,{initial:t.current,onChange:e=>{t.current=e,n()}})})]}),f(P.Group,{as:$,className:"mb-2",controlId:"formTo",children:[m(P.Label,{column:!0,md:"1",xs:"2",children:"To"}),m(B,{lg:"3",sm:"7",xs:"10",children:m(Ut,{initial:a.current,onChange:e=>{a.current=e,n()}})})]})]})}function Ht(){var e,t;const[a,n]=u.exports.useState(rt()),[r,s]=u.exports.useState(st()),{sales:o}=function(e,t){const a=Ce("/admin/stat/sales?"+nt({from:null==e?void 0:e.toISOString(),to:null==t?void 0:t.toISOString()}));return c({sales:a.error?void 0:a.data},a)}(a,r),i=S(),l=null!=(e=null==o?void 0:o.map((({book:e})=>e)))?e:[],d=null!=(t=null==o?void 0:o.map((({count:e})=>e)))?t:[],h={title:{text:"Sales Summary"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:l.map((e=>e.name)).reverse()},series:[{type:"bar",data:d.reverse()}]};return f(j,{children:[m(qt,{onChange:e=>{n(e.from),s(e.to)}}),m(he,{style:{height:60*l.length+80},option:h,onEvents:{click:e=>{const t=e.name,a=l.find((e=>e.name===t));a&&i.push(`/detail/${a.id}`)}}})]})}function Kt(){var e,t;const[a,n]=u.exports.useState(rt()),[r,s]=u.exports.useState(st()),{userSpendings:o}=function(e,t){const a=Ce("/admin/stat/spendings?"+nt({from:null==e?void 0:e.toISOString(),to:null==t?void 0:t.toISOString()}));return c({userSpendings:a.error?void 0:a.data},a)}(a,r),i=null!=(e=null==o?void 0:o.map((e=>e.user)))?e:[],l=null!=(t=null==o?void 0:o.map((e=>e.spending)))?t:[],d={title:{text:"User Spendings Summary"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:i.map((e=>`${e.username} [${e.id}]`)).reverse()},series:[{type:"bar",data:l.reverse()}],responsive:!0};return f(j,{children:[m(qt,{onChange:e=>{n(e.from),s(e.to)}}),m(he,{style:{height:60*i.length+80},option:d})]})}function Rt(){return f(qe,{children:[m(je,{active:"dashboard"}),m(Ue,{children:m(zt,{})})]})}function zt(){var e;const t=null!=(e=v().params.tab)?e:"books",a=S();return f("div",{children:[m("div",{className:"h1 mb-4",children:"Dashboard"}),f(pe,{activeKey:t,onSelect:e=>{const t=null!=e?e:"books";a.replace(`/dashboard/${t}`)},className:"mb-3",children:[m(ve,{eventKey:"books",title:"Books",children:m(Lt,{})}),m(ve,{eventKey:"users",title:"Users",children:m(Et,{})}),m(ve,{eventKey:"orders",title:"Orders",children:m(Dt,{})}),m(ve,{eventKey:"sales",title:"Sales",children:m(Ht,{})}),m(ve,{eventKey:"spendings",title:"User Spendings",children:m(Kt,{})})]})]})}function Gt(){var t,a,n;const{setAuthStatus:r}=Se(),{revalidate:s}=Ee(),o=S(),[i,l]=u.exports.useState(!1),[d,h]=u.exports.useState(!1),{register:p,handleSubmit:v,watch:g,formState:{errors:b}}=E(),N=g("password");return m(j,{children:f(yt,{isSignIn:!1,onSubmit:v((async t=>{l(!0);const a=await function(e){return Ie("/users/register",JSON.stringify(e))}({username:t.username,email:t.email,password:t.password});await s(),l(!1),a.ok?(r(e.LoggedIn),o.push("/home")):h(!0)})),isProcessing:i,children:[m(P.Control,c({className:"input-first",placeholder:"Username",autoComplete:"username",required:!0,isInvalid:d},p("username"))),m(P.Control,c({className:"input-mid",placeholder:"Email",autoComplete:"email",required:!0,isInvalid:!!b.email},p("email",{pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Please provide a valid email address."}}))),m(P.Control.Feedback,{type:"invalid",children:null==(t=b.email)?void 0:t.message}),m(P.Control,c({className:"input-mid",placeholder:"Password",type:"password",autoComplete:"new-password",required:!0,isInvalid:!!b.password},p("password",{minLength:{value:4,message:"Password must have at least 4 characters."}}))),m(P.Control.Feedback,{type:"invalid",children:null==(a=b.password)?void 0:a.message}),m(P.Control,c({className:"input-last",placeholder:"Confirm Password",type:"password",autoComplete:"new-password",required:!0,isInvalid:!!b.confirmPassword},p("confirmPassword",{validate:e=>e===N||"The passwords do not match."}))),m(P.Control.Feedback,{type:"invalid",children:null==(n=b.confirmPassword)?void 0:n.message}),d?m(P.Control.Feedback,{type:"invalid",children:"Please try again."}):null,m(P.Check,{type:"checkbox",className:"mt-3",label:"Agree to terms and privacy policy",id:"accept-privacy-policy",defaultChecked:!0})]})})}function Yt(e){var t,a;const n=Ce("/orders/?"+nt(e));return c({orders:n.error||null==(t=n.data)?void 0:t.data,total:n.error||null==(a=n.data)?void 0:a.total},n)}function Jt(){var e,t;const[a,n]=u.exports.useState(rt()),[r,s]=u.exports.useState(st()),{summary:o}=function(e,t){const a=Ce("/stat/summary?"+nt({from:null==e?void 0:e.toISOString(),to:null==t?void 0:t.toISOString()}));return c({summary:a.error?void 0:a.data},a)}(a,r),i=S(),l=null!=(e=null==o?void 0:o.books)?e:[],d={title:{text:`${p(l).map((({count:e})=>e)).sum()} books, ¥${null!=(t=null==o?void 0:o.total)?t:0} in total`},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:l.map((({book:e})=>e.name)).reverse()},series:[{type:"bar",data:l.map((({count:e})=>e)).reverse()}]};return f(j,{children:[m(qt,{onChange:e=>{n(e.from),s(e.to)}}),m(he,{style:{height:60*l.length+80},option:d,onEvents:{click:e=>{var t;const a=e.name,n=null==(t=l.find((({book:e})=>e.name===a)))?void 0:t.book;n&&i.push(`/detail/${n.id}`)}}})]})}function Vt(){return f(qe,{children:[m(je,{active:"orders"}),m(Ue,{children:m(Zt,{})})]})}function Zt(){var e;const t=null!=(e=v().params.tab)?e:"all",a=S();return f(j,{children:[m("div",{className:"h1 mb-4",children:"My Orders"}),f(pe,{activeKey:t,onSelect:e=>{const t=null!=e?e:"books";a.replace(`/orders/${t}`)},className:"mb-3",children:[m(ve,{eventKey:"all",title:"All Orders",children:m(Wt,{})}),m(ve,{eventKey:"summary",title:"Summary",children:m(Jt,{})})]})]})}function Wt(){return m(jt,{useOrders:Yt})}function _t(t){const{error:a}=Ee(),{authStatus:n,setAuthStatus:r}=Se();return u.exports.useEffect((()=>{n===e.LoggedIn&&a&&r(e.Expired)})),a?m(Ne,{to:"/login"}):m(be,d(c({},t),{children:t.children}))}function Qt(e){const{isAdmin:t,error:a}=Ee();return a||!1===t?m(Ne,{to:"/home"}):m(be,d(c({},e),{children:e.children}))}function Xt(){return m(ge,{children:f(fe,{children:[m(be,{exact:!0,path:"/",children:m(Ne,{to:"/home"})}),m(be,{path:"/login",component:wt}),m(be,{path:"/register",component:Gt}),m(_t,{path:"/checkout",component:et}),m(_t,{path:"/detail/:id",component:lt}),m(_t,{path:"/home/:page?",component:ft}),m(_t,{path:"/search/:keyword/:page?",component:xt}),m(_t,{path:"/orders/:tab?",component:Vt}),m(Qt,{path:"/dashboard/:tab?",component:Rt})]})})}function ea(){return m(ke,{children:m(Xt,{})})}(Mt=Ft||(Ft={})).submitted="submitted",Mt.shipped="shipped",Mt.delivered="delivered",Mt.cancelled="cancelled";ye.render(m(we.StrictMode,{children:m(ea,{})}),document.getElementById("root"));
