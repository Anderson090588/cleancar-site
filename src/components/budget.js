
// ==========================================
// CARREGAR SERVICOS ATIVOS DO D1
// ==========================================

async function loadPublicServices() {
    const response = await fetch("/api/services", {
        cache: "no-store"
    });

    if (!response.ok) {
        throw new Error(
            `Falha ao consultar servicos: HTTP ${response.status}`
        );
    }

    const data = await response.json();

    if (
        data.success !== true ||
        !Array.isArray(data.services)
    ) {
        throw new Error("Resposta invalida da API de servicos.");
    }

    return data.services.filter(service => service.active !== false);
}


let services = [];

// ==========================================
// CLEAN CAR - ORÇAMENTO E AGENDAMENTO
// ==========================================

const WHATSAPP_PHONE = "5512996010419";

const BOOKING_URL =
    "https://calendar.app.google/XRqN58Ankv8aJnUq6";

const MAINTENANCE_SERVICE_ID = "limpeza-manutencao";

const QUANTITY_LIMITS = {
    "banco-dianteiro": 2,
    "banco-traseiro": 3,
    "forro-porta": 4
};

const CATEGORY_ORDER = [
    "Limpeza",
    "Higienização",
    "Polimento",
    "Proteção",
    "Pintura",
    "Vidros",
    "Motor",
    "Chassi",
    "Plásticos"
];

const CATEGORY_ICONS = {
    "Limpeza": "bi-droplet",
    "Higienização": "bi-stars",
    "Polimento": "bi-brightness-high",
    "Proteção": "bi-shield-check",
    "Pintura": "bi-palette",
    "Vidros": "bi-window",
    "Motor": "bi-gear",
    "Chassi": "bi-car-front",
    "Plásticos": "bi-gem"
};

const VEHICLE_NAMES = {
    pequeno: "Pequeno",
    medio: "Médio",
    grande: "Grande / SUV / 7 lugares"
};

const DIRT_LEVELS = [
    "Muito limpo",
    "Pouco sujo",
    "Sujeira moderada",
    "Bastante sujo",
    "Muito sujo"
];

const INSPECTION_NOTICE =
    "Os valores apresentados são estimativas calculadas " +
    "com base nas informações fornecidas pelo cliente. " +
    "O orçamento definitivo será confirmado após a " +
    "vistoria presencial do veículo, considerando seu " +
    "estado de conservação e as condições necessárias " +
    "para a execução dos serviços.";

function formatCurrency(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export function createBudget() {

    const section = document.createElement("section");

    section.className = "budget-section";
    section.id = "orcamento";

    // ======================================
    // ESTRUTURA DO ORÇAMENTO
    // ======================================

    section.innerHTML = `
        <div class="budget-container">

            <div class="budget-header">

                <span class="budget-label">
                    ORÇAMENTO
                </span>

                <h2>Monte seu orçamento</h2>

                <p>
                    Selecione o veículo e os serviços desejados.
                    O valor apresentado é uma estimativa inicial.
                </p>

            </div>

            <div class="budget-content">

                <div class="budget-group">

                    <label for="customer-name">
                        Seu nome
                    </label>

                    <input
                        type="text"
                        id="customer-name"
                        placeholder="Digite seu nome"
                        autocomplete="name"
                    >

                </div>

                <div class="budget-group">

                    <label for="vehicle-model">
                        Modelo do veículo
                    </label>

                    <input
                        type="text"
                        id="vehicle-model"
                        placeholder="Ex.: Honda Civic, Corolla, Onix..."
                    >

                </div>

                <div class="budget-group">

                    <label for="vehicle-size">
                        Tamanho do veículo
                    </label>

                    <select id="vehicle-size">

                        <option value="">
                            Selecione o tamanho
                        </option>

                        <option value="pequeno">
                            Pequeno
                        </option>

                        <option value="medio">
                            Médio
                        </option>

                        <option value="grande">
                            Grande / SUV / 7 lugares
                        </option>

                    </select>

                </div>

                <!-- ESTADO DE CONSERVAÇÃO -->

                <div
                    class="budget-group"
                    id="vehicle-condition-group"
                >

                    <label for="vehicle-condition">
                        Estado de conservação / sujeira
                    </label>

                    <div
                        style="
                            padding: 20px;
                            border: 1px solid #dddddd;
                            border-radius: 12px;
                            background: #f8f9fa;
                        "
                    >

                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 8px;
                                margin-bottom: 16px;
                            "
                        >

                            <span
                                style="
                                    font-size: 14px;
                                    color: #555555;
                                "
                            >
                                Nível informado
                            </span>

                            <strong
                                id="vehicle-condition-label"
                                style="
                                    color: #222222;
                                    font-size: 15px;
                                "
                            >
                                Pouco sujo
                            </strong>

                        </div>

                        <input
                            type="range"
                            id="vehicle-condition"
                            min="0"
                            max="4"
                            step="1"
                            value="1"
                            style="
                                display: block;
                                width: 100%;
                                cursor: pointer;
                                accent-color: #e5ad19;
                            "
                        >

                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                gap: 10px;
                                margin-top: 10px;
                                font-size: 12px;
                                color: #666666;
                            "
                        >

                            <span>Muito limpo</span>
                            <span>Moderado</span>
                            <span>Muito sujo</span>

                        </div>

                        <p
                            id="vehicle-condition-message"
                            style="
                                margin: 16px 0 0;
                                font-size: 13px;
                                line-height: 1.5;
                                color: #555555;
                            "
                        >
                            A barra ajusta apenas os serviços
                            que possuem variação de preço.
                        </p>

                    </div>

                </div>

                <!-- SERVIÇOS -->

                <div class="budget-group">

                    <label>Serviços</label>

                    <div
                        class="services-list"
                        id="services-list"
                    ></div>

                </div>

                <!-- RESUMO -->

                <div
                    class="budget-summary"
                    id="budget-summary"
                >

                    <h3>Resumo do orçamento</h3>

                    <div
                        class="budget-summary-list"
                        id="budget-summary-list"
                    >

                        <p class="budget-empty">
                            Nenhum serviço selecionado.
                        </p>

                    </div>

                </div>

                <!-- RESULTADO -->

                <div class="budget-result">

                    <span>
                        Estimativa do orçamento
                    </span>

                    <strong id="budget-total">
                        R$ 0,00
                    </strong>

                    <p id="budget-message">
                        Selecione o veículo e pelo menos um serviço.
                    </p>

                </div>

                <!-- AVISO DE VISTORIA -->

                <div
                    id="budget-inspection-notice"
                    role="note"
                    style="
                        padding: 16px;
                        border-left: 4px solid #e5ad19;
                        background: #fff8e6;
                        border-radius: 8px;
                        margin-bottom: 18px;
                        line-height: 1.6;
                        font-size: 14px;
                        color: #333333;
                    "
                >

                    <strong>
                        Atenção: orçamento sujeito à vistoria.
                    </strong>

                    <p style="margin: 8px 0 0;">
                        Os valores apresentados são estimativas
                        calculadas com base nas informações
                        fornecidas pelo cliente. O orçamento
                        definitivo será confirmado após a
                        vistoria presencial do veículo,
                        considerando seu estado de conservação
                        e as condições necessárias para a
                        execução dos serviços.
                    </p>

                </div>

                <!-- AGENDAMENTO -->

                <button
                    type="button"
                    id="budget-booking"
                    class="budget-whatsapp"
                    style="display: none;"
                    disabled
                >
                    Agendar limpeza de manutenção
                </button>

                <!-- WHATSAPP -->

                <button
                    type="button"
                    id="budget-whatsapp"
                    class="budget-whatsapp"
                    disabled
                >
                    Enviar orçamento pelo WhatsApp
                </button>

            </div>

        </div>
    `;

    // ======================================
    // ELEMENTOS
    // ======================================

    const customerNameInput =
        section.querySelector("#customer-name");

    const vehicleModelInput =
        section.querySelector("#vehicle-model");

    const vehicleSelect =
        section.querySelector("#vehicle-size");

    const conditionInput =
        section.querySelector("#vehicle-condition");

    const conditionLabel =
        section.querySelector("#vehicle-condition-label");

    const conditionMessage =
        section.querySelector("#vehicle-condition-message");

    const servicesList =
        section.querySelector("#services-list");

    const summaryList =
        section.querySelector("#budget-summary-list");

    const totalElement =
        section.querySelector("#budget-total");

    const messageElement =
        section.querySelector("#budget-message");

    const bookingButton =
        section.querySelector("#budget-booking");

    const whatsappButton =
        section.querySelector("#budget-whatsapp");

    // ======================================
    // CONSULTA DOS SERVIÇOS
    // ======================================

    function findService(id) {

        return services.find(
            service =>
                String(service.id) === String(id)
        );
    }

    function getSelectedServices() {

        return [
            ...servicesList.querySelectorAll(
                'input[type="checkbox"]:checked'
            )
        ]
            .map(input =>
                findService(input.dataset.serviceId)
            )
            .filter(Boolean);
    }

    function getQuantity(service) {

        if (service.type !== "quantity") {
            return 1;
        }

        const quantityInput = [
            ...servicesList.querySelectorAll(
                ".service-quantity"
            )
        ].find(
            input =>
                input.dataset.quantityId ===
                String(service.id)
        );

        if (!quantityInput) {
            return 1;
        }

        const quantity = Number(quantityInput.value);

        return quantity > 0 ? quantity : 1;
    }

    // ======================================
    // PREÇOS MÍNIMOS E MÁXIMOS
    // ======================================

    function getPriceLimits(service, vehicleSize) {

        if (service.type === "vehicle-size") {

            const minimum =
                Number(service.prices?.[vehicleSize] || 0);

            const configuredMaximum =
                service.maxPrice?.[vehicleSize];

            const maximum =
                configuredMaximum == null
                    ? minimum
                    : Number(configuredMaximum);

            return {
                minimum,
                maximum: Math.max(minimum, maximum)
            };
        }

        if (service.type === "range") {

            const minimum =
                Number(service.minPrice || 0);

            const configuredMaximum =
                service.maxPrice;

            const maximum =
                configuredMaximum == null
                    ? minimum
                    : Number(configuredMaximum);

            return {
                minimum,
                maximum: Math.max(minimum, maximum)
            };
        }

        if (service.type === "fixed") {

            const price = Number(service.price || 0);

            return {
                minimum: price,
                maximum: price
            };
        }

        if (service.type === "quantity") {

            const price =
                Number(service.price || 0) *
                getQuantity(service);

            return {
                minimum: price,
                maximum: price
            };
        }

        return {
            minimum: 0,
            maximum: 0
        };
    }

    function hasPriceVariation(service, vehicleSize) {

        const limits = getPriceLimits(
            service,
            vehicleSize
        );

        return limits.maximum > limits.minimum;
    }

    // ======================================
    // NÍVEL DE SUJEIRA
    // ======================================

    function getConditionLevel() {

        const level = Number(conditionInput.value);

        return Math.min(
            4,
            Math.max(0, level)
        );
    }

    function getConditionName() {

        return DIRT_LEVELS[getConditionLevel()];
    }

    function updateConditionLabel() {

        conditionLabel.textContent =
            getConditionName();
    }

    // ======================================
    // PREÇO AJUSTADO PELA BARRA
    // ======================================

    function getServicePrice(service, vehicleSize) {

        const limits = getPriceLimits(
            service,
            vehicleSize
        );

        if (!hasPriceVariation(service, vehicleSize)) {
            return limits.minimum;
        }

        const level = getConditionLevel();

        const proportion = level / 4;

        const difference =
            limits.maximum - limits.minimum;

        const adjustedPrice =
            limits.minimum + difference * proportion;

        // Arredonda para centavos.
        return Math.round(adjustedPrice * 100) / 100;
    }

    function getServicePriceText(service, vehicleSize) {

        if (service.type === "custom") {
            return "Sob avaliação";
        }

        if (service.type === "included") {
            return "Incluso";
        }

        return formatCurrency(
            getServicePrice(service, vehicleSize)
        );
    }

    // ======================================
    // CRIA OS SERVIÇOS
    // ======================================

    function createServiceOption(service) {

        const option = document.createElement("label");

        option.className = "service-option";

        const hasQuantity =
            service.type === "quantity";

        const maxQuantity = QUANTITY_LIMITS[service.id] ?? 99;

        option.innerHTML = `
            <input
                type="checkbox"
                value="${service.id}"
                data-service-id="${service.id}"
                data-service-category="${service.category}"
            >

            <span class="service-info">
                <strong></strong>
                <small></small>
            </span>

            ${
                hasQuantity
                    ? `
                        <div class="quantity-control">

                            <button
                                type="button"
                                class="quantity-button quantity-minus"
                                aria-label="Diminuir quantidade"
                                disabled
                            >
                                −
                            </button>

                            <input
                                type="number"
                                class="service-quantity"
                                data-quantity-id="${service.id}"
                                max="${maxQuantity}"
                                min="1"
                                value="1"
                                readonly
                                disabled
                            >

                            <button
                                type="button"
                                class="quantity-button quantity-plus"
                                aria-label="Aumentar quantidade"
                                disabled
                            >
                                +
                            </button>

                        </div>
                    `
                    : ""
            }
        `;

        const checkbox =
            option.querySelector('input[type="checkbox"]');

        const nameElement =
            option.querySelector(".service-info strong");

        const detailElement =
            option.querySelector(".service-info small");

        nameElement.textContent =
            service.name +
            (service.type === "custom"
                ? " — Sob avaliação"
                : "");

        detailElement.textContent =
            service.duration ||
            (service.type === "included"
                ? "Incluso"
                : "");

        if (hasQuantity) {

            const quantityInput =
                option.querySelector(".service-quantity");

            const minusButton =
                option.querySelector(".quantity-minus");

            const plusButton =
                option.querySelector(".quantity-plus");

            checkbox.addEventListener("change", () => {

                const enabled = checkbox.checked;

                quantityInput.disabled = !enabled;

                minusButton.disabled =
                    !enabled ||
                    Number(quantityInput.value) <= 1;

                plusButton.disabled = !enabled || Number(quantityInput.value) >= maxQuantity;

                if (!enabled) {
                    quantityInput.value = 1;
                }
            });

            minusButton.addEventListener("click", event => {

                event.preventDefault();
                event.stopPropagation();

                if (!checkbox.checked) {
                    return;
                }

                const current =
                    Number(quantityInput.value);

                if (current > 1) {
                    quantityInput.value = current - 1;
                }

                minusButton.disabled =
                    Number(quantityInput.value) <= 1;

                
                plusButton.disabled = Number(quantityInput.value) >= maxQuantity;

                calculateBudget();
            });

            plusButton.addEventListener("click", event => {

                event.preventDefault();
                event.stopPropagation();

                if (!checkbox.checked) {
                    return;
                }

                quantityInput.value = Math.min(maxQuantity, Number(quantityInput.value) + 1);

                minusButton.disabled = false;

                
                plusButton.disabled = Number(quantityInput.value) >= maxQuantity;

                calculateBudget();
            });
        }

        return option;
    }

    // ======================================
    // CATEGORIAS
    // ======================================

    function createCategories() {

        CATEGORY_ORDER.forEach(category => {

            const categoryServices = services.filter(
                service =>
                    service.category === category
            );

            if (categoryServices.length === 0) {
                return;
            }

            const categoryElement =
                document.createElement("div");

            categoryElement.className =
                "service-category";

            categoryElement.dataset.category =
                category;

            const header =
                document.createElement("button");

            header.type = "button";

            header.className =
                "service-category-header";

            header.setAttribute(
                "aria-expanded",
                "false"
            );

            header.innerHTML = `
                <span class="service-category-title">

                    <span class="service-category-icon">
                        <i class="bi ${
                            CATEGORY_ICONS[category] || "bi-grid"
                        }"></i>
                    </span>

                    <span></span>

                </span>

                <span class="service-category-actions">

                    <span
                        class="service-category-count"
                        hidden
                    >
                        0
                    </span>

                    <i
                        class="bi bi-chevron-down service-category-arrow"
                    ></i>

                </span>
            `;

            header.querySelector(
                ".service-category-title > span:last-child"
            ).textContent = category;

            const content =
                document.createElement("div");

            content.className =
                "service-category-content";

            const list =
                document.createElement("div");

            list.className =
                "service-category-list";

            categoryServices.forEach(service => {

                list.appendChild(
                    createServiceOption(service)
                );
            });

            content.appendChild(list);

            categoryElement.appendChild(header);
            categoryElement.appendChild(content);

            servicesList.appendChild(categoryElement);

            header.addEventListener("click", () => {

                const wasOpen =
                    categoryElement.classList.contains(
                        "active"
                    );

                servicesList.querySelectorAll(
                    ".service-category.active"
                ).forEach(item => {

                    item.classList.remove("active");

                    item.querySelector(
                        ".service-category-header"
                    )?.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                });

                if (!wasOpen) {

                    categoryElement.classList.add(
                        "active"
                    );

                    header.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                }
            });
        });
    }

    // ======================================
    // CONTADORES DAS CATEGORIAS
    // ======================================

    function updateCategoryCounters() {

        servicesList.querySelectorAll(
            ".service-category"
        ).forEach(categoryElement => {

            const count =
                categoryElement.querySelectorAll(
                    'input[type="checkbox"]:checked'
                ).length;

            const counter =
                categoryElement.querySelector(
                    ".service-category-count"
                );

            if (counter) {

                counter.textContent = count;

                counter.hidden = count === 0;
            }
        });
    }

    // ======================================
    // RESUMO DO ORÇAMENTO
    // ======================================

    function updateSummary(
        selectedServices,
        vehicleSize
    ) {

        summaryList.innerHTML = "";

        if (selectedServices.length === 0) {

            summaryList.innerHTML = `
                <p class="budget-empty">
                    Nenhum serviço selecionado.
                </p>
            `;

            return;
        }

        selectedServices.forEach(service => {

            const item =
                document.createElement("div");

            item.className =
                "budget-summary-item";

            const info =
                document.createElement("div");

            info.className =
                "budget-summary-info";

            const name =
                document.createElement("strong");

            const quantityText =
                service.type === "quantity"
                    ? ` × ${getQuantity(service)}`
                    : "";

            name.textContent =
                service.name + quantityText;

            const category =
                document.createElement("small");

            category.textContent =
                service.category;

            info.appendChild(name);
            info.appendChild(category);

            const price =
                document.createElement("span");

            price.className =
                "budget-summary-price";

            price.textContent =
                getServicePriceText(
                    service,
                    vehicleSize
                );

            item.appendChild(info);
            item.appendChild(price);

            summaryList.appendChild(item);
        });
    }

    // ======================================
    // AGENDAMENTO GOOGLE AGENDA
    // ======================================

    function canScheduleMaintenance() {

        const selectedServices =
            getSelectedServices();

        if (!vehicleSelect.value) {
            return false;
        }

        if (selectedServices.length !== 1) {
            return false;
        }

        return selectedServices[0].id ===
            MAINTENANCE_SERVICE_ID;
    }

    function updateBookingButton() {

        const canSchedule =
            canScheduleMaintenance();

        bookingButton.style.display =
            canSchedule ? "block" : "none";

        bookingButton.disabled = !canSchedule;
    }

    // ======================================
    // ATUALIZA INFORMAÇÃO DA BARRA
    // ======================================

    function updateConditionMessage(
        selectedServices,
        vehicleSize
    ) {

        const variableServices =
            selectedServices.filter(
                service =>
                    hasPriceVariation(
                        service,
                        vehicleSize
                    )
            );

        if (!vehicleSize) {

            conditionMessage.textContent =
                "Selecione o tamanho do veículo e " +
                "os serviços para visualizar a estimativa.";

            return;
        }

        if (variableServices.length === 0) {

            conditionMessage.textContent =
                "Os serviços selecionados não possuem " +
                "variação de preço cadastrada. " +
                "A barra não altera seus valores.";

            return;
        }

        const count = variableServices.length;

        conditionMessage.textContent =
            `Ajustando ${count} ${
                count === 1 ? "serviço" : "serviços"
            } com variação de preço cadastrada. ` +
            "Os demais valores permanecem inalterados.";
    }

    // ======================================
    // CÁLCULO DO ORÇAMENTO
    // ======================================

    function calculateBudget() {

        updateCategoryCounters();
        updateConditionLabel();

        const vehicleSize =
            vehicleSelect.value;

        const selectedServices =
            getSelectedServices();

        updateSummary(
            selectedServices,
            vehicleSize
        );

        updateBookingButton();

        updateConditionMessage(
            selectedServices,
            vehicleSize
        );

        if (
            !vehicleSize ||
            selectedServices.length === 0
        ) {

            totalElement.textContent =
                "R$ 0,00";

            messageElement.textContent =
                "Selecione o veículo e pelo menos um serviço.";

            whatsappButton.disabled = true;

            return 0;
        }

        let total = 0;

        let hasCustomService = false;
        let hasIncludedService = false;

        selectedServices.forEach(service => {

            if (service.type === "custom") {

                hasCustomService = true;

                return;
            }

            if (service.type === "included") {

                hasIncludedService = true;

                return;
            }

            total += getServicePrice(
                service,
                vehicleSize
            );
        });

        totalElement.textContent =
            formatCurrency(total);

        if (hasCustomService) {

            messageElement.textContent =
                "Estimativa parcial. Um dos serviços " +
                "selecionados necessita de avaliação " +
                "para definição do valor.";

        } else if (hasIncludedService) {

            messageElement.textContent =
                "O serviço selecionado possui item " +
                "incluso e não acrescenta valor ao orçamento.";

        } else {

            messageElement.textContent =
                "Estimativa baseada nos serviços, " +
                "no tamanho e no estado informado " +
                "do veículo. Valor definitivo " +
                "sujeito à vistoria presencial.";
        }

        whatsappButton.disabled = false;

        return total;
    }

    // ======================================
    // MENSAGEM DO WHATSAPP
    // ======================================

    function buildWhatsAppMessage() {

        const vehicleSize =
            vehicleSelect.value;

        const selectedServices =
            getSelectedServices();

        if (
            !vehicleSize ||
            selectedServices.length === 0
        ) {
            return "";
        }

        const customerName =
            customerNameInput.value.trim();

        const vehicleModel =
            vehicleModelInput.value.trim();

        const total = calculateBudget();

        const customerLine = customerName
            ? `👤 Cliente: ${customerName}\n`
            : "";

        const vehicleModelLine = vehicleModel
            ? `🚗 Veículo: ${vehicleModel}\n`
            : "";

        const serviceNames = selectedServices
            .map(service => {

                let name = service.name;

                if (service.type === "quantity") {

                    name +=
                        ` × ${getQuantity(service)}`;
                }

                if (service.type === "custom") {

                    return (
                        `• ${name}\n` +
                        "  Valor: Sob avaliação"
                    );
                }

                if (service.type === "included") {

                    return (
                        `• ${name}\n` +
                        "  Incluso"
                    );
                }

                const price = getServicePrice(
                    service,
                    vehicleSize
                );

                return (
                    `• ${name}\n` +
                    `  ${formatCurrency(price)}`
                );
            })
            .join("\n\n");

        return `
Olá! Gostaria de solicitar um orçamento na Clean Car.

${customerLine}${vehicleModelLine}📐 Tamanho: ${VEHICLE_NAMES[vehicleSize]}

🧽 Estado de conservação informado: ${getConditionName()}

🔧 Serviços selecionados:

${serviceNames}

────────────────

💰 Total estimado: ${formatCurrency(total)}

Gostaria de verificar a disponibilidade de um horário.

⚠️ ${INSPECTION_NOTICE}
        `.trim();
    }

    // ======================================
    // EVENTOS
    // ======================================

    vehicleSelect.addEventListener(
        "change",
        calculateBudget
    );

    servicesList.addEventListener(
        "change",
        calculateBudget
    );

    // Atualiza o valor enquanto arrasta a barra.
    conditionInput.addEventListener(
        "input",
        calculateBudget
    );

    bookingButton.addEventListener(
        "click",
        () => {

            if (!canScheduleMaintenance()) {
                return;
            }

            window.open(
                BOOKING_URL,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );

    whatsappButton.addEventListener(
        "click",
        () => {

            const message =
                buildWhatsAppMessage();

            if (!message) {
                return;
            }

            const url =
                `https://wa.me/${WHATSAPP_PHONE}?text=${
                    encodeURIComponent(message)
                }`;

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );

    // ======================================
    // INICIALIZAÇÃO
    // ======================================
    servicesList.textContent = "Carregando serviços...";

    loadPublicServices()
        .then(loadedServices => {
            services = loadedServices;
            servicesList.textContent = "";
            createCategories();
            calculateBudget();
        })
        .catch(error => {
            console.error("Erro ao carregar serviços:", error);
            servicesList.textContent =
                "Não foi possível carregar os serviços. Atualize a página para tentar novamente.";
        });

    return section;
}


