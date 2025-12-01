<script setup lang="ts">
import LogoUI from './ui/LogoUI.vue';
// import SocialUI from './ui/SocialUI.vue';
</script>
<template>
  <v-footer color="bgdark" dark fluid class="footer-component d-flex flex-column sjustify-center pa-4">
    <v-container class="d-flex justify-space-between align-center px-4 mx-10" fluid>
      <v-row>
        <v-col cols="12" md="4" class="align-left" width="100%">
          <div class="d-flex align-left ">
            <LogoUI />

          </div>
          <p class="mt-4 ml-4 text-left">Somos especializados em desenvolvimento Python, Django e na criação de aplicações web escaláveis,
            soluções
            de API e automações para empresas </p>
          <!-- <SocialUI /> -->

        </v-col>
        <v-col cols="12" md="4">
        </v-col>
        <v-col cols="12" md="4" class="mb-10">
          <h3 class="title">Vamos conversar</h3>
          <p>Tem um projeto em mente? Vamos conversar sobre como podemos ajudar a desenvolver uma solução robusta,
            escalável e sob medida para você.</p>
          <v-btn size="small" to="/contact" color="primary" append-icon="mdi-arrow-right-thin" variant="tonal"
            class="px-3 mt-4 mr-6">Começar um
            Projeto</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="bottom pt-4 mb-4">
      <p class="superfooter">&copy; {{ new Date().getFullYear() }} - Desenvolvido por <span>CODAN</span>
      </p>
    </v-row>
  </v-footer>
</template>

<style scoped>
.footer-component {
  /* NÃO usar position: fixed */
  position: relative;
  /* ou static */
  margin-top: auto;
}

.title {
  font-family: "GOBOLD BOLD";
  font-size: 18px;
  color: rgba(255, 255, 255, 0.811);
}

.superfooter {
  font-family: "GOBOLD LIGHT";
  font-size: 14px;
  color: rgba(255, 255, 255, 0.811);
}

span {
  font-size: 16px;
  color: rgb(var(--v-theme-primary));
}

p {
  color: rgba(255, 255, 255, 0.811);
  font-size: 14px;
  margin-top: 8px;
}

.bottom {
  display: block;
  text-align: center;
  width: 100%;
  height: 50px;
  border-top: 0.8px solid rgba(18, 98, 49, 0.413);
}
</style>
