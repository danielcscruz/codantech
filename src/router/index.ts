import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ServicesView from '@/views/ServicesView.vue'
import ProjectView from '@/views/ProjectView.vue'
import ProductView from '@/views/ProductView.vue'
import ContactView from '@/views/ContactView.vue'
import PageCrmView from '@/views/PageCrmView.vue'
import AboutView from '@/views/AboutView.vue'
import { useHeroVisibilityStore } from '@/stores/heroVisibility'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/projects', name: 'Projetos', component: ProjectView },
  { path: '/products', name: 'Produtos', component: ProductView },
  { path: '/products/crm', name: 'Produtos - CRM', component: PageCrmView },
  { path: '/contact', name: 'Contato', component: ContactView },
  { path: '/about', name: 'Sobre', component: AboutView },
  { path: '/services', name: 'Serviços', component: ServicesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Se você quiser que sempre vá para o topo:
    return { top: 0 }

    // Alternativamente, para restaurar a posição anterior (ex: botão voltar):
    // return savedPosition || { top: 0 }
  },
})

// Reset do estado hero em cada navegação
router.beforeEach((to, from, next) => {
  const heroStore = useHeroVisibilityStore()
  heroStore.resetForNewRoute(to.path)
  next()
})

export default router
