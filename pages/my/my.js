// pages/my/my.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  addActivity: function() {
    wx.navigateTo({
      url: '/pages/add_activity/add_activity'
    })
  },

  gotoMyActivity: function() {
    wx.navigateTo({
      url: '/pages/my/my_activity',
    })
  },

  gotoJoinedActivity: function() {
    wx.navigateTo({
      url: '/pages/joined_activity/joined_activity',
    })
  },

  /**
   * 扫二维码签到
   */
  register: function() {
    wx.scanCode({
      success: res => {
        console.log(res);

        var activityId = res.result;
        db.collection('join').add({
          data: {
            activity_id: activityId
          },
          success(res) {
            wx.showToast({
              title: "签到成功"
            })
          }
        });
      }
    });
  },

  /**
   * 跳转意见反馈
   */
  feedback: function() {
    wx.navigateTo({
      url: '/pages/my/feedback',
    })
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})