// pages/home/index.js
const app = getApp();
const db = wx.cloud.database();

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
    var activity = e.currentTarget.dataset.item;
    app.globalData.selectedPlanActivity = activity;
    //点击计划分享列表项，跳转到详情
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