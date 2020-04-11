const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const data = await this.model('seatInfo').where(1).find();
    this.assign('data', data);
    return this.display();
  }
  async damageAction() {
    if (this.isPost) {
      /* const data = this.post('data');
      const floor = data.floor;
      const room = data.room;
      const row = data.row;
      const col = data.col; */
      const floor = Number(this.post('floor'));
      const room = Number(this.post('room'));
      const row = Number(this.post('row'));
      const col = Number(this.post('col'));
      const model = this.model('seat');
      if (room === 0) {
        await model.where({floor: floor}).update({state: 3});
      } else {
        if (row === 0 && col === 0) {
          await model.where({floor: floor, roomNum: floor * 100 + room}).update({state: 3});
        } else {
          if (row === 0) {
            await model.where({floor: floor, roomNum: floor * 100 + room, colNum: col}).update({state: 3});
          } else {
            if (col === 0) {
              await model.where({floor: floor, roomNum: floor * 100 + room, rowNum: row}).update({state: 3});
            } else {
              await model.where({floor: floor, roomNum: floor * 100 + room, rowNum: row, colNum: col}).update({state: 3});
            }
          }
        }
      }
    }
    this.success();
  }
};
