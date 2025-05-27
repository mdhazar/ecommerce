export interface Card {
  id: string;
  name_on_card: string;
  card_no: string;
  expire_month: number;
  expire_year: string;
}

export interface CardFormData {
  card_no: string;
  name_on_card: string;
  expire_month: string;
  expire_year: string;
}
