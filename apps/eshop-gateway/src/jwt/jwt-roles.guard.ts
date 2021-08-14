import { ROLE_KEY } from '@app/common/decorators/roles.decorator';
import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@app/common/dto/RequestDto';

@Injectable()
export class JwtRolesAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Request is using Public decorator
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }

        if (await super.canActivate(context)) {
            const roles = this.reflector.getAllAndMerge(ROLE_KEY, [context.getHandler(), context.getClass()]);
            if (!roles.length) {
                return true;
            }
            const request: Request = context.switchToHttp().getRequest();
            if (!roles.includes(request.user.role)) {
                throw new ForbiddenException();
            }
            return true;
            // return roles.includes(request.user['role']);
            // return request.user !== undefined || request.user !== null;
        }
        return false;
    }
}
