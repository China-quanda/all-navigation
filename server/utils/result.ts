export interface IResult<T = any> {
  data?: T;
  code?: number;
  message?: string;
}


export const success = (option: IResult<any> = {}): IResult<any> => {
  const { data = null, code = 0, message = 'success' } = option;
  return {
    code,
    message,
    data,
  };
}


export const error = (option: IResult<any> = {}): IResult<any> => {
  const { data = null, code = 1, message = 'error' } = option;
  return {
    code,
    message,
    data,
  };
}

export default {
  success,
  error
}