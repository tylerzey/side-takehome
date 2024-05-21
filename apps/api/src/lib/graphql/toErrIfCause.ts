export const toErrIfCause =
  (entityTypeDef: string) =>
  (obj: any): any => {
    if (obj.cause) {
      return 'ErrorCause';
    }
    return entityTypeDef;
  };
