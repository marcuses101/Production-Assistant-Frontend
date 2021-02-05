export function formValidation(validationArray) {
  if (validationArray == null || validationArray.length === 0) return;
  let isValid = true;
  validationArray.forEach((validationObject) => {
    let isValid = true
    if (!validationObject.validate()) {
      validationObject.setError(true);
      isValid = false;
    }
  });
  return isValid;
}
