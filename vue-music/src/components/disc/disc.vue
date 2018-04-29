<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_ok} from 'api/config'
  import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'


  export default {
    computed:{
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      },
       ...mapGetters([
         'disc'
       ])
    },
    data(){
      return {
        songs:[]
      }
    },
    created(){
       this._getSongList()
    },
    methods:{ 
       _getSongList(){
         if(!this.disc.dissid){
           this.$router.push('/recommend')
           return
         }
         getSongList(this.disc.dissid).then((res)=>{
            if(res.code===ERR_ok){
              processSongsUrl(this._normalizeSong(res.cdlist[0].songlist)).then((songs)=>{
                this.songs = songs
              })
            }
         })
       },
       _normalizeSong(list){
         let ret = []
         list.forEach((musicData)=>{
           if(isValidMusic(musicData)){
             ret.push(createSong(musicData))
           }
         })
         return ret
       }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>