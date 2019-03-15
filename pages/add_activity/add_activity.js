const app = getApp();
const db = wx.cloud.database();
const util = require("../../utils/util.js");

/**
 * 校验数据是否正确
 */
function checkParamValidate(param) {
  var errorMsg;
  if (!param.title) {
    errorMsg = '请填写标题';
  } else if (!param.ps) {
    errorMsg = '请填写简述';
  } else if (!param.sdate) {
    errorMsg = '请选择开始日期';
  } else if (!param.stime) {
    errorMsg = '请选择开始时间';
  } else if (!param.place) {
    errorMsg = '请填写分享地点';
  }

  if (errorMsg) {
    wx.showToast({
      title: errorMsg,
      icon: "none"
    })
    return false;
  }
  return true;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBtnClicked: false,
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
    util.buttonClicked(this, () => {
      var param = e.detail.value;
      var userInfo = app.globalData.userInfo

      if (checkParamValidate(param)) {
        db.collection('activity').add({
          data: {
            title: param.title,
            ps: param.ps,
            start_date: param.sdate,
            start_time: param.stime,
            place: param.place,
            author_name: userInfo.nickName,
            img: this.data.fileID,
            is_done: false,
            type: "activity"
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
      }
    });
  }
})