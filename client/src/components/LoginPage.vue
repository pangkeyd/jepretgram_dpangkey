<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h3>Sign In JepretGram</h3>
          <fb-signin-button
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            <i class="fa fa-facebook" aria-hidden="true"></i>
            Sign in with Facebook
          </fb-signin-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  },
  methods: {
    onSignInSuccess (response) {
      window.FB.api('/me', {
        fields: 'email, name, id'
      }, dude => {
        this.$store.dispatch('fbLogin', dude)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  cursor: pointer
}
</style>
