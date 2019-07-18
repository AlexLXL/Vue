/**
 * 快速迭代脚手架vue-cli: (3.x移动css/reset.css和html到public文件夹)
 *       2.x ▁  3.x ● 
 * 
 *      ▁ 配置自动打开页面 (./config/index.js的autoOpenBrowser)
 *      ● 配置exlintrc检测 (eslintrc.js的rules    package.jon的rules加)
 * 
 * 
 *      ● HTML --- ①meta适配 ②样式重置 ✘✘删 ③解决移动端0.3s点击延迟, fastclick库 
 * 
 * 
 *      ● 建文件夹( api、router路由器、store状态管理、common混合、components、pages路由组件、filter过滤器、mock模拟后台数据)
 *      ● 下包
 *          stylus              ---   yarn add stylus stylus-loader -D
 *          路由、ajax           ---   yarn add vue-router axios
 *          表单验证vee-validate ---    yarn add vee-validate
 *          vuex、swiper、dayjs  ---   yarn add vuex swiper dayjs
 *          Mint UI(按需加载)    ---    yarn add mint-ui -S   **  yarn add babel-plugin-component -D
 * 
 * 
 *      ● 模板api (根据代理配置prefix)
 *      ● 模板路由, main.js引入
 *      ● 模板Vuex, main.js引入
 *      ● 模板vee-validate, main.js引入运行
 * 
 * 
 *      ● 配置代理(手动) ===2.x上  3.x下===
 *        ===config/index.js===                                                  
 *         proxyTable: {
 *           '/api': {
 *             target: 'http://localhost:5000',  // 目标服务器
 *             changeOrigin: true, // 支持跨域
 *             pathRewrite: {
 *               '^/api': '' // 删除/api
 *             }
 *           }
 *         }, 
 *        ===config/index.js===
 *        const prefix = process.env.NODE_ENV === "development" ? "/api" : "http://localhost:5000"
 * 
 * 
 *        *** 新建vue.config.js***
 *          module.exports = {                                // 向外暴露一个webpack配置对象        https://cli.vuejs.org/zh/guide/webpack.html
 *            configureWebpack: {
 *              resolve: {                                    // 使用vue.esm.js                   这个配置从2.x的build/webpack.base.conf拿
 *                extensions: ['.js', '.vue', '.json'],
 *                alias: {
 *                  'vue$': 'vue/dist/vue.esm.js',
 *                }
 *              },
 *              devServer: {                                  // 代理和自动打开网页                  https://cli.vuejs.org/zh/config/#devserver-proxy
 *                proxy: 'http://localhost:5000',
 *                open: true // 也可以在package.json的scripts命令后加 --open自动打开网页
 *              }
 *            }
 *          }
 *        *** config/index.js***
 *        const prefix = process.env.NODE_ENV === "development" ? "" : "http://localhost:5000"
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------
 * 
 * swiper轮播图: 
 * 
 *  import Swiper from "swiper";  // 导入Swiper
 * 
 *  var mySwiper = new Swiper(".swiper-container", {  // 实例化的方式使用(页面加载完成之后、watch不能使用时因为watch里的代码是同步的，而发请求更新数据刷新页面是异步的)
 *     loop: true, // 循环模式选项                              | 配合**vm.$nextTick(callback)使用** --- 在下次 DOM 更新循环结束之后执行延迟回调。                        
 *     pagination: {                                                    | watch+vm.$nextTick(callback)                                                
 *       el: ".swiper-pagination"                                       | this.$store.dispatch('actions',() => {vm.$nextTick(callback)} )             
 *     }                                                                | await this.$store.dispatch('actions') 后, 再写 this.$nextTick(callback)         
 *   });
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * vee-validate表单验证:
 *      **https://blog.csdn.net/boy599237255/article/details/78793471 validate.js设置**
 *      **https://codesandbox.io/s/y3504yr0l1?initialpath=%2F%23%2Fform&module=%2Fsrc%2Fcomponents%2FForm.vue  组件html写法**
 *      // const success = await this.$validator.validateAll()             // 对所有表单项进行验证
 *      // const success = await this.$validator.validateAll(['xx','yy'])  // 对指定的所有表单项进行验证(数组里填input的name属性)
 * 
 * validate.js:(根目录新建)
 *      import Vue from 'vue'
 *      import VeeValidate, { Validator } from 'vee-validate'
 *      import zh_CN from 'vee-validate/dist/locale/zh_CN'
 *      
 *      Vue.use(VeeValidate);
 *      
 *      // vee-validate提示语汉化（使用中文、设置提示的名字）
 *      Validator.localize('zh_CN', {
 *        messages: zh_CN.messages,
 *        attributes: {
 *          phone: "手机号",  // 这里的东西都是input的name属性的值，组件html里的也是用的name的值，拿表单的值这些操作插件封装了
 *          code: "验证码",   // 和提示文字相关
 *          name: "账号",
 *          pwd: "密码",
 *          captcha: "图形验证码"
 *        }
 *      });
 *      
 *      // 验证方法扩展 ( 根据正则提示 )
 *      Validator.extend('phone', {
 *        getMessage: (field) => `请输入正确的` + field,
 *        validate: (value) =>{
 *            const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
 *            return reg.test(value) 
 *        }  
 *      });
 *      
 *      Validator.extend('pwd', {
 *        getMessage: (field) => `请输入合法的` + field, // field -- attributes设置的名
 *        validate: (value) =>{                         // value -- 表单的值
 *            const reg = /^\w{4,12}/;
 *            return reg.test(value) 
 *        }  
 *      });
 * 
 * main.js:
 *      import "validate.js";
 * 
 * 组件内使用: 
 *       <input type="text" placeholder="请输入手机号" v-model="phone" name="phone" v-validate="'required|phone'">       // 加v-validate和name属性
 *       <span style="color:red" v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span> // 加提示的span标签
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 
 * 
 * 
 * 
 * 
 * 
 * -------------------------------------------------------------------------------------------------------------------------------------
 * 整个登录流程
 *      1、完成基本样式         ----      (点击发送验证码倒计时、图片验证码点击刷新-ref修改img的src-原地址的基础上加上？time=Date.now() )
 *      2、配置表单验证         ----      (vee-validate )
 *      3、登录验证             ----      (const success = await this.$validator.validateAll(['xx','yy']), 没错就发送请求 )
 *      4、更新数据             ----      根据返回的数据确认是否需要更新vuex
 * 
 *      期间后台会用到cookie和session进行7天免登录，
 *            登录时发请求，服务器创建session保存提交过来的账号id，
 *                         服务器返回网页一个cookie(内容为session的id，有效期x天)，
 *            下次打开页面的时候立刻发请求判断是否登录过(自动携带cookie)，
 *                          服务器根据请求找到session，session找到账号id，去数据库找到账号，返回给前端，
 *            前端拿请求回来的用户数据更新vuex自动登录
 *            退出登录时发送请求，服务器会把session、账号id删了
 * 
 */