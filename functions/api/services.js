// ==========================================
// CLEAN CAR - API DE SERVIÇOS
// ==========================================
// Consulta os serviços cadastrados no D1.
// Esta API permite somente leitura.
// ==========================================

export async function onRequestGet(context) {

    try {

        const db = context.env.DB;

        if (!db) {
            throw new Error(
                "Banco de dados D1 não configurado."
            );
        }

        // Consultar os serviços ativos

        const result = await db.prepare(`
            SELECT
                id,
                name,
                category,
                type,
                config,
                active
            FROM services
            WHERE active = 1
            ORDER BY category, name
        `).all();

        // Converter os dados do banco para
        // o formato utilizado pelo site.

        const services = result.results.map((service) => {

            const config = JSON.parse(service.config);

            return {
                id: service.id,
                name: service.name,
                category: service.category,
                type: service.type,
                ...config,
                active: service.active === 1
            };

        });

        return Response.json({
            success: true,
            total: services.length,
            services: services
        });

    } catch (error) {

        console.error(
            "Erro ao consultar serviços:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Não foi possível consultar os serviços."
            },
            {
                status: 500
            }
        );

    }

}