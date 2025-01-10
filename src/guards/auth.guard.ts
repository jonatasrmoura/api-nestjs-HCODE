import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    const [_, token] = (authorization ?? '').split(' ') as string;

    try {
      const data = this.authService.checkToken(token);

      request.tokenPayLoad = data;
      request.user = await this.userService.findById(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
