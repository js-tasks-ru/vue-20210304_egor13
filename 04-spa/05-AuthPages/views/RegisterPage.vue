<template>
  <form class="form" @submit.prevent="handleSubmit">
    <form-group label="Email">
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </form-group>
    <form-group label="Имя">
      <div class="input-group">
        <input v-model="userName" type="text" class="form-control" />
      </div>
    </form-group>
    <form-group label="Пароль">
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </form-group>
    <form-group label="Повтор пароля">
      <div class="input-group">
        <input v-model="doublePassword" type="password" class="form-control" />
      </div>
    </form-group>
    <div class="form-group">
      <label class="checkbox"><input v-model="confirm" type="checkbox" /> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link class="link" to="/login">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import FormGroup from '../../../03-sfc/02-FormGroup/components/FormGroup.vue';
import { register } from '../data';

export default {
  name: 'RegisterPage',
  components: { FormGroup },
  data() {
    return {
      email: '',
      userName: '',
      password: '',
      doublePassword: '',
      confirm: false,
    };
  },

  methods: {
    handleSubmit() {
      const isCorrect = this.checkFormFields();
      if (!isCorrect) return;

      register(this.email, this.userName, this.password).then((res) => {
        if (res.error) {
          alert(res.message);
          return;
        }

        alert(res.id);
        this.$router.push('/login');
      });
    },

    checkFormFields() {
      const { email, userName, password, doublePassword, confirm } = this;

      if (!email) {
        alert('Требуется ввести Email');
        return false;
      }
      if (!userName) {
        alert('Требуется ввести полное имя');
        return false;
      }
      if (!password) {
        alert('Требуется ввести пароль');
        return false;
      }
      if (password !== doublePassword) {
        alert('Пароли не совпадают');
        return false;
      }
      if (!confirm) {
        alert('Требуется согласиться с условиями');
        return false;
      }

      return true;
    },
  },
};
</script>

<style></style>
