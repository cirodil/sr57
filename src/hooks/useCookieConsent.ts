import { useState, useEffect } from "react";

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...args: unknown[]) => void;
  }
}

function injectYandexMetrika() {
  if (document.getElementById("yandex-metrika-script")) return;
  const script = document.createElement("script");
  script.id = "yandex-metrika-script";
  script.text = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j=0;j<document.scripts.length;j++) {if (document.scripts[j].src===r) {return;}}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(108986577, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
  `;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = "https://mc.yandex.ru/watch/108986577";
  img.style.cssText = "position:absolute; left:-9999px;";
  img.alt = "";
  div.appendChild(img);
  noscript.appendChild(div);
  document.body.appendChild(noscript);
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "true") return true;
    if (stored === "false") return false;
    return null;
  });

  useEffect(() => {
    if (consent === true) {
      injectYandexMetrika();
    }
  }, [consent]);

  const accept = () => {
    localStorage.setItem("cookie_consent", "true");
    setConsent(true);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "false");
    setConsent(false);
  };

  return { consent, accept, decline };
}
