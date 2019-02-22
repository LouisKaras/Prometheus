// pages/home/index.js
/**
 * 分享的数据结构
 */
function Activity(id, title, author, date, place) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.date = date;
  this.place = place;
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
    var planActivities = new Array();
    var a1 = new Activity(1, "单元测试", "楼明俊", "20190222", "8楼tesla");
    planActivities[0] = a1;
    var a2 = new Activity(2, "python爬虫原理及实践", "楼颜城", "20190227", "8楼tesla");
    planActivities[1] = a2;
    this.setData({
      planActivities: planActivities
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