import services from "../data/services.js";

// ==========================================
// CLEAN CAR - ORÇAMENTO
// ==========================================

export function createBudget() {

    const section = document.createElement("section");

    section.className = "budget-section";
    section.id = "orcamento";

    section.innerHTML = `
        <div class="budget-container">

            <div class="budget-header">

                <span class="budget-label">
                    ORÇAMENTO
                </span>

                <h2>
                    Monte seu orçamento
                </h2>

                <p>
                    Selecione o veículo e os serviços desejados.
                    O valor apresentado é uma estimativa inicial.
                </p>

            </div>

            <div class="budget-content">

                <!-- TIPO DE VEÍCULO -->

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


                <!-- SERVIÇOS -->

                <div class="budget-group">

                    <label>
                        Serviços
                    </label>

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

                    <h3>
                        Resumo do orçamento
                    </h3>

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


    // ==========================================
    // ELEMENTOS
    // ==========================================

    const servicesList =
        section.querySelector("#services-list");

    const vehicleSelect =
        section.querySelector("#vehicle-size");

    const totalElement =
        section.querySelector("#budget-total");

    const messageElement =
        section.querySelector("#budget-message");

    const whatsappButton =
        section.querySelector("#budget-whatsapp");

    const summaryList =
        section.querySelector("#budget-summary-list");


    // ==========================================
    // CRIA LISTA DE SERVIÇOS
    // ==========================================

    services.forEach(service => {

        const serviceItem =
            document.createElement("label");

        serviceItem.className =
            "service-option";

        serviceItem.innerHTML = `
            <input
                type="checkbox"
                value="${service.id}"
                data-service-id="${service.id}"
            >

            <span class="service-info">

                <strong>
                    ${service.name}
                </strong>

                <small>
                    ${service.category}
                    ${
                        service.duration
                            ? ` • ${service.duration}`
                            : ""
                    }
                </small>

            </span>

            ${
                service.type === "quantity"
                    ? `
                        <input
                            type="number"
                            class="service-quantity"
                            data-quantity-id="${service.id}"
                            min="1"
                            value="1"
                            disabled
                        >
                    `
                    : ""
            }
        `;

        servicesList.appendChild(
            serviceItem
        );


        // ======================================
        // CONTROLE DA QUANTIDADE
        // ======================================

        const checkbox =
            serviceItem.querySelector(
                'input[type="checkbox"]'
            );

        const quantityInput =
            serviceItem.querySelector(
                ".service-quantity"
            );

        if (quantityInput) {

            checkbox.addEventListener(
                "change",
                () => {

                    quantityInput.disabled =
                        !checkbox.checked;

                    if (!checkbox.checked) {
                        quantityInput.value = 1;
                    }

                }
            );

        }

    });


    // ==========================================
    // FORMATA VALOR
    // ==========================================

    function formatCurrency(value) {

        return value.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    // ==========================================
    // RETORNA QUANTIDADE
    // ==========================================

    function getServiceQuantity(service) {

        if (service.type !== "quantity") {
            return 1;
        }

        const quantityInput =
            servicesList.querySelector(
                `[data-quantity-id="${service.id}"]`
            );

        if (!quantityInput) {
            return 1;
        }

        const quantity =
            Number(quantityInput.value);

        return quantity > 0
            ? quantity
            : 1;

    }


    // ==========================================
    // RETORNA PREÇO DO SERVIÇO
    // ==========================================

    function getServicePrice(
        service,
        vehicleSize
    ) {

        // PREÇO POR TAMANHO

        if (
            service.type === "vehicle-size" &&
            service.prices
        ) {

            return service.prices[
                vehicleSize
            ] || 0;

        }


        // PREÇO FIXO

        if (
            service.type === "fixed" &&
            typeof service.price === "number"
        ) {

            return service.price;

        }


        // FAIXA DE PREÇO

        if (
            service.type === "range" &&
            typeof service.minPrice === "number"
        ) {

            return service.minPrice;

        }


        // PREÇO POR QUANTIDADE

        if (
            service.type === "quantity" &&
            typeof service.price === "number"
        ) {

            const quantity =
                getServiceQuantity(service);

            return service.price * quantity;

        }


        return 0;

    }


    // ==========================================
    // TEXTO DO PREÇO
    // ==========================================

    function getServicePriceText(
        service,
        vehicleSize
    ) {

        if (service.type === "custom") {

            return "Sob avaliação";

        }


        if (service.type === "included") {

            return "Incluso";

        }


        const price =
            getServicePrice(
                service,
                vehicleSize
            );

        return formatCurrency(price);

    }


    // ==========================================
    // ATUALIZA RESUMO
    // ==========================================

    function updateSummary(
        selectedServices,
        vehicleSize
    ) {

        summaryList.innerHTML = "";


        if (
            selectedServices.length === 0
        ) {

            summaryList.innerHTML = `
                <p class="budget-empty">
                    Nenhum serviço selecionado.
                </p>
            `;

            return;

        }


        selectedServices.forEach(input => {

            const service =
                services.find(
                    item =>
                        item.id ===
                        input.dataset.serviceId
                );

            if (!service) {
                return;
            }


            const item =
                document.createElement("div");

            item.className =
                "budget-summary-item";


            let extraInfo = "";


            if (
                service.type === "quantity"
            ) {

                const quantity =
                    getServiceQuantity(service);

                extraInfo =
                    ` × ${quantity}`;

            }


            const priceText =
                getServicePriceText(
                    service,
                    vehicleSize
                );


            item.innerHTML = `
                <div class="budget-summary-info">

                    <strong>
                        ${service.name}${extraInfo}
                    </strong>

                    <small>
                        ${service.category}
                    </small>

                </div>

                <span class="budget-summary-price">
                    ${priceText}
                </span>
            `;


            summaryList.appendChild(
                item
            );

        });

    }


    // ==========================================
    // CALCULA ORÇAMENTO
    // ==========================================

    function calculateBudget() {

        const vehicleSize =
            vehicleSelect.value;

        const selectedServices = [
            ...servicesList.querySelectorAll(
                'input[type="checkbox"]:checked'
            )
        ];


        updateSummary(
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


        selectedServices.forEach(input => {

            const service =
                services.find(
                    item =>
                        item.id ===
                        input.dataset.serviceId
                );

            if (!service) {
                return;
            }


            // SOB AVALIAÇÃO

            if (
                service.type === "custom"
            ) {

                hasCustomService = true;

                return;

            }


            // INCLUSO

            if (
                service.type === "included"
            ) {

                hasIncludedService = true;

                return;

            }


            total +=
                getServicePrice(
                    service,
                    vehicleSize
                );

        });


        totalElement.textContent =
            formatCurrency(total);


        // ======================================
        // MENSAGEM DA ESTIMATIVA
        // ======================================

        if (hasCustomService) {

            messageElement.textContent =
                "Estimativa parcial. Um dos serviços selecionados necessita de avaliação para definição do valor.";

        }

        else if (hasIncludedService) {

            messageElement.textContent =
                "O serviço selecionado possui item incluso e não acrescenta valor ao orçamento.";

        }

        else {

            messageElement.textContent =
                "O valor final poderá variar conforme o estado e as características do veículo.";

        }


        whatsappButton.disabled = false;

        return total;

    }


    // ==========================================
    // EVENTOS
    // ==========================================

    vehicleSelect.addEventListener(
        "change",
        calculateBudget
    );


    servicesList.addEventListener(
        "change",
        calculateBudget
    );


    servicesList.addEventListener(
        "input",
        event => {

            if (
                event.target.classList.contains(
                    "service-quantity"
                )
            ) {

                calculateBudget();

            }

        }
    );


    // ==========================================
    // WHATSAPP
    // ==========================================

    whatsappButton.addEventListener(
        "click",
        () => {

            const vehicleSize =
                vehicleSelect.value;

            const selectedServices = [
                ...servicesList.querySelectorAll(
                    'input[type="checkbox"]:checked'
                )
            ];


            if (
                !vehicleSize ||
                selectedServices.length === 0
            ) {

                return;

            }


            const total =
                calculateBudget();


            // ==================================
            // NOMES DOS VEÍCULOS
            // ==================================

            const vehicleNames = {

                pequeno:
                    "Pequeno",

                medio:
                    "Médio",

                grande:
                    "Grande / SUV / 7 lugares"

            };


            // ==================================
            // SERVIÇOS PARA O WHATSAPP
            // ==================================

            const serviceNames =
                selectedServices
                    .map(input => {

                        const service =
                            services.find(
                                item =>
                                    item.id ===
                                    input.dataset.serviceId
                            );

                        if (!service) {
                            return "";
                        }


                        let serviceName =
                            service.name;


                        // QUANTIDADE

                        if (
                            service.type ===
                            "quantity"
                        ) {

                            const quantity =
                                getServiceQuantity(
                                    service
                                );

                            serviceName +=
                                ` × ${quantity}`;

                        }


                        // SOB AVALIAÇÃO

                        if (
                            service.type ===
                            "custom"
                        ) {

                            return (
                                `• ${serviceName}\n` +
                                `  Valor: Sob avaliação`
                            );

                        }


                        // INCLUSO

                        if (
                            service.type ===
                            "included"
                        ) {

                            return (
                                `• ${serviceName}\n` +
                                `  Incluso`
                            );

                        }


                        // PREÇO

                        const price =
                            getServicePrice(
                                service,
                                vehicleSize
                            );


                        return (
                            `• ${serviceName}\n` +
                            `  ${formatCurrency(price)}`
                        );

                    })
                    .filter(Boolean)
                    .join("\n\n");


            // ==================================
            // MENSAGEM FINAL
            // ==================================

            const message = `
Olá! Gostaria de solicitar um orçamento na Clean Car.

🚗 Veículo: ${vehicleNames[vehicleSize]}

🔧 Serviços selecionados:

${serviceNames}

────────────────

💰 Total estimado: ${formatCurrency(total)}

Gostaria de verificar a disponibilidade de um horário.

⚠️ O valor apresentado é uma estimativa e poderá variar conforme o estado e as características do veículo.
            `.trim();


            // ==================================
            // WHATSAPP CLEAN CAR
            // ==================================

            const phone =
                "5512996010419";


            const whatsappURL =
                `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );


    return section;

}