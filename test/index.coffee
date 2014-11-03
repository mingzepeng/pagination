expect = require('chai').expect
Pagination = require '../pagination'

describe 'pagination construct test' , ->
	it 'should has a 10 pages by 100 rows,10 page size' , ->
		p = new Pagination 100 , 10
		expect(p).to.have.a.property('totalPage',10)

	it 'should has a 10 pages by 96 rows,10 page size' , ->
		p = new Pagination 96 , 10
		expect(p).to.have.a.property('totalPage',10)

	it 'should has a 10 pages by "96" rows,"10" page size' , ->
		p = new Pagination '96' , "10"
		expect(p).to.have.a.property('totalPage',10)

describe 'pagination get test' , ->
	it 'should has the 4th page number' , ->
		p = new Pagination 100 , 10
		o = p.get 4
		expect(o.pageNumber).to.equal 4

	it 'should has a correct result' , ->
		p = new Pagination 100 , 10
		o = p.get 5
		expect(o).to.deep.equal {
			pageNumber : 5
			pageSize : 10
			totalRow : 100
			totalPage : 10
			pages : ['&laquo;',1,2,3,4,5,6,7,8,9,10,'&raquo;']
			offset : 2
			omission  : '...'
			pre : '&laquo;'
			next : '&raquo;'
		}

describe 'pagination throw error' , ->
	p = new Pagination 100 , 10
	
	it 'should throw an error while pageNumber is higher than totalPage',  ->
		expect ->
			p.get 11
		.to.throw "pageNumber is higher than the totalPage"

	it 'should throw an error while pageNumber is lower than 1', ->
	   	expect ->
	   		p.get -1
	   	.to.throw "pageNumber must be higher than 0"
