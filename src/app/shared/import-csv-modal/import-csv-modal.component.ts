import {Component, NgModule, ViewChild} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-importcsvmodal',
  templateUrl: './import-csv-modal.component.html',
  styleUrls: ['./import-csv-modal.component.scss'],
})
export class ImportCsvModalComponent {
  @ViewChild('modalComponent') modal:
    | ModalComponent<ImportCsvModalComponent>
    | undefined;

  public importForm: FormGroup;

  constructor(
    public fb: FormBuilder,
  ) {
    this.importForm = this.fb.group({
      file: ['', [Validators.required]]
    });
  }

  async createRecord(): Promise<void> {
    console.log(this.importForm.value);

    await this.close();
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }
}
