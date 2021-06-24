export default class WithoutPermissionError extends Error {
  constructor () {
    super()
    Object.setPrototypeOf(this, WithoutPermissionError.prototype)
  }
}
