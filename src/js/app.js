import { Services } from "../components/services.js";
import { About } from "../components/about.js";
import { Schedule } from "../components/schedule.js";

document.querySelector("#app").innerHTML = `

    <nav class="navbar">

        <div class="logo">
            CLEAN<span>CAR</span>
        </div>

        <ul class="nav-links">

            <li>
                <a href="#">
                    Início
                </a>
            </li>

            <li>
                <a href="#">
                    Serviços
                </a>
            </li>

            <li>
                <a href="#">
                    Sobre
                </a>
            </li>

            <li>
                <a href="#">
                    Contato
                </a>
            </li>

        </ul>

    </nav>


    <section class="hero">

        <div class="hero-content">

            <h1>
                O cuidado que seu carro merece
            </h1>

            <p>
                Na Clean Car, transformamos estética automotiva
                em uma experiência premium.
                Lavagem detalhada, vitrificação e cuidado em cada detalhe.
            </p>

            <a href="#" class="hero-button">
                Agende seu horário
            </a>

        </div>

    </section>


    ${Services()}

    ${About()}

    ${Schedule()}

`;

// Carrega as animações depois que os componentes existirem
import("./animations.js");