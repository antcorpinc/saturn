import {bootstrap} from '@angular/platform-browser-dynamic';

import {RegisterComponent} from './accountregister.component';

bootstrap(RegisterComponent)
.then(success=>console.log('Register app bootstrapped'))
.catch(error=>console.log(error));