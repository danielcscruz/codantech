export interface FAQ {
  id: number
  question: string
  answer: string
}

export const faqList : FAQ[] = [
{
  id:1,
    question: "Como funciona o atendimento com Inteligência Artificial no WhatsApp?",
    answer: "Nossa IA é treinada com os dados da sua empresa. Ela entende as dúvidas dos clientes, responde de forma natural e pode até agendar reuniões ou qualificar leads 24 horas por dia, transferindo para um humano apenas quando necessário."
  },
  {
    id:2,
    question: "Preciso de um número de celular exclusivo para o WhatsApp?",
    answer: "Sim, recomendamos o uso de um número exclusivo para a integração. O sistema utiliza a API para gerenciar múltiplos atendimentos simultâneos que um celular comum não suportaria."
  },
  {
    id:3,
    question: "O CRM se integra com quais ferramentas?",
    answer: "O CRM da Codan foca na centralização. Além do WhatsApp, você consegue gerenciar funis de vendas, automação de e-mails e rastreio de conversões em uma única interface."
  },
  {
    id:4,
    question: "A IA consegue fechar vendas sozinha?",
    answer: "Ela atua como um assistente de pré-vendas altamente eficiente. Ela identifica o interesse do cliente, tira dúvidas sobre produtos e coleta dados essenciais, deixando o 'fechamento' muito mais fácil para sua equipe comercial."
  },
  {
    id:5,
    question: "Como serão processados os meus pagamentos?",
    answer: "Os pagamentos poderão ser realizados utilizando qualquer bandeira de cartão de credito através da plataforma segura page.me."
  },
    {
    id:6,
    question: "Meus dados e conversas estão seguros?",
    answer: "Totalmente. Utilizamos infraestrutura segura com criptografia de ponta. Sendo uma plataforma baseada na tecnologia Bolten, seguimos rigorosos padrões de LGPD e segurança de dados."
  }

]

