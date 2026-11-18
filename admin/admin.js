// ==========================================
// CLEAN CAR - PAINEL ADMINISTRATIVO
// ==========================================

import services from "../src/data/services.js";

// ==========================================
// COPIA DOS SERVICOS PARA TESTES
// ==========================================

const adminServices = structuredClone(services);

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
// ATUALIZAR CAMPOS
// ==========================================

function updateServiceField(service, field, value) {

    const keys = field.split(".");

    if (keys.length === 2) {

        const [parent, child] = keys;

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

                    return;
                }

                updateServiceField(
                    service,
                    input.dataset.field,
                    value
                );

            });

        });

        container.appendChild(card);

    });

    console.log(
        "Serviços carregados:",
        adminServices.length
    );
}

// ==========================================
// INICIALIZACAO
// ==========================================

renderServices();