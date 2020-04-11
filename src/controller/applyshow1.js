const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const userInfo = await this.session('userInfo');
    this.assign('userInfo', userInfo);
    return this.display();
  }
};
