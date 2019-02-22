// pages/done/done.js
/**
 * 分享的数据结构
 */
function Activity(_id, title, author, start_date, end_date, modify_date, place) {
  this._id = _id;
  this.title = title;
  this.author = author;
  this.start_date = start_date;
  this.end_date = end_date;
  this.modify_date = modify_date;
  this.place = place;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doneActivities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('activity').where({
      is_done: true
    }).get({
      success: res => {
        var doneActivities = res.data;
        this.setData({
          doneActivities: doneActivities
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})