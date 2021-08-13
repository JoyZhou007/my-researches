import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <ul>
      <li routerLink="/vr-house"><a href="javascript:;">vr看房</a></li>
      <li routerLink="fires">
        <a href="javascript:;">canvas烟花效果</a>
      </li>
    </ul>
  `,
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
