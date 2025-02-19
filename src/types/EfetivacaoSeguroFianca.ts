export type EfetivacaoSeguroFianca = {
  id: string;
  id_numero: number;
  acao: "PENDENTE" | "FINALIZADO";
  nome_imobiliaria: string;
  telefone_imobiliaria: string;

  inquilino_documento?: "PESSOA FÍSICA" | "PESSOA JURÍDICA";

  nome_inquilino_1?: string;
  cpf_inquilino_1?: string;
  email_inquilino_1?: string;
  telefone_inquilino_1?: string;
  profissao_inquilino_1?: string;
  data_nascimento_inquilino_1?: Date;

  nome_inquilino_2?: string;
  cpf_inquilino_2?: string;
  email_inquilino_2?: string;
  telefone_inquilino_2?: string;
  profissao_inquilino_2?: string;
  data_nascimento_inquilino_2?: Date;

  
  nome_inquilino_3?: string;
  cnpj_inquilino_3?: string;
  email_inquilino_3?: string;
  telefone_inquilino_3?: string;

  nome_inquilino_4?: string;
  cnpj_inquilino_4?: string;
  email_inquilino_4?: string;
  telefone_inquilino_4?: string;

  nome_empresa?: string;
  cnpj_empresa?: string;
  email_empresa?: string;
  telefone_empresa?: string;
  atividade_empresa?: string;

  proprietario_documento?: "PESSOA FÍSICA" | "PESSOA JURÍDICA";

  nome_proprietario?: string;
  profissao_proprietario?: string;
  rg_proprietario?: string;
  email_proprietario?: string;
  telefone_proprietario?: string;

  cpf_proprietario?: string;
  cnpj_proprietario?: string;
  data_nascimento_proprietario: Date;
  estado_civil_proprietario: "SOLTEIRO" | "CASADO" | "VIÚVO" | "DIVORCIADO";
  reside_brasil: "SIM" | "NÃO";
  finalidade:
    | "RESIDENCIAL"
    | "COMERCIAL EMPREENDEDOR"
    | "COMERCIAL PESSOA JURÍDICA";
  cep: string;
  endereco: string;
  numero?: number;
  bairro: string;
  complemento?: string;
  cidade: string;
  estado: string;
  tipo_residencia: "CASA" | "APTO" | "COND. FECHADO" | "OUTROS";
  tipo_residencia_outros?: string;
  inicio_contrato: Date;
  termino_contrato: Date;
  aluguel?: number;
  condominio?: number;
  iptu?: number;
  agua?: number;
  luz?: number;
  gas?: number;
  pintura_interna: "SIM" | "NÃO";
  pintura_externa: "SIM" | "NÃO";
  danos_imovel: "SIM" | "NÃO";
  multa_rescisao: "SIM" | "NÃO";
  valor_parcela: number;
  seguradora: string;
  indice_reajuste: string;
  vencimento_aluguel: number;
  created: Date;
};
