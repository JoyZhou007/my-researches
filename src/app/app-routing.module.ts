import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiresComponent } from './demos/canvas/fires/fires.component';
import { VrHouseComponent } from './demos/threeJs/vr-house/vr-house.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
  },
  {
    path: 'fires',
    component: FiresComponent,
  },
  {
    path: 'vr-house',
    component: VrHouseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
