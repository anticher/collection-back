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
    const { id, role } = user;
    const { ownerId, creatorId } = body;
    console.log(user);
    console.log(body);
    if (creatorId !== id) {
      throw new BadRequestException();
    }
    if (ownerId !== id && role !== 'admin') {
      throw new ForbiddenException();
    }
    return next.handle();
  }
}
