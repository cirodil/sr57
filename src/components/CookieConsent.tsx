import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsentBanner() {
  const { consent, accept, decline } = useCookieConsent();

  if (consent !== null) return null; // уже принято или отклонено – не показываем

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-[#555555] leading-relaxed">
          <p>
            Мы используем cookie-файлы и сервис Яндекс.Метрика для аналитики и
            улучшения работы сайта. Продолжая пользоваться сайтом, вы
            соглашаетесь с{" "}
            <a
              href="/#/privacy-policy"
              target="_blank"
              className="text-green-accent hover:underline"
            >
              Политикой обработки данных
            </a>
            .
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            className="btn-primary px-6 py-2 text-sm whitespace-nowrap"
          >
            Принять
          </button>
          <button
            onClick={decline}
            className="btn-secondary px-6 py-2 text-sm whitespace-nowrap border-brown text-brown hover:bg-brown hover:text-white"
          >
            Отказаться
          </button>
        </div>
      </div>
    </div>
  );
}
