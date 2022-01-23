import {Component, ViewChild} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {ModalComponent} from '../modal/modal.component';
import {NgxSpinnerService} from "ngx-spinner";
import {OilService} from "../../components/oils-layout/oil.service";

@Component({
  selector: 'app-importjsonoil',
  templateUrl: './import-json-oil.component.html',
  styleUrls: ['./import-json-oil.component.scss'],
})
export class ImportJsonOilComponent {
  @ViewChild('modalComponent') modal:
    | ModalComponent<ImportJsonOilComponent>
    | undefined;

  public importForm: FormGroup;
  public file: Blob | undefined;
  private jsonData: any;

  constructor(
    public formBuilder: FormBuilder,
    private oilService: OilService,
    private spinner: NgxSpinnerService,
  ) {
    this.importForm = this.formBuilder.group({
      file: [null , [Validators.required]]
    });
  }

  async createRecord(): Promise<void> {
    await this.close();
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

  importFile(e: any) {
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let text = fileReader.result as string;
      this.jsonData = JSON.parse(text);
    }
    if (this.file != null) {
      fileReader.readAsText(this.file);
    }
  }


  //onClick Button
  importData() {
    this.spinner.show();
    if (this.importForm.valid && this.jsonData != null) {
      if (this.jsonData.length > 0) {
        this.oilService.importData(this.jsonData).then(() => {
          this.spinner.hide();
        });
      }
    }

  }
}
