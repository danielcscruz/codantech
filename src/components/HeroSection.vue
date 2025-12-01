<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHeroVisibilityStore } from '@/stores/heroVisibility'
import logoCodan from '@/assets/img/codanlogo.png'


const heroStore = useHeroVisibilityStore()
const heroRef = ref<HTMLElement>()

let observer: IntersectionObserver | null = null

// Props com tipos definidos
interface Props {
  texts?: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  texts: () => [
    'python',
    'django',
    'vue.js',
    'postgresql',
    'docker',
    'flask',
    'typescript',
    'react',
    'rest api',
  ],
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseTime: 2000
})

// Estados reativos com tipos explícitos
const displayText = ref<string>('')
const currentIndex = ref<number>(0)
const charIndex = ref<number>(0)
const isDeleting = ref<boolean>(false)

// Timeouts com tipos corretos
let typewriterTimeout: ReturnType<typeof setTimeout> | null = null

// Função principal do efeito typewriter
const typeWriter = (): void => {
  const currentText: string = props.texts[currentIndex.value]

  if (isDeleting.value) {
    // Apagando caracteres
    displayText.value = currentText.substring(0, charIndex.value - 1)
    charIndex.value--

    if (charIndex.value === 0) {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      typewriterTimeout = setTimeout(typeWriter, 500)
      return
    }

    typewriterTimeout = setTimeout(typeWriter, props.deletingSpeed)
  } else {
    // Digitando caracteres
    displayText.value = currentText.substring(0, charIndex.value + 1)
    charIndex.value++

    if (charIndex.value === currentText.length) {
      isDeleting.value = true
      typewriterTimeout = setTimeout(typeWriter, props.pauseTime)
      return
    }

    typewriterTimeout = setTimeout(typeWriter, props.typingSpeed)
  }
}

onMounted(() => {
  typeWriter()

  if (heroRef.value) {
    observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const isVisible: boolean = entry.intersectionRatio > 0.6
          heroStore.setHeroVisibility(isVisible)
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.2, 0.5, 1]
      }
    )

    observer.observe(heroRef.value)
  }
})

onUnmounted(() => {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout)
  }
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div ref="heroRef" class="wrapper">
    <div class="text-center">
      <v-chip class="ma-2 mt-8 mb-8 v-chip-glow-intense" color="success" variant="outlined">
        Disponível para Projetos
      </v-chip>
      <v-img :src="logoCodan" height="125px" class="mb-5"></v-img>
      <h2><span>CODAN</span></h2>
      <h3>Desenvolvimento Web</h3>
      <div class="typewriter-container">
        <p>Soluções web e automações com
          <br><span class="typewriter-text">{{ displayText || '&nbsp;' }}</span>
        </p>
      </div>
      <div class="buttons pt-5">
        <v-btn size="small" to="/projects" color="primary" append-icon="mdi-eye" variant="outlined"
          class="px-3 mt-4">Ver meus
          Projetos</v-btn>
        <v-btn size="small" to="/contact" color="primary" append-icon="mdi-arrow-right-thin" variant="tonal"
          class="px-3 mt-4">Começar um
          Projeto</v-btn>

      </div>
    </div>
  </div>
</template>

<style scoped>
.typewriter-container {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.typewriter-text {
  color: #ffd700;
  font-weight: 600;
  font-size: 30px;
  min-width: 300px;
  min-height: 36px;
  display: inline-block;
  text-align: center;
  line-height: 36px;
  vertical-align: top;
}

h2 {
  font-family: "GOBOLD";
  font-size: clamp(50px, 5vw, 80px);
  /* dinâmico: mínimo 18px, máximo 26px */
  line-height: 1.2;
  color: rgba(225, 225, 225, 0.813);
  white-space: nowrap;
  /* mantém em uma linha */
  padding: 0 16px;
  /* garante margem lateral mínima */
}

h3 {
  font-family: "GOBOLD HOLLOW BOLD";
  font-size: clamp(26px, 5vw, 40px);
  color: rgba(225, 225, 225, 0.813);
}

p {
  font-family: "GOBOLD LIGHT";
  font-size: 18px;
  line-height: 36px;
  color: rgba(225, 225, 225, 0.813);
  margin: 0;
}

span {
  color: #cfcfcf;
  /* color: #23C490; */
  line-height: 60px;
}

.wrapper {
  background-color: #0E172B;
  width: 100%;
  min-height: 550px;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

.v-chip-glow-intense {
  animation: glow-pulse-intense 1s ease-in-out infinite alternate;
}

@keyframes glow-pulse-intense {
  from {
    box-shadow: 0 0 15px #4caf50;
  }

  to {
    box-shadow: 0 0 55px #4caf50, 0 0 70px #4caf50, 0 0 85px #4caf50, 0 0 100px #4caf50;
  }
}

.v-chip-glow-intense {
  position: relative;
  z-index: 1;
}
</style>
