export function generateTestAccountNumber() {
  const accountNumber = Math.floor(
    100000000000 + Math.random() * 900000000000
  ).toString();
  return accountNumber;
}

export function generateTestIfsc() {
  const bankCode = "TEST";
  const branchCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${bankCode}0${branchCode}`;
}

export function generateTestAadhaarNumber() {
  const aadhaarNumber = Math.floor(
    100000000000 + Math.random() * 900000000000
  ).toString();
  return aadhaarNumber;
}

export function generateTestPanNumber() {
  let pan = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 5; i++) {
    pan += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  for (let i = 0; i < 4; i++) {
    pan += Math.floor(Math.random() * 10);
  }
  pan += characters.charAt(Math.floor(Math.random() * characters.length));
  return pan;
}

export function generateTestGstNumber() {
  const stateCode = Math.floor(Math.random() * 37) + 1;
  const pan = generateTestPanNumber();
  const entityNumber = "1";
  const defaultChar = "Z";
  const checksum = Math.floor(Math.random() * 10);
  return `${stateCode}${pan}${entityNumber}${defaultChar}${checksum}`;
}

export function generateRandomStreet() {
  const streetNames = [
    "Maple",
    "Oak",
    "Pine",
    "Cedar",
    "Elm",
    "Washington",
    "Main",
    "Church",
  ];
  const streetTypes = ["Street", "Avenue", "Boulevard", "Lane", "Road"];
  const houseNumber = Math.floor(Math.random() * 200) + 1;
  const streetName =
    streetNames[Math.floor(Math.random() * streetNames.length)];
  const streetType =
    streetTypes[Math.floor(Math.random() * streetTypes.length)];
  return `${houseNumber} ${streetName} ${streetType}`;
}

export function buildStoreFormData(state: any) {
  const formData = new FormData();

  // business
  formData.append("businessName", state.businessName.value);
  formData.append("businessType", state.businessType.value);

  if (state.businessLogo.value instanceof File) {
    formData.append("businessLogo", state.businessLogo.value);
  } else if (typeof state.businessLogo.value === 'string' && state.businessLogo.value !== '') {
    formData.append("businessLogo", state.businessLogo.value);
  }

  if (state.gstin.value) {
    formData.append("gstin", state.gstin.value);
  }

  // owner & contact
  formData.append("ownerName", state.ownerName.value);
  formData.append("contactEmail", state.contactEmail.value);
  formData.append("contactPhone", state.contactPhone.value);

  // address (flat)
  formData.append("street", state.street.value);
  formData.append("city", state.city.value);
  formData.append("state", state.state.value);
  formData.append("postalCode", state.postalCode.value);
  formData.append("country", state.country.value);

  // bank details (flat)
  formData.append("accountHolderName", state.accountHolderName.value);
  formData.append("accountNumber", state.accountNumber.value);
  formData.append("ifscCode", state.ifscCode.value);

  // kyc
  formData.append("aadhaarNumber", state.aadhaarNumber.value);
  formData.append("panNumber", state.panNumber.value);

  return formData;
}

