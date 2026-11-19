// ==========================================
// CLEAN CAR - GERADOR DE SQL
// ==========================================

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();

const servicesPath = path.join(
    projectRoot,
    "src",
    "data",
    "services.js"
);

const outputPath = path.join(
    projectRoot,
    "database",
    "importar-servicos.sql"
);

// ==========================================
// CARREGAR SERVICOS
// ==========================================

const source = fs.readFileSync(
    servicesPath,
    "utf8"
);

// Importa o módulo a partir de uma cópia temporária,
// evitando problemas de configuração do Node.js.

const temporaryPath = path.join(
    projectRoot,
    "database",
    "services-temp.mjs"
);

let services;

try {

    fs.writeFileSync(
        temporaryPath,
        source,
        "utf8"
    );

    const moduleUrl = pathToFileURL(
        temporaryPath
    ).href;

    const importedModule = await import(moduleUrl);

    services = importedModule.default;

} finally {

    if (fs.existsSync(temporaryPath)) {
        fs.unlinkSync(temporaryPath);
    }

}

// ==========================================
// VALIDAR SERVICOS
// ==========================================

if (!Array.isArray(services)) {
    throw new Error("O cadastro de serviços não é uma lista.");
}

const ids = new Set();

for (const service of services) {

    if (
        !service.id ||
        !service.name ||
        !service.category ||
        !service.type
    ) {
        throw new Error(
            "Serviço com informações obrigatórias ausentes."
        );
    }

    if (ids.has(service.id)) {
        throw new Error(
            `ID duplicado: ${service.id}`
        );
    }

    ids.add(service.id);
}

// ==========================================
// PROTEGER TEXTOS SQL
// ==========================================

function sqlText(value) {

    return "'" +
        String(value).replaceAll("'", "''") +
        "'";

}

// ==========================================
// GERAR COMANDOS SQL
// ==========================================

const statements = [];

statements.push(
    "-- CLEAN CAR - IMPORTACAO INICIAL"
);

statements.push(
    "-- Gerado automaticamente a partir de src/data/services.js"
);

statements.push(
    "BEGIN TRANSACTION;"
);

for (const service of services) {

    const {
        id,
        name,
        category,
        type,
        active,
        ...config
    } = service;

    const activeValue =
        active === false ? 0 : 1;

    const statement = `
INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    ${sqlText(id)},
    ${sqlText(name)},
    ${sqlText(category)},
    ${sqlText(type)},
    ${sqlText(JSON.stringify(config))},
    ${activeValue}
);`.trim();

    statements.push(statement);

}

statements.push(
    "COMMIT;"
);

// ==========================================
// SALVAR ARQUIVO
// ==========================================

fs.writeFileSync(
    outputPath,
    statements.join("\n\n") + "\n",
    "utf8"
);

console.log(
    `SQL gerado com sucesso para ${services.length} serviços.`
);

console.log(
    `Arquivo: ${outputPath}`
);

console.log(
    "Nenhum dado foi enviado ao Cloudflare."
);