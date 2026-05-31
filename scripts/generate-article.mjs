#!/usr/bin/env node
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import slugify from 'slugify'

const AMAZON_TAG = process.env.AMAZON_TAG || 'setupoficina-21'

const KEYWORD_BANK = [
  ['ejercicios para bajar de peso en casa sin equipamiento', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['ejercicios para glúteos en casa sin pesas', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['flexiones tipos y cómo hacerlas correctamente', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['dominadas en casa sin barra cómo hacerlas', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['ejercicios abdominales en casa para principiantes', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['sentadillas tipos y técnica correcta guía completa', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['cardio en casa sin máquinas ejercicios efectivos', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['ejercicios para piernas en casa sin equipo', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['plank variantes y cuánto tiempo aguantar', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['ejercicios para hombros en casa con y sin pesas', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['rutina de 30 minutos en casa para principiantes', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina full body en casa 3 días a la semana', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina HIIT en casa 20 minutos quemar grasa', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['plan entrenamiento 8 semanas en casa principiantes', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina de calistenia en casa para empezar', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['cuántos días a la semana entrenar en casa', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina para ganar masa muscular en casa', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['entrenamiento funcional en casa qué es y cómo empezar', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['mejores mancuernas para casa comparativa 2026', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['barra de dominadas para puerta análisis comparativa', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['mejor esterilla yoga fitness para casa 2026', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['kettlebell peso ideal para empezar en casa', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['bandas elásticas resistencia para entrenar en casa', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['mejor bicicleta estática para casa 2026 comparativa', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['TRX en casa cómo usarlo y qué ejercicios hacer', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['mancuernas ajustables vs fijas cuáles comprar', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['mejor cinta de correr para casa 2026', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['foam roller para recuperación muscular guía', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['dieta para perder grasa y ganar músculo guía', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['qué comer antes y después de entrenar en casa', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['proteína diaria cuánta necesito para ganar músculo', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['déficit calórico cómo calcularlo para perder peso', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['alimentos ricos en proteína baratos para deportistas', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['meal prep semanal para deportistas que entrenan en casa', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['ayuno intermitente compatible con entrenamiento en casa', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['cuántas calorías necesito al día si entreno en casa', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['cómo perder 5 kilos en casa en 1 mes de forma real', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['ejercicios para quemar grasa abdominal en casa', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['por qué no adelgazo aunque hago ejercicio en casa', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['plan adelgazamiento 12 semanas entrenando en casa', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['proteína whey para principiantes cuál elegir 2026', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['creatina para qué sirve y cómo tomarla', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['mejores suplementos para ganar masa muscular en casa', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['bcaa aminoácidos ramificados sirven para algo realmente', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['magnesio para deportistas beneficios y dosis', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  // Más keywords para más contenido
  ['burpees cómo hacerlos correctamente para principiantes', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['zancadas lunges tipos y técnica correcta', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['ejercicios de espalda en casa sin pesas', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['ejercicios para brazo en casa bíceps y tríceps', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['jumping jacks calorías quemadas y beneficios', 'c2caf22e-04e9-4e38-a984-51c22914c223', 'Ejercicios en Casa'],
  ['rutina yoga en casa para principiantes 20 minutos', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina de estiramientos diaria para flexibilidad', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina para mujeres en casa sin pesas principiantes', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['rutina de entrenamiento en casa hombres mayores 40', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['cuánto tiempo tarda en verse resultados entrenando en casa', '3beae98f-77f5-4095-8da3-96a2abca107e', 'Rutinas'],
  ['esterilla antideslizante fitness cuál comprar 2026', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['banco de musculación plegable para casa análisis', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['bola de pilates talla y ejercicios recomendados', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['comba para saltar beneficios y cómo empezar', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['rueda abdominal ejercicios y técnica correcta', '06bb0c89-7107-4f2f-b72b-7cdbd8334670', 'Equipamiento Fitness'],
  ['batidos proteicos caseros recetas fáciles', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['carbohidratos antes de entrenar cuáles y cuántos', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['hidratación durante el ejercicio en casa cuánta agua', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['alimentos que aceleran el metabolismo realmente', '8c8d0988-31fd-4dfa-a40f-9a12d749dcfd', 'Nutrición'],
  ['cómo calcular mi peso ideal y IMC correctamente', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['grasa corporal vs peso total qué importa más', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['efecto rebote tras dieta cómo evitarlo', '60584146-478a-4a12-97ec-035668aa17a2', 'Pérdida de Peso'],
  ['pre workout casero alternativa a suplementos', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['vitamina D para deportistas cuándo suplementar', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['colágeno para deportistas sirve realmente', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
  ['omega 3 para deportistas beneficios y dosis', '1c2353e9-5381-41dd-a8ec-2181122cd4a8', 'Suplementos'],
]

const TOPIC_IMAGES = {
  ejercicio: ['photo-1571019613454-1cb2f99b2d8b','photo-1534438327276-14e5300c3a48','photo-1517836357463-d25dfeac3438','photo-1574680096145-d05b474e2155'],
  rutina: ['photo-1549060279-7e168fcee0c2','photo-1594737626072-2d1c8e69c0a7','photo-1571019614242-c5c5dee9f50b','photo-1541534741688-6078c6bfb5c5'],
  equipamiento: ['photo-1571731956672-f2b94d7dd0cb','photo-1583454110551-21f2fa2afe61','photo-1518611012118-696072aa579a','photo-1526506118085-60ce8714f8c5'],
  nutricion: ['photo-1490645935967-10de6ba17061','photo-1512621776951-a57141f2eefd','photo-1559181567-c3190bbbbd4c','photo-1567521464027-f127ff144326'],
  default: ['photo-1517836357463-d25dfeac3438','photo-1571019613454-1cb2f99b2d8b','photo-1534438327276-14e5300c3a48','photo-1549060279-7e168fcee0c2'],
}

const KEYWORD_MAP = {
  ejercicio:'ejercicio', flexion:'ejercicio', sentadilla:'ejercicio', burpee:'ejercicio', plank:'ejercicio', cardio:'ejercicio', abdomi:'ejercicio', gluteo:'ejercicio',
  rutina:'rutina', plan:'rutina', entrenamiento:'rutina', semana:'rutina', minuto:'rutina', hiit:'rutina', calistenia:'rutina',
  mancuerna:'equipamiento', barra:'equipamiento', esterilla:'equipamiento', kettlebell:'equipamiento', bicicleta:'equipamiento', cinta:'equipamiento', trx:'equipamiento', foam:'equipamiento', banco:'equipamiento',
  dieta:'nutricion', proteina:'nutricion', caloria:'nutricion', comer:'nutricion', alimento:'nutricion', meal:'nutricion', ayuno:'nutricion', carbohidrato:'nutricion',
  suplemento:'nutricion', whey:'nutricion', creatina:'nutricion', bcaa:'nutricion', magnesio:'nutricion', vitamina:'nutricion', omega:'nutricion',
  perder:'default', adelgazar:'default', grasa:'default', peso:'default', kilo:'default',
}

function getImageForKeyword(keyword) {
  const kw = keyword.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  let topic = 'default'
  for (const [fragment, mapped] of Object.entries(KEYWORD_MAP)) {
    if (kw.includes(fragment)) { topic = mapped; break }
  }
  const pool = TOPIC_IMAGES[topic] ?? TOPIC_IMAGES.default
  const photoId = pool[Math.floor(Math.random() * pool.length)]
  return `https://images.unsplash.com/${photoId}?w=1200&q=80`
}

function buildPrompt(keyword, categoryName) {
  const amazonBase = `https://www.amazon.es/s?tag=${AMAZON_TAG}&k=`
  return `Eres un experto en fitness, entrenamiento en casa y nutrición deportiva. Escribes para una audiencia española que quiere ponerse en forma desde casa.

KEYWORD PRINCIPAL: "${keyword}"
CATEGORÍA: ${categoryName}
AMAZON AFFILIATE TAG: ${AMAZON_TAG}

INSTRUCCIONES:
- Artículo completo de 1800-2400 palabras en español
- Tono motivador pero honesto, basado en evidencia científica
- Incluye consejos prácticos aplicables desde casa
- NO uses frases genéricas
- Estructura con H2 y H3 semánticos
- Incluye tabla comparativa si es relevante (ej. equipamiento)
- Precios en euros (2026), usa SIEMPRE 2026
- Entre 4 y 8 links de Amazon integrados naturalmente: <a href="${amazonBase}TÉRMINO" target="_blank" rel="nofollow sponsored" class="amazon-link">texto</a>

ESTRUCTURA JSON (devuelve ÚNICAMENTE el JSON):
{
  "title": "Título H1 SEO (50-65 chars)",
  "slug": "slug-kebab-case",
  "excerpt": "Descripción 150-160 chars",
  "meta_title": "Meta title (50-60 chars)",
  "meta_description": "Meta description (145-160 chars)",
  "content": "HTML completo con H2, H3, párrafos, listas, tablas y links Amazon. Sin H1.",
  "faqs": [
    {"question": "Pregunta 1?", "answer": "Respuesta 2-3 frases."},
    {"question": "Pregunta 2?", "answer": "Respuesta."},
    {"question": "Pregunta 3?", "answer": "Respuesta."}
  ]
}`
}

async function main() {
  const { ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env
  if (!ANTHROPIC_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing env vars: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY')
    process.exit(1)
  }

  const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  const slot = parseInt(process.env.ARTICLE_SLOT ?? '0', 10)
  const slotBank = KEYWORD_BANK.filter((_, i) => i % 2 === slot)

  const { data: existing } = await supabase.from('articles').select('focus_keyword')
  const usedKeywords = new Set((existing || []).map(a => a.focus_keyword?.toLowerCase().trim()))

  const next = slotBank.find(([kw]) => !usedKeywords.has(kw.toLowerCase().trim()))
  if (!next) {
    console.log('All keywords used — add more to KEYWORD_BANK')
    process.exit(0)
  }

  const [keyword, categoryId, categoryName] = next
  console.log(`Generating article for: "${keyword}" (${categoryName})`)

  let parsed
  for (let attempt = 1; attempt <= 3; attempt++) {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      messages: [{ role: 'user', content: buildPrompt(keyword, categoryName) }],
    })
    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    try {
      parsed = JSON.parse(raw); break
    } catch {
      const match = raw.match(/\{[\s\S]*\}/)
      if (match) { try { parsed = JSON.parse(match[0]); break } catch {} }
      if (attempt === 3) { console.error('Could not parse AI response after 3 attempts'); process.exit(1) }
      console.log(`JSON parse failed (attempt ${attempt}), retrying...`)
    }
  }

  const imageUrl = getImageForKeyword(keyword)
  const wordCount = String(parsed.content).split(/\s+/).filter(Boolean).length
  const baseSlug = slugify(String(parsed.slug || parsed.title), { lower: true, strict: true, locale: 'es' })

  let slug = baseSlug, attempt = 0
  while (true) {
    const { data } = await supabase.from('articles').select('id').eq('slug', slug).single()
    if (!data) break
    slug = `${baseSlug}-${++attempt}`
  }

  const { data: article, error } = await supabase
    .from('articles')
    .insert({
      title: parsed.title, slug, excerpt: parsed.excerpt, content: parsed.content,
      meta_title: parsed.meta_title, meta_description: parsed.meta_description,
      focus_keyword: keyword, category_id: categoryId, image_url: imageUrl,
      faqs: parsed.faqs, word_count: wordCount, reading_time: Math.ceil(wordCount / 200),
      status: 'published', published_at: new Date().toISOString(),
    })
    .select('id, title, slug').single()

  if (error) { console.error('Supabase error:', error); process.exit(1) }

  console.log(`✓ Published: "${article.title}"`)
  console.log(`  Slug: ${article.slug}`)
  console.log(`  Words: ${wordCount}`)
}

main().catch(err => { console.error(err); process.exit(1) })
