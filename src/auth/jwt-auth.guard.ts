import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext): boolean {
    const headers = context.switchToHttp().getRequest().headers;
    if (!headers.authorization) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
