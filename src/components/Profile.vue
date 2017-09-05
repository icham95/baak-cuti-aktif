<template>
  <div class="main">
    <md-card style="min-height:450px;margin-top:20px;">
      <md-card-media style="position:relative;">
        <a @click.prevent = "t_foto = true" v-if="t_foto == false" href="" 
          class="ganti-gambar" style="color:white;">
          ganti
        </a>

        <a @click.prevent = "t_foto = false" v-if="t_foto == true" href="" 
          class="ganti-gambar" style="color:white">
          cancel
        </a>
        <img v-if="user.foto == null && t_foto == false" src="/static/drawing.png" style="height:250px;">
        <img v-if="user.foto != null && t_foto == false" :src="user.foto" style="height:250px;">

        <div v-if="t_foto == true">
          <picture-input 
            ref="pictureInput" 
            @change="onChange" 
            width="300" 
            height="200" 
            margin="8" 
            accept="image/jpeg,image/png" 
            size="10" 
            buttonClass="btn"
            :customStrings="{
              upload: '<h1>Bummer!</h1>',
              drag: 'drag atau klik.'
            }">
          </picture-input>
          <button class="btn-ganti" style="margin:0 auto;width:30%;display:block;" @click.prevent = "gantiFoto()"> GANTI </button>
        </div>
      </md-card-media>
      <md-card-content>
        <div style="text-align:center;">
          <div class="line">
            <a v-if="t_nama_lengkap == false" @click.prevent = "t_nama_lengkap = true" href="" class="gantiLine"> ganti </a>
            <a v-if="t_nama_lengkap == true" @click.prevent = "t_nama_lengkap = false" href="" class="gantiLine"> cancel </a>
            <b> Nama lengkap </b>
            <br>
            <div v-if = "t_nama_lengkap == false">
              {{ user.nama_lengkap }}
            </div>
            <div v-if= "t_nama_lengkap == true">
              <input class="input" @keyup.enter = "gantiNamaLengkap()" type="text" v-model="nama_lengkap" :placeholder = "user.nama_lengkap">
              <button class="btn-ganti" @click.prevent = "gantiNamaLengkap()"> GANTI </button>
            </div>
          </div>

          <hr>

          <div class="line">
            <a v-if="t_username == false" @click.prevent = "t_username = true" href="" class="gantiLine"> ganti </a>
            <a v-if="t_username == true" @click.prevent = "t_username = false" href="" class="gantiLine"> cancel </a>
            <b> Username </b>
            <br>
            <div v-if = "t_username == false">
              {{ user.username }}
            </div>
            <div v-if= "t_username == true">
              <input class="input" @keyup.enter = "gantiUsername()" type="text" v-model="username" :placeholder = "user.username">
              <button class="btn-ganti" @click.prevent = "gantiUsername()"> GANTI </button>
            </div>
          </div>

          <hr>

          <div class="line">
            <a v-if="t_password == false" @click.prevent = "t_password = true" href="" class=""> ganti password </a>
            <a v-if="t_password == true" @click.prevent = "t_password = false" href="" class=""> cancel </a>
            <div v-if= "t_password == true">
              <input class="input" @keyup.enter = "gantiPassword()" type="text" v-model="password_lama" placeholder="password lama">
              <input class="input" @keyup.enter = "gantiPassword()" type="text" v-model="password_baru" placeholder="password baru">
              <button class="btn-ganti" @click.prevent = "gantiPassword()"> GANTI </button>
            </div>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import PictureInput from 'vue-picture-input'
  export default {
    components: {
      PictureInput
    },
    data () {
      return {
        user: {
          foto: null
        },
        nama_lengkap: null,
        t_nama_lengkap: false,
        username: null,
        t_username: false,
        password_baru: null,
        password_lama: null,
        t_password: false,
        foto: null,
        t_foto: false
      }
    },
    methods: {
      onChange () {
        console.log('New picture selected!')
        this.foto = this.$refs.pictureInput.image
        // console.log(this.$refs.pictureInput.image)
        if (this.$refs.pictureInput.image) {
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      },
      getUser () {
        this.$http.get(this.$config.API + 'api/baak/' + this.$localStorage.get('auth').user.id, {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          if (resp.body.success === true) {
            let data = resp.body.data
            if (data.foto === '') {
              data.foto = null
            }
            this.user = resp.body.data
          }
        })
      },
      gantiNamaLengkap () {
        let url = this.$config.API + 'api/baak/profile'
        let body = {
          nama_lengkap: this.nama_lengkap
        }
        this.$http.post(url, body, {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          if (resp.body.success === true) {
            this.getUser()
            this.$swal('sukses', 'update nama lengkap berhasil.', 'success')
            this.t_nama_lengkap = false
            this.nama_lengkap = null
          }
        })
      },
      gantiUsername () {
        let url = this.$config.API + 'api/baak/profile'
        let body = {
          username: this.username
        }
        this.$http.post(url, body, {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          if (resp.body.success === true) {
            this.getUser()
            this.$swal('sukses', 'update username berhasil.', 'success')
            this.t_username = false
            this.username = null
          }
        })
      },
      gantiPassword () {
        let url = this.$config.API + 'api/baak/profile'
        let body = {
          password_lama: this.password_lama,
          password_baru: this.password_baru
        }
        this.$http.post(url, body, {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          if (resp.body.success === true) {
            this.getUser()
            this.$swal('sukses', 'update password berhasil.', 'success')
            this.t_password = false
            this.password_lama = null
            this.password_baru = null
          } else {
            this.$swal('gagal', resp.body.msg, 'error')
            this.t_password = false
            this.password_lama = null
            this.password_baru = null
          }
        })
      },
      gantiFoto () {
        let url = this.$config.API + 'api/baak/profile'
        let body = {
          foto: this.foto
        }
        this.$http.post(url, body, {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          if (resp.body.success === true) {
            this.getUser()
            this.$swal('sukses', 'update Foto berhasil.', 'success')
            this.t_foto = false
            this.foto = null
          }
        })
      }
    },
    mounted () {
      this.getUser()
    }
  }
</script>

<style scoped>
.main {
  width:50%;
  margin:0 auto;
}
.line {
  width: 100%;
  position:relative;
}
.gantiLine {
  position:absolute;
  top:3px;
  right:3px;
  font-size:11px;
}
.btn-ganti {
  padding: 5px 10px 5px 10px;
  font-size: 11px;
  background-color:dodgerblue;
  border: 0px;
  color:white;
  cursor: pointer;
}
.input {
  width: 100%;
}
.ganti-gambar {
  position:absolute;
  right:3px;
  top:3px;
  background-color:rgba(0,0,0,0.5);
  padding: 5px 10px 5px 10px;
}
</style>
