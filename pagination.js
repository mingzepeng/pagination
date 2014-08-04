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

	function Pagination(totalRow,pageSize,config) {
		this.config = {
			offset : 2,
			omission : '...',
			pre : '&laquo;',
			next : '&raquo;'
		};
		this.totalRow = !isNaN(totalRow) ? parseInt(totalRow) : 0;   //总的行数
		this.pageSize = !isNaN(pageSize) ? parseInt(pageSize) : 10;  //一页数据的条数
		this.totalPage = Math.ceil(totalRow/pageSize);         //计算出总的页数
		this.setConfig(config);
		this.pageNumber = 1;									 //当前页
	}

	Pagination.prototype.generate = function(pageNumber){

		pageNumber = !isNaN(pageNumber) ? parseInt(pageNumber) : this.pageNumber ;
		if (pageNumber > this.totalPage) 
			throw new Error("pageNumber is higher than the totalPage");

		var o = this.config.offset,pages = [],i=0;

		//页数不为1，则插入pre
		if(pageNumber > 1) pages.push(this.config.pre);

		//对当前页前半部分进行判断
		if(pageNumber - 2 * o - 1 <= 1 ) {
			for (i = 1; i < pageNumber; i++) pages.push(i);
		}else{
			//期间页数太多,则添加省略号
			for (i = 1; i <= o; i++) pages.push(i);
			pages.push(this.config.omission);
			for (i = pageNumber - o; i < pageNumber; i++) pages.push(i);	
		}
		
		//插入当前页
		pages.push(pageNumber);
		
		//对当前页后半部分进行处理
		if(this.totalPage - pageNumber > 2 * o + 1 ){
			//期间页数太多,则添加省略号
			for (i = pageNumber+1; i <= pageNumber + o; i++) pages.push(i);
			pages.push(this.config.omission);
			for (i = this.totalPage - o + 1; i <= this.totalPage; i++) pages.push(i);	
		}else{
			for (i = pageNumber+1; i <= this.totalPage; i++) pages.push(i);
		}

		//如果当前页数非最后一页,则插入next
		if(pageNumber < this.totalPage) pages.push(this.config.next);


		return {
			pageNumber : pageNumber,
			pageSize : this.pageSize,
			totalRow : this.totalRow,
			totalPage : this.totalPage,
			pages : pages,
			config : this.config
		};
	};

	Pagination.prototype.setConfig = function(key,value){
		if(Object(key) === key){
			for(var i in key) this.config[i] = key[i];
		}else if(key != undefined && value != undefined){
			this.config[key+ ''] = value;
		}
	};

	Pagination.prototype.getConfig = function(key){
		return key != undefined ? this.config[key+''] : this.config;
	};

	Pagination.generate = function(totalPage,pageNumber,config){
		var page = new Pagination(0,10,config);
		page.totalPage = totalPage;
		page.setConfig(config);
		return page.generate(pageNumber);
	};

	return Pagination; 
});