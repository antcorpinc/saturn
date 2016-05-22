import {Component,OnInit}  from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS,ROUTER_DIRECTIVES,Router
 // ,Routes
 } from '@angular/router'

import {RegisterStep1Component} from './registerstep1.component'

@Component({
 selector:'register-app',
  template: `
   <div>
   This is testing
     
</div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers:[
                HTTP_PROVIDERS,
                ROUTER_PROVIDERS
  ]
})

/*@Routes([
 
  //  { path: '/account/registertest/registerstep1', component: RegisterStep1Component },
])*/

export class RegisterComponent implements OnInit{
  
  constructor() {}

  ngOnInit() {
  }
    
}
