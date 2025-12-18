<script setup lang="ts">
import PageHeroSection from '@/components/PageHeroSection.vue';
import TabSection from '@/components/PageCRM/TabSection.vue';
import FAQSection from '@/components/PageCRM/FAQSection.vue';
import StepsSection from '@/components/PageCRM/StepsSection.vue';
import PricingSection from '@/components/PageCRM/PricingSection.vue';
</script>

<template>


    <PageHeroSection title="CRM" subtitle1="Automatize vendas, converta mais e escale com inteligência artificial."
    subtitle2= "Mais leads, mais conversões, menos esforço." chip="soluções" color="green" :btn="false" />
    <TabSection :gradient="['#0E172B', '#1d2c4b']"/>
    <StepsSection :gradient="['#1d2c4b', '#1d2c4b']"/>
    <PricingSection :gradient="['#1d2c4b', '#1d2c4b']"/>
    <FAQSection :gradient="['#1d2c4b', '#37538a']"/>


</template>

<style scoped>

</style>
