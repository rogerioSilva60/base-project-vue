<template>
  <div class="auth-content">
      <div class="auth-modal">
          <img src="@/assets/logo.png" width="200" height="100" alt="Logo">
          <hr>
          <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

          <input v-if="showSignup" type="text" v-model="user.name" placeholder="Nome">
          <input type="text" v-model="user.email" name="email" placeholder="E-mail">
          <input type="password" v-model="user.password" name="password" placeholder="Senha">
          <input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirme a Senha">

          <button v-if="showSignup" @click="signup">Registrar</button>
          <button v-else @click="signin">Entrar</button>

          <a href @click.prevent="showSignup = !showSignup">
              <span v-if="showSignup">Ja tem cadastro? Acesse o Login!</span>
              <span v-else>Nao tem cadastro? Registre-se</span>
          </a>
      </div>
  </div>
</template>

<script>
import { userKey } from '@/global'

export default {
    name: 'Auth',
    data() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            if(this.user){
                let token = 123456
                this.$store.commit('setUser', token)
                localStorage.setItem(userKey, JSON.stringify(token))
                this.$router.push({path: '/'})
            }
        },
        signup() {
            if(this.user){
                this.user = {}
                this.showSignup = false
            }
        }
    }
}
</script>
<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #fff;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
        rgba(120,120,120,0),
        rgba(120,120,120,0.75),
        rgba(120,120,120,0));
    }
</style>