import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-message',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationMessageComponent {
  @Input({ required: true }) message: string = '';

  onYes = output<void>();
  onNo = output<void>();

  onNoClick() {
    this.onNo.emit();
  }

  onYesClick() {
    this.onYes.emit();
  }
}
