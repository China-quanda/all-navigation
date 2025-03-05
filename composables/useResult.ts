export interface IResult<T = any> {
  data?: T;
  code?: number;
  message?: string;
}

export const useResult = ()=>{
  return {
    success<T>(option: IResult<any> = {}): IResult<any> {
      const { data = null, code = 0, message = 'success' } = option;
      return {
        code,
        data,
        message,
      };
    },
    error<T>(option: IResult<any> = {}): IResult<any> {
      const { data = null, code = 1, message = 'error' } = option;
      return {
        code,
        data,
        message,
      };
    }
  }
}