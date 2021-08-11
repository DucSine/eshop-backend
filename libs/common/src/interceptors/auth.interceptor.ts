import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContextService } from '../providers/context.service';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        ContextService.setAuthUser(request.user);

        return next.handle();
    }
}
