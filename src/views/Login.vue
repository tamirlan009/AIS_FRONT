<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
                        <span class="text-600 font-medium">Для продолжения, пожалуйста, авторизуйтесь.</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="login" class="block text-900 text-xl font-medium mb-2">Логин</label>
                        <InputText id="login" v-model="login" type="text" class="w-full mb-3" placeholder="Логин" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                        <Password id="password1" v-model="password" placeholder="Пароль" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                        <Button label="Войти" @click="onSubmit" class="w-full p-3 text-xl"></button>
                      <Message v-if="errorAuth" severity="error">Ошибка авторизации</Message>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"

export default {
  data() {
      return {
          login: '',
          password: '',
      }
  },
  methods:{
    ...mapMutations({
      setAuth: 'authenticate/setAuth'
    }),

    onSubmit(){
      this.setAuth(false)

      this.$store.dispatch('authenticate/login',{
        username: this.login,
        password: this.password
      }).then(()=>{
        if(this.userData!==null){
          this.$router.push({ name: 'Home' })
        }
        else{
          this.setAuth(true)
        }
      }).catch(()=>{
        this.setAuth(true)
      })
    }
  },
  computed:{
    ...mapState({
      userData: state => state.authenticate.userData,
      errorAuth: state => state.authenticate.errorAuth
    })
  },
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>