// pages/home/index.js

const app = getApp();
const db = wx.cloud.database();

/**
 * 刷新页面数据
 */
function refreshPageData(page, callback) {
  db.collection('activity').get({
    success: res => {
      var activities = parseData(res.data);
      page.setData({
        planActivities: activities
      });
      callback.onFinish();
    }
  });
}

function parseData(data) {
  var activities = [];
  var attends = [];
  data.forEach(value => {
    if (value.type == 'activity') { // 分享
      activities.push(value);
    } else if (value.type == 'attend') { // 参与记录
      attends.push(value);
    }
  });

  var i = 0;
  var j = 0;
  for (i = 0; i < attends.length; i++) {
    for (j = 0; j < activities.length; j++) {
      if (attends[i].activity_id == activities[j]._id) {
        if (!activities[j].attends) {
          activities[j].attends = [];
        }
        activities[j].attends.push(attends[i]);
        break;
      }
    }
  }

  return activities;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    planActivities: []
  },

  itemOnclick: function(e) {
    var activity = e.currentTarget.dataset.item;
    app.globalData.selectedTodoActivity = activity;
    //点击计划分享列表项，跳转到详情
    wx.navigateTo({
      url: '/pages/activity_detail/activity_detail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    refreshPageData(this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    refreshPageData(this, {
      onFinish: () => {
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }

})