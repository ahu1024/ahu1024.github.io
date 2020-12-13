
var THREEx	= THREEx 		|| {};
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
        width = document.getElementById('Tween').clientWidth;
        height = document.getElementById('Tween').clientHeight;

		renderer.setSize( width, height);
		camera.aspect	= width / height;
		camera.updateProjectionMatrix();
	};
	window.addEventListener('resize', callback, false);
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
};
