<template>
  <div class="favourite">
    <headers text='我的收藏'></headers>
    <list :heroes='heroes'></list>
  </div>
</template>

<script>
import Headers from "@/components/headers"; 
import List from '@/views/Home/heroList'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      heroes: []
    }
  },
  mounted() {
    this.heroes = this.userData.heroes.filter(hero => hero.like)
  },
  computed: {
    ...mapState(['userData'])
  },

  components: {
    Headers,
    List
  }
}
</script>

<style lang='stylus' scoped>
</style>