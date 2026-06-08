import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Fitness Desde Casa',
  description: 'Soy Albert Mata, entrenador aficionado con más de 6 años haciendo fitness en casa. Te ayudo a elegir el equipo y las rutinas correctas para ponerte en forma sin gimnasio.',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Albert Mata',
  jobTitle: 'Entusiasta del Fitness en Casa',
  url: 'https://fitnessdesdecasa.es/sobre-nosotros',
  email: 'comercial@rformas.es',
  description: 'Apasionado del fitness en casa con más de 6 años entrenando sin gimnasio. Analiza equipos, rutinas y suplementos para ayudar a españoles a ponerse en forma desde casa.',
  knowsAbout: ['Entrenamiento en casa', 'Fitness', 'Equipamiento deportivo', 'Nutrición deportiva', 'Rutinas de ejercicio'],
  sameAs: ['https://fitnessdesdecasa.es'],
}

export default function SobreNosotros() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full text-white text-2xl font-bold mb-6 shadow-lg">
            AM
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Hola, soy Albert Mata</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Llevo más de 6 años entrenando en casa y sé exactamente lo que funciona (y lo que no) cuando
            quieres ponerte en forma sin pisar un gimnasio.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          {[
            { value: '+6 años', label: 'entrenando en casa' },
            { value: '+80', label: 'artículos publicados' },
            { value: '+40', label: 'productos analizados' },
            { value: '100%', label: 'sin gimnasio' },
          ].map(stat => (
            <div key={stat.label} className="text-center bg-green-50 rounded-2xl p-5 border border-green-100">
              <div className="text-2xl font-extrabold text-green-700 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bio section */}
        <div className="prose prose-lg prose-gray max-w-none mb-14">
          <h2>Mi historia con el fitness en casa</h2>
          <p>
            Empecé a entrenar en casa por necesidad: vivía en un piso pequeño en Madrid, no tenía tiempo para ir
            al gimnasio y los precios de la cuota me parecían injustificados. Lo que empezó como una solución
            provisional se convirtió en mi forma de vida.
          </p>
          <p>
            Durante estos años he probado decenas de aparatos —desde simples mancuernas hasta cintas de correr
            plegables—, he seguido cientos de rutinas y he aprendido qué marcas merecen la pena y cuáles son
            pura trampa de marketing. Toda esa experiencia es la que comparto en Fitness Desde Casa.
          </p>

          <h2>¿Qué encontrarás en esta web?</h2>
          <p>
            Contenido práctico, sin relleno y basado en experiencia real:
          </p>
          <ul>
            <li><strong>Análisis de equipamiento:</strong> Mancuernas, barras, colchonetas, máquinas de cardio, bandas elásticas... probado o investigado en profundidad antes de recomendarlo.</li>
            <li><strong>Rutinas de entrenamiento:</strong> Para distintos niveles, objetivos y espacios disponibles. Sin complicaciones.</li>
            <li><strong>Comparativas honestas:</strong> Ponemos productos frente a frente y te decimos cuál comprar según tu situación concreta.</li>
            <li><strong>Guías de compra:</strong> Si vas a invertir en equipamiento, te explico qué mirar para no arrepentirte.</li>
          </ul>
        </div>

        {/* Methodology */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cómo analizo los productos</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🏋️',
                title: 'Prueba directa',
                desc: 'Siempre que es posible, pruebo el producto yo mismo en casa antes de escribir sobre él.',
              },
              {
                icon: '📊',
                title: 'Investigación técnica',
                desc: 'Analizo especificaciones, materiales, garantías y comparo con alternativas del mismo rango de precio.',
              },
              {
                icon: '💬',
                title: 'Opiniones reales',
                desc: 'Leo cientos de reseñas verificadas de compradores en Amazon y otros marketplaces españoles.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🤝 Transparencia total</h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong>Afiliados:</strong> Algunos enlaces son del Programa de Afiliados de Amazon. Si compras a través de ellos,
              recibo una pequeña comisión sin coste adicional para ti. Esto me permite mantener el sitio gratuito.
            </p>
            <p>
              <strong>Independencia editorial:</strong> Las comisiones no influyen en mis recomendaciones. Si un producto no me
              convence, lo digo claramente. Si hay mejores opciones sin enlace de afiliado, también las menciono.
            </p>
            <p>
              <strong>Contenido actualizado:</strong> Los precios y disponibilidad cambian. Revisa siempre la ficha del producto
              en Amazon antes de comprar.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">¿Tienes alguna pregunta o quieres que analice algún producto concreto?</p>
          <Link
            href="/contacto"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
          >
            Escríbeme →
          </Link>
        </div>

      </div>
    </>
  )
}
