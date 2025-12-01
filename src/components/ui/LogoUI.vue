<script lang="ts" setup>
import { computed } from 'vue'
import { useHeroVisibilityStore } from '@/stores/heroVisibility'
// import logoImg from '@/assets/img/logo.png'
import logoCodan from '@/assets/img/codanlogo.png'


const heroStore = useHeroVisibilityStore()

const showLogo = computed(() => heroStore.shouldShowLogo)
</script>

<template>
  <Transition name="logo-fade">
    <RouterLink v-show="showLogo" to="/" class="logo-link">
      <v-sheet class="logo-group" elevation="0" color="transparent" rounded>
        <v-img :src="logoCodan" alt="codan" width="50" height="50" class="logo-img" contain />
        <div>
          <h3 class="logo-text mb-0">CODAN</h3>
          <!-- <h6 class="logo-subtext mb-0">lab</h6> -->
        </div>
      </v-sheet>
    </RouterLink>
  </Transition>
</template>

<style scoped>
.logo-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.logo-text {
  font-family: "GOBOLD", sans-serif;
  font-size: 22px;
  line-height: 26px;
  font-weight: 300;
  color: rgb(232, 223, 223);
  margin: 0;
  text-align: left;
}

.logo-subtext {
  font-family: "GOBOLD LIGHT", sans-serif;
  font-size: 12px;
  font-weight: 200;
  color: rgba(232, 223, 223, 0.699);
  margin: 0;
  text-align: left;
}

.logo-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

/* Animações de transição para a logo */
.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.3s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}
</style>
