import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './assets/styles/layout.scss';
import './assets/demo/flags/flags.css';
import 'leaflet/dist/leaflet.css';

import { createApp, reactive } from 'vue';
import router from "@/router";
import store from "@/store";
import AppWrapper from './AppWrapper.vue';
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import ConfirmationService from 'primevue/confirmationservice';



// PrimeVue
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import RadioButton from 'primevue/radiobutton';
import Toast from 'primevue/toast';
import Badge from "primevue/badge";
import InputSwitch from "primevue/inputswitch";
import Panel from "primevue/panel";
import Listbox from "primevue/listbox";
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import Calendar from 'primevue/calendar'
import ScrollTop from 'primevue/scrolltop'
import Message from 'primevue/message';
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";
import Galleria from "primevue/galleria";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Image from "primevue/image";
import ConfirmPopup from 'primevue/confirmpopup';


import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import CodeHighlight from './AppCodeHighlight';
import BlockViewer from './BlockViewer';

//Lealeft
import {LMap, LTileLayer, LMarker} from "@vue-leaflet/vue-leaflet";



const app = createApp(AppWrapper);

app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', darkTheme: false });

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' });
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(store);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('code', CodeHighlight);
app.directive('styleclass', StyleClass);



//PrimeVue
app.component('Button', Button);
app.component('DataView', DataView);
app.component('Image', Image);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('RadioButton', RadioButton);
app.component('Toast', Toast);
app.component('Badge', Badge);
app.component('InputSwitch', InputSwitch);
app.component('Panel', Panel);
app.component('Listbox', Listbox);
app.component('InputNumber', InputNumber);
app.component('Textarea', Textarea);
app.component('Dropdown', Dropdown);
app.component('FileUpload', FileUpload);
app.component('Calendar', Calendar);
app.component('ScrollTop', ScrollTop);
app.component('Message', Message);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('Paginator', Paginator);
app.component('Galleria', Galleria);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('ConfirmPopup', ConfirmPopup);


//Lealeft
app.component('LMap', LMap);
app.component('LTileLayer', LTileLayer);
app.component('LMarker', LMarker);



app.component('BlockViewer', BlockViewer);

app.mount('#app');