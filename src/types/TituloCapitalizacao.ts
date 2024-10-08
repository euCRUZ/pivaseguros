export type TituloCapitalizacao = {
  id: string;
  id_numero: number;
  acao: "PENDENTE" | "FINALIZADO";
  nome: string;
  cpf?: string;
  cnpj?: string;
  email: string;
  telefone: string;
  profissao: string;
  valor_remuneracao: number;
  tipo_imovel: "RESIDENCIAL" | "COMERCIAL";
  cep: string;
  endereco: string;
  bairro: string;
  numero_endereco: number;
  complemento?: string;
  cidade: string;
  estado: string;
  valor_aluguel_mensal: number;
  valor_total_titulos: number;
  cpf_proprietario?: string;
  cnpj_proprietario?: string;
  nome_proprietario: string;
  email_proprietario: string;
  telefone_proprietario: string;
  imobiliaria: string;
  created: Date;
};
