// pages/home/index.js
const db = wx.cloud.database()

/**
 * 分享的数据结构
 */
function Activity(_id, title, ps, author_name, start_date, start_time, end_date, end_time, place) {
  this._id = _id;
  this.title = title;
  this.ps = ps;
  this.author_name = author_name;
  this.start_date = start_date;
  this.start_time = start_time;
  this.end_date = end_date;
  this.end_time = end_time;
  this.place = place;
}

function requestActivities(callback) {
  db.collection('activity').where({
    is_done: false
  }).get({
    success: res => {
      if (callback) {
        callback(res);
      }
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    planActivities: []
  },
  itemOnclick: function(e) {
    //点击计划分享列表项
    wx.navigateTo({
      url: '/pages/activity_detail/activity_detail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    requestActivities(res => {
      var planActivities = res.data;
      this.setData({
        planActivities: planActivities
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    requestActivities(res => {
      var planActivities = res.data;
      this.setData({
        planActivities: planActivities
      });
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})