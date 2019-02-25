// pages/grade/grade.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId: ""
  },

  formSubmit: function(e) {
    var param = e.detail.value;

    db.collection('join').where({
      activity_id: this.data.activityId
    }).get({
      success(res) {
        db.collection('join').doc(res.data[0]._id).update({
          data: {
            score: param.score,
            feedback: param.feedback
          },
          success: res => {
            wx.showToast({
              title: '评价完成！',
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1500);
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var activityId = options.id;
    this.setData({
      activityId: activityId
    })
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