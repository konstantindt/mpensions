export const isJoiError = (value: unknown): value is {details: unknown} => (
  value instanceof Error
      && 'isJoi' in value
      && value.isJoi === true
);
