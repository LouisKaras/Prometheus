// pages/my_activity/my_activity.js

const app = getApp();
const db = wx.cloud.database();

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
    myActivities: []
  },

  /**
   * 完成指定分享
   */
  setActivityDone(e) {
      // todo
  },

  /**
   * 删除指定分享
   */
  delActivity(e) {
    var activityId = e.target.dataset.id;
    console.log(activityId);
    db.collection("activity").doc(activityId).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
          icon: "success"
        })

        // 重新刷新页面
        db.collection('activity').where({
          _openid: app.globalData._openid
        }).get({
          success: res => {
            var myActivities = res.data;
            this.setData({
              myActivities: myActivities
            });
          }
        });
      },
      fail: err => {
        console.log(err);
        wx.showToast({
          title: '删除失败,请联系管理员',
          icon: "none",
          duration: 2000
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('activity').where({
      _openid: app.globalData._openid
    }).get({
      success: res => {
        var myActivities = res.data;
        this.setData({
          myActivities: myActivities
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