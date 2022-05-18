import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as firebaseConfig from '../configs/firebase-admin-config.json';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  private readonly firebaseAdmin: firebase.app.App;
  constructor() {
    this.firebaseAdmin = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseConfig as any),
    });
  }

  use(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.firebaseAdmin
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          console.log(decodedToken);
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.error(error);
          this.unauthorized(req.url, res);
        });
    } else {
      this.unauthorized(req.url, res);
    }
  }

  private unauthorized(url: string, res: Response) {
    res.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Unauthorized',
    });
  }
}
