import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import {
	Tab,
	Tabs,
	Tabbar,
	TabbarItem,
	Toast,
	Search,
	Grid,
	GridItem,
	Image as VanImage,
	Divider,
	Card,
	List,
	Cell,
	PullRefresh,
	Skeleton,
	Button,
	Tag,
	Popup,
	Pagination,
	Sidebar,
	SidebarItem,
	Uploader,
	Form,
	Field,
	Rate,
	RadioGroup,
	Radio
} from 'vant';
import {
	Carousel,
	CarouselItem,
	Table,
	TableColumn,
	Row,
	Col,
	Header,
	Container,
	Main,
	Footer
} from 'element-ui';
import VueCookies from 'vue-cookies'
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(VueCookies);
Vue.use(Rate);
Vue.use(Field);
Vue.use(Form);
Vue.use(Uploader);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Pagination);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Footer);
Vue.use(Header);
Vue.use(Main);
Vue.use(Container);
Vue.use(Tag);
Vue.use(Skeleton);
Vue.use(Col);
Vue.use(Row);
Vue.use(PullRefresh);
Vue.use(Cell);
Vue.use(List);
Vue.use(Divider);
Vue.use(VanImage);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Search);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

var events = require('events'); // 引入 events 模块
var eventEmitter = new events.EventEmitter(); // 创建 eventEmitter 对象
eventEmitter.setMaxListeners(100);
require('events').EventEmitter.prototype._maxListeners = 100;
