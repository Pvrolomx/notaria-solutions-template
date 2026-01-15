import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    
    const emailBody = `
📋 NUEVA SOLICITUD DE CITA
========================================

👤 DATOS DEL SOLICITANTE
   Nombre: ${data.nombre}
   Teléfono: ${data.telefono}
   Email: ${data.email || 'No proporcionado'}

📑 SERVICIO SOLICITADO
   ${data.servicio}

💬 MENSAJE:
${data.mensaje || 'Sin mensaje adicional'}

========================================
Recibido: ${new Date(data.timestamp).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
Idioma: ${data.lang === 'es' ? 'Español' : 'English'}
    `.trim()

    // Enviar via Resend (configurar RESEND_API_KEY en env)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Notaría Solutions <onboarding@resend.dev>',
        to: [process.env.NOTIFICATION_EMAIL || 'contacto@notaria.com'],
        subject: `📋 Nueva Cita: ${data.servicio} - ${data.nombre}`,
        text: emailBody,
        reply_to: data.email || undefined
      })
    })

    return NextResponse.json({ success: res.ok })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
