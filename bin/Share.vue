<template>
  <div>
    <span v-show="shareShow" class="share-wrapper" @mouseover="showModel" @mouseout="hideModel">
      <i v-if="$options.filters.hasSupport('qq-qzone')" class="ikx-icon icon-qq-qzone" @click="share('qq-qzone')"></i><br/>
      <i v-if="$options.filters.hasSupport('renren')" class="ikx-icon icon-renren" @click="share('renren')"></i><br/>
      <i v-if="$options.filters.hasSupport('douban')" class="ikx-icon icon-douban" @click="share('douban')"></i><br/>
      <i v-if="$options.filters.hasSupport('sina-weibo')" class="ikx-icon icon-sina-weibo" @click="share('sina-weibo')"></i><br/>
      <i v-if="$options.filters.hasSupport('wechat')" class="ikx-icon icon-wechat" @mouseover="share('wechat')" @mouseout="hideModel('wechat')"></i><br/>
      <i v-if="$options.filters.hasSupport('tieba-baidu')" class="ikx-icon icon-tieba-baidu" @click="share('tieba-baidu')"></i><br/>
      <i v-if="$options.filters.hasSupport('qq')" class="ikx-icon icon-qq" @click="share('qq')"></i>
    </span>
    <div v-show="wechatQRCode.show" class="wechat-qr-code" @mouseover="showModel('wechat')" @mouseout="hideModel('wechat')">
      <img :src="wechatQRCode.path" />
      <div></div>
      <span class="txt-tip">微信扫一扫，分享</span>
    </div>
    <span v-if="modelShow" class="ikx-share" @mouseover="showModel" @mouseout="hideModel"></span>
  </div>
</template>
<script>
export default {
  name: 'Share',
  data() {
    return {
      modelShow: false,
      shareShow: false,
      wechatQRCode: {
        path: '',
        show: false
      }
    };
  },
  filters: {
    hasSupport(type) {
      let flag = false;
      try{
        define_supports.forEach(v=>{
          if(v === type) {
            flag = true;
            throw new Error();//报错，就跳出循环
          }
        })
      }catch(e){}
      return flag;
    }
  },
  mounted() {
    let _self = this;
    setTimeout(() => {
      _self.init();
    }, 500);
  },
  watch: {
    $route(to,from){
      this.init();
    }
  },
  methods: {
    init() {
      this.shareShow = false;
      this.wechatQRCode.show = false;
      this.modelShow = false;

      let item = this.$page.frontmatter;
      if(item.home == true || item.title == undefined || item.date === undefined || item.publish === false) {
        this.modelShow = false;
        return; // 不进行展示
      }
      this.modelShow = true;
    },
    showModel(type) {
        this.shareShow = true;
        if(type === 'wechat'){
          this.wechatQRCode.show = true;
        }
    },
    hideModel(type){
      if(type === 'wechat'){
          this.wechatQRCode.show = false;
        }
      this.shareShow = false;
    },
    share(type) {
      let shareUrl = "", location = encodeURIComponent(document.location), title = encodeURIComponent(document.title);

      switch(type) {
        case 'qq-qzone':
          shareUrl = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+location+"&title="+title+"&pics=&summary=";
          break;
        case 'renren':
          shareUrl = "http://widget.renren.com/dialog/share?resourceUrl="+location+"&title="+title+"&pic=";
          break;
        case 'douban':
          shareUrl = "https://www.douban.com/share/service?name="+title+"&href="+location+"&image=";
          break;
        case 'sina-weibo':
          shareUrl = "http://service.weibo.com/share/share.php?url="+location+"&title="+title+"&content=utf8&pic=";
          break;
        case 'wechat':
          this.wechatQRCode.path = "http://zixuephp.net/inc/qrcode_img.php?url="+location;  
          this.wechatQRCode.show=true;
          return;
        case 'tieba-baidu':
          shareUrl = "http://tieba.baidu.com/f/commit/share/openShareApi?title="+title+"&url="+location+"&pic=";
          break;
        case 'qq':
          shareUrl = "https://connect.qq.com/widget/shareqq/iframe_index.html?url="+location+"&title="+title;
          break;
        default:
          console.log("类型不匹配");
      }
      if(shareUrl) {
        window.open(shareUrl,'_blank');
      }
    }
  }
};
</script>
<style scoped>
.share-wrapper{
  position: fixed;
  top: 50%;
  right: 3rem;
  z-index: 9999;
  display: inline-block;
  padding: 5px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #3eaf7c;
  border-radius: .25rem;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
}
i.ikx-icon {
  width: 32px;
  height: 32px;
  display: inline-block;
  background-size: 32px 32px;
  cursor: pointer;
}
span.ikx-share{
  position: fixed;
  /* top: 50%; */
  right: 1rem;
  background-color: #FFF;
  height: calc(40px + 10px);
  width: 40px;
  z-index: 999;
  cursor: pointer;
  border-radius: 5px;
}
span.ikx-share::before{
    content: '';
    height: 8px; 
    width: 40px; 
    background: #000; 
    opacity: .2; 
    border-radius: 50%;
    position: fixed;
    top: calc(50% + 55px);
    right: 1rem;
    animation: shadow .9s linear infinite;
    cursor: pointer;
    pointer-events: none;
}
span.ikx-share::after{
    border-radius: 5px;
    background: #FFF;
    background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-share.png);
    background-size: 40px 40px; 
    animation: rotate .9s linear infinite;
    content: '';
    position: fixed;
    right: 1rem;
    top: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    pointer-events: none;
}
@keyframes shadow {
    0%, 100% {transform: scaleX(1);}
    50% {transform: scaleX(1.2);}
}

@keyframes rotate {
    0% {
    transform: translateY(0) ;
  }
    25% {
        transform: translateY(10px);
    }
    50% {
        transform: translateY(20px) scale(1.1, 0.9);
       
    }
    75% {
        ransform: translateY(10px) ;
    }
    100% {
        transform: translateY(0) ;
    }
}
div.wechat-qr-code{
    position: fixed;
    top: 0;
    display: inline-block;
    z-index: 9999;
    padding: 5px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #3eaf7c;
    border-radius: .25rem;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,.2);
    top: calc(50% + 1rem);
    right: 5rem;
}
div.wechat-qr-code>img{
  width: 100px;
}
div.wechat-qr-code .txt-tip{
  font-size: 0.5rem;
  color: #888;
  margin-left: 0.1rem;
}
.icon-qq-qzone{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-qq-qzone.png)
}
.icon-renren{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-renren.png)
}
.icon-douban{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-douban.png)
}
.icon-sina-weibo{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-sina-weibo.png)
}
.icon-wechat{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-wechat.png)
}
.icon-tieba-baidu{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-tieba-baidu.png)
}
.icon-qq{
  background-image: url(https://ikangxu-static.oss-cn-beijing.aliyuncs.com/images/icon/icon-qq.png)
}
</style>