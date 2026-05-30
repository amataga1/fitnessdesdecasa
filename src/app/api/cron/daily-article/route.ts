import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const KEYWORD_BANK: [string, string, string][] = [
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
