// pages/add_activity/add_activity.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sdate: "",
    stime: ""
  },

  bindSDateChange(e) {
    this.setData({
      sdate: e.detail.value
    })
  },

  bindSTimeChange(e) {
    this.setData({
      stime: e.detail.value
    })
  },

  /**
   * 提交分享
   */
  formSubmit: function(e) {
    var param = e.detail.value;
    var userInfo = app.globalData.userInfo
    const db = wx.cloud.database();

    db.collection('activity').add({
      data: {
        title: param.title,
        ps: param.ps,
        start_date: param.sdate,
        start_time: param.stime,
        place: param.place,
        author_name: userInfo.nickName,
        img: "", // TODO 封面功能
        is_done: false
      },
      success(res) {
        wx.showToast({
          title: "添加成功"
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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