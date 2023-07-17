import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//   { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
// ];
// {path: '', component: LayoutComponent}
{path: '', component: LayoutComponent, children: [
  { path: 'voter', loadChildren: () => import('./pages/voter/voter.module').then(m => m.VoterModule) }
]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
