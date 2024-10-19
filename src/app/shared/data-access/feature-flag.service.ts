import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  private flags!: { [key: string]: boolean };

  // Injecting the environment for testing purposes
  constructor(@Inject('environment') private environment: any) {
    this.flags = { ...this.environment.featureFlags };
  }

  isEnabled(flag: keyof typeof environment.featureFlags): boolean {
    if (!this.environment.production) return true;
    return this.flags[flag];
  }
}
