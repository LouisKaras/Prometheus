const app = getApp();
const db = wx.cloud.database();

/**
 * 刷新页面数据
 * 重新读取数据库
 */
function refreshPageData(page) {
  db.collection('activity').get({
    success: res => {
      var activities = parseData(res.data);
      page.setData({
        myActivities: activities
      });
    }
  });
}

function parseData(data) {
  var activities = [];
  var attends = [];
  data.forEach(value => {
    if (value.type == 'activity') { // 分享
      if (value._openid == app.globalData.openid) { // 我创建的
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
    myActivities: []
  },

  onItemclick(e) {
    var activity = e.currentTarget.dataset.item;
    app.globalData.selectedMyActivity = activity;
    //点击计划分享列表项，跳转到详情
    wx.navigateTo({
      url: '/pages/my/my_activity_detail',
    })
  },

  /**
   * 完成指定分享
   */
  setActivityDone(e) {
    var activityId = e.target.dataset.id;
    db.collection("activity").doc(activityId).update({
      data: {
        is_done: true
      },
      success: res => {
        refreshPageData(this);
      }
    });
  },

  /**
   * 删除指定分享
   */
  delActivity(e) {
    var activityId = e.target.dataset.id;
    db.collection("activity").doc(activityId).remove({
      success: res => {
        wx.showToast({
          title: '删除成功'
        })

        // 重新刷新页面
        refreshPageData(this);
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
    refreshPageData(this);
  }
})