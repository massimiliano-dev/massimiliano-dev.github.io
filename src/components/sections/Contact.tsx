import { ContactStack } from "@/components/ui/ContactStack";
import { type Locale, site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { sectionIds } from "@/lib/sections";

/** "The email as display type": campo menta, l'email da margine a margine. */
export function Contact({ t, lang }: { t: Dictionary; lang: Locale }) {
  const id = sectionIds(lang).contact;
  const [local, domain] = site.email.split("@");
  // Quanti caratteri deve contenere la riga più lunga: tutta l'email su desktop, una metà su telefono.
  const fit = {
    "--chars": site.email.length,
    "--chars-phone": Math.max(local.length + 1, domain.length),
  } as React.CSSProperties;
  return (
    <section className="contact" id={id} aria-labelledby={`${id}-title`} data-contact>
      <ContactStack />
      <div>
        <h2 className="contact__title display" id={`${id}-title`} data-reveal="rise">
          {t.contact.title}
        </h2>
        <p className="contact__sentence" data-reveal="rise">
          {t.contact.sentence}
        </p>
      </div>
      <a className="contact__email display" href={`mailto:${site.email}`} style={fit} data-primary data-reveal="email">
        <span>{local}@</span>
        <span className="at">{domain}</span>
      </a>
      <div className="contact__foot" data-reveal="rise">
        <span>{t.contact.place}</span>
        <span className="contact__links">
          <a className="link" href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          {site.linkedin && (
            <a className="link" href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </span>
      </div>
    </section>
  );
}
