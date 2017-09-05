<template>
  <div>
    <div style="width:100%;">
      <div style="width:200px;margin:0 auto;">
        <img src='/static/stikom.png' style="">
      </div>
    </div>
    <div style="text-align:center;">
      <h2>DITERIMA AKTIF KULIAH MAHASISWA</h2>
    </div>
    <div v-if="!diterima">
      tidak ada mahasiswa aktif kuliah
    </div>
    <md-layout md-gutter>
      <md-layout v-for="(item, index) in diterima" 
        md-flex-xsmall="50" md-flex-small="30" md-flex-medium="30" md-flex-large="30"
        style="">
        <md-card md-with-hover 
          style="background-color:dodgerblue;color:white;width:100%;margin-right:10px;margin-bottom:10px;">
          <md-button class="md-fab md-mini" 
            @click.native.prevent = "singleItem(item)"
            style="position:absolute;right:0px;background-color:indigo;color:gold;">
            <md-icon>visibility</md-icon>
          </md-button>

          <md-card-header>
            <div class="md-title">{{item.c_npm}}</div>
            <div class="">
              <div> {{ item.c_nama_lengkap }} </div>
              <div> Pada : {{ item.mahasiswa_aktif_kuliah_dibuat }} </div>
            </div>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-raised md-accent" @click.native.prevent = "tolakMhsAktif(item)">Cancel</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  export default {
    sockets: {
      gantiBaakAktifStatusFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.karyawan_id) {
          if (val.resp.success === true) {
            if (val.resp.status_back.toString() === '2') {
              this.$swal('Sukses', 'Berhasil di tolak', 'success')
            }
            this.getDiterima()
          }
        }
      },
      getDiterimaAktifBaakFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.id) {
          this.diterima = val.resp.data
        }
      },
      cancelPembayaranAdministrasiAktifFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.id) {
          if (val.resp.success === true) {
            this.$swal('sukses', 'pembayaran telah di cancel', 'success')
            this.getDiterima()
          } else {
            this.$swal('Oopps', 'pembayaran gagal di cancel', 'warning')
          }
        }
      }
    },
    data () {
      return {
        diterima: {}
      }
    },
    methods: {
      singleItem (item) {
        let html = `
          <div> <b> Nama lengkap </b> </div>
          <div> ${item.c_nama_lengkap} </div>
          <hr>
          <div> <b> NPM </b> </div>
          <div> ${item.c_npm} </div>
          <hr>
          <div> <b> Semester </b> </div>
          <div> ${item.c_semester} </div>
          <hr>
          <div> <b> Program studi </b> </div>
          <div> ${item.c_program_studi} </div>
          <hr>
          <div> <b> Tahun akademik </b> </div>
          <div> ${item.c_tahun_akademik} </div>
          <hr>
          <div> <b> Nama orang tua/wali </b> </div>
          <div> ${item.c_nama_orang_tua_wali} </div>
          <hr>
          <div> <b> NIP/NRP </b> </div>
          <div> ${item.c_nip_nrp} </div>
          <hr>
          <div> <b> Pangkat </b> </div>
          <div> ${item.c_pangkat} </div>
          <hr>
          <div> <b> Golongan </b> </div>
          <div> ${item.c_golongan} </div>
          <hr>
          <div> <b> Instansi </b> </div>
          <div> ${item.c_instansi} </div>
          <hr>
          <div> <b> Dibuat </b> </div>
          <div> ${item.dibuat} </div>
          <hr>
        `
        this.$swal({
          title: 'Detail',
          html: html,
          imageUrl: item.pic,
          imageWidth: 400,
          imageHeight: 200,
          animation: true
        })
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
      single (item) {
        this.$swal({
          title: item.npm,
          text: 'lorem',
          imageUrl: item.pic
        })
      },
      getDiterima () {
        let data = {
          id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token
        }
        this.$socket.emit('getDiterimaAktifBaak', data)
      },
      cancelPembayaranAdministrasi (item) {
        let data = {
          id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          npm: item.npm
        }
        this.$socket.emit('cancelPembayaranAdministrasiAktif', data)
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
      }
    },
    mounted () {
      this.getDiterima()
    }
  }
</script>
