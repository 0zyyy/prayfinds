<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="mx-auto">
        <NuxtLink to="/">
          <Icon/>
        </NuxtLink>
      </div>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-orange">Registrasi</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-semibold leading-6 text-blue">Email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required
                   v-model="newUser.email"
                   class="bg-white block w-full rounded-md py-1.5 text-black shadow-md placeholder:text-black border-2 border-orange sm:text-sm sm:leading-6">
            <div class="font-medium mt-2 text-red" v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </div>
        </div>
        <div>
          <label for="username" class="block text-sm font-semibold leading-6 text-blue">Username</label>
          <div class="mt-2">
            <input id="username" name="username" type="text" autocomplete="username" required
                   v-model="newUser.username"
                   class="bg-white block w-full rounded-md py-1.5 text-black shadow-md placeholder:text-black border-2 border-orange sm:text-sm sm:leading-6">
            <div class="font-medium mt-2 text-red" v-if="errors.username">
              {{ errors.username[0] }}
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-semibold leading-6 text-blue">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required
                   v-model="newUser.password"
                   class="bg-white block w-full rounded-md border-0 py-1.5 text-blue shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6">
            <div class="font-medium mt-2 text-red" v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </div>
        </div>

        <div>
          <button type="button"
                  @click="register"
                  class="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Registrasi
          </button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-blue">
        Kembali ke halaman
        <a href="/login" class="font-semibold leading-6 text-blue hover:text-orange">Masuk</a>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>

definePageMeta({
  layout: 'auth',
})

const errors = ref({
  email: '',
  username: '',
  password: ''
})

const loading = ref(false);

const newUser = ref({
  email: '',
  username: '',
  password: ''
})

const register = async () => {
  loading.value = true;
  if(newUser.value.email === '' || newUser.value.username === '' || newUser.value.password === ''){
    alert('Mohon isi semua field');
    loading.value = false;
    return;
  }
  await useFetchApi('/register', {
    method: 'POST',
    body: newUser.value
  }).then((res) => {
    if (res.error.value) {
      errors.value = res?.error.value?.data?.errors;
      return;
    }else{
      alert('Registrasi berhasil');
      window.location.href = '/';
    }
    loading.value = false;
    return;
  }).catch((err) => {
    console.log("Err",err.value);
    return;
  })
}

</script>
