<template>
  <div>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="mx-auto">
          <NuxtLink to="/">
            <Icon/>
          </NuxtLink>
        </div>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-orange">Masuk</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-semibold leading-6 text-blue">Username</label>
            <div class="mt-2">
              <input id="username" name="username" type="email" autocomplete="username" required
                     v-model="user.username"
                     class="bg-white block w-full rounded-md border-0 py-1.5 text-blue shadow-sm ring-1 ring-inset ring-gray placeholder:text-blue focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-semibold leading-6 text-blue">Password</label>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required
                     v-model="user.password"
                     class="bg-white block w-full rounded-md border-0 py-1.5 text-blue shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-orange sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <button type="submit"
                    @click="login"
                    :class="{ 'cursor-not-allowed opacity-50': loading }"
                    class="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Masuk
            </button>
          </div>
        </div>

        <p class="mt-10 text-center text-sm text-blue">
          Belum punya akun?
          <a href="/register" class="font-semibold leading-6 text-blue hover:text-orange">Registrasi</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {delay} from "unicorn-magic";

definePageMeta({
  layout: 'auth',
})
const user = ref({
  username: '',
  password: ''
})

const {$jwtAuth} = useNuxtApp()
const router = useRouter()

async function login() {
  try {
    await $jwtAuth.login(
        {
          username: user.value.username,
          password: user.value.password
        },
        // optional callback function
        (data) => {
          console.log(data)
          window.location.replace('/')
        }
    )
  } catch (e) {
    // your error handling
    console.log(e);
  }
}
</script>
