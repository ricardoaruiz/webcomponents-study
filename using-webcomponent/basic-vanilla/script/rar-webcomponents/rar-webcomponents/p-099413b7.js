let e,t,n=!1;const l="undefined"!=typeof window?window:{},s=l.document||{head:{}},o={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},i=e=>Promise.resolve(e),c=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),r=(e,t,n)=>{n&&n.map((([n,l,s])=>{const i=a(e,n),c=u(t,s),r=f(n);o.ael(i,l,c,r),(t.o=t.o||[]).push((()=>o.rel(i,l,c,r)))}))},u=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){J(e)}},a=(e,t)=>16&t?s.body:e,f=e=>0!=(2&e),$=new WeakMap,h=e=>"sc-"+e.$,y={},d=e=>"object"==(e=typeof e)||"function"===e,p=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1,c=[];const r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!d(l))&&(l+=""),o&&i?c[c.length-1].h+=l:c.push(o?m(null,l):l),i=o)};if(r(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}const u=m(e,null);return u.p=t,c.length>0&&(u.m=c),u.S=s,u},m=(e,t)=>({t:0,g:e,h:t,j:null,m:null,p:null,S:null}),b={},w=(e,t,n,s,i,c)=>{if(n!==s){let r=I(e,t),u=t.toLowerCase();if("class"===t){const t=e.classList,l=g(n),o=g(s);t.remove(...l.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!l.includes(e))))}else if("key"===t);else if("ref"===t)s&&s(e);else if(r||"o"!==t[0]||"n"!==t[1]){const l=d(s);if((r||l&&null!==s)&&!i)try{if(e.tagName.includes("-"))e[t]=s;else{let l=null==s?"":s;"list"===t?r=!1:null!=n&&e[t]==l||(e[t]=l)}}catch(e){}null==s||!1===s?!1===s&&""!==e.getAttribute(t)||e.removeAttribute(t):(!r||4&c||i)&&!l&&e.setAttribute(t,s=!0===s?"":s)}else t="-"===t[2]?t.slice(3):I(l,u)?u.slice(2):u[2]+t.slice(3),n&&o.rel(e,t,n,!1),s&&o.ael(e,t,s,!1)}},S=/\s/,g=e=>e?e.split(S):[],j=(e,t,n,l)=>{const s=11===t.j.nodeType&&t.j.host?t.j.host:t.j,o=e&&e.p||y,i=t.p||y;for(l in o)l in i||w(s,l,o[l],void 0,n,t.t);for(l in i)w(s,l,o[l],i[l],n,t.t)},k=(t,n,l)=>{let o,i,c=n.m[l],r=0;if(null!==c.h)o=c.j=s.createTextNode(c.h);else if(o=c.j=s.createElement(c.g),j(null,c,!1),null!=e&&o["s-si"]!==e&&o.classList.add(o["s-si"]=e),c.m)for(r=0;r<c.m.length;++r)i=k(t,c,r),i&&o.appendChild(i);return o},v=(e,n,l,s,o,i)=>{let c,r=e;for(r.shadowRoot&&r.tagName===t&&(r=r.shadowRoot);o<=i;++o)s[o]&&(c=k(null,l,o),c&&(s[o].j=c,r.insertBefore(c,n)))},M=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.j,P(l),s.remove())},C=(e,t)=>e.g===t.g&&e.S===t.S,O=(e,t)=>{const n=t.j=e.j,l=e.m,s=t.m,o=t.h;null===o?("slot"===t.g||j(e,t,!1),null!==l&&null!==s?((e,t,n,l)=>{let s,o,i=0,c=0,r=0,u=0,a=t.length-1,f=t[0],$=t[a],h=l.length-1,y=l[0],d=l[h];for(;i<=a&&c<=h;)if(null==f)f=t[++i];else if(null==$)$=t[--a];else if(null==y)y=l[++c];else if(null==d)d=l[--h];else if(C(f,y))O(f,y),f=t[++i],y=l[++c];else if(C($,d))O($,d),$=t[--a],d=l[--h];else if(C(f,d))O(f,d),e.insertBefore(f.j,$.j.nextSibling),f=t[++i],d=l[--h];else if(C($,y))O($,y),e.insertBefore($.j,f.j),$=t[--a],y=l[++c];else{for(r=-1,u=i;u<=a;++u)if(t[u]&&null!==t[u].S&&t[u].S===y.S){r=u;break}r>=0?(o=t[r],o.g!==y.g?s=k(t&&t[c],n,r):(O(o,y),t[r]=void 0,s=o.j),y=l[++c]):(s=k(t&&t[c],n,c),y=l[++c]),s&&f.j.parentNode.insertBefore(s,f.j)}i>a?v(e,null==l[h+1]?null:l[h+1].j,n,l,c,h):c>h&&M(t,i,a)})(n,l,t,s):null!==s?(null!==e.h&&(n.textContent=""),v(n,null,t,s,0,s.length-1)):null!==l&&M(l,0,l.length-1)):e.h!==o&&(n.data=o)},P=e=>{e.p&&e.p.ref&&e.p.ref(null),e.m&&e.m.map(P)},x=(e,t,n)=>{const l=(e=>B(e).k)(e);return{emit:e=>E(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},E=(e,t,n)=>{const l=o.ce(t,n);return e.dispatchEvent(l),l},L=(e,t)=>{t&&!e.v&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.v=t)))},T=(e,t)=>{if(e.t|=16,!(4&e.t))return L(e,e.M),se((()=>W(e,t)));e.t|=512},W=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>q(n,e,t))),e.u=null),l=q(n,"componentWillLoad")),F(l,(()=>A(e,n,t)))},A=async(e,t,n)=>{const l=e.k,o=l["s-rc"];n&&(e=>{const t=e.C,n=e.k,l=t.t,o=((e,t)=>{let n=h(t),l=X.get(n);if(e=11===e.nodeType?e:s,l)if("string"==typeof l){let t,o=$.get(e=e.head||e);o||$.set(e,o=new Set),o.has(n)||(t=s.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"))})(e);H(e,t),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>R(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},H=(n,l)=>{try{l=l.render(),n.t&=-17,n.t|=2,((n,l)=>{const s=n.k,o=n.C,i=n.O||m(null,null),c=(e=>e&&e.g===b)(l)?l:p(null,null,l);t=s.tagName,o.P&&(c.p=c.p||{},o.P.map((([e,t])=>c.p[t]=s[e]))),c.g=null,c.t|=4,n.O=c,c.j=i.j=s.shadowRoot||s,e=s["s-sc"],O(i,c)})(n,l)}catch(e){J(e,n.k)}return null},R=e=>{const t=e.k,n=e.M;64&e.t||(e.t|=64,N(t),e.L(t),n||U()),e.v&&(e.v(),e.v=void 0),512&e.t&&le((()=>T(e,!1))),e.t&=-517},U=()=>{N(s.documentElement),le((()=>E(l,"appload",{detail:{namespace:"rar-webcomponents"}})))},q=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){J(e)}},F=(e,t)=>e&&e.then?e.then(t):t(),N=e=>e.classList.add("hydrated"),V=(e,t,n)=>{if(t.T){e.watchers&&(t.W=e.watchers);const l=Object.entries(t.T),s=e.prototype;if(l.map((([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(s,e,{get(){return((e,t)=>B(this).A.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=B(e),o=s.k,i=s.A.get(t),c=s.t,r=s.i;if(n=((e,t)=>null==e||d(e)?e:4&t?"false"!==e&&(""===e||!!e):1&t?e+"":e)(n,l.T[t][0]),!(8&c&&void 0!==i||n===i)&&(s.A.set(t,n),r)){if(l.W&&128&c){const e=l.W[t];e&&e.map((e=>{try{r[e](n,i,t)}catch(e){J(e,o)}}))}2==(18&c)&&T(s,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){o.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(s.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.P.push([e,s]),s}))}}return e},_=(e,t={})=>{const n=[],i=t.exclude||[],u=l.customElements,a=s.head,f=a.querySelector("meta[charset]"),$=s.createElement("style"),y=[];let d,p=!0;Object.assign(o,t),o.l=new URL(t.resourcesUrl||"./",s.baseURI).href,e.map((e=>{e[1].map((t=>{const l={t:t[0],$:t[1],T:t[2],H:t[3]};l.T=t[2],l.H=t[3],l.P=[],l.W={};const s=l.$,a=class extends HTMLElement{constructor(e){super(e),G(e=this,l),1&l.t&&e.attachShadow({mode:"open"})}connectedCallback(){d&&(clearTimeout(d),d=null),p?y.push(this):o.jmp((()=>(e=>{if(0==(1&o.t)){const t=B(e),n=t.C,l=()=>{};if(1&t.t)r(e,t,n.H);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){L(t,t.M=n);break}}n.T&&Object.entries(n.T).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=Q(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.W=s.watchers,V(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){J(e)}t.t&=-9,t.t|=128,e()}if(s.style){let e=s.style;const t=h(n);if(!X.has(t)){const l=()=>{};((e,t,n)=>{let l=X.get(e);c&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,X.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.M,i=()=>T(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){o.jmp((()=>(()=>{if(0==(1&o.t)){const e=B(this);e.o&&(e.o.map((e=>e())),e.o=void 0)}})()))}componentOnReady(){return B(this).R}};l.U=e[0],i.includes(s)||u.get(s)||(n.push(s),u.define(s,V(a,l,1)))}))})),$.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",$.setAttribute("data-styles",""),a.insertBefore($,f?f.nextSibling:a.firstChild),p=!1,y.length?y.map((e=>e.connectedCallback())):o.jmp((()=>d=setTimeout(U,30)))},z=new WeakMap,B=e=>z.get(e),D=(e,t)=>z.set(t.i=e,t),G=(e,t)=>{const n={t:0,k:e,C:t,A:new Map};return n.R=new Promise((e=>n.L=e)),e["s-p"]=[],e["s-rc"]=[],r(e,n,t.H),z.set(e,n)},I=(e,t)=>t in e,J=(e,t)=>(0,console.error)(e,t),K=new Map,Q=e=>{const t=e.$.replace(/-/g,"_"),n=e.U,l=K.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(K.set(n,e),e[t])),J)},X=new Map,Y=[],Z=[],ee=(e,t)=>l=>{e.push(l),n||(n=!0,t&&4&o.t?le(ne):o.raf(ne))},te=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){J(e)}e.length=0},ne=()=>{te(Y),te(Z),(n=Y.length>0)&&o.raf(ne)},le=e=>i().then(e),se=ee(Z,!0);export{b as H,_ as b,x as c,p as h,i as p,D as r}