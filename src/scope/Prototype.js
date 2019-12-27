import Component from './Component'
import utils from '../utils'

export default class Prototype extends Component {

  load(container) {
    return utils.newInstanceWithDependencies(this.subject, container)
  }

}
