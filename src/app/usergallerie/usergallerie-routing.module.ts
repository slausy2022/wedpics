import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGalleriePage } from './usergallerie.page';

const routes: Routes = [
  {
    path: '',
    component: UserGalleriePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGalleriePageRoutingModule {}
