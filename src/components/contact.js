// ==========================================
// CLEAN CAR - CONTATO
// ==========================================

export function Contact() {

    const whatsappNumber = "5512996010419";

    const whatsappMessage =
        "Olá! Gostaria de saber mais sobre os serviços da Clean Car.";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const instagramURL =
        "https://www.instagram.com/cleancar_luiz?igsi=ZXNhMnRscXozZ3I3";

    const mapsURL =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            "Rua Dra. Sheyla Campos Delacio Scofano nº 12, Vila Paulista, Campos do Jordão, Brasil"
        );


    return `
        <section class="contact-section" id="contato">

            <div class="contact-container">

                <!-- CABEÇALHO -->

                <div class="contact-header">

                    <span class="contact-label">
                        FALE COM A CLEAN CAR
                    </span>

                    <h2>
                        Seu carro merece esse cuidado
                    </h2>

                    <p>
                        Entre em contato, tire suas dúvidas,
                        solicite uma avaliação ou venha conhecer
                        a Clean Car em Campos do Jordão.
                    </p>

                </div>


                <!-- GRID -->

                <div class="contact-grid">


                    <!-- WHATSAPP -->

                    <article class="contact-card contact-card-main">

                        <div class="contact-card-icon">

                            <i class="bi bi-whatsapp"></i>

                        </div>

                        <span class="contact-card-label">
                            WHATSAPP
                        </span>

                        <h3>
                            Fale diretamente com a Clean Car
                        </h3>

                        <p>
                            Entre em contato para tirar dúvidas,
                            confirmar serviços ou verificar
                            disponibilidade.
                        </p>

                        <strong>
                            (12) 99601-0419
                        </strong>

                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="contact-button"
                        >
                            <i class="bi bi-whatsapp"></i>

                            Conversar agora
                        </a>

                    </article>


                    <!-- INSTAGRAM -->

                    <article class="contact-card">

                        <div class="contact-card-icon">

                            <i class="bi bi-instagram"></i>

                        </div>

                        <span class="contact-card-label">
                            INSTAGRAM
                        </span>

                        <h3>
                            Acompanhe nosso trabalho
                        </h3>

                        <p>
                            Veja serviços, detalhes dos veículos
                            e acompanhe os trabalhos realizados
                            pela Clean Car.
                        </p>

                        <strong>
                            @cleancar_luiz
                        </strong>

                        <a
                            href="${instagramURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="contact-link"
                        >
                            Ver Instagram

                            <i class="bi bi-arrow-up-right"></i>
                        </a>

                    </article>


                    <!-- ENDEREÇO -->

                    <article class="contact-card">

                        <div class="contact-card-icon">

                            <i class="bi bi-geo-alt"></i>

                        </div>

                        <span class="contact-card-label">
                            ONDE ESTAMOS
                        </span>

                        <h3>
                            Visite a Clean Car
                        </h3>

                        <p class="contact-address">

                            Rua Dra. Sheyla Campos Delacio
                            Scofano nº 12

                            <br>

                            Vila Paulista

                            <br>

                            Campos do Jordão - SP

                        </p>

                        <a
                            href="${mapsURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="contact-link"
                        >
                            Como chegar

                            <i class="bi bi-arrow-up-right"></i>
                        </a>

                    </article>


                    <!-- HORÁRIO -->

                    <article class="contact-card">

                        <div class="contact-card-icon">

                            <i class="bi bi-clock"></i>

                        </div>

                        <span class="contact-card-label">
                            ATENDIMENTO
                        </span>

                        <h3>
                            Horários
                        </h3>

                        <p>
                            Consulte os horários disponíveis
                            diretamente pelo WhatsApp.
                        </p>

                        <span class="contact-status">

                            <i class="bi bi-calendar-check"></i>

                            Atendimento mediante disponibilidade

                        </span>

                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="contact-link"
                        >
                            Consultar horário

                            <i class="bi bi-arrow-up-right"></i>
                        </a>

                    </article>

                </div>

            </div>


            <!-- RODAPÉ -->

            <footer class="site-footer">

                <div class="footer-container">

                    <div class="footer-brand">

                        <a
                            href="#inicio"
                            class="footer-logo"
                        >
                            CLEAN<span>CAR</span>
                        </a>

                        <p>
                            Estética automotiva e cuidado
                            em cada detalhe.
                        </p>

                    </div>


                    <div class="footer-navigation">

                        <span>
                            Navegação
                        </span>

                        <a href="#inicio">
                            Início
                        </a>

                        <a href="#servicos">
                            Serviços
                        </a>

                        <a href="#orcamento">
                            Orçamento
                        </a>

                        <a href="#sobre">
                            Sobre
                        </a>

                        <a href="#contato">
                            Contato
                        </a>

                    </div>


                    <div class="footer-social">

                        <span>
                            Contato
                        </span>

                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="bi bi-whatsapp"></i>

                            WhatsApp
                        </a>

                        <a
                            href="${instagramURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="bi bi-instagram"></i>

                            Instagram
                        </a>

                        <a
                            href="${mapsURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="bi bi-geo-alt"></i>

                            Localização
                        </a>

                    </div>

                </div>


                <div class="footer-bottom">

                    <p>
                        © 2026 Clean Car.
                        Todos os direitos reservados.
                    </p>

                </div>

            </footer>

        </section>
    `;

}