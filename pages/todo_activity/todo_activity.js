// pages/home/index.js

const app = getApp();
const db = wx.cloud.database();

/**
 * 刷新页面数据
 */
function refreshPageData(page, callback) {
  db.collection('activity').where({
    is_done: false
  }).get({
    success: res => {
      var planActivities = res.data;
      page.setData({
        planActivities: planActivities
      });
      callback.onFinish();
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
    refreshPageData(this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    refreshPageData(this, {
      onFinish: () => {
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }

})