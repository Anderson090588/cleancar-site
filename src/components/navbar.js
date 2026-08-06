export function Navbar() {
    return `
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-clean">
            <div class="container">

                <a class="navbar-brand logo" href="#">
                    CLEANCAR
                </a>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu">

                    <span class="navbar-toggler-icon"></span>

                </button>

                <div class="collapse navbar-collapse" id="menu">

                    <ul class="navbar-nav ms-auto">

                        <li class="nav-item">
                            <a class="nav-link" href="#">Início</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">Serviços</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">Agendamento</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">Contato</a>
                        </li>

                    </ul>

                    <button class="btn btn-gold ms-4">
                        Agendar Agora
                    </button>

                </div>

            </div>

        </nav>
    `;
}