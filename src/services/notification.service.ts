import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

import { Notification, NotificationType } from '../models/notification';

@Injectable()
export class NotificationService {
    private subject = new Subject<Notification>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear notification messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear notification messages
                    this.clear();
                }
            }
        });
    }

    // subscribe to notifications
    getNotification(notificationId?: string): Observable<any> {
        return this.subject.asObservable().filter((x: Notification) => x && x.notificationId === notificationId);
    }

    // convenience methods
    success(message: string) {
        this.notification(new Notification({ message, type: NotificationType.Success }));
    }

    error(message: string) {
        this.notification(new Notification({ message, type: NotificationType.Error }));
    }

    info(message: string) {
        this.notification(new Notification({ message, type: NotificationType.Info }));
    }

    warn(message: string) {
        this.notification(new Notification({ message, type: NotificationType.Warning }));
    }

    // main notification method    
    notification(notification: Notification) {
        this.keepAfterRouteChange = notification.keepAfterRouteChange;
        this.subject.next(notification);
    }

    // clear notifications
    clear(notificationId?: string) {
        this.subject.next(new Notification({ notificationId }));
    }
}