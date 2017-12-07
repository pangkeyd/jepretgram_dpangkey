<template>
  <div class="gallery">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Caption</th>
          </tr>
        </thead>
        <tbody v-for="(gal, index) in gallery" :key="index">
          <tr>
            <th>{{ index + 1 }}</th>
            <th>
              <img :src="gal.image" width="80">
            </th>
            <th>
              {{ gal.caption }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'gallery'
    ])
  },
  methods: {
    ...mapActions([
      'getGallery'
    ])
  },
  mounted () {
    this.getGallery()
  }
}
</script>

<style>

</style>
