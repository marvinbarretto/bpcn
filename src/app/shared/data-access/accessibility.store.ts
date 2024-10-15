import { effect, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { UserPreferences } from '../utils/accessibility.model';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityStore {
  defaultPreferences: UserPreferences = {
    fontSize: 16,
    bgColor: '#FFFFDD',
    textColor: '#000000',
    lineHeight: 1.5,
    letterSpacing: 0.2,
    highContrast: false
  };

  signals = {
    fontSize: signal<number>(this.defaultPreferences.fontSize),
    bgColor: signal<string>(this.defaultPreferences.bgColor),
    textColor: signal<string>(this.defaultPreferences.textColor),
    lineHeight: signal<number>(this.defaultPreferences.lineHeight),
    letterSpacing: signal<number>(this.defaultPreferences.letterSpacing),
    highContrast: signal<boolean>(this.defaultPreferences.highContrast),
  };

  constructor() {
    this.loadFromLocalStorage();

    effect(() => {
      this.updateCSSVariable('--font-size', `${this.signals.fontSize()}px`);
    });

    effect(() => {
      this.updateCSSVariable('--background-color', this.signals.bgColor());
    });

    effect(() => {
      this.updateCSSVariable('--text-color', this.signals.textColor());
    });

    effect(() => {
      this.updateCSSVariable('--line-height', this.signals.lineHeight().toString());
    });

    effect(() => {
      this.updateCSSVariable('--letter-spacing', `${this.signals.letterSpacing()}px`);
    });

    effect(() => {
      if (this.signals.highContrast()) {
        this.updateCSSVariable('--background-color', '#000');
        this.updateCSSVariable('--text-color', '#ff0');
      } else {
        this.updateCSSVariable('--background-color', this.signals.bgColor());
        this.updateCSSVariable('--text-color', this.signals.textColor());
      }
    });
  }

  updatePreference<K extends keyof UserPreferences>(preference: K, value: UserPreferences[K]) {

    // Always fallback to the default if invalid
    if (value === null || value === undefined) {
      value = this.defaultPreferences[preference];
    }

    // Update the signal based on the preference type
    switch (preference) {
      case 'fontSize':
        this.signals.fontSize.set(value as number);
        break;
      case 'bgColor':
        this.signals.bgColor.set(value as string);
        break;
      case 'textColor':
        this.signals.textColor.set(value as string);
        break;
      case 'lineHeight':
        this.signals.lineHeight.set(value as number);
        break;
      case 'letterSpacing':
        this.signals.letterSpacing.set(value as number);
        break;
      case 'highContrast':
        this.signals.highContrast.set(value as boolean);
        break;
      default:
        console.error(`Unknown preference: ${preference}`);
        return;
    }

    // Store the valid value in localStorage
    if (value !== null && value !== undefined) {
      localStorage.setItem(preference, value.toString());
    }
  }

  // Load preferences from localStorage and handle invalid values
  loadFromLocalStorage() {
    const fontSize = localStorage.getItem('fontSize');
    const bgColor = localStorage.getItem('bgColor');
    const textColor = localStorage.getItem('textColor');
    const lineHeight = localStorage.getItem('lineHeight');
    const letterSpacing = localStorage.getItem('letterSpacing');
    const highContrast = localStorage.getItem('highContrast');

    // Load valid values from localStorage or fallback to defaults
    this.signals.fontSize.set(fontSize ? Number(fontSize) : this.defaultPreferences.fontSize);
    this.signals.bgColor.set(bgColor ? bgColor : this.defaultPreferences.bgColor);
    this.signals.textColor.set(textColor ? textColor : this.defaultPreferences.textColor);
    this.signals.lineHeight.set(lineHeight ? Number(lineHeight) : this.defaultPreferences.lineHeight);
    this.signals.letterSpacing.set(letterSpacing ? Number(letterSpacing) : this.defaultPreferences.letterSpacing);
    this.signals.highContrast.set(highContrast === 'true' ? true : this.defaultPreferences.highContrast);
  }

  // Update a single CSS variable
  private updateCSSVariable(variable: string, value: string) {
    document.documentElement.style.setProperty(variable, value);
  }

  resetToDefault() {
    this.signals.fontSize.set(this.defaultPreferences.fontSize);
    this.signals.bgColor.set(this.defaultPreferences.bgColor);
    this.signals.textColor.set(this.defaultPreferences.textColor);
    this.signals.lineHeight.set(this.defaultPreferences.lineHeight);
    this.signals.letterSpacing.set(this.defaultPreferences.letterSpacing);
    this.signals.highContrast.set(this.defaultPreferences.highContrast);

    localStorage.removeItem('fontSize');
    localStorage.removeItem('bgColor');
    localStorage.removeItem('textColor');
    localStorage.removeItem('lineHeight');
    localStorage.removeItem('letterSpacing');
    localStorage.removeItem('highContrast');
  }
}
