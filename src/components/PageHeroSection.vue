<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps<{ title: string, subtitle1: string,subtitle2: string, chip: string, color: string, btn: boolean }>()
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <!-- Oculta o chip se a rota atual for "/contact" -->
      <v-chip v-if="route.path !== '/contact'" class="ma-2 mt-8 mb-8 v-chip-glow-intense" :color="color"
        variant="outlined">
        {{ chip }}
      </v-chip>

      <h3>{{ title }}</h3>
      <h5>{{ subtitle1 }}</h5>
      <h5>{{ subtitle2 }}</h5>

      <div class="buttons pt-5">
        <v-btn v-if="btn" size="small" to="/contact" color="primary" append-icon="mdi-arrow-right-thin" variant="tonal"
          class="px-3 mt-4">
          Começar um Projeto
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-family: "GOBOLD HOLLOW BOLD";
  font-size: 60px;
  color: rgba(225, 225, 225, 0.813);
}

h5 {
  font-family: "GOBOLD LIGHT";
  font-size: 20px;
  color: rgba(225, 225, 225, 0.813);
}

.wrapper {
  background-color: #0E172B;
  width: 100%;
  height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
