import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  //Implémente l'interface CanActivate
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === 'MY_API_KEY';
    //return authHeader === process.env.API_KEY;
  }
}

// canActivate renvoie true: request allowed to proceed
// canActivate renvoie false: access denied.

