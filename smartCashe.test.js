'use strict';

/* jshint ignore:start */
const
	SmartCache	= require('../smartCache'),
	expect		= require('chai').expect
	;

describe('Тестирование smartCache', () => {
	
	before(() => {
		this.cache = new SmartCache();
	});
	
	after(() => {
		delete this.cache;
	});
	
	describe('запуск тестов', () => {
		it('успешно!', () => {
			expect(true).to.be.true
		})
	});
	
	describe('тестирование исходных данных', () => {
		it('SmartCache должен быть классом', () => {
			expect(SmartCache).to.be.an('function')
		});
		
		it('Instance от SmartCache должен быть объектом', () => {
			expect(this.cache).to.be.an('object')
		});
		
		it('у Instance от SmartCache есть свойство data', () => {
			expect(this.cache).to.have.property('data')
		});
		
		it('у Instance от SmartCache нельзя менять свойство data', () => {
			expect(() => this.cache.data = [] ).to.throw(Error);
		});
		
		'set get toJSON fromJSON'.split(' ').forEach( method => {
			it( `Instance от SmartCache обладает методом ${method}`, () => {
				expect(this.cache).to.have.property(method).an('function')
			})
		})
		
	});
	
	describe('тестирование функционала', () => {
		
		before(() => {
			this.findKey		= [2, 4, 6, 8];
			this.outputKeys		= [1, 3, 5, 7];
			this.fakeOutputKeys	= [2, 4, 6, 8];
		});
		
		after(() => {
			delete this.findKey;
			delete this.outputKeys;
			delete this.fakeOutputKeys;
		});
		
		it('добавление новой пары ключ => значение', () => {
			this.cache.set( this.findKey, this.outputKeys );
			expect(this.cache.data).to.have.length(1);
		});
		
		it('получение значения по значению', () => {
			expect( this.cache.get( this.outputKeys ) ).to.equal( this.findKey )
		});
		
		it('получение false по фэйковому ключу', () => {
			expect( this.cache.get( this.fakeOutputKeys ) ).to.be.false
		});
		
		it('серилизация данных', () => {
			this.fromJSON = this.cache.toJSON();
			expect(this.fromJSON).to.be.an('string');
		});
		
		it('десерилизация данных', () => {
			this.cache.fromJSON(this.fromJSON);
			expect( this.cache.get( this.outputKeys ) ).to.deep.equal( this.findKey );
		})
		
	})
	
});

/* jshint ignore:end */
