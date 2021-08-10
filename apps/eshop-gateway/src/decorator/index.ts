import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Public = (): CustomDecorator<string> => {
    return SetMetadata('isPublic', true);
};
