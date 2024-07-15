export type ResponseErrorMessageTypes = {
  key: string | undefined;
  message: string | undefined;
};

export type ExceptionResponseType = {
  statusCode: number;
  message: ResponseErrorMessageTypes[];
  error: string;
};
