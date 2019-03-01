const app = getApp();

Page({

  data: {
    activity: null,
    average_score: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var activtiy = app.globalData.selectedMyActivity;
    var totalScore = 0;
    activtiy.attends.forEach(value => {
      totalScore += parseInt(value.score);
    })
    this.setData({
      activity: activtiy,
      average_score: totalScore / activtiy.attends.length
    })
  }
})