// types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: string | JwtPayload; // Adjust this type to match your JWT payload
  }
}
