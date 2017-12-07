import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

const http = axios.create({
  baseURL: process.env.API_KEY
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    gallery: []
  },
  mutations: {
    setGallery: function (state, payload) {
      state.gallery = payload
    }
  },
  actions: {
    fbLogin: function (context, payload) {
      http.post('/signup', {
        fbID: payload.id,
        name: payload.name,
        email: payload.email
      })
      .then(({data}) => {
        if (data === 'Fb Id already used!') {
          http.post('/signin', {
            fbID: payload.id
          })
          .then(result => {
            localStorage.setItem('qwerty', result.data)
            alert('Success Login!')
            router.push('/')
          })
        } else {
          http.post('/signin', {
            fbID: payload.id
          })
          .then(result => {
            localStorage.setItem('qwerty', result.data)
            router.push('/')
          })
        }
      })
    },
    getGallery: function (context, payload) {
      http.get('/', {
        headers: {
          'token': localStorage.qwerty
        }
      })
      .then(({data}) => {
        context.commit('setGallery', data)
      })
    },
    addGal: function (context, payload) {
      http.post('/', {
        image: payload.image,
        caption: payload.caption
      }, {
        headers: {
          'token': localStorage.qwerty
        }
      })
      .then(result => {
        console.log(result)
      })
      // console.log(payload)
      // console.log(Object.values(payload.caption))
      // console.log(Object.values(payload.image))
      // console.log(payload)
      // http.post('/', {
      //   'image': payload.image,
      //   'caption': payload.caption
      // }, {
      //   headers: {
      //     'token': localStorage.qwerty
      //   }
      // })
      // .then(result => {
      //   console.log(result)
      // })
    }
  }
})

export default store
