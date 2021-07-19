<template>
  <form class="form" @submit.prevent="handleSubmit">
    <form-group label="Email">
      <div class="input-group">
        <input type="email" placeholder="demo@email" class="form-control" v-model="email"/>
      </div>
    </form-group>
    <form-group label="Пароль">
      <div class="input-group">
        <input type="password" placeholder="password" class="form-control" v-model="password"/>
      </div>
    </form-group>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link class="link" to="/register">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';
import FormGroup from '../../../03-sfc/02-FormGroup/components/FormGroup.vue';

export default {
  name: 'LoginPage',
  components: {FormGroup},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      const isCorrect = this.checkFormFields();
      if(!isCorrect) return

      login(this.email, this.password)
        .then(res => {
          if(res.error) {
            alert(res.message);
            return
          }

          alert(res.fullname);

          const query = this.$route.query;
          query.from ? this.$router.push(query.from) : this.$router.push('/');
        });
    },
    checkFormFields() {
      const {email, password} = this;

      if(!email) {
        alert('Требуется ввести Email');
        return false;
      }
      if(!password) {
        alert('Требуется ввести пароль');
        return false;
      }

      return true
    }
  }
};
</script>

<style></style>
