<template>
  
  <div style="width:100%;margin:0 auto;">
    <div style="position:fixed;z-index:-1;width:20%;margin:0 auto;">
      
    </div>
    <transition name="fade">
        <router-view></router-view>
    </transition>
  </div>

</template>

<script>
  export default {
    mounted () {
      let auth = this.$localStorage.get('auth')
      if (auth.logged === false) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
} 

</style>
