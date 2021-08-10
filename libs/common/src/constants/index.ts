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
