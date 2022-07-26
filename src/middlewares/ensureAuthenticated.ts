import { decode, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const jwt = request.headers.authorization;

  if (jwt === "Bearer undefined") {
    return response.status(401).json({
      message: "Please, authenticate before doing transactions"
    });
  }

  const [, token] = jwt.split(" ");

  const { sub } = decode(token, {
    json: true
  });

  request.account_id = sub;

  try {
    verify(token, "583cb424ed6f4fb142cceaf90941eea1");

    next();
  } catch (err) {
    return response.status(401).json({
      message: "Token expired, please, authenticate"
    });
  }
}