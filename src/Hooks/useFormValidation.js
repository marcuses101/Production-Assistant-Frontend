import { useToast } from "./useToast";

export function useFormValidation() {
  const toast = useToast();
  return function (validationArray) {
    if (validationArray == null || validationArray.length === 0) return;
    let isValid = true;
    validationArray.forEach(({ value, setError, validate, message }) => {
      let isValid = true;
      if (!validate(value)) {
        setError(true);
        if (message) toast({ message, type: "error" });
        isValid = false;
        return;
      }
      setError(false);
    });
    return isValid;
  };
}
