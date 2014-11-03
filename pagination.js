/*
author : mingzepeng (mingzepeng@gmail.com)
github : https://github.com/mingzepeng/pagination
update : 2014.11.3
*/

(function(root, factory) {
	'use strict';
	if (typeof module !== 'undefined' && module.exports) { // CommonJS
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) { // AMD / RequireJS
		define(factory);
	} else {
		root.Pagination = factory.call(root);
	}
})(this, function() {
	'use strict';

	var defaults = {
		offset : 2,
		omission : '...',
		pre : '&laquo;',
		next : '&raquo;'		
	};

	function extend() {
		var len = arguments.length,o,i,tmp,k;
		if (len === 0){
			o = {};
		}else{
			o = arguments[0] || {};
			for (i = 1; i < len; i++) {
				tmp = arguments[i]
				if(Object(tmp) !== tmp) continue;
				for(var k in tmp){
					if (tmp.hasOwnProperty(k)) o[k] = tmp[k];
				};
			};
		}
		return o;
	}

	function Pagination(totalRow,pageSize,options) {
		this.totalRow = !isNaN(totalRow) ? parseInt(totalRow,10) : 0;   //总的行数
		this.pageSize = !isNaN(pageSize) ? parseInt(pageSize,10) : 10;  //一页数据的条数
		this.totalPage = Math.ceil(totalRow/pageSize);         //计算出总的页数
		this.options = extend({},defaults,options);
		this.pageNumber = 1;									 //当前页
	}

	Pagination.prototype.get = function(pageNumber){

		pageNumber = !isNaN(pageNumber) ? parseInt(pageNumber,10) : this.pageNumber ;
		if (pageNumber > this.totalPage) 
			throw new Error("pageNumber is higher than the totalPage");

		if (pageNumber < 1)
			throw new Error("pageNumber must be higher than 0");
		var offset = this.options.offset,pages = [],i=0;

		//页数不为1，则插入pre
		if(pageNumber > 1) pages.push(this.options.pre);

		//对当前页前半部分进行判断
		if(pageNumber - 2 * offset - 1 <= 1 ) {
			for (i = 1; i < pageNumber; i++) pages.push(i);
		}else{
			//期间页数太多,则添加省略号
			for (i = 1; i <= offset; i++) pages.push(i);
			pages.push(this.options.omission);
			for (i = pageNumber - offset; i < pageNumber; i++) pages.push(i);	
		}
		
		//插入当前页
		pages.push(pageNumber);
		
		//对当前页后半部分进行处理
		if(this.totalPage - pageNumber > 2 * offset + 1 ){
			//期间页数太多,则添加省略号
			for (i = pageNumber+1; i <= pageNumber + offset; i++) pages.push(i);
			pages.push(this.options.omission);
			for (i = this.totalPage - offset + 1; i <= this.totalPage; i++) pages.push(i);	
		}else{
			for (i = pageNumber+1; i <= this.totalPage; i++) pages.push(i);
		}

		//如果当前页数非最后一页,则插入next
		if(pageNumber < this.totalPage) pages.push(this.options.next);


		return extend({
			pageNumber : pageNumber,
			pageSize : this.pageSize,
			totalRow : this.totalRow,
			totalPage : this.totalPage,
			pages : pages
			// config : this.config
		},this.options);
	};

	Pagination.get = function(totalPage,pageNumber,options){
		var page = new Pagination(0,10,options);
		page.totalPage = totalPage;
		// page.setConfig(options);
		return page.get(pageNumber);
	};

	return Pagination; 
});
