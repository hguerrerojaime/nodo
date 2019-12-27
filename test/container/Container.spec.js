import { expect } from 'chai'
import { Container } from '../../src'
import { sleep } from '../testUtils'

describe('Container', () => {
  describe('#bind()', () => {
    it('should return an Foo type singleton', () => {
      class Foo {}
      const container = new Container()
      container.bind('foo').singleton(Foo)
      const foo = container.resolve('foo')
      expect(foo).to.be.an.instanceof(Foo)
    })

    it('should return an Foo type singleton with dependencies', () => {
      class Bar {}
      class Foo {
        static injectables = ['bar', 'dateFactory']

        constructor({ bar, dateFactory }) {
          this.bar = bar
          this.date = dateFactory()
        }
      }
      const container = new Container()
      container.bind('bar').singleton(Bar)
      container.bind('dateFactory').factory(() => {
        return () => new Date()
      })
      container.bind('foo').singleton(Foo)
      const foo = container.resolve('foo')
      expect(foo).to.be.an.instanceof(Foo)
      expect(foo.bar).to.be.an.instanceof(Bar)
      expect(foo.date).to.be.an.instanceof(Date)
    })

    it('should return an Foo type prototype', async () => {
      class Foo {
        constructor() {
          this.date = new Date()
        }
      }
      const container = new Container()
      container.bind('foo').prototype(Foo)
      const foo1 = container.resolve('foo')
      await sleep(5)
      const foo2 = container.resolve('foo')
      expect(foo1.date.getTime()).not.to.be.equal(foo2.date.getTime())
    })

    it('should return an Foo factory', async () => {
      class Foo {
        static injectables = ['x']

        constructor({ x }) {
          this.x = x
        }
      }
      const container = new Container()
      container.bind('fooFactory').factory(() => {
        return x => {
          return new Foo({ x })
        }
      })
      const fooFactory = container.resolve('fooFactory')
      const foo = fooFactory('bar')
      expect(foo.x).to.be.equal('bar')
    })

    it('should return an Foo factory with Kaz dependency', async () => {
      class Kaz {}

      class Foo {
        static injectables = ['x', 'kaz']

        constructor({ x, kaz }) {
          this.x = x
          this.kaz = kaz
        }
      }
      const container = new Container()
      container.bind('fooFactory').factory((c) => {
        return x => {
          return new Foo({ x, kaz: c.resolve('kaz') })
        }
      })
      container.bind('kaz').singleton(Kaz)
      const fooFactory = container.resolve('fooFactory')
      const foo = fooFactory('bar')
      expect(foo.x).to.be.equal('bar')
      expect(foo.kaz).to.be.instanceof(Kaz)
    })
  })
})
