// Generated by CoffeeScript 1.7.1
(function() {
  var Pagination, expect;

  expect = require('chai').expect;

  Pagination = require('../pagination');

  describe('pagination construct test', function() {
    it('should has a 10 pages by 100 rows,10 page size', function() {
      var p;
      p = new Pagination(100, 10);
      return expect(p).to.have.a.property('totalPage', 10);
    });
    it('should has a 10 pages by 96 rows,10 page size', function() {
      var p;
      p = new Pagination(96, 10);
      return expect(p).to.have.a.property('totalPage', 10);
    });
    return it('should has a 10 pages by "96" rows,"10" page size', function() {
      var p;
      p = new Pagination('96', "10");
      return expect(p).to.have.a.property('totalPage', 10);
    });
  });

  describe('pagination get test', function() {
    it('should has the 4th page number', function() {
      var o, p;
      p = new Pagination(100, 10);
      o = p.get(4);
      return expect(o.pageNumber).to.equal(4);
    });
    return it('should has a correct result', function() {
      var o, p;
      p = new Pagination(100, 10);
      o = p.get(5);
      return expect(o).to.deep.equal({
        pageNumber: 5,
        pageSize: 10,
        totalRow: 100,
        totalPage: 10,
        pages: ['&laquo;', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '&raquo;'],
        offset: 2,
        omission: '...',
        pre: '&laquo;',
        next: '&raquo;'
      });
    });
  });

  describe('pagination throw error', function() {
    var p;
    p = new Pagination(100, 10);
    it('should throw an error while pageNumber is higher than totalPage', function() {
      return expect(function() {
        return p.get(11);
      }).to["throw"]("pageNumber is higher than the totalPage");
    });
    return it('should throw an error while pageNumber is lower than 1', function() {
      return expect(function() {
        return p.get(-1);
      }).to["throw"]("pageNumber must be higher than 0");
    });
  });

}).call(this);

//# sourceMappingURL=index.map