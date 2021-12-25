import {Component, ViewChild} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {ModalComponent} from '../modal/modal.component';
import {NgxCsvParser, NgxCSVParserError} from "ngx-csv-parser";
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
    await this.close();
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }

  importFile(e: any) {
    let csvFile = e.target.files[0];

    this.ngxCsvParser.parse(csvFile, { header: true, delimiter: ',' })
      .pipe().subscribe((result: any) => {

        let oilsArray: Array<any> = result;

        if (oilsArray.length > 0) {
          this.oilService.importOilsArray(oilsArray);
        }

    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }
}
