<template>
  <!-- 播放标签 -->
      <div class="player">
        <aplayer :audio="audio" :lrcType="1" :fixed=true :mini=true :autoplay =true />
      </div>
</template>

<script>
import APlayer from '@moefe/vue-aplayer'
import Vue from 'vue'
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})
export default {
  name: 'audio',
  data () {
    return {
      id: 1895800414,
      audio: [{ // 初始歌曲数据
        name: 'All Too Well (Sad Girl Autumn Version) - Recorded at Long Pond Studios',
        artist: 'Taylor Swift',
        url: "http://m701.music.126.net/20220315141529/379ded6356d423f7af2bec505dadda6e/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/11704737062/0b59/890b/d957/c3ce7ca0759dcdbdc42d182d1ccf334d.mp3",
        cover: "https://p2.music.126.net/XserLE-Pcb_jUQS4sXy5Ww==/109951166631597628.jpg", // prettier-ignore
        lrc: "[00:00.000] 作词 : Taylor Swift/Liz Rose\n[00:01.000] 作曲 : Taylor Swift/Liz Rose\n[00:20.758]I walked through the door with you, the air was cold\n[00:25.862]But something 'bout it felt like home somehow\n[00:30.749]And I left my scarf there at your sister's house\n[00:35.749]And you've still got it in your drawer, even now\n[00:51.655]Oh, your sweet disposition and my wide-eyed gaze\n[00:56.410]We're singing in the car, getting lost upstate\n[01:01.842]Autumn leaves falling down like pieces into place\n[01:06.687]And I can picture it after all these days\n[01:10.225]\n[01:12.589]And I know it's long gone and\n[01:14.768]That magic's not here no more\n[01:17.302]And I might be okay, but I'm not fine at all\n[01:22.362]Oh, oh, oh\n[01:25.513]\n[01:27.376]'Cause there we are again on that little town street\n[01:32.313]You almost ran the red 'cause you were lookin' over at me\n[01:37.592]Wind in my hair, I was there\n[01:40.153]I remember it all too well\n[01:43.327]\n[01:47.689]Photo album on the counter, your cheeks were turning red\n[01:53.105]You used to be a little kid with glasses in a twin-sized bed\n[01:58.212]And your mother's telling stories 'bout you on the tee-ball team\n[02:03.138]You taught me 'bout your past, thinking your future was me\n[02:08.510]And you were tossing me the car keys, \"**** the patriarchy\"\n[02:12.899]Key chain on the ground, we were always skipping town\n[02:18.261]And I was thinking on the drive down, any time now\n[02:22.850]He's gonna say it's love, you never called it what it was\n[02:28.471]'Til we were dead and gone and buried\n[02:31.973]Check the pulse and come back swearing it's the same\n[02:36.395]After three months in the grave\n[02:39.604]And then you wondered where it went to as I reached for you\n[02:44.394]But all I felt was shame and you held my lifeless frame\n[02:48.397]\n[02:50.006]And I know it's long gone and\n[02:52.315]There was nothing else I could do\n[02:55.252]And I forget about you long enough\n[02:58.084]To forget why I needed to\n[03:03.616]\n[03:05.245]'Cause there we are again in the middle of the night\n[03:10.309]We're dancing 'round the kitchen in the refrigerator light\n[03:15.288]Down the stairs, I was there\n[03:17.778]I remember it all too well\n[03:25.841]And there we are again when nobody had to know\n[03:31.120]You kept me like a secret, but I kept you like an oath\n[03:36.237]Sacred prayer and we'd swear\n[03:38.692]To remember it all too well, oh\n[03:51.924]\n[04:01.875]Well, maybe we got lost in translation\n[04:04.294]Maybe I asked for too much\n[04:06.987]But maybe this thing was a masterpiece\n[04:09.743]'Til you tore it all up\n[04:12.192]Running scared, I was there\n[04:15.017]I remember it all too well\n[04:22.122]And you call me up again just to break me like a promise\n[04:27.992]So casually cruel in the name of being honest\n[04:33.160]I'm a crumpled up piece of paper lying here\n[04:37.144]'Cause I remember it all, all, all\n[04:41.263]\n[04:43.355]They say all's well that ends well, but I'm in a new Hell\n[04:48.561]Every time you double-cross my mind\n[04:53.805]You said if we had been closer in age maybe it would have been fine\n[05:01.126]And that made me want to die\n[05:04.062]The idea you had of me, who was she?\n[05:06.725]A never-needy, ever-lovely jewel whose shine reflects on you\n[05:14.774]Not weeping in a party bathroom\n[05:16.723]Some actress asking me what happened, you\n[05:21.251]That's what happened, you\n[05:24.976]You who charmed my dad with self-effacing jokes\n[05:29.910]Sipping coffee like you're on a late-night show\n[05:34.626]But then he watched me watch the front door all night, willing you to come\n[05:40.017]And he said, \"It's supposed to be fun turning twenty-one\"\n[05:44.580]\n[05:59.218]Time won't fly, it's like I'm paralyzed by it\n[06:03.945]I'd like to be my old self again, but I'm still trying to find it\n[06:08.581]After plaid shirt days and nights when you made me your own\n[06:13.387]Now you mail back my things and I walk home alone\n[06:18.876]But you keep my old scarf from that very first week\n[06:23.907]'Cause it reminds you of innocence and it smells like me\n[06:29.100]You can't get rid of it\n[06:31.263]'Cause you remember it all too well, yeah\n[06:39.599]'Cause there we are again when I loved you so\n[06:44.718]Back before you lost the one real thing you've ever known\n[06:48.814]\n[06:49.968]It was rare, I was there\n[06:52.146]I remember it all too well\n[06:59.836]Wind in my hair, you were there\n[07:02.519]You remember it all\n[07:05.148]Down the stairs, you were there\n[07:07.834]You remember it all\n[07:10.054]It was rare, I was there\n[07:12.690]I remember it all too well\n[07:17.955]\n[07:19.422]And I was never good at telling jokes, but the punch line goes\n[07:25.394]\"I'll get older, but your lovers stay my age\"\n[07:30.755]From when your Brooklyn broke my skin and bones\n[07:35.723]I'm a soldier who's returning half her weight\n[07:41.052]And did the twin flame bruise paint you blue?\n[07:46.254]Just between us, did the love affair maim you, too?\n[07:51.536]'Cause in this city's barren cold\n[07:55.633]I still remember the first fall of snow\n[08:00.955]And how it glistened as it fell\n[08:04.987]I remember it all too well\n[08:09.844]\n[08:12.575]Just between us, did the love affair maim you all too well?\n[08:22.645]Just between us, do you remember it all too well?\n[08:32.821]Just between us, I remember it (Just between us), all too well\n[08:43.434]Just between us, I remember it\n[08:48.456]Wind in my hair, I was there, I was there I was there\n[08:54.495]Down the stairs, I was there, I was there I was there\n[08:59.681]Sacred prayer, I was there, I was there\n[09:05.017]It was rare, you remember it all too well\n[09:09.981]Wind in my hair, I was there, I was there\n[09:14.700]Down the stairs, I was there, I was there I was there\n[09:20.746]Sacred prayer, I was there, I was there\n[09:25.604]It was rare, you remember it all too well\n[09:30.000]Wind in my hair, I was there, I was there\n[09:35.699]Down the stairs, I was there, I was there\n[09:40.943]Sacred prayer, I was there, I was there\n[09:46.521]It was rare, you remember it\n",
        autoplay: true,
        theme: this.randomColor(),
      },
      {
        name: 'Ours',
        artist: 'Taylor Swift',
        url: "http://m702.music.126.net/20220315144732/cd8c19873fb1acc0b72f312746b002ca/jd-musicrep-ts/31ce/686a/d891/1b510ca2e3d609d7638d64b167d560ed.mp3",
        cover: "http://p2.music.126.net/fyKxfDUUIL65oDwSgtDLMw==/109951166119330991.jpg?param=130y130", // prettier-ignore
        lrc: "[00:00.000] 作词 : Taylor Swift/Shellback/Max Martin\n[00:01.000] 作曲 : Taylor Swift/Shellback/Max Martin\n[00:13.45]He said, \"Let's get out of this town\n[00:16.25]Drive out of the city, away from the crowds\"\n[00:20.14]I thought, \"Heaven can't help me now\"\n[00:23.19]Nothing lasts forever\n[00:25.78]But this is gonna take me down\n[00:27.90]He's so tall and handsome as hell\n[00:31.22]He's so bad, but he does it so well\n[00:34.35]I can see the end as it begins\n[00:37.52]My one condition is\n[00:40.91]Say you'll remember me\n[00:43.85]Standing in a nice dress\n[00:45.52]Staring at the sunset, babe\n[00:48.20]Red lips and rosy cheeks\n[00:50.62]Say you'll see me again\n[00:52.31]Even if it's just in your\n[00:54.96]Wildest dreams, ah-aah, haa\n[01:01.59]Wildest dreams, ah-aah, haa\n[01:11.93]I said, \"No one has to know what we do\"\n[01:14.72]His hands are in my hair, his clothes are in my room\n[01:18.45]And his voice is a familiar sound\n[01:21.44]Nothing lasts forever\n[01:23.77]But this is gettin' good now\n[01:26.36]He's so tall and handsome as hell\n[01:29.52]He's so bad, but he does it so well\n[01:32.66]And when we've had our very last kiss\n[01:36.19]My last request, it is\n[01:39.48]Say you'll remember me\n[01:42.18]Standing in a nice dress\n[01:43.86]Staring at the sunset, babe\n[01:46.44]Red lips and rosy cheeks\n[01:48.91]Say you'll see me again\n[01:50.69]Even if it's just in your\n[01:53.24]Wildest dreams, ah-aah, haa(Ah-ahh, haa)\n[02:00.26]Wildest dreams, ah-aah, haa\n[02:06.96]You'll see me in hindsight, tangled up with you all night\n[02:10.51]Burnin' it down\n[02:13.91]Someday when you leave me, I'd bet these memories\n[02:17.60]Follow you around\n[02:20.73]You'll see me in hindsight, tangled up with you all night\n[02:24.23]Burning (Burning) it (It) down (Down)\n[02:27.53]Someday when you leave me, I'll bet these memories\n[02:30.79]Follow (Follow) you (You) around (Around)\n[02:34.82](Follow you around)\n[02:38.22]Say you'll remember me\n[02:40.60]Standing in a nice dress\n[02:42.28]Staring at the sunset, babe\n[02:45.01]Red lips and rosy cheeks\n[02:47.33]Say you'll see me again\n[02:49.01]Even if it's just pretend\n[02:53.75]Say you'll remember me\n[02:55.96]Standing in a nice dress\n[02:57.84]Staring at the sunset, babe\n[03:00.08]Red lips and rosy cheeks\n[03:02.65]Say you'll see me again\n[03:04.53]Even if it's just in your (Pretend, just pretend)\n[03:07.72]Wildest dreams, ah-aah, ha (Ah-aah-aah-aah-aah-hafhaa)\n[03:13.89]In your wildest dreams, ah-aah, haa\n[03:18.22]Even if it's just in your\n[03:20.22]Wildest dreams, ah-aah, haa\n[03:27.22]In your wildest dreams, ah-aah, haa\n",
        autoplay: true,
        theme: this.randomColor(),
      }
      ]
    }
  },
  created () {
    if (this.$store.state.songId != null) {
      this.id = this.$store.state.songId
    }
    this.$root.$on('songId', (value) => {
      this.$store.state.songId = value
      this.playMusic(value)
    })
    // 获取歌曲信息
    this.$http({
      url: '/music/song/detail',
      method: 'get',
      params: {
        ids: this.id
      }
    }).then(res => {
      this.audio[0].name = res.data.songs[0].name
      this.audio[0].artist = res.data.songs[0].ar[0].name
      this.audio[0].cover = res.data.songs[0].al.picUrl
    })
    // 获取歌词
    this.$http({
      url: '/music/lyric',
      method: 'get',
      params: {
        id: this.id
      }
    }).then(res => {
      const lrc = this.audio[0].lrc = res.data.lrc.lyric
      this.audio[0].lrc = lrc
    })
    // }
    // 获取歌曲音源
    this.$http({
      url: '/music/song/url',
      method: 'get',
      params: {
        id: this.id
      }
    }).then(res => {
      const url = res.data.data[0].url
      // 设置播放地址
      this.audio[0].url = url
    })
  },
  methods: {
    randomColor () {
      return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
    },
    playMusic (songId) {
      this.$http({
        url: '/music/song/detail',
        method: 'get',
        params: {
          ids: songId
        }
      }).then(res => {
        this.audio[0].name = res.data.songs[0].name
        this.audio[0].artist = res.data.songs[0].ar[0].name
        this.audio[0].cover = res.data.songs[0].al.picUrl
      })
      // 获取歌词
      this.$http({
        url: '/music/lyric',
        method: 'get',
        params: {
          id: songId
        }
      }).then(res => {
        const lrc = this.audio[0].lrc = res.data.lrc.lyric
        this.audio.lrc = lrc
      })
      // }
      // 获取歌曲音源
      this.$http({
        url: '/music/song/url',
        method: 'get',
        params: {
          id: songId
        }
      }).then(res => {
        const url = res.data.data[0].url
        // 设置播放地址
        this.audio[0].url = url
      })
    }
  }
}
</script>

<style scoped>

</style>
