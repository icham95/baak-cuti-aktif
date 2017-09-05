<template>
  <div>
    <div style="width:100%;">
      <div style="width:200px;margin:0 auto;">
        <img src='/static/stikom.png' style="">
      </div>
    </div>
    <div style="text-align:center;">
      <h2>DITERIMA CUTI MAHASISWA</h2>
    </div>
    <div v-if="!diterima">
      tidak ada mahasiswa cuti
    </div>
    <md-layout md-gutter>
      <md-layout v-for="(item, index) in diterima" 
        md-flex-xsmall="50" md-flex-small="30" md-flex-medium="30" md-flex-large="30"
        style="margin-right:10px;margin:bottom:10px;" :key = "index">
        <md-card md-with-hover
          style="background-color:dodgerblue;color:white;width:100%;margin-right:10px;margin-bottom:10px;">
          <md-button class="md-fab md-mini" 
            @click.native.prevent = "singleItem(item)"
            style="position:absolute;right:0px;background-color:indigo;color:gold;">
            <md-icon>visibility</md-icon>
          </md-button>

          <md-card-header>
            <div class="md-title">{{item.c_npm}}</div>
            <div> {{ item.c_nama_lengkap }} </div>
            <div class="">
              <div> Pada : {{ item.mahasiswa_cuti_dibuat }} </div>
              <div> status: 
                <label v-if="item.status == 1"> Menunggu pembayaran administrasi </label>
                <label v-if="item.status == 2"> Menunggu konfirmasi baak </label>
                <label v-if="item.status == 5"> Mahasiswa cuti </label>
              </div>
            </div>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-raised md-accent" @click.native.prevent = "tolakMhsCuti(item)">
              <md-icon>rotate_90_degrees_ccw</md-icon>
              Cancel
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
      gantiMhsCutiStatusFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.karyawan_id) {
          if (val.resp.success === true) {
            if (val.resp.status_back.toString() === '2') {
              this.$swal('Sukses', 'Berhasil di tolak', 'success')
            }
            this.getDiterima()
          }
        }
      },
      getDiterimaCutiBaakFeedback (val) {
        if (this.$localStorage.get('auth').user.id === val.id) {
          this.diterima = val.resp.data
        }
      },
      cancelPembayaranAdministrasiCutiFeedback (val) {
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
          <div> <b> Program studi </b> </div>
          <div> ${item.c_program_studi} </div>
          <hr>
          <div> <b> Semester tahun akademik </b> </div>
          <div> ${item.c_semester_tahun_akademik} </div>
          <hr>
          <div> <b> Alamat rumah </b> </div>
          <div> ${item.c_alamat_rumah} </div>
          <hr>
          <div> <b> Telepon </b> </div>
          <div> ${item.c_telepon} </div>
          <hr>
          <div> <b> Jumlah semester diselesaikan </b> </div>
          <div> ${item.c_jumlah_semester_diselesaikan} </div>
          <hr>
          <div> <b> Jumlah sks diperoleh </b> </div>
          <div> ${item.c_jumlah_sks_diperoleh} </div>
          <hr>
          <div> <b> IPK </b> </div>
          <div> ${item.c_ipk_diperoleh} </div>
          <hr>
          <div> <b> Cuti pada semester </b> </div>
          <div> ${item.c_cuti_disemester} </div>
          <hr>
          <div> <b> Tahun </b> </div>
          <div> ${item.c_cuti_tahun_akademik} </div>
          <hr>
          <div> <b> Karena </b> </div>
          <div> ${item.c_karena} </div>
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
      tolakMhsCuti (item) {
        let data = {
          cuti_id: item.mahasiswa_cuti_id,
          npm: item.npm,
          karyawan_id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          status: 2
        }
        this.$socket.emit('gantiMhsCutiStatus', data)
      },
      getDiterima () {
        let data = {
          id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token
        }
        this.$socket.emit('getDiterimaCutiBaak', data)
      },
      cancelPembayaranAdministrasi (item) {
        let data = {
          id: this.$localStorage.get('auth').user.id,
          token: this.$localStorage.get('auth').token,
          npm: item.npm,
          cuti_id: item.mahasiswa_cuti_id
        }
        this.$socket.emit('cancelPembayaranAdministrasiCuti', data)
      }
    },
    mounted () {
      this.getDiterima()
    }
  }
</script>
