export function Schedule() {

    return `


<section id="schedule" class="schedule">


    <div class="container">


        <div class="text-center mb-5">


            <span class="badge-clean">
                AGENDAMENTO
            </span>



            <h2 class="mt-3">
                Reserve o cuidado do seu veículo
            </h2>



            <p>
                Preencha seus dados e solicite seu atendimento pelo WhatsApp.
            </p>


        </div>




        <div class="schedule-box">


            <form id="scheduleForm">



                <div class="row g-4">


                    <div class="col-md-6">

                        <input 
                        type="text"
                        id="name"
                        placeholder="Seu nome"
                        required>

                    </div>



                    <div class="col-md-6">

                        <input 
                        type="tel"
                        id="phone"
                        placeholder="WhatsApp"
                        required>

                    </div>




                    <div class="col-md-6">

                        <input 
                        type="text"
                        id="car"
                        placeholder="Modelo do veículo"
                        required>

                    </div>




                    <div class="col-md-6">


                        <select id="service">


                            <option>
                                Escolha o serviço
                            </option>


                            <option>
                                Lavagem Premium
                            </option>


                            <option>
                                Polimento Técnico
                            </option>


                            <option>
                                Vitrificação
                            </option>


                            <option>
                                Higienização
                            </option>


                        </select>


                    </div>




                    <div class="col-md-6">


                        <input

                        type="date"

                        id="date"

                        required>


                    </div>



                    <div class="col-md-6">


                        <input

                        type="time"

                        id="time"

                        required>


                    </div>



                    <div class="col-12 text-center">


                        <button type="submit">

                            Solicitar Agendamento

                        </button>


                    </div>



                </div>


            </form>


        </div>


    </div>


</section>



`;

}