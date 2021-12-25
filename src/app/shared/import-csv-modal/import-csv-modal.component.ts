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
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
import {List} from "postcss/lib/list";
import {OilService} from "../../components/crud-layout/oil.service";
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
    private ngxCsvParser: NgxCsvParser,
    public fb: FormBuilder,
    private oilService: OilService
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

  importFile(e: any) {
    let csvFile = e.target.files[0];

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(csvFile, { header: true, delimiter: ',' })
      .pipe().subscribe((result: any) => {

        let oilsArray: Array<any> = result;

        if (oilsArray.length > 0) {
          this.oilService.importOilsArray(oilsArray);
        }

    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

    // let fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   console.log(fileReader.result);
    // }
    // fileReader.readAsText(this.file);
  }
}
