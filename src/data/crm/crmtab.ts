// src/data/feat.ts

export interface crmTab {
  id: number
  title: string
  title2: string
  subtitle: string
  listDescription: string[]
  icon: string
  img: string
  desc: string
  color: string
}

export const crmData: crmTab[] = [
  {
    id: 1,
    title: 'CRM de Vendas',
    title2: 'CRM de Vendas Inteligente',
    subtitle: 'Gerencie leads, acompanhe negociações e maximize suas conversões',
    listDescription: [
      'Gestão de Leads e Contatos',
      'Funil Kanban Personalizável',
      'Integração WhatsApp',
      'Conversão Meta Ads',
      'Tarefas e Responsáveis',
      'Relatórios',
      'Preenchimento automático com IA',
      'Webhooks e API'
    ],
    icon: 'mdi-chart-box-outline',
    img: 'crm1a.png',
    desc: 'Integração com WhatsApp',
    color: 'purple',
  },
  {
    id: 2,
    title: 'Agente de Atendimento IA',
    title2: 'Agente de Atendimento IA',
    subtitle: 'Comunicação multicanal eficiente feito com agente de IA para respostas rápidas e personalizadas',
    listDescription: [
      "Conectado direto ao WhatsApp",
      'Base de conhecimento personalizada',
      'Escalonamento humano',
      'Possibilidade para intervenção humana',
      'Transcrição e entendimento de áudios',
      'Responsáveis e fila de atendimento'
    ],
    icon: 'mdi-forum-outline',
    img: 'crm2.webp',
    desc: 'Agente de atendimento inteligente',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Conversões',
    title2: 'Conversões',
    subtitle: 'Rastreie seus leads e automatize seu funil de vendas',
    listDescription: [
      'Rastreio de origem dos leads',
      'Atualização em tempo real',
      'Integração com o CRM',
      'Conversão com o Meta ADS',
      'Relatórios',
      'Análise em recortes de tempos',
      'Atualize o CRM automaticamente'
    ],
    icon: 'mdi-chart-line-variant',
    img: 'crm3.webp',
    desc: 'Rastreamento de conversões',
    color: 'orange',
  },
  {
    id: 4,
    title: 'Central de Atendimento',
    title2: 'Central de Atendimento Completa',
    subtitle: 'Organize o atendimento ao cliente com gestão de tickets, Whatsapp e Agente Chatbot IA',
    listDescription: [
      'Gerencie tickets',
      'Tarefas e Responsáveis',
      'Integração com WhatsApp',
      'Agente de atendimento IA',
      'Escalonamento humano',
      'Histórico de interação'
    ],
    icon: 'mdi-domain',
    img: 'crm4.gif',
    desc: 'Funil customizável e intuitivo',
    color: 'yellow',
  }
]
