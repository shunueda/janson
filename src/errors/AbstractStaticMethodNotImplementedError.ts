export class AbstractStaticMethodNotImplementedError extends Error {
  constructor(className: string, methodName: string) {
    super(`Class ${className} must implement static method ${methodName}`)
  }
}
