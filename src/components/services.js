// ==========================================
// CLEAN CAR - SERVIÇOS
// ==========================================

export function Services() {

    return `
        <section class="services-section" id="servicos">

            <div class="services-container">

                <!-- CABEÇALHO -->

                <div class="services-header">

                    <span class="services-label">
                        NOSSOS SERVIÇOS
                    </span>

                    <h2>
                        Cuidado completo para o seu veículo
                    </h2>

                    <p>
                        Da manutenção do dia a dia aos cuidados
                        mais detalhados, a Clean Car oferece
                        serviços pensados para conservar,
                        proteger e valorizar seu veículo.
                    </p>

                </div>


                <!-- CARDS -->

                <div class="services-grid">


                    <!-- LIMPEZA DETALHADA -->

                    <article class="service-card">

                        <div class="service-card-image">

                            <img
                                src="../src/assets/images/services/limpezadetalhada.png"
                                alt="Limpeza detalhada de veículo"
                                loading="lazy"
                            >

                        </div>

                        <div class="service-card-content">

                            <div class="service-card-icon">
                                <i class="bi bi-stars"></i>
                            </div>

                            <h3>
                                Limpeza detalhada
                            </h3>

                            <p>
                                Limpeza interna e externa para
                                manutenção, conservação e cuidado
                                completo do veículo.
                            </p>

                            <a href="#orcamento">
                                Montar orçamento
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>


                    <!-- HIGIENIZAÇÃO -->

                    <article class="service-card">

                        <div class="service-card-image">

                            <img
                                src="../src/assets/images/services/higienizacao.png"
                                alt="Higienização interna de veículo"
                                loading="lazy"
                            >

                        </div>

                        <div class="service-card-content">

                            <div class="service-card-icon">
                                <i class="bi bi-droplet"></i>
                            </div>

                            <h3>
                                Higienização
                            </h3>

                            <p>
                                Higienização de bancos, teto,
                                carpetes, porta-malas, cintos,
                                painéis e outros componentes internos.
                            </p>

                            <a href="#orcamento">
                                Montar orçamento
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>


                    <!-- POLIMENTO -->

                    <article class="service-card">

                        <div class="service-card-image">

                            <img
                                src="../src/assets/images/services/polimento.png"
                                alt="Polimento automotivo"
                                loading="lazy"
                            >

                        </div>

                        <div class="service-card-content">

                            <div class="service-card-icon">
                                <i class="bi bi-brightness-high"></i>
                            </div>

                            <h3>
                                Polimento
                            </h3>

                            <p>
                                Tratamentos para revitalizar a pintura,
                                melhorar o acabamento e recuperar
                                o brilho do veículo.
                            </p>

                            <a href="#orcamento">
                                Montar orçamento
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>


                    <!-- PROTEÇÃO -->

                    <article class="service-card">

                        <div class="service-card-image">

                            <img
                                src="../src/assets/images/services/protecao.png"
                                alt="Proteção e enceramento automotivo"
                                loading="lazy"
                            >

                        </div>

                        <div class="service-card-content">

                            <div class="service-card-icon">
                                <i class="bi bi-shield-check"></i>
                            </div>

                            <h3>
                                Proteção
                            </h3>

                            <p>
                                Enceramento e tratamentos de proteção
                                para ajudar na conservação da pintura
                                e do acabamento.
                            </p>

                            <a href="#orcamento">
                                Montar orçamento
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>


                    <!-- MOTOR E CHASSI -->

                    <article class="service-card">

                        <div class="service-card-image">

                            <img
                                src="../src/assets/images/services/motorechassi.png"
                                alt="Limpeza de motor e chassi"
                                loading="lazy"
                            >

                        </div>

                        <div class="service-card-content">

                            <div class="service-card-icon">
                                <i class="bi bi-gear"></i>
                            </div>

                            <h3>
                                Motor e chassi
                            </h3>

                            <p>
                                Limpeza técnica de motor, parte
                                inferior e chassi, realizada com
                                atenção às características do veículo.
                            </p>

                            <a href="#orcamento">
                                Montar orçamento
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>


                    <!-- VIDROS E DETALHAMENTO -->

                    <article class="service-card">

                        <div class="service-card-image">

                            <img
                                src="../src/assets/images/services/vidrosedetalhamento.png"
                                alt="Tratamento de vidros e detalhamento automotivo"
                                loading="lazy"
                            >

                        </div>

                        <div class="service-card-content">

                            <div class="service-card-icon">
                                <i class="bi bi-gem"></i>
                            </div>

                            <h3>
                                Vidros e detalhamento
                            </h3>

                            <p>
                                Remoção de chuva ácida, cristalização,
                                descontaminação de pintura e cuidados
                                com plásticos e acabamentos.
                            </p>

                            <a href="#orcamento">
                                Montar orçamento
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>

                </div>


                <!-- CHAMADA FINAL -->

                <div class="services-cta">

                    <div>

                        <span>
                            Não sabe qual serviço escolher?
                        </span>

                        <strong>
                            Monte uma estimativa personalizada
                            para o seu veículo.
                        </strong>

                    </div>

                    <a
                        href="#orcamento"
                        class="services-cta-button"
                    >
                        Criar orçamento
                        <i class="bi bi-arrow-down"></i>
                    </a>

                </div>

            </div>

        </section>
    `;

}