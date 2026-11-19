
import { createRemoteJWKSet, jwtVerify } from "jose";

// ==========================================
// CLEAN CAR - SEGURANÇA ADMINISTRATIVA
// ==========================================
// Valida o token emitido pelo Cloudflare Access
// antes de permitir acesso à API administrativa.
// ==========================================

export async function onRequest(context) {
    const { request, env, next } = context;


        const teamDomain = env.CF_ACCESS_TEAM_DOMAIN;
    const audience = env.CF_ACCESS_AUD;
    const adminEmail = env.ADMIN_EMAIL;

    // Impedir acesso se faltar configuração.
    if (!teamDomain || !audience || !adminEmail) {
        console.error("Configuração de segurança incompleta.");

        return Response.json(
            {
                success: false,
                message: "Serviço administrativo indisponível."
            },
            { status: 503 }
        );
    }

    // O Cloudflare Access envia o JWT neste cabeçalho.
    const token = request.headers.get("Cf-Access-Jwt-Assertion");

    if (!token) {
        return Response.json(
            {
                success: false,
                message: "Autenticação necessária."
            },
            { status: 401 }
        );
    }

    try {
        const issuer = `https://${teamDomain}`;

        const jwks = createRemoteJWKSet(
            new URL(`${issuer}/cdn-cgi/access/certs`)
        );

        // Verifica assinatura, emissor, AUD e validade.
        const { payload } = await jwtVerify(token, jwks, {
            issuer,
            audience
        });

        // Apenas o e-mail autorizado pode administrar.
        const authenticatedEmail =
            typeof payload.email === "string"
                ? payload.email.trim().toLowerCase()
                : "";

        if (
            !authenticatedEmail ||
            authenticatedEmail !== adminEmail.trim().toLowerCase()
        ) {
            return Response.json(
                {
                    success: false,
                    message: "Usuário sem permissão administrativa."
                },
                { status: 403 }
            );
        }

        // Identidade validada: continuar para a API.
        context.data.adminEmail = authenticatedEmail;

        return next();

    } catch (error) {
        console.error(
            "Falha na validação do Cloudflare Access:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Sessão inválida ou expirada."
            },
            { status: 401 }
        );
    }
}




