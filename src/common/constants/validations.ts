export const emailValidatorRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordValidatorRegexp =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]+$/;

export const fileTypeValidatorRegexp = /^.+(jpeg|png|pdf|jpg|doc|docx)$/;
export const phoneNumberValidatorRegexp = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/;

export const hexColorValidationRegexp = /^#(0x)?[0-9a-f]+$/i;
export const rgbColorValidationRegexp =
  /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
