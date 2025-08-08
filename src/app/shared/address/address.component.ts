import { Component, Input } from '@angular/core';
import Clinic from '../../order/shared/clinic.model';

@Component({
  selector: 'app-address',
  imports: [],
  template: `
    @if(clinic){
    {{
      clinic.addressLine2
        ? clinic.addressLine1 + ' ' + clinic.addressLine2
        : clinic.addressLine1
    }}, {{ clinic.city }}, {{ clinic.state }} {{ clinic.postalCode }}
    {{ clinic.country }}
    }
  `,
})
export class AddressComponent {
  @Input({ required: true }) clinic?: Clinic;
}
