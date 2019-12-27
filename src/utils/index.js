export default {
  newInstanceWithDependencies(clazz, container) {
    const injectables = [...clazz.injectables||[]]
    if (injectables.length === 0) {
      return new clazz()
    }

    const dependencies = container.resolveMany(injectables)

    return new clazz(dependencies)
  },
}
