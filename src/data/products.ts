// src/data/projects.ts

export interface Product {
  id: number
  title: string
  description: string
  detail: string
  category: string
  tags: string[]
  image: string
}

export const productData: Product[] = [
  {
    id: 1,
    title: 'Codan CRM',
    description:
      'Plataforma de Gestão',
    detail:
      'Plataforma de gestão completa de vendas (CRM) com comunicação integrada com WhatsApp, atendimento automatizado com IA, tickets e muito mais.',
    category: 'webapp',
    tags: ['crm', 'funil de vendas', 'chatbot', 'ia', 'atendimento', 'whatsapp'],
    image: 'crmcodanwhite.png',
  }
]
