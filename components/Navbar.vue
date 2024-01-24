<template>
  <div>
    <header>
      <div class="navbar lg:px-20">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </div>
            <ul tabindex="0"
                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NuxtLink  to="/" class="font-semibold">Home</NuxtLink></li>
              <li v-if="loggedIn">
                <NuxtLink class="font-semibold" to="/manage">Manage</NuxtLink>
              </li>
<!--              <li v-if="loggedIn">-->
<!--                <NuxtLink to="/wishlist" class="font-semibold">Wishlist</NuxtLink>-->
<!--              </li>-->
              <li>
                <NuxtLink class="font-semibold" to="/about">Tentang Kami</NuxtLink>
              </li>
            </ul>
          </div>
          <NuxtLink to="/">
            <Icon/>
          </NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex font-medium">
          <ul class="menu menu-horizontal px-1">
            <li>
              <NuxtLink to="/" class="font-semibold text-blue  hover:bg-orange hover:text-white">Home</NuxtLink>
            </li>
            <li v-if="loggedIn">
              <NuxtLink to="/manage" class="font-semibold text-blue  hover:bg-orange hover:text-white">Manage</NuxtLink>
            </li>
<!--            <li v-if="loggedIn">-->
<!--              <NuxtLink to="/wishlist" class="font-semibold">Wishlist</NuxtLink>-->
<!--            </li>-->
            <li>
              <NuxtLink to="/about" class="font-semibold text-blue  hover:bg-orange hover:text-white">Tentang Kami
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="navbar-end">
          <button v-if="loggedIn" @click="logout" class="inline-flex items-center font-medium text-blue dropdown">
            Halo, {{ user.username }}
          </button>
          <NuxtLink v-else to="/login"
                    class="ml-2 btn rounded-full hover:bg-orange text-white border border-0 md:w-[120px]"
                    href="">Masuk
          </NuxtLink>
        </div>
      </div>
    </header>
  </div>
</template>
<script lang="ts" setup>

const {user, loggedIn} = useJwtAuth()
const {$jwtAuth} = useNuxtApp();

async function logout() {
  try {
    await $jwtAuth.logout()
    window.location.href = '/'
  } catch (e) {
    console.log(e);
  }
}
</script>
