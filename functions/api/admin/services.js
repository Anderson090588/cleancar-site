// ==========================================
// CLEAN CAR - API ADMINISTRATIVA
// Consulta todos os servicos, inclusive inativos.
// ==========================================

export async function onRequestGet(context) {
    try {
        const db = context.env.DB;

        if (!db) {
            throw new Error("Banco de dados D1 nao configurado.");
        }

        const result = await db.prepare(`
            SELECT id, name, category, type, config, active
            FROM services
            ORDER BY category, name
        `).all();

        const services = result.results.map((service) => ({
            id: service.id,
            name: service.name,
            category: service.category,
            type: service.type,
            ...JSON.parse(service.config),
            active: service.active === 1
        }));

        return Response.json({
            success: true,
            total: services.length,
            services
        });

    } catch (error) {
        console.error("Erro na consulta administrativa:", error);

        return Response.json(
            {
                success: false,
                message: "Nao foi possivel consultar os servicos."
            },
            { status: 500 }
        );
    }
}

// ==========================================
// CLEAN CAR - SALVAR ALTERACOES NO D1
// ==========================================

export async function onRequestPut(context) {
    try {
        const db = context.env.DB;

        if (!db) {
            throw new Error("Banco de dados D1 nao configurado.");
        }

        let body;

        try {
            body = await context.request.json();
        } catch {
            return Response.json(
                { success: false, message: "JSON invalido." },
                { status: 400 }
            );
        }

        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return Response.json(
                { success: false, message: "Dados invalidos." },
                { status: 400 }
            );
        }

        const { id, prices, maxPrice, price, minPrice, active } = body;

        if (typeof id !== "string" || !id.trim()) {
            return Response.json(
                { success: false, message: "Servico invalido." },
                { status: 400 }
            );
        }

        const existing = await db.prepare(
            "SELECT id, type, config FROM services WHERE id = ?"
        ).bind(id).first();

        if (!existing) {
            return Response.json(
                { success: false, message: "Servico nao encontrado." },
                { status: 404 }
            );
        }

        const config = JSON.parse(existing.config);

        const validPrice = (value) =>
            typeof value === "number" &&
            Number.isFinite(value) &&
            value >= 0;

        if (typeof active !== "boolean") {
            return Response.json(
                { success: false, message: "Status invalido." },
                { status: 400 }
            );
        }

        if (existing.type === "vehicle-size") {

            if (!prices || typeof prices !== "object" || Array.isArray(prices)) {
                return Response.json(
                    { success: false, message: "Precos por tamanho invalidos." },
                    { status: 400 }
                );
            }

            for (const size of ["pequeno", "medio", "grande"]) {
                if (!validPrice(prices[size])) {
                    return Response.json(
                        { success: false, message: `Preco invalido: ${size}.` },
                        { status: 400 }
                    );
                }
            }

            config.prices = {
                pequeno: prices.pequeno,
                medio: prices.medio,
                grande: prices.grande
            };

            if (config.maxPrice !== undefined || maxPrice !== undefined) {

                const maximums = maxPrice ?? config.maxPrice;

                if (!maximums || typeof maximums !== "object" ||
                    Array.isArray(maximums)) {
                    return Response.json(
                        { success: false, message: "Precos maximos invalidos." },
                        { status: 400 }
                    );
                }

                for (const size of ["pequeno", "medio", "grande"]) {
                    if (!validPrice(maximums[size]) ||
                        maximums[size] < prices[size]) {
                        return Response.json(
                            { success: false, message: `Preco maximo invalido: ${size}.` },
                            { status: 400 }
                        );
                    }
                }

                config.maxPrice = {
                    pequeno: maximums.pequeno,
                    medio: maximums.medio,
                    grande: maximums.grande
                };
            }
        }

        if (existing.type === "fixed" || existing.type === "quantity") {

            if (!validPrice(price)) {
                return Response.json(
                    { success: false, message: "Preco invalido." },
                    { status: 400 }
                );
            }

            config.price = price;
        }

        if (existing.type === "range") {

            if (!validPrice(minPrice) ||
                !validPrice(maxPrice) ||
                maxPrice < minPrice) {
                return Response.json(
                    { success: false, message: "Faixa de precos invalida." },
                    { status: 400 }
                );
            }

            config.minPrice = minPrice;
            config.maxPrice = maxPrice;
        }

        const result = await db.prepare(`
            UPDATE services
            SET config = ?, active = ?
            WHERE id = ?
        `).bind(
            JSON.stringify(config),
            active ? 1 : 0,
            id
        ).run();

        if (!result.success) {
            throw new Error("Falha na atualizacao do banco.");
        }

        return Response.json({
            success: true,
            message: "Servico atualizado com sucesso.",
            id
        });

    } catch (error) {

        console.error("Erro ao salvar servico:", error);

        return Response.json(
            {
                success: false,
                message: "Nao foi possivel salvar o servico."
            },
            { status: 500 }
        );
    }
}
