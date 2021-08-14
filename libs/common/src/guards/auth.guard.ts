import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

// This should be used as guard class
export const AuthGuard = NestAuthGuard('jwt');
