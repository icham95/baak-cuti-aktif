<template>
  <div>
    <div style="margin: 10px auto;width:60%;">
      <md-whiteframe class="main1">
        <div><b>LIST CHAT</b></div>
        <div class="list" v-if="listOrang.length < 1"> tidak ada list chat </div>
        <div v-for="item in listOrang" class="list" @click = "go(item.npm)" style="border-bottom:1px solid gray;">
          <b>{{ item.nama_lengkap }}</b>
          <label> @{{ item.username }} </label>
        </div>
      </md-whiteframe>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fotoMhs: null,
        listOrang: {}
      }
    },
    sockets: {
      sendMsgFromMhsF (val) {
        if (val.resp.success === true) {
          this.list()
        }
      }
    },
    methods: {
      go (npm) {
        this.$router.push('/home/baak-pm/' + npm)
      },
      list () {
        this.$http.get(this.$config.API + 'api/chat/list', {
          headers: {
            Authorization: this.$localStorage.get('auth').token
          }
        })
        .then(resp => {
          this.listOrang = resp.body.data
        })
      },
      send () {
        console.log('oke')
      }
    },
    mounted () {
      this.list()
      // console.log(this.$children[1])
    }
  }
</script>
<style scoped>
.main1 {
  text-align:center;
  width: 100%;
  margin-right:20px;
  float:left;
  background-color:white;
}
.main2 {
  padding:10px;
  position:relative;
  width:60%;
  height: 88vh;
  float:left;
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
  background-color:rgba(0,0,0,0.5);
  margin-bottom: 10px;
}
.list {
  width:100%;
  padding: 5px;
  cursor:pointer;
  position:relative;
}
.list:hover {
  background-color:indigo;
  color:white;
}
.list > b {
  font-size:14px;
}
.list > label {
  display:block;
  font-size: 12px;
}
</style>
