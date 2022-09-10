import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  selectedTab: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

      this.route.paramMap.subscribe(paramsIn => {

          const selectedTabIn = paramsIn.get('selectedTab');
          if (selectedTabIn) {
              this.selectedTab = selectedTabIn;
          }
      });
  }

}
