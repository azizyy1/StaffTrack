import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/company.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative mx-auto max-w-7xl px-8 text-center text-white">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
            Infinity Soft
          </p>

          <h1 className="text-6xl font-bold leading-tight md:text-7xl">
            Gestion intelligente
            <br />
            des ressources humaines
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-300">
            PointagePro est la plateforme digitale développée par
            Infinity Soft pour la gestion des présences, des congés,
            des retards, du pointage GPS, des QR Codes et des rapports RH.
          </p>

          <div className="mt-10">
            <Link
              href="/login"
              className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Accéder à la plateforme
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">
              À propos d'Infinity Soft
            </h2>

            <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-600">
              Infinity Soft est une entreprise spécialisée dans le
              développement de solutions informatiques innovantes.
              Nous accompagnons les entreprises dans leur transformation
              digitale à travers des applications web, des systèmes de
              gestion, des solutions cloud et des technologies modernes.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                Développement Web
              </h3>

              <p className="mt-4 text-gray-600">
                Création d'applications web modernes, performantes et sécurisées.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                Développement Mobile
              </h3>

              <p className="mt-4 text-gray-600">
                Applications Android et iOS adaptées aux besoins des entreprises.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">
                Cloud & Cybersécurité
              </h3>

              <p className="mt-4 text-gray-600">
                Hébergement cloud, sécurité des données et infrastructures modernes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">
              PointagePro
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Une plateforme moderne conçue pour simplifier la gestion
              des ressources humaines et automatiser le suivi des employés.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">Pointage GPS</h3>
              <p className="mt-3 text-gray-600">
                Vérification de présence par géolocalisation.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">QR Code</h3>
              <p className="mt-3 text-gray-600">
                Validation rapide et sécurisée des pointages.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">Gestion des congés</h3>
              <p className="mt-3 text-gray-600">
                Demandes, validation et suivi des congés.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold">Rapports PDF</h3>
              <p className="mt-3 text-gray-600">
                Exportation et analyse des données RH.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold">
              Infinity Soft en chiffres
            </h2>
          </div>

          <div className="grid gap-10 text-center md:grid-cols-4">
            <div>
              <h3 className="text-5xl font-bold text-blue-400">250+</h3>
              <p className="mt-3 text-gray-400">
                Employés gérés
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-400">40+</h3>
              <p className="mt-3 text-gray-400">
                Projets réalisés
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-400">98%</h3>
              <p className="mt-3 text-gray-400">
                Satisfaction client
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-blue-400">24/7</h3>
              <p className="mt-3 text-gray-400">
                Support technique
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-950 text-white">
  <div className="mx-auto max-w-7xl px-8 py-16">
    <div className="grid gap-10 md:grid-cols-4">
      <div>
        <h3 className="text-2xl font-bold">
          Infinity Soft
        </h3>

        <p className="mt-4 text-gray-400">
          Entreprise spécialisée dans le développement de solutions
          informatiques innovantes et la transformation digitale.
        </p>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold">
          Services
        </h4>

        <ul className="space-y-2 text-gray-400">
          <li>Développement Web</li>
          <li>Développement Mobile</li>
          <li>Cloud Computing</li>
          <li>Cybersécurité</li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold">
          Solutions
        </h4>

        <ul className="space-y-2 text-gray-400">
          <li>PointagePro</li>
          <li>ERP Entreprise</li>
          <li>CRM Client</li>
          <li>Applications métier</li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold">
          Contact
        </h4>

        <ul className="space-y-2 text-gray-400">
          <li>Casablanca, Maroc</li>
          <li>contact@infinitysoft.ma</li>
          <li>+212 5 22 00 00 00</li>
        </ul>
      </div>
    </div>

    <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
      © 2026 Infinity Soft. Tous droits réservés.
    </div>
  </div>
</footer>
    </main>
  );
}