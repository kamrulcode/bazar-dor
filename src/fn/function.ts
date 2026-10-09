export const toBanglaNumber = (value: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
};
