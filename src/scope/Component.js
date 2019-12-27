export default class Component {
  constructor(subject) {
    this._subject = subject
  }

  get subject() {
    return this._subject
  }

  load(container) {
    throw 'Not implemented'
  }
}