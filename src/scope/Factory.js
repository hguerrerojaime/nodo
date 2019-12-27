import Component from './Component'

export default class Factory extends Component {

  load(container) {
    return this.subject(container)
  }

}
