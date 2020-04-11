module.exports = class extends think.Controller {
  async __before() {
    // const userInfo = await this.session('userInfo');
    // 获取用户的 session 信息，如果为空，返回 false 阻止后续的行为继续执行
  }
  /* async __before() {
    var self = this;
    return this.session('userInfo').then(function(data) {
      if (self.isEmpty(data)) {
        // 未登录情况跳转到登录页
        return self.redirect('../user');
      } else {
        self.userInfo = data;
        // 将用户信息赋值到模版变量里，供模版里使用
        self.assign('userInfo', data);
      }
    });
  } */

  // 如果所有页面都需要实现登录才能访问
  /* async __before() { // __before()是在所有action执行之前调用
    // const http = this.http;
    // const content = this.fetch();
    const ret = this.action();
    if (ret.controller === 'user' && ret.name === 'login') { // 如果是user_login那么久不验证了，直接返回给予登录。
      return;
    }
    const userInfo = await this.session('userInfo') || {};
    if (think.isEmpty(userInfo)) { // 为空返回失败告知没有登录
      if (this.isAjax()) {
        return this.fail('NOT_LOGIN');
      }
    }
    this.userInfo = userInfo;
    if (!this.isAjax()) { // 返回userinfo，
      this.assign('userInfo', {id: userInfo.id, name: userInfo.username});
    }
  } */

  /* // 如果所有页面都需要实现登录才能访问
  async __before(){ //__before()是在所有action执行之前调用
     let http = this.http;
     if(http.controller === 'user' && http.action === 'login'){ //如果是user_login那么久不验证了，直接返回给予登录。
       return;
     }
     let userInfo = await this.session('userInfo') || {};
     if(think.isEmpty(userInfo)){// 为空返回失败告知没有登录
       if(this.isAjax()){
         return this.fail('NOT_LOGIN');
       }
     }
     this.userInfo = userInfo;
     if(!this.isAjax()){ //返回userinfo，
       this.assign('userInfo', {id: userInfo.id, name: userInfo.username});
     }
   } */
};
