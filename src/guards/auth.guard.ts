import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    const [_, token] = (authorization ?? '').split(' ') as string;

    try {
      const data = this.authService.checkToken(token);

      request.tokenPayLoad = data;

      return true;
    } catch (e) {
      return false;
    }
  }
}
