import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {}

  error(message: string, duration: number = 3000): void {
    this.snackBar.open(message, undefined, { panelClass: ['notification', 'notification-error'], duration });
  }

  success(message: string, duration: number = 3000): void {
    this.snackBar.open(message, undefined, { panelClass: ['notification', 'notification-success'], duration });
  }

  message(message: string, duration: number = 3000): void {
    this.snackBar.open(message, undefined, { panelClass: ['notification', 'notification-message'], duration });
  }
}
