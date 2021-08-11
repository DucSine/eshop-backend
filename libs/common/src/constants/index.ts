export const SYSTEM_CODE_PREFIX = 'VLU';
export const DEFAULT_PAGE_LIMIT = 10;
export const DEFAULT_ACTIVITY_PAGE_LIMIT = 5;

export enum SERVICES {
    AUTHENTICATOR = 'AUTHENTICATOR_SERVICE'
}

export enum Order {
    ASC = 'asc',
    DESC = 'desc'
}

export enum RoleType {
    ADMIN = 1,
    RESTAURANT,
    CUSTOMER
}

export class CommonConstants {
    static readonly ORDER = Order;
    static readonly ROLE_TYPE = RoleType;
}
