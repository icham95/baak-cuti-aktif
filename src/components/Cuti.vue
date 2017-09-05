<template>
  <div>
    <div style="width:100%;background-color:mediumslateblue;padding:10px;text-align:center;">
      <button @click.prevent = "goMenu('/home/cuti/permintaan')"> Permintaan </button>
      <button @click.prevent = "goMenu('/home/cuti/diterima')"> Diterima </button>
    </div>
    <transition name="fade">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    methods: {
      goMenu (url) {
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped>
  button {
    border:0px;
    padding:10px;
    color: white;
    background-color:crimson;
    cursor:pointer;
  }
</style>
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

