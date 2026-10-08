/* The source-based Chapter 7 review stays inside the private local edition. */
(function(){
  var local=typeof location!=='undefined'&&(location.protocol==='file:'||['localhost','127.0.0.1','[::1]'].indexOf(location.hostname)>=0);
  if(local&&typeof document.write==='function')document.write('<script src="js/content/exam2-chapter7.private.js"><\/script>');
})();
