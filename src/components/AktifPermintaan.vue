<template>
  <div>
    <div style="width:100%;">
      <div style="width:200px;margin:0 auto;">
        <img src='/static/stikom.png' style="">
      </div>
    </div>
    <div style="text-align:center;">
      <h2>PERMINTAAN AKTIF KULIAH MAHASISWA</h2>
    </div>
    <div v-if="!permintaan">
      tidak ada permintaan mahasiswa aktif kuliah
    </div>
    <md-layout md-gutter>
      <md-layout v-for="(item, index) in permintaan" 
        md-flex-xsmall="50" md-flex-small="30" md-flex-medium="30" md-flex-large="30"
        style="margin-right:20px;margin-bottom:20px;">
        <md-card md-with-hover style="color:white;width:100%;" :style="cardChange(item.status)">
          <md-card-header>
            <div class="md-title">{{item.c_npm}} </small> </div>
            <div class="">
              <div> {{ item.c_nama_lengkap }} </div>
              <div> Pada : {{ item.mahasiswa_aktif_kuliah_dibuat }} </div>
              <div> status: 
                <label v-if="item.status == 1"> 
                  Menunggu konfirmasi baak 
                </label>
                <label v-if="item.status == 2"> 
                  Ditolak 
                  <div style="background-color:rgba(0,0,0,0.60);color:snow;padding:10px;">
                    catatan : {{ item.catatan_lebih }} 
                  </div>
                </label>
                <label v-if="item.status == 3"> 
                  Pembayaran 
                  <div style="background-color:rgba(0,0,0,0.60);color:snow;padding:10px;margin-bottom:5px;">
                    Tunggakan : {{ item.tunggakan }} 
                  </div>
                  <div style="background-color:rgba(0,0,0,0.60);color:snow;padding:10px;">
                    catatan : {{ item.catatan_lebih }} 
                  </div>
                </label>
                <label v-if="item.status == 4"> 
                  konfirmasi pembayaran baak 
                  <div style="background-color:rgba(0,0,0,0.60);color:snow;padding:10px;">
                    <div style="text-align:center;">
                      Membayar rekening ke <br>
                      {{ rekening[item.rekening_id].nama_rekening }}
                    </div>
                    <hr>
                    <div style="text-align:center;">
                      No rekening Mahasiswa <br>
                      {{ item.no_rekening_mahasiswa }}
                    </div>
                    <hr>
                    <div style="text-align:center;">
                      Jumlah <br>
                      {{ item.tunggakan }}
                    </div>
                    <hr>
                    <div style="text-align:center;">
                      Catatan <br>
                      {{ item.catatan_lebih2 }}
                    </div>
                    <hr>
                    <div style="text-align:center;">
                      <button
                      style="width:100%;background-color:dodgerblue;
                      border:0px;color:white;padding:5px;cursor:pointer;"
                      @click.prevent = "showFotoBukti(item)"> 
                      Show foto bukti </button>
                    </div>
                  </div>
                </label>
                <label v-if="item.status == 5"> Mahasiswa aktif kuliah </label>
              </div>
            </div>
          </md-card-header>

          <md-card-content>
            <div style="width:100%;" v-if="item.status == 1 || item.status == 2 || item.status == 3">
              <md-input-container class="input">
                <md-icon style="color:white;">
                  event_seat
                  <md-tooltip>Program studi</md-tooltip>
                </md-icon>
                <label style="color:white;">Status</label>
                <md-select name="movie" id="movie" v-model="item.form_status">
                  <md-option value="2">Tolak</md-option>
                  <md-option value="3">diterima dengan form pembayaran</md-option>
                  <md-option value="5">Diterima mahasiswa cuti</md-option>
                </md-select>
              </md-input-container>
            </div>

            <div v-if="item.form_status == 2">
              <textarea v-model="item.form_catatan" style="width:100%;" rows="10" placeholder="catatan"></textarea>
              <md-button class="md-raised md-primary" style="display:block;width:92%;"
                @click.native.prevent = "gantiBaakAktifStatus(item)">
                <md-icon>check</md-icon>
                KIRIM
              </md-button>
            </div>

            <div v-if="item.form_status == 3">
              <input type="text" v-model="item.form_tunggakan" style="width:100%;" placeholder="Tunggakan">
              <textarea v-model="item.form_catatan" style="width:100%;" rows="10" placeholder="catatan"></textarea>
              <md-button class="md-raised md-primary" style="display:block;width:92%;"
                @click.native.prevent = "gantiBaakAktifStatus(item)">
                <md-icon>check</md-icon>
                KIRIM
              </md-button> 
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button v-if="item.status == 200" class="md-raised md-primary" @click.native.prevent = "terimaPembayaranAdministrasi(item)">Terima</md-button>
            <div v-if="item.status == 4">
              <md-button class="md-raised md-primary" @click.native.prevent = "terimaMhsAktif(item)">
                <md-icon>check</md-icon>
                Terima
              </md-button> 
              <md-button class="md-raised md-warn" @click.native.prevent = "tolakMhsAktif(item)">
                <md-icon>check</md-icon>
                Tolak
              </md-button>  
            </div>
            <md-button v-if="item.form_status == 5" class="md-raised md-primary" @click.native.prevent = "terimaMhsAktif(item)">
              <md-icon>check</md-icon>
              Terima
            </md-button> 
          </md-card-actions>
        </md-card>
      </md-layout>

        
    </md-layout>
  </div>
</template>

<script>
  export default {
    sockets: {
      mhsInsertAktifFeedback (val) {
        if (val.resp.success === true) {
          this.getPermintaan()
        }
      },
      mhsPembayaranStatusTigaAktifFeedback (val) {
        if (val.resp.success === true) {
          this.getPermintaan()
        }
      },
      gantiBaakAktifStatusFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.karyawan_id) {
          if (val.resp.success === true) {
            if (val.resp.status_back.toString() === '5') {
              this.$swal('Sukses', 'Menjadikan mahasiswa aktif berhasil', 'success')
            }
            if (val.resp.status_back.toString() === '3') {
              this.$swal('Sukses', 'Diterima dengan pembayaran, berhasil', 'success')
            }
            if (val.resp.status_back.toString() === '2') {
              this.$swal('Sukses', 'Berhasil di tolak', 'success')
            }
            this.getPermintaan()
          }
        }
      },
      uploadAktifFeedback (val) {
        if (val.resp.success === true) {
          this.getPermintaan()
        }
      },
      getPermintaanAktifFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.id) {
          if (val.resp.success === true) {
            let data = val.resp.data
            for (let i = 0; i < data.length; i++) {
              data[i].form_status = null
              data[i].form_catatan = null
              data[i].form_tunggakan = null
            }
            this.permintaan = val.resp.data
            this.rekening = val.resp.rekening
          } else {
            this.permintaan = null
          }
        }
      },
      terimaPembayaranAdministrasiAktifFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.id) {
          if (val.resp.success === true) {
            this.getPermintaan()
            this.$swal('sukses', 'pembayaran berhasil', 'success')
          } else {
            this.$swal('Ooops', 'pembayaran gagal', 'warning')
          }
        }
      }
    },
    data () {
      return {
        permintaan: {},
        rekening: {}
      }
    },
    methods: {
      terimaMhsAktif (item) {
        let data = {
          aktif_id: item.mahasiswa_aktif_kuliah_id,
          npm: item.npm,
          karyawan_id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          status: 5
        }
        this.$socket.emit('gantiBaakAktifStatus', data)
      },
      tolakMhsAktif (item) {
        let data = {
          aktif_id: item.mahasiswa_aktif_kuliah_id,
          npm: item.npm,
          karyawan_id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          status: 2
        }
        this.$socket.emit('gantiBaakAktifStatus', data)
      },
      gantiBaakAktifStatus (item) {
        console.log('oke')
        let data = {
          npm: item.npm,
          karyawan_id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          aktif_id: item.mahasiswa_aktif_kuliah_id,
          status: item.form_status,
          catatan: item.form_catatan,
          tunggakan: item.form_tunggakan
        }
        this.$socket.emit('gantiBaakAktifStatus', data)
      },
      terimaPembayaranAdministrasi (item) {
        let data = {
          id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          npm: item.npm
        }
        this.$socket.emit('terimaPembayaranAdministrasiAktif', data)
      },
      single (item) {
        this.$swal({
          title: item.npm,
          text: 'lorem',
          imageUrl: item.pic
        })
      },
      getPermintaan () {
        let data = {
          id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token
        }
        this.$socket.emit('getPermintaanAktif', data)
      },
      cardChange (status) {
        if (status.toString() === '1') {
          return 'background-color:teal;'
        }
        if (status.toString() === '2') {
          return 'background-color:crimson;'
        }
        if (status.toString() === '3') {
          return 'background-color:indianred;'
        }
        if (status.toString() === '4') {
          return 'background-color:sienna;'
        }
      },
      showFotoBukti (item) {
        this.$swal({
          title: item.c_npm,
          text: 'Foto bukti',
          imageUrl: item.pic
        })
      }
    },
    mounted () {
      this.getPermintaan()
    }
  }
</script>
