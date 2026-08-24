// ==========================================
// CLEAN CAR - SOBRE
// ==========================================

export function About() {

    return `
        <section class="about-section" id="sobre">

            <div class="about-container">

                <!-- IMAGEM -->

                <div class="about-image">

                    <img
                        src="src/assets/images/hero/hero-lancer.jpg"
                        alt="Clean Car - cuidado automotivo"
                        loading="lazy"
                    >

                </div>


                <!-- CONTEÚDO -->

                <div class="about-content">

                    <span class="about-label">
                        SOBRE A CLEAN CAR
                    </span>

                    <h2>
                        Cuidado em cada detalhe
                    </h2>

                    <p class="about-intro">
                        Na Clean Car, cada veículo recebe atenção
                        de acordo com suas necessidades.
                        O objetivo é entregar um serviço cuidadoso,
                        organizado e com atenção aos detalhes,
                        desde uma limpeza de manutenção até
                        serviços mais técnicos de estética automotiva.
                    </p>


                    <!-- DIFERENCIAIS -->

                    <div class="about-benefits">


                        <div class="about-benefit">

                            <div class="about-benefit-icon">
                                <i class="bi bi-person-check"></i>
                            </div>

                            <div>

                                <h3>
                                    Atendimento personalizado
                                </h3>

                                <p>
                                    Cada veículo é avaliado conforme
                                    suas características, necessidades
                                    e estado de conservação.
                                </p>

                            </div>

                        </div>


                        <div class="about-benefit">

                            <div class="about-benefit-icon">
                                <i class="bi bi-stars"></i>
                            </div>

                            <div>

                                <h3>
                                    Cuidado nos detalhes
                                </h3>

                                <p>
                                    Atenção ao acabamento externo,
                                    interior, pintura, vidros e
                                    componentes que fazem diferença
                                    no resultado final.
                                </p>

                            </div>

                        </div>


                        <div class="about-benefit">

                            <div class="about-benefit-icon">
                                <i class="bi bi-tools"></i>
                            </div>

                            <div>

                                <h3>
                                    Serviços especializados
                                </h3>

                                <p>
                                    Limpeza, higienização, polimento,
                                    proteção, motor, chassi, vidros
                                    e outros cuidados automotivos.
                                </p>

                            </div>

                        </div>

                    </div>


                    <!-- BOTÕES -->

                    <div class="about-actions">

                        <a
                            href="#orcamento"
                            class="about-button-primary"
                        >
                            Montar orçamento
                            <i class="bi bi-arrow-right"></i>
                        </a>

                        <a
                            href="https://wa.me/5512996010419"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="about-button-secondary"
                        >
                            <i class="bi bi-whatsapp"></i>
                            Falar com a Clean Car
                        </a>

                    </div>

                </div>

            </div>

        </section>
    `;

}