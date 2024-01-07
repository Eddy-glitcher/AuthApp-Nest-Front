import { Component, computed, inject } from '@angular/core';
import { AuthServiceService } from '../../../auth/services/auth-service.service';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [ JsonPipe, HttpClientModule ],
  providers : [ AuthServiceService, HttpClient ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

  private _authService = inject(AuthServiceService);

  user = computed(()=> this._authService.currentUser());

}
