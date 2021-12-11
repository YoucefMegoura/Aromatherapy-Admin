import {Component, OnInit} from '@angular/core';
import {CrudService} from "../crud.service";
import {DatabaseService} from "../database.service";
import {Oil} from "../../../models/oil.model";
import {Organoleptic} from "../../../models/organoleptic.model";
import {Domain, DomainType} from "../../../models/domain.model";

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
  styleUrls: ['./detail-layout.component.scss']
})
export class DetailLayoutComponent implements OnInit {

  constructor(private crudService: CrudService, private databaseService: DatabaseService) {
  }

  ngOnInit(): void {

  }

  //onClick Export Button
  onAdd(): void {
    let oil = new Oil(
      '1234567',
      'Apricot',
      'Prunus Armeniaca',
      ['Herbe de Saint-Jean Distilled '],
      'Almond contained in the core',
      'First pressing at cold',
      ['limonene, IinaIoI'],
      new Organoleptic('Jaune', 'Riha', 'Aspect'),
      [
        new Domain(
          DomainType.beauty,
          'Illuminating oil, it brings a real glow to your skin.\n' +
          'Regenerating and revitalizing, it fights against the effects of aging.\n' +
          'Toning, it softens the driest skins.\n' +
          'Emollient, it nourishes the skin and contributes\n' +
          'to make it softer.\n' +
          'By reinforcing the hydrolipidic film, it protects the skin from dehydration.\n',
          'Can be used pure or mixed with essential oils or other vegetable oils as a day or night cream, or to compose a massage oil.\n' +
          'To be introduced as a fatty phase in the\n',
          'Dull, tired, asphyxiated complexion\n' +
          'Withered, tired, crumpled skin (décolleté),\n' +
          'face and hands)\n' +
          'Skin without tone, devitalized\n',
          'Creams and foundations for a ""healthy glow"" effect\n' +
          'Toning serums for complexion radiance\n' +
          'Anti-aging care\n' +
          'After-sun oils\n' +
          'Massage oils\n',
          'Essential oil of Carrot, vegetable oil of Buriti, oily macerate of Carrot for a tanning oil.\n' +
          'All the vegetable oils to make a day care for the face or an oil for the body:\n' +
          'Essential oil of Carrot, vegetable oil of Buriti, oily macerate of Carrot for a tanning oil.\n' +
          'All the vegetable oils to make a day care for the face or an oil for the body:\n' +
          'Jojoba, Hemp, Hazelnut and Macadamia for a very fluid oil suitable for combination or normal skin.\n' +
          'Rosehip, Borage and Prickly Pear for a nourishing and anti-aging oil adapted to dry skin.\n' +
          'Shea and Cocoa butters, wheat germ vegetable oil for very dry skin.\n'
        ),
        new Domain(
          DomainType.health,
          'Illuminating oil, it brings a real glow to your skin.\n' +
          'Regenerating and revitalizing, it fights against the effects of aging.\n' +
          'Toning, it softens the driest skins.\n' +
          'Emollient, it nourishes the skin and contributes\n' +
          'to make it softer.\n' +
          'By reinforcing the hydrolipidic film, it protects the skin from dehydration.\n',
          'Can be used pure or mixed with essential oils or other vegetable oils as a day or night cream, or to compose a massage oil.\n' +
          'To be introduced as a fatty phase in the\n',
          'Dull, tired, asphyxiated complexion\n' +
          'Withered, tired, crumpled skin (décolleté),\n' +
          'face and hands)\n' +
          'Skin without tone, devitalized\n',
          'Creams and foundations for a ""healthy glow"" effect\n' +
          'Toning serums for complexion radiance\n' +
          'Anti-aging care\n' +
          'After-sun oils\n' +
          'Massage oils\n',
          'Essential oil of Carrot, vegetable oil of Buriti, oily macerate of Carrot for a tanning oil.\n' +
          'All the vegetable oils to make a day care for the face or an oil for the body:\n' +
          'Essential oil of Carrot, vegetable oil of Buriti, oily macerate of Carrot for a tanning oil.\n' +
          'All the vegetable oils to make a day care for the face or an oil for the body:\n' +
          'Jojoba, Hemp, Hazelnut and Macadamia for a very fluid oil suitable for combination or normal skin.\n' +
          'Rosehip, Borage and Prickly Pear for a nourishing and anti-aging oil adapted to dry skin.\n' +
          'Shea and Cocoa butters, wheat germ vegetable oil for very dry skin.\n'
        ),
        new Domain(
          DomainType.wellBeing,
          'Illuminating oil, it brings a real glow to your skin.\n' +
          'Regenerating and revitalizing, it fights against the effects of aging.\n' +
          'Toning, it softens the driest skins.\n' +
          'Emollient, it nourishes the skin and contributes\n' +
          'to make it softer.\n' +
          'By reinforcing the hydrolipidic film, it protects the skin from dehydration.\n',
          'Can be used pure or mixed with essential oils or other vegetable oils as a day or night cream, or to compose a massage oil.\n' +
          'To be introduced as a fatty phase in the\n',
          'Dull, tired, asphyxiated complexion\n' +
          'Withered, tired, crumpled skin (décolleté),\n' +
          'face and hands)\n' +
          'Skin without tone, devitalized\n',
          'Creams and foundations for a ""healthy glow"" effect\n' +
          'Toning serums for complexion radiance\n' +
          'Anti-aging care\n' +
          'After-sun oils\n' +
          'Massage oils\n',
          'Essential oil of Carrot, vegetable oil of Buriti, oily macerate of Carrot for a tanning oil.\n' +
          'All the vegetable oils to make a day care for the face or an oil for the body:\n' +
          'Essential oil of Carrot, vegetable oil of Buriti, oily macerate of Carrot for a tanning oil.\n' +
          'All the vegetable oils to make a day care for the face or an oil for the body:\n' +
          'Jojoba, Hemp, Hazelnut and Macadamia for a very fluid oil suitable for combination or normal skin.\n' +
          'Rosehip, Borage and Prickly Pear for a nourishing and anti-aging oil adapted to dry skin.\n' +
          'Shea and Cocoa butters, wheat germ vegetable oil for very dry skin.\n'
        ),
      ],
      new Date(),
      new Date(),
    )
    this.databaseService.addOil(oil).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    });
  }

  //onClick Export Button
  onDelete(): void {
    console.log('Delete');
  }

  //onClick Export Button
  onSave(): void {
    console.log('Save');
  }

  //onClick Export Button
  onClose() {
    this.crudService.closeDetail();
  }
}
