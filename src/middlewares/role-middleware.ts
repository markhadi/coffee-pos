import { Role } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { UserRequest } from '../types/user-request';
export const roleMiddleware = (...allowedRoles: Role[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req?.user?.role) {
      res.status(403).json({ errors: 'Forbidden' }).end();
      return;
    }
    const result = [...allowedRoles].includes(req.user.role);
    if (!result) {
      res.status(403).json({ errors: 'Forbidden' }).end();
      return;
    }
    next();
  };
};
