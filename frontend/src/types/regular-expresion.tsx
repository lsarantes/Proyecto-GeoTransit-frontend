export const REGEX_ONLY_NUMBERS = /^[0-9]+$/;
export const REGEX_NUMBERS_AND_SYMBOLS = /^[0-9#+* ]+$/;
export const REGEX_NUMBERS_AND_LETTERS_N_LATAM = /^[A-Za-zÀ-ÿñÑ0-9 ]+$/;
export const REGEX_ONLY_LETTERS_LATAM = /^[A-Za-zÀ-ÿñÑ\s ]+$/;


export const handleValidatedChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  regex: RegExp,
  callback: (value: string) => void
) => {
  const value = e.target.value;

  // Permitir borrar
  if (value === "" || regex.test(value)) {
    callback(value);
  }
};
