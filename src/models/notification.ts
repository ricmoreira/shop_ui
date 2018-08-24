export class Notification {
    type: NotificationType;
    message: string;
    notificationId: string;
    keepAfterRouteChange: boolean;

    constructor(init?:Partial<Notification>) {
        Object.assign(this, init);
    }
}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning
}