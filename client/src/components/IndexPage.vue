<template>
  <div class="index_page">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Input Photo</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-left">
          <form @submit.prevent="addGal" enctype="multipart/form-data">
            <div class="form-group" v-if="!image">
              <label for="exampleInputFile">File input</label>
              <input type="file" @change="onFileChange">
            </div>
            <div class="form-group" v-else>
              <button @click.prevent="removeImage">
                <i class="fa fa-times" aria-hidden="true"></i>
              </button>
              <img :src="image" width="80">
            </div>
            <div class="form-group">
              <label for="caption">Caption</label>
              <input type="text" class="form-control" id="caption" placeholder="Caption" v-model="formGal.caption">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <div class="row">
        <gal-el></gal-el>
      </div>
    </div>
  </div>
</template>

<script>
import Gallery from './Gallery.vue'

export default {
  components: {
    'gal-el': Gallery
  },
  data () {
    return {
      image: '',
      formGal: {
        image: '',
        caption: ''
      }
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      this.formGal.image = files[0]
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      // var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    },
    addGal: function () {
      this.$store.dispatch('addGal', this.formGal)
    }
  }
}
</script>

<style>

</style>
