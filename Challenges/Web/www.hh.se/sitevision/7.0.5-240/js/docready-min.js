(function(g,b){function c(){if(!e){e=!0;for(var a=0;a<d.length;a++)d[a].fn.call(window,d[a].ctx);d=[]}}function h(){"complete"===document.readyState&&c()}b=b||window;var d=[],e=!1,f=!1;b[g||"docReady"]=function(a,b){if("function"!==typeof a)throw new TypeError("callback for docReady(fn) must be a function");e?setTimeout(function(){a(b)},1):(d.push({fn:a,ctx:b}),"complete"===document.readyState?setTimeout(c,1):f||(document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",
c,!1)):(document.attachEvent("onreadystatechange",h),window.attachEvent("onload",c)),f=!0))}})("svDocReady",window);