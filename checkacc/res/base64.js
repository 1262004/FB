/*! js-methods (https://github.com/harrydeluxe/js-methods) */
(function(){function g(d,b){String.prototype[d]||(String.prototype[d]=b)}g("decodeBase64",function(){if(0==this.length%4){if("undefined"!=typeof atob)return atob(this);for(var d,b=Array(this.length/4),a=0;a<this.length;a+=4)d=("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(this.charAt(a))&255)<<18|("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(this.charAt(a+1))&255)<<12|("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(this.charAt(a+
2))&255)<<6|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(this.charAt(a+3))&255,b[a]=String.fromCharCode((d&16711680)>>16,(d&65280)>>8,d&255);b[b.length-1]=b[b.length-1].substring(0,3-(61==this.charCodeAt(a-2)?2:61==this.charCodeAt(a-1)?1:0));return b.join("")}throw Error("String length must be divisible by 4.");});g("encodeBase64",function(){if("undefined"!=typeof btoa)return btoa(this);var d="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,+,/".split(","),
b,a=0,c=""+this;1==c.length%3?(c+=String.fromCharCode(0),c+=String.fromCharCode(0),a=2):2==c.length%3&&(c+=String.fromCharCode(0),a=1);for(var e=Array(c.length/3),g=0,f=0;f<c.length;f+=3)b=(c.charCodeAt(f)&255)<<16|(c.charCodeAt(f+1)&255)<<8|c.charCodeAt(f+2)&255,e[g]=d[b>>18&63]+d[b>>12&63]+d[b>>6&63]+d[b&63],g++;0<a&&(e[e.length-1]=e[e.length-1].substr(0,4-a)+(2==a?"==":1==a?"=":""));return e.join("")})})();