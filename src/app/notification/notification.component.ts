import { Component, OnInit, Input } from '@angular/core';

import { Notification, NotificationType } from '../../models/notification';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'notification',
    templateUrl: 'notification.component.html'
})

export class NotificationComponent {
    @Input() id: string;

    notifications: Notification[] = [];

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.getNotification(this.id).subscribe((notification: Notification) => {
            if (!notification.message) {
                // clear notifications when an empty notification is received
                this.notifications = [];
                return;
            }

            // add notification to array
            this.notifications.push(notification);
        });
    }

    removeNotification(notification: Notification) {
        this.notifications = this.notifications.filter(x => x !== notification);
    }

    cssClass(notification: Notification) {
        if (!notification) {
            return;
        }

        // return css class based on notification type
        switch (notification.type) {
            case NotificationType.Success:
                return 'alert alert-success';
            case NotificationType.Error:
                return 'alert alert-danger';
            case NotificationType.Info:
                return 'alert alert-info';
            case NotificationType.Warning:
                return 'alert alert-warning';
        }
    }
}