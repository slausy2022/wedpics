import { HomePageModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'gallerie',
        loadChildren: () => import('../gallerie/gallerie.module').then(m => m.GalleriePageModule)
      },
      {
        path: 'usergallerie',
        loadChildren: () => import('../usergallerie/usergallerie.module').then(m => m.UserGalleriePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
