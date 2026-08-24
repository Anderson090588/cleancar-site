import { Services } from "../components/services.js";
import { About } from "../components/about.js";
import { Schedule } from "../components/schedule.js";
import { createBudget } from "../components/budget.js";
import { Contact } from "../components/contact.js";


const app =
    document.querySelector("#app");


app.innerHTML = `

    <!-- ======================================
         NAVBAR
    ======================================= -->

    <nav class="navbar">

        <div class="logo">
            CLEAN<span>CAR</span>
        </div>

        <ul class="nav-links">

            <li>
                <a href="#inicio">
                    Início
                </a>
            </li>

            <li>
                <a href="#servicos">
                    Serviços
                </a>
            </li>

            <li>
                <a href="#orcamento">
                    Orçamento
                </a>
            </li>

            <li>
                <a href="#sobre">
                    Sobre
                </a>
            </li>

            <li>
                <a href="#contato">
                    Contato
                </a>
            </li>

        </ul>

    </nav>


    <!-- ======================================
         HERO
    ======================================= -->

    <section class="hero" id="inicio">

        <div class="hero-content">

            <h1>
                O cuidado que seu carro merece
            </h1>

            <p>
                Na Clean Car, transformamos estética automotiva
                em uma experiência premium.
                Lavagem detalhada, vitrificação e cuidado
                em cada detalhe.
            </p>

            <a
                href="#orcamento"
                class="hero-button"
            >
                Monte seu orçamento
            </a>

        </div>

    </section>


    <!-- ======================================
         SERVIÇOS
    ======================================= -->

    ${Services()}


    <!-- ======================================
         ORÇAMENTO
    ======================================= -->

    <div id="budget-container"></div>


    <!-- ======================================
         SOBRE
    ======================================= -->

    ${About()}


    <!-- ======================================
         AGENDAMENTO ATUAL
    ======================================= -->

    ${Schedule()}


    <!-- ======================================
         CONTATO
    ======================================= -->

    ${Contact()}

`;


// ==========================================
// INSERE O ORÇAMENTO
// ==========================================

const budgetContainer =
    document.querySelector(
        "#budget-container"
    );

budgetContainer.appendChild(
    createBudget()
);


// ==========================================
// ANIMAÇÕES
// ==========================================

import("./animations.js");