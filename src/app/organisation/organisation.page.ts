import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.page.html',
  styleUrls: ['./organisation.page.scss'],
})
export class OrganisationPage implements OnInit {

  webUrl: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.webUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://ewingswedding.fr/index.php/organisation/'
    );
  }

}
