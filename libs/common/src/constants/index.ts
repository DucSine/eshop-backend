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

export enum ROLE {
    ADMIN = 1,
    RESTAURANT = 2,
    CUSTOMER = 3
}

export enum ACCOUNT_STATUS {
    DEACTIVATED = 0,
    ACTIVATED = 1,
    LOCKED = 2
}

export const MESSAGE_PATTERN = {
    AUTH: {
        SIGN_UP: 'sign-up',
        VERIFIED_ACCOUNT: 'verified-account',
        SIGN_IN_LOCAL: 'sign-in-local',
        CHANGE_PASSWORD: 'change-password',
        FORGOT_PASSWORD: 'forgot-password',
        RESET_PASSWORD: 'reset-password'
    }
};
