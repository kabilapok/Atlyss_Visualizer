import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { directive as vTippy } from 'vue-tippy';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

const app = createApp(App);
app.directive('tippy', vTippy);
app.mount('#app');
