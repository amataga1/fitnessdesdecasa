import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const KEYWORD_BANK: [string, string, string][] = [
  ['ejercicios para bajar de peso en casa sin equipamiento', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['ejercicios para glúteos en casa sin pesas', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['flexiones tipos y cómo hacerlas correctamente', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['dominadas en casa sin barra cómo hacerlas', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['ejercicios abdominales en casa para principiantes', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['sentadillas tipos y técnica correcta guía completa', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['cardio en casa sin máquinas ejercicios efectivos', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['ejercicios para piernas en casa sin equipo', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['plank variantes y cuánto tiempo aguantar', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['ejercicios para hombros en casa con y sin pesas', 'cat-ejercicios', 'Ejercicios en Casa'],
  ['rutina de 30 minutos en casa para principiantes', 'cat-rutinas', 'Rutinas'],
  ['rutina full body en casa 3 días a la semana', 'cat-rutinas', 'Rutinas'],
  ['rutina HIIT en casa 20 minutos quemar grasa', 'cat-rutinas', 'Rutinas'],
  ['plan entrenamiento 8 semanas en casa principiantes', 'cat-rutinas', 'Rutinas'],
  ['rutina de calistenia en casa para empezar', 'cat-rutinas', 'Rutinas'],
  ['cuántos días a la semana entrenar en casa', 'cat-rutinas', 'Rutinas'],
  ['rutina para ganar masa muscular en casa', 'cat-rutinas', 'Rutinas'],
  ['entrenamiento funcional en casa qué es y cómo empezar', 'cat-rutinas', 'Rutinas'],
  ['mejores mancuernas para casa comparativa 2026', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['barra de dominadas para puerta análisis comparativa', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['mejor esterilla yoga fitness para casa 2026', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['kettlebell peso ideal para empezar en casa', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['bandas elásticas resistencia para entrenar en casa', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['mejor bicicleta estática para casa 2026 comparativa', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['TRX en casa cómo usarlo y qué ejercicios hacer', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['mancuernas ajustables vs fijas cuáles comprar', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['mejor cinta de correr para casa 2026', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['foam roller para recuperación muscular guía', 'cat-equipamiento', 'Equipamiento Fitness'],
  ['dieta para perder grasa y ganar músculo guía', 'cat-nutricion', 'Nutrición'],
  ['qué comer antes y después de entrenar en casa', 'cat-nutricion', 'Nutrición'],
  ['proteína diaria cuánta necesito para ganar músculo', 'cat-nutricion', 'Nutrición'],
  ['déficit calórico cómo calcularlo para perder peso', 'cat-nutricion', 'Nutrición'],
  ['alimentos ricos en proteína baratos para deportistas', 'cat-nutricion', 'Nutrición'],
  ['meal prep semanal para deportistas que entrenan en casa', 'cat-nutricion', 'Nutrición'],
  ['ayuno intermitente compatible con entrenamiento en casa', 'cat-nutricion', 'Nutrición'],
  ['cuántas calorías necesito al día si entreno en casa', 'cat-nutricion', 'Nutrición'],
  ['cómo perder 5 kilos en casa en 1 mes de forma real', 'cat-perdida', 'Pérdida de Peso'],
  ['ejercicios para quemar grasa abdominal en casa', 'cat-perdida', 'Pérdida de Peso'],
  ['por qué no adelgazo aunque hago ejercicio en casa', 'cat-perdida', 'Pérdida de Peso'],
  ['plan adelgazamiento 12 semanas entrenando en casa', 'cat-perdida', 'Pérdida de Peso'],
  ['proteína whey para principiantes cuál elegir 2026', 'cat-suplementos', 'Suplementos'],
  ['creatina para qué sirve y cómo tomarla', 'cat-suplementos', 'Suplementos'],
  ['mejores suplementos para ganar masa muscular en casa', 'cat-suplementos', 'Suplementos'],
  ['bcaa aminoácidos ramificados sirven para algo realmente', 'cat-suplementos', 'Suplementos'],
  ['magnesio para deportistas beneficios y dosis', 'cat-suplementos', 'Suplementos'],
]

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createServiceClient()

  try {
    const { data: existing } = await supabase.from('articles').select('focus_keyword')
    const used = new Set((existing || []).map((a: { focus_keyword: string }) => a.focus_keyword?.toLowerCase().trim()))
    const next = KEYWORD_BANK.find(([kw]) => !used.has(kw.toLowerCase().trim()))
    if (!next) return NextResponse.json({ message: 'All keywords used' })

    const [keyword, categoryId, categoryName] = next
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fitnessdesdecasa.es'

    const res = await fetch(`${siteUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword, categoryId, categoryName, intent: 'informational' }),
    })
    if (!res.ok) throw new Error(`Generate failed`)
    const data = await res.json()

    await supabase.from('articles').update({ status: 'published', published_at: new Date().toISOString() }).eq('id', data.article.id)
    return NextResponse.json({ ok: true, article: data.article.title })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 500 })
  }
}
