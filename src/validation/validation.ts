
// adding functionality 

export function validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  
  export function validateZipCode(zip: string): boolean {
      const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
      return re.test(zip);
  }
  
  export function validatePersonalNumber(pn: string): boolean {
      const re = /^[0-9]{6}-?[0-9]{4}$/;
    //   regular expression is designed to match strings that start with 6 digits, may have an optional hyphen,
    //  and end with 4 digits 134532-4321
      return re.test(pn);
  }
  
  export function validateText(text: string): boolean {
      return text.length > 0;
  }