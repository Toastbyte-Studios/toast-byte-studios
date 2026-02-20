interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
}

const ALLOWED_ORIGINS = [
  'https://toastbyte.studio',
  'https://www.toastbyte.studio',
  'http://localhost:5173',
];

function corsHeaders(origin: string | null): HeadersInit {
  const allowed =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers });
    }

    let email: string;
    let turnstileToken: string | undefined;
    try {
      const body = await request.json<{
        email?: string;
        turnstileToken?: string;
      }>();
      email = (body.email ?? '').trim().toLowerCase();
      turnstileToken = body.turnstileToken;
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: 'Verification required' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get('CF-Connecting-IP') ?? '',
        }),
      },
    );
    const verifyData = (await verifyRes.json()) as { success: boolean };
    if (!verifyData.success) {
      return new Response(JSON.stringify({ error: 'Verification failed' }), {
        status: 403,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    try {
      await env.DB.prepare('INSERT INTO email_signups (email) VALUES (?)')
        .bind(email)
        .run();
    } catch (err: unknown) {
      // D1 unique constraint — email already registered
      if (
        err instanceof Error &&
        err.message.includes('UNIQUE constraint failed')
      ) {
        return new Response(
          JSON.stringify({
            ok: true,
            duplicate: true,
            message: 'Email already registered',
          }),
          {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          },
        );
      }
      console.error(err);
      return new Response(JSON.stringify({ error: 'Server error' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  },
};
