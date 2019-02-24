// pages/joined_activity/joined_activity.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinedActivities: new Array()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var joinedAs = new Array();
    db.collection('join').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        res.data.forEach((value) => {
          db.collection('activity').where({
            _id: value.activity_id
          }).get({
            success: res => {
              joinedAs.push(res.data[0]);
              this.setData({
                joinedActivities: joinedAs
              })
            }
          })
        });
      }
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