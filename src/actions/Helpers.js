export function createError(apiError, status, genericError) {
  return {apiError: apiError, status: status, genericError: genericError};
}

export function createApiError(apiError, status) {
  return createError(apiError, status, null);
}

export function createGenericError(genericError) {
  return createError(null, null, genericError);
}

export function delay(duration) {
  return (value) => new Promise( (resolve) => { 
    console.log("Delay " + duration.toString());
    console.log(value.toString());
    setTimeout(() => resolve(value), duration);} );
}