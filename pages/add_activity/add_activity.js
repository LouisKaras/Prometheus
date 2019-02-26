// pages/add_activity/add_activity.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sdate: "",
    stime: "",
    fileID: ""
  },

  bindSDateChange(e) {
    this.setData({
      sdate: e.detail.value
    })
  },

  bindSTimeChange(e) {
    this.setData({
      stime: e.detail.value
    })
  },

  /**
   * 上传封面
   */
  uploadPic() {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var picName = timestamp + '.png';

    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          cloudPath: picName,
          filePath: chooseResult.tempFilePaths[0],
          success: res => {
            this.setData({
              fileID: res.fileID
            })
          },
        })
      },
    })
  },

  /**
   * 提交分享
   */
  formSubmit: function(e) {
    var param = e.detail.value;
    var userInfo = app.globalData.userInfo
    const db = wx.cloud.database();

    db.collection('activity').add({
      data: {
        title: param.title,
        ps: param.ps,
        start_date: param.sdate,
        start_time: param.stime,
        place: param.place,
        author_name: userInfo.nickName,
        img: this.data.fileID,
        is_done: false
      },
      success(res) {
        wx.showToast({
          title: "添加成功"
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  }
})