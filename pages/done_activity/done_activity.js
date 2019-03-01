const db = wx.cloud.database();

/**
 * 刷新页面数据
 */
function refreshPageData(page, callback) {
  db.collection('activity').get({
    success: res => {
      var activities = parseData(res.data);
      page.setData({
        activities: activities
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
      if (value.is_done) {
        activities.push(value);
      }
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
    activities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    refreshPageData(this);
  },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    refreshPageData(this, {
      onFinish: () => {
        wx.stopPullDownRefresh();
      }
    })
  }
})