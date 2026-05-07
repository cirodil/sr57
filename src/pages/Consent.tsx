import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Consent() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-brown hover:text-green-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          На главную
        </button>

        <h1 className="font-playfair text-3xl md:text-4xl uppercase font-bold text-brown mb-10">
          Согласие на обработку персональных данных
        </h1>

        <div className="prose prose-brown max-w-none text-[#555555] leading-relaxed space-y-6">
          <p>
            Я, действуя свободно, своей волей и в своем интересе, а также
            подтверждая свою дееспособность, даю свое согласие{" "}
            <strong>ИП Пулатов Юрий Тахирович</strong> на обработку моих
            персональных данных в соответствии с Политикой обработки
            персональных данных, размещенной на сайте{" "}
            <a
              href="/#/privacy-policy"
              className="text-green-accent hover:underline"
            >
              стройрегион57.рф
            </a>
            .
          </p>
          <p>
            <strong>Цель обработки:</strong> регистрация заявки с сайта, связь
            со мной для консультации, предложения услуг и заключения договора.
          </p>
          <p>
            <strong>Объем персональных данных:</strong> фамилия, имя, отчество,
            номер телефона, адрес электронной почты, текст сообщения, иная
            информация, добровольно указанная в форме заявки.
          </p>
          <p>
            <strong>Дополнительная цель:</strong> проведение статистического
            анализа посещаемости сайта с использованием сервиса Яндекс.Метрика
            (сбор файлов cookie, IP-адреса, данных о браузере и поведении на
            сайте). Обработка этих данных осуществляется только при условии
            выражения согласия через cookie-баннер на сайте.
          </p>
          <p>
            Я уведомлен, что могу в любой момент отозвать настоящее согласие,
            направив письмо на адрес:
            <strong> 302005, г. Орёл, ул. Тамбовская, д. 2</strong> или на
            e-mail: <strong>urijpulatov@gmail.com</strong>. В случае отзыва
            согласия персональные данные уничтожаются в течение 10 рабочих дней.
          </p>
          <p>Согласие действует до достижения цели обработки или отзыва.</p>
        </div>
      </div>
    </div>
  );
}
