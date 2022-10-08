import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { user, body } = context.switchToHttp().getRequest();
    const { username, role } = user;
    const { ownerName, creatorName } = body;
    console.log(user);
    console.log(body);
    if (creatorName !== username) {
      throw new BadRequestException();
    }
    if (ownerName !== username && role !== 'admin') {
      throw new ForbiddenException();
    }
    return next.handle();
  }
}