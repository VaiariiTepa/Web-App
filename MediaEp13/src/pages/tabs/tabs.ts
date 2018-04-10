import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SoundBoardPage } from '../soundboard/soundboard';
import { StreemingPage } from '../streeming/streeming';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SoundBoardPage;
  tab3Root = StreemingPage;

  constructor() {

  }
}
