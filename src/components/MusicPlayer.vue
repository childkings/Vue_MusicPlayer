<template>
  <div class="container_child">
    <div class="music_box">
      <div class="music_body w">
        <div class="music_actions">
          <!-- <div class="last_song">
            <div class="el-icon-d-arrow-left"></div>
          </div> -->
          <div class="state_song" @click="play">
            <div class="el-icon-video-pause" v-if="songState"></div>
            <div class="el-icon-video-play" v-else></div>
          </div>
          <!-- <div class="next_song">
            <div class="el-icon-d-arrow-right"></div>
          </div> -->
        </div>
        <div class="music_message_box">
          <div class="music_cover">
            <img src="../assets/newbg1.589fd28d.png" alt="">
            <i></i>
          </div>
          <div class="music_message">
            <div class="music_message_top">
              <div class="music_title">{{title}}</div>
              <div class="music_author">{{author}}</div>
            </div>
            <div class="music_message_bottom">
                <div class="block">
                  <el-slider v-model="audioNowTime" :show-tooltip="false" :disabled="sliderState" :max="audioTopTime" @change="sliderAction"></el-slider>
                </div>
                <div class="music_computed">
                  <span>{{audioNowTimeStr}}</span>
                  <span>/{{audioTopTimeChange}}</span>
                </div>
            </div>
          </div>
        </div>
        <div class="volume">
          <div class="el-icon-headset" @click="volumeStateTrue" v-if="volumeState===false"></div>
          <div class="block" @mouseleave="volumeStateFalse">
            <el-slider v-model="volume" :disabled="sliderState" v-if="volumeState" @input="volumeAction" @change="volumeActionEnd"></el-slider>
          </div>
        </div>
      </div>
      <audio :src="`https://music.163.com/song/media/outer/url?id=${$store.getters.showAudioMessage.id}.mp3`" ref="audioPlayer" autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      audioMessage: null,
      songState: false,
      sliderState: true,
      audioNowTime: 0,
      audioNowTimeStr: '00:00',
      audioTopTime: 0,
      title: 'null',
      author: 'null',
      interval: null,
      temp: 0,
      volume: 20,
      volumeState: false
    }
  },
  methods: {
    play () {
      if (this.sliderState === true) {
        return true
      } else {
        if (this.songState === false) {
          this.$refs.audioPlayer.play()
          this.songState = true
        } else {
          this.$refs.audioPlayer.pause()
          this.songState = false
        }
      }
    },
    audioNowTimeAdd () {
      this.audioNowTime = this.$refs.audioPlayer.currentTime
    },
    sliderAction (val) {
      this.$refs.audioPlayer.currentTime = val
    },
    volumeStateTrue () {
      if (this.songState) {
        this.volumeState = true
      }
    },
    volumeStateFalse () {
      this.volumeState = false
    },
    volumeAction (val) {
      this.$refs.audioPlayer.volume = val / 100
    },
    volumeActionEnd () {
      this.volumeState = false
    }
  },
  watch: {
    songState (newVal) {
      if (newVal === true) {
        this.interval = window.setInterval(this.audioNowTimeAdd, 100)
      } else {
        window.clearInterval(this.interval)
      }
    },
    audioNowTime (newVal) {
      if (this.$refs.audioPlayer.ended) {
        this.audioNowTime = 0
        this.songState = false
      }
      const newValFloor = Math.round(newVal)
      let temp = (newValFloor - (newValFloor % 60)) / 60
      if (temp < 10) {
        temp = '0' + temp
      }
      let guess = newValFloor % 60
      if (guess < 10) {
        guess = '0' + guess
      }
      this.audioNowTimeStr = `${temp}:${guess}`
    }
  },
  computed: {
    audioTopTimeChange () {
      let temp = (this.audioTopTime - (this.audioTopTime % 60)) / 60
      if (temp < 10) {
        temp = '0' + temp
      }
      let guess = this.audioTopTime % 60
      if (guess < 10) {
        guess = '0' + guess
      }
      return `${temp}:${guess}`
    }
  },
  mounted () {
    document.querySelector('.el-slider__runway').style.margin = 0
    document.querySelector('.el-slider__bar').style.backgroundColor = 'rgb(2, 114, 64)'
    document.querySelector('.el-slider__button').style.borderColor = 'rgb(2, 114, 64)'
  },
  updated () {
    this.title = this.$store.getters.showAudioMessage.name
    this.author = this.$store.getters.showAudioMessage.artists[0].name
    this.sliderState = false
    document.querySelector('audio').addEventListener('durationchange', () => {
      this.songState = true
      this.audioNowTime = 0
      this.audioTopTime = Math.round(document.querySelector('audio').duration)
      this.$refs.audioPlayer.volume = 0.2
    })
    if (this.volumeState) {
      document.querySelectorAll('.el-slider__runway').forEach(val => {
        val.style.margin = 0
      })
      document.querySelectorAll('.el-slider__bar').forEach(val => {
        val.style.backgroundColor = 'rgb(2, 114, 64)'
      })

      document.querySelectorAll('.el-slider__button').forEach(val => {
        val.style.borderColor = 'rgb(2, 114, 64)'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
.container_child:hover {
  margin: 0;
  transition: margin .7s;
}
.container_child {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 999;
  opacity: .95;
  margin-bottom: -30px;
  transition: margin .7s;
  .music_box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(37, 49, 63);
    .music_body {
      display: flex;
      height: 100%;
      align-items: center;
      .music_actions {
        height: 100%;
        display: flex;
        align-items: center;
        >div {
          font-size: 20px;
          color: rgb(81, 250, 174);
          cursor: pointer;
        }
        >div:hover {
          color: rgb(154, 253, 209);
          text-shadow: 1px 1px 8px rgb(11, 177, 102);
        }
        .state_song {
          margin: 0 10px;
          font-size: 40px;
        }
      }
      .music_message_box {
        margin-left: 60px;
        margin-right: 20px;
        display: flex;
        align-items: center;
        height: 100%;
        .music_cover {
          position: relative;
          width: 35px;
          height: 35px;
          border-radius: 4px;
          border: 1px solid rgb(67, 138, 106);
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
          i {
            position:absolute;
            left: 0;
            top: 0;
            font-style: none;
            border: 17.5px solid;
            border-color: rgb(2, 114, 64) transparent transparent rgb(65, 184, 131);
            opacity: .2;
          }
        }
        .music_message {
          height: 100%;
          margin-left: 20px;
          padding-top: 7px;
          .music_message_top {
            display: flex;
            >div:hover {
              text-decoration: underline;
            }
            .music_title {
              margin-right: 10px;
              color: white;
              font-size: 13px;
            }
            .music_author {
              color: #9b9b9b;
              font-size: 5px;
            }
          }
          .music_message_bottom {
            display: flex;
            align-items: center;
            .block {
              width: 800px;
              height: 20px;
              .el-slider {
                height: 100%;
                margin-top: 7px;
              }
            }
            .music_computed {
              margin-left: 5px;
              margin-top: 0px;
              >span {
                font-size: 10px;
              }
              >span:first-child {
                color: white;
              }
              >span:last-child {
                color: #9b9b9b;
              }
            }
          }
        }
      }
      .volume {
        flex:1;
        height: 20px;
        position: relative;
        color: white;
        .block {
          height: 15px;
          padding: 3px;
          padding-left: 5px;
          margin-top: 10px;
        }
        .el-icon-headset {
          margin-top: 5px;
          font-size: 20px;
          color: rgb(90, 250, 178);
        }
        .el-icon-headset:hover {
          color: rgb(154, 253, 209);
          text-shadow: 1px 1px 8px rgb(11, 177, 102);
          cursor: pointer;
        }
      }
    }
  }
  audio {
    width: 100%;
  }
}
</style>
