import Singleton from './Singleton'
import Prototype from './Prototype';
import Factory from './Factory';

export default class Injector {
  constructor(container, dependencyName) {
    this._container = container
    this._dependencyName = dependencyName
  }

  singleton(subject) {
    this.container.register(
      this.dependencyName,
      new Singleton(subject),
    )
  }

  prototype(subject) {
    this.container.register(
      this.dependencyName,
      new Prototype(subject),
    )
  }

  factory(fn) {
    this.container.register(
      this.dependencyName,
      new Factory(fn),
    )
  }

  to(subject) {
    this.container.register(
      this.dependencyName,
      subject,
    )
  }

  get container() {
    return this._container
  }

  get dependencyName() {
    return this._dependencyName
  }
}