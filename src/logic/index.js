module.exports = class extends think.Logic {
  indexAction() {

  }
  // 请求类型校验
  /* indexAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
  }
  detailAction() {
    this.allowMethods = 'get,post'; // 允许 GET、POST 请求类型
  } */
  // 校验规则格式
  /* indexAction(){
    let rules = {
      username: {
        string: true,       // 字段类型为 String 类型
        required: true,     // 字段必填
        default: 'thinkjs', // 字段默认值为 'thinkjs'
        trim: true,         // 字段需要trim处理
        method: 'GET'       // 指定获取数据的方式
      },
      age: {
        int: {min: 20, max: 60} // 20到60之间的整数
      }
    }
    let flag = this.validate(rules);
  } */
};
