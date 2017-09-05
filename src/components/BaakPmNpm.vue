<template>
  <div style="width:60%;margin: 0 auto;">
  <md-whiteframe class="main2">
    <div v-for ="item in coremsg" v-if="coremsg != null" class="content">
      <div class="chat-baak" v-if="item.status == 1">
        <div class="info" style="background-color:dodgerblue;color:gold;">
            <h2 style="text-align:center;">MHS</h2>
        </div>
        <div class="msg">
          <div>
            {{ item.nama_lengkap }}
          </div>
          <div>
            pesan : {{ item.msg }}
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>

      <div class="chat-mhs" v-if ="item.status == 2">
        <div class="info" style="background-color:teal;color:white;">
          <h2 style="text-align:center;"> BAAK </h2>
        </div>
        <div class="msg" style="min-height:60px;">
          <div>
            message : {{ item.msg }}
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <div class="bottom">
      <input type="text" v-model="msg" @keyup.enter = "send()" style="border:1px solid gray;"> 
      <button @click.prevent = "send()" style="padding:10px;border:0px;background-color:dodgerblue;color:white;cursor:pointer">
      kirim</button>
    </div>
  </md-whiteframe>
  </div>
</template>

<script>
  export default {
    sockets: {
      sendMsgFromBaakF (val) {
        if (val.resp.success === true) {
          if (val.npm === this.$route.params.npm) {
            this.get()
          }
        }
      },
      sendMsgFromMhsF (val) {
        if (val.resp.success === true) {
          if (val.npm === this.$route.params.npm) {
            this.get()
          }
        }
      }
    },
    data () {
      return {
        msg: null,
        coremsg: {},
        foto: null
      }
    },
    methods: {
      get () {
        this.$http.get(this.$config.API + 'api/chat/get/' + this.$route.params.npm, {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          console.log(resp)
          this.coremsg = resp.body.data
        })
      },
      send () {
        this.$socket.emit('sendMsgFromBaak', {
          npm: this.$route.params.npm,
          msg: this.msg,
          token: this.$localStorage.get('auth').token
        })
        this.msg = null
      }
    },
    mounted () {
      // console.log(this.$route.params.npm)
      this.get()
    }
  }
</script>

<style scoped>
.main2 {
  padding:10px;
  position:relative;
  width:100%;
  margin:0 auto;
  height: 80vh;
  float:left;
  overflow-y: scroll;
  background-color:white;
}
.bottom {
  width:100%;
  position:fixed;
  z-index:2;
  bottom:10px;
}
.bottom > input {
  width: 40%;
  padding: 10px;
}
.bottom > button {
  width: 10%;
}
.chat-baak {
  width:100%;
  margin-bottom: 10px;
}
.chat-baak > .info {
  float:left;width:20%;
}
.chat-baak > .msg {
  width: 80%;
  color:white;
  padding: 10px;
  float:left;
  background-color:rgba(0,0,0,0.5)
}

.chat-mhs {
  width:100%;
}
.chat-mhs > .info {
  float:right;width:20%;
}
.chat-mhs > .msg {
  width: 80%;
  color:white;
  padding: 10px;
  float:right;
  background-color:rgba(0,0,0,0.7);
  margin-bottom: 10px;
}
</style>

