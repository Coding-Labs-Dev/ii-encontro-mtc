import { NextFunction, Request, Response, Errback } from 'express';

const errorMiddleware = async (
  error: HTTPError,
  _request: Request,
  response: Response,
  _next: NextFunction | undefined
): Promise<Response> => {
  if (error.name === 'ValidationError')
    return response.status(error.statusCode || 400).json({
      error: {
        message: 'Validation Error',
        fields: error.fields,
      },
    });
  // eslint-disable-next-line no-console
  console.log(error);

  if (process.env.NODE_ENV !== 'production') {
    return response.status(error.statusCode || 500).json(error);
  }

  return response.status(error.statusCode || 500).send(error);
};

interface HTTPError extends Errback {
  statusCode?: number;
  message?: string;
  fields?: object[];
}

export const wrapper = (
  fn: Function
): ((req: Request, res: Response, next: NextFunction) => void) => {
  const wrapperFn = (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
  return wrapperFn;
};

export default errorMiddleware;
