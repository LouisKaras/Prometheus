const app = getApp();
const db = wx.cloud.database();

/**
 * 刷新页面数据
 */
function refreshPageData(page) {
  db.collection('activity').get({
    success: res => {
      var activities = parseData(res.data);
      page.setData({
        activities: activities
      });
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

  var attendActivity = [];

  var i = 0;
  var j = 0;
  for (i = 0; i < attends.length; i++) {
    if (attends[i]._openid == app.globalData.openid) { // 本人参与的
      for (j = 0; j < activities.length; j++) {
        if (attends[i].activity_id == activities[j]._id) {
          activities[j].attends = attends[i];
          attendActivity.push(activities[j]);
          break;
        }
      }
    }
  }
  return attendActivity;
}

Page({

  data: {
    activities: []
  },

  /**
   * 去评价
   */
  gotoGrade: function(e) {
    var attendId = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/grade/grade?id=' + attendId,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    refreshPageData(this);
  }
})