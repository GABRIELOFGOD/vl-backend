import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user? :any;
  applicationId?: any;
}