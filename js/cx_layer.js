/**
 * 作者： zzl
 * 时间：2018-04-10
 */


/**
 * 弹出菜单（依赖jquery）
 * @param {IDString} zlayer 需要关闭层的id
 * @param {IDString} zbg 需要关闭的遮罩层id
 * @example closelayer('#zlayer','#zbg')
 * 
 */	
function closelayer(zlayer,zbg){
	var zlayer=zlayer,zbg=zbg;
	$(zlayer).show();
	$(zlayer).removeClass("fadeInUp");
	$(zlayer).addClass("fadeInDown");
	setTimeout(function() {
		$(zlayer).hide();
		if(zbg){
			$(zbg).hide();
		}
	}, 400);
}
/**
 * 关闭菜单（依赖jquery）
 * @param {IDString} zlayer 需要开启层的id
 * @param {IDString} zbg 需要开启的遮罩层id
 * @example openlayer('#zlayer','#zbg')
 * 
 */
function openlayer(zlayer,zbg) {
	var zlayer=zlayer,zbg=zbg;
	$(zlayer).show();
	if(zbg){
		$(zbg).show();
	}
	$(zlayer).removeClass("fadeInDown");
	$(zlayer).addClass("fadeInUp");
	setTimeout(function() {
		$(zlayer).show();
		if(zbg){
			$(zbg).show();
		}
	}, 500);
}

