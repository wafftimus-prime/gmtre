
export function LayoutDetection<T extends { new (...args: any[]): {} }>(
  originalConstructor: T
) {
  console.log('LAYOUT DECORATOR');


  // Return a new constructor function that extends the original constructor
  return class extends originalConstructor {
    constructor(...args: any[]) {
      super(...args);

      console.log('LAYOUT DECORATOR > originalConstructor');
      console.log(
        `Class ${originalConstructor.name} was instantiated with arguments:`,
        args
      );
    }
  };
}
