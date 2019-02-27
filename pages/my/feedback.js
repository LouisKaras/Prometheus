// pages/my/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 提交意见
   */
  formSubmit: function(e) {
    var param = e.detail.value;
    const db = wx.cloud.database();
    db.collection('feedback').add({
      data: {
        content: param.content
      },
      success(res) {
        wx.showToast({
          title: "感谢您的反馈"
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

  }
})