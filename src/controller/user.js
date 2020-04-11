const Base = require('./base.js');

module.exports = class extends Base {
  /* async indexAction() {
    const model = this.model('user');
    const data = await model.where({userName: 'admin'}).find();
    this.assign('password', data.userPassword);
    return this.display();

    // this.body = 'Hello world!';
    // this.assign('title', 'Hello');
    // return this.display();
  } */
  indexAction() {
    // this.body = 'Hello world!';
    this.assign('title', 'Hello');
    return this.display();
  }
  /* async indexAction() {
    // this.assign('title', 'Hello');
    // return this.display();
    // return this.display();

    const userInfo = await this.session('userInfo');
    if (!think.isEmpty(userInfo)) {
      this.assign('userInfo', userInfo);
    } else {
      return this.redirect('../user');
    }
  } */
  async loginAction() {
    if (this.isPost) {
      const username = this.post('username');
      const password = this.post('password');
      const data = await this.model('user').where({userName: username, userPassword: password}).find();
      if (think.isEmpty(data)) {
        // this.body = '登录失败！';
        this.assign('msg', '用户名密码错误！请重新输入。');
        return this.display('user_index');
        // return this.fail(403, '账号密码错误！请重新填写。', data);
      } else {
        // this.body = '登陆成功';
        this.session('userInfo', data);
        return this.redirect('../apply');
        // return;
      }
    }
    // return this.display();
  }
  async registerAction() {
    if (this.isPost) {
      const username = this.post('uName');
      const password = this.post('password1');
      const college = this.post('college');
      const name = this.post('name');
      const unum = this.post('usernum');
      const phone = this.post('phone');
      const sex = this.post('sex');
      const data1 = await this.model('user').where({userName: username}).find();
      if (!think.isEmpty(data1)) {
        this.assign('msg1', '该昵称已存在!');
        return this.display('register_index');
      } else {
        this.model('user').add({
          userName: username,
          name: name,
          userNum: unum,
          major: college,
          userPhone: phone,
          userPassword: password,
          sex: sex
        });
        this.assign('msg1', '');
        this.assign('msg', '注册成功，请登录！');
        return this.display('user_index');
      }
    }
    // return this.redirect('../user');
  }
  async repassAction() {
    if (this.isPost) {
      const uname = this.post('uName');
      const name = this.post('name');
      const phone = this.post('phone');
      const data3 = await this.model('user').where({userName: uname}).find();
      if (think.isEmpty(data3)) {
        this.assign('msg', '该昵称不存在，请再次确认！');
        return this.display('repassword_index');
      } else {
        const data2 = await this.model('user').where({userName: uname, name: name, userPhone: phone}).find();
        if (think.isEmpty(data2)) {
          this.assign('msg', '用户信息不匹配！');
          return this.display('repassword_index');
        } else {
          const pass = data2.userPassword;
          this.assign('msg', '密码为：' + pass);
          return this.display('repassword_index');
        }
      }
    }
  }
};
