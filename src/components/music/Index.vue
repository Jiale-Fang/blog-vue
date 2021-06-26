<template>
  <div class="index-container">
    <!-- 主体区域 -->
    <div class="main" style="width: 100%">
      <router-view></router-view>
    </div>
<!--&lt;!&ndash;     播放标签 &ndash;&gt;-->
<!--        <div class="player">-->
<!--          <aplayer :audio="audio" :lrcType="1" :fixed=true :mini=true :autoplay =true />-->
<!--        </div>-->
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      id: '',
      audio: {
        name: 'Redbone',
        artist: 'Childish Gambino',
        url: '',
        cover: 'https://p1.music.126.net/jUAMBXKCjUbm41Gc45ddVQ==/109951165201219513.jpg', // prettier-ignore
        lrc: '[00:00.000] 作曲 : Donald Glover/Ludwig Göransson\\n[00:30.19]Daylight\\n[00:33.03]I wake up feeling like you won\'t play right\\n[00:38.82]I used to know, but now that shit don\'t feel right\\n[00:44.70]It made me put away my pride\\n[00:54.11]So long\\n[00:56.95]You made a ni**a wait for some, so long\\n[01:02.75]You make it hard for boy like that to go on\\n[01:09.07]I\'m wishing I could make this mine\\n[01:16.20]oh\\n[01:17.45]If you want it, yeah\\n[01:20.28]You can have it, oh, oh, oh\\n[01:20.59]Maker Tool: LRC Editor for mac\\n[01:20.98]http://www.yumysoft.com\\n[01:23.57]If you need it, ooh\\n[01:26.25]We can make it, oh\\n[01:29.70]If you want it\\n[01:32.32]You can have it\\n[01:34.90]But stay woke\\n[01:38.40]Ni***s creepin\\n[01:41.32]They gon\' find you\\n[01:43.95]Gon catch you sleepin\', oh\\n[01:47.07]Now stay woke\\n[01:50.37]Niggas creepin\'\\n[01:53.32]Now don\'t you close your eyes\\n[02:00.12]Too late\\n[02:02.75]You wanna make it right, but now it\'s too late\\n[02:08.75]My peanut butter chocolate cake with Kool-Aid\\n[02:14.78]I\'m trying not to waste my time\\n[02:23.44]If you want it, oh\\n[02:26.40]You can have it, you can have it\\n[02:29.65]If you need it, you better believe in something\\n[02:32.62]We can make it, oh\\n[02:35.57]If you want it\\n[02:38.37]You can have it, ah\\n[02:43.32]But stay woke (Stay woke)\\n[02:47.37]Ni***s creepin\'  (They be creepin\')\\n[02:50.44]They gon\' find you (They gon\' find you)\\n[02:53.15]Gon\' catch you sleepin\' (Gon\' catch you sleepin\', put your hands up now, baby)\\n[02:56.12]Ooh, now stay woke\\n[02:59.37]Ni***s creepin\'\\n[03:02.25]Now, don\'t you close your eyes\\n[03:08.28]But stay woke (Ooh)\\n[03:11.33]Ni***s creepin\' (They gon\' find you)\\n[03:14.37]They gon\' find you\\n[03:17.00]Gon\' catch you sleepin\', ooh (Gon\' catch you, gon\' catch you)\\n[03:20.07]Now stay woke\\n[03:23.32]Ni***s creepin\'\\n[03:26.75]Now, don\'t you close your eyes\\n[03:38.32]How\'d it get so scandalous?\\n[03:44.32]Oh, how\'d it get so scandalous?\\n[03:50.40]Oh, oh, baby you, how\'d it get\\n[04:05.58]How\'d it get so scandalous? ×2\\n[05:02.50]But stay woke ×2\\n',
        autoplay: true
      }
    }
  },
  created () {
    // 获取歌曲音源
    this.$http({
      url: '/music/song/url',
      method: 'get',
      params: {
        id: 1468248736
      }
    }).then(res => {
      const url = res.data.data[0].url
      console.log(res.data.data[0].url)
      // 设置给父组件的 播放地址
      this.audio.url = url
    })
  },
  methods () {

  }
}
</script>

<style >

</style>
