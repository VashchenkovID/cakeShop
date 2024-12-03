export enum ValidationsKeysEnum {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
}

export const Validations = {
  [ValidationsKeysEnum.EMAIL]: (value: string) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
  [ValidationsKeysEnum.PASSWORD]: (value: string) => {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(value);
  },
};

export const useValidate = (
  values: {
    key: ValidationsKeysEnum;
    value: string;
  }[],
) => {
  return values.every((val) => Validations[val.key](val.value));
};
