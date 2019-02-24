// pages/my_activity/my_activity.js

const app = getApp();
const db = wx.cloud.database();

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
    var activityId = e.target.dataset.id;
    console.log(activityId);
    db.collection("activity").doc(activityId).update({
      data: {
        is_done: true
      },
      success: res => {
        console.log(res);
      }
    });
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
          title: '删除成功'
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
  }
})