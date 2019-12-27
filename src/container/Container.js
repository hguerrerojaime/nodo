import Injector from '../scope/Injector'
import Component from '../scope/Component';

export default class Container {

  constructor() {
    this._dependencies = {}
  }
  
  bind(name) {
    return new Injector(this, name)
  }

  resolve(name) {
    let dependency = this.dependencies[name]

    if (dependency instanceof Component) {
      dependency = dependency.load(this)
    }

    return dependency
  }

  resolveMany(names) {
    const resolvedDependencies = {}
    names.forEach(name => resolvedDependencies[name] = this.resolve(name))
    return resolvedDependencies
  }

  register(name, dependency) {
    this.dependencies[name] = dependency
  }

  get dependencies() {
    return this._dependencies
  }
}
