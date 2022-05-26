import Vue from 'vue'
import App from './App.vue'
// element完整引入
//import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'//样式文件需要单独引入

// element按需引入（安装babel-plugin-component，修改babel.config.js），步骤1：
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

// 路由
import router from '../router'

import store from '../store'

//引入插件axios
import http from 'axios'
//mock组件
import '../api/mock.js'

// import {MessageBox} from 'element-ui'

// 阻止启动生产消息
Vue.config.productionTip = false

// 步骤2：
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

//绑定axios
Vue.prototype.$http=http

Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$message = Message

//导航守卫
router.beforeEach((to,from,next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({ name: 'login'})
  }else if(token && to.name === 'login'){
    next({ name: 'home' })
  }else{
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
