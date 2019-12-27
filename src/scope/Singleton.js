import Component from './Component'
import utils from '../utils'

export default class Singleton extends Component {

  get instance() {
    return this._instance
  }
  
  load(container) {
    if (!this.instance) {
      this._instance = utils.newInstanceWithDependencies(this.subject, container)
    }
    return this.instance
  }

}
