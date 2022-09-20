export default {
  setSession: (token: string | number[]) => `/sessions/${token}`,
  setOrcamento: (orcamento: number) => `/orcamento/${orcamento}`,

};
