var clone={
	deepCopy:function(obj){
		var newobj = {};
	    for ( var attr in obj) {
	        newobj[attr] = obj[attr];
	    }
	    return newobj;
	}
}

module.exports=clone
