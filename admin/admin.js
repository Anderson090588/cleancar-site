// ==========================================
// CLEAN CAR - PAINEL ADMINISTRATIVO
// ==========================================
// Versão de testes com leitura pela API D1.
// As alterações ainda não são salvas.
// ==========================================

// ==========================================
// DADOS DOS SERVICOS
// ==========================================

let adminServices = [];
let originalServices = [];

// ==========================================
// CAMPOS DE PRECO
// ==========================================

function createPriceFields(service) {

    if (service.type === "vehicle-size") {

        const sizes = [
            ["pequeno", "Pequeno"],
            ["medio", "Médio"],
            ["grande", "Grande"]
        ];

        return sizes.map(([key, label]) => {

            const price = service.prices?.[key] ?? 0;
            const maxPrice = service.maxPrice?.[key];

            return `
                <div class="col-md-4 mb-3">

                    <label class="form-label">
                        ${label} - Preço base
                    </label>

                    <input
                        type="number"
                        class="form-control"
                        min="0"
                        step="0.01"
                        data-field="prices.${key}"
                        value="${price}"
                    >

                    ${
                        maxPrice !== undefined
                            ? `
                                <label class="form-label mt-2">
                                    ${label} - Preço máximo
                                </label>

                                <input
                                    type="number"
                                    class="form-control"
                                    min="0"
                                    step="0.01"
                                    data-field="maxPrice.${key}"
                                    value="${maxPrice}"
                                >
                            `
                            : ""
                    }

                </div>
            `;

        }).join("");
    }

    if (
        service.type === "fixed" ||
        service.type === "quantity"
    ) {

        return `
            <div class="col-md-4 mb-3">

                <label class="form-label">
                    Preço (R$)
                </label>

                <input
                    type="number"
                    class="form-control"
                    min="0"
                    step="0.01"
                    data-field="price"
                    value="${service.price ?? 0}"
                >

            </div>
        `;
    }

    if (service.type === "range") {

        return `
            <div class="col-md-4 mb-3">

                <label class="form-label">
                    Preço mínimo
                </label>

                <input
                    type="number"
                    class="form-control"
                    min="0"
                    step="0.01"
                    data-field="minPrice"
                    value="${service.minPrice ?? 0}"
                >

            </div>

            <div class="col-md-4 mb-3">

                <label class="form-label">
                    Preço máximo
                </label>

                <input
                    type="number"
                    class="form-control"
                    min="0"
                    step="0.01"
                    data-field="maxPrice"
                    value="${service.maxPrice ?? 0}"
                >

            </div>
        `;
    }

    return `
        <div class="col-12">
            <p class="text-muted small">
                ${
                    service.type === "custom"
                        ? "Serviço sob avaliação."
                        : "Serviço incluso, sem preço adicional."
                }
            </p>
        </div>
    `;
}

// ==========================================
// ATUALIZAR CAMPOS LOCALMENTE
// ==========================================

function updateServiceField(service, field, value) {

    const keys = field.split(".");

    if (keys.length === 2) {

        const [parent, child] = keys;

        if (!service[parent]) {
            service[parent] = {};
        }

        service[parent][child] = value;

    } else {

        service[field] = value;

    }
}

// ==========================================
// EXIBIR SERVICOS
// ==========================================

function renderServices() {

    const container =
        document.querySelector("#admin-services");

    if (!container) {
        console.error("Container de serviços não encontrado.");
        return;
    }

    container.innerHTML = "";

    adminServices.forEach(service => {

        const active = service.active !== false;

        const card = document.createElement("div");

        card.className = "card mb-3 border-0 shadow-sm";

        card.innerHTML = `
            <div class="card-body">

                <div class="d-flex justify-content-between
                            align-items-start gap-3 mb-3">

                    <div>
                        <h3 class="h6 fw-bold mb-1"></h3>
                        <span class="text-muted small"></span>
                    </div>

                    <div class="form-check form-switch">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            data-active
                            ${active ? "checked" : ""}
                        >

                        <label class="form-check-label">
                            Ativo
                        </label>

                    </div>

                </div>

                <div class="row">
                    ${createPriceFields(service)}
                </div>

            </div>
        `;

        card.querySelector("h3").textContent =
            service.name;

        card.querySelector(".text-muted.small").textContent =
            service.category;

        const activeInput =
            card.querySelector("[data-active]");

        activeInput.addEventListener("change", () => {

            service.active = activeInput.checked;
            updateSaveButton();

            

        });

        card.querySelectorAll("[data-field]").forEach(input => {

            input.addEventListener("change", () => {

                const value = Number(input.value);

                if (
                    input.value.trim() === "" ||
                    !Number.isFinite(value) ||
                    value < 0
                ) {

                    alert("Informe um preço válido.");

                    renderServices();
        updateSaveButton();

                    return;
                }

                updateServiceField(
                    service,
                    input.dataset.field,
                    value
                );
                updateSaveButton();

                

            });

        });

        container.appendChild(card);

    });

    
}

// ==========================================
// CARREGAR SERVICOS DA API
// ==========================================

async function loadServices() {

    const container =
        document.querySelector("#admin-services");

    if (!container) {
        console.error("Container de serviços não encontrado.");
        return;
    }

    container.textContent = "Carregando serviços...";

    try {

        const response = await fetch(
            "/api/admin/services",
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Erro HTTP ${response.status}`
            );
        }

        const data = await response.json();

        if (
            data.success !== true ||
            !Array.isArray(data.services)
        ) {
            throw new Error(
                "Resposta inválida da API."
            );
        }

        adminServices = structuredClone(data.services);
        originalServices = structuredClone(data.services);

        renderServices();
        updateSaveButton();

        

    } catch (error) {

        console.error(
            "Erro ao carregar serviços:",
            error
        );

        container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Não foi possível carregar os serviços.
                Verifique se o servidor local está funcionando.
            </div>
        `;

    }
}

// ==========================================

// ==========================================
// CONTROLE DE ALTERACOES
// ==========================================

function getModifiedServices() {
    return adminServices.filter(service => {
        const original = originalServices.find(
            item => item.id === service.id
        );

        return original &&
            JSON.stringify(service) !== JSON.stringify(original);
    });
}

function updateSaveButton() {
    const button = document.querySelector("#save-services");
    const status = document.querySelector("#save-status");

    if (!button || !status) return;

    const modified = getModifiedServices();

    button.disabled = modified.length === 0;

    status.textContent = modified.length
        ? `${modified.length} serviço(s) com alterações pendentes.`
        : "Nenhuma alteração pendente.";
}

// ==========================================
// SALVAR ALTERACOES NO D1
// ==========================================

async function saveServices() {
    const button = document.querySelector("#save-services");
    const status = document.querySelector("#save-status");

    const modified = getModifiedServices();

    if (!modified.length) return;

    button.disabled = true;
    status.textContent = "Salvando alterações...";

    let saved = 0;

    try {
        for (const service of modified) {
            const response = await fetch("/api/admin/services", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(service)
            });

            const data = await response.json();

            if (!response.ok || data.success !== true) {
                throw new Error(
                    data.message || `Erro HTTP ${response.status}`
                );
            }

            const index = originalServices.findIndex(
                item => item.id === service.id
            );

            if (index !== -1) {
                originalServices[index] = structuredClone(service);
            }

            saved++;
        }

        status.textContent =
            `${saved} serviço(s) salvo(s) com sucesso!`;

    } catch (error) {
        console.error("Erro ao salvar serviços:", error);

        status.textContent =
            `Erro ao salvar: ${error.message}`;
    } finally {
        updateSaveButton();
    }
}

// ==========================================
// EVENTO DO BOTAO SALVAR
// ==========================================

document.querySelector("#save-services")
    ?.addEventListener("click", saveServices);

// INICIALIZACAO
// ==========================================

loadServices();

