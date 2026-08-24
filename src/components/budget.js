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
                <span class="budget-label">ORÇAMENTO</span>

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

                    <div class="services-list" id="services-list">
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

    const servicesList = section.querySelector("#services-list");
    const vehicleSelect = section.querySelector("#vehicle-size");
    const totalElement = section.querySelector("#budget-total");
    const messageElement = section.querySelector("#budget-message");
    const whatsappButton = section.querySelector("#budget-whatsapp");

    // ==========================================
    // CRIA LISTA DE SERVIÇOS
    // ==========================================

    services.forEach(service => {

        const serviceItem = document.createElement("label");

        serviceItem.className = "service-option";

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
                    ${service.duration ? ` • ${service.duration}` : ""}
                </small>

            </span>
        `;

        servicesList.appendChild(serviceItem);
    });


    // ==========================================
    // FORMATA VALOR
    // ==========================================

    function formatCurrency(value) {

        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    // ==========================================
    // CALCULA PREÇO
    // ==========================================

    function calculateBudget() {

        const vehicleSize = vehicleSelect.value;

        const selectedServices = [
            ...servicesList.querySelectorAll(
                'input[type="checkbox"]:checked'
            )
        ];

        if (!vehicleSize || selectedServices.length === 0) {

            totalElement.textContent = "R$ 0,00";

            messageElement.textContent =
                "Selecione o veículo e pelo menos um serviço.";

            whatsappButton.disabled = true;

            return 0;
        }

        let total = 0;

        selectedServices.forEach(input => {

            const service = services.find(
                item => item.id === input.dataset.serviceId
            );

            if (!service) return;

            // Serviço baseado no tamanho do veículo
            if (
                service.type === "vehicle-size" &&
                service.prices
            ) {

                total += service.prices[vehicleSize];

            }

            // Serviço com preço fixo
            else if (
                service.type === "fixed" &&
                service.price
            ) {

                total += service.price;

            }

            // Serviço com preço inicial
            else if (
                service.type === "range" &&
                service.minPrice
            ) {

                total += service.minPrice;

            }

        });


        totalElement.textContent = formatCurrency(total);

        messageElement.textContent =
            "O valor final poderá variar conforme o estado e as características do veículo.";

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

            const total =
                calculateBudget();

            if (
                !vehicleSize ||
                selectedServices.length === 0
            ) {
                return;
            }

            const vehicleNames = {
                pequeno: "Pequeno",
                medio: "Médio",
                grande: "Grande / SUV / 7 lugares"
            };

            const serviceNames =
                selectedServices.map(input => {

                    const service =
                        services.find(
                            item =>
                                item.id ===
                                input.dataset.serviceId
                        );

                    return service
                        ? `• ${service.name}`
                        : "";

                }).join("\n");


            const message = `
Olá! Gostaria de solicitar um orçamento.

🚗 Veículo: ${vehicleNames[vehicleSize]}

🔧 Serviços:
${serviceNames}

💰 Estimativa: ${formatCurrency(total)}

Gostaria de verificar a disponibilidade de um horário.

*O valor final poderá variar conforme o estado e as características do veículo.*
            `.trim();


            const phone =
                "5512999999999";

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