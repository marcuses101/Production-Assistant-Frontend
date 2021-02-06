export function formValidation(validationArray) {
  if (validationArray == null || validationArray.length === 0) return;
  let isValid = true;
  validationArray.forEach(({ value, setError, validate }) => {
    let isValid = true;
    if (!validate(value)) {
      setError(true);
      isValid = false;
    }
  });
  return isValid;
}
