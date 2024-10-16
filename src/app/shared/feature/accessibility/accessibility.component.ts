import { Component } from '@angular/core';
import { AccessibilityStore } from '../../data-access/accessibility.store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AccessibilityColourCombinations } from '../../utils/a11y-colours';
import { A11yLetterComponent } from '../../ui/a11y-letter/a11y-letter.component';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, A11yLetterComponent],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.scss'
})
export class AccessibilityComponent {

  accessibilityForm!: FormGroup;

  colourCombinations = AccessibilityColourCombinations;

  constructor(
    public accessibilityStore: AccessibilityStore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accessibilityForm = this.fb.group({
      fontSize: [this.accessibilityStore.signals.fontSize()],
      bgColor: [this.accessibilityStore.signals.bgColor()],
      textColor: [this.accessibilityStore.signals.textColor()],
      lineHeight: [this.accessibilityStore.signals.lineHeight()],
      letterSpacing: [this.accessibilityStore.signals.letterSpacing()],
    });

    // Debounced form value change listeners
    this.accessibilityForm.get('fontSize')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.accessibilityStore.updatePreference('fontSize', value);
    });

    this.accessibilityForm.get('bgColor')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      console.log('bgColor', value);
      this.accessibilityStore.updatePreference('bgColor', value);
    });

    this.accessibilityForm.get('textColor')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.accessibilityStore.updatePreference('textColor', value);
    });

    this.accessibilityForm.get('lineHeight')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.accessibilityStore.updatePreference('lineHeight', value);
    });

    this.accessibilityForm.get('letterSpacing')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.accessibilityStore.updatePreference('letterSpacing', value);
    });

  }

  applyCombination(bgColor: string, textColor: string): void {
    this.accessibilityForm.patchValue({ bgColor, textColor });
    this.accessibilityStore.updatePreference('bgColor', bgColor);
    this.accessibilityStore.updatePreference('textColor', textColor);
  }

  onFontSizeChange(event: any): void {
    const newSize = event.target.value;
    this.accessibilityStore.updatePreference('fontSize', newSize);
  }

  onBgColorChange(event: any): void {
    const newColor = event.target.value;
    this.accessibilityStore.updatePreference('bgColor', newColor);
  }

  onTextColorChange(event: any): void {
    const newColor = event.target.value;
    this.accessibilityStore.updatePreference('textColor', newColor);
  }

  resetToDefault() {
    this.accessibilityStore.resetToDefault();
    this.accessibilityForm.reset({
      fontSize: this.accessibilityStore.signals.fontSize(),
      bgColor: this.accessibilityStore.signals.bgColor(),
      textColor: this.accessibilityStore.signals.textColor(),
      lineHeight: this.accessibilityStore.signals.lineHeight(),
      letterSpacing: this.accessibilityStore.signals.letterSpacing()
    });
  }
}
