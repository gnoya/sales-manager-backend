export function mockable(mock: any) {
  return (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    if (process.env.NODE_ENV === 'test')
      descriptor.value = async function (...args: any[]) {
        return await mock[propertyKey].apply(this, args)
      }

    return descriptor
  }
}
