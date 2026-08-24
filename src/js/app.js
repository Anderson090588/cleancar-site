import { Services } from "../components/services.js";
import { About } from "../components/about.js";
import { Schedule } from "../components/schedule.js";
import { createBudget } from "../components/budget.js";
import { Contact } from "../components/contact.js";


// ==========================================
// APP
// ==========================================

const app =
    document.querySelector("#app");


app.innerHTML = `

    <!-- ======================================
         NAVBAR
    ======================================= -->

    <nav class="navbar">

        <a
            href="#inicio"
            class="logo"
        >
            CLEAN<span>CAR</span>
        </a>


        <!-- BOTÃO MOBILE -->

        <button
            type="button"
            class="menu-toggle"
            id="menu-toggle"
            aria-label="Abrir menu"
            aria-expanded="false"
        >

            <i class="bi bi-list"></i>

        </button>


        <!-- NAVEGAÇÃO -->

        <ul
            class="nav-links"
            id="nav-links"
        >

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

    <section
        class="hero"
        id="inicio"
    >

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
// MENU MOBILE
// ==========================================

const menuToggle =
    document.querySelector(
        "#menu-toggle"
    );

const navLinks =
    document.querySelector(
        "#nav-links"
    );


if (
    menuToggle &&
    navLinks
) {

    // ======================================
    // ABRE / FECHA MENU
    // ======================================

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle(
                    "nav-open"
                );


            menuToggle.classList.toggle(
                "menu-open",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            const icon =
                menuToggle.querySelector(
                    "i"
                );


            if (icon) {

                icon.className =
                    isOpen
                        ? "bi bi-x-lg"
                        : "bi bi-list";

            }

        }
    );


    // ======================================
    // FECHA AO CLICAR EM UM LINK
    // ======================================

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "nav-open"
                    );


                    menuToggle.classList.remove(
                        "menu-open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.className =
                            "bi bi-list";

                    }

                }
            );

        });

}


// ==========================================
// FECHA MENU AO AUMENTAR A TELA
// ==========================================

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 768 &&
            navLinks &&
            menuToggle
        ) {

            navLinks.classList.remove(
                "nav-open"
            );


            menuToggle.classList.remove(
                "menu-open"
            );


            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                menuToggle.querySelector(
                    "i"
                );


            if (icon) {

                icon.className =
                    "bi bi-list";

            }

        }

    }
);


// ==========================================
// ANIMAÇÕES
// ==========================================

import("./animations.js");