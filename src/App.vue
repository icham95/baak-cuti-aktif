<template>
  <div id="app">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1;cursor:pointer;" @click = "$router.push('/')">Baak</h2>

      <md-button class="md-icon-button" @click=" menu = false " v-if="$localStorage.get('auth').logged === true">
        <md-icon>menu</md-icon>
      </md-button>

      <md-button class="" @click=" $router.push('login') " v-if="$localStorage.get('auth').logged === false">
        Login
      </md-button>
    </md-toolbar>

    <md-layout md-gutter md-align="center">
      <md-layout md-flex-xsmall="90" md-flex-small="90" md-flex-medium="90" md-flex-large="80">
        <router-view></router-view>
      </md-layout>
    </md-layout>

    <div class="modal trigerBlock " :class="{ triggerNone : menu }">
      <md-button class="md-icon-button close" @click="menu = true">
        <md-icon class="md-size-2x">close</md-icon>
      </md-button>
      <div style="">
        <button @click.prevent = "goMenu('/home/cuti/permintaan')" class="menu-btn">Cuti</button>
        <button @click.prevent = "goMenu('/home/aktif/permintaan')" class="menu-btn">Aktif kuliah</button>
        <button class="menu-btn" @click.prevent = "logout()">logout</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import Push from 'push.js'
export default {
  sockets: {
    mhsInsertCutiFeedback (val) {
      if (val.resp.success === true) {
        this.play()
        this.push('Ada permintaan mahasiswa cuti baru.')
      }
    },
    mhsPembayaranStatusTigaFeedback (val) {
      if (val.resp.success === true) {
        this.play()
        this.push('Ada pembayaran mahasiswa cuti baru.')
      }
    },
    mhsInsertAktifFeedback (val) {
      if (val.resp.success === true) {
        this.play()
        this.push('Ada permintaan mahasiswa aktif kuliah baru.')
      }
    },
    mhsPembayaranStatusTigaAktifFeedback (val) {
      if (val.resp.success === true) {
        this.play()
        this.push('Ada pembayaran mahasiswa aktif kuliah baru.')
      }
    },
    sendMsgFromMhsF (val) {
      console.log(val)
      if (val.resp.success === true) {
        this.play()
        this.push(val.resp.data_back.npm + ' : ' + val.resp.data_back.msg, 'Pesan baru')
      }
    }
  },
  name: 'app',
  data () {
    return {
      menu: true
    }
    // <md-layout md-flex-xsmall="80" md-flex-small="60" md-flex-medium="50" md-flex-large="90">
  },
  methods: {
    push (msg, title = 'Notification') {
      Push.create(title, {
        body: msg,
        icon: '/static/stikom.png',
        timeout: (99999 * 99999 * 99999 * 99999 * 99999 * 999999 * 999999 * 999999) * 999999999,
        requireInteraction: true,
        onClick: function () {
          window.focus()
          this.close()
        }
      })
    },
    logout () {
      this.$localStorage.set('auth', {
        logged: false,
        token: null
      })
      this.menu = true
      this.$router.push('/login')
    },
    goMenu (url) {
      this.menu = true
      this.$router.push(url)
    },
    play () {
      var audio = new Audio('/static/music/served.mp3')
      audio.play()
    }
  }
}
</script>

<style scoped>
.modal {
  width:100%;
  height:100vh;
  background-color:rgba(0,0,0,0.85);
  position:fixed;
  top:0;
  z-index:2;
}

.triggerBlock {
  display:block;
}

.triggerNone {
  display:none;
}

.close {
  position:absolute;
  top:10px;
  right:10px;
  color:red;
}

.menu-btn {
  width:70%;
  padding:15px;
  background-color:dodgerblue;
  color:white;
  font-size:24px;
  border:0px;
  margin:0 auto;
  display:block;
  margin-top:10px;
  cursor:pointer;
}
</style>
