import { IOperatorCatalog } from "../interfaces/IOperatorCatelog";

/**
 * WARNING: this map should be replaced with an API call
 */
export const OPERATOR_MAP: { [index: string]: string } = {
  "گروه فناوری ارتباطات و اطلاعات شاتل": "شاتل",
  "شرکت انتقال داده های آسیا تک": "آسيا تك",
  "شرکت انتقال داده های رهام داتک": "رهام داتك",
  "شرکت انتقال داده های ندا گستر صبا - صبا نت": "صبا نت",
  "شرکت پیشگامان توسعه ارتباطات": "پيشگامان",
  "شرکت خدمات ارتباطی ایرانسل": "ايرانسل",
  "شرکت داده گستر عصر نوین - های وب": "هاي وب",
  "شرکت لایزر": "لايزر",
  "شرکت پارسان لین ارتباطات - پارس آنلاین": "پارس آنلاين",
  "شرکت داده پردازی فن آوا": "فن آوا",
  "شرکت ارتباطات مبین نت": "مبين نت",
  "شرکت خدمات ارتباطی رایتل": "رايتل",
  "شرکت مخابرات ایران - 31 شرکت استانی": "مخابرات",
  "شرکت مخابرات ایران - همراه اول": "همراه اول",
  "شرکت حلما گستر خاورمیانه": "حلما گستر"
};

export const OPERATOR_CATALOG: IOperatorCatalog[] = [
  { operatorId: 76, operatorCode: 3011, generation: "2G" },
  { operatorId: 76, operatorCode: 3012, generation: "3G" },
  { operatorId: 76, operatorCode: 3013, generation: "4G" },

  { operatorId: 27, operatorCode: 4011, generation: "2G" },
  { operatorId: 27, operatorCode: 4012, generation: "3G" },
  { operatorId: 27, operatorCode: 4013, generation: "4G" },

  { operatorId: 74, operatorCode: -1, generation: "2G" },
  { operatorId: 74, operatorCode: 5012, generation: "3G" },
  { operatorId: 74, operatorCode: 5013, generation: "4G" }
];
