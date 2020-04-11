const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async initAction() {
    if (this.isPost) {
      const floor = this.post('floor');
      const room = this.post('room');
      const row = this.post('row');
      const col = this.post('col');
      const model = this.model('seat');
      await model.query('truncate table think_seat');
      for (var f = 1; f <= floor; f++) {
        (async function(f) {
          for (var r = 1; r <= room; r++) {
            (async function(r) {
              for (var x = 1; x <= row; x++) {
                (async function(x) {
                  for (var y = 1; y <= col; y++) {
                    (async function(y) {
                      const seatInfo = await model.add({
                        floor: f,
                        roomNum: f * 100 + r,
                        rowNum: x,
                        colNum: y,
                        state: 0
                      });
                      this.assign('seatInfo', seatInfo);
                    })(y);
                  }
                })(x);
              }
            })(r);
          }
        })(f);
      }
      // this.assign('initInfo', '初始化成功！');
      this.success();
      await this.model('seatInfo').delete();
      await this.model('seatInfo').add({
        floorNum: floor,
        roomNum: room,
        rowNum: row,
        colNum: col
      });
      // return this.redirect('../admin');
      // return this.display('initialize_index');
    }
  }
};
