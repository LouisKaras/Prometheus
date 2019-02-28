// pages/joined_activity/joined_activity.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinedActivities: []
  },

  /**
   * 去评价
   */
  gotoGrade: function(e) {
    var activityId = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/grade/grade?id=' + activityId,
    })
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
              var activity = res.data[0];
              activity.score = value.score;
              joinedAs.push(activity);
              this.setData({
                joinedActivities: joinedAs
              })
            }
          })
        });
      }
    });
  }
})