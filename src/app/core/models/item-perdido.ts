export type StatusItem = 'PERDIDO' | 'REIVINDICADO' | 'DEVOLVIDO';

export interface ItemPerdido {
  id?: number;
  nomeItem: string;
  localEncontrado: string;
  dataAchado: string; // yyyy-MM-dd
  status?: StatusItem;
  descricaoDevolucao?: string;
}