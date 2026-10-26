import { LanguageRedirect } from "@/components/ui/LanguageRedirect";
import { getDictionary } from "@/lib/i18n";

// La radice "/" sceglie la lingua nel browser (niente server su GitHub Pages).
export default function RootPage() {
  const it = getDictionary("it");
  const en = getDictionary("en");
  return (
    <main className="root-choice">
      <LanguageRedirect />
      <p>
        {it.root.choose} / {en.root.choose}
      </p>
      <p>
        <a className="link" href="it/">
          Italiano
        </a>{" "}
        ·{" "}
        <a className="link" href="en/">
          English
        </a>
      </p>
    </main>
  );
}
